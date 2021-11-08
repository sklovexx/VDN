(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/CoinsMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '28fd1biYCRK2aPpm7QT7GDe', 'CoinsMgr', __filename);
// NiuNiu/script/common/CoinsMgr.js

/**
 * Created by skyxu on 2018/5/3.
 */

"use strict";

var DataMgr = require("./DataMgr");
var ViewMgr = require("./ViewMgr");

var CoinsMgr = cc.Class({
    ctor: function ctor() {}
});

/**
 *
 * @param coins{Number}
 * @param sucCall{Function}
 * @param failedCall{Function}
 * @param toShop{Boolean} 金币不足是否进入商店(默认进入)
 */
CoinsMgr.costCoins = function (coins, sucCall, failedCall, toShop) {
    var playerObj = DataMgr.getInstance().playerObj;
    toShop = toShop === undefined ? true : toShop;
    if (coins > playerObj.coins) {
        var call = null;
        if (toShop) {
            call = function call() {
                ViewMgr.getInstance().showShopView();
            };
        } else {
            call = failedCall;
        }
        // mark: 统一弹框提示
        // AlertView.showGreen("Alert", "You are out of coins. Visit the shop for more.", "OK", call);
        call();
    } else {
        playerObj.coins -= coins;
        GlobalNiuNiu.uiUpdater.updateUserCoins();
        if (sucCall) {
            sucCall();
        }
    }
};

/**
 *
 * @param coins{Number}
 * @param updateUi{Boolean} 默认true, 是否刷新ui
 */
CoinsMgr.addCoins = function (coins, updateUi) {
    var playerObj = DataMgr.getInstance().playerObj;
    var achieveObj = DataMgr.getInstance().achieveObj;

    playerObj.coins += coins;
    achieveObj.accCoins += coins;

    if (updateUi === undefined || updateUi === null) {
        updateUi = true;
    }
    if (updateUi) {
        GlobalNiuNiu.uiUpdater.updateUserCoins();
    }
};

module.exports = CoinsMgr;

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
        //# sourceMappingURL=CoinsMgr.js.map
        