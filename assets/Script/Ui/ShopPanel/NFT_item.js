
cc.Class({
    extends: cc.Component,

    properties: {
        icon_pic:cc.Sprite,
        label_name:cc.Label,
        label_prop1:cc.Label,
        label_prop2:cc.Label,
        label_prop3:cc.Label,
        label_fee:cc.Label,
        propId:1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start () {

    },
    setData(data,types){
        try {
            cc.loader.load({url:data.icon,type:'png'},(err,res)=>{
                this.icon_pic.spriteFrame = new cc.SpriteFrame(res)
            })
            // cc.loader.loadRes("imgs/" + data.icon, cc.SpriteFrame, (err, sf)=>{
            //     if (!err){
            //         this.icon_pic.spriteFrame = sf;
            //     }
            // });
        }catch (e) {
            console.warn(e)
        }
        this.label_name.string = data.name;
        if(types == null)
        {
            this.propId = data.id;
            this.label_prop1.string = cc.js.formatStr("战力:%s",data.fightingPower);
            this.label_prop2.string = cc.js.formatStr("体力:%s",data.physicalPower);
            this.label_prop3.string = cc.js.formatStr("灵力:%s",data.wakanPower);;
            this.label_fee.string = cc.js.formatStr("%s",parseFloat(data.price).toFixed(4));
        }
        else
        {
            this.propId = data.id;
            this.label_prop1.string = cc.js.formatStr("战力:%s",parseFloat(data.combat_value).toFixed(4));
            this.label_prop2.string = cc.js.formatStr("体力:%s",parseFloat(data.spirit_value).toFixed(4));
            this.label_prop3.string = cc.js.formatStr("灵力:%s",parseFloat(data.intellect_value).toFixed(4));
        }
    },
    buy(){
        // Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
        // Global.PageMgr.pages[15].getComponent("BuyPanel").type = 1;
        // Global.PageMgr.onOpenPage(15);
        let reqData = {
            id:this.propId,
        }
        Global.ProtocolMgr.queryBuyPetAnimal(reqData,(res)=>{
            if(res.code==200){
                Global.PageMgr.showTipPage("购买成功");
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    // update (dt) {},
});
