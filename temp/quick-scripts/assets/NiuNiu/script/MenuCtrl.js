(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/MenuCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aa1f3dmR0RGu5Tm+f9kUfen', 'MenuCtrl', __filename);
// NiuNiu/script/MenuCtrl.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        editBox: cc.EditBox,
        inputLayer: cc.Node,
        rule: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.inputLayer.active = false;
    },
    showRule: function showRule() {
        this.rule.active = true;
    },
    hideRule: function hideRule() {
        this.rule.active = false;
    },
    start: function start() {
        // 连接网络
        if (!GlobalNiuNiu.connectState) {
            GlobalNiuNiu.netProxy.connect();
        }
    },
    onBtnOpenRoom: function onBtnOpenRoom() {
        GlobalNiuNiu.netProxy.createRoom(function (resp) {
            GlobalNiuNiu.gameMgr.onOpenRoom(resp);
        });
    },
    onBtnEnterRoom: function onBtnEnterRoom() {
        this.inputLayer.active = false;
        var rid = parseInt(this.editBox.string);
        cc.log("join rid:" + rid);
        GlobalNiuNiu.netProxy.enterRoom(rid, function (resp) {
            GlobalNiuNiu.gameMgr.onEnterRoom(resp);
        });
    },
    quitGame: function quitGame() {
        cc.director.loadScene('Dssc', function () {
            console.log('切换场景');
        });
    },
    onBtnInput: function onBtnInput() {
        this.inputLayer.active = true;
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
        //# sourceMappingURL=MenuCtrl.js.map
        