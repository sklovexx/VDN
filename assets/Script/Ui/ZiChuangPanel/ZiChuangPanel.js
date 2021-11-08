

cc.Class({
    extends: cc.Component,

    properties: {
        label_email:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    closeUi(){
        this.node.active = false;
        // Global.PageMgr.onClosePage(1);
    },
    copy(){
        let res = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyEmail", "(Ljava/lang/String;)Z", this.label_email.string);
        if (res){
            Global.PageMgr.showTipPage("复制成功");
        }
    }
    // update (dt) {},
});
