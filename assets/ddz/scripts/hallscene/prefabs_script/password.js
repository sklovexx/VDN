import myglobal from "../../mygolbal.js"

cc.Class({
    extends: cc.Component,
    
    properties: {
      joinids:{
          type: cc.Label,
          default:[],
      },
      joinid:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.joinid = "";
        this.cur_input_count = -1
    },

    start () {

    },

    //  update (dt) {
        
    //  },
    filter(){
        cc.log('点击过滤')
    },
    onButtonClick(event,customData){
        if(customData.length===1){
            this.joinid += customData
            this.cur_input_count += 1
            this.joinids[this.cur_input_count].string = customData
            //console.log("joinid.length:"+this.joinid.length)
            if(this.joinid.length>=6){
                //判断加入房间逻辑
                var room_para = {
                    roomid:this.joinid,
                }
                myglobal.socket.request_jion(room_para,function(err,result){
                    if (err){
                        console.log("err"+ err)
                        let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
                        TipsLabel.string = result
                        setTimeout(()=>{
                            TipsLabel.string = ''
                        },2000)
                    }else{
                        console.log("join room sucess"+JSON.stringify(result))
                        myglobal.playerData.bottom = result.bottom
                        myglobal.playerData.rate = result.rate
                        cc.director.loadScene("gameScene")
                    }
                })
                return
            }

            console.log("customData:"+ customData)
            
        }
        switch(customData){
            case "back":
                if(this.cur_input_count<0){
                    return
                }
                this.joinids[this.cur_input_count].string = ""
                this.cur_input_count -=1
                this.joinid = this.joinid.substring(0,this.joinid.length-1)
                break
            case "confirm":
                //判断加入房间逻辑
                var room_para = {
                    roomid:this.joinid,
                }
                myglobal.socket.request_jion(room_para,function(err,result){
                    if (err){
                        console.log("err"+ err)
                        let TipsLabel = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label)
                        TipsLabel.string = result
                        setTimeout(()=>{
                            TipsLabel.string = ''
                        },2000)
                    }else{
                        console.log("join room sucess"+JSON.stringify(result))
                        myglobal.playerData.bottom = result.bottom
                        myglobal.playerData.rate = result.rate
                        cc.director.loadScene("gameScene")
                    }
                })
                break                            
            case "close":
               this.node.destroy()
               break
            default:
                break
        }
    }
});
