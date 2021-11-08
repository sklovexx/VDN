import myglobal from "../mygolbal.js"

cc.Class({
    extends: cc.Component,

    properties: {
        userList:[cc.Node],
        audio:{
            default:null,
            type:cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(myglobal.playerData.accountID==myglobal.playerData.housemanageid){
            this.node.getChildByName('准备').active = false
        }
        cc.audioEngine.play(this.audio)
    },
    initData(data){
        console.warn(data)
        data.forEach((v,i) => {
            myglobal.allPlayerData.forEach(e=>{
                if(e.accountid==v.account){
                    if(e.accountid==myglobal.playerData.accountID){
                        this.userList[i].getChildByName('me').active=true
                    }
                    this.userList[i].getChildByName('nickName').getComponent(cc.Label).string = e.nick_name;
                    this.userList[i].getChildByName('beishu').getComponent(cc.Label).string = myglobal.playerData.rate;
                    this.userList[i].getChildByName('score').getComponent(cc.Label).string = v.amount;
                    this.userList[i].getChildByName('DSSC').getComponent(cc.Label).string = v.change;
                    if(e.accountid==myglobal.playerData.master_accountid){
                        this.userList[i].getChildByName('地主标志').active = true;
                        this.userList[i].getChildByName('beishu').getComponent(cc.Label).string = myglobal.playerData.rate*2;
                    }
                    cc.loader.load({url: e.avatarUrl, type: 'jpg'},function(err,tex) {
                    if (err) {
                        console.log(err.message || err);
                        return;
                    }          
                    this.userList[i].getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);        
                    }.bind(this));
                }
            })
        });
    },
    start () {
        
    },
    close(){
        this.node.destroy()
    },
    quitRoom(){
        myglobal.socket.request_quit_room({},function(err,data){
            if(err!=0){
                console.log("requestStart err"+err)
            }else{
                console.log("requestStart data"+ JSON.stringify(data))
                this.node.destroy()
                cc.director.loadScene("hallScene")
            }
        }.bind(this))
    },
    ready(){
        myglobal.socket.requestReady()
        var gamebeforeUI = this.node.parent.getChildByName("gamebeforeUI")
        gamebeforeUI.emit('ready')
        this.node.destroy()
    }
    // update (dt) {},
});
