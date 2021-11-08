"use strict";
cc._RF.push(module, 'd4ff7poW5ZCAYNWhB0b+2Oq', 'joinRoomNiuNiu');
// NiuNiu/script/joinRoomNiuNiu.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        joinids: {
            type: cc.Label,
            default: []
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.joinid = "";
        this.cur_input_count = -1;
    },
    start: function start() {},


    //  update (dt) {

    //  },

    onButtonClick: function onButtonClick(event, customData) {
        if (customData.length === 1) {
            if (this.joinid.length >= 5) {
                //判断加入房间逻辑

                return;
            }
            this.joinid += customData;
            this.cur_input_count += 1;
            this.joinids[this.cur_input_count].string = customData;
            //console.log("joinid.length:"+this.joinid.length)


            console.log("customData:" + customData);
        }
        switch (customData) {
            case "back":
                if (this.cur_input_count < 0) {
                    return;
                }
                this.joinids[this.cur_input_count].string = "";
                this.cur_input_count -= 1;
                this.joinid = this.joinid.substring(0, this.joinid.length - 1);
                break;
            case "clear":
                for (var i = 0; i < 5; ++i) {
                    this.joinids[i].string = "";
                }
                this.joinid = "";
                this.cur_input_count = -1;
                break;
            case "close":
                this.node.destroy();
                break;
            case "join":
                GlobalNiuNiu.netProxy.enterRoom(parseInt(this.joinid), function (resp) {
                    GlobalNiuNiu.gameMgr.onEnterRoom(resp);
                });
                break;
            default:
                break;
        }
    },
    close: function close() {
        this.node.active = false;
    }
});

cc._RF.pop();