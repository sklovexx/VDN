(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/Kuangchi/DoorBg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a1b30h3aURETa8JOLsNn1Wq', 'DoorBg', __filename);
// Script/Ui/Kuangchi/DoorBg.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        tip: cc.Prefab
    },

    onLoad: function onLoad() {
        cc.sys.localStorage.clear('backToMain');
        if (cc.sys.localStorage.getItem('backToMain') == null) {
            var tip = cc.instantiate(this.tip);
            tip.parent = this.node.parent;
            tip.getComponent('Tip').setItem('去社区');
            tip.x = this.node.x;
            tip.y = this.node.y;
        }
        //点击关门
        this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
            cc.find('Canvas/KuangChi/view/content/DoorTop').getComponent('DoorTop').startClose();
            cc.find('Canvas/KuangChi/view/content/DoorBottom').getComponent('DoorBottom').startClose();
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
        //# sourceMappingURL=DoorBg.js.map
        