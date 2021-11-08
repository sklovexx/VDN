(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/NongChang/NongChangPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30affePXo9CMLtBP0cT06lG', 'NongChangPanel', __filename);
// Script/Ui/NongChang/NongChangPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        item: cc.Prefab,
        ToggleContainer: [cc.Node],
        SubPanel: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        cc.director.GlobalEvent.on("ZhongZiData", this.onUpdateZhongZiData, this);
        cc.director.GlobalEvent.on("GuoShiData", this.onUpdateGuoShiData, this);
        cc.director.GlobalEvent.on("ShangChengData", this.onUpdateShangChengData, this);
        this.currentCount = 0;
        this.maxCount = 999;
        this.ToggleContainer.forEach(function (e) {
            e.on(cc.Node.EventType.TOUCH_END, function () {
                _this.toggleChange(e.name);
            });
        });
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("ZhongZiData");
        cc.director.GlobalEvent.off("GuoShiData");
        cc.director.GlobalEvent.off("ShangChengData");
    },
    start: function start() {},
    onUpdateZhongZiData: function onUpdateZhongZiData() {
        var _this2 = this;

        var children = this.content.children;
        children.forEach(function (value) {
            value.destroy();
        });
        var backPack = GameData.ZhongZiData;
        var table = "zhongzi";
        backPack.forEach(function (value) {
            var node = cc.instantiate(_this2.item);
            node.parent = _this2.content;
            var id = value.id + '';
            cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "picture", id), function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }
                var spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count;
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id) + '种子';
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获' + dataFunc.queryValue(table, "reward", id) + '个' + dataFunc.queryValue(table, "name", id);
            node.getChildByName('Price').active = true;
            node.getChildByName('Price').getComponent(cc.Label).string = '价格' + dataFunc.queryValue(table, "price", id);
        });
        this.node.getChildByName('Sale').active = false;
    },
    onUpdateGuoShiData: function onUpdateGuoShiData() {
        var _this3 = this;

        var children = this.content.children;
        children.forEach(function (value) {
            value.destroy();
        });
        var backPack = GameData.GuoShiData;
        var table = "zhongzi";
        backPack.forEach(function (value) {
            var node = cc.instantiate(_this3.item);
            node.parent = _this3.content;
            var id = value.id + '';
            cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "picture", id), function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }
                var spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count;
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id);
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获' + dataFunc.queryValue(table, "reward", id) + '个' + dataFunc.queryValue(table, "name", id);
        });
        this.node.getChildByName('Sale').active = true;
        cc.director.GlobalEvent.emit("TotalReward", {});
    },
    onUpdateShangChengData: function onUpdateShangChengData() {
        var _this4 = this;

        var children = this.content.children;
        children.forEach(function (value) {
            value.destroy();
        });
        var backPack = GameData.ShangChengData;
        var table = "zhongzi";
        backPack.forEach(function (value) {
            var node = cc.instantiate(_this4.item);
            node.parent = _this4.content;
            var id = value.id + '';
            cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "picture", id), function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }
                var spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                node.getChildByName('Buy').off(cc.Node.EventType.TOUCH_END);
                node.getChildByName('Buy').on(cc.Node.EventType.TOUCH_END, function () {
                    _this4.SubPanel[0].active = true;
                    _this4.currentCount = 1;
                    cc.director.GlobalEvent.on("ShangChengCount", function () {
                        _this4.SubPanel[0].getChildByName('Count').getComponent(cc.EditBox).string = _this4.currentCount;
                    }, _this4);
                    _this4.maxCount = 999;
                    cc.director.GlobalEvent.emit("ShangChengCount", {});
                    _this4.SubPanel[0].getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    _this4.SubPanel[0].getChildByName('Title').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id);
                    _this4.SubPanel[0].getChildByName('Price').getComponent(cc.Label).string = '每个果实价值：' + dataFunc.queryValue(table, "reward", id);
                    _this4.SubPanel[0].getChildByName('Reward').getComponent(cc.Label).string = '每个果实价值：' + dataFunc.queryValue(table, "reward", id);
                    _this4.SubPanel[0].getChildByName('Time').getComponent(cc.Label).string = '成熟时间：' + dataFunc.getMyDate(dataFunc.queryValue(table, "time", id));
                    _this4.SubPanel[0].getChildByName('Period').getComponent(cc.Label).string = dataFunc.queryValue(table, "quarter", id) + '季,' + dataFunc.queryValue(table, "output", id) + '/季';
                    _this4.SubPanel[0].getChildByName('MaiRu').off(cc.Node.EventType.TOUCH_END);
                    _this4.SubPanel[0].getChildByName('MaiRu').on(cc.Node.EventType.TOUCH_END, function () {
                        Global.ProtocolMgr.buyZhongZi(id, _this4.currentCount);
                    });
                });
            });
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count;
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id) + '种子';
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获' + dataFunc.queryValue(table, "reward", id) + '个' + dataFunc.queryValue(table, "name", id);
            node.getChildByName('Buy').active = true;
            node.getChildByName('Buy').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = dataFunc.queryValue(table, "price", id);
        });
        this.node.getChildByName('Sale').active = false;
    },
    addCount: function addCount() {
        if (this.currentCount < this.maxCount) {
            this.currentCount++;
            cc.director.GlobalEvent.emit("ShangChengCount", {});
            cc.director.GlobalEvent.emit("GuoShiCount", {});
        } else {
            Global.PageMgr.showTipPage('已达到最大值');
        }
    },
    minusCount: function minusCount() {
        if (this.currentCount > 1) {
            this.currentCount--;
            cc.director.GlobalEvent.emit("ShangChengCount", {});
            cc.director.GlobalEvent.emit("GuoShiCount", {});
        } else {
            Global.PageMgr.showTipPage('已达到最小值');
        }
    },
    changeCount: function changeCount(event) {
        this.currentCount = event;
        if (this.currentCount >= this.maxCount) {
            this.currentCount = this.maxCount;
        }
        if (this.currentCount <= 1) {
            this.currentCount = 1;
        }
        cc.director.GlobalEvent.emit("ShangChengCount", {});
        cc.director.GlobalEvent.emit("GuoShiCount", {});
    },
    onEnable: function onEnable() {
        Global.ProtocolMgr.queryZhongZi();
    },
    onDisable: function onDisable() {
        this.ToggleContainer[0].getComponent(cc.Toggle).isChecked = true;
        this.ToggleContainer[0].getChildByName('Text').color = new cc.color(255, 255, 255);
    },
    closePage: function closePage() {
        Global.PageMgr.onClosePage(1);
    },
    openSubPanel: function openSubPanel(event, customEventData) {
        this.SubPanel[customEventData].active = true;
    },
    closeSubPanel: function closeSubPanel(event, customEventData) {
        this.SubPanel[customEventData].active = false;
        cc.director.GlobalEvent.off("ShangChengCount");
    },
    toggleChange: function toggleChange(tab) {
        this.ToggleContainer.forEach(function (e) {
            e.getComponent(cc.Toggle).isChecked = false;
            e.getChildByName('Text').color = new cc.color(255, 255, 255);
            if (e.name == tab) {
                e.getComponent(cc.Toggle).isChecked = true;
                e.getChildByName('Text').color = new cc.color(138, 55, 249);
            }
        });
        switch (tab) {
            case 'ZhongZi':
                Global.ProtocolMgr.queryZhongZi();
                break;
            case 'GuoShi':
                Global.ProtocolMgr.queryGuoShi();
                console.log('打开果实');
                break;
            case 'ShangCheng':
                Global.ProtocolMgr.queryShangCheng();
                console.log('打开商店');
                break;
        }
    },
    update: function update(dt) {}
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
        //# sourceMappingURL=NongChangPanel.js.map
        