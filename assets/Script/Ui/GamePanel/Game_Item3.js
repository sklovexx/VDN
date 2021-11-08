
cc.Class({
    extends: cc.Component,

    properties: {
        icon_touxiang:cc.Sprite,
        label_name:cc.Label,
        label_changci:cc.Label,
        label_pic:cc.Label,
        label_time:cc.Label,
        icon_winOrloser:cc.Sprite,
        propId:1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start () {
    },
    setData(data){
        try {
            cc.loader.load({url:data.game_logo,type:'png'},(err,res)=>{
                this.icon_touxiang.spriteFrame = new cc.SpriteFrame(res);
            });
        }catch (e) {
            console.warn(e)
        }
        // this.propId = data.id;

        this.label_name.string = data.game_name;
        this.label_changci.string = cc.js.formatStr("场次:%s场",data.grade_field_name);
        this.label_time.string = data.create_time;
        var sum = parseFloat(data.value).toFixed(4);
        if(data.trade_type == 0)
        {
            this.label_pic.string = cc.js.formatStr("收益:+%s",sum);
            this.setSpriteFrame("imgs/胜利@2x");
        }else
        {
            this.label_pic.string = cc.js.formatStr("收益:-%s",sum);
            this.setSpriteFrame("imgs/失败@2x");
        }
    },
    setSpriteFrame(str)
    {
        cc.loader.loadRes(str, cc.SpriteFrame, (err, sf)=>{
            if (!err){
                this.icon_winOrloser.spriteFrame = sf;
            }
        });
    },

    buy(){
    }
    // update (dt) {},
});
