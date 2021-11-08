

cc.Class({
    extends: cc.Component,
    
    properties: {
      joinids:{
          type: cc.Label,
          default:[],
      }
    
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

    onButtonClick(event,customData){
        if(customData.length===1){
            if(this.joinid.length>=5){
                //判断加入房间逻辑
                
                return
            }
            this.joinid += customData
            this.cur_input_count += 1
            this.joinids[this.cur_input_count].string = customData
            //console.log("joinid.length:"+this.joinid.length)
            

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
            case "clear":
                for(var i=0;i<5;++i){
                    this.joinids[i].string = ""
                    
                }
                this.joinid = ""
                this.cur_input_count = -1
                break                            
            case "close":
               this.node.destroy()
               break
            case "join":
                GlobalNiuNiu.netProxy.enterRoom(parseInt(this.joinid), (resp)=>{
                    GlobalNiuNiu.gameMgr.onEnterRoom(resp);
                });
               break   
            default:
                break
        }
    },
    close(){
        this.node.active = false
    }
});
