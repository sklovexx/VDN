"use strict";
cc._RF.push(module, 'f0614tDnHdKLrNGj3kI3yCG', 'DataMgr');
// NiuNiu/script/common/DataMgr.js

/**
 * Created by skyxu on 2018/3/13.
 */

"use strict";

var DataObject = require("./DataObject");
var GCONFIG = require("./GCONFIG");

var DataMgr = cc.Class({
    ctor: function ctor() {
        this.playerObj = new DataObject.PlayerObject();
        this.iapObj = new DataObject.IapObject();
        this.settingObj = new DataObject.SettingObject();
        this.guideObj = new DataObject.GuideObject();
        this.chestObj = new DataObject.ChestObject();
        this.achieveObj = new DataObject.AchieveObject();
    },


    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (DataMgr.instance == null) {
                DataMgr.instance = new DataMgr();
            }
            return DataMgr.instance;
        }
    },

    /**
     * 读取本地保存的数据
     */
    loadDataFromLocal: function loadDataFromLocal() {

        cc.log("...load local data start...");

        var tmp = cc.sys.localStorage.getItem(GCONFIG.KEY_PLAYERDATA);
        if (tmp) {
            this.playerObj.parse(JSON.parse(tmp));
        }

        tmp = cc.sys.localStorage.getItem(GCONFIG.KEY_IAPDATA);
        if (tmp) {
            this.iapObj.parse(JSON.parse(tmp));
        }

        tmp = cc.sys.localStorage.getItem(GCONFIG.KEY_SETTING);
        if (tmp) {
            this.settingObj.parse(JSON.parse(tmp));
        }

        tmp = cc.sys.localStorage.getItem(GCONFIG.KEY_GAME_GUIDE_DATA);
        if (tmp) {
            this.guideObj.parse(JSON.parse(tmp));
        }

        tmp = cc.sys.localStorage.getItem(GCONFIG.KEY_CHEST_DATA);
        if (tmp) {
            this.chestObj.parse(JSON.parse(tmp));
        }

        tmp = cc.sys.localStorage.getItem(GCONFIG.KEY_ACHIEVE_DATA);
        if (tmp) {
            this.achieveObj.parse(JSON.parse(tmp));
        }

        cc.log("...load local data finished...");
    },


    /**
     * 保存数据到本地
     */
    saveDataToLocal: function saveDataToLocal() {

        cc.log("...save data to local start...");

        cc.sys.localStorage.setItem(GCONFIG.KEY_PLAYERDATA, this.playerObj.toString());
        cc.sys.localStorage.setItem(GCONFIG.KEY_IAPDATA, this.iapObj.toString());
        cc.sys.localStorage.setItem(GCONFIG.KEY_SETTING, this.settingObj.toString());
        cc.sys.localStorage.setItem(GCONFIG.KEY_GAME_GUIDE_DATA, this.guideObj.toString());
        cc.sys.localStorage.setItem(GCONFIG.KEY_CHEST_DATA, this.chestObj.toString());
        cc.sys.localStorage.setItem(GCONFIG.KEY_ACHIEVE_DATA, this.achieveObj.toString());

        cc.log("...save data to local finished...");
    }
});

module.exports = DataMgr;

cc._RF.pop();