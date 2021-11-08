
cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Prefab,
        Content:cc.Node,
        KuangJiDetail:cc.Node,
        Tips:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("KuangJiData",this.onUpdateKuangJiData,this)
        Global.ProtocolMgr.queryKuangJi();
    },
    onUpdateKuangJiData(){
        let backPack = GameData.KuangJiData;
        backPack.forEach(e=>{
            let node = cc.instantiate(this.item);
            node.parent = this.Content;
            cc.loader.load({url:e.picture,type:'png'},(err,res)=>{
                node.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res)
            })
            node.getChildByName('Name').getComponent(cc.Label).string = e.name;
            node.getChildByName('Text1').getComponent(cc.Label).string = '售价：'+e.rent;
            node.getChildByName('Text2').getComponent(cc.Label).string = 'E金币收益：'+e.coinIncome;
            node.getChildByName('Text3').getComponent(cc.Label).string = 'E矿场收益：'+e.mineIncome;
            node.getChildByName('Text4').getComponent(cc.Label).string = 'E令牌收益：'+e.tokenIncome;
            node.getChildByName('Text5').getComponent(cc.Label).string = '总收益时长：'+e.incomeHour+'小时';
            node.getChildByName('ZuYong').getChildByName('Background').color = eval(e.rentAble) ? new cc.color(219,95,156,255) : new cc.color(102,102,102,102);
            if(eval(e.rentAble)){
                node.getChildByName('ZuYong').on(cc.Node.EventType.TOUCH_END,()=>{
                    this.showDetail(e,'租用')
                })
            }
            node.getChildByName('YuYue').on(cc.Node.EventType.TOUCH_END,()=>{
                this.showDetail(e,'预约')
            })
        })
    },
    showDetail(e,tag){
        this.KuangJiDetail.active = true;
        cc.loader.load({url:e.picture,type:'png'},(err,res)=>{
            this.KuangJiDetail.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res)
        })
        let content = this.KuangJiDetail.getChildByName('Layout');
        content.getChildByName('Name').getComponent(cc.Label).string = e.name;
        content.getChildByName('Number').getComponent(cc.Label).string = '编号：'+e.name;
        content.getChildByName('Count').getComponent(cc.Label).string = '预计投放：'+e.count+'(上限)';
        content.getChildByName('Text').getComponent(cc.Label).string = 'E金币收益：'+e.coinIncome;
        content.getChildByName('Text1').getComponent(cc.Label).string = 'E矿场收益：'+e.mineIncome;
        content.getChildByName('Text2').getComponent(cc.Label).string = 'E令牌收益：'+e.tokenIncome;
        content.getChildByName('Text3').getComponent(cc.Label).string = '总收益时长：'+e.incomeHour+'小时';
        content.getChildByName('Text4').getComponent(cc.Label).string = '租用金额：'+e.rent+'E金币';
        this.KuangJiDetail.getChildByName('Button').getChildByName('Label').getComponent(cc.Label).string = tag;
        this.KuangJiDetail.getChildByName('Button').on(cc.Node.EventType.TOUCH_END,()=>{
            this.Tips.active = true;
            this.Tips.getChildByName('Content').getComponent(cc.Label).string = '是否消耗'+e.rent+'E金币进行'+tag+'?';
            this.Tips.getChildByName('Button').on(cc.Node.EventType.TOUCH_END,()=>{
                if(tag == '预约'){
                    Global.ProtocolMgr.YuYueKuangJi(e.id,(data)=>{
                        Global.PageMgr.closeLoadingPage()
                        if(data.code==200){
                            Global.PageMgr.showTipPage('预约成功')
                            this.closeDetail()
                            this.closeTips()
                        }else{
                            Global.PageMgr.showTipPage(data.message)
                        }
                    });
                }else{
                    Global.ProtocolMgr.ZuYongKuangJi(e.id,(data)=>{
                        Global.PageMgr.closeLoadingPage()
                        if(data.code==200){
                            Global.PageMgr.showTipPage('租用成功')
                            this.closeDetail()
                            this.closeTips()
                        }else{
                            Global.PageMgr.showTipPage(data.message)
                        }
                    });
                }
            })
        })
    },
    start () {

    },
    closeDetail(){
        this.KuangJiDetail.active = false;
    },
    closeTips(){
        this.Tips.active = false;
    },
    closePage(){
        Global.PageMgr.onClosePage(5);
    },
    onDestroy(){
        cc.director.GlobalEvent.off("KuangJiData")
    },
    // update (dt) {},
});
