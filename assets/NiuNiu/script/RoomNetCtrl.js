// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Utils = require("./common/UtilsOther");
let Toast = require("./views/ToastCtrl");
let Dialog = require("./views/DialogCtrl");
let playerObj = require("./common/DataMgr").getInstance().playerObj;
let RoomCtrl = require("./RoomCtrl");

cc.Class({
    extends: RoomCtrl,

    properties: {
        ridLabel: cc.Label,
        webview:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 自己在正中间,座位号为2
        this.selfNodeCtrl = this.getPlayerNode(2).getComponent("PlayerCtrl");
        this.startBets = false;  // 开始下注
        this.bankerSeat = -1;    // 庄家座位号
        this.cardsArr = [];      // 当前牌堆
        this.nextBankerSeat = -1;    // 下一个庄家
        this.mult = GlobalNiuNiu.config.ROOM_MULT;
        this.betTimeLabel.node.parent.active = false;

        this.listenEvent();
        this.seatOrder = 0;  // 我的真实座次
        this.inRoomUserMap = new Map(); // 存储玩家在牌桌上的座位号
    },

    start () {
        this.schedule(this.myUpdate, 1);
        this.initGame();
        this.betsTime = 0;
        this.nowTime = 0;
        // this.startGame();

        GlobalNiuNiu.audioMgr.playMusic(GlobalNiuNiu.audioMgr.gameMusic);
    },

    listenEvent(){
        GlobalNiuNiu.netProxy.registerPush("config", this.onConfigResponse, this);
        GlobalNiuNiu.netProxy.registerPush("startGame", this.onStartGameResponse, this);
        GlobalNiuNiu.netProxy.registerPush("gameReady", this.onReady, this);
        GlobalNiuNiu.netProxy.registerPush("otherReady", this.onOtherReady, this);
        GlobalNiuNiu.netProxy.registerPush("countReward", this.onCountRewardResponse, this);
        GlobalNiuNiu.netProxy.registerPush("pEnterRoom", this.onOtherUserEnterRoom, this);
        GlobalNiuNiu.netProxy.registerPush("pExitRoom", this.onOtherUserExitRoom, this);
        GlobalNiuNiu.netProxy.registerPush("changeBanker", this.onChangeBanker, this);
        GlobalNiuNiu.netProxy.registerPush("pDeal", this.onPushDeal, this);
        GlobalNiuNiu.netProxy.registerPush("pBet", this.onPushUserBet, this);
        GlobalNiuNiu.netProxy.registerPush("pStartBet", this.onPushStartBet, this);
        GlobalNiuNiu.netProxy.registerPush("pShowCards", this.onPushShowCards, this);


        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_OPEN_ROOM, this.onOpenRoom.bind(this));
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_ENTER_ROOM, this.onEnterRoom.bind(this));
    },
    onConfigResponse(resp){
        try {
            let config = resp.config.betConfig;
            this.selfNodeCtrl.bet1 = config[0];
            this.selfNodeCtrl.bet2 = config[1];
            this.selfNodeCtrl.bet3 = config[2];
            this.selfNodeCtrl.bet4 = config[3];
        } catch (error) {
            
        }
    },
    onStartGameResponse(resp){
        try {
            if(resp.err!=0){
                Toast.showText(resp.msg, 2);
                return;
            }
            this.selfNodeCtrl.showStart = false;
        } catch (error) {
            
        }
    },
    onReady(){
        try {
            this.selfNodeCtrl.showReady = false;
            this.selfNodeCtrl.showReadyState = true;
            this.selfNodeCtrl.showQuit = false;
        } catch (error) {
            
        }
    },
    onOtherReady(data){
        try {
            for(let i=0;i<5;i++){
                let player = this.getPlayerNode(i).getComponent("PlayerCtrl");
                if(data.user.uid==player.uid){
                    player.showReadyState = true;
                }
            }
            if(data.user.uid==this.uid){
                this.showReadyState = true;
            }
        } catch (error) {
            
        }
    },
    onCountRewardResponse(resp){
        try {
            console.log(resp.countReward)
            let arr = resp.countReward;
            let orders = this.getDealSeatOrder();
            orders.splice(0,1);
            for(let i=0;i<5;i++){
                let player = this.getPlayerNode(i).getComponent("PlayerCtrl");
                arr.forEach(e=>{
                    if(e.uid==player.uid){
                        player.addReward(e.coins,e.reward);
                    }
                })
            }
            GlobalNiuNiu.dataMgr.playerObj.coins = this.selfNodeCtrl.coins;
            GlobalNiuNiu.dataMgr.saveDataToLocal();
        } catch (error) {
            
        }
    },
    onOpenRoom(event){
        try {
            console.log(event)
            let data = event;
            let user = data.user;
            this.ridLabel.string = "房间号:" + data.rid;

            // 初始化自己
            this.seats[2].active = true;
            this.selfNodeCtrl.initPlayerWithData(user);

            // 默认房主是庄家
            this.bankerSeat = 2;

            this.selfNodeCtrl.showStart = true;
            this.seatOrder = user.seatOrder;

            this.inRoomUserMap.set(user.uid, 2);
            GlobalNiuNiu.netProxy.config();
            cc.log("开房成功.");
        } catch (error) {
            
        }
    },

    onEnterRoom(event){
        try {
            let data = event;
            this.ridLabel.string = "rid:" + data.rid;
            this.seatOrder = this.__getSelfSeatOrder(data.users);

            for (let i=0; i<data.users.length; i++){
                let userObj = data.users[i];
                let seat = this.__getUserShowSeat(userObj.seatOrder);

                this.seats[seat].active = true;
                let userNodeCtrl = this.getPlayerNode(seat).getComponent("PlayerCtrl");
                userNodeCtrl.initPlayerWithData(userObj);
                this.bankerSeat = userObj.isBanker ? seat : this.bankerSeat;
                this.inRoomUserMap.set(data.users[i].uid, seat);
            }
            GlobalNiuNiu.netProxy.config();
            this.selfNodeCtrl.showReady = true;
        } catch (error) {
            
        }
    },

    __getSelfSeatOrder(users){
        for (let i=0; i<users.length; i++){
            if (users[i].uid == playerObj.uid){
                return users[i].seatOrder;
            }
        }

        return -1;
    },

    /**
     * 根据座次(真实座次)返回应该显示的座位号
     * @param {Number}seatOrder
     * @return {Number}
     * @private
     */
    __getUserShowSeat(seatOrder){
        let delta = 2 - this.seatOrder;
        let seat = seatOrder + delta;
        seat = seat >= 0 ? seat : (seat + 5);
        seat = seat < 5 ? seat : (seat - 5);
        return seat;
    },

    // 有其他玩家加入游戏
    onOtherUserEnterRoom(resp){
        try {
            let user = resp.user;
            let seat = this.__getUserShowSeat(user.seatOrder);

            let userNodeCtrl = this.getPlayerNode(seat).getComponent("PlayerCtrl");
            this.seats[seat].active = true;
            userNodeCtrl.initPlayerWithData(user);
            // if(this.selfNodeCtrl.isBanker){
            //     userNodeCtrl.showKick = true;
            // }
            this.inRoomUserMap.set(user.uid, seat);
        } catch (error) {
            
        }
    },

    onOtherUserExitRoom(resp){
        try {
            let user = resp.user;
            let seat = this.inRoomUserMap.get(user.uid);
            this.seats[seat].active = false;
            this.inRoomUserMap.delete(user.uid);
        } catch (error) {
            
        }
    },
    onChangeBanker(resp){
        try {
            let uid = resp.uid;
            let seat = this.inRoomUserMap.get(uid);
            let userNodeCtrl = this.getPlayerNode(seat).getComponent("PlayerCtrl");
            userNodeCtrl.isBanker = true;
            if(uid == playerObj.uid){
                this.selfNodeCtrl.showStart = true;
                this.selfNodeCtrl.showReady = false;
                this.selfNodeCtrl.showReadyState = false;
                this.selfNodeCtrl.showQuit = true;
            }
        } catch (error) {
            
        }
    },
    // 发牌
    onPushDeal(resp){
        try {
            // todo: resp里只有自己的牌，其他玩家的牌只做动画
            let cards = resp.cards;
            cc.log("cards:" + JSON.stringify(cards));
            this.selfNodeCtrl.showQuit = false;
            for(let i=0;i<5;i++){
                let player = this.getPlayerNode(i).getComponent("PlayerCtrl");
                player.showReadyState = false;
            }
            this._serverCards = cards;
            this.startDeal(cards.length, null);
        } catch (error) {
            
        }
    },

    onPushUserBet(resp){
        try {
            let bet = Number(resp.bet);
            let uid = resp.uid;
            let playCtrl = this.getPlayerNode(this.inRoomUserMap.get(uid)).getComponent("PlayerCtrl");
            playCtrl.showBet(bet);
        } catch (error) {
            
        }
    },

    onPushStartBet(resp){
        try {
            this.startBets = true;
            let expired = resp.expired/1000
            this.betsTime = expired;
            if (!this.selfNodeCtrl.isBanker){
                this.selfNodeCtrl.showMenu = true;
            }
        } catch (error) {
            
        }
    },

    onPushShowCards(resp){
        try {
            this.startBets = false;

            let users = resp.users;
            for (let u of users){
                if (u.uid != playerObj.uid){
                    let playerCtrl = this.getPlayerNode(this.inRoomUserMap.get(u.uid)).getComponent("PlayerCtrl");
                    playerCtrl.hands = u.cards
                }
            }

            this.openHands();
        } catch (error) {
            
        }
    },

    initGame(){
        for (let s of this.seats){
            s.active = false;
        }
    },

    /**
     * 获取发牌顺序（座位号), 从庄家开始逆时针发牌
     * @return {Array}
     */
    getDealSeatOrder(){
        let order = [];
        let tmp = this.bankerSeat;
        while (tmp <= 4){
            if (this.seats[tmp].active){
                order.push(tmp);
            }
            tmp++;
        }
        tmp = 0;
        while (tmp < this.bankerSeat){
            if (this.seats[tmp].active){
                order.push(tmp);
            }
            tmp++;
        }

        return order;
    },

    /**
     * 清理游戏，方便开始下一局
     */
    cleanGame(){
        for (let i = 0; i<5; i++){
            let p = this.getPlayerNode(i).getComponent("PlayerCtrl");
            p.clearHands();
        }
    },

    /**
     * 通过座位号获取对应玩家节点
     * @param seatIndex
     * @return {cc.Node}
     */
    getPlayerNode(seatIndex){
        console.log(seatIndex)
        cc.assert(seatIndex >= 0 && seatIndex <= 4, "wrong seatIndex!");
        return this.seats[seatIndex].getChildByName("PlayerNode");
    },

    startGame(){
        // 金币不足无法继续
        if (GlobalNiuNiu.dataMgr.playerObj.coins < this.mult * 100 * 4){
            Dialog.show("金币不足" + this.mult * 50 * 4 + "，请充值.", null, "确定", null, ()=>{
                GlobalNiuNiu.loadScene("Lobby");
            });
            return;
        }

        this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl").isBanker = true;
        // this.selfNodeCtrl.showReadyState = false;
        this.scheduleOnce(()=>{
            if (GlobalNiuNiu.config.GAME_MODE < 5){
                // 下发牌后下注
                this.startDeal(GlobalNiuNiu.config.GAME_MODE, ()=>{
                    // this.startBetDown();
                });
            } else {
                // 先下注后发牌
                // this.startBetDown();
            }
        }, 1);
    },

    /**
     * 开始下注
     */
    startBetDown(){
        Toast.showText("请开始下注.", 1, ()=>{
            this.startBets = true;
            this.betsTime = GlobalNiuNiu.config.BETS_WAITING;
            this.robotDown();
        });
        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effMdls);
        this.selfNodeCtrl.showMenu = !this.selfNodeCtrl.isBanker;
    },

    /**
     * 给机器下注
     */
    robotDown(){
        // 自动给机器人下注
        let orders = this.getDealSeatOrder();
        for(let i = 0; i < orders.length; i ++){
            let seat = orders[i];
            let player = this.getPlayerNode(seat).getComponent("PlayerCtrl");

            if (seat === 2 || player.isBanker) continue;

            // 机器人自动加钱
            if (player.coins < this.mult * 100 * 4){
                player.coins = 100000;
            }
            player.payBet(-1, Math.random() + 0.5);
        }
    },

    /**
     * 开始发牌
     * @param count{Number} 发牌张数
     * @param cb{function} 回调函数
     */
    startDeal(count, cb){
        cc.log("开始发牌." + count + "张.");
        let t = 0;
        if (count > 0){
            let self = this;
            let zIndex = GlobalNiuNiu.config.LOCAL_ZINDEX_MAX;
            let root = self.cardHeapSeat.parent;
            let order = this.getDealSeatOrder();

            // 只有自己的牌是服务器发来的，其他玩家的只是动画
            if (this.cardsArr.length < count * 5){
                cc.log("牌不够，洗牌.");
                this.cardsArr = create1pairPoker(true);
            }

            for (let seat of order){
                let cards = this.cardsArr.slice(0, count);
                sortBig2Samll(cards);
                this.cardsArr = this.cardsArr.slice(count);
                _dealAct(seat, cards);
            }

            // 执行发牌并展示动画
            function _dealAct(seat, cards) {
                let playerCtrl = self.getPlayerNode(seat).getComponent("PlayerCtrl");
                if (seat == 2){
                    // 自己的座位肯定是2
                    cards = self._serverCards;
                }
                for (let i=0; i<cards.length; i++){
                    let cardObj = cards[i];
                    playerCtrl.hands.push(cardObj); // 发牌给玩家
                    let card = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab);
                    card.getComponent("CardCtrl").initCard(cardObj.point, cardObj.suit, false);
                    card.scale = 0.5;
                    card.zIndex = zIndex;
                    let posOri = root.convertToNodeSpaceAR(root.convertToWorldSpaceAR(self.cardHeapSeat.getPosition()));
                    let posDes = root.convertToNodeSpaceAR(playerCtrl.cardPanelLeft.convertToWorldSpaceAR(cc.v2(0,0)));
                    root.addChild(card);
                    card.setPosition(posOri);
                    card.runAction(cc.sequence(cc.delayTime(t), cc.moveTo(0.1,posDes), cc.callFunc(()=>{
                        card.removeFromParent(true);
                        card.x = card.y = 0;
                        card.scale = 1;
                        card.getComponent("CardCtrl").showFace = seat === 2;
                        playerCtrl.cardPanelLeft.addChild(card);
                        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effFapai);
                    })));

                    t += 0.1;
                    zIndex --;
                }
            }
        }

        if (cb){
            this.scheduleOnce(cb, t + 0.5);
        }
    },

    // 开牌比较大小
    openHands(){
        cc.log("开始开牌");
        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effKaipai);

        Toast.showText("开牌!", 1, ()=>{
            let orders = this.getDealSeatOrder();
            let t = 0.6;
            for (let i=0; i<orders.length; i++){
                let seat = orders[i];
                this.getPlayerNode(seat).getComponent("PlayerCtrl").openHands(t * i);
            }

            this.scheduleOnce(this.countReward, t * orders.length);
        });
    },

    /**
     *  计算牌型倍数
     * @param typeReturn{TypeReturn}
     * 牛牛 this.mult倍，牛9减一倍，牛8减二倍，直到剩余一倍
     */
    countMult(typeReturn){
        if (this.mult <= 1) return 1;
        let mult = 1;
        if (typeReturn.handsType === HandsType.TYPE_NONE){
            mult = 1;
        }  else {
            mult = this.mult + (typeReturn.handsType - HandsType.TYPE_NIUNIU);
        }

        mult = Math.max(mult, 1);
        if(typeReturn.handsType === HandsType.TYPE_NONE){
            mult = 2;
        }
        return mult;
    },

    // 结算
    countReward(){
        cc.log("结算");
        let banker = this.getPlayerNode((this.bankerSeat)).getComponent("PlayerCtrl");
        let bankerType = banker.typeReturn;
        let bankerReward = 0;

        // let orders = this.getDealSeatOrder();
        // orders.splice(0,1);
        // for (let seat of orders){
        //     let player = this.getPlayerNode(seat).getComponent("PlayerCtrl");
        //     let pType = player.typeReturn;
        //     if (pType.handsType === HandsType.TYPE_NIUNIU){
        //         this.nextBankerSeat = seat;
        //     }
        //     if (compareHandsReturn(bankerType, pType)){
        //         // 庄家赢
        //         let multi = this.countMult(bankerType);
        //         bankerReward += player.curBets * multi;
        //         player.addReward(-player.curBets * multi);

        //     } else {
        //         // 闲家赢
        //         let multi = this.countMult(pType);
        //         bankerReward -= player.curBets * multi;
        //         player.addReward(player.curBets * multi);
        //     }
        // }
        // banker.addReward(bankerReward);

        // GlobalNiuNiu.dataMgr.playerObj.coins = this.selfNodeCtrl.coins;
        // GlobalNiuNiu.dataMgr.saveDataToLocal();

        this.scheduleOnce(()=>{
            if (GlobalNiuNiu.config.ONLINE_MODE){
                // 开始下一局
                let isBanker = this.selfNodeCtrl.isBanker;
                this.cleanGame();
                this.selfNodeCtrl.isBanker = isBanker;
                if (this.selfNodeCtrl.isBanker){
                    this.selfNodeCtrl.showStart = true;
                }else{
                    this.selfNodeCtrl.showReady = true;
                }
                this.selfNodeCtrl.showQuit = true;
            } else {
                // 开始下一局
                Dialog.show("继续玩？", "取消", "确定", ()=>{
                    GlobalNiuNiu.loadScene("Lobby");
                }, ()=>{
                    this.cleanGame();
                    this.bankerSeat = this.nextBankerSeat;
                    this.startGame();
                });
            }
        }, 1.5);
    },
    openWebView(){
        this.webview.active = true;
    },
    closeWebView(){
        this.webview.active = false;
    },
    myUpdate (dt) {
        if (!this.startBets){
            this.betTimeLabel.node.parent.active = false;
            return;
        }

        this.betTimeLabel.string = Math.ceil(this.betsTime);
        this.betsTime--;
        if (Math.ceil(this.betsTime) > 0){
            this.betTimeLabel.node.parent.active = true;
        } else {
            // 超时自动下注最小bet
            this.startBets = false;
            this.betTimeLabel.node.parent.active = false;
            this.selfNodeCtrl.showMenu = false;
        }

    },
    onDestroy(){
        // GlobalNiuNiu.netProxy.offPush("gameReady", this.onReady, this);
        // GlobalNiuNiu.netProxy.offPush("countReward", this.onCountRewardResponse, this);
        // GlobalNiuNiu.netProxy.offPush("pEnterRoom", this.onOtherUserEnterRoom, this);
        // GlobalNiuNiu.netProxy.offPush("pExitRoom", this.onOtherUserExitRoom, this);
        // GlobalNiuNiu.netProxy.offPush("ChangeBanker", this.onChangeBanker, this);
        // GlobalNiuNiu.netProxy.offPush("pDeal", this.onPushDeal, this);
        // GlobalNiuNiu.netProxy.offPush("pBet", this.onPushUserBet, this);
        // GlobalNiuNiu.netProxy.offPush("pStartBet", this.onPushStartBet, this);
        // GlobalNiuNiu.netProxy.offPush("pShowCards", this.onPushShowCards, this);
    }
});
