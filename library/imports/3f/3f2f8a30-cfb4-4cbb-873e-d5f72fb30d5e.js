"use strict";
cc._RF.push(module, '3f2f8owz7RMu4c+1fcvsw1e', 'KuangChi');
// Script/Ui/Kuangchi/KuangChi.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        UserData: [cc.Node],
        SubPanel: [cc.Node],
        GonGao: cc.Node,
        ECC: cc.Prefab,
        Count: 10
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        cc.director.GlobalEvent.on("UserData", this.onUpdateUserData, this);
        Global.ProtocolMgr.queryUserData();
        Global.ProtocolMgr.queryEcc(function (data) {
            _this.Count = parseInt(data.data.number);
            //生成矿球

            var _loop = function _loop(i) {
                var node = cc.instantiate(_this.ECC);
                var position = _this.randomPosition();
                node.parent = _this.node;
                node.x = position.x;
                node.y = position.y;
                var jump = cc.repeatForever(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(1, cc.v2(0, -20))));
                setTimeout(function () {
                    node.runAction(jump);
                }, Math.random() * 1000);
                node.on(cc.Node.EventType.TOUCH_END, function () {
                    //防止操作其他节点
                    if (node.name == "ECC") {
                        //防止多次点击
                        Global.ProtocolMgr.addEcc();
                        node.off(cc.Node.EventType.TOUCH_END);
                        node.destroy();
                        // let fadeOut = cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){}));
                        // node.runAction(fadeOut)
                    }
                }, _this);
            };

            for (var i = 0; i < _this.Count; i++) {
                _loop(i);
            }
        });
    },

    //监听用户信息更新
    onUpdateUserData: function onUpdateUserData() {
        var _this2 = this;

        try {
            cc.loader.load({ url: GameData.UserData[0], type: 'png' }, function (err, res) {
                _this2.UserData[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
            });
        } catch (e) {
            console.warn(e);
        }
        for (var i = 1; i < this.UserData.length; i++) {
            this.UserData[i].getComponent(cc.Label).string = parseFloat(GameData.UserData[i]).toFixed(2);
        }
    },
    start: function start() {},

    //获取随机位置
    randomPosition: function randomPosition() {
        var canvas = cc.director.getScene().getChildByName('Canvas').getComponent(cc.Canvas).node;
        var pad = 80,
            minX = -canvas.width / 2 + pad,
            minY = -canvas.height / 2 + pad,
            maxX = canvas.width / 2 - pad,
            maxY = canvas.height / 2 - pad;
        var x = dataFunc.randomNum(minX, maxX),
            y = dataFunc.randomNum(minY, maxY);
        return { x: x, y: y };
    },
    showSubPanel: function showSubPanel(event, index) {
        this.SubPanel[index].active = true;
    },
    closeSubPanel: function closeSubPanel(event, index) {
        this.SubPanel[index].active = false;
    },
    filterClick: function filterClick() {
        console.log('点击过滤');
        return;
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("UserData");
    }
}
// update (dt) {},
);

cc._RF.pop();