
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.handle=[]
        cc.game.addPersistRootNode(this.node);
        Global.SocketMgr = this.node.getComponent("SocketMgr")
    },
    //打开socket
    openSocket(){
        // this.ws = new WebSocket('ws://192.168.199.221:8321/websocket/Bearer '+this.GetQueryVariable('token'));//测试地址
        this.ws = new WebSocket(Config.socketUrl+'/websocket/Bearer '+this.GetQueryVariable('token'));//正式环境
        this.ws.onopen = function()
        {
            // Web Socket 已连接上，使用 send() 方法发送数据
            console.log('已连接')
        };

        this.ws.onmessage = function (evt)
        {
            let data = JSON.parse(evt.data);
            // console.log("数据已接收");
            console.log(data)
            switch (data.event) {
                //用戶數據刷新
                case 'USER_REFRESH':
                    GameData.HongBaoUserData = data.data;
                    cc.director.GlobalEvent.emit("HongBaoUserData",{})
                    break;
                //新一輪紅包
                case 'START':
                    GameData.CurHongBao = data.data;
                    cc.director.GlobalEvent.emit("CurHongBaoData",{})
                    break;
                //新一輪紅包倒計時
                case 'TIME_REFRESH':
                    GameData.CountDown = data.data.time;
                    cc.director.GlobalEvent.emit("CountDown",{})
                    GameData.KaiJiangList = data.data.data;
                    cc.director.GlobalEvent.emit("KaiJiangList",{})
                    break;
                //結算開始
                case 'SETTLEMENT_START':
                    GameData.ReadParkSinl = 0;
                    // Global.PageMgr.showLoadingPage('正在结算，请稍后')
                    break;
                //結算結束
                case 'SETTLEMENT_END':
                    GameData.KaiJiangList = data.data.members;
                    GameData.HongBaoJieGuo = data.data.bankerProFit;
                    cc.director.GlobalEvent.emit("KaiJiangList",{})
                    cc.director.GlobalEvent.emit("KaiJiang",{})
                    // Global.PageMgr.closeLoadingPage()
                    break;
                //玩家列表刷新
                case 'RED_REFRESH':
                    GameData.HongBaoList = data.data;
                    cc.director.GlobalEvent.emit("HongBaoListData",{})
                    break;
                //服務器即將開始維護事件
                case 'ABOUT_TO_BEGIN_MAINTENANCE':
                    console.log(data);
                    Global.PageMgr.showTipPage('服务器即将开始维护')
                    break;
                default:
                    return;
            }
        };
        this.ws.onclose = function()
        {
            // 关闭 websocket
            console.log("连接已关闭...");
        };
        // 打开一个 web socket
    },
    closeSocket(callback){
        this.ws.close()
        callback()
    },
    start () {

    },
    GetQueryVariable:function(variable)
    {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    },
    // update (dt) {},
});
