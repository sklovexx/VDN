
cc.Class({
    extends: cc.Component,

    properties: {
        label_name:cc.Label,
        label_time:cc.Label,
        label_pic:cc.Label,
    },

    start () {
    },
    setData(data){
        try {
            // cc.loader.loadRes("imgs/bg" + data.id, cc.SpriteFrame, (err, sf)=>{
            //     if (!err){
            //         this.icon_pic.spriteFrame = sf;
            //     }
            // });
        }catch (e) {
            console.warn(e)
        }
        this.label_name.string = data.title;
        this.label_time.string = data.tradeTime;
        var sum = parseFloat(data.tradeValue).toFixed(4);
        if(data.tradeType == 0)//加
        {
            this.label_pic.string = cc.js.formatStr("+%s",sum);
        }else
        {
            this.label_pic.string = cc.js.formatStr("-%s",sum);
        }
    },

    // update (dt) {},
});
