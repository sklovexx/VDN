import myglobal from "./../mygolbal.js"

cc.Class({
    extends: cc.Component, 

    properties: {
        nickname_label:cc.Label,
        headimage:cc.Sprite,
        gobal_count:cc.Label,
        creatroom_prefabs:cc.Prefab,
        joinroom_prefabs:cc.Prefab,
        TipsLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this.nickname_label.string = myglobal.playerData.nickName
       this.gobal_count.string = myglobal.playerData.gobal_count
       cc.loader.load({url: myglobal.playerData.avatarUrl, type: 'jpg'},function(err,tex) {
        if (err) {
            console.log(err.message || err);
            return;
        }          
         this.headimage.spriteFrame = new cc.SpriteFrame(tex);        
    }.bind(this));
     },

    start () {

    },
    quitGame(){
        cc.director.loadScene('Dssc',()=>{
            cc.audioEngine.pauseAll();
            console.log('切换场景')
        })
    },
    // update (dt) {},
    onButtonClick(event,customData){
        switch(customData){
            case "create_room":
                var creator_Room = cc.instantiate(this.creatroom_prefabs)
                creator_Room.parent = this.node.getChildByName('container') 
                creator_Room.zIndex = 100
                break
            case "join_room":
                var join_Room = cc.instantiate(this.joinroom_prefabs)
                join_Room.parent = this.node.getChildByName('container') 
                join_Room.zIndex = 100
                break
            case "quick":
                this.TipsLabel.string='敬请期待'
                setTimeout(function(){
                    this.TipsLabel.string=""
                }.bind(this), 2000);
            default:
                break
        }
    }
});
