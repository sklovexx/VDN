"use strict";
cc._RF.push(module, 'bc276DH0slIioDEKLzoOj1x', 'AlertBindFBCtrl');
// NiuNiu/script/views/AlertBindFBCtrl.js

/**
 * Created by skyxu on 2018/7/19.
 */

"use strict";

var ViewBase = require("./../common/ViewBase");
var DataMgr = require("./../common/DataMgr");
var Utils = require("./../common/UtilsOther");

cc.Class({
    extends: ViewBase,

    properties: {
        btnLogin: cc.Button,
        btnCollect: cc.Button,
        btnClose: cc.Button,
        labelCoins: cc.Label,

        _showType: 0,
        showType: {
            type: cc.Integer,
            set: function set(t) {
                this.setType(t);
            },
            get: function get() {
                return this._showType;
            }
        }
    },

    /**
     *
     * @param t{0:login 1:collect}
     */
    setType: function setType(t) {
        this._showType = t;
        var act = false;
        if (t <= 0) {
            act = true;
        }
        this.btnLogin.node.active = act;
        this.btnClose.node.active = act;
        this.btnCollect.node.active = !act;
    },
    onLoad: function onLoad() {
        this.labelCoins.string = "+" + Utils.getThousandSeparatorString(GlobalNiuNiu.config.BIND_FB_COINS);
    },
    onEnable: function onEnable() {
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
    },
    onDisable: function onDisable() {
        GlobalNiuNiu.eventMgr.off(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
    },
    onBindFbSuc: function onBindFbSuc() {
        this.setType(1);
    },
    onBtnLoginFb: function onBtnLoginFb() {
        GlobalNiuNiu.gameMgr.loginFb(true);
    },
    onBtnCollect: function onBtnCollect() {
        GlobalNiuNiu.uiUpdater.updateUserCoins();
        this.onBtnClose();
    }
});

cc._RF.pop();