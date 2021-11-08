
cc.Class({
    extends: cc.Component,

    properties: {
        icon_pic:cc.Sprite,
        label_name:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    setData(data,callback){
        try {
            cc.loader.load({url:data.game_logo,type:'png'},(err,res)=>{
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
      
        this.label_name.string = data.game_name;
        this.bundleId = data.bundleId;
        this.callback = callback;
        this.datas = data;
    },
    jumpTo(){
        this.callback(this.bundleId,this.datas);
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.bundleId);
    }
    // update (dt) {},
});
