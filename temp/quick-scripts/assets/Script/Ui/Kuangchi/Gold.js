(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/Kuangchi/Gold.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eb46fpprk9MrZ4zApodT23D', 'Gold', __filename);
// Script/Ui/Kuangchi/Gold.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        setInterval(function () {
            var action = cc.rotate3DBy(0.1, 0, -90, 0);
            action.setTag(100);
            _this.node.stopActionByTag(100);
            _this.node.runAction(action);
        }, 100);
    },
    launch: function launch(dir) {
        var actions = cc.sequence(cc.jumpBy(0.5, cc.v2(dir * dataFunc.randomNum(1, 120), 150), 300, 1), cc.jumpBy(0.5, cc.v2(dir * dataFunc.randomNum(10, 120), dataFunc.randomNum(0, 80)), 50, dataFunc.randomNum(1, 4)), cc.fadeOut(1).easing(cc.easeCubicActionOut()), cc.callFunc(this.finish, this));
        this.node.runAction(actions);
    },
    finish: function finish() {
        console.log(1);
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
        //# sourceMappingURL=Gold.js.map
        