/**
 * Created by skyxu on 2019/3/26.
 */

"use strict";

let ViewBase = require("./../common/ViewBase");
let ModeSelViewCtrl = cc.Class({
    extends: ViewBase,

    properties: {},

    start(){
        this._tmpMode = 3;
    },

    onToggleSelect(toggle, data){
        cc.log(data);
        this._tmpMode = parseInt(data);
    },

    onBtnOk(){
        GlobalNiuNiu.config.GAME_MODE = this._tmpMode;
        GlobalNiuNiu.loadScene("Room");
    }
});

ModeSelViewCtrl.show = function () {
    GlobalNiuNiu.viewMgr.pushView(cc.instantiate(GlobalNiuNiu.assetMgr.modeSelPre));
};
