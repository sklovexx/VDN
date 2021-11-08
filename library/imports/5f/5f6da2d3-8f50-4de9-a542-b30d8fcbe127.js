"use strict";
cc._RF.push(module, '5f6daLTj1BN6aVCsw2Py+En', 'ModeSelViewCtrl');
// NiuNiu/script/views/ModeSelViewCtrl.js

/**
 * Created by skyxu on 2019/3/26.
 */

"use strict";

var ViewBase = require("./../common/ViewBase");
var ModeSelViewCtrl = cc.Class({
    extends: ViewBase,

    properties: {},

    start: function start() {
        this._tmpMode = 3;
    },
    onToggleSelect: function onToggleSelect(toggle, data) {
        cc.log(data);
        this._tmpMode = parseInt(data);
    },
    onBtnOk: function onBtnOk() {
        GlobalNiuNiu.config.GAME_MODE = this._tmpMode;
        GlobalNiuNiu.loadScene("Room");
    }
});

ModeSelViewCtrl.show = function () {
    GlobalNiuNiu.viewMgr.pushView(cc.instantiate(GlobalNiuNiu.assetMgr.modeSelPre));
};

cc._RF.pop();