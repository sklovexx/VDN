import myglobal from "../mygolbal.js"
cc.Class({
    extends: cc.Component,

    properties: {
       wait_node:cc.Node,
       tipsLabel:cc.Label, //tips
       loginBg:{
        default:null,
        type:cc.AudioClip
    }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //console.log("qian_state.qian:"+ qian_state.qian)
        if(true){
            cc.audioEngine.play(this.loginBg,true) 
        }
        cc.director.GlobalEvent.on('connected',()=>{
            myglobal.socket.login({
                token:this.GetQueryVariable('token')
            },function(err,result){
                //请求返回
                //先隐藏等待UI
                //this.wait_node.active = false
                if(err!=0){
                   console.log("err:"+err)
                   this.tipsLabel.string=result
                   setTimeout(function(){
                       this.tipsLabel.string=""
                   }.bind(this), 2000);
                   return     
                }
 
                console.log("login sucess" + JSON.stringify(result))
                console.log(result)
                myglobal.playerData.gobal_count = result.goldCount
                myglobal.playerData.accountID = result.accountID
                myglobal.playerData.avatarUrl = result.avatarUrl
                myglobal.playerData.nickName = result.nickName
                cc.director.loadScene("hallScene")
            }.bind(this))
            // myglobal.socket.request_wxLogin({
            //     uniqueID:myglobal.playerData.uniqueID,
            //     accountID:myglobal.playerData.accountID,
            //     nickName:myglobal.playerData.nickName,
            //     avatarUrl:myglobal.playerData.avatarUrl,
            // },function(err,result){
            //     //请求返回
            //     //先隐藏等待UI
            //     //this.wait_node.active = false
            //     if(err!=0){
            //        console.log("err:"+err)
            //        return     
            //     }

            //     console.log("login sucess" + JSON.stringify(result))
            //     myglobal.playerData.gobal_count = result.goldcount
            //     cc.director.loadScene("hallScene")
            // }.bind(this))
        },this)
        myglobal.socket.initSocket()
    },
    
    start () {
        
    },
    
    onButtonCilck(event,customData){
        switch(customData){
            case "wx_login":
                console.log("wx_login request")
                
                //this.wait_node.active = true
                
                // myglobal.socket.login({
                //     token:this.GetQueryVariable('token')
                // },function(err,result){
                //     //请求返回
                //     //先隐藏等待UI
                //     //this.wait_node.active = false
                //     if(err!=0){
                //        console.log("err:"+err)
                //        this.tipsLabel.string=result.data
                //        setTimeout(function(){
                //            this.tipsLabel.string=""
                //        }.bind(this), 2000);
                //        return     
                //     }

                //     console.log("login sucess" + JSON.stringify(result))
                //     myglobal.playerData.gobal_count = result.goldcount
                //     cc.director.loadScene("hallScene")
                // }.bind(this))
                break
            default:
                break
        }
    },
    GetQueryVariable:function(variable)
    {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    },
    // update (dt) {},


});
