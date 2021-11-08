cc.Class({
    extends: cc.Component,

    properties: {
        list:{
            type:cc.Node,
            default:[]
        },
        Content:{
            type:cc.Node,
            default:null,
        },
        item:{
            type:cc.Prefab,
            default:null
        },
        slot:{
            type:cc.Prefab,
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(Global.ResourceMgr==undefined){
            Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr")
            Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr")
            Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr")
        }
        this.list.forEach(e =>{
            for(let i=0;i<72;i++){
                let node = cc.instantiate(this.slot);
                node.parent = e;
                let num = dataFunc.randomNum(0,9);
                let spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[num])
                node.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
            }
        })
        this.winners = [];
        this.clickState = 1;
        this.currentWager = 0;
        cc.director.GlobalEvent.on("updateWager",this.updateWager,this);
        cc.director.GlobalEvent.on('slotUserData',this.updateUserData,this)
        Global.ProtocolMgr.slotUserData();
        this.height = 0;
        this.timer = 0;
    },
    updateWager(){
        this.node.getChildByName('JiaZhu').getChildByName('BeiShu').getComponent(cc.Label).string = this.currentWager;
    },
    //增加投注倍数
    addWager(){
        if(this.clickState) {
            this.currentWager += 5;
            cc.director.GlobalEvent.emit('updateWager', {});
        }
    },
    //减少投注倍数
    minusWager(){
        if(this.currentWager>=5&&this.clickState){
            this.currentWager-=5;
            cc.director.GlobalEvent.emit('updateWager',{});
        }
    },
    updateUserData(){
        this.node.getChildByName('User').getChildByName('value').getComponent(cc.Label).string = GameData.SlotUserData.dssc;
    },
    //延迟开始每一列的滚动动画
    startSlot(){
        if(this.clickState){
            this.data = 0;
            Global.ProtocolMgr.slotResult(this.currentWager,data=>{
                if(data.code==200){
                    this.data = data.data.rewardLevel;
                    GameData.SlotUserData.dssc = data.data.amount;
                    this.message = data.data.message
                    //水果机启动后禁止点击
                    this.clickState = 0;
                    this.result = dataFunc.randomNum(0,8);
                    this.num = dataFunc.randomNum(1,3);
                    while(true){
                        this.result2 = dataFunc.randomNum(0,8);
                        if(this.result2!=this.result){
                            break;
                        }
                    }
                    this.numList = [];
                    while (this.numList.length<3){
                        let num = dataFunc.randomNum(0,9);
                        if(this.numList.indexOf(num)==-1){
                            this.numList.push(num);
                        }
                    }
                    this.startAnim(this.list[0],0)
                    cc.audioEngine.play(Global.ResourceMgr.slotClip[0],false,1)
                    setTimeout(()=>{
                        this.startAnim(this.list[1],1)
                    },200)
                    setTimeout(()=>{
                        this.startAnim(this.list[2],2)
                    },400)
                }else{
                    Global.PageMgr.showTipPage(data.message)
                }
            })
        }else{
            Global.PageMgr.showTipPage('游戏已开始')
        }
    },
    start () {
        GameData.audio = 1;
    },
    //水果机滚动动画
    startAnim(list,tag){
        list.y = 0;
        let children = list.children;
        let spriteFrame;
        // 第一项结果值
        if(this.data == 3){
            //结果值
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[9])
        }else if(this.data==2){
            //结果值
            console.log('二等奖')
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result])
        }else if(this.data==1){
            //结果值
            console.log('三等奖',Global.ResourceMgr.SlotTexture[this.result])
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result])
            if(list.parent.name=='item'+this.num){
                spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result2])
            }
        }else{
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.numList[tag]])
        }
        children[children.length-2].getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
        let finish = ()=>{
            if(tag===2){
                cc.audioEngine.pauseAll();
                if(this.data!==0){
                    cc.audioEngine.play(Global.ResourceMgr.slotClip[1],false,1)
                }else{
                    cc.audioEngine.play(Global.ResourceMgr.slotClip[2],false,1)
                }
                this.clickState = 1;
                this.updateUserData()
                Global.PageMgr.showTipPage(this.message)
            }
        }
        let action = cc.sequence(cc.moveBy(5,cc.v2(0,-list.height+540)).easing(cc.easeQuadraticActionInOut()),cc.callFunc(finish))
        list.y = -270
        list.runAction(action);
    },
    closeGames(){
        // Global.ResourceMgr.playTransitionIn()
        this.node.destroy()
    },
    onDestroy(){
        cc.director.GlobalEvent.off("updateWager")
        cc.director.GlobalEvent.off('slotUserData')
        cc.director.loadScene('Dssc',()=>{
            Global.ResourceMgr.playBgAudio()
            console.log('切换场景')
        })
    },
    update (dt) {
        if(this.Content.height>=275){
            if(this.Content.y-150>=this.Content.height){
                this.Content.y = 150;
            }
            this.Content.y+=dt*50;
        }
        this.timer+=dt;
        if(this.timer>1){
            this.timer = 0;
            Global.ProtocolMgr.slotRecord((data)=>{
                if(data.code==200){
                    this.height = 0;
                    let list = data.data;
                    for(let i = list.length-1;i>this.winners.length-1;i--){
                        let node = cc.instantiate(this.item);
                        node.parent = this.Content;
                        node.getChildByName('time').getComponent(cc.Label).string = list[i].time.substring(5,16);
                        node.getChildByName('gain').getComponent(cc.Label).string = list[i].reward;
                        node.getChildByName('phone').getComponent(cc.Label).string = list[i].nickname;
                    }
                    this.winners = list;
                }
            })
        }
    },
});
