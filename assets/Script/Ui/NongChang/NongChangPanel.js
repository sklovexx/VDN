
cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Node,
        item:cc.Prefab,
        ToggleContainer:[cc.Node],
        SubPanel:[cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("ZhongZiData",this.onUpdateZhongZiData,this)
        cc.director.GlobalEvent.on("GuoShiData",this.onUpdateGuoShiData,this)
        cc.director.GlobalEvent.on("ShangChengData",this.onUpdateShangChengData,this)
        this.currentCount = 0;
        this.maxCount = 999;
        this.ToggleContainer.forEach(e =>{
            e.on(cc.Node.EventType.TOUCH_END,()=>{
                this.toggleChange(e.name)
            })
        })
    },
    onDestroy(){
        cc.director.GlobalEvent.off("ZhongZiData")
        cc.director.GlobalEvent.off("GuoShiData")
        cc.director.GlobalEvent.off("ShangChengData")
    },
    start () {

    },
    onUpdateZhongZiData(){
        let children = this.content.children;
        children.forEach(value =>{
            value.destroy();
        })
        let backPack = GameData.ZhongZiData;
        let table = "zhongzi"
        backPack.forEach(value => {
            let node = cc.instantiate(this.item);
            node.parent = this.content;
            let id = value.id + '';
            cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"picture",id),(err,res)=>{
                if(err){
                    console.error(err);
                    return;
                }
                let spriteFrame = new cc.SpriteFrame(res)
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id)+'种子'
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获'+dataFunc.queryValue(table,"reward",id)+'个'+dataFunc.queryValue(table,"name",id)
            node.getChildByName('Price').active = true;
            node.getChildByName('Price').getComponent(cc.Label).string = '价格'+dataFunc.queryValue(table,"price",id)
        })
        this.node.getChildByName('Sale').active = false;
    },
    onUpdateGuoShiData(){
        let children = this.content.children;
        children.forEach(value =>{
            value.destroy();
        })
        let backPack = GameData.GuoShiData;
        let table = "zhongzi"
        backPack.forEach(value => {
            let node = cc.instantiate(this.item);
            node.parent = this.content;
            let id = value.id + '';
            cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"picture",id),(err,res)=>{
                if(err){
                    console.error(err);
                    return;
                }
                let spriteFrame = new cc.SpriteFrame(res)
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id)
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获'+dataFunc.queryValue(table,"reward",id)+'个'+dataFunc.queryValue(table,"name",id)
        })
        this.node.getChildByName('Sale').active = true;
        cc.director.GlobalEvent.emit("TotalReward",{})
    },
    onUpdateShangChengData(){
        let children = this.content.children;
        children.forEach(value =>{
            value.destroy();
        })
        let backPack = GameData.ShangChengData;
        let table = "zhongzi"
        backPack.forEach(value => {
            let node = cc.instantiate(this.item);
            node.parent = this.content;
            let id = value.id + '';
            cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"picture",id),(err,res)=>{
                if(err){
                    console.error(err);
                    return;
                }
                let spriteFrame = new cc.SpriteFrame(res)
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.getChildByName('Buy').off(cc.Node.EventType.TOUCH_END)
                node.getChildByName('Buy').on(cc.Node.EventType.TOUCH_END,()=>{
                    this.SubPanel[0].active = true;
                    this.currentCount = 1
                    cc.director.GlobalEvent.on("ShangChengCount",()=>{
                        this.SubPanel[0].getChildByName('Count').getComponent(cc.EditBox).string = this.currentCount
                    },this)
                    this.maxCount = 999
                    cc.director.GlobalEvent.emit("ShangChengCount",{})
                    this.SubPanel[0].getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
                    this.SubPanel[0].getChildByName('Title').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id)
                    this.SubPanel[0].getChildByName('Price').getComponent(cc.Label).string = '每个果实价值：'+dataFunc.queryValue(table,"reward",id)
                    this.SubPanel[0].getChildByName('Reward').getComponent(cc.Label).string = '每个果实价值：'+dataFunc.queryValue(table,"reward",id)
                    this.SubPanel[0].getChildByName('Time').getComponent(cc.Label).string = '成熟时间：'+dataFunc.getMyDate(dataFunc.queryValue(table,"time",id))
                    this.SubPanel[0].getChildByName('Period').getComponent(cc.Label).string = dataFunc.queryValue(table,"quarter",id)+'季,'+ dataFunc.queryValue(table,"output",id) + '/季'
                    this.SubPanel[0].getChildByName('MaiRu').off(cc.Node.EventType.TOUCH_END)
                    this.SubPanel[0].getChildByName('MaiRu').on(cc.Node.EventType.TOUCH_END,()=>{
                        Global.ProtocolMgr.buyZhongZi(id,this.currentCount)
                    })
                })
            })
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id)+'种子'
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获'+dataFunc.queryValue(table,"reward",id)+'个'+dataFunc.queryValue(table,"name",id)
            node.getChildByName('Buy').active = true;
            node.getChildByName('Buy').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = dataFunc.queryValue(table,"price",id)
        })
        this.node.getChildByName('Sale').active = false;
    },
    addCount(){
        if(this.currentCount<this.maxCount){
            this.currentCount++;
            cc.director.GlobalEvent.emit("ShangChengCount",{})
            cc.director.GlobalEvent.emit("GuoShiCount",{})
        }else{
            Global.PageMgr.showTipPage('已达到最大值')
        }
    },
    minusCount(){
        if(this.currentCount>1){
            this.currentCount--;
            cc.director.GlobalEvent.emit("ShangChengCount",{})
            cc.director.GlobalEvent.emit("GuoShiCount",{})
        }else{
            Global.PageMgr.showTipPage('已达到最小值')
        }
    },
    changeCount(event){
        this.currentCount = event;
        if(this.currentCount>=this.maxCount){
            this.currentCount = this.maxCount
        }
        if(this.currentCount<=1){
            this.currentCount = 1
        }
        cc.director.GlobalEvent.emit("ShangChengCount",{})
        cc.director.GlobalEvent.emit("GuoShiCount",{})
    },
    onEnable(){
        Global.ProtocolMgr.queryZhongZi()
    },
    onDisable(){
        this.ToggleContainer[0].getComponent(cc.Toggle).isChecked = true;
        this.ToggleContainer[0].getChildByName('Text').color = new cc.color(255,255,255)
    },
    closePage(){
        Global.PageMgr.onClosePage(1);
    },
    openSubPanel(event,customEventData){
        this.SubPanel[customEventData].active = true;
    },
    closeSubPanel(event,customEventData){
        this.SubPanel[customEventData].active = false
        cc.director.GlobalEvent.off("ShangChengCount")
    },
    toggleChange(tab){
        this.ToggleContainer.forEach(e =>{
            e.getComponent(cc.Toggle).isChecked = false
            e.getChildByName('Text').color = new cc.color(255,255,255)
            if(e.name == tab){
                e.getComponent(cc.Toggle).isChecked = true
                e.getChildByName('Text').color = new cc.color(138,55,249)
            }
        })
        switch (tab) {
            case 'ZhongZi':
                Global.ProtocolMgr.queryZhongZi()
                break;
            case 'GuoShi' :
                Global.ProtocolMgr.queryGuoShi()
                console.log('打开果实')
                break;
            case 'ShangCheng' :
                Global.ProtocolMgr.queryShangCheng()
                console.log('打开商店')
                break;
        }
    },
    update (dt) {},
});
