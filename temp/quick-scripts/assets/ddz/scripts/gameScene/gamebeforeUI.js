(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/gameScene/gamebeforeUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34b69bK3SJBFbE0zzOU1X9M', 'gamebeforeUI', __filename);
// ddz/scripts/gameScene/gamebeforeUI.js

"use strict";

var _mygolbal = require("../mygolbal.js");

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        btn_ready: cc.Node,
        btn_gamestart: cc.Node,
        tipsLabel: cc.Label,
        btn_quit: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.btn_gamestart.active = false;
        this.btn_ready.active = false;

        //监听本地的发送的消息
        this.node.on("init", function () {
            console.log("game beforeui init");
            console.log("myglobal.playerData.housemanageid" + _mygolbal2.default.playerData.housemanageid);
            console.log("myglobal.playerData.accountID" + _mygolbal2.default.playerData.accountID);
            if (_mygolbal2.default.playerData.housemanageid == _mygolbal2.default.playerData.accountID) {
                //自己就是房主
                this.btn_gamestart.active = true;
                this.btn_ready.active = false;
            } else {
                this.btn_gamestart.active = false;
                this.btn_ready.active = true;
            }
        }.bind(this));
        //内部事件：准备阶段初始化
        this.node.on("room_waitready", function () {
            if (_mygolbal2.default.playerData.housemanageid == _mygolbal2.default.playerData.accountID) {
                //自己就是房主
                this.btn_gamestart.active = true;
                this.btn_ready.active = false;
                this.btn_quit.active = true;
            } else {
                this.btn_gamestart.active = false;
                this.btn_ready.active = true;
                this.btn_quit.active = true;
            }
        }.bind(this));
        //监听服务器发送来的消息
        // myglobal.socket.onGameStart(function(){
        //     console.log("gamebrforeUI onGameStart revice")
        //     this.node.active = false
        // }.bind(this))
        this.node.on("ready", function () {
            this.btn_ready.active = false;
            this.btn_quit.active = false;
        }.bind(this));
        _mygolbal2.default.socket.onChangeHouseManage(function (data) {
            console.log("gamebrforeUI onChangeHouseManage revice" + JSON.stringify(data));
            _mygolbal2.default.playerData.housemanageid = data;
            var gameScene_script = this.node.parent.parent.getComponent("gameScene");
            gameScene_script.emitEventToPlayer("onChangeHouseManage");
            if (_mygolbal2.default.playerData.housemanageid == _mygolbal2.default.playerData.accountID) {
                //自己就是房主
                this.btn_gamestart.active = true;
                this.btn_ready.active = false;
                this.btn_quit.active = true;
            } else {
                this.btn_gamestart.active = false;
                // this.btn_ready.active = true
            }
        }.bind(this));
    },
    start: function start() {},


    // update (dt) {},
    onButtonClick: function onButtonClick(event, customData) {
        switch (customData) {
            case "btn_ready":
                console.log("btn_ready");
                _mygolbal2.default.socket.requestReady();
                this.btn_ready.active = false;
                this.btn_quit.active = false;
                break;
            case "btn_start":
                // if(isopen_sound){
                //    cc.audioEngine.play(cc.url.raw("resources/sound/start_a.ogg")) 
                //  }
                console.log("btn_start");
                _mygolbal2.default.socket.requestStart(function (err, data) {
                    if (err != 0) {
                        console.log("requestStart err" + err);
                        this.tipsLabel.string = data;
                        setTimeout(function () {
                            this.tipsLabel.string = "";
                        }.bind(this), 2000);
                    } else {
                        console.log("requestStart data" + JSON.stringify(data));
                    }
                }.bind(this));
                break;
            default:
                break;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=gamebeforeUI.js.map
        