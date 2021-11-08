"use strict";
cc._RF.push(module, '3214f8oCIdGv4LUboyfIDRN', 'DailyRewardData');
// NiuNiu/script/config/DailyRewardData.js

/**
 * Created by edisonjiang on 2018/8/31.
 */

"use strict";

var UtilsOther = require("./../common/UtilsOther");

var dataList = [];

var DailyRewardData = cc.Class({
    properties: {
        id: -1,
        roleMaxLevel: 0,

        rewardInfos: "",
        rewardInfoArr: []
    },

    init: function init(jsonData) {
        UtilsOther.clone(jsonData, this);

        this.id = Number(this.id);
        this.roleMaxLevel = Number(this.roleMaxLevel);

        if (this.rewardInfos && this.rewardInfos != "-1") {
            this.rewardInfoArr = UtilsOther.splitWithValueType(this.rewardInfos, String, ";");
            this.rewardInfoArr.forEach(function (currentValue, index, array) {
                var info = UtilsOther.splitWithValueType(currentValue, Number, ",");
                array[index] = { coins: info[0], weight: info[1] };
            });
        }
    }
});

DailyRewardData.setData = function (jsonData) {
    DailyRewardData._jsonData = jsonData;
};

/**
 * 初始化数据
 * @property {Object} jsonData
 */
DailyRewardData.initData = function () {
    if (!DailyRewardData._jsonData) {
        return;
    }

    var list = DailyRewardData._jsonData;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            var rewardData = new DailyRewardData();
            rewardData.init(v);

            dataList.push(rewardData);
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

    delete DailyRewardData._jsonData;
    DailyRewardData._jsonData = null;
};

/**
 * 根据角色的最大等级得到数据
 * @param {Number} roleMaxLevel
 * @returns {DailyRewardData}
 */
DailyRewardData.getRewardData = function (roleMaxLevel) {
    var count = dataList.length;
    if (count <= 0) {
        return null;
    }

    var minLevel = 0,
        maxLevel = 0;
    for (var i = 0; i < count; i++) {
        minLevel = dataList[i].roleMaxLevel;
        if (i + 1 < count) {
            maxLevel = dataList[i + 1].roleMaxLevel;
        } else {
            maxLevel = Number.MAX_VALUE;
        }

        if (roleMaxLevel >= minLevel && roleMaxLevel < maxLevel) {
            return dataList[i];
        }
    }

    return dataList[count - 1];
};

cc._RF.pop();