"use strict";
cc._RF.push(module, 'ba3e48snhxAYqGJTfBSUjaa', 'IAPMgr');
// NiuNiu/script/common/IAPMgr.js

/**
 * Created by skyxu on 2018/3/13.
 */

"use strict";

var IAP = require('./IAP');
var Utils = require('./UtilsOther');

var IAPMgr = cc.Class({

    ctor: function ctor() {

        /**
         * @type {IAP}
         */
        this.iap = new IAP();

        /**
         * @type {boolean}
         */
        this._initSuccess = false;
    },

    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (IAPMgr.instance == null) {
                IAPMgr.instance = new IAPMgr();
            }
            return IAPMgr.instance;
        }
    },

    /**
     *
     * @param isDebug{Boolean} 是否调试模式
     */
    initIAP: function initIAP(isDebug) {
        cc.log("init iap");
        this._initSuccess = this.iap.init(this, isDebug);
    },

    /**
     * @param {string} name sdkbox_config.json对应的key
     */
    pay: function pay(name) {
        if (this._initSuccess) {
            cc.log(' 购买的商品id：' + name);
            this.iap.pay(name);
        }
    },

    /**
     * 恢复购买
     */
    restore: function restore() {
        if (this._initSuccess) {
            cc.log("IAPMgr restore");
            this.iap.restore();
        }
    },

    /**
     * 购买保护
     */
    savePurchaseSuccessProductInfo: function savePurchaseSuccessProductInfo(id, receipt) {

        // farm.localStorage.setItem()
    },

    /*********************
     * IAP callbacks
     *********************/
    onInitialized: function onInitialized(res) {
        cc.log("sdkbox iap init: " + res);
    },

    onSuccess: function onSuccess(product) {
        // cc.log("FarmIAPMgr: onSuccess " + product);
        cc.log("IAPMgr store onSuccess = " + JSON.stringify(product));

        //
        // farm.viewManager.popLoading();

        var obj = {};
        obj.productId = product.name;
        obj.vender = "APPLE";
        obj.receipt = product.receiptCipheredPayload;
        // farm.game.serverproxy.getPurchaseSucessfullyInfo(obj);
        cc.log("buy success------------1");
        cc.log("product.name:" + product.name);
        IapTools.onBuySuc(product.name);
        cc.log("buy success------------2");
    },
    onFailure: function onFailure(product, msg) {
        // cc.log("FarmIAPMgr: onFailure " + product + "  msg: " + msg);
        cc.log("IAPMgr store onFailure = " + JSON.stringify(product) + " ===   msg: " + msg);

        // farm.viewManager.popLoading();

        cc.log("buy failed------------1");
        cc.log("product.name:" + product.name);
        IapTools.onBuyFailed(msg);
        cc.log("buy failed------------2");
    },
    onCanceled: function onCanceled(product) {
        // cc.log("FarmIAPMgr: onCanceled " + product);
        // farm.viewManager.popLoading();
    },
    onRestored: function onRestored(product) {
        cc.log("IAPMgr: onRestored " + JSON.stringify(product));
        // farm.viewManager.popLoading();
    },

    onRestoreComplete: function onRestoreComplete(ok, msg) {
        cc.log("IAPMgr: onRestored Complete " + ok + ", " + msg);

        IapTools.onRestoreFinished(ok, msg);
    },


    onProductRequestSuccess: function onProductRequestSuccess(products) {
        //Returns you the data for all the iap products
        //You can get each item using following method
        //products

        cc.log("IAPMgr store onProductRequestSuccess = " + JSON.stringify(products));
        // let obj = {
        //     "name":"coin_package",
        //     "id":"com.cocos2dx.plugintest2",
        //     "title":"",
        //     "description":"",
        //     "price":"","currencyCode":"",
        //     "receipt":"",
        //     "receiptCipheredPayload":""
        // }

        // let obj = {};
        // obj.productId = product.name;
        // obj.vender = "APPLE";
        // obj.receipt = product.receiptCipheredPayload;
        // farm.game.serverproxy.getPurchaseSucessfullyInfo(obj);

        // for (let i = 0; i < products.length; i++) {
        //     // loop
        //     cc.log("FarmIAPMgr: onProductRequestSuccess " + i + ": " + JSON.stringify(products[i]));
        // }
    },
    onProductRequestFailure: function onProductRequestFailure(msg) {
        cc.log("IAPMgr: onProductRequestFailure " + msg);
    }
});

module.exports = IAPMgr;

cc._RF.pop();