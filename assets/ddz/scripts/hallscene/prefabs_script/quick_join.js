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
                console.log("requestConfig err:"+err)
                let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
                TipsLabel.string = result
                setTimeout(()=>{
                    TipsLabel.string = ''
                },2000)
            }else{
                console.log("requestConfig" + JSON.stringify(result))
                this.label[0].string = result['1'].bottom
                this.label[1].string = result['2'].bottom
                this.label[2].string = result['3'].bottom
                this.label[3].string = result['4'].bottom
            }
        })
        myglobal.socket.onMatchresult((data)=>{
            console.log("onMatchresult" + JSON.stringify(data))
            let hallScene = cc.find("ROOT_UI");
            hallScene.emit('hideLoading')
            //网络数据包
            myglobal.playerData.bottom = data.bottom
            myglobal.playerData.rate = data.rate
            let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
            TipsLabel.string = '正在加入房间。。。'
            cc.director.loadScene("gameScene",()=>{
                TipsLabel.string = ''
            }) 
        })
    },

    _quick_join(rate){
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
            roomLevel:rate
        }
        myglobal.socket.request_quickjoin(room_para,(err,result)=>{
            let hallScene = cc.find("ROOT_UI");
            if (err!=0){
                console.log("quickjoin err:"+err)
                hallScene.emit('hideLoading') 
                let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
                TipsLabel.string = result
                setTimeout(()=>{
                    TipsLabel.string = ''
                },2000)
                this.node.destroy() 
            }else{
                console.log("quickjoin" + JSON.stringify(result))
                hallScene.emit('showLoading')
                this.node.destroy()  
            }
        })
    },

    // update (dt) {},
    onButtonClick(event,customData){
        switch(customData){
            case "_quick_join_1":
                  this._quick_join(1)
                  break
            case "_quick_join_2":
                  this._quick_join(2)
                  break
            case "_quick_join_3":
                  this._quick_join(3)
                  break
            case "_quick_join_4":
                  this._quick_join(4)
                  break
            case "_quick_join_close":
                  this.node.destroy() 
                break       
            default:
                break
        }

    },
});
