
cc.Class({
    extends: cc.Component,

    properties: {
        icon_paiming:cc.Sprite,
        label_pingming:cc.Label,
        label_quyuname:cc.Label,
        label_sum:cc.Label,
        icon_paiming2:cc.Node,
        propId:1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start () {
    },
    setData(data){
        this.icon_paiming2.active = false;
        this.label_pingming.string = cc.js.formatStr("NO.%s",data.ranking);
        this.label_quyuname.string = data.division_name;
        this.label_sum.string = data.number;
        try {
            if(parseInt(data.ranking) <= 3)
            {
                this.icon_paiming2.active = true;
                this.label_pingming.string ="";
                // cc.loader.load({url:data.game_logo,type:'png'},(err,res)=>{
                //     this.icon_paiming.spriteFrame = new cc.SpriteFrame(res);
                // });
                cc.loader.loadRes("imgs/R"+data.ranking, cc.SpriteFrame, (err, sf)=>{
                    if (!err){
                        this.icon_paiming.spriteFrame = sf;
                    }
                });
            }
            
        }catch (e) {
            console.warn(e)
        }
        // this.propId = data.id;
    },

    // update (dt) {},
});
