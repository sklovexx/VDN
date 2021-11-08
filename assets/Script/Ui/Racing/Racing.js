
cc.Class({
    extends: cc.Component,

    properties: {
        carCount:8,
        linesCount:47,
        lineArr:{
            type:cc.Node,
            default:[],
        },
        line:{
            type:cc.Prefab,
            default:null,
        },
        Content:cc.Node,
        car:{
            type:cc.Prefab,
            default:null,
        },
        SubPanel:{
            type:cc.Node,
            default:[],
        },
        Ranking:{
            type:cc.Node,
            default:[],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("UpdateRanking", this.onUpdateRanking, this)
        cc.director.GlobalEvent.on("NextTurn", this.onUpdateNextTurn, this)
        cc.director.GlobalEvent.on("NextTurnTimer", this.onUpdateNextTurnTimer, this)
        cc.director.GlobalEvent.on("RacingStart", this.onRacingStart, this)
        Global.ProtocolMgr.Racing();
        this.rank = [];
        this.timerSpeedUp = [];
        this.lineArr.forEach(e=>{
            for(let i = 0;i<this.linesCount;i++){
                let node = cc.instantiate(this.line);
                node.parent = e;
            }
        })
    },

    start () {
    },
    //開始新一輪比賽
    onUpdateNextTurn(){
        this.Content.parent.x = 0;
        this.currentIndex = 0;
        this.currentMoney = 0;
        this.SubPanel[0].getChildByName('Num').children.forEach(e=>{
            e.getComponent(cc.Toggle).isChecked = false;
        })
        this.SubPanel[0].getChildByName('Money').children.forEach(e=>{
            e.getComponent(cc.Toggle).isChecked = false;
        })
        this.node.getChildByName('Tip').getComponent(cc.Label).string = '请选择要投注的车号'
        this.racing = [];
        for(let i = 0;i<this.carCount;i++){
            let node = cc.instantiate(this.car);
            node.parent = this.Content;
            node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.CarTexture[i])
            node.on(cc.Node.EventType.TOUCH_END,()=>{
                this.SpeedUpById(i)
            },this)
            this.racing.push(node)
        }
    },
    //下一輪倒計時更新
    onUpdateNextTurnTimer(){
        GameData.RacingGameState = 0;
        this.node.getChildByName('Timer').active = true;
        this.node.getChildByName('Timer').getChildByName('Text').getComponent(cc.Label).string = GameData.RacingTimer
    },
    //比賽開始
    onRacingStart(){
        GameData.RacingGameState = 1;
        this.node.getChildByName('Timer').active = false;
        this.racing.forEach((e,i)=>{
            let ani = e.getComponent(cc.Animation);
            let aniState = ani.getAnimationState('racing');
            aniState.speed = Math.random()*1+1;
            let timer = setInterval(()=>{
                aniState.speed = e.RacingSpeedUp? 2:Math.random()*0.8+1;
            },1000)
            let finish = ()=>{
                clearInterval(timer)
                this.rank.push(i)
                if(this.rank.length>=this.carCount){
                    GameData.RacingGameState = 2;
                    cc.director.GlobalEvent.emit("UpdateRanking",{})
                    setTimeout(()=>{
                        this.clear()
                        Global.ProtocolMgr.Racing();
                    },2000)
                    this.rank.forEach((e,i)=>{
                        if(e+1==this.currentIndex){
                            Global.PageMgr.showTipPage('您投注的车获得了第'+(i+1)+'名')
                        }
                    })
                }
            }
            ani.on('finished',finish,this);
            ani.playAdditive();
        })
    },
    ClosePage(){
        Global.PageMgr.onClosePage(4)
    },
    onEnable(){

    },
    clear(){
        this.rank = []
        let children = this.Content.children;
        children.forEach(e =>{
            e.destroy();
        })
    },
    OpenSubPanel(event, customEventData){
        if(GameData.RacingGameState==1){
            Global.PageMgr.showTipPage('游戏已开始')
            return;
        }
        this.SubPanel[customEventData].active = true;
    },
    CloseSubPanel(event, customEventData){
        this.SubPanel[customEventData].active = false;
    },
    //投注
    TouZhu(){
        this.SubPanel[0].getChildByName('Num').children.forEach(e=>{
            if(e.getComponent(cc.Toggle).isChecked){
                this.currentIndex = parseInt(e.name)
            }
        })
        this.SubPanel[0].getChildByName('Money').children.forEach(e=>{
            if(e.getComponent(cc.Toggle).isChecked){
                this.currentMoney = parseInt(e.name)
            }
        })
        let money = this.currentMoney;
        let num = this.currentIndex;
        if(!num||num==0){
            Global.PageMgr.showTipPage('请选择投注车号')
            return;
        }
        if(!money||money==0){
            Global.PageMgr.showTipPage('请选择投注金额')
            return;
        }
        this.node.getChildByName('Tip').getComponent(cc.Label).string = '即将开始'
        Global.PageMgr.showTipPage('成功投注'+num+'号车'+money+'ECC')
        this.SubPanel[0].active = false;
    },
    //排行榜更新
    onUpdateRanking(){
        this.SubPanel[1].active = true;
        this.Ranking.forEach((e,i)=>{
            e.getChildByName('Item').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.CarTexture[this.rank[i]])
        })
    },
    //加速點擊車輛
    SpeedUpById(id){
        if(GameData.RacingGameState!=1){
            Global.PageMgr.showTipPage('游戏未开始')
            return;
        }
        let ani = this.racing[id].getComponent(cc.Animation);
        this.racing[id].getChildByName('fire1').active = false;
        this.racing[id].getChildByName('fire2').active = true;
        this.racing[id].getChildByName('speedUp1').active = false;
        this.racing[id].getChildByName('speedUp2').active = true;
        let aniState = ani.getAnimationState('racing');
        aniState.speed = 2;
        this.racing[id].RacingSpeedUp = true;
        try{
            clearTimeout(this.timerSpeedUp[id])
        }catch (e) {
            console.error(e)
        }
        this.timerSpeedUp[id] = setTimeout(()=>{
            aniState.speed = Math.random()*0.8+1;
            this.racing[id].getChildByName('fire1').active = true;
            this.racing[id].getChildByName('fire2').active = false;
            this.racing[id].getChildByName('speedUp1').active = true;
            this.racing[id].getChildByName('speedUp2').active = false;
            this.racing[id].RacingSpeedUp = false;
        },2000)
    },
    //加速投注車輛
    SpeedUp(){
        if(GameData.RacingGameState!=1){
            Global.PageMgr.showTipPage('游戏未开始')
            return;
        }
        if(this.currentIndex==0){
            Global.PageMgr.showTipPage('您没有投注车号')
            return;
        }
        let ani = this.racing[this.currentIndex-1].getComponent(cc.Animation);
        this.racing[this.currentIndex-1].getChildByName('fire1').active = false;
        this.racing[this.currentIndex-1].getChildByName('fire2').active = true;
        this.racing[this.currentIndex-1].getChildByName('speedUp1').active = false;
        this.racing[this.currentIndex-1].getChildByName('speedUp2').active = true;
        let aniState = ani.getAnimationState('racing');
        aniState.speed = 2;
        this.racing[this.currentIndex-1].RacingSpeedUp = true;
        setTimeout(()=>{
            aniState.speed = Math.random()*0.8+1;
            this.racing[this.currentIndex-1].getChildByName('fire1').active = true;
            this.racing[this.currentIndex-1].getChildByName('fire2').active = false;
            this.racing[this.currentIndex-1].getChildByName('speedUp1').active = true;
            this.racing[this.currentIndex-1].getChildByName('speedUp2').active = false;
            this.racing[this.currentIndex-1].RacingSpeedUp = false;
        },2000)
    },
    update (dt) {
        //有投注車輛時視角自動跟隨
        if(this.currentIndex!=0&&GameData.RacingGameState==1){
            this.Content.parent.x = -(this.racing[this.currentIndex-1].x-400)
            this.node.getChildByName('ScrollView').getComponent(cc.ScrollView).horizontal=false
        }else{
            this.node.getChildByName('ScrollView').getComponent(cc.ScrollView).horizontal=true
        }
    },
});
