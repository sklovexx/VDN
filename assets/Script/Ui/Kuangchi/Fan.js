cc.Class({
    extends: cc.Component,

    properties: {
        // 旋转数度
        rotateSpeed: 10,
    },

    //开始旋转
    startRotate: function(){
        // 跳跃上升
        let actionBy = cc.rotateBy(1, 360);
        // 不断重复
        return cc.repeatForever(actionBy);
    },

    onLoad () {
        this.jumpAction = this.startRotate();
        this.node.runAction(this.jumpAction);
    },

    start () {

    },

    update (dt) {},
});
