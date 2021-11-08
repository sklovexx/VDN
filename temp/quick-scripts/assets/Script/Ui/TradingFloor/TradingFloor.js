(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/TradingFloor/TradingFloor.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e6fczSv6dAZY+R5OKvfH5B', 'TradingFloor', __filename);
// Script/Ui/TradingFloor/TradingFloor.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        SubPanel: {
            type: cc.Node,
            default: []
        },
        JiaoYiItem: {
            type: cc.Prefab,
            default: null
        },
        JiaoYiConTent: {
            type: cc.Node,
            default: null
        },
        SubPage: {
            type: cc.Node,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    UpdateJiaoYiData: function UpdateJiaoYiData() {
        var backPack = [];
        backPack.forEach(function (e) {
            var node = cc.instantiatethis(JiaoYiItem);
            node.getChildByName('Number').getComponent(cc.Label).string = 1;
            node.getChildByName('Price').getComponent(cc.Label).string = 1;
            node.getChildByName('Button').getChildByName('button').on(cc.Node.EventType.TOUCH_END, function () {});
        });
    },
    Toggle: function Toggle(event) {
        var children = event.node.parent.children;
        children.forEach(function (e) {
            e.getChildByName('Text').color = new cc.color(255, 255, 255);
        });
        event.node.getChildByName('Text').color = new cc.color(138, 55, 249);
        this.SubPanel.forEach(function (e) {
            e.active = false;
        });
        this.SubPanel[parseInt(event.node.name)].active = true;
    },
    closePage: function closePage() {
        Global.PageMgr.onClosePage(8, 1);
    },
    showSubPage: function showSubPage() {
        var action = cc.moveTo(0.2, cc.v2(0, 0));
        this.SubPage[0].active = true;
        this.SubPage[0].runAction(action);
    },
    closeSubPage: function closeSubPage() {
        var finish = function finish() {
            this.SubPage[0].active = false;
        };
        var action = cc.moveTo(0.2, cc.v2(1060, 0), cc.callFunc(finish, this));
        this.SubPage[0].runAction(action);
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
        //# sourceMappingURL=TradingFloor.js.map
        