
cc.Class({
    extends: cc.Component,

    properties: {
        NongChang:[cc.Node],
        TuDi:[cc.Node],
        NongChangDesc:cc.Node,
        NongChangCount:6,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("NongChangUserData",this.onNongChangUserData,this)
        cc.director.GlobalEvent.on("FriendNongChangUserData",this.onFriendNongChangUserData,this)
        //加载数据表
        dataFunc.loadConfigs(false,()=>{
            // Global.ProtocolMgr.queryNongChangUserData()
        });
    },

    start () {

    },
    onDestroy(){
        cc.director.GlobalEvent.off("NongChangUserData")
        cc.director.GlobalEvent.off("FriendNongChangUserData")
    },
    //监听农场信息更新
    onNongChangUserData(){
        let table = 'zhongzi'
        let backPack = GameData.NongChangUserData;
        for(let i = 0;i< backPack.length;i++){
            if(backPack[i]!=undefined&&backPack[i]!=null){
                let id = backPack[i].id + ''
                this.NongChang[i].getComponent(cc.Sprite).enabled = true;
                cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"name",id)+backPack[i].period,(err,res)=>{
                    if(err){
                        console.error(err);
                        return;
                    }
                    let spriteFrame = new cc.SpriteFrame(res)
                    this.NongChang[i].getComponent(cc.Sprite).spriteFrame = spriteFrame
                    if(backPack[i].period==3){
                        //防止重复
                        try {
                            this.NongChang[i].getChildByName('Tip').destroy()
                        }catch (e) {
                        }
                        let tip = cc.instantiate(Global.ResourceMgr.tip);
                        tip.parent = this.NongChang[i];
                        tip.getComponent('Tip').setItem('收获')
                        tip.x = 0;
                        tip.y = 33;
                    }
                })
                this.NongChang[i].off(cc.Node.EventType.TOUCH_END)
                this.NongChang[i].on(cc.Node.EventType.TOUCH_END,()=>{
                    if(!backPack[i]){
                        return
                    }
                    let id = backPack[i].id + ''
                    this.clearPage()
                    this.NongChangDesc.active = true;
                    this.NongChangDesc.x = this.NongChang[i].x;
                    this.NongChangDesc.y = this.NongChang[i].y;
                    this.NongChangDesc.getChildByName('name').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id);
                    let time = backPack[i].time;
                    let period = dataFunc.queryValue(table,'time',id);
                    this.NongChangDesc.getChildByName('period').getComponent(cc.Label).string = dataFunc.getMyDate(time)
                    this.NongChangDesc.getChildByName('process').getComponent(cc.Sprite).fillRange = (period-time)/period;
                    //时期为3表示可收获
                    if(backPack[i].period==3){
                        Global.ProtocolMgr.shouHuoNongZuoWu(i,(data)=>{
                            if(data){
                                // Global.ProtocolMgr.queryNongChangUserData()
                                this.NongChang[i].getChildByName('Tip').destroy()
                                cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"name",id)+'4',(err,res)=>{
                                    if(err){
                                        console.error(err);
                                        return;
                                    }
                                    let spriteFrame = new cc.SpriteFrame(res)
                                    this.NongChang[i].getComponent(cc.Sprite).spriteFrame = spriteFrame
                                })
                                let finish = ()=>{
                                    this.NongChang[i].y-=50;
                                    this.NongChang[i].getComponent(cc.Sprite).spriteFrame = null;
                                    cc.director.GlobalEvent.emit("NongChangUserData",{})
                                }
                                this.shouhuoAnim(this.NongChang[i],finish)
                            }else{
                                Global.PageMgr.showTipPage('收获失败')
                            }
                        });
                        return
                    }
                })
            }else{
                try {
                    this.NongChang[i].getChildByName('Tip').destroy()
                }catch (e) {
                    console.log('空土地')
                }
                this.NongChang[i].off(cc.Node.EventType.TOUCH_END)
                this.NongChang[i].on(cc.Node.EventType.TOUCH_END,()=>{
                    console.log(GameData.ZhongZhiReady.state)
                    if(GameData.ZhongZhiReady.state){
                        Global.ProtocolMgr.zhongZhi(GameData.ZhongZhiReady.id,i)
                    }else{
                        this.clearPage()
                        GameData.ZhongZhiReady.pos = i
                        Global.PageMgr.onOpenPage(2)
                    }
                })
            }
        }
    },
    //监听好友农场信息更新
    onFriendNongChangUserData(){
        let table = 'zhongzi'
        let backPack = GameData.FriendNongChangUserData;
        for(let i = 0;i< backPack.length;i++){
            if(backPack[i]!=undefined&&backPack[i]!=null){
                let id = backPack[i].id + ''
                cc.loader.loadRes('NongChang/'+dataFunc.queryValue(table,"name",id)+backPack[i].period,(err,res)=>{
                    if(err){
                        console.error(err);
                        return;
                    }
                    let spriteFrame = new cc.SpriteFrame(res)
                    this.NongChang[i].getComponent(cc.Sprite).spriteFrame = spriteFrame
                    if(backPack[i].period==3){
                        //防止重复
                        try {
                            this.NongChang[i].getChildByName('Tip').destroy()
                        }catch (e) {
                        }
                        let tip = cc.instantiate(Global.ResourceMgr.tip);
                        tip.parent = this.NongChang[i];
                        tip.getComponent('Tip').setItem('偷取')
                        tip.x = 0;
                        tip.y = 33;
                    }
                })
                this.NongChang[i].off(cc.Node.EventType.TOUCH_END)
                this.NongChang[i].on(cc.Node.EventType.TOUCH_END,()=>{
                    let id = backPack[i].id + ''
                    this.clearPage()
                    this.NongChangDesc.active = true;
                    this.NongChangDesc.x = this.NongChang[i].x;
                    this.NongChangDesc.y = this.NongChang[i].y;
                    this.NongChangDesc.getChildByName('name').getComponent(cc.Label).string = dataFunc.queryValue(table,"name",id);
                    let time = backPack[i].time;
                    let period = dataFunc.queryValue(table,'time',id);
                    this.NongChangDesc.getChildByName('period').getComponent(cc.Label).string = dataFunc.getMyDate(time)
                    this.NongChangDesc.getChildByName('process').getComponent(cc.Sprite).fillRange = (period-time)/period;
                    if(backPack[i].period==3){
                        Global.ProtocolMgr.shouHuoNongZuoWu(i,(data)=>{
                            if(data){
                                // Global.ProtocolMgr.queryNongChangUserData()
                                cc.director.GlobalEvent.emit("FriendNongChangUserData",{})
                                Global.PageMgr.showTipPage(dataFunc.queryValue(table,"name",id)+'+1')
                                this.NongChangDesc.active = false;
                                this.NongChang[i].getChildByName('Tip').destroy()
                            }else{
                                Global.PageMgr.showTipPage('收获失败')
                            }
                        });
                        return
                    }
                })
            }else{
                this.NongChang[i].getComponent(cc.Sprite).spriteFrame = null
                try {
                    this.NongChang[i].getChildByName('Tip').destroy()
                }catch (e) {
                    console.log('空土地')
                }
            }
        }
    },
    //收获动画
    shouhuoAnim(target,callback){
        let action = cc.sequence(cc.moveBy(1,cc.v2(0,50)),cc.callFunc(callback))
        target.runAction(action)
        this.NongChangDesc.active = false;
    },
    clearPage(){
        this.NongChangDesc.active = false;
        Global.PageMgr.closeAllPages()
    },
    // update (dt) {},
});
