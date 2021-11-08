(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/UiUpdater.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6bea9e70DdDKYGKRZQO+Ors', 'UiUpdater', __filename);
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
        //# sourceMappingURL=UiUpdater.js.map
        