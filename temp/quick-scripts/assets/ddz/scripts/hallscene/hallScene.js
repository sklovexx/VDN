(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/hallscene/hallScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9eee7bdCqVB/LXv3XqKAza9', 'hallScene', __filename);
// ddz/scripts/hallscene/hallScene.js

'use strict';

var _mygolbal = require('./../mygolbal.js');

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        nickname_label: cc.Label,
        headimage: cc.Sprite,
        gobal_count: cc.Label,
        creatroom_prefabs: cc.Prefab,
        joinroom_prefabs: cc.Prefab,
        TipsLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.nickname_label.string = _mygolbal2.default.playerData.nickName;
        this.gobal_count.string = _mygolbal2.default.playerData.gobal_count;
        cc.loader.load({ url: _mygolbal2.default.playerData.avatarUrl, type: 'jpg' }, function (err, tex) {
            if (err) {
                console.log(err.message || err);
                return;
            }
            this.headimage.spriteFrame = new cc.SpriteFrame(tex);
        }.bind(this));
    },
    start: function start() {},
    quitGame: function quitGame() {
        cc.director.loadScene('Dssc', function () {
            cc.audioEngine.pauseAll();
            console.log('切换场景');
        });
    },

    // update (dt) {},
    onButtonClick: function onButtonClick(event, customData) {
        switch (customData) {
            case "create_room":
                var creator_Room = cc.instantiate(this.creatroom_prefabs);
                creator_Room.parent = this.node.getChildByName('container');
                creator_Room.zIndex = 100;
                break;
            case "join_room":
                var join_Room = cc.instantiate(this.joinroom_prefabs);
                join_Room.parent = this.node.getChildByName('container');
                join_Room.zIndex = 100;
                break;
            case "quick":
                this.TipsLabel.string = '敬请期待';
                setTimeout(function () {
                    this.TipsLabel.string = "";
                }.bind(this), 2000);
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
        //# sourceMappingURL=hallScene.js.map
        