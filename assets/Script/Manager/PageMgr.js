
cc.Class({
    extends: cc.Component,

    properties: {
        state: 0, //主页页面加载状态
        pages: [cc.Node],
        TipsPage:cc.Prefab,
        LoadingPage:cc.Prefab
    },
    // 页面状态
    // 0 矿池

    onLoad () {
        if(!Global.pages){
            Global.pages = []
        }
        this.pages.forEach(e=>{
            Global.pages.push(e.name)
        })
    },

    start() {
        cc.game.addPersistRootNode(this.node)
        this.lateStart()
    },
    lateStart() {
        this.width = cc.view.getFrameSize().width
        window.width = this.width
        this.height = cc.view.getFrameSize().height
        window.height = this.height
        // 存为全局变量
        this.adoptCanvas()
    },
    // 适配解决方案
    adoptCanvas() {
        let canvas = cc.director.getScene().getChildByName('Canvas').getComponent(cc.Canvas)
        // 设计分辨率比
        let rateR = canvas.designResolution.height / canvas.designResolution.width;
        // 显示分辨率比
        let rateV = this.height / this.width;
        if (rateV > rateR) {
            canvas.fitHeight = false;
            canvas.fitWidth = true;
        } else {
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        }
    },
    closePage(event,customData){
        this.onClosePage(parseInt(customData));
    },
    openPage(event,customData){
        this.onOpenPage(parseInt(customData));
    },
    onOpenPage(num, tag) {
        if(Global.pages[num]=="BaoMingPanel"){
            return;
        }
        cc.find('Canvas/'+Global.pages[num]).active = true;
        let action = cc.scaleTo(0.2,1,1)
        if(tag&&tag==1){
            action = cc.moveTo(0.2,cc.v2(0,0));
        }
        // if(Global.pages[num]=="ShopPanel"){
        //     cc.find("Canvas/UserDataPanel").active = true;
        // }
        cc.find('Canvas/'+Global.pages[num]).runAction(action)
    },
    onClosePage(num,tag){
        if(isNaN(num)) return;
        let finish = function(){
            cc.find('Canvas/'+Global.pages[num]).active = false;
        }
        let action = cc.sequence(cc.scaleTo(0.2,1,0),cc.callFunc(finish,this))
        if(tag&&tag==1){
            action = cc.moveTo(0.2,cc.v2(1060,0),cc.callFunc(finish,this));
        }
        cc.find('Canvas/'+Global.pages[num]).runAction(action)
        // cc.find("Canvas/UserDataPanel").active = false;
    },
    closeAllPages() {
        Global.pages.forEach(element => {
            cc.find('Canvas/'+element).active = false
        });
    },
    showTips(event,customData){
        this.showTipPage(customData);
    },
    //顯示提示-橫屏
    showTipPage(text,times = 0.1){
        if(times == null)
        {
            times = 0.1;
        }
        
        this.Tips = cc.instantiate(this.TipsPage);
        this.Tips.parent = cc.find('Canvas');
        this.Tips.active = true;
        let action = cc.sequence(cc.moveBy(1,cc.v2(0,30)),cc.fadeOut(times),cc.callFunc(this.closePage,this))
        this.Tips.runAction(action)
        this.Tips.getComponent('TipsPage').setText(text)
    },
    //顯示提示-豎屏
    showTipPage2(text){
        this.Tips = cc.instantiate(this.TipsPage);
        this.Tips.angle = -90;
        this.Tips.parent = cc.find('Canvas');
        this.Tips.active = true;
        let action = cc.sequence(cc.moveBy(1,cc.v2(30,0)),cc.fadeOut(0.1),cc.callFunc(this.closePage,this))
        this.Tips.runAction(action)
        this.Tips.getComponent('TipsPage').setText(text)
    },
    //顯示加載提示-橫屏
    showLoadingPage(text){
        this.load = cc.instantiate(this.LoadingPage);
        this.load.parent = cc.find('Canvas');
        this.load.getChildByName("Text").getComponent(cc.Label).string = text;
        //用于适配宽度的容器
        this.load.getChildByName("WidthContainer").getComponent(cc.Label).string = text;
        this.load.active = true;
    },
    //顯示加載提示-豎屏
    showLoadingPage2(text){
        this.load = cc.instantiate(this.LoadingPage);
        this.load.angle = -90;
        this.load.parent = cc.find('Canvas');
        this.load.getChildByName("Text").getComponent(cc.Label).string = text;
        //用于适配宽度的容器
        this.load.getChildByName("WidthContainer").getComponent(cc.Label).string = text;
        this.load.active = true;
    },
    closeLoadingPage(){
        this.load.active = false;
    },
    backEcc(){
        cc.director.loadScene('ECC',()=>{
            Global.ResourceMgr.playBgAudio()
            console.log('切换场景')
        })
    },
    // update (dt) {},
});
