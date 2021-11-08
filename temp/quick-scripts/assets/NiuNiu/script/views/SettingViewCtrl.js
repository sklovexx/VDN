(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/views/SettingViewCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '21debW89uRLQpizyKWiieua', 'SettingViewCtrl', __filename);
// NiuNiu/script/views/SettingViewCtrl.js

/**
 * Created by skyxu on 2018/6/11.
 */

"use strict";

var DataMgr = require("./../common/DataMgr");
var ViewBase = require("./../common/ViewBase");
var AlertView = require("./../views/DialogCtrl");
var FacebookMgr = require("./../common/FacebookMgr");
var ServerProxy = require("./../net/HttpProxy");
var Switch = require("./../common/SwitchControl");
var UtilsCross = require("./../common/UtilsCross");

cc.Class({
    extends: ViewBase,

    properties: {
        btnFb: cc.Button,
        labelName: cc.Label,
        icon: cc.Node,
        switchMusic: Switch,
        switchEff: Switch

    },

    onLoad: function onLoad() {
        // todo: 更新按钮状态
        var settingData = DataMgr.getInstance().settingObj;
        this.switchMusic.isOn = settingData.musicOn;
        this.switchEff.isOn = settingData.effectOn;

        if (FacebookMgr.getInstance().isLogin() && DataMgr.getInstance().playerObj.fbid > 0 && this.btnFb) {
            this.btnFb.interactable = false;
            this.btnFb.node.getChildByName("giftAniNode").active = false;
        }

        var fbicon = DataMgr.getInstance().playerObj.fbicon;
        cc.log("已保存fbicon: " + fbicon);
        if (fbicon !== "") {
            this.icon.getComponent("IconNodeCtrl").loadTexture(fbicon);
        }

        var fbname = DataMgr.getInstance().playerObj.fbname;
        cc.log("已保存fbname: " + fbname);
        if (fbname !== "") {
            this.labelName.string = fbname;
        }
    },
    onEnable: function onEnable() {
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
    },
    onDisable: function onDisable() {
        GlobalNiuNiu.eventMgr.off(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
    },
    start: function start() {
        var _this = this;

        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_UPDATE_FB_ICON, function () {
            var fbicon = DataMgr.getInstance().playerObj.fbicon;
            if (fbicon !== "") {
                _this.icon.getComponent("IconNodeCtrl").loadTexture(fbicon);
            }
        }, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_UPDATE_FB_NAME, function () {
            var fbname = DataMgr.getInstance().playerObj.fbname;
            if (fbname !== "") {
                _this.labelName.string = fbname;
            }
        }, this);
    },
    onBindFbSuc: function onBindFbSuc() {
        this.btnFb.interactable = false;
        this.btnFb.node.getChildByName("giftAniNode").active = false;
    },
    onBtnMusic: function onBtnMusic(event) {
        var settingData = DataMgr.getInstance().settingObj;

        var isOn = settingData.musicOn;
        isOn = !isOn;
        settingData.musicOn = isOn;

        if (isOn) {
            GlobalNiuNiu.audioMgr.playLastMusic();
        } else {
            GlobalNiuNiu.audioMgr.stopMusic();
        }

        this.switchMusic.isOn = isOn;

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },
    onBtnEff: function onBtnEff(event) {
        var settingData = DataMgr.getInstance().settingObj;

        var isOn = settingData.effectOn;
        isOn = !isOn;
        settingData.effectOn = isOn;

        if (!isOn) {
            GlobalNiuNiu.audioMgr.stopAllEffects();
        }

        this.switchEff.isOn = isOn;

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },
    onBtnFb: function onBtnFb() {
        var self = this;
        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
        GlobalNiuNiu.gameMgr.loginFb();
    },
    onBtnTerms: function onBtnTerms() {
        cc.sys.openURL("https://www.baidu.com");

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },
    onBtnRateUs: function onBtnRateUs() {
        cc.log('rate us...');
        cc.sys.openURL("https://play.google.com/store/apps/details?id=com.hawk.bouncestarblast");

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },
    onBtnShare: function onBtnShare() {
        cc.log('share...');
        var title = "Share";
        var bestScore = Math.floor(DataMgr.getInstance().playerObj.bestScore);
        var url = "https://play.google.com/store/apps/details?id=com.hawk.bouncestarblast";
        var extraText = cc.js.formatStr("It's funny,my best score is %d,try to challenge me!   %s", bestScore, url);
        UtilsCross.share(title, extraText);
    },
    onBtnRestore: function onBtnRestore() {
        cc.log('restore...');
        IapTools.restorePurchase(function () {
            cc.log('js restore suc.');
        }, function (err) {
            cc.log('js restore failed.');
        });
    },
    onBtnPrivacy: function onBtnPrivacy() {
        cc.sys.openURL("http://tcl-icloudcdn.tclclouds.com/cloudSecurityBackend/game/201805/Privacy-Policy.html");

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
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
        //# sourceMappingURL=SettingViewCtrl.js.map
        