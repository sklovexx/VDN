/**
 * Created by skyxu on 2018/7/19.
 */

"use strict";

let ViewBase = require("./../common/ViewBase");
let DataMgr = require("./../common/DataMgr");
let Utils = require("./../common/UtilsOther");

cc.Class({
    extends: ViewBase,

    properties: {
        btnLogin: cc.Button,
        btnCollect: cc.Button,
        btnClose: cc.Button,
        labelCoins: cc.Label,

        _showType: 0,
        showType:{
            type: cc.Integer,
            set(t){
                this.setType(t);
            },
            get(){
                return this._showType;
            }
        }
    },

    /**
     *
     * @param t{0:login 1:collect}
     */
    setType(t){
        this._showType = t;
        let act = false;
        if (t <= 0){
            act = true;
        }
        this.btnLogin.node.active = act;
        this.btnClose.node.active = act;
        this.btnCollect.node.active = !act;
    },

    onLoad(){
        this.labelCoins.string = "+" + Utils.getThousandSeparatorString(GlobalNiuNiu.config.BIND_FB_COINS);
    },

    onEnable(){
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);

    },

    onDisable(){
        GlobalNiuNiu.eventMgr.off(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
    },

    onBindFbSuc(){
        this.setType(1);
    },

    onBtnLoginFb(){
        GlobalNiuNiu.gameMgr.loginFb(true);
    },

    onBtnCollect(){
        GlobalNiuNiu.uiUpdater.updateUserCoins();
        this.onBtnClose();
    }
});
