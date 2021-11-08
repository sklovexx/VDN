import myglobal from "../mygolbal.js"
const POSITION_UP = 1;
const POSITION_DOWN = 2;
cc.Class({
    extends: cc.Component,

    properties: {
        gameingUI: cc.Node,
        card_prefab:cc.Prefab,
        failPanel:cc.Prefab,
        winPanel:cc.Prefab,
        robUI:cc.Node,
        bottom_card_pos_node:cc.Node,
        playingUI_node:cc.Node,
        tipsLabel:cc.Label, //玩家出牌不合法的tips
        startAudio:{
            default:null,
            type:cc.AudioClip
        },
        buyaoAudio:{
            default:null,
            type:cc.AudioClip
        },
        wangzhaAudio:{
            default:null,
            type:cc.AudioClip
        },
        daniAudio:{
            default:null,
            type:cc.AudioClip
        },
        qiangdizhuAudio:{
            default:null,
            type:cc.AudioClip
        },
        lianduiAudio:{
            default:null,
            type:cc.AudioClip
        },
        shunziAudio:{
            default:null,
            type:cc.AudioClip
        },
        zhadan:{
            default:null,
            type:cc.AudioClip
        },
        feiji:{
            default:null,
            type:cc.AudioClip
        },
        sandaiyi:{
            default:null,
            type:cc.AudioClip
        },
        sandaiyidui:{
            default:null,
            type:cc.AudioClip
        },
        baojin1:{
            default:null,
            type:cc.AudioClip
        },
        baojin2:{
            default:null,
            type:cc.AudioClip
        },
        baojin:{
            default:null,
            type:cc.AudioClip
        },
    },

    onLoad () {
        //自己牌列表 
        this.cards_nods = []
        this.card_width = 0
        //当前可以抢地主的accountid
        this.rob_player_accountid = 0
        //发牌动画是否结束
        this.fapai_end = false
        //底牌数组
        this.bottom_card = []
        //底牌的json对象数据
        this.bottom_card_data=[]
        this.choose_card_data=[]
        this.outcar_zone = []

        this.push_card_tmp = []
        this.node.on(cc.Node.EventType.TOUCH_START, this.startCallback, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.endCallback, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveCallback, this);
        //监听服务器:断线消息
        myglobal.socket.disconnect(function(data){
            let gameScene_script = this.node.parent.parent.getComponent("gameScene")
            gameScene_script.emitEventToPlayer("disconnect",data)
        }.bind(this))
        //监听服务器:下发牌消息
        myglobal.socket.onPushCards(function(data){
            console.log("onPushCards"+JSON.stringify(data))
            this.card_data = data
            this.cur_index_card = data.length - 1
            this.pushCard(data)
            if(isopen_sound){
                //循环播放发牌音效
               // this.fapai_audioID = cc.audioEngine.play(cc.url.raw("resources/sound/fapai1.mp3"),true)
                console.log("start fapai_audioID"+this.fapai_audioID) 
            }
             //左边移动定时器
            this.scheduleOnce(this._runactive_pushcard.bind(this),0.3)
            this.node.parent.parent.emit("pushcard_other_event")
           
        }.bind(this))

        //监听服务器:通知抢地主消息,显示相应的UI
        myglobal.socket.onCanRobState(function(data){
            console.log("onCanRobState"+JSON.stringify(data))
            //这里需要2个变量条件：自己是下一个抢地主，2发牌动画结束
            this.rob_player_accountid = data
            if(data==myglobal.playerData.accountID && this.fapai_end==true){
                this.robUI.active = true
                // this.qdzTimer();
            }
          
        }.bind(this))
        myglobal.socket.oninterval(function(data){
            let gameScene_script = this.node.parent.parent.getComponent("gameScene")
            gameScene_script.emitEventToPlayer("interval",data)
            if(data.accountid==myglobal.playerData.accountID){
                if(myglobal.roomState==6){
                    this.playingUI_node.active = true
                    this.playingUI_node.getChildByName('clock').getChildByName('playing_clocl_label').getComponent(cc.Label).string = data.time
                }else{
                    this.robUI.active = true
                    this.robUI.getChildByName('clock').getChildByName('clock_ Label').getComponent(cc.Label).string = data.time
                }      
            }
        }.bind(this))
        myglobal.socket.onendInterval(function(data){
            let gameScene_script = this.node.parent.parent.getComponent("gameScene")
            gameScene_script.emitEventToPlayer("endInterval",data)
            if(data.accountid==myglobal.playerData.accountID){
                this.robUI.active = false
                this.playingUI_node.active = false
            }
        }.bind(this))
        //监听服务器可以出牌消息
        myglobal.socket.onCanChuCard(function(data){
            console.log("onCanChuState"+JSON.stringify(data))
            let gameScene_script = this.node.parent.parent.getComponent("gameScene")
            gameScene_script.emitEventToPlayer("onCanChuCard",data)
            //判断是不是自己能出牌
            if(data.accountid==myglobal.playerData.accountID){
                //先清理出牌区域
                this.clearOutZone(myglobal.playerData.accountID)
                //先把自己出牌列表置空
                //this.choose_card_data=[]
                //显示可以出牌的UI
                this.playingUI_node.active = true
                if(data.status==1){
                    this.playingUI_node.getChildByName("btn_buchu_node").active = false;
                }else{
                    this.playingUI_node.getChildByName("btn_buchu_node").active = true;
                }
            }
        }.bind(this))

        //监听服务器：其他玩家出牌消息
        myglobal.socket.onOtherPlayerChuCard(function(data){
            //{"accountid":"2357540","cards":[{"cardid":4,"card_data":{"index":4,"value":1,"shape":1}}]}
            console.log("onOtherPlayerChuCard"+JSON.stringify(data))
            var accountid = data.accountid
            var gameScene_script = this.node.parent.parent.getComponent("gameScene")
            //获取出牌区域节点
            var outCard_node = gameScene_script.getUserOutCardPosByAccount(accountid)
            if(outCard_node==null){
                return
            }
            if(data.cards==null){
                gameScene_script.emitEventToPlayer("onBuChu",data);
                outCard_node.removeAllChildren(true);
                cc.audioEngine.play(this.buyaoAudio)
                return;
            }
            gameScene_script.emitEventToPlayer("onOtherPlayerChuCard",data)
            var node_cards = []
            for(var i=0;i<data.cards.length;i++){
                var card = cc.instantiate(this.card_prefab)
                card.getComponent("card").showCards(data.cards[i].card_data,myglobal.playerData.accountID)
                node_cards.push(card)
            }
            this.appendOtherCardsToOutZone(outCard_node,node_cards,0)
            this.playPushCardSound(data.cardType.name)
            if(data.accountid==myglobal.playerData.accountID){
                this.destoryCard(data.accountid,data.cards)
                this.choose_card_data = []
            }
        }.bind(this))
        //监听服务器：游戏结算消息
        myglobal.socket.onGameResult(function(data){
            console.log("onGameResult"+JSON.stringify(data))
            let gameScene_script = this.node.parent.parent.getComponent("gameScene")
            gameScene_script.emitEventToPlayer("onGameResult",data)
            data.forEach(e=>{
                console.log(e)
                if(e.account==myglobal.playerData.accountID){
                    console.log(e.change)
                    if(e.change<0){
                        let panel = cc.instantiate(this.failPanel)
                        let script = panel.getComponent('failPanel')
                        script.initData(data)
                        panel.parent = this.node.parent;
                    }else{
                        let panel = cc.instantiate(this.winPanel)
                        let script = panel.getComponent('winPanel')
                        script.initData(data)
                        panel.parent = this.node.parent;
                    }
                }
            })
        }.bind(this))
        //内部事件：准备阶段初始化
        this.node.on("room_waitready",function(){
            this.robUI.active = false;
            this.fapai_end = false;
            this.playingUI_node.active = false;
            this.push_card_tmp = [];
            this.choose_card_data=[]
            this.destoryAllCard();
            this.bottom_card.forEach(e=>{
                e.removeFromParent(true)
            })
            this.bottom_card_data = []
            this.bottom_card = []
        }.bind(this))
        //内部事件:显示底牌事件,data是三张底牌数据
        this.node.on("show_bottom_card_event",function(data){
            console.log("----show_bottom_card_event",+data)
          
            this.bottom_card_data = data
            
            for(var i=0;i<data.length;i++){
                var card = this.bottom_card[i]
                var show_data = data[i]
                var call_data = {
                    "obj":card,
                    "data":show_data,
                }
                console.log("bottom show_data:"+JSON.stringify(show_data))
                var run =  cc.callFunc(function(target,activedata){
                   
                    var show_card = activedata.obj
                    var show_data = activedata.data
                    //console.log("cc.callFunc:"+JSON.stringify(show_data))
                    show_card.getComponent("card").showCards(show_data)
                   
                },this,call_data)

                card.runAction(cc.sequence(cc.rotateBy(0,0,180),cc.rotateBy(0.2,0,-90), run,
                cc.rotateBy(0.2,0,-90),cc.scaleBy(1, 1.2)));
               
                if(true){
                    cc.audioEngine.play(this.startAudio) 
                 }
            }
            //this.node.parent.emit("change_room_state_event",RoomState.ROOM_PLAYING)
            //如果自己地主，给加上三张底牌
            if(myglobal.playerData.accountID==myglobal.playerData.master_accountid){
                this.scheduleOnce(this.pushThreeCard.bind(this),0.2)
            }
            let gameScene_script = this.node.parent.parent.getComponent("gameScene")
            gameScene_script.emitEventToPlayer("show_bottom_card_event")
              
        }.bind(this))

        //注册监听一个选择牌消息 
        this.node.on("choose_card_event",function(event){
            console.log("choose_card_event:"+JSON.stringify(event))
            var detail = event
            this.choose_card_data.push(detail)
        }.bind(this))

        this.node.on("unchoose_card_event",function(event){
            console.log("unchoose_card_event:"+ event)
            var detail = event
            for(var i=0;i<this.choose_card_data.length;i++){
                if(this.choose_card_data[i].cardid==detail){
                    this.choose_card_data.splice(i,1)
                }
            }
        }.bind(this))
        this.node.on("game_settle_event",function(data){
            console.log("game_settle_event:"+data)
            this.tipsLabel.string="正在结算!"
            setTimeout(function(){
                this.tipsLabel.string=""
            }.bind(this), 2000);
        }.bind(this))
    },
    _getCardForTouch: function(touch){
        for(var i = this.cards_nods.length - 1; i >= 0; i--){// 需要倒序
            var pokerSprite = this.cards_nods[i];
            var box = pokerSprite.getBoundingBox();
            if (box.contains(touch)) {
                console.log('in');
                pokerSprite.isChiose = true;
                pokerSprite.opacity = 185;
                return;//关键， 找到一个就返回
            }
        }
    },
    _checkSelectCardReserve(touchBegan, touchMoved) {
        // console.log('_checkSelectCardReserve');
        var p1 = touchBegan.x-5 < touchMoved.x ? touchBegan : touchMoved;
        console.log(touchBegan.x,touchMoved.x)
        
        if (p1 === touchMoved) {
            // for (let i = this.pokerSpriteList.length - 1; i >= 0; i--) {
            for(let i in this.cards_nods){
                var sprite = this.cards_nods[i];
                if (p1.x - sprite.x > -25) {  //
                    sprite.opacity = 255;
                    console.warn(false)
                    sprite.isChiose = false;
                }
            }
        }
        else{
            var width = Math.abs(touchBegan.x - touchMoved.x);
            var height = Math.abs(touchBegan.y - touchMoved.y) > 5 ? Math.abs(touchBegan.y - touchMoved.y) : 5;
            var rect = cc.rect(p1.x, p1.y, width, height);

            for (let i = 0; i < this.cards_nods.length; i++) {
                if (!this.cards_nods[i].getBoundingBox().intersects(rect)) {
                    this.cards_nods[i].isChiose = false;
                    console.warn(true)
                    this.cards_nods[i].opacity = 255;
                }
            }
        }

    },
    startCallback: function(event){
        var gameScene_node = this.node.parent.parent  
        var room_state = gameScene_node.getComponent("gameScene").roomstate
        if(room_state==RoomState.ROOM_PLAYING){
            console.log('start');
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            // console.log(touchLoc.x + "," + touchLoc.y)
            this.touchStart = this.node.parent.convertToNodeSpaceAR(touchLoc);//将坐标转换为当前节点坐标
            // console.log(this.touchStart.x + "," + this.touchStart.y)
            this._getCardForTouch(this.touchStart);
        }
    },
    moveCallback: function(event){
        var gameScene_node = this.node.parent.parent  
        var room_state = gameScene_node.getComponent("gameScene").roomstate
        if(room_state==RoomState.ROOM_PLAYING){
            console.log('move');
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.touchMove = this.node.parent.convertToNodeSpaceAR(touchLoc);//将坐标转换为当前节点坐标
            this._getCardForTouch(this.touchMove);
            //当选过头了，往回拖的时候取消选择
            this._checkSelectCardReserve(this.touchStart, this.touchMove);
        }
    },
    endCallback: function(event){
        var gameScene_node = this.node.parent.parent  
        var room_state = gameScene_node.getComponent("gameScene").roomstate
        if(room_state==RoomState.ROOM_PLAYING){
            console.log('end');
            for(var i = 0; i < this.cards_nods.length; i++){
                var pokerSprite = this.cards_nods[i];
                var carddata = {    
                    "cardid":pokerSprite.card_id,
                    "card_data":pokerSprite.card_data,
                }
                if (pokerSprite.isChiose) {
                    pokerSprite.isChiose = false;
                    pokerSprite.opacity = 255;
                    if(pokerSprite.status === POSITION_UP){
                        pokerSprite.status = POSITION_DOWN;
                        pokerSprite.y -= 20;
                        this.node.emit("unchoose_card_event",pokerSprite.card_id)
                    }
                    else{
                        pokerSprite.status = POSITION_UP;
                        pokerSprite.y += 20;
                        this.node.emit("choose_card_event",carddata)
                    }
                }
            }
        }
    },
    start () {
     
    },
    //处理发牌的效果
    _runactive_pushcard(){
        //console.log("_runactive_pushcard:"+this.cur_index_card)
        if(this.cur_index_card < 0){
            console.log("pushcard end")
            //发牌动画完成，显示抢地主按钮
            //this.robUI.active = true
            this.fapai_end = true
            // if(this.rob_player_accountid==myglobal.playerData.accountID){
            //     this.robUI.active = true
            // }

            if(true){
                //console.log("start fapai_audioID"+this.fapai_audioID) 
                cc.audioEngine.stop(this.fapai_audioID)
            }
           

              //通知gamescene节点，倒计时
            // var sendevent = this.rob_player_accountid
            // this.node.parent.parent.emit("canrob_event",sendevent)

            return
        }

        //原有逻辑  
        // var move_node = this.cards_nods[this.cur_index_card]
        // move_node.active = true
        // var newx = move_node.x + (this.card_width * 0.4*this.cur_index_card) - (this.card_width * 0.4)
        // var action = cc.moveTo(0.1, cc.v2(newx, -250));
        // move_node.runAction(action)
        // this.cur_index_card--
        // this.scheduleOnce(this._runactive_pushcard.bind(this),0.3)

        
        var move_node = this.cards_nods[this.cards_nods.length-this.cur_index_card-1]
        move_node.active = true
        this.push_card_tmp.push(move_node)
        this.fapai_audioID = cc.audioEngine.play(cc.url.raw("resources/sound/fapai1.mp3"))
        for(var i=0;i<this.push_card_tmp.length-1;i++){
                var move_node = this.push_card_tmp[i]
                var newx = move_node.x - (this.card_width * 0.4)
                var action = cc.moveTo(0.05, cc.v2(newx, -250));
                move_node.runAction(action)
        }
        
        this.cur_index_card--
        this.scheduleOnce(this._runactive_pushcard.bind(this),0.15)
    },
 
    //对牌排序
    sortCard(){
        this.cards_nods.sort(function(x,y){
            var a = x.getComponent("card").card_data;
            var b = y.getComponent("card").card_data;

            if (a.hasOwnProperty('value') && b.hasOwnProperty('value')) {
                return  b.value-a.value;
            }
            if (a.hasOwnProperty('king') && !b.hasOwnProperty('king')) {
                return -1;
            }
            if (!a.hasOwnProperty('king') && b.hasOwnProperty('king')) {
                return 1;
            }
            if (a.hasOwnProperty('king') && b.hasOwnProperty('king')) {
                return  b.king-a.king;
            }
        })
        //var x = this.cards_nods[0].x;
        //这里使用固定坐标，因为取this.cards_nods[0].xk可能排序为完成，导致x错误
        //所以做1000毫秒的延时
        var timeout = 1000
        setTimeout(function(){
            //var x = -417.6 
            var x = this.cards_nods[0].x;
            console.log("sort x:"+ x)
            if(x>0){
                x = -400;
            }
            for (let i = 0; i < this.cards_nods.length; i++) {
                var card = this.cards_nods[i];
                card.zIndex = i; //设置牌的叠加次序,zindex越大显示在上面
                card.x = x + card.width * 0.4 * i;
            }
        }.bind(this), timeout);
        
       
    },

  
    pushCard(data){
    if (data) {
            data.sort(function (a, b) {
                if (a.hasOwnProperty('value') && b.hasOwnProperty('value')) {
                    return b.value - a.value;
                }
                if (a.hasOwnProperty('king') && !b.hasOwnProperty('king')) {
                    return -1;
                }
                if (!a.hasOwnProperty('king') && b.hasOwnProperty('king')) {
                    return 1;
                }
                if (a.hasOwnProperty('king') && b.hasOwnProperty('king')) {
                    return b.king - a.king;
                }
            });
        }
      //创建card预制体
      this.cards_nods = []
      for(var i=0;i<17;i++){
        
        var card = cc.instantiate(this.card_prefab)
        card.scale=0.8
        card.parent = this.node.parent
        //card.x = card.width * 0.4 * (17 - 1) * (-0.5) + card.width * 0.4 * 0;
        card.x = card.width * 0.4 * (-0.5) * (-16) + card.width * 0.4 * 0;
        //这里实现为，每发一张牌，放在已经发的牌最后，然后整体移动
        card.y = -250
        card.active = false

        card.getComponent("card").showCards(data[i],myglobal.playerData.accountID)
        //存储牌的信息,用于后面发牌效果
        card.card_id = data[i].index;
        card.card_data = data[i]
        card.status = 2;
        this.cards_nods.push(card)
        this.card_width = card.width
      }
      
      //创建3张底牌
      this.bottom_card = []
      for(var i=0;i<3;i++){
        var di_card = cc.instantiate(this.card_prefab)
        di_card.scale=0.4
        di_card.position = this.bottom_card_pos_node.position 
        //三张牌，中间坐标就是bottom_card_pos_node节点坐标，
        //0,和2两张牌左右移动windth*0.4
        if(i==0){
            
            di_card.x = di_card.x - di_card.width*0.4
        }else if(i==2){
            di_card.x = di_card.x + di_card.width*0.4
        }
        

        //di_card.x = di_card.width-i*di_card.width-20
        //di_card.y=60
        di_card.parent = this.node.parent
        //存储在容器里
        this.bottom_card.push(di_card)
      }

    },

    //给玩家发送三张底牌后，过1s,把牌设置到y=-250位置效果
    schedulePushThreeCard(){
        for(var i=0;i<this.cards_nods.length;i++){
            var card = this.cards_nods[i]
            if(card.y==-230){
                card.y = -250
            }
        }
    },
    //给地主发三张排，并显示在原有牌的后面
    pushThreeCard(){
        //每张牌的其实位置 
        var last_card_x =  this.cards_nods[this.cards_nods.length-1].x
        for(var i=0;i<this.bottom_card_data.length;i++){
            var card = cc.instantiate(this.card_prefab)
            card.scale=0.8
            card.parent = this.node.parent
          
            card.x = last_card_x + ((i+1)*this.card_width * 0.4)
            card.y = -230  //先把底盘放在-230，在设置个定时器下移到-250的位置
           
            //console.log("pushThreeCard x:"+card.x)
            card.getComponent("card").showCards(this.bottom_card_data[i],myglobal.playerData.accountID)
            card.active = true
            card.card_id = this.bottom_card_data[i].index;
            card.card_data = this.bottom_card_data[i]
            card.status = 2
            this.cards_nods.push(card)
        }

        this.sortCard()
        //设置一个定时器，在2s后，修改y坐标为-250
        this.scheduleOnce(this.schedulePushThreeCard.bind(this),2)

    },
    destoryAllCard(){
        this.cards_nods.forEach(e => {
            e.removeFromParent(true)
        });
    },
    destoryCard(accountid,choose_card){
        if(choose_card.length==0){
            return
        }

        /*出牌逻辑
          1. 将选中的牌 从父节点中移除
          2. 从this.cards_nods 数组中，删除 选中的牌 
          3. 将 “选中的牌” 添加到出牌区域
              3.1 清空出牌区域
              3.2 添加子节点
              3.3 设置scale
              3.4 设置position
          4.  重新设置手中的牌的位置  this.updateCards();
        */
        //1/2步骤删除自己手上的card节点 
        var destroy_card = []
        for(var i=0;i<choose_card.length;i++){
            for(var j=0;j<this.cards_nods.length;j++){
                var card_id = this.cards_nods[j].getComponent("card").card_id
                if(card_id==choose_card[i].cardid){
                    console.log("destroy card id:"+card_id)
                    //this.cards_nods[j].destroy()
                    this.cards_nods[j].removeFromParent(true);
                    destroy_card.push(this.cards_nods[j])
                    this.cards_nods.splice(j,1)
                }
            }
        }
        if(this.cards_nods.length==1){
            cc.audioEngine.play(this.baojin)
            cc.audioEngine.play(this.baojin1)
        }
        if(this.cards_nods.length==2){
            cc.audioEngine.play(this.baojin)
            cc.audioEngine.play(this.baojin2)
        }
        this.appendCardsToOutZone(accountid,destroy_card)
        this.updateCards()
        this.cards_nods.forEach(e=>{
            e.y = -250;
            e.isChiose = false;
            e.status = POSITION_DOWN;
        })
    },

    //清除显示出牌节点全部子节点(就是把出牌的清空)
    clearOutZone(accountid){
        var gameScene_script = this.node.parent.parent.getComponent("gameScene")
        var outCard_node = gameScene_script.getUserOutCardPosByAccount(accountid)
        var children = outCard_node.children;
        for(var i=0;i<children.length;i++){
            var card = children[i]; 
            card.destroy()
        }
        outCard_node.removeAllChildren(true);
    },
    //对出的牌做排序
    pushCardSort(cards){
        if(cards.length==1){
            return
        }
        cards.sort(function(x,y){
            var a = x.getComponent("card").card_data;
            var b = y.getComponent("card").card_data;

            if (a.hasOwnProperty('value') && b.hasOwnProperty('value')) {
                return b.value - a.value;
            }
            if (a.hasOwnProperty('king') && !b.hasOwnProperty('king')) {
                return -1;
            }
            if (!a.hasOwnProperty('king') && b.hasOwnProperty('king')) {
                return 1;
            }
            if (a.hasOwnProperty('king') && b.hasOwnProperty('king')) {
                return b.king - a.king;
            }
        })
    },

    appendOtherCardsToOutZone(outCard_node,cards,yoffset){
       outCard_node.removeAllChildren(true);

       //console.log("appendOtherCardsToOutZone length"+cards.length)
       //添加新的子节点
       for(var i=0;i<cards.length;i++){
           var card = cards[i]; 
           outCard_node.addChild(card,100+i) //第二个参数是zorder,保证牌不能被遮住
       }

       //对出牌进行排序
       //设置出牌节点的坐标
       var zPoint = cards.length / 2;
       //console.log("appendOtherCardsToOutZone zeroPoint:"+zPoint)
       for(var i=0;i<cards.length;i++){
        var cardNode = outCard_node.getChildren()[i]
        var x = (i - zPoint) * 30;
        var y = cardNode.y+yoffset; //因为每个节点需要的Y不一样，做参数传入
        //console.log("-----cardNode: x:"+x+" y:"+y)
        cardNode.setScale(0.5, 0.5);                   
        cardNode.setPosition(x,y);                     

       }
    },
    //将 “选中的牌” 添加到出牌区域
    //destroy_card是玩家本次出的牌
    appendCardsToOutZone(accountid,destroy_card){
        if(destroy_card.length==0){
            return
        }
        //先给本次出的牌做一个排序
       this.pushCardSort(destroy_card)
       //console.log("appendCardsToOutZone")
       var gameScene_script = this.node.parent.parent.getComponent("gameScene")
       //获取出牌区域节点
       var outCard_node = gameScene_script.getUserOutCardPosByAccount(accountid)
       this.appendOtherCardsToOutZone(outCard_node,destroy_card,360)
       //sconsole.log("OutZone:"+outCard_node.name)

    },

    //重新排序手上的牌,并移动
    updateCards(){
    
        var zeroPoint = this.cards_nods.length / 2;
        //var last_card_x = this.cards_nods[this.cards_nods.length-1].x
        for(var i=0;i<this.cards_nods.length;i++){
            var cardNode = this.cards_nods[i]
            var x = (i - zeroPoint)*(this.card_width * 0.4);
            cardNode.setPosition(x, -250);  
        }

    },
    
    playPushCardSound(card_name){
        console.log("playPushCardSound:"+card_name)
        
        if(card_name==""){
            return
        }

        switch(card_name){
            case CardsValue.one.name:
                break
            case CardsValue.double.name:
                    if(true){
                        cc.audioEngine.play(cc.url.raw("resources/sound/duizi.mp3")) 
                     }
                break
            case CardsValue.kingboom.name:
                console.log('王炸')
                cc.audioEngine.play(this.wangzhaAudio)
                break
            case CardsValue.doubleScroll.name:
                cc.audioEngine.play(this.lianduiAudio)
                break
            case CardsValue.scroll.name:
                cc.audioEngine.play(this.shunziAudio)
                break
            case CardsValue.boom.name:
                cc.audioEngine.play(this.zhadan)
                break
            case CardsValue.threeWithOne.name:
                cc.audioEngine.play(this.sandaiyi)
                break
            case CardsValue.threeWithTwo.name:
                cc.audioEngine.play(this.sandaiyidui)
                break
            case CardsValue.plane.name:
                cc.audioEngine.play(this.feiji)
                break
            case CardsValue.planeWithOne.name:
                cc.audioEngine.play(this.feiji)
                break
            case CardsValue.planeWithTwo.name:
                cc.audioEngine.play(this.feiji)
                break                                     
        }
    },
    // update (dt) {},
    onButtonClick(event,customData){
        switch(customData){
            case "btn_qiandz":
                console.log("btn_qiandz")
                myglobal.socket.requestRobState(qian_state.qian)
                this.robUI.active = false
                if(true){
                    cc.audioEngine.play(cc.url.raw("resources/sound/woman_jiao_di_zhu.ogg")) 
                 }
                break
            case "btn_buqiandz":
                console.log("btn_buqiandz")
                myglobal.socket.requestRobState(qian_state.buqiang)
                this.robUI.active = false
                if(true){
                    cc.audioEngine.play(cc.url.raw("resources/sound/woman_bu_jiao.ogg")) 
                 }
                 break    
             case "nopushcard":  //不出牌
                 myglobal.socket.request_buchu_card([],null)
                 this.playingUI_node.active = false
                 break
             case "pushcard":   //出牌
                 //先获取本次出牌数据
                 if(this.choose_card_data.length==0){
                    this.tipsLabel.string="请选择牌!"
                    setTimeout(function(){
                        this.tipsLabel.string=""
                    }.bind(this), 2000);
                 }
                 myglobal.socket.request_chu_card(this.choose_card_data,function(err,data){
                   
                    if(err){
                        console.log("request_chu_card:"+err)
                        console.log("request_chu_card"+JSON.stringify(data))
                        if(this.tipsLabel.string==""){
                            this.tipsLabel.string = data
                            setTimeout(function(){
                                this.tipsLabel.string=""
                            }.bind(this), 2000);
                        }
                        
                        //出牌失败，把选择的牌归位
                        for(var i=0;i<this.cards_nods.length;i++){
                            var card = this.cards_nods[i]
                            card.emit("reset_card_flag")
                        }
                        this.choose_card_data = []
                     }else{
                         //出牌成功
                         console.log("resp_chu_card data:"+JSON.stringify(data))
                         this.playingUI_node.active = false
                         //播放出牌的声音
                         //resp_chu_card data:{"account":"2519901","msg":"sucess","cardvalue":{"name":"Double","value":1}}
                         //{"type":"other_chucard_notify","result":0,"data":{"accountid":"2519901","cards":[{"cardid":24,"card_data":{"index":24,"value":6,"shape":1}},{"cardid":26,"card_data":{"index":26,"value":6,"shape":3}}]},"callBackIndex":0}
                        //  this.playPushCardSound(data.cardvalue.name)
                        //  this.destoryCard(data.account,this.choose_card_data)
                        //  this.choose_card_data = []
                     }
                    
                 }.bind(this))
                 //this.playingUI_node.active = false
                 break
             case "tipcard":
                 break            
            default:
                break
        }
    }


});
