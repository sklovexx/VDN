"use strict";
cc._RF.push(module, 'e3506uOEnRJwrWs/MZa1Mhh', 'MineDoor');
// Script/Ui/Kuangchi/MineDoor.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        duration: 0,
        mineDoor: cc.Node,
        treasureBox: cc.Prefab,
        gold: cc.Prefab,
        tip: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        cc.sys.localStorage.clear('getEGold');
        setTimeout(function () {
            Global.ProtocolMgr.queryMillOutput(function (data) {
                var res = eval(data.data.canAccept);
                if (cc.sys.localStorage.getItem('getEGold') == null && res) {
                    var tip = cc.instantiate(_this.tip);
                    tip.parent = _this.node.parent;
                    tip.getComponent('Tip').setItem('获得E金币');
                    tip.x = _this.node.x;
                    tip.y = _this.node.y;
                }
            });
        }, 400);

        this.isOpen = false;
        this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
            var _this2 = this;

            Global.ProtocolMgr.queryMillOutput(function (data) {
                var res = eval(data.data.canAccept);
                if (res && !_this2.isOpen) {
                    if (cc.sys.localStorage.getItem('getEGold') == null) {
                        cc.sys.localStorage.setItem('getEGold', 1);
                    }
                    //打开宝箱
                    _this2.isOpen = true;
                    var jumpDown = cc.moveBy(_this2.duration, cc.v2(0, _this2.jumpHeight)).easing(cc.easeCubicActionOut());
                    _this2.mineDoor.runAction(jumpDown);
                    var treasureBox = cc.instantiate(_this2.treasureBox);
                    treasureBox.parent = _this2.node.parent;
                    treasureBox.x = 187;
                    treasureBox.y = -220;
                    setTimeout(function () {
                        Global.ProtocolMgr.addEgold();
                        var jump = cc.repeat(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(1, cc.v2(0, -20))), 10);
                        treasureBox.runAction(jump);
                        var count = 0;
                        var timer = setInterval(function () {
                            if (count >= 20) {
                                clearInterval(timer);
                            }
                            var node = cc.instantiate(_this2.gold);
                            node.x = treasureBox.x;
                            node.y = treasureBox.y;
                            node.parent = _this2.node.parent;
                            var dir = dataFunc.randomNum(0, 1) == 0 ? 1 : -1;
                            node.getComponent('Gold').launch(dir);
                            count++;
                        }, 20);
                    }, 500);
                    setTimeout(function () {
                        console.log('获得金币');
                        var fadeOut = cc.sequence(cc.fadeOut(1), cc.callFunc(_this2.closeTreasureBox, _this2, treasureBox));
                        treasureBox.runAction(fadeOut);
                        //关闭宝箱
                        var jumpDown = cc.sequence(cc.moveBy(_this2.duration, cc.v2(0, -_this2.jumpHeight)).easing(cc.easeCubicActionIn()), cc.callFunc(_this2.closeFinish, _this2));
                        _this2.mineDoor.runAction(jumpDown);
                    }, 4000);
                }
            });
        }, this);
    },
    closeTreasureBox: function closeTreasureBox(treasureBox) {
        treasureBox.destroy();
    },
    closeFinish: function closeFinish() {
        this.isOpen = false;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();