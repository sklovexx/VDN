

cc.Class({
    extends: cc.Component,

    properties: {
        icon_email:cc.Sprite,
        label_title:cc.Label,
        label_time:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    setData(data,index){
        let icon_email = ""
        if(data.state==0){
            icon_email = "信封未读";
        }else if(data.state==1){
            icon_email = "信封已读";
        }
        try {
            cc.loader.loadRes("imgs/" + icon_email, cc.SpriteFrame, (err, sf)=>{
                if (!err){
                    this.icon_email.spriteFrame = sf;
                }
            });
        }catch (e) {
            console.warn(e)
        }
        this.label_title.string = data.title;
        if(index == 1)
        {
            this.label_time.string = data.time;
        }else
        {
            this.label_time.string = "";//data.createTime;
        }

    }
    // update (dt) {},
});
