(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/components/GainGold.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '466f4kkwzlDypFUDMvsCp20', 'GainGold', __filename);
// Script/components/GainGold.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //飞的金币预制
        coinpre: cc.Prefab,
        //目标节点
        coinNode: cc.Node,
        //生成金币个数
        createcoin: 20,
        //随机范围(random1~random2之间)
        random1: -200,
        random2: 200,
        //随机范围(random1~random2之间)
        createTime: 0.15,
        //停留时间
        standingTime: 0.2,
        //金币移动速度
        coinSpeed: 1000
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    onPlayCoinAni: function onPlayCoinAni(callback) {
        var _this = this;

        var tempPlayer = cc.v2(0, 0);

        var _loop = function _loop(i) {
            var pre = cc.instantiate(_this.coinpre);
            pre.parent = _this.node;
            pre.setPosition(tempPlayer);
            var rannumx = Math.floor(Math.random() * (_this.random2 - _this.random1 + 1) + _this.random1);
            var rannumy = Math.floor(Math.random() * (_this.random2 - _this.random1 + 1) / 1.5 + _this.random1 / 1.5);
            pre.runAction(cc.moveBy(_this.createTime, rannumx, rannumy));
            _this.scheduleOnce(function () {
                pre.stopAllActions();
                var finshend = cc.callFunc(function () {
                    pre.destroy();
                    // this.coinNode.getComponent(cc.Animation).play()
                    if (i == this.createcoin - 1) {
                        //结束
                        this.scheduleOnce(function () {
                            callback();
                        }, 0.5);
                    }
                }, _this);
                var pos = pre.getPosition();
                var coinpos = _this.coinNode.getPosition();
                var playTime = pos.sub(coinpos).mag() / _this.coinSpeed;
                pre.runAction(cc.sequence(cc.moveTo(playTime, coinpos.x, coinpos.y), finshend));
            }, _this.standingTime + _this.createTime);
        };

        for (var i = 0; i < this.createcoin; i++) {
            _loop(i);
        }
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=GainGold.js.map
        