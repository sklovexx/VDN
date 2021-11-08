/**
 * Created by skyxu on 2018/6/11.
 */

"use strict";

let DataMgr = require("./../common/DataMgr");
let ViewBase = require("./../common/ViewBase");
let AlertView = require("./../views/DialogCtrl");
let FacebookMgr = require("./../common/FacebookMgr");
let ServerProxy = require("./../net/HttpProxy");
let Switch = require("./../common/SwitchControl");
let UtilsCross = require("./../common/UtilsCross");

cc.Class({
    extends: ViewBase,

    properties: {
        btnFb: cc.Button,
        labelName: cc.Label,
        icon: cc.Node,
        switchMusic: Switch,
        switchEff: Switch,

    },

    onLoad(){
        // todo: 更新按钮状态
        let settingData = DataMgr.getInstance().settingObj;
        this.switchMusic.isOn = settingData.musicOn;
        this.switchEff.isOn = settingData.effectOn;

        if (FacebookMgr.getInstance().isLogin() && DataMgr.getInstance().playerObj.fbid > 0 && this.btnFb){
            this.btnFb.interactable = false;
            this.btnFb.node.getChildByName("giftAniNode").active = false;
        }

        let fbicon = DataMgr.getInstance().playerObj.fbicon;
        cc.log("已保存fbicon: " + fbicon);
        if (fbicon !== ""){
            this.icon.getComponent("IconNodeCtrl").loadTexture(fbicon);
        }

        let fbname = DataMgr.getInstance().playerObj.fbname;
        cc.log("已保存fbname: " + fbname);
        if (fbname !== ""){
            this.labelName.string = fbname;
        }
    },

    onEnable(){
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);

    },

    onDisable(){
        GlobalNiuNiu.eventMgr.off(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
    },

    start(){
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_UPDATE_FB_ICON, ()=>{
            let fbicon = DataMgr.getInstance().playerObj.fbicon;
            if (fbicon !== ""){
                this.icon.getComponent("IconNodeCtrl").loadTexture(fbicon);
            }
        }, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_UPDATE_FB_NAME, ()=>{
            let fbname = DataMgr.getInstance().playerObj.fbname;
            if (fbname !== ""){
                this.labelName.string = fbname;
            }
        }, this);
    },

    onBindFbSuc(){
        this.btnFb.interactable = false;
        this.btnFb.node.getChildByName("giftAniNode").active = false;
    },

    onBtnMusic(event){
        let settingData = DataMgr.getInstance().settingObj;

        let isOn = settingData.musicOn;
        isOn = !isOn;
        settingData.musicOn = isOn;

        if (isOn){
            GlobalNiuNiu.audioMgr.playLastMusic();
        }else {
            GlobalNiuNiu.audioMgr.stopMusic();
        }

        this.switchMusic.isOn = isOn;

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },

    onBtnEff(event){
        let settingData = DataMgr.getInstance().settingObj;

        let isOn = settingData.effectOn;
        isOn = !isOn;
        settingData.effectOn = isOn;

        if (!isOn){
            GlobalNiuNiu.audioMgr.stopAllEffects();
        }

        this.switchEff.isOn = isOn;

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },

    onBtnFb(){
        let self = this;
        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
        GlobalNiuNiu.gameMgr.loginFb();
    },

    onBtnTerms(){
        cc.sys.openURL("https://www.baidu.com");

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },

    onBtnRateUs(){
        cc.log('rate us...');
        cc.sys.openURL("https://play.google.com/store/apps/details?id=com.hawk.bouncestarblast");

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },

    onBtnShare(){
        cc.log('share...');
        let title = "Share";
        let bestScore = Math.floor(DataMgr.getInstance().playerObj.bestScore);
        let url = "https://play.google.com/store/apps/details?id=com.hawk.bouncestarblast";
        let extraText = cc.js.formatStr("It's funny,my best score is %d,try to challenge me!   %s", bestScore, url);
        UtilsCross.share(title, extraText);
    },

    onBtnRestore(){
        cc.log('restore...');
        IapTools.restorePurchase(()=>{
            cc.log('js restore suc.');
        }, (err)=>{
            cc.log('js restore failed.');
        });
    },

    onBtnPrivacy(){
        cc.sys.openURL("http://tcl-icloudcdn.tclclouds.com/cloudSecurityBackend/game/201805/Privacy-Policy.html");

        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
    },
    
});
