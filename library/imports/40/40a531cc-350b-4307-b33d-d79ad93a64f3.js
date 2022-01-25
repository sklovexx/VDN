"use strict";
cc._RF.push(module, '40a53HMNQtDB7M915rZOmTz', 'ProtocolMgr');
// Script/Manager/ProtocolMgr.js

'use strict';

var app = require('../Util/appScript');
cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.reqData = [];
        cc.game.addPersistRootNode(this.node);
    },

    //ECC
    //-------
    //助记词请求
    queryZhujici: function queryZhujici(callback) {
        app.Post("member/getMnemonic", this.reqData, callback);
        // callback("bullet,run,bullet,run,bullet,run,bullet,run,bullet,run,bullet,run");
    },

    //注册
    register: function register(reqData, callback) {

        app.Post('member/register', reqData, callback);
        // callback();
    },

    //登录
    login: function login(reqData, callback) {
        app.Post('member/login', reqData, callback);

        // callback();
    },

    //矿池检测
    queryMillOutput: function queryMillOutput(callback) {
        app.Post('machine/canAccept', this.reqData, callback);
    },
    queryJiaoYiList: function queryJiaoYiList(callback) {
        app.Post('trade/hall/list', { limit: 999, page: 1 }, callback);
    },
    queryXHPList: function queryXHPList(callback) {
        app.Post('store/consumableList', { limit: 999, page: 1 }, callback);
    },

    //获取背包宠物
    queryKnapsackNFTList: function queryKnapsackNFTList(callback) {
        app.Post('knapsack/petAnimalList', { limit: 999, page: 1 }, callback);
    },

    //获取背包消耗品
    queryKnapsackXHPList: function queryKnapsackXHPList(callback) {
        app.Post('knapsack/consumableList', { limit: 999, page: 1 }, callback);
    },


    //背包使用消耗品
    queryUseConsumable: function queryUseConsumable(reqDatam, callback) {
        app.Post('knapsack/useConsumable', reqDatam, callback);
    },
    queryNFTList: function queryNFTList(callback) {
        app.Post('store/petAnimalList', { limit: 999, page: 1 }, callback);
    },
    buyXHP: function buyXHP(reqData, callback) {
        app.Post('member/mnemonicLogin', reqData, callback);
    },
    buyNFT: function buyNFT(reqData, callback) {
        app.Post('member/mnemonicLogin', reqData, callback);
    },
    queryGameList: function queryGameList(page, type, callback) {
        app.Post('game/hall/list', { game_type: type, limit: 120, page: page }, callback);
    },

    //竞技游戏场次列表
    queryGameRoomList: function queryGameRoomList(page, callback) {
        app.Post('game/sports_fields/list', { limit: 12, page: 1 }, callback);
    },

    //休闲游戏场次列表
    queryLieFallowList: function queryLieFallowList(page, callback) {
        app.Post('game/arder_fields/list', { limit: 12, page: 1 }, callback);
    },


    //开始竞技游戏
    startCompetitiveGame: function startCompetitiveGame(reqData, callback) {
        app.Post('game/startSportsGame', reqData, callback);
    },


    //开始休闲游戏
    startLeisureGame: function startLeisureGame(reqData, callback) {
        app.Post('game/startArderGame', reqData, callback);
    },


    //背包宠物列表
    queryKnapsackpetAnimalList: function queryKnapsackpetAnimalList(limit2, page2, callback) {
        app.Post('knapsack/petAnimalList', { limit: limit2, page: page2 }, callback);
    },

    //获取收益明细
    querygetAccountDetail: function querygetAccountDetail(accountType, limit, page, callback) {
        app.Post('finance/getAccountDetail', { accountType: accountType, limit: limit, page: page }, callback);
    },


    //获取提币列表
    queryGetWithdrawApplyDetail: function queryGetWithdrawApplyDetail(limit, page, callback) {
        app.Post('finance/getWithdrawApplyDetail', { limit: limit, page: page }, callback);
    },


    //找回密码
    queryForgetPassword: function queryForgetPassword(reqData, callback) {
        app.Post('member/forgetPassword', reqData, callback);
    },

    //获取验证码
    queryGetAuthCode: function queryGetAuthCode(reqData, callback) {
        app.Post('member/getAuthCode', reqData, callback);
    },

    //退出
    querySubmitLogout: function querySubmitLogout(reqData, callback) {
        app.Post('member/submitLogout', reqData, callback);
    },

    //转账
    queryTransfer: function queryTransfer(reqData, callback) {
        app.Post('finance/transfer', reqData, callback);
    },

    //购买宠物
    queryBuyPetAnimal: function queryBuyPetAnimal(reqData, callback) {
        app.Post('store/buyPetAnimal', reqData, callback);
    },

    //购买消耗品
    queryBuyConsumable: function queryBuyConsumable(reqData, callback) {
        app.Post('store/buyConsumable', reqData, callback);
    },

    //获取报名
    queryGetSignUPInfo: function queryGetSignUPInfo(callback) {
        app.Post('sign_up/getSignUpInfo', {}, callback);
    },


    //获取静态信息
    querygetCommonInfo: function querygetCommonInfo(callback) {
        var reqData = {};
        app.Post('content/getCommonInfo', reqData, callback);
    },


    //请求报名战区列表
    queryDivisionList: function queryDivisionList(callback) {
        app.Post('sign_up/division_list', {}, callback);
    },


    //请求报名信息
    queryGameTeamList: function queryGameTeamList(callback) {
        app.Post('sign_up/game_team_list', {}, callback);
    },


    //请求报名列表
    queryGetGameSignRank: function queryGetGameSignRank(callback) {
        app.Post('sign_up/getGameSignRank', {}, callback);
    },


    //游戏列表
    queryGetGameSignList: function queryGetGameSignList(callback) {
        app.Post('sign_up/sign_up_game_list', {}, callback);
    },


    //对战记录列表
    queryStationRecordList: function queryStationRecordList(limit2, page2, callback) {
        app.Post('game/stationRecord/list', { limit: limit2, page: page2 }, callback);
    },

    //抽奖明细
    queryLuckDrawList: function queryLuckDrawList(limit2, page2, callback) {
        app.Post('lottery/luckDrawList', { limit: limit2, page: page2 }, callback);
    },


    //奖品列表
    queryPrizeList: function queryPrizeList(callback) {
        app.Post('lottery/luckGoodList', {}, callback);
    },


    //抽奖
    queryLuckDraw: function queryLuckDraw(callback) {
        app.Post('lottery/luckDraw', {}, callback);
    },


    //抽奖地区列表
    queryGetPickUpLocation: function queryGetPickUpLocation(callback) {
        app.Post('lottery/getPickUpLocation', {}, callback);
    },


    //提交中奖信息
    queryReceivePrizes: function queryReceivePrizes(reqData, callback) {
        app.Post('lottery/receivePrizes', reqData, callback);
    },

    //提现
    queryWithdrawApply: function queryWithdrawApply(reqData, callback) {
        app.Post('finance/withdrawApply', reqData, callback);
    },
    submitBaoMing: function submitBaoMing(reqData, callback) {
        console.log(reqData);
        app.Post('sign_up/sub', reqData, callback); //,"http://api.vdnmetaverse.org/api/"
    },
    queryEmail: function queryEmail(callback) {
        app.Post('member/get_email_message_list', {}, callback);
    },


    //公告列表
    queryGetMessage: function queryGetMessage(callback) {
        app.Post('content/getMessage', { limit: 100, page: 1 }, callback);
    },

    //读取邮件
    readEmail: function readEmail(i, callback) {
        var data = {
            id: i
        };
        app.Post('member/read_email_message', data, callback);
    },
    queryGonggao: function queryGonggao(callback) {
        app.Post('content/getMessageLatest', {}, callback);
    },

    //查询用户数据
    queryUserData: function queryUserData() {
        Global.PageMgr.showLoadingPage('加载中');
        var reqData = {};
        app.Post('member/getMemberInfo', reqData, function (res) {
            Global.PageMgr.closeLoadingPage();
            if (res.code == 200) {
                var data = res.data;
                cc.director.GlobalEvent.emit("UpdateUserData", data);
                window.DEFAULT_availableUsdt = data.availableUsdt;
                window.DEFAULT_userID = data.username;
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    queryRankInfo: function queryRankInfo(callback) {
        var res = {
            code: 200,
            data: {
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 4
            }
        };
        callback(res);
    },
    queryRankList: function queryRankList(callback) {
        var res = {
            code: 200,
            data: [{
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 1
            }, {
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 2
            }, {
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 3
            }, {
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 4
            }, {
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 5
            }, {
                name: "玩家昵称",
                level: 100,
                canchu: 100000,
                life: 100,
                linli: 100,
                zhanli: 100,
                num: 6
            }]
        };
        callback(res);
    },

    //添加金币
    addEgold: function addEgold() {
        var _this = this;

        app.Post('machine/quickReceive', this.reqData, function (data) {
            console.log(data);
            if (data.code == 200) {
                _this.queryUserData();
            }
        });
    },

    //查询矿球剩余数量
    queryEcc: function queryEcc(callback) {
        var data = [];
        app.Post('member/numberOfCheckInRewards', data, callback);
    },

    //点击矿球
    addEcc: function addEcc() {
        var _this2 = this;

        var data = [];
        app.Post('member/getRewards', data, function (data) {
            if (data.code == 200) {
                _this2.queryUserData();
            }
        });
    },

    //查询矿机数据
    queryKuangJi: function queryKuangJi() {
        Global.PageMgr.showLoadingPage('加载中');
        var data = [];
        app.Post('machine/queryMineMachineMarket', data, function (data) {
            Global.PageMgr.closeLoadingPage();
            if (data.code == 200) {
                GameData.KuangJiData = data.data;
                cc.director.GlobalEvent.emit("KuangJiData", {});
            }
        });
    },
    YuYueKuangJi: function YuYueKuangJi(id, callback) {
        Global.PageMgr.showLoadingPage('加载中');
        var data = {
            id: id
        };
        app.Post('machine/reservationMineMachine', data, callback);
    },
    ZuYongKuangJi: function ZuYongKuangJi(id, callback) {
        Global.PageMgr.showLoadingPage('加载中');
        var data = {
            id: id
        };
        app.Post('machine/rentMineMachine', data, callback);
    },

    //农场
    //------
    //查询农场用户数据
    queryNongChangUserData: function queryNongChangUserData() {
        GameData.NongChangUserData = [null, { id: 101001, time: 6000000, period: 3 }, { id: 101002, time: 6000000, period: 3 }, { id: 101003, time: 6000000, period: 3 }, null, null];
        cc.director.GlobalEvent.emit("NongChangUserData", {});
    },
    queryFriendNongChang: function queryFriendNongChang() {
        Global.PageMgr.showLoadingPage('正在跳转');
        this.scheduleOnce(function () {
            Global.PageMgr.closeLoadingPage();
            Global.PageMgr.closeAllPages();
            GameData.FriendNongChangUserData = [null, { id: 101003, time: 6000000, period: 1 }, { id: 101002, time: 6000000, period: 2 }, { id: 101001, time: 6000000, period: 3 }, null, null];
            cc.director.GlobalEvent.emit("FriendNongChangUserData", {});
            cc.find('Canvas/Main/FanHui').active = true;
        }, 1);
    },

    //收获农作物
    shouHuoNongZuoWu: function shouHuoNongZuoWu(pos, callback) {
        GameData.NongChangUserData[pos] = null;
        var data = true;
        callback(data);
    },

    //铲出农作物
    chanChuNongZuoWu: function chanChuNongZuoWu(callback) {
        var data = true;
        callback(data);
    },
    queryZhongZi: function queryZhongZi() {
        GameData.ZhongZiData = [{ id: 101001, count: 2 }, { id: 101002, count: 1 }, { id: 101003, count: 0 }];
        cc.director.GlobalEvent.emit("ZhongZiData", {});
    },
    queryGuoShi: function queryGuoShi() {
        GameData.GuoShiData = [{ id: 101001, count: 10 }, { id: 101002, count: 20 }, { id: 101003, count: 4 }];
        cc.director.GlobalEvent.emit("GuoShiData", {});
    },
    queryShangCheng: function queryShangCheng() {
        GameData.ShangChengData = [{ id: 101001, count: 2 }, { id: 101002, count: 1 }, { id: 101003, count: 5 }];
        cc.director.GlobalEvent.emit("ShangChengData", {});
    },
    zhongZhi: function zhongZhi(id, pos) {
        GameData.NongChangUserData[pos] = { id: id, time: 6166000, period: 1 };
        GameData.ZhongZhiReady.state = false;
        GameData.ZhongZhiReady.id = null;
        for (var i = 0; i < GameData.ZhongZiData.length; i++) {
            if (GameData.ZhongZiData[i].id == id) {
                GameData.ZhongZiData[i].count--;
                if (GameData.ZhongZiData[i].count <= 0) {
                    GameData.ZhongZiData.splice(i, 1);
                }
                cc.director.GlobalEvent.emit("ZhongZiData", {});
            }
        }
        var backPack = GameData.NongChangUserData;
        cc.director.GlobalEvent.emit("NongChangUserData", {});
        for (var _i = 0; _i < 6; _i++) {
            if (backPack[_i] == undefined || backPack[_i] == null) {
                GameData.ZhongZhiReady.pos = _i;
                return;
            }
        }
        Global.PageMgr.closeAllPages();
    },
    buyZhongZi: function buyZhongZi(id, count) {
        console.log('购买种子id：', id, '购买数量：', count);
    },
    saleGuoShi: function saleGuoShi(callback) {
        GameData.GuoShiData = [];
        callback();
    },
    queryFriend: function queryFriend() {
        GameData.FriendData = [{ url: 'http://upyun.diandianhui.xyz/head_image/1572070309952_0.png', name: '某个玩家1', state: 1 }, { url: 'http://upyun.diandianhui.xyz/head_image/1572070309952_0.png', name: '某个玩家2', state: 0 }, { url: 'http://upyun.diandianhui.xyz/head_image/1572070309952_0.png', name: '某个玩家3', state: 0 }];
        cc.director.GlobalEvent.emit('FriendData');
    },

    //赛车
    //------------
    Racing: function Racing() {
        cc.director.GlobalEvent.emit("NextTurn", {});
        var timerCount = 20;
        var timer = setInterval(function () {
            timerCount--;
            GameData.RacingTimer = timerCount;
            if (timerCount <= 0) {
                cc.director.GlobalEvent.emit("RacingStart", {});
                clearInterval(timer);
                return;
            }
            cc.director.GlobalEvent.emit("NextTurnTimer", {});
        }, 1000);
    },

    //红包
    //---------------
    //抢红包请求
    QiangHongBao: function QiangHongBao(callback) {
        Global.PageMgr.showLoadingPage2('加载中');
        app.Post('redPacket/tagRead', {}, callback);
    },

    //查询红包列表数据
    queryHongBaoList: function queryHongBaoList() {
        // Global.PageMgr.showLoadingPage('正在查询')
        app.Post('readPark/queryMainReadParkList.do', {}, function (data) {
            if (data.code == 200) {
                GameData.HongBaoList = data.data;
                cc.director.GlobalEvent.emit("HongBaoListData", {});
            } else {
                Global.PageMgr.showTipPage2(data.message);
            }
        });
    },

    //请求发红包配置信息
    faHongBaoConfig: function faHongBaoConfig() {
        // Global.PageMgr.showLoadingPage('正在加载配置')
        app.Post('redPacket/redPackConfig', {}, function (data) {
            console.log(data);
            if (data.code == 200) {
                GameData.FaHongBaoConfig = data.data;
                cc.director.GlobalEvent.emit("FaHongBaoConfig", {});
            } else {
                Global.PageMgr.showTipPage2(data.message);
            }
        });
    },

    //发红包请求
    faHongBao: function faHongBao(leiQu, jinE, num, callback) {
        Global.PageMgr.showLoadingPage2('正在发送');
        var reqData = {
            amount: jinE,
            bombDigital: leiQu,
            number: num
        };
        app.Post('redPacket/sendRedPack', reqData, callback);
    },

    //水果机
    //---------------
    //水果机请求结果
    slotResult: function slotResult(amount, callback) {
        var reqData = {
            amount: amount
        };
        app.Post('game/fruitMachine', reqData, callback);
    },

    //水果机中奖记录
    slotRecord: function slotRecord(callback) {
        app.Post('game/fruitMachineRecord', {}, callback);
    },
    slotUserData: function slotUserData() {
        app.Post('financial/getUserAccount', {}, function (data) {
            if (data.code == 200) {
                GameData.SlotUserData = data.data;
                cc.director.GlobalEvent.emit("slotUserData", {});
            } else {
                Global.PageMgr.showTipPage(data.message);
            }
        });
    }
}
// update (dt) {},
);

cc._RF.pop();