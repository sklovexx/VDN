(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/config/AchievementData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fcf9elNP8RP2L8nsFohp9LI', 'AchievementData', __filename);
// NiuNiu/script/config/AchievementData.js

/**
 * Created by skyxu on 2018/7/27.
 */

"use strict";

var UtilsOther = require('./../common/UtilsOther');

var AchievementData = cc.Class({
    extends: cc.Class,
    name: "AchievementData",

    ctor: function ctor() {
        this.id = -1;
        this.type = -1;
        this.order = -1;
        this.condition = -1;
        this.desc = "";
        this.reward = 0;
    }
});

AchievementData._jsonData = null;
AchievementData.achieveData = []; // 所有成就数据(二维数据，成就分类保存)

AchievementData.setData = function (data) {
    AchievementData._jsonData = data;
};

AchievementData.initData = function () {
    if (!AchievementData._jsonData) {
        return;
    }

    // 最后一行为切割任务类型说明
    var splitInfo = AchievementData._jsonData.pop().type.split(",").map(function (x) {
        return parseInt(x);
    });

    for (var i = 0; i < splitInfo.length; i++) {
        var startIndex = 0;
        var endIndex = 0;
        for (var j = 0; j < i; j++) {
            startIndex += splitInfo[j];
        }
        endIndex = startIndex + splitInfo[i];

        var aTypeAchieveArr = [];
        var aTypeAchieveInfo = AchievementData._jsonData.slice(startIndex, endIndex);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = aTypeAchieveInfo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var a = _step.value;

                var aAchieve = new AchievementData();
                UtilsOther.clone(a, aAchieve);
                // 转换数据类型，以方便使用
                for (var key in aAchieve) {
                    if (!aAchieve.hasOwnProperty(key)) {
                        continue;
                    }
                    if (key === "desc") {
                        aAchieve[key] = aAchieve[key].toString();
                    } else {
                        aAchieve[key] = parseInt(aAchieve[key]);
                    }
                }
                aTypeAchieveArr.push(aAchieve);
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

        AchievementData.achieveData.push(aTypeAchieveArr);
    }

    delete AchievementData._jsonData;
    // cc.log(JSON.stringify(AchievementData.achieveData));
};

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
        //# sourceMappingURL=AchievementData.js.map
        