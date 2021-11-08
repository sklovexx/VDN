(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/Racing/Racing.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dea14HChhlFw6pbmc5zuEVb', 'Racing', __filename);
// Script/Ui/Racing/Racing.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        carCount: 8,
        linesCount: 47,
        lineArr: {
            type: cc.Node,
            default: []
        },
        line: {
            type: cc.Prefab,
            default: null
        },
        Content: cc.Node,
        car: {
            type: cc.Prefab,
            default: null
        },
        SubPanel: {
            type: cc.Node,
            default: []
        },
        Ranking: {
            type: cc.Node,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        cc.director.GlobalEvent.on("UpdateRanking", this.onUpdateRanking, this);
        cc.director.GlobalEvent.on("NextTurn", this.onUpdateNextTurn, this);
        cc.director.GlobalEvent.on("NextTurnTimer", this.onUpdateNextTurnTimer, this);
        cc.director.GlobalEvent.on("RacingStart", this.onRacingStart, this);
        Global.ProtocolMgr.Racing();
        this.rank = [];
        this.timerSpeedUp = [];
        this.lineArr.forEach(function (e) {
            for (var i = 0; i < _this.linesCount; i++) {
                var node = cc.instantiate(_this.line);
                node.parent = e;
            }
        });
    },
    start: function start() {},

    //開始新一輪比賽
    onUpdateNextTurn: function onUpdateNextTurn() {
        var _this2 = this;

        this.Content.parent.x = 0;
        this.currentIndex = 0;
        this.currentMoney = 0;
        this.SubPanel[0].getChildByName('Num').children.forEach(function (e) {
            e.getComponent(cc.Toggle).isChecked = false;
        });
        this.SubPanel[0].getChildByName('Money').children.forEach(function (e) {
            e.getComponent(cc.Toggle).isChecked = false;
        });
        this.node.getChildByName('Tip').getComponent(cc.Label).string = '请选择要投注的车号';
        this.racing = [];

        var _loop = function _loop(i) {
            var node = cc.instantiate(_this2.car);
            node.parent = _this2.Content;
            node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.CarTexture[i]);
            node.on(cc.Node.EventType.TOUCH_END, function () {
                _this2.SpeedUpById(i);
            }, _this2);
            _this2.racing.push(node);
        };

        for (var i = 0; i < this.carCount; i++) {
            _loop(i);
        }
    },

    //下一輪倒計時更新
    onUpdateNextTurnTimer: function onUpdateNextTurnTimer() {
        GameData.RacingGameState = 0;
        this.node.getChildByName('Timer').active = true;
        this.node.getChildByName('Timer').getChildByName('Text').getComponent(cc.Label).string = GameData.RacingTimer;
    },

    //比賽開始
    onRacingStart: function onRacingStart() {
        var _this3 = this;

        GameData.RacingGameState = 1;
        this.node.getChildByName('Timer').active = false;
        this.racing.forEach(function (e, i) {
            var ani = e.getComponent(cc.Animation);
            var aniState = ani.getAnimationState('racing');
            aniState.speed = Math.random() * 1 + 1;
            var timer = setInterval(function () {
                aniState.speed = e.RacingSpeedUp ? 2 : Math.random() * 0.8 + 1;
            }, 1000);
            var finish = function finish() {
                clearInterval(timer);
                _this3.rank.push(i);
                if (_this3.rank.length >= _this3.carCount) {
                    GameData.RacingGameState = 2;
                    cc.director.GlobalEvent.emit("UpdateRanking", {});
                    setTimeout(function () {
                        _this3.clear();
                        Global.ProtocolMgr.Racing();
                    }, 2000);
                    _this3.rank.forEach(function (e, i) {
                        if (e + 1 == _this3.currentIndex) {
                            Global.PageMgr.showTipPage('您投注的车获得了第' + (i + 1) + '名');
                        }
                    });
                }
            };
            ani.on('finished', finish, _this3);
            ani.playAdditive();
        });
    },
    ClosePage: function ClosePage() {
        Global.PageMgr.onClosePage(4);
    },
    onEnable: function onEnable() {},
    clear: function clear() {
        this.rank = [];
        var children = this.Content.children;
        children.forEach(function (e) {
            e.destroy();
        });
    },
    OpenSubPanel: function OpenSubPanel(event, customEventData) {
        if (GameData.RacingGameState == 1) {
            Global.PageMgr.showTipPage('游戏已开始');
            return;
        }
        this.SubPanel[customEventData].active = true;
    },
    CloseSubPanel: function CloseSubPanel(event, customEventData) {
        this.SubPanel[customEventData].active = false;
    },

    //投注
    TouZhu: function TouZhu() {
        var _this4 = this;

        this.SubPanel[0].getChildByName('Num').children.forEach(function (e) {
            if (e.getComponent(cc.Toggle).isChecked) {
                _this4.currentIndex = parseInt(e.name);
            }
        });
        this.SubPanel[0].getChildByName('Money').children.forEach(function (e) {
            if (e.getComponent(cc.Toggle).isChecked) {
                _this4.currentMoney = parseInt(e.name);
            }
        });
        var money = this.currentMoney;
        var num = this.currentIndex;
        if (!num || num == 0) {
            Global.PageMgr.showTipPage('请选择投注车号');
            return;
        }
        if (!money || money == 0) {
            Global.PageMgr.showTipPage('请选择投注金额');
            return;
        }
        this.node.getChildByName('Tip').getComponent(cc.Label).string = '即将开始';
        Global.PageMgr.showTipPage('成功投注' + num + '号车' + money + 'ECC');
        this.SubPanel[0].active = false;
    },

    //排行榜更新
    onUpdateRanking: function onUpdateRanking() {
        var _this5 = this;

        this.SubPanel[1].active = true;
        this.Ranking.forEach(function (e, i) {
            e.getChildByName('Item').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.CarTexture[_this5.rank[i]]);
        });
    },

    //加速點擊車輛
    SpeedUpById: function SpeedUpById(id) {
        var _this6 = this;

        if (GameData.RacingGameState != 1) {
            Global.PageMgr.showTipPage('游戏未开始');
            return;
        }
        var ani = this.racing[id].getComponent(cc.Animation);
        this.racing[id].getChildByName('fire1').active = false;
        this.racing[id].getChildByName('fire2').active = true;
        this.racing[id].getChildByName('speedUp1').active = false;
        this.racing[id].getChildByName('speedUp2').active = true;
        var aniState = ani.getAnimationState('racing');
        aniState.speed = 2;
        this.racing[id].RacingSpeedUp = true;
        try {
            clearTimeout(this.timerSpeedUp[id]);
        } catch (e) {
            console.error(e);
        }
        this.timerSpeedUp[id] = setTimeout(function () {
            aniState.speed = Math.random() * 0.8 + 1;
            _this6.racing[id].getChildByName('fire1').active = true;
            _this6.racing[id].getChildByName('fire2').active = false;
            _this6.racing[id].getChildByName('speedUp1').active = true;
            _this6.racing[id].getChildByName('speedUp2').active = false;
            _this6.racing[id].RacingSpeedUp = false;
        }, 2000);
    },

    //加速投注車輛
    SpeedUp: function SpeedUp() {
        var _this7 = this;

        if (GameData.RacingGameState != 1) {
            Global.PageMgr.showTipPage('游戏未开始');
            return;
        }
        if (this.currentIndex == 0) {
            Global.PageMgr.showTipPage('您没有投注车号');
            return;
        }
        var ani = this.racing[this.currentIndex - 1].getComponent(cc.Animation);
        this.racing[this.currentIndex - 1].getChildByName('fire1').active = false;
        this.racing[this.currentIndex - 1].getChildByName('fire2').active = true;
        this.racing[this.currentIndex - 1].getChildByName('speedUp1').active = false;
        this.racing[this.currentIndex - 1].getChildByName('speedUp2').active = true;
        var aniState = ani.getAnimationState('racing');
        aniState.speed = 2;
        this.racing[this.currentIndex - 1].RacingSpeedUp = true;
        setTimeout(function () {
            aniState.speed = Math.random() * 0.8 + 1;
            _this7.racing[_this7.currentIndex - 1].getChildByName('fire1').active = true;
            _this7.racing[_this7.currentIndex - 1].getChildByName('fire2').active = false;
            _this7.racing[_this7.currentIndex - 1].getChildByName('speedUp1').active = true;
            _this7.racing[_this7.currentIndex - 1].getChildByName('speedUp2').active = false;
            _this7.racing[_this7.currentIndex - 1].RacingSpeedUp = false;
        }, 2000);
    },
    update: function update(dt) {
        //有投注車輛時視角自動跟隨
        if (this.currentIndex != 0 && GameData.RacingGameState == 1) {
            this.Content.parent.x = -(this.racing[this.currentIndex - 1].x - 400);
            this.node.getChildByName('ScrollView').getComponent(cc.ScrollView).horizontal = false;
        } else {
            this.node.getChildByName('ScrollView').getComponent(cc.ScrollView).horizontal = true;
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
        //# sourceMappingURL=Racing.js.map
        