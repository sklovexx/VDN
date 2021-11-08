import myglobal from "../../mygolbal.js"
cc.Class({
    extends: cc.Component,

    properties: {
        label:[cc.Label]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        myglobal.socket.requestConfig((err,result)=>{
            if (err!=0){
                console.log("create_room err:"+err)
                let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
                TipsLabel.string = result
                setTimeout(()=>{
                    TipsLabel.string = ''
                },2000)
            }else{
                console.log("create_room" + JSON.stringify(result))
                this.label[0].string = result['1'].bottom
                this.label[1].string = result['2'].bottom
                this.label[2].string = result['3'].bottom
                this.label[3].string = result['4'].bottom
            }
        })
    },

    _createroom(rate){
        if(rate<0 || rate>4){
            console.log("create room rate error"+ rate)
            return
        }

        var global = 0
        if (rate==1){
            global = 10
        }else if(rate==2){
            global = 20
        }else if(rate==3){
            global = 30
        }else if(rate==4){
            global = 40
        }

        var room_para = {
            global:global,
            rate:rate
        }
        //播放一个等待动画
        myglobal.socket.request_creatroom(room_para,(err,result)=>{
            if (err!=0){
                console.log("create_room err:"+err)
                let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
                TipsLabel.string = result
                setTimeout(()=>{
                    TipsLabel.string = ''
                },2000)
            }else{
                console.log("create_room" + JSON.stringify(result))
                //网络数据包
                myglobal.playerData.bottom = result.bottom
                myglobal.playerData.rate = result.rate
                cc.director.loadScene("gameScene")
            }
        })
    },

    // update (dt) {},
    onButtonClick(event,customData){
        switch(customData){
            case "create_room_1":
                  this._createroom(1)
                  break
            case "create_room_2":
                  this._createroom(2)
                  break
            case "create_room_3":
                  this._createroom(3)
                  break
            case "create_room_4":
                  this._createroom(4)
                  break
            case "create_room_close":
                  this.node.destroy() 
                break       
            default:
                break
        }
        this.node.destroy() 

    }

});
