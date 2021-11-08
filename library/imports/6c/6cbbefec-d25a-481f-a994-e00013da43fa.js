"use strict";
cc._RF.push(module, '6cbbe/s0lpIH6mU4AAT2kP6', 'AutoScaleFixedWidth');
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