(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/RecreationalCenter/RecreationalCenter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6ef7mY9ltATI/uQubNYsc7', 'RecreationalCenter', __filename);
// Script/Ui/RecreationalCenter/RecreationalCenter.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    goHongBao: function goHongBao() {
        Global.gameName = 'HongBao';
        // cc.view.enableAutoFullScreen(true);
        Global.ResourceMgr.playTransitionIn();
        cc.director.loadScene('HongBao', function () {});
    },
    goSlot: function goSlot() {
        // Global.gameName = 'Slot';
        // cc.view.enableAutoFullScreen(true);
        // Global.ResourceMgr.playTransitionIn()
        // cc.director.loadScene('Slot',()=>{
        // })
        Global.PageMgr.showTipPage('该功能正在开发中');
    },
    closePage: function closePage() {
        Global.PageMgr.onClosePage(6);
    }
}
// update (dt) {},
);

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
        //# sourceMappingURL=RecreationalCenter.js.map
        