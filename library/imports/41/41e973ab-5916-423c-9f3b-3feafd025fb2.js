"use strict";
cc._RF.push(module, '41e97OrWRZCPJ87P+r9Al+y', 'SlotPanel');
// Script/Ui/SlotPanel/SlotPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        list: {
            type: cc.Node,
            default: []
        },
        Content: {
            type: cc.Node,
            default: null
        },
        item: {
            type: cc.Prefab,
            default: null
        },
        slot: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        if (Global.ResourceMgr == undefined) {
            Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
            Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
            Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
        }
        this.list.forEach(function (e) {
            for (var i = 0; i < 72; i++) {
                var node = cc.instantiate(_this.slot);
                node.parent = e;
                var num = dataFunc.randomNum(0, 9);
                var spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[num]);
                node.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
        this.winners = [];
        this.clickState = 1;
        this.currentWager = 0;
        cc.director.GlobalEvent.on("updateWager", this.updateWager, this);
        cc.director.GlobalEvent.on('slotUserData', this.updateUserData, this);
        Global.ProtocolMgr.slotUserData();
        this.height = 0;
        this.timer = 0;
    },
    updateWager: function updateWager() {
        this.node.getChildByName('JiaZhu').getChildByName('BeiShu').getComponent(cc.Label).string = this.currentWager;
    },

    //增加投注倍数
    addWager: function addWager() {
        if (this.clickState) {
            this.currentWager += 5;
            cc.director.GlobalEvent.emit('updateWager', {});
        }
    },

    //减少投注倍数
    minusWager: function minusWager() {
        if (this.currentWager >= 5 && this.clickState) {
            this.currentWager -= 5;
            cc.director.GlobalEvent.emit('updateWager', {});
        }
    },
    updateUserData: function updateUserData() {
        this.node.getChildByName('User').getChildByName('value').getComponent(cc.Label).string = GameData.SlotUserData.dssc;
    },

    //延迟开始每一列的滚动动画
    startSlot: function startSlot() {
        var _this2 = this;

        if (this.clickState) {
            this.data = 0;
            Global.ProtocolMgr.slotResult(this.currentWager, function (data) {
                if (data.code == 200) {
                    _this2.data = data.data.rewardLevel;
                    GameData.SlotUserData.dssc = data.data.amount;
                    _this2.message = data.data.message;
                    //水果机启动后禁止点击
                    _this2.clickState = 0;
                    _this2.result = dataFunc.randomNum(0, 8);
                    _this2.num = dataFunc.randomNum(1, 3);
                    while (true) {
                        _this2.result2 = dataFunc.randomNum(0, 8);
                        if (_this2.result2 != _this2.result) {
                            break;
                        }
                    }
                    _this2.numList = [];
                    while (_this2.numList.length < 3) {
                        var num = dataFunc.randomNum(0, 9);
                        if (_this2.numList.indexOf(num) == -1) {
                            _this2.numList.push(num);
                        }
                    }
                    _this2.startAnim(_this2.list[0], 0);
                    cc.audioEngine.play(Global.ResourceMgr.slotClip[0], false, 1);
                    setTimeout(function () {
                        _this2.startAnim(_this2.list[1], 1);
                    }, 200);
                    setTimeout(function () {
                        _this2.startAnim(_this2.list[2], 2);
                    }, 400);
                } else {
                    Global.PageMgr.showTipPage(data.message);
                }
            });
        } else {
            Global.PageMgr.showTipPage('游戏已开始');
        }
    },
    start: function start() {
        GameData.audio = 1;
    },

    //水果机滚动动画
    startAnim: function startAnim(list, tag) {
        var _this3 = this;

        list.y = 0;
        var children = list.children;
        var spriteFrame = void 0;
        // 第一项结果值
        if (this.data == 3) {
            //结果值
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[9]);
        } else if (this.data == 2) {
            //结果值
            console.log('二等奖');
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result]);
        } else if (this.data == 1) {
            //结果值
            console.log('三等奖', Global.ResourceMgr.SlotTexture[this.result]);
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result]);
            if (list.parent.name == 'item' + this.num) {
                spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result2]);
            }
        } else {
            spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.numList[tag]]);
        }
        children[children.length - 2].getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        var finish = function finish() {
            if (tag === 2) {
                cc.audioEngine.pauseAll();
                if (_this3.data !== 0) {
                    cc.audioEngine.play(Global.ResourceMgr.slotClip[1], false, 1);
                } else {
                    cc.audioEngine.play(Global.ResourceMgr.slotClip[2], false, 1);
                }
                _this3.clickState = 1;
                _this3.updateUserData();
                Global.PageMgr.showTipPage(_this3.message);
            }
        };
        var action = cc.sequence(cc.moveBy(5, cc.v2(0, -list.height + 540)).easing(cc.easeQuadraticActionInOut()), cc.callFunc(finish));
        list.y = -270;
        list.runAction(action);
    },
    closeGames: function closeGames() {
        // Global.ResourceMgr.playTransitionIn()
        this.node.destroy();
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("updateWager");
        cc.director.GlobalEvent.off('slotUserData');
        cc.director.loadScene('Dssc', function () {
            Global.ResourceMgr.playBgAudio();
            console.log('切换场景');
        });
    },
    update: function update(dt) {
        var _this4 = this;

        if (this.Content.height >= 275) {
            if (this.Content.y - 150 >= this.Content.height) {
                this.Content.y = 150;
            }
            this.Content.y += dt * 50;
        }
        this.timer += dt;
        if (this.timer > 1) {
            this.timer = 0;
            Global.ProtocolMgr.slotRecord(function (data) {
                if (data.code == 200) {
                    _this4.height = 0;
                    var list = data.data;
                    for (var i = list.length - 1; i > _this4.winners.length - 1; i--) {
                        var node = cc.instantiate(_this4.item);
                        node.parent = _this4.Content;
                        node.getChildByName('time').getComponent(cc.Label).string = list[i].time.substring(5, 16);
                        node.getChildByName('gain').getComponent(cc.Label).string = list[i].reward;
                        node.getChildByName('phone').getComponent(cc.Label).string = list[i].nickname;
                    }
                    _this4.winners = list;
                }
            });
        }
    }
});

cc._RF.pop();