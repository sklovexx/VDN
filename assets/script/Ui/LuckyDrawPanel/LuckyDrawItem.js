
cc.Class({
    extends: cc.Component,

    properties: {
        icon_touxiang:cc.Sprite,
        label_name:cc.Label,
        label_lv:cc.Label,
        label_lVname:cc.Label,
        label_time:cc.Label,
        propId:1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start () {
    },
    setData(data){
        try {
            cc.loader.load({url:data.good_img,type:'png'},(err,res)=>{
                this.icon_touxiang.spriteFrame = new cc.SpriteFrame(res);
            });
        }catch (e) {
            console.warn(e)
        }

        this.label_name.string = data.username;
        this.label_lVname.string = data.good_name;
        this.label_lv.string = cc.js.formatStr("%s等奖",data.level);
        this.label_time.string = data.create_time;
    },

    // update (dt) {},
});
