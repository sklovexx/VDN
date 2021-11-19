// let  i18n = require('LanguageData');
cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Node,
        MainPage:cc.Prefab,
        toggles:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // i18n.init(GameData.curLanguage);
        // i18n.updateSceneRenderers()
    },
    OnOpenPage(event, customEventData){
        Global.PageMgr.onOpenPage(customEventData)
    },
    start () {
        if(Global.ResourceMgr!=undefined){
        }else{
            Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr")
            Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr")
            Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr")
            Global.PageMgr.state = 1;
            Global.PageMgr.onOpenPage(0);
        }
        // Global.ResourceMgr.playBgAudio();
        let node = cc.instantiate(this.MainPage);
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
    toggleChange(event){
        if(event.isChecked){
            GameData.audio = true;
            Global.ResourceMgr.playBgAudio();
            event.target.getComponent(cc.Sprite).enabled = false;
        }else{
            GameData.audio = false;
            cc.audioEngine.pauseAll();
            event.target.getComponent(cc.Sprite).enabled = true;
        }
    },
    fanHui(){
        cc.find('Canvas/Main/FanHui').active = false;
        Global.ProtocolMgr.queryNongChangUserData()
    },
    filterClick(){
        console.log('点击过滤')
        return
    },
    tabLanguager(){
        if(GameData.curLanguage == 'zh'){
            GameData.curLanguage = 'en';
            i18n.init('en');
            i18n.updateSceneRenderers()
        }else{
            GameData.curLanguage = 'zh';
            i18n.init('zh');
            i18n.updateSceneRenderers()
        }
    },
    logOut(){
        cc.sys.localStorage.removeItem("com.game.vdn.token");
        Global.PageMgr.closeAllPages();
        Global.PageMgr.onOpenPage(0);
    },
    
    onClickSubmitLogout()
    {
        let reqData = {};
        Global.ProtocolMgr.querySubmitLogout(reqData,(res)=>{
            if(res.code==200){
                Global.PageMgr.onOpenPage(21);
            }
        });
    }
    // update (dt) {},
});
