"use strict";
cc._RF.push(module, '74685AmmcFA0atH+H6dI71r', 'Fan');
// Script/Ui/Kuangchi/Fan.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 旋转数度
        rotateSpeed: 10
    },

    //开始旋转
    startRotate: function startRotate() {
        // 跳跃上升
        var actionBy = cc.rotateBy(1, 360);
        // 不断重复
        return cc.repeatForever(actionBy);
    },

    onLoad: function onLoad() {
        this.jumpAction = this.startRotate();
        this.node.runAction(this.jumpAction);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();