
cc.Class({
    extends: cc.Component,

    properties: {
        label_lifeValue:cc.Label,
        label_coinValue:cc.Label,
        label_diamondValue:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("UpdateUserData",this.UpdateUserData,this);
    },

    start () {
    },
    UpdateUserData(data){
        // this.label_lifeValue = data.life;
        this.label_coinValue.string = data.totalUsdt;
        this.label_diamondValue.string = data.totalCoinOne;
        console.log("-------------UpdateUserData2-------------------");
    },
    onDestroy(){
        cc.director.GlobalEvent.off("UpdateUserData");
    }
    // update (dt) {},
});
