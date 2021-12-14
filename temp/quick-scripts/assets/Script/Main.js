(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bade2KCgp5J+5NoNiE5+UPt', 'Main', __filename);
// Script/Main.js

"use strict";

// let  i18n = require('LanguageData');
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        MainPage: cc.Prefab,
        _thime: 0,
        toggles: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        // i18n.init(GameData.curLanguage);
        // i18n.updateSceneRenderers()
    },
    OnOpenPage: function OnOpenPage(event, customEventData) {
        Global.PageMgr.onOpenPage(customEventData);
    },
    start: function start() {
        if (Global.ResourceMgr != undefined) {} else {
            Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
            Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
            Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
            Global.PageMgr.state = 1;
            Global.PageMgr.onOpenPage(0);
        }
        // Global.ResourceMgr.playBgAudio();
        var node = cc.instantiate(this.MainPage);
        node.parent = this.content;
        // cc.find('Canvas/KuangChi/UserData/Audio').getComponent(cc.Toggle).isChecked = GameData.audio;
        // window.sdk = {
        //
        // }
        // window.sdk.openAudio = function(){
        //     Global.ResourceMgr.playBgAudio();
        //     if(GameData.audio==false){
        //         cc.audioEngine.pauseAll();
        //     }
        // }
        // window.sdk.closeAudio = function(){
        //     cc.audioEngine.pauseAll();
        // }
        // dsBridge.register('openAudio', function (data) {
        //     Global.ResourceMgr.playBgAudio();
        //     if(GameData.audio==false){
        //         cc.audioEngine.pauseAll();
        //     }
        //     return "success"
        // });
        // dsBridge.register('closeAudio', function (data) {
        //     cc.audioEngine.pauseAll();
        //     return "success"
        // });
    },

    //聲音開關
    toggleChange: function toggleChange(event) {
        if (event.isChecked) {
            GameData.audio = true;
            Global.ResourceMgr.playBgAudio();
            event.target.getComponent(cc.Sprite).enabled = false;
        } else {
            GameData.audio = false;
            cc.audioEngine.pauseAll();
            event.target.getComponent(cc.Sprite).enabled = true;
        }
    },
    fanHui: function fanHui() {
        cc.find('Canvas/Main/FanHui').active = false;
        Global.ProtocolMgr.queryNongChangUserData();
    },
    filterClick: function filterClick() {
        console.log('点击过滤');
        return;
    },
    tabLanguager: function tabLanguager() {
        if (GameData.curLanguage == 'zh') {
            GameData.curLanguage = 'en';
            i18n.init('en');
            i18n.updateSceneRenderers();
        } else {
            GameData.curLanguage = 'zh';
            i18n.init('zh');
            i18n.updateSceneRenderers();
        }
    },
    logOut: function logOut() {
        cc.sys.localStorage.removeItem("com.game.vdn.token");
        Global.PageMgr.closeAllPages();
        Global.PageMgr.onOpenPage(0);
    },
    onClickSubmitLogout: function onClickSubmitLogout() {
        var reqData = {};
        Global.ProtocolMgr.querySubmitLogout(reqData, function (res) {
            if (res.code == 200) {
                Global.SocketMgr.closeSocket(function () {
                    Global.PageMgr.onOpenPage(21);
                });
            }
        });
    },
    update: function update(dt) {
        this._thime += dt;
        if (this._thime >= 10) {
            var reqData = {
                command: "ping",
                username: window.DEFAULT_userID
            };
            Global.SocketMgr.send_data(reqData);
            this._thime = 0;
        }
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
        //# sourceMappingURL=Main.js.map
        