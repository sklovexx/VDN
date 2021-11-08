(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/gameScene/failPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ceb2bCT9RESKaeocIPai32', 'failPanel', __filename);
// ddz/scripts/gameScene/failPanel.js

'use strict';

var _mygolbal = require('../mygolbal.js');

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        userList: [cc.Node],
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        if (_mygolbal2.default.playerData.accountID == _mygolbal2.default.playerData.housemanageid) {
            this.node.getChildByName('准备').active = false;
        }
        cc.audioEngine.play(this.audio);
    },
    initData: function initData(data) {
        var _this = this;

        console.warn(data);
        data.forEach(function (v, i) {
            _mygolbal2.default.allPlayerData.forEach(function (e) {
                if (e.accountid == v.account) {
                    if (e.accountid == _mygolbal2.default.playerData.accountID) {
                        _this.userList[i].getChildByName('me').active = true;
                    }
                    _this.userList[i].getChildByName('nickName').getComponent(cc.Label).string = e.nick_name;
                    _this.userList[i].getChildByName('beishu').getComponent(cc.Label).string = _mygolbal2.default.playerData.rate;
                    _this.userList[i].getChildByName('score').getComponent(cc.Label).string = v.amount;
                    _this.userList[i].getChildByName('DSSC').getComponent(cc.Label).string = v.change;
                    if (e.accountid == _mygolbal2.default.playerData.master_accountid) {
                        _this.userList[i].getChildByName('地主标志').active = true;
                        _this.userList[i].getChildByName('beishu').getComponent(cc.Label).string = _mygolbal2.default.playerData.rate * 2;
                    }
                    cc.loader.load({ url: e.avatarUrl, type: 'jpg' }, function (err, tex) {
                        if (err) {
                            console.log(err.message || err);
                            return;
                        }
                        this.userList[i].getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                    }.bind(_this));
                }
            });
        });
    },
    start: function start() {},
    close: function close() {
        this.node.destroy();
    },
    quitRoom: function quitRoom() {
        _mygolbal2.default.socket.request_quit_room({}, function (err, data) {
            if (err != 0) {
                console.log("requestStart err" + err);
            } else {
                console.log("requestStart data" + JSON.stringify(data));
                cc.director.loadScene("hallScene");
            }
        }.bind(this));
    },
    ready: function ready() {
        _mygolbal2.default.socket.requestReady();
        var gamebeforeUI = this.node.parent.getChildByName("gamebeforeUI");
        gamebeforeUI.emit('ready');
        this.node.destroy();
    }
    // update (dt) {},

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
        //# sourceMappingURL=failPanel.js.map
        