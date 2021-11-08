(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/TradingFloor/MairChu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba3cceuuwRDAY1yBe7O4+qW', 'MairChu', __filename);
// Script/Ui/TradingFloor/MairChu.js

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
        List: {
            type: cc.Node,
            default: []
        },
        Item0: {
            type: cc.Prefab,
            default: null
        },
        Item1: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    Toggle: function Toggle(event) {
        this.List.forEach(function (e) {
            e.active = false;
        });
        this.List[parseInt(event.node.name)].active = true;
    },
    UpdateList0: function UpdateList0() {
        var _this = this;

        var backPack = [];
        backPack.forEach(function (e) {
            var node = cc.instantiate(_this.Item0);
            node.parent = _this.List[0];
        });
    },
    UpdateList1: function UpdateList1() {
        var _this2 = this;

        var backPack = [];
        backPack.forEach(function (e) {
            var node = cc.instantiate(_this2.Item1);
            node.parent = _this2.List[1];
        });
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
        //# sourceMappingURL=MairChu.js.map
        