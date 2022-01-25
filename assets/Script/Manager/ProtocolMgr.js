let app = require('../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.reqData = [];
        cc.game.addPersistRootNode(this.node);
    },
    //ECC
    //-------
    //助记词请求
    queryZhujici(callback){
        app.Post("member/getMnemonic",this.reqData,callback);
        // callback("bullet,run,bullet,run,bullet,run,bullet,run,bullet,run,bullet,run");
    },
    //注册
    register(reqData,callback){

        app.Post('member/register',reqData,callback);
        // callback();
    },
    //登录
    login(reqData,callback){
        app.Post('member/login',reqData,callback);
 
        // callback();
    },
    //矿池检测
    queryMillOutput(callback){
        app.Post('machine/canAccept',this.reqData,callback);
    },
    queryJiaoYiList(callback){
        app.Post('trade/hall/list',{limit:999,page:1},callback);
    },
    queryXHPList(callback){
        app.Post('store/consumableList',{limit:999,page:1},callback);
    },
    //获取背包宠物
    queryKnapsackNFTList(callback){
        app.Post('knapsack/petAnimalList',{limit:999,page:1},callback);
    },
    //获取背包消耗品
    queryKnapsackXHPList(callback){
        app.Post('knapsack/consumableList',{limit:999,page:1},callback);
    },
    
    //背包使用消耗品
    queryUseConsumable(reqDatam,callback){
        app.Post('knapsack/useConsumable',reqDatam,callback);
    },
    
    queryNFTList(callback){
        app.Post('store/petAnimalList',{limit:999,page:1},callback);
    },

    buyXHP(reqData,callback){
        app.Post('member/mnemonicLogin',reqData,callback);
    },
    buyNFT(reqData,callback){
        app.Post('member/mnemonicLogin',reqData,callback);
    },
    queryGameList(page,type,callback){
        app.Post('game/hall/list',{game_type:type,limit:120,page:page},callback);
    },
    //竞技游戏场次列表
    queryGameRoomList(page,callback){
        app.Post('game/sports_fields/list',{limit:12,page:1},callback);
    },
    //休闲游戏场次列表
    queryLieFallowList(page,callback){
        app.Post('game/arder_fields/list',{limit:12,page:1},callback);
    },

    //开始竞技游戏
    startCompetitiveGame(reqData,callback){
        app.Post('game/startSportsGame',reqData,callback);
    },

    //开始休闲游戏
    startLeisureGame(reqData,callback){
        app.Post('game/startArderGame',reqData,callback);
    },

    //背包宠物列表
    queryKnapsackpetAnimalList(limit2,page2,callback){
        app.Post('knapsack/petAnimalList',{limit:limit2,page:page2},callback)
    },
    //获取收益明细
    querygetAccountDetail(accountType,limit,page,callback){
        app.Post('finance/getAccountDetail',{accountType:accountType,limit:limit,page:page},callback);
    },

    //获取提币列表
    queryGetWithdrawApplyDetail(limit,page,callback){
        app.Post('finance/getWithdrawApplyDetail',{limit:limit,page:page},callback);
    },

    //找回密码
    queryForgetPassword(reqData,callback){
        app.Post('member/forgetPassword',reqData,callback);
    },
    //获取验证码
    queryGetAuthCode(reqData,callback){
        app.Post('member/getAuthCode',reqData,callback);
    },
    //退出
    querySubmitLogout(reqData,callback){
        app.Post('member/submitLogout',reqData,callback);
    },
    //转账
    queryTransfer(reqData,callback){
        app.Post('finance/transfer',reqData,callback);
    },
    //购买宠物
    queryBuyPetAnimal(reqData,callback){
        app.Post('store/buyPetAnimal',reqData,callback);
    },
    //购买消耗品
    queryBuyConsumable(reqData,callback){
        app.Post('store/buyConsumable',reqData,callback);
    },
    //获取报名
    queryGetSignUPInfo(callback){
        app.Post('sign_up/getSignUpInfo',{},callback);
    },

    //获取静态信息
    querygetCommonInfo(callback){
        let reqData = {};
        app.Post('content/getCommonInfo',reqData,callback);
    },
    
    //请求报名战区列表
    queryDivisionList(callback){
        app.Post('sign_up/division_list',{},callback);
    },

    //请求报名信息
    queryGameTeamList(callback){
        app.Post('sign_up/game_team_list',{},callback);
    },

    //请求报名列表
    queryGetGameSignRank(callback){
        app.Post('sign_up/getGameSignRank',{},callback);
    },

    //游戏列表
    queryGetGameSignList(callback){
        app.Post('sign_up/sign_up_game_list',{},callback);
    },
    
    //对战记录列表
    queryStationRecordList(limit2,page2,callback){
        app.Post('game/stationRecord/list',{limit:limit2,page:page2},callback)
    },
    //抽奖明细
    queryLuckDrawList(limit2,page2,callback){
        app.Post('lottery/luckDrawList',{limit:limit2,page:page2},callback);
    },

    //奖品列表
    queryPrizeList(callback){
        app.Post('lottery/luckGoodList',{},callback);
    },

    //抽奖
    queryLuckDraw(callback){
        app.Post('lottery/luckDraw',{},callback);
    },

    //抽奖地区列表
    queryGetPickUpLocation(callback){
        app.Post('lottery/getPickUpLocation',{},callback);
    },

    //提交中奖信息
    queryReceivePrizes(reqData,callback){
        app.Post('lottery/receivePrizes',reqData,callback);
    },
    //提现
    queryWithdrawApply(reqData,callback){
        app.Post('finance/withdrawApply',reqData,callback);
    },
    submitBaoMing(reqData,callback){
        console.log(reqData)
        app.Post('sign_up/sub',reqData,callback);//,"http://api.vdnmetaverse.org/api/"
    },
    queryEmail(callback){
        app.Post('member/get_email_message_list',{},callback);
    },

    //公告列表
    queryGetMessage(callback){
        app.Post('content/getMessage',{limit:100,page:1},callback);
    },
    //读取邮件
    readEmail(i,callback){
        let data = {
            id:i
        }
        app.Post('member/read_email_message',data,callback)
    },  
    queryGonggao(callback){
        app.Post('content/getMessageLatest',{},callback);
    },
    //查询用户数据
    queryUserData(){
        Global.PageMgr.showLoadingPage('加载中')
        let reqData = {};
        app.Post('member/getMemberInfo',reqData,(res)=>{
            Global.PageMgr.closeLoadingPage();
            if(res.code==200){
                let data = res.data;
                cc.director.GlobalEvent.emit("UpdateUserData",data);
                window.DEFAULT_availableUsdt = data.availableUsdt;
                window.DEFAULT_userID = data.username;
            }else{
                Global.PageMgr.showTipPage(res.message)
            }
        })
    },
    queryRankInfo(callback){
        let res = {
            code:200,
            data:{
                name:"玩家昵称",
                level:100,
                canchu:100000,
                life:100,
                linli:100,
                zhanli:100,
                num:4
            }
        }
        callback(res)
    },
    queryRankList(callback){
        let res = {
            code:200,
            data:[
                {
                    name:"玩家昵称",
                    level:100,
                    canchu:100000,
                    life:100,
                    linli:100,
                    zhanli:100,
                    num:1
                },
                {
                    name:"玩家昵称",
                    level:100,
                    canchu:100000,
                    life:100,
                    linli:100,
                    zhanli:100,
                    num:2
                },
                {
                    name:"玩家昵称",
                    level:100,
                    canchu:100000,
                    life:100,
                    linli:100,
                    zhanli:100,
                    num:3
                },
                {
                    name:"玩家昵称",
                    level:100,
                    canchu:100000,
                    life:100,
                    linli:100,
                    zhanli:100,
                    num:4
                },
                {
                    name:"玩家昵称",
                    level:100,
                    canchu:100000,
                    life:100,
                    linli:100,
                    zhanli:100,
                    num:5
                },
                {
                    name:"玩家昵称",
                    level:100,
                    canchu:100000,
                    life:100,
                    linli:100,
                    zhanli:100,
                    num:6
                },
            ]
        }
        callback(res)
    },
    //添加金币
    addEgold(){
        app.Post('machine/quickReceive',this.reqData,(data)=>{
            console.log(data)
            if(data.code==200){
                this.queryUserData()
            }
        })
    },
    //查询矿球剩余数量
    queryEcc(callback){
        let data = [];
        app.Post('member/numberOfCheckInRewards',data,callback)
    },
    //点击矿球
    addEcc(){
        let data = [];
        app.Post('member/getRewards',data,(data)=>{
            if(data.code==200){
                this.queryUserData()
            }
        })
    },
    //查询矿机数据
    queryKuangJi(){
        Global.PageMgr.showLoadingPage('加载中')
        let data = [];
        app.Post('machine/queryMineMachineMarket',data,(data)=>{
            Global.PageMgr.closeLoadingPage()
            if(data.code==200){
                GameData.KuangJiData = data.data;
                cc.director.GlobalEvent.emit("KuangJiData",{})
            }
        })
    },
    YuYueKuangJi(id,callback){
        Global.PageMgr.showLoadingPage('加载中')
        let data = {
            id
        }
        app.Post('machine/reservationMineMachine',data,callback)
    },
    ZuYongKuangJi(id,callback){
        Global.PageMgr.showLoadingPage('加载中')
        let data = {
            id
        }
        app.Post('machine/rentMineMachine',data,callback)
    },
    //农场
    //------
    //查询农场用户数据
    queryNongChangUserData(){
        GameData.NongChangUserData = [
            null,
            {id:101001,time:6000000,period:3},
            {id:101002,time:6000000,period:3},
            {id:101003,time:6000000,period:3},
            null,
            null
        ]
        cc.director.GlobalEvent.emit("NongChangUserData",{})
    },
    queryFriendNongChang(){
        Global.PageMgr.showLoadingPage('正在跳转');
        this.scheduleOnce(()=>{
            Global.PageMgr.closeLoadingPage();
            Global.PageMgr.closeAllPages();
            GameData.FriendNongChangUserData = [
                null,
                {id:101003,time:6000000,period:1},
                {id:101002,time:6000000,period:2},
                {id:101001,time:6000000,period:3},
                null,
                null,
            ]
            cc.director.GlobalEvent.emit("FriendNongChangUserData",{})
            cc.find('Canvas/Main/FanHui').active = true;
        },1)
    },
    //收获农作物
    shouHuoNongZuoWu(pos,callback){
        GameData.NongChangUserData[pos] = null
        let data = true;
        callback(data)
    },
    //铲出农作物
    chanChuNongZuoWu(callback){
        let data = true;
        callback(data)
    },
    queryZhongZi(){
        GameData.ZhongZiData = [
            {id:101001,count:2},
            {id:101002,count:1},
            {id:101003,count:0},
        ]
        cc.director.GlobalEvent.emit("ZhongZiData",{})
    },
    queryGuoShi(){
        GameData.GuoShiData = [
            {id:101001,count:10},
            {id:101002,count:20},
            {id:101003,count:4},
        ]
        cc.director.GlobalEvent.emit("GuoShiData",{})
    },
    queryShangCheng(){
        GameData.ShangChengData = [
            {id:101001,count:2},
            {id:101002,count:1},
            {id:101003,count:5},
        ]
        cc.director.GlobalEvent.emit("ShangChengData",{})
    },
    zhongZhi(id,pos){
        GameData.NongChangUserData[pos] = {id:id,time:6166000,period:1}
        GameData.ZhongZhiReady.state = false;
        GameData.ZhongZhiReady.id = null;
        for(let i = 0;i<GameData.ZhongZiData.length;i++){
            if(GameData.ZhongZiData[i].id==id){
                GameData.ZhongZiData[i].count--;
                if(GameData.ZhongZiData[i].count<=0){
                    GameData.ZhongZiData.splice(i,1)
                }
                cc.director.GlobalEvent.emit("ZhongZiData",{})
            }
        }
        let backPack = GameData.NongChangUserData;
        cc.director.GlobalEvent.emit("NongChangUserData",{})
        for(let i = 0;i<6;i++){
            if(backPack[i]==undefined||backPack[i]==null){
                GameData.ZhongZhiReady.pos = i;
                return;
            }
        }
        Global.PageMgr.closeAllPages()
    },
    buyZhongZi(id,count){
        console.log('购买种子id：',id,'购买数量：',count)
    },
    saleGuoShi(callback){
        GameData.GuoShiData = []
        callback()
    },
    queryFriend(){
        GameData.FriendData = [
            {url:'http://upyun.diandianhui.xyz/head_image/1572070309952_0.png',name:'某个玩家1',state:1},
            {url:'http://upyun.diandianhui.xyz/head_image/1572070309952_0.png',name:'某个玩家2',state:0},
            {url:'http://upyun.diandianhui.xyz/head_image/1572070309952_0.png',name:'某个玩家3',state:0}
        ]
        cc.director.GlobalEvent.emit('FriendData')
    },
    //赛车
    //------------
    Racing(){
        cc.director.GlobalEvent.emit("NextTurn",{})
        let timerCount = 20
        let timer = setInterval(()=>{
            timerCount--;
            GameData.RacingTimer = timerCount;
            if(timerCount<=0){
                cc.director.GlobalEvent.emit("RacingStart",{})
                clearInterval(timer)
                return;
            }
            cc.director.GlobalEvent.emit("NextTurnTimer",{})
        },1000)
    },
    //红包
    //---------------
    //抢红包请求
    QiangHongBao(callback){
        Global.PageMgr.showLoadingPage2('加载中')
        app.Post('redPacket/tagRead',{},callback)
    },
    //查询红包列表数据
    queryHongBaoList(){
        // Global.PageMgr.showLoadingPage('正在查询')
        app.Post('readPark/queryMainReadParkList.do',{},(data)=>{
            if(data.code==200){
                GameData.HongBaoList = data.data;
                cc.director.GlobalEvent.emit("HongBaoListData",{})
            }else{
                Global.PageMgr.showTipPage2(data.message)
            }
        })

    },
    //请求发红包配置信息
    faHongBaoConfig(){
        // Global.PageMgr.showLoadingPage('正在加载配置')
        app.Post('redPacket/redPackConfig',{},(data)=>{
            console.log(data)
            if(data.code == 200){
                GameData.FaHongBaoConfig = data.data;
                cc.director.GlobalEvent.emit("FaHongBaoConfig",{})
            }else{
                Global.PageMgr.showTipPage2(data.message)
            }
        })
    },
    //发红包请求
    faHongBao(leiQu,jinE,num,callback){
        Global.PageMgr.showLoadingPage2('正在发送')
        let reqData = {
            amount:jinE,
            bombDigital:leiQu,
            number:num
        }
        app.Post('redPacket/sendRedPack',reqData,callback)
    },
    //水果机
    //---------------
    //水果机请求结果
    slotResult(amount,callback){
        let reqData = {
            amount:amount,
        }
        app.Post('game/fruitMachine',reqData,callback)
    },
    //水果机中奖记录
    slotRecord(callback){
        app.Post('game/fruitMachineRecord',{},callback)
    },
    slotUserData(){
        app.Post('financial/getUserAccount',{},(data)=>{
            if(data.code==200){
                GameData.SlotUserData = data.data
                cc.director.GlobalEvent.emit("slotUserData",{})
            }else{
                Global.PageMgr.showTipPage(data.message)
            }
        })
    },
    // update (dt) {},
});
