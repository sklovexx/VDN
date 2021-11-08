
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    goHongBao(){
        Global.gameName = 'HongBao';
        // cc.view.enableAutoFullScreen(true);
        Global.ResourceMgr.playTransitionIn()
        cc.director.loadScene('HongBao',()=>{
        })
    },
    goSlot(){
        // Global.gameName = 'Slot';
        // cc.view.enableAutoFullScreen(true);
        // Global.ResourceMgr.playTransitionIn()
        // cc.director.loadScene('Slot',()=>{
        // })
        Global.PageMgr.showTipPage('该功能正在开发中')
    },
    closePage(){
        Global.PageMgr.onClosePage(6)
    },
    // update (dt) {},
});
