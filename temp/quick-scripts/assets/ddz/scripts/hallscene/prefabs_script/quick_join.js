(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/hallscene/prefabs_script/quick_join.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd73e8Dcv/hJKpMYRR62Le99', 'quick_join', __filename);
// ddz/scripts/hallscene/prefabs_script/quick_join.js

"use strict";

var _mygolbal = require("../../mygolbal.js");

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        label: [cc.Label]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        var _this = this;

        _mygolbal2.default.socket.requestConfig(function (err, result) {
            if (err != 0) {
                console.log("requestConfig err:" + err);
                var TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
                TipsLabel.string = result;
                setTimeout(function () {
                    TipsLabel.string = '';
                }, 2000);
            } else {
                console.log("requestConfig" + JSON.stringify(result));
                _this.label[0].string = result['1'].bottom;
                _this.label[1].string = result['2'].bottom;
                _this.label[2].string = result['3'].bottom;
                _this.label[3].string = result['4'].bottom;
            }
        });
        _mygolbal2.default.socket.onMatchresult(function (data) {
            console.log("onMatchresult" + JSON.stringify(data));
            var hallScene = cc.find("ROOT_UI");
            hallScene.emit('hideLoading');
            //网络数据包
            _mygolbal2.default.playerData.bottom = data.bottom;
            _mygolbal2.default.playerData.rate = data.rate;
            var TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
            TipsLabel.string = '正在加入房间。。。';
            cc.director.loadScene("gameScene", function () {
                TipsLabel.string = '';
            });
        });
    },
    _quick_join: function _quick_join(rate) {
        var _this2 = this;

        if (rate < 0 || rate > 4) {
            console.log("create room rate error" + rate);
            return;
        }

        var global = 0;
        if (rate == 1) {
            global = 10;
        } else if (rate == 2) {
            global = 20;
        } else if (rate == 3) {
            global = 30;
        } else if (rate == 4) {
            global = 40;
        }

        var room_para = {
            roomLevel: rate
        };
        _mygolbal2.default.socket.request_quickjoin(room_para, function (err, result) {
            var hallScene = cc.find("ROOT_UI");
            if (err != 0) {
                console.log("quickjoin err:" + err);
                hallScene.emit('hideLoading');
                var TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
                TipsLabel.string = result;
                setTimeout(function () {
                    TipsLabel.string = '';
                }, 2000);
                _this2.node.destroy();
            } else {
                console.log("quickjoin" + JSON.stringify(result));
                hallScene.emit('showLoading');
                _this2.node.destroy();
            }
        });
    },


    // update (dt) {},
    onButtonClick: function onButtonClick(event, customData) {
        switch (customData) {
            case "_quick_join_1":
                this._quick_join(1);
                break;
            case "_quick_join_2":
                this._quick_join(2);
                break;
            case "_quick_join_3":
                this._quick_join(3);
                break;
            case "_quick_join_4":
                this._quick_join(4);
                break;
            case "_quick_join_close":
                this.node.destroy();
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
        //# sourceMappingURL=quick_join.js.map
        