
cc.Class({
    extends: cc.Component,

    properties: {
        icon_1:cc.Node,
        icon_2:cc.Node,
        icon_3:cc.Node,
        icon_head:cc.Sprite,
        label_name:cc.Label,
        label_level:cc.Label,
        label_canchu:cc.Label,
        label_life:cc.Label,
        label_linli:cc.Label,
        label_zhanli:cc.Label,
        label_num:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    setData(data){
        try {
            cc.loader.load({url:data.icon,type:'png'},(err,res)=>{
                this.icon_head.spriteFrame = new cc.SpriteFrame(res)
            })
        }catch (e) {
            console.warn(e)
        }
        this.label_name.string = data.name;
        this.label_level.string = data.level;
        this.label_canchu.string = data.canchu;
        this.label_life.string = data.life;
        this.label_linli.string = data.linli;
        this.label_zhanli.string = data.zhanli;
        this.icon_1.active = false;
        this.icon_2.active = false;
        this.icon_3.active = false;
        this.label_num.node.active = false;
        switch (data.num) {
            case 1:
                this.icon_1.active = true;
                break;
            case 2:
                this.icon_2.active = true;
                break;
            case 3:
                this.icon_3.active = true;
                break;
            default:
                this.label_num.node.active = true;
                this.label_num.string = data.num;
                break;
        }
    }
    // update (dt) {},
});
