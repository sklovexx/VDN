(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/config/EnemyGroupData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '151f1H21khOcpCAXWlrs0Zh', 'EnemyGroupData', __filename);
// NiuNiu/script/config/EnemyGroupData.js

/**
 * Created by edisonjiang on 2018/7/31.
 */

"use strict";

var UtilsOther = require('./../common/UtilsOther');
var EnemyBaseData = require('./EnemyBaseData');

var dataMap = {};
var dataList = [];

var EnemyGroupData = cc.Class({
    statics: {
        _jsonData: null
    },

    properties: {
        id: -1,

        // 敌人信息集合(该集合中的敌人会逐一生成，并减少数量，直至所有敌人都已生成)
        enemysInfo: "",
        enemyInfoArr: [],

        createTimes: 0
    },

    init: function init(jsonData) {
        UtilsOther.clone(jsonData, this);

        this.id = Number(this.id);

        this.enemyInfoArr = UtilsOther.splitWithValueType(this.enemysInfo, String, ";");
        this.enemyInfoArr.forEach(function (currentValue, index, array) {
            var enemyInfo = UtilsOther.splitWithValueType(currentValue, Number, ",");
            array[index] = { id: enemyInfo[0], num: enemyInfo[1], isLimitOthers: enemyInfo[2] };
        });

        this.createTimes = Number(this.createTimes);
    },
    clone: function clone(srcData) {
        this.id = srcData.id;
        this.enemysInfo = srcData.enemysInfo;
        this.enemyInfoArr = JSON.parse(JSON.stringify(srcData.enemyInfoArr));
        this.createTimes = srcData.createTimes;

        return this;
    },
    getRandomEnemy: function getRandomEnemy() {
        var infoNum = this.enemyInfoArr.length;
        if (infoNum <= 0 || this.createTimes <= 0) {
            return null;
        }

        var idx = UtilsOther.randomInteger(0, infoNum - 1);
        var info = this.enemyInfoArr[idx];
        info.num--;
        if (info.num <= 0) {
            UtilsOther.arrayRmObj(this.enemyInfoArr, info);
        }

        this.createTimes--;

        return EnemyBaseData.getData(info.id);
    },
    isRemainEnemy: function isRemainEnemy() {
        return this.enemyInfoArr.length > 0 && this.createTimes > 0;
    },


    /**
     * 在该敌人存在时是否不再产生其他的普通敌人
     * @param enemyId
     * @returns {Boolean}
     */
    isLimitOthers: function isLimitOthers(enemyId) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.enemyInfoArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var enemyInfo = _step.value;

                if (enemyInfo.id == enemyId) {
                    return enemyInfo.isLimitOthers;
                }
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

        return false;
    }
});

EnemyGroupData.setData = function (jsonData) {
    EnemyGroupData._jsonData = jsonData;
};

/**
 * 初始化数据
 * @property {Object} jsonData
 */
EnemyGroupData.initData = function () {
    if (!EnemyGroupData._jsonData) {
        return;
    }

    var list = EnemyGroupData._jsonData;
    var key = 'id';
    for (var i in list) {
        var data = new EnemyGroupData();
        data.init(list[i]);

        dataMap[list[i][key]] = data;
        dataList.push(data);
    }

    delete EnemyGroupData._jsonData;
    EnemyGroupData._jsonData = null;
};

/**
 * 得到某个数据
 * @param {Number} id
 * @returns {EnemyGroupData}
 */
EnemyGroupData.getData = function (id) {
    return dataMap[id];
};
/**
 * 得到某个数据的副本
 * @param {EnemyGroupData} srcData
 * @returns {EnemyGroupData}
 */
EnemyGroupData.getDataCopy = function (srcData) {
    if (srcData instanceof EnemyGroupData) {
        return new EnemyGroupData().clone(srcData);
    } else {
        return null;
    }
};

/**
 * 获得数据的列表
 * @returns {Array.<EnemyGroupData>}
 */
EnemyGroupData.getDataList = function () {
    return dataList;
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
        //# sourceMappingURL=EnemyGroupData.js.map
        