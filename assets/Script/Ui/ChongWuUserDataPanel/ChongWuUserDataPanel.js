
cc.Class({
    extends: cc.Component,

    properties: {
        label_zhanliValue:cc.Label,
        label_lifeValue:cc.Label,
        label_coinValue:cc.Label,
        label_diamondValue:cc.Label,
        label_id:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable () {
        // Global.ProtocolMgr.queryUserData();
        cc.director.GlobalEvent.on("ChongWuUserDataPanel",this.UpdateUserData,this);
    },

    start () {
        if(this.label_id !=null)
        {
            this.label_id.string = window.DEFAULT_userID;
        }
    },
   
    UpdateUserData(data){
        this.label_zhanliValue.string = data.zhanli;
        this.label_lifeValue = data.life;
        this.label_coinValue.string = data.totalUsdt;
        this.label_diamondValue.string = data.totalCoinOne;
        this.label_id.string = 0;

    },
    onDestroy(){
        cc.director.GlobalEvent.off("ChongWuUserDataPanel");
    }
    // update (dt) {},
});
