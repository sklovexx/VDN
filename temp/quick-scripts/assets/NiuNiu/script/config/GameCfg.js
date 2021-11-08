(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/config/GameCfg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '35e68Y9Jy1Cc4NFiGgoZhQL', 'GameCfg', __filename);
// NiuNiu/script/config/GameCfg.js

/**
 * Created by skyxu on 2018/4/26.
 */

"use strict";

var EnemyBaseData = require("./EnemyBaseData");
var GunData = require("./GunData");
var EnemyGroupData = require("./EnemyGroupData");
var AchievementData = require("./AchievementData");
var DailyRewardData = require("./DailyRewardData");
var UtilsOther = require("./../Common/UtilsOther");

var GameCfg = cc.Class({
    properties: {
        isLoadOver: false,
        // mark: 重要，变量名要保持和文件名一致
        enemyCfg: null
    },

    /**
     * 读取本地配置文件
     * @param finishCall {Function} 完成回调
     */
    loadLocalCfg: function loadLocalCfg(finishCall) {
        var _this = this;

        this.loadCounts = 0;

        var enemyInfo = { name: "enemyCfg", onLoad: EnemyBaseData.setData };
        var enemyGroupInfo = { name: "enemyGroupCfg", onLoad: EnemyGroupData.setData };

        var gunBase = { name: "gunBaseCfg", onLoad: GunData.setBaseData };
        var gunLevel = { name: "gunLevelCfg", onLoad: GunData.setLevelData };

        var achieveInfo = { name: "achievementCfg", onLoad: AchievementData.setData };
        var dailyRewardInfo = { name: "dailyRewardCfg", onLoad: DailyRewardData.setData };

        var fileArray = [enemyInfo, enemyGroupInfo, gunBase, gunLevel, achieveInfo, dailyRewardInfo];

        var _loop = function _loop(file) {
            var fileName = file;
            if (UtilsOther.isObject(file)) {
                fileName = file.name;
            }

            cc.loader.loadRes("config/" + fileName, function (err, data) {
                if (err) {
                    cc.log("load local cfg " + fileName + " error: " + err);
                } else {
                    cc.log("load local cfg " + fileName + " suc.");
                    this[fileName] = data;

                    if (UtilsOther.isObject(file) && file.onLoad) {
                        file.onLoad(data);
                    }
                }
                this.loadCounts++;
                this.isLoadOver = this.loadCounts >= fileArray.length;
                if (this.isLoadOver) {
                    EnemyBaseData.initData();
                    EnemyGroupData.initData();
                    GunData.initBaseData();
                    GunData.initLevelData();
                    AchievementData.initData();
                    DailyRewardData.initData();

                    if (finishCall) {
                        finishCall();
                    }
                }
            }.bind(_this));
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = fileArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var file = _step.value;

                _loop(file);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
});
GameCfg.instance = null;
GameCfg.getInstance = function () {
    if (!GameCfg.instance) {
        GameCfg.instance = new GameCfg();
    }
    return GameCfg.instance;
};

module.exports = GameCfg;

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
        //# sourceMappingURL=GameCfg.js.map
        