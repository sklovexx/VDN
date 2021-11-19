(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/RoomCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0f7f9G2EW9BspV1mWJvrDGx', 'RoomCtrl', __filename);
// NiuNiu/script/RoomCtrl.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Utils = require("./common/UtilsOther");
var Toast = require("./views/ToastCtrl");
var Dialog = require("./views/DialogCtrl");
var playerObj = require("./common/DataMgr").getInstance().playerObj;

cc.Class({
    extends: cc.Component,

    properties: {
        seats: [cc.Node],
        cardHeapSeat: cc.Node,
        multLabel: cc.Label,
        mult: {
            default: 1,
            type: cc.Integer,
            min: 1,
            max: 50,
            notify: function notify() {
                this.multLabel.string = this.mult + "倍场";
            }
        },
        betTimeLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 自己在正中间,座位号为2
        this.selfNodeCtrl = this.getPlayerNode(2).getComponent("PlayerCtrl");
        this.startBets = false; // 开始下注
        this.bankerSeat = -1; // 庄家座位号
        this.cardsArr = []; // 当前牌堆
        this.nextBankerSeat = -1; // 下一个庄家
        this.mult = GlobalNiuNiu.config.ROOM_MULT;
        this.betTimeLabel.node.parent.active = false;
    },
    start: function start() {
        this.schedule(this.myUpdate, 0.1);
        this.initGame();
        this.startGame();

        GlobalNiuNiu.audioMgr.playMusic(GlobalNiuNiu.audioMgr.gameMusic);
    },
    initGame: function initGame() {
        var names = ["玛利亚", "波多", "吉野君", "椎名空", "筱田步美", "佐佐木明希", "高桥圣子", "三上悠亚", "水野朝阳"];
        // 随机4个玩家, 中间座位为自己
        for (var i = 0; i < 5; i++) {
            if (i != 2) {
                var index = Utils.randomInteger(0, names.length - 1);
                var name = names[index];
                names.splice(index, 1);
                var coins = 100000;
                this.getPlayerNode(i).getComponent("PlayerCtrl").initPlayer(name, null, coins);
            }
        }

        // 初始化自己
        this.selfNodeCtrl.initPlayerWithData(playerObj);

        // 开局随机一个庄家
        this.bankerSeat = this.nextBankerSeat = Utils.randomInteger(0, 4);

        // 初始化牌堆
        this.cardsArr = create1pairPoker(true);
    },


    /**
     * 获取发牌顺序（座位号), 从庄家开始逆时针发牌
     * @return {Array}
     */
    getDealSeatOrder: function getDealSeatOrder() {
        var order = [];
        var tmp = this.bankerSeat;
        while (tmp <= 4) {
            order.push(tmp++);
        }
        tmp = 0;
        while (tmp < this.bankerSeat) {
            order.push(tmp++);
        }

        return order;
    },


    /**
     * 清理游戏，方便开始下一局
     */
    cleanGame: function cleanGame() {
        for (var i = 0; i < 5; i++) {
            var p = this.getPlayerNode(i).getComponent("PlayerCtrl");
            p.clearHands();
        }
    },


    /**
     *
     * @param seatIndex
     * @return {cc.Node}
     */
    getPlayerNode: function getPlayerNode(seatIndex) {
        cc.assert(seatIndex >= 0 && seatIndex <= 4, "wrong seatIndex!");
        return this.seats[seatIndex].getChildByName("PlayerNode");
    },
    startGame: function startGame() {
        var _this = this;

        // 金币不足无法继续
        if (GlobalNiuNiu.dataMgr.playerObj.coins < this.mult * 100 * 4) {
            Dialog.show("金币不足" + this.mult * 50 * 4 + "，请充值.", null, "确定", null, function () {
                GlobalNiuNiu.loadScene("Lobby");
            });
            return;
        }

        this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl").isBanker = true;

        this.scheduleOnce(function () {
            if (GlobalNiuNiu.config.GAME_MODE < 5) {
                // 下发牌后下注
                _this.startDeal(GlobalNiuNiu.config.GAME_MODE, function () {
                    _this.startBetDown();
                });
            } else {
                // 先下注后发牌
                _this.startBetDown();
            }
        }, 1);
    },


    /**
     * 开始下注
     */
    startBetDown: function startBetDown() {
        var _this2 = this;

        Toast.showText("请开始下注.", 1, function () {
            _this2.startBets = true;
            _this2.betsTime = GlobalNiuNiu.config.BETS_WAITING;
            _this2.robotDown();
        });
        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effMdls);
        this.selfNodeCtrl.showMenu = !this.selfNodeCtrl.isBanker;
    },


    /**
     * 给机器下注
     */
    robotDown: function robotDown() {
        // 自动给机器人下注
        var orders = this.getDealSeatOrder();
        for (var i = 0; i < orders.length; i++) {
            var seat = orders[i];
            var player = this.getPlayerNode(seat).getComponent("PlayerCtrl");

            if (seat === 2 || player.isBanker) continue;

            // 机器人自动加钱
            if (player.coins < this.mult * 100 * 4) {
                player.coins = 100000;
            }
            player.payBet(-1, Math.random() + 0.5);
        }
    },


    /**
     * 开发发牌
     * @param count{Number} 发牌张数
     * @param cb{function} 回调函数
     */
    startDeal: function startDeal(count, cb) {
        cc.log("开始发牌." + count + "张.");
        var t = 0;
        if (count > 0) {

            // 执行发牌并展示动画
            var _dealAct2 = function _dealAct2(seat, cards) {
                var playerCtrl = self.getPlayerNode(seat).getComponent("PlayerCtrl");

                var _loop = function _loop(i) {
                    var cardObj = cards[i];
                    playerCtrl.hands.push(cardObj); // 发牌给玩家
                    var card = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab);
                    card.getComponent("CardCtrl").initCard(cardObj.point, cardObj.suit, false);
                    card.scale = 0.5;
                    card.zIndex = zIndex;
                    var posOri = root.convertToNodeSpaceAR(root.convertToWorldSpaceAR(self.cardHeapSeat.getPosition()));
                    var posDes = root.convertToNodeSpaceAR(playerCtrl.cardPanelLeft.convertToWorldSpaceAR(cc.v2(0, 0)));
                    root.addChild(card);
                    card.setPosition(posOri);
                    card.runAction(cc.sequence(cc.delayTime(t), cc.moveTo(0.1, posDes), cc.callFunc(function () {
                        card.removeFromParent(true);
                        card.x = card.y = 0;
                        card.scale = 1;
                        card.getComponent("CardCtrl").showFace = seat === 2;
                        playerCtrl.cardPanelLeft.addChild(card);
                        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effFapai);
                    })));

                    t += 0.1;
                    zIndex--;
                };

                for (var i = 0; i < cards.length; i++) {
                    _loop(i);
                }
            };

            var self = this;
            var zIndex = GlobalNiuNiu.config.LOCAL_ZINDEX_MAX;
            var root = self.cardHeapSeat.parent;
            var order = this.getDealSeatOrder();

            if (this.cardsArr.length < count * 5) {
                cc.log("牌不够，洗牌.");
                this.cardsArr = create1pairPoker(true);
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var seat = _step.value;

                    var cards = this.cardsArr.slice(0, count);
                    sortBig2Samll(cards);
                    this.cardsArr = this.cardsArr.slice(count);
                    _dealAct2(seat, cards);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        this.scheduleOnce(cb, t + 0.5);
    },


    // 开牌比较大小
    openHands: function openHands() {
        var _this3 = this;

        cc.log("开始开牌");
        GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effKaipai);

        Toast.showText("开牌!", 1, function () {
            var orders = _this3.getDealSeatOrder();
            var t = 0.6;
            for (var i = 0; i < orders.length; i++) {
                var seat = orders[i];
                _this3.getPlayerNode(seat).getComponent("PlayerCtrl").openHands(t * i);
            }

            _this3.scheduleOnce(_this3.countReward, t * orders.length);
        });
    },


    /**
     *  计算牌型倍数
     * @param typeReturn{TypeReturn}
     * 牛牛 this.mult倍，牛9减一倍，牛8减二倍，直到剩余一倍
     */
    countMult: function countMult(typeReturn) {
        if (this.mult <= 1) return 1;
        var mult = 1;
        if (typeReturn.handsType === HandsType.TYPE_NONE) {
            mult = 1;
        } else {
            mult = this.mult + (typeReturn.handsType - HandsType.TYPE_NIUNIU);
        }

        mult = Math.max(mult, 1);
        return mult;
    },


    // 结算
    countReward: function countReward() {
        var _this4 = this;

        cc.log("结算");
        var banker = this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl");
        var bankerType = banker.typeReturn;
        var bankerReward = 0;

        var orders = this.getDealSeatOrder();
        orders.splice(0, 1);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = orders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var seat = _step2.value;

                var player = this.getPlayerNode(seat).getComponent("PlayerCtrl");
                var pType = player.typeReturn;
                if (pType.handsType === HandsType.TYPE_NIUNIU) {
                    this.nextBankerSeat = seat;
                }
                if (compareHandsReturn(bankerType, pType)) {
                    // 庄家赢
                    var multi = this.countMult(bankerType);
                    bankerReward += player.curBets * multi;
                    player.addReward(-player.curBets * multi);
                } else {
                    // 闲家赢
                    var _multi = this.countMult(pType);
                    bankerReward -= player.curBets * _multi;
                    player.addReward(player.curBets * _multi);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        banker.addReward(bankerReward);

        GlobalNiuNiu.dataMgr.playerObj.coins = this.selfNodeCtrl.coins;
        GlobalNiuNiu.dataMgr.saveDataToLocal();

        this.scheduleOnce(function () {
            // 开始下一局
            Dialog.show("继续玩？", "取消", "确定", function () {
                GlobalNiuNiu.loadScene("Lobby");
            }, function () {
                _this4.cleanGame();
                _this4.bankerSeat = _this4.nextBankerSeat;
                _this4.startGame();
            });
        }, 1.5);
    },
    myUpdate: function myUpdate(dt) {
        var _this5 = this;

        if (!this.startBets) {
            return;
        }

        this.betTimeLabel.string = Math.ceil(this.betsTime);
        this.betsTime -= dt;
        if (this.betsTime > 0) {
            this.betTimeLabel.node.parent.active = true;
            var allOk = true;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.seats[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var seat = _step3.value;

                    var player = seat.getChildByName("PlayerNode").getComponent("PlayerCtrl");
                    if (player.curBets <= 0 && !player.isBanker) {
                        allOk = false;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (allOk) {
                // 都下好注开始发牌
                this.startBets = false;
            }
        } else {
            // 超时自动下注最小bet, 按照顺序，逆时针开始
            var orders = this.getDealSeatOrder();
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = orders[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _seat = _step4.value;

                    var _player = this.getPlayerNode(_seat).getComponent("PlayerCtrl");
                    if (_player.curBets <= 0) {
                        _player.onBtnDown(null, 1); // 超时自动下注最小bet
                        this.startBets = false;
                        cc.log("超时自动下注.");
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }

        // 已经下好注，开始发剩下的牌
        if (!this.startBets) {
            this.betTimeLabel.node.parent.active = false;
            var cardCounts = GlobalNiuNiu.config.GAME_MODE < 5 ? 5 - GlobalNiuNiu.config.GAME_MODE : GlobalNiuNiu.config.GAME_MODE;
            this.startDeal(cardCounts, function () {
                _this5.openHands();
            });
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=RoomCtrl.js.map
        