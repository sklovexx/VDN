/**
 * Created by skyxu on 2018/4/9.
 */

"use strict";

let DataMgr = require("./DataMgr");

cc.Class({
    ctor(){

    },

    updateUserCoins(coins){
        if (coins === undefined || coins === null){
            coins = DataMgr.getInstance().playerObj.coins;
        }
        GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_USER_COINS_CHANGED, coins);
    },

    updateTips(){
        GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_TIPS_UPDATE);
    }
});