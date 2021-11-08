"use strict";
cc._RF.push(module, '6bea9e70DdDKYGKRZQO+Ors', 'UiUpdater');
// NiuNiu/script/common/UiUpdater.js

/**
 * Created by skyxu on 2018/4/9.
 */

"use strict";

var DataMgr = require("./DataMgr");

cc.Class({
    ctor: function ctor() {},
    updateUserCoins: function updateUserCoins(coins) {
        if (coins === undefined || coins === null) {
            coins = DataMgr.getInstance().playerObj.coins;
        }
        GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_USER_COINS_CHANGED, coins);
    },
    updateTips: function updateTips() {
        GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_TIPS_UPDATE);
    }
});

cc._RF.pop();