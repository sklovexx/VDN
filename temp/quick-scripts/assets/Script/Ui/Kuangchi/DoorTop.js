(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/Kuangchi/DoorTop.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1f69f5sADRBWrRcatcwTdxC', 'DoorTop', __filename);
// Script/Ui/Kuangchi/DoorTop.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        audioClip: {
            type: cc.AudioClip,
            default: null
        },
        // 是否已经打开
        isOpen: false,
        DoorBottom: cc.Node
    },

    //开门
    startOpen: function startOpen() {
        if (!this.isOpen) {
            //门未被打开过
            this.isOpen = true;
            if (cc.sys.localStorage.getItem('backToMain') == null) {
                cc.sys.localStorage.setItem('backToMain', 1);
            }
            var jumpUp = cc.sequence(cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()), cc.callFunc(this.startClose, this));
            this.node.runAction(jumpUp);
        }
    },

    //关门
    startClose: function startClose() {
        if (this.isOpen) {
            // 门已经打开 | 可以关门
            this.isOpen = false;
            var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
            this.node.runAction(jumpDown);
        }
    },
    onLoad: function onLoad() {
        //点击开门
        this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
            if (Global.PageMgr.state == 1) {
                this.startOpen();
                cc.audioEngine.play(this.audioClip, false, GameData.audio + 0);
                setTimeout(function () {
                    Global.PageMgr.onClosePage(0);
                }, this.jumpDuration * 1000);
                this.DoorBottom.getComponent('DoorBottom').startOpen();
            } else {
                Global.PageMgr.showTipPage('时空转换器开启中');
            }
        }, this);
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
        //# sourceMappingURL=DoorTop.js.map
        