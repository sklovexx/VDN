
cc.Class({
    extends: cc.Component,

    properties: {
        JinECount:5,
        LeiQuCount:10,
        JinE:cc.Node,
        LeiQu:cc.Node,
        Tab:cc.Prefab,
        LeiQuTab:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("FaHongBaoConfig",this.onUpdateFaHongBaoConfig,this);
        Global.ProtocolMgr.faHongBaoConfig()
        this.numText = this.node.getChildByName('Num').getComponent(cc.Label);
        this.curLeiQU = 0;
        this.node.getChildByName('发红包').on(cc.Node.EventType.TOUCH_END,this.faHongBao,this)
        this.node.getChildByName('发5个红包').on(cc.Node.EventType.TOUCH_END,this.faHongBaos,this)
    },
    //更新发红包配置信息
    onUpdateFaHongBaoConfig(){
        let JinE = GameData.FaHongBaoConfig.redPackAmounts
        let LeiQu = GameData.FaHongBaoConfig.bombDigitals
        for(let i = 0;i<5;i++){
            let node = cc.instantiate(this.Tab);
            node.parent = this.JinE;
            node.getChildByName('Label').getComponent(cc.Label).string = JinE[i];
        }
        for(let i = 0;i<LeiQu.length;i++){
            let node = cc.instantiate(this.LeiQuTab);
            node.parent = this.LeiQu;
            node.getChildByName('Label').getComponent(cc.Label).string = LeiQu[i];
        }
    },
    onEnable(){
        if(this.JinE.children.length>0){
            //初始化选项
            this.JinE.children[0].getComponent(cc.Toggle).isChecked = true;
            this.LeiQu.children[0].getComponent(cc.Toggle).isChecked = true;
        }
    },
    start () {
    },
    //发送单个红包
    faHongBao(){
        Global.ProtocolMgr.faHongBao(this.curLeiQU,parseInt(this.numText.string),1,(data)=>{
            if(data.code==200){
                Global.PageMgr.closeLoadingPage();
                this.node.active = false;
            }else{
                Global.PageMgr.closeLoadingPage();
                Global.PageMgr.showTipPage2(data.message)
            }
        })
    },
    //发送五个红包
    faHongBaos(){
        Global.ProtocolMgr.faHongBao(this.curLeiQU,parseInt(this.numText.string),5,(data)=>{
            if(data.code==200){
                Global.PageMgr.closeLoadingPage();
                this.node.active = false;
            }else{
                Global.PageMgr.closeLoadingPage();
                Global.PageMgr.showTipPage(data.message)
            }
        })

    },
    //金额选择
    JinEToggle(event){
        let value = parseInt(event.node.getChildByName('Label').getComponent(cc.Label).string)
        this.numText.string = value
    },
    //雷号选择
    LeiQuToggle(event){
        let value = parseInt(event.node.getChildByName('Label').getComponent(cc.Label).string)
        console.log(value)
        this.curLeiQU = value
    },
    // update (dt) {},
});
