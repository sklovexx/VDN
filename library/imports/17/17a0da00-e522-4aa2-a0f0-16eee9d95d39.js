"use strict";
cc._RF.push(module, '17a0doA5SJKoqDwFu7p2V05', 'DataObject');
// NiuNiu/script/common/DataObject.js

/**
 * Created by skyxu on 2018/3/23.
 */

"use strict";

/**
 * 基础数据对象
 */

var DataObject = cc.Class({
    properties: {},

    /**
     * 解析数据
     * @param data {Object} JSON Object
     * @returns {DataObject}
     */
    parse: function parse(data) {
        var key;
        for (key in data) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] !== undefined && data[key] !== null) {
                this[key] = data[key];
            }
        }
    },


    // 只保留属性字段，不保留function
    toString: function toString() {
        return JSON.stringify(this);
    }
});

/**
 * 玩家基础数据
 */
var PlayerObject = cc.Class({
    extends: DataObject,

    properties: {
        uid: 0,
        fbid: 0,
        fbtoken: 0,
        fbicon: "",
        fbname: "",
        fb_cache_key: "", // facebook icon cache key

        bid: "",
        coins: 100000, // 初始金币
        nickname: "逢赌必赢",
        rkeys: 10,
        avatar: ""

    },
    ctor: function ctor() {
        this.props = cc.js.createMap();

        if (this.lastDailyRewardTime === undefined) {
            this.lastDailyRewardTime = 0;
        }
        if (this.normalGameTimes === undefined) {
            this.normalGameTimes = 0;
        }
        if (this.challengeGameTimes === undefined) {
            this.challengeGameTimes = 0;
        }

        // 初始化是否开启时间验证
        if (this.isControlTime === undefined) {
            this.isControlTime = true;
        }
    },


    /**
     * 获得所有枪支中最高的等级
     * @returns {number}
     */
    getMaxGunLevel: function getMaxGunLevel() {
        var maxLevel = 0;
        for (var i = 1; i <= GlobalNiuNiu.config.GUN_COUNTS; i++) {
            maxLevel = Math.max(maxLevel, this[cc.js.formatStr("gun%dLevel", i)]);
        }

        return maxLevel;
    }
});

/**
 * 道具数据
 */
var PropObject = cc.Class({
    extends: DataObject,

    properties: {
        type: 0, // 道具类型
        num: 0 // 道具数量
    },

    ctor: function ctor() {},
    init: function init(type, num) {
        this.type = type;
        this.num = num;
    }
});

/**
 * 玩家付费数据
 */
var IAPObject = cc.Class({
    extends: DataObject,

    properties: {
        hadPay: 0, // 消费总数
        propRefreshTime: 0, // 道具下次刷新时间
        prop1hadBuy: false,
        prop2hadBuy: false,
        prop3hadBuy: false,
        shopProps: [], // 商店道具信息
        showPropTips: false, // 显示道具刷新提示
        vipValid: false // vip是否有效
    }
});

/**
 * 游戏设置信息
 */
var SettingObject = cc.Class({
    extends: DataObject,

    properties: {
        musicOn: true,
        effectOn: true,
        musicVol: 1,
        effectVol: 1,
        notify: true
    }
});

var AchieveObject = cc.Class({
    extends: DataObject,

    properties: {
        accCoins: 0, // 累计获得的金币
        killMonsters: 0, // 杀死敌人数量
        gotFrozens: 0, // 获得冰冻道具数量
        gotShields: 0, // 获得护盾道具数量
        hadDone: null // 标记已经达成的成就 hadDone['id'] = true
    },
    ctor: function ctor() {
        this.hadDone = cc.js.createMap();
    }
});

/**
 * 宝箱奖励信息
 */
var ChestObject = cc.Class({
    extends: DataObject,

    properties: {
        oneOnlyNum: 0, // 只开启一个宝箱的计数,
        starNumCollect: 0, // 已经收集的星星，获得奖励后清零
        shortOpenTime: 0, // 短时宝箱开启时间(秒)
        longOpenTime: 0, // 长时宝箱开启时间(秒)
        showChestTips: false // 显示开启宝箱提示
    }
});

var GuideObject = cc.Class({
    extends: DataObject,

    properties: {}
});

module.exports = {
    DataObject: DataObject,
    PlayerObject: PlayerObject,
    PropObject: PropObject,
    IapObject: IAPObject,
    SettingObject: SettingObject,
    GuideObject: GuideObject,
    ChestObject: ChestObject,
    AchieveObject: AchieveObject
};

cc._RF.pop();