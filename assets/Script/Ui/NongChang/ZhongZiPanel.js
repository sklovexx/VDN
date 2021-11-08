
cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Prefab,
        content:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("ZhongZiData",this.onUpdateZhongZiData,this)
    },
    onDestroy(){
        cc.director.GlobalEvent.off("ZhongZiData")
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
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id)+'种子'
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获'+dataFunc.queryValue(table,"reward",id)+'个'+dataFunc.queryValue(table,"name",id)
            node.getChildByName('Price').getComponent(cc.Label).string = '价格'+dataFunc.queryValue(table,"price",id)
            cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"picture",id),(err,res)=>{
                if(err){
                    console.error(err);
                    return;
                }
                let spriteFrame = new cc.SpriteFrame(res)
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
                if(value.count>0){
                    node.getChildByName('Bg').getChildByName('Count').active = true;
                    node.getChildByName('Price').active = false;
                    node.getChildByName('Buy').active = false;
                    node.off(cc.Node.EventType.TOUCH_END)
                    node.on(cc.Node.EventType.TOUCH_END,()=>{
                        Global.ProtocolMgr.zhongZhi(id,GameData.ZhongZhiReady.pos)
                    })
                }else{
                    node.getChildByName('Bg').getChildByName('Count').active = false;
                    node.getChildByName('Price').active = true;
                    node.getChildByName('Buy').active = true;
                    node.getChildByName('Buy').on(cc.Node.EventType.TOUCH_END,()=>{
                        Global.PageMgr.closeAllPages()
                        Global.PageMgr.onOpenPage(1)
                        Global.PageMgr.pages[1].getComponent('NongChangPanel').toggleChange('ShangCheng')
                    })
                }
            })

        })
    },
    start () {

    },
    onEnable(){
        Global.ProtocolMgr.queryZhongZi()
    },
    // update (dt) {},
});
