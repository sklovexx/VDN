import Singleton from '../Singleton';
import proto_man from './base/proto_man';

export default class WSManager extends Singleton<WSManager> {

    sock: WebSocket = null;
    serivces_handler: Object = null;
    proto_type: number = 0;
    is_connected: boolean = false;
    // 心跳包ID
    heart_beat_id: number = null;
    // 心跳检测的间隔时间
    heart_beat_time: number = 10;
    // 心跳检测的的未连接的次数
    heart_beat_num: number = 0;
    // 是否已经开启了心跳检测
    is_start_heart_beat: boolean = false;
    cache_send_cmd: any[] = [];

    private on_opened(event) {
        //console.log("ws connect server success");
        this.is_connected = true;
        if (this.cache_send_cmd.length > 0) {
            let cache = this.cache_send_cmd.shift();
            this.send_cmd(cache[0], cache[1], cache[2]);
            this.cache_send_cmd = [];
        }

    }

    // 开启心跳检测
    private start_check_heart_beat() {
        if (this.is_start_heart_beat) {
            return;
        }

        this.is_start_heart_beat = true;

        this.stop_check_heart_beat();

        this.heart_beat_id = setInterval(() => {
            this.send_cmd(2, 4, "");
        }, this.heart_beat_time * 1000);
    }


    // 停止心跳检测
    private stop_check_heart_beat() {
        clearInterval(this.heart_beat_id);
        this.heart_beat_id = null;
    }

    private on_recv_data(event) {
        var str_or_buf = event.data;
        if (!this.serivces_handler) {
            return;
        }

        var cmd = proto_man.decode_cmd(this.proto_type, str_or_buf);
        if (!cmd) {
            return;
        }

        var stype = cmd[0];
        var ctype = cmd[1];

        if (stype === 2 && ctype === 4) {
            // 收到心跳包，心跳包处理在此处理
            //console.log("收到心跳包处理");
            this.start_check_heart_beat();
        }

        if (this.serivces_handler[stype]) {
            this.serivces_handler[stype](cmd[0], cmd[1], cmd[2]);
        }
    }

    private on_socket_close(event) {
        if (this.sock) {
            this.close();
        }
    }

    private on_socket_err(event) {
        this.close();
    }

    connect(url: string, proto_type: number) {
        this.sock = new WebSocket(url);
        this.sock.binaryType = "arraybuffer";

        this.sock.onopen = this.on_opened.bind(this);
        this.sock.onmessage = this.on_recv_data.bind(this);
        this.sock.onclose = this.on_socket_close.bind(this);
        this.sock.onerror = this.on_socket_err.bind(this);

        this.proto_type = proto_type;
    }

    send_cmd(stype, ctype, body) {
        if (!this.sock || !this.is_connected) {
            // 重新连接 socket
            let cache = [];
            cache[0] = stype;
            cache[1] = ctype;
            cache[2] = body;
            this.cache_send_cmd.push(cache);
            this.connect("ws://222.177.66.226:3001", proto_man.PROTO_JSON);
            return;
        }
        //console.log(`stype:${stype}, ctype:${ctype}, body:${body}`);
        var buf = proto_man.encode_cmd(this.proto_type, stype, ctype, body);

        this.sock.send(buf);
        this.start_check_heart_beat();
    }

    close() {
        this.is_connected = false;
        this.stop_check_heart_beat();
        if (this.sock !== null) {
            this.sock.close();
            this.sock = null;
        }
    }

    register_serivces_handler(serivces_handler) {
        this.serivces_handler = serivces_handler;
    }
}