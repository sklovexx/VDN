(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/AutoScaleFixedWidth.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6cbbe/s0lpIH6mU4AAT2kP6', 'AutoScaleFixedWidth', __filename);
// NiuNiu/script/common/AutoScaleFixedWidth.js

/**
 * Created by skyxu on 2018/4/16.
 */

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        // 按照宽度进行缩放
        var designSize = cc.Canvas.instance.designResolution;
        var winSize = cc.director.getWinSize();
        var factor = winSize.width / designSize.width;
        factor = Math.min(1, factor);
        this.node.scaleX *= factor;
        this.node.scaleY *= factor;
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
        //# sourceMappingURL=AutoScaleFixedWidth.js.map
        