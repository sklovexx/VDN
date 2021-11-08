
cc.Class({
    extends: cc.Component,

    properties: {
        btn_item:[cc.Node],
        editBox_ZS:cc.EditBox,
        label_RMB:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    toggle(event){
        this.btn_item.forEach(e=>{
            e.getChildByName("label").color =  new cc.Color(248, 145, 1);
        })
        event.target.getChildByName("label").color = new cc.Color(255, 255, 255);
    },
    onEdit(event){
        console.log(event.string)
        if(parseFloat(event.string)<0.1){
            Global.PageMgr.showTipPage("最少要充值0.1个水晶星钻");
            this.editBox_ZS.string = "";
            this.label_RMB.string = "";
        }
        if(this.editBox_ZS.string==""){
            this.label_RMB.string = "";
            return;
        }
        this.label_RMB.string = cc.js.formatStr("需支付:%sRMB",parseFloat(event.string)*99);
    },
    onDisable(){
        this.editBox_ZS.string = "";
        this.label_RMB.string = "";
    }
    // update (dt) {},
});
