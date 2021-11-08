"use strict";
cc._RF.push(module, '4f2dbIeuuJDrb/066peEzF9', 'PlayerCtrl');
// NiuNiu/script/PlayerCtrl.js

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

cc.Class({
    extends: cc.Component,

    properties: {
        uidLabel: cc.Label,
        uid: {
            default: 0,
            notify: function notify() {
                this.uidLabel.string = "uid:" + this.uid;
            }
        },
        avatar: cc.Sprite,
        nickNameLabel: cc.Label,
        nickName: {
            default: "Mark",
            notify: function notify() {
                this.nickNameLabel.string = this.nickName;
            }
        },
        coinsLabel: cc.Label,
        coins: {
            default: 999999,
            type: cc.Integer,
            min: 0,
            notify: function notify() {
                this.coinsLabel.string = this.coins;
            }
        },
        cardPanelLeft: cc.Node,
        cardPanelRight: cc.Node,
        cardPanelNode: cc.Node,
        menuNode: cc.Node,
        startNode: cc.Node,
        readyNode: cc.Node,
        readyStateNode: cc.Node,
        kickNode: cc.Node,
        quitNode: cc.Node,
        bankerSp: cc.Node,
        menuLabel: [cc.Label],
        bet1: {
            default: 0,
            notify: function notify() {
                this.menuLabel[0].string = this.bet1;
            }
        },
        bet2: {
            default: 0,
            notify: function notify() {
                this.menuLabel[1].string = this.bet2;
            }
        },
        bet3: {
            default: 0,
            notify: function notify() {
                this.menuLabel[2].string = this.bet3;
            }
        },
        bet4: {
            default: 0,
            notify: function notify() {
                this.menuLabel[3].string = this.bet4;
            }
        },
        isBanker: {
            default: false,
            notify: function notify() {
                this.bankerSp.active = this.isBanker;
                this.betLabel.node.active = !this.isBanker;
            }
        },

        showMenu: {
            default: false,
            notify: function notify() {
                this.menuNode.active = this.showMenu;
            }
        },

        showStart: {
            default: true,
            notify: function notify() {
                this.startNode.active = this.showStart;
            }
        },
        showReady: {
            default: false,
            notify: function notify() {
                this.readyNode.active = this.showReady;
            }
        },
        showReadyState: {
            default: false,
            notify: function notify() {
                this.readyStateNode.active = this.showReadyState;
            }
        },
        showKick: {
            default: false,
            notify: function notify() {
                this.kickNode.active = this.showKick;
            }
        },
        showQuit: {
            default: true,
            notify: function notify() {
                this.quitNode.active = this.showQuit;
            }
        },
        cowLabel: cc.Label,
        rewardLabel: cc.Label,

        betLabel: cc.Label,
        curBets: 0, // 当前下注

        hands: [],

        typeReturn: null // 牌型信息@TypeReturn

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.clearHands();
    },
    start: function start() {},
    initPlayer: function initPlayer(name, avatar, coins) {
        var _this = this;

        this.nickName = name;
        this.coins = coins;
        if (!avatar) {
            // 随机一个头像
            cc.loader.loadRes("userIcons/user_icon_woman" + Utils.randomInteger(0, 3), cc.SpriteFrame, function (err, sf) {
                if (!err) {
                    _this.avatar.spriteFrame = sf;
                }
            });
        } else {
            cc.loader.load({ url: avatar, type: 'jpg' }, function (err, tex) {
                if (err) {
                    console.log(err.message || err);
                    return;
                }
                this.avatar.spriteFrame = new cc.SpriteFrame(tex);
            }.bind(this));
        }
    },
    initPlayerWithData: function initPlayerWithData(data) {
        var _this2 = this;

        console.warn(data);
        this.nickName = data.nickname;
        this.coins = data.coins;
        this.uid = data.uid;
        this.isBanker = data.isBanker;
        this.showReadyState = data.isready;
        if (!data.avatar) {
            // 随机一个头像
            cc.loader.loadRes("userIcons/user_icon_woman" + Utils.randomInteger(0, 3), cc.SpriteFrame, function (err, sf) {
                if (!err) {
                    _this2.avatar.spriteFrame = sf;
                }
            });
        } else {
            cc.loader.load({ url: data.avatar, type: 'jpg' }, function (err, tex) {
                if (err) {
                    console.log(err.message || err);
                    return;
                }
                this.avatar.spriteFrame = new cc.SpriteFrame(tex);
            }.bind(this));
        }
    },
    onBtnDown: function onBtnDown(send, data) {
        var downNum = 0;
        data = parseInt(data);
        switch (data) {
            case 1:
                {
                    downNum = this.bet1;
                    break;
                }
            case 2:
                {
                    downNum = this.bet2;
                    break;
                }
            case 3:
                {
                    downNum = this.bet3;
                    break;
                }
            case 4:
                {
                    downNum = this.bet4;
                    break;
                }
            default:
                downNum = this.bet1;
                break;
        }

        this.menuNode.active = false;
        this.payBet(downNum);
    },
    onBtnStart: function onBtnStart() {
        cc.log("start.");
        GlobalNiuNiu.netProxy.startGame();
    },
    onBtnReady: function onBtnReady() {
        cc.log("ready.");
        GlobalNiuNiu.netProxy.ready();
    },
    onBtnQuit: function onBtnQuit() {
        cc.log("quitRoom.");
        GlobalNiuNiu.netProxy.quitRoom();
        setTimeout(function () {
            cc.audioEngine.pauseAll();
            GlobalNiuNiu.loadScene("Menu");
        }, 500);
    },
    onBtnKick: function onBtnKick() {
        cc.log("kick.");
        if (this.isBanker) {
            GlobalNiuNiu.netProxy.kick();
        }
    },

    // 清空手牌
    clearHands: function clearHands() {
        this.cardPanelLeft.removeAllChildren();
        this.cardPanelLeft.width = 0;
        this.cardPanelRight.removeAllChildren();
        this.cardPanelRight.width = 0;
        this.hands = [];

        // this.isBanker = false;
        this.showMenu = false;
        this.showStart = false;
        this.cowLabel.node.active = false;
        this.rewardLabel.node.active = false;
        this.typeReturn = null;

        this.curBets = 0;
        this.betLabel.string = "下注:" + 0;
    },


    /**
     *
     * @param bet 下注，-1表示随机自动下注
     * @param delay 延迟操作，方便机器人控制
     */
    payBet: function payBet(bet, delay) {
        var _this3 = this;

        this.scheduleOnce(function () {
            if (bet < 0) {
                // 如果手中三张可以组成牛则下大注
                var sum = 0;
                if (_this3.hands.length > 3) {
                    for (var i = 0; i < 3; i++) {
                        var card = _this3.hands[i];
                        sum += card.point <= 10 ? card.point : 10;
                    }
                }
                cc.log("sum: " + sum + ",sum%10:" + sum % 10);
                if (sum > 0 && sum % 10 === 0) {
                    bet = [50, 100][Utils.randomInteger(0, 1)];
                } else {
                    bet = [10, 20, 50, 100][Utils.randomInteger(0, 3)];
                }
            }

            _this3.curBets = bet;
            _this3.betLabel.string = "下注:" + bet;

            if (GlobalNiuNiu.config.ONLINE_MODE) {
                GlobalNiuNiu.netProxy.payBet(bet);
            }
        }, delay != undefined ? delay : 0);
    },
    showBet: function showBet(bet) {
        this.curBets = bet;
        this.betLabel.string = "下注:" + bet;
    },


    /**
     * 开启手牌
     * @param delay{Number} 延迟开牌(防止机器人同时开牌)
     */
    openHands: function openHands(delay) {
        var _this4 = this;

        this.scheduleOnce(function () {
            var names = ["没牛", "牛1", "牛2", "牛3", "牛4", "牛5", "牛6", "牛7", "牛8", "牛9", "牛牛", "银牛", "炸弹", "五花牛", "五小牛"];
            _this4.typeReturn = getHandsType(_this4.hands);
            _this4.cowLabel.node.active = true;
            _this4.cowLabel.string = names[_this4.typeReturn.handsType];

            GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr["effNiu_" + _this4.typeReturn.handsType]);

            // 把牌都翻开
            _this4.cardPanelLeft.removeAllChildren(true);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this4.typeReturn.nCards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cardObj = _step.value;

                    var card = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab);
                    card.getComponent("CardCtrl").initCard(cardObj.point, cardObj.suit, true);
                    card.x = card.y = 0;
                    _this4.cardPanelLeft.addChild(card);
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

            _this4.cardPanelRight.removeAllChildren(true);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _this4.typeReturn.pCards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _cardObj = _step2.value;

                    var card = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab);
                    card.getComponent("CardCtrl").initCard(_cardObj.point, _cardObj.suit, true);
                    card.x = card.y = 0;
                    _this4.cardPanelRight.addChild(card);
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
        }, delay != undefined ? delay : 0);
    },
    addReward: function addReward(coins, addCoins) {
        // this.coins = parseFloat(this.coins) +parseFloat(coins);
        this.coins = coins;
        this.rewardLabel.string = (parseFloat(addCoins) > 0 ? "+" : "") + addCoins;
        this.getComponent(cc.Animation).play("showReward");
    }

    // update (dt) {},

});

cc._RF.pop();