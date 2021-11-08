(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/config/EnemyBaseData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34616/OLB5PRb+SOEFVlxct', 'EnemyBaseData', __filename);
// NiuNiu/script/config/EnemyBaseData.js

/**
 * Created by edisonjiang on 2018/4/24.
 */

"use strict";

var UtilsOther = require('./../common/UtilsOther');

var Type = cc.Enum({
    NULL: 0, // 无
    NORMAL: 1, // 普通敌人
    ADVANCED: 2, // 高级敌人
    BOSS: 3, // BOSS
    EGG: 4, // 蛋
    TORTOISE: 5, // 乌龟
    TIGER: 6, // 老虎
    FLY_REWARD: 7 // 飞行的奖励
});

var MoveType = cc.Enum({
    NULL: 0, // 无
    THROW_TOP: 1, // 上方进入
    THROW_SIDE: 2, // 侧面进入
    HORIZONTAL: 3 // 左右横移
});

var SkillType = cc.Enum({
    NULL: 0, // 无
    BOMB: 1, // 投弹
    CALL_ENEMYS: 2, // 召唤小怪
    HIDE: 3 // 隐身
});

var DropItemType = cc.Enum({
    NULL: 0, // 无
    COINS: 1, // 金币
    PROP_FROZEN: 2, // 冰冻道具
    PROP_SHIELD: 3, // 保护盾道具
    COINS_SPECIAL: 4 // 特殊金币
});

var dataMap = {};
var dataList = [];

/**
 * @property {Number} id 编号
 * @property {Number} type 类型
 */
var EnemyBaseData = cc.Class({
    statics: {
        Type: Type,
        MoveType: MoveType,
        SkillType: SkillType,
        DropItemType: DropItemType,
        ID_DEFAULT: 1,
        ID_NULL: 0,
        GROUP_APPEAR: "appear",

        _jsonData: null
    },

    properties: {
        id: -1,
        type: Type.NULL,
        minBlood: 0,
        maxBlood: 0,

        scale: "",
        scaleArr: [],

        rotatePeriod: "",
        rotatePeriodArr: [],

        moveType: "",
        moveTypeArr: [],

        breedBloodRatio: 0,
        breedOdds: 0,
        canSpeedUp: 0,

        skillType: "",
        skillTypeArr: [],

        dropItem: "",
        dropItemArr: [],

        avatarId: "",
        avatarIdArr: [],

        fixPath: false,
        notCalcNum: false, // 标示该敌人是否不计入关卡当前敌人数量中

        subEnemyId: "", // 特殊敌人产生的子敌人ID集合
        subEnemyIdArr: []
    },

    init: function init(jsonData) {
        UtilsOther.clone(jsonData, this);

        this.id = Number(this.id);
        this.type = Number(this.type);
        this.minBlood = Number(this.minBlood);
        this.maxBlood = Number(this.maxBlood);
        this.breedBloodRatio = Number(this.breedBloodRatio);
        this.breedOdds = Number(this.breedOdds);
        this.canSpeedUp = Number(this.canSpeedUp);

        this.scaleArr = UtilsOther.splitWithValueType(this.scale, Number, ",");
        this.rotatePeriodArr = UtilsOther.splitWithValueType(this.rotatePeriod, Number, ",");
        this.moveTypeArr = UtilsOther.splitWithValueType(this.moveType, Number, ",");
        this.skillTypeArr = UtilsOther.splitWithValueType(this.skillType, Number, ",");

        if (this.dropItem && this.dropItem != "-1") {
            this.dropItemArr = UtilsOther.splitWithValueType(this.dropItem, String, ";");
            this.dropItemArr.forEach(function (currentValue, index, array) {
                var dropInfo = UtilsOther.splitWithValueType(currentValue, Number, ",");
                array[index] = { type: dropInfo[0], odds: dropInfo[1], num: dropInfo[2] };
            });
        }

        this.avatarIdArr = UtilsOther.splitWithValueType(this.avatarId, Number, ",");

        this.fixPath = this.fixPath === "true";
        this.notCalcNum = this.notCalcNum === "true";

        if (this.subEnemyId && this.subEnemyId != "-1") {
            this.subEnemyIdArr = UtilsOther.splitWithValueType(this.subEnemyId, Number, ",");
        }
    },
    getRandomScale: function getRandomScale() {
        var scale = UtilsOther.arrayRandomValue(this.scaleArr);
        if (scale == null) {
            scale = 1;
        }
        return scale;
    },
    getRandomRotatePeriod: function getRandomRotatePeriod() {
        var rotatePeriod = UtilsOther.arrayRandomValue(this.rotatePeriodArr);
        if (rotatePeriod == null) {
            rotatePeriod = 0;
        }
        return rotatePeriod;
    },
    getRandomMoveType: function getRandomMoveType() {
        var moveType = UtilsOther.arrayRandomValue(this.moveTypeArr);
        if (moveType == null) {
            moveType = MoveType.THROW_TOP;
        }
        return moveType;
    },
    getRandomAvatarId: function getRandomAvatarId() {
        var avatarId = UtilsOther.arrayRandomValue(this.avatarIdArr);
        if (avatarId == null) {
            avatarId = EnemyBaseData.ID_DEFAULT;
        }
        return avatarId;
    },
    getSmallerScale: function getSmallerScale(scale) {
        for (var i = this.scaleArr.length - 1; i >= 0; i--) {
            if (this.scaleArr[i] < scale) {
                return this.scaleArr[i];
            }
        }

        return 0;
    },
    isOwnSkill: function isOwnSkill(skillType) {
        return this.skillTypeArr.indexOf(skillType) >= 0;
    },
    getDropItemArr: function getDropItemArr() {
        var resultItemArr = [];
        var dropItem = null;
        for (var i in this.dropItemArr) {
            dropItem = this.dropItemArr[i];
            if (Math.random() < dropItem.odds) {
                resultItemArr.push(dropItem);
            }
        }

        return resultItemArr;
    },
    getDropItem: function getDropItem(itemType) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.dropItemArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var dropItem = _step.value;

                if (dropItem.type == itemType) {
                    return dropItem;
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

        return null;
    }
});

EnemyBaseData.setData = function (jsonData) {
    EnemyBaseData._jsonData = jsonData;
};

/**
 * 初始化数据
 * @property {Object} jsonData
 */
EnemyBaseData.initData = function () {
    if (!EnemyBaseData._jsonData) {
        return;
    }

    var list = EnemyBaseData._jsonData;
    var key = 'id';
    for (var i in list) {
        var data = new EnemyBaseData();
        data.init(list[i]);

        dataMap[list[i][key]] = data;
        dataList.push(data);
    }

    delete EnemyBaseData._jsonData;
    EnemyBaseData._jsonData = null;
};

/**
 * 得到某个数据
 * @param {Number} id
 * @returns {EnemyBaseData}
 */
EnemyBaseData.getData = function (id) {
    return dataMap[id];
};

/**
 * 获得数据的列表
 * @returns {Array.<EnemyBaseData>}
 */
EnemyBaseData.getDataList = function () {
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
        //# sourceMappingURL=EnemyBaseData.js.map
        