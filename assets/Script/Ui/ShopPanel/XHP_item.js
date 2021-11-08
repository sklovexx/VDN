
cc.Class({
    extends: cc.Component,

    properties: {
        icon_pic:cc.Sprite,
        label_name:cc.Label,
        label_prop:cc.Label,
        label_fee:cc.Label,
        btn_use:cc.Sprite,
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
        if(types == null){
            this.propId = data.id;
            this.label_prop.string = cc.js.formatStr("+%s",data.elevatedValue);
            this.label_fee.string = cc.js.formatStr("%s",parseFloat(data.price).toFixed(4));
        }
        else
        {
            this.propId = data.mc_id;
            this.label_prop.string = cc.js.formatStr("%s",data.quantity);
        }

    },
    buy(){
        Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
        Global.PageMgr.pages[15].getComponent("BuyPanel").type = 0;
        Global.PageMgr.onOpenPage(15);
    },
    usePprops(){
        
        Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
        Global.PageMgr.pages[15].getComponent("BuyPanel").type = 1;
        Global.PageMgr.onOpenPage(15);
    }
    // update (dt) {},
});
