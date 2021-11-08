(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/AssetMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9840SFrGVL6b/gAnf9irV8', 'AssetMgr', __filename);
// NiuNiu/script/common/AssetMgr.js

/**
 * Created by skyxu on 2018/3/27.
 */

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        settingPrefab: cc.Prefab,
        shopPrefab: cc.Prefab,
        dialogPrefab: cc.Prefab,
        toastPrefab: cc.Prefab,
        cardPrefab: cc.Prefab,
        modeSelPre: cc.Prefab
    },

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        GlobalNiuNiu.assetMgr = this;
        this.setAutoRelease(true);
    },

    setAutoRelease: function setAutoRelease(autoRelease) {
        // FIXME: 当前未绑定任何prefab，暂时不需要执行以下代码
        // cc.loader.setAutoRelease(this.prefabGameSuc, autoRelease);
        // cc.loader.setAutoRelease(this.prefabGameFailed, autoRelease);
        // cc.loader.setAutoRelease(this.prefabSetting, autoRelease);
        // cc.loader.setAutoRelease(this.prefabShop, autoRelease);
        // cc.loader.setAutoRelease(this.prefabBaseTipShowView, autoRelease);
    },

    /**
     * 释放掉和游戏场景有关的资源
     */
    releaseGameRes: function releaseGameRes() {
        // var slotsId = 6;
        // xlog("release game res.");
        // if (GlobalNiuNiu.assetManager.curSlotsIconAtlas){
        //     var depends = cc.loader.getDependsRecursively(GlobalNiuNiu.assetManager.curSlotsIconAtlas);
        //     cc.loader.release(depends);
        //
        //     // cc.loader.release(GlobalNiuNiu.assetManager.curSlotsIconAtlas);
        // }
        // var url = "slots_" + slotsId + "/animations";
        // cc.loader.releaseResDir(url);
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
        //# sourceMappingURL=AssetMgr.js.map
        