"use strict";
cc._RF.push(module, '9b543i+qr1Px4nfSdBwSJcb', 'joinRoom');
// ddz/scripts/hallscene/prefabs_script/joinRoom.js

"use strict";

var _mygolbal = require("../../mygolbal.js");

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            this.joinid += customData;
            this.cur_input_count += 1;
            this.joinids[this.cur_input_count].string = customData;
            //console.log("joinid.length:"+this.joinid.length)
            if (this.joinid.length >= 6) {
                //判断加入房间逻辑
                var room_para = {
                    roomid: this.joinid
                };
                _mygolbal2.default.socket.request_jion(room_para, function (err, result) {
                    if (err) {
                        console.log("err" + err);
                        var TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
                        TipsLabel.string = result;
                        setTimeout(function () {
                            TipsLabel.string = '';
                        }, 2000);
                    } else {
                        console.log("join room sucess" + JSON.stringify(result));
                        _mygolbal2.default.playerData.bottom = result.bottom;
                        _mygolbal2.default.playerData.rate = result.rate;
                        cc.director.loadScene("gameScene");
                    }
                });
                return;
            }

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
                for (var i = 0; i < 6; ++i) {
                    this.joinids[i].string = "";
                }
                this.joinid = "";
                this.cur_input_count = -1;
                break;
            case "close":
                this.node.destroy();
                break;
            default:
                break;
        }
    }
});

cc._RF.pop();