import myglobal from "../../mygolbal.js"

cc.Class({
    extends: cc.Component,

    properties: {
        account_label:cc.Label,
        nickname_label:cc.Label,
        room_touxiang:cc.Sprite,
        globalcount_label:cc.Label,
        headimage:cc.Sprite,
        readyimage:cc.Node,
        offlineimage:cc.Node,
        card_node:cc.Node,
        card_count:cc.Node,
        card_prefab:cc.Prefab,
        //tips_label:cc.Label,
        clockimage:cc.Node,
        qiangdidzhu_node:cc.Node, //抢地主的父节点
        time_label:cc.Label,
        robimage_sp:cc.SpriteFrame,
        robnoimage_sp:cc.SpriteFrame,
        robIconSp: cc.Sprite,
        robIcon_Sp:cc.Node,
        robnoIcon_Sp:cc.Node,
        bu_chu:cc.Node,
        masterIcon:cc.Node,
        baojin1:{
          default:null,
          type:cc.AudioClip
        },
        baojin2:{
            default:null,
            type:cc.AudioClip
        },
        baojin:{
          default:null,
          type:cc.AudioClip
      },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.readyimage.active = false
      this.offlineimage.active = false
      
      //监听开始游戏事件(客户端发给客户端)
      this.node.on("gamestart_event",function(event){
        this.readyimage.active = false
      }.bind(this))

      //给其他玩家发牌事件
      this.node.on("push_card_event",function(event){
        console.log("on push_card_event")
        //自己不再发牌
        if(this.accountid==myglobal.playerData.accountID){
            return
        }
        this.pushCard()
      }.bind(this))

      this.node.on("playernode_rob_state_event",function(event){
          //{"accountid":"2162866","state":1}
          var detail = event
      
          //如果是自己在抢，需要隐藏qiangdidzhu_node节点
          //this.accountid表示这个节点挂接的accountid
          if(detail.accountid==this.accountid){
            //console.log("detail.accountid"+detail.accountid)
            this.qiangdidzhu_node.active = false
              
          }

          if(this.accountid == detail.accountid){
            if(detail.state==qian_state.qian){
             
              console.log("this.robIcon_Sp.active = true")
              this.robIcon_Sp.active = true

            }else if(detail.state==qian_state.buqiang){
              this.robnoIcon_Sp.active = true
             
            }else{
              console.log("get rob value :"+detail.state)
            }
          }
         
      }.bind(this))

      this.node.on("playernode_changemaster_event",function(event){
         var detail = event 
         this.robIcon_Sp.active = false
         this.robnoIcon_Sp.active = false
         if(detail==this.accountid){
            this.masterIcon.active = true
          }
      }.bind(this))
      // this.node.on("playernode_add_three_card",function(event){
      //   var detail = event //地主的accountid
      //   if(detail==this.accountid){
      //     //给地主发三张排

      //   }
      // }.bind(this))
      //监听服务器：其他玩家出牌消息
      // myglobal.socket.onOtherPlayerChuCard(function(data){
      //   //{"accountid":"2357540","cards":[{"cardid":4,"card_data":{"index":4,"value":1,"shape":1}}]}
      //     if(this.accountid==data.accountid){
      //       console.log('该玩家出牌')
      //     }
      // }.bind(this))
      this.node.on("onOtherPlayerChuCard",(data)=>{
        if(this.accountid==data.accountid){
          this.bu_chu.active = false;
          if(data.accountid!=myglobal.playerData.accountID){
            this.destoryCard(data)
          }
        }
      },this)
      this.node.on("onBuChu",(data)=>{
        if(this.accountid==data.accountid){
          this.bu_chu.active = true;
        }
      })
      this.node.on("room_waitready",()=>{
        // if(this.accountid!=myglobal.playerData.accountID)
          try {
            this.destoryAllCard()
            this.masterIcon.active = false;
            this.robnoIcon_Sp.active = false;
            this.bu_chu.active = false;
            this.clearCard()
          } catch (error) {
            console.warn(error)
          }
      })
      this.node.on("onCanChuCard",(data)=>{
        if(data.accountid==this.accountid){
          this.bu_chu.active = false;
        }
      })
      this.node.on("interval",(data)=>{
        if(data.accountid==this.accountid&&this.accountid!=myglobal.playerData.accountID){
          this.qiangdidzhu_node.active = true;
          this.time_label.string = data.time;
        }
      })
      this.node.on("endInterval",(data)=>{
        if(data.accountid==this.accountid&&this.accountid!=myglobal.playerData.accountID){
          this.qiangdidzhu_node.active = false;
        }
      })
      this.node.on("onGameResult",(data)=>{
        data.forEach(e=>{
          if(e.account==this.accountid){
            this.globalcount_label.string = e.amount
          }
        })
      })
      this.node.on("onChangeHouseManage",()=>{
        console.log(this.accountid)
        if(this.accountid==myglobal.playerData.master_accountid){
          this.readyimage.active = false
        }
      })
      this.node.on("show_bottom_card_event",()=>{
        if(this.accountid==myglobal.playerData.master_accountid){
          for(var i=17;i<20;i++){
            var card = cc.instantiate(this.card_prefab)
            card.scale=0.6
            // console.log(" this.card_node.parent.parent"+ this.card_node.parent.parent.name)
            card.parent = this.card_node
            //card.parent = this.node
            // card.opacity = 100;
            var height = card.height
            card.y = (17 - 1) * 0.5 * height * 0.4 * 0.3 - height * 0.4 * 0.3 * i;
            card.x = 0
           
            //console.log("call pushCard x:"+card.x+" y:"+card.y)
            this.cardlist_node.push(card)
        }
        }
      })
      this.node.on("disconnect",(data)=>{
        if(data.accountid==this.accountid){
          this.offlineimage.active = true;
        }
      })
    },

    start () {
        
    },

    //这里初始化房间内位置节点信息(自己和其他玩家)
    //data玩家节点数据
    //index玩家在房间的位置索引
    init_data(data,index){
      console.log("init_data:"+JSON.stringify(data))  
      //data:{"accountid":"2117836","nick_name":"tiny543","avatarUrl":"http://xxx","goldcount":1000}
      this.accountid = data.accountid
      this.account_label.string = data.accountid
      this.nickname_label.string = data.nick_name
      this.globalcount_label.string = data.goldcount
      this.cardlist_node = []
      this.seat_index = index
      if(data.isready==true){
        this.readyimage.active = true
      }

      // 网络图片加载
    //     cc.loader.load({url: data.avatarUrl, type: 'jpg'},  (err, tex)=> {
    //     //cc.log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));
    //     let oldWidth = this.headImage.node.width;
    //     //console.log('old withd' + oldWidth);
    //     this.room_touxiang.spriteFrame = new cc.SpriteFrame(tex);
    //     let newWidth = this.headImage.node.width;
    //     //console.log('old withd' + newWidth);
    //     this.headImage.node.scale = oldWidth / newWidth;
    // });
    //这里根据传入的avarter来获取本地图像
    var str = data.avatarUrl
    cc.loader.load({url: data.avatarUrl, type: 'jpg'},function(err,tex) {
      if (err) {
          console.log(err.message || err);
          return;
      }          
       this.headimage.spriteFrame = new cc.SpriteFrame(tex);        
    }.bind(this));
    //注册一个player_ready消息
    this.node.on("player_ready_notify",function(event){
        console.log("player_ready_notify event",event)
            var detail = event
            console.log("------player_ready_notify detail:"+detail)
            if(detail==this.accountid){
                this.readyimage.active = true
            }
        }.bind(this))

        //监听内部随可以抢地主消息,这个消息会发给每个playernode节点
        this.node.on("playernode_canrob_event",function(event){
            var detail = event
            console.log("------playernode_canrob_event detail:"+detail)
            if(detail==this.accountid){
              this.qiangdidzhu_node.active=true
              //this.tips_label.string ="正在抢地主" 
              // this.time_label.string="10"
              //开启一个定时器

            }
        }.bind(this))
        //?
        if(index==1){
          this.card_node.x = -this.card_node.x - 30;
          this.readyimage.x = -this.readyimage.x - 30;
          this.robIcon_Sp.x = -this.robIcon_Sp.x - 30;
          this.robnoIcon_Sp.x = -this.robnoIcon_Sp.x -30;
          this.bu_chu.x = -this.bu_chu.x - 30;
        }
        if(this.accountid==myglobal.playerData.accountID){
          this.readyimage.x = 505;
          this.robIcon_Sp.x = 505;
          this.robnoIcon_Sp.x = 505;
          this.bu_chu.x = 505;
          this.readyimage.y = 158;
          this.robIcon_Sp.y = 158;
          this.robnoIcon_Sp.y = 158;
          this.bu_chu.y = 208;
        }
    },

    // update (dt) {},
    pushCard(){
        
        this.card_node.active = true
        // this.card_count.active = true; 
        for(var i=0;i<17;i++){
            var card = cc.instantiate(this.card_prefab)
            card.scale=0.6
            // console.log(" this.card_node.parent.parent"+ this.card_node.parent.parent.name)
            card.parent = this.card_node
            //card.parent = this.node
            // card.opacity = 100;
            var height = card.height
            card.y = (17 - 1) * 0.5 * height * 0.4 * 0.3 - height * 0.4 * 0.3 * i;
            card.x = 0
           
            //console.log("call pushCard x:"+card.x+" y:"+card.y)
            this.cardlist_node.push(card)
        }
        this.card_count.y = 152.64 - 19.08 * 20;
        this.card_count.getComponent(cc.Label).string = '剩17张'
    },
    clearCard(){
      var gameScene_script = this.node.parent.parent.getComponent("gameScene")
      var outCard_node = gameScene_script.getUserOutCardPosByAccount(this.accountid)
      var children = outCard_node.children;
      for(var i=0;i<children.length;i++){
          var card = children[i]; 
          card.destroy()
      }
      outCard_node.removeAllChildren(true);
    },
    destoryCard(data){
      let tag = 0
      for(let i=0;i<data.cards.length;i++){
          //删除牌组中的牌，一次去头，一次去尾
          if(tag==0){
            tag = 1
            let index = parseInt(this.cardlist_node.length-1);
            this.cardlist_node[index].removeFromParent(true);
            this.cardlist_node.splice(index,1)
            this.card_count.y+=19.08;
          }else{
            tag = 0;
            this.cardlist_node[0].removeFromParent(true);
            this.cardlist_node.splice(0,1)
          }
      }
      this.card_count.getComponent(cc.Label).string = '剩'+this.cardlist_node.length+'张'
      if(this.cardlist_node.length==1){
        cc.audioEngine.play(this.baojin1)
        cc.audioEngine.play(this.baojin)
      }
      if(this.cardlist_node.length==2){
          cc.audioEngine.play(this.baojin2)
          cc.audioEngine.play(this.baojin)
      }
    },
    destoryAllCard(){
      console.warn(this.cardlist_node)
      for(let i = 0;i<this.cardlist_node.length;i++){
        this.cardlist_node[i].removeFromParent(true)
      }
      this.cardlist_node=[]
      this.card_count.active = false;
    },
    onDestroy(){
      console.warn(123)
  }
});
