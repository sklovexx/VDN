let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,
    properties: {
        game_item:cc.Prefab,
        container:cc.Node,
        game_item2:cc.Prefab,
        container2:cc.Node,
        game_item3:cc.Prefab,
        container3:cc.Node,
        container4:cc.Node,
        Panle:cc.Node,
        Panle2:cc.Node,
        Panle3:cc.Node,
        Panle4:cc.Node,
        bgSprite:cc.Node,
        Panlelist2:cc.Node,
        Panlelist3:cc.Node,
        Panlelist4:cc.Node,
        PanleBG:cc.Node,
        lable_id:cc.Label,
        lable_name:cc.Label,
        lable_pic:cc.Label,
        lable_limit:cc.Label,
        lable_gold:cc.Label,
        lable_sum:cc.Label,
        label_Usdt:cc.Label,
        editBox_id:cc.EditBox,
        editBox_name:cc.EditBox,
        btn_skip:cc.Sprite,
        _availableCoinOne:0,
        lable_name1:cc.Label,
        lable_name2:cc.Label,
        label_equipment:cc.Label,
        scroll_equipment:cc.Node,
        editBox_equipment:cc.EditBox,
        container_equipment:cc.Node,
        selectItem:cc.Prefab,
        btn_item:[cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.goSetlectGamePanle();
        Global.ProtocolMgr.queryUserData();
    },

    onEnable(){
        let reqData = {};
        app.Post('member/getMemberInfo',reqData,(res)=>{
            if(res.code==200){
                if(res.data){
                    // window.availableCoinOne = res.data.availableCoinOne;
                    this.label_Usdt.string = res.data.totalUsdt;
                    this._availableCoinOne = res.data.availableCoinOne;
                    this.equipmentdata = [{"division_name":"安卓","id":0},{"division_name":"苹果","id":1},{"division_name":"H5","id":2},{"division_name":"其他","id":3}];
                }
            }
        });
        this.getGameList(null,2);
    },

    breakSetlectGamePanle(event,customData){
        // this.goSetlectGamePanle();
        this.getGameList(null,2);
    },

    goSetlectGamePanle()
    {
        this.Panle.active = true;
        this.Panle2.active = false;
        this.Panle3.active= false;
        this.curType = 2;
        this.container2.removeAllChildren();
        Global.ProtocolMgr.queryGameRoomList(1,(res)=>{
            if(res.code==200){
                let data = res.data;
                for(let i = 0;i < data.length;i++){
                    let gameItemNode = cc.instantiate(this.game_item2);
                    gameItemNode.getComponent("Game_Item2").setData(data[i]);
                    this.container2.addChild(gameItemNode);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },

    showScroll(event,customData){
        switch (customData) {
            case "equipment":
                this.scroll_equipment.active = true;
                break;
            default:
                break;
        }
    },

    showScrolle()
    {
        this.container_equipment.removeAllChildren();
        
        for(let i = 0;i<this.equipmentdata.length;i++){
            let selectItem = cc.instantiate(this.selectItem);
            selectItem.getComponent(cc.Label).string = this.equipmentdata[i].division_name;
            selectItem.on(cc.Node.EventType.TOUCH_END,()=>{
                this.label_equipment.string = this.equipmentdata[i].division_name;
                this.did = this.equipmentdata[i].id;
                this.closeScroll();
            })
            this.container_equipment.addChild(selectItem);
        }
    },

    closeScroll(){
        this.scroll_equipment.active = false;
    },
    //回调
    goEnterGamePanel(bundleId,datas){
        var node = Global.PageMgr.pages[7].getComponent("GamePanel");
        // node.bundleId = bundleId;
        node.bundleId = cc.js.formatStr("1,%s,%s",datas.game_package_name,datas.game_web_link);
        node.datas = datas;
        if(node.selectData != null)
        {
            node.showScrolle();
            node.Panle.active = false;
            node.Panle2.active = false;
            node.Panle3.active = true;
            node.did = -1;
            node.scroll_equipment.active = false;
            node.editBox_id.string = "";
            node.label_equipment.string = "设备选择:";
            node.editBox_name.string = "";
            node.lable_name1.string = cc.js.formatStr("%s中官方客服:",datas.game_name);
            node.lable_name2.string = cc.js.formatStr("%s中我的:",datas.game_name);
            node.lable_id.string = datas.game_customer_account;
            node.lable_name.string = datas.game_customer_nickname;
            node.lable_pic.string = cc.js.formatStr("%s",parseFloat(node.selectData.ticket).toFixed(2));
            node.lable_limit.string = datas.number_limit;
            if(datas.number_limit == "0")
            {
                node.lable_limit.string = "无限";
            }
            
            node.lable_gold.string = cc.js.formatStr("%s张",parseFloat(node._availableCoinOne).toFixed(3));;
            node.dianjiSum = 0;
    
            node.lable_sum.string = "" + node.dianjiSum;
        }else
        {
            let bundleId = cc.js.formatStr("1,%s,%s",node.datas.game_package_name,node.datas.game_web_link);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", bundleId);
        }
    },
    onClickSkip()
    {
        this.goGamePanelUI(null);
    },
    //自增
    sinceIncrease()
    {
        // if(this.dianjiSum < 100){
        //     this.dianjiSum +=1;
        // }
        // this.lable_sum.string = "" + this.dianjiSum;
        this.dianjiSum +=1;
        if(this._availableCoinOne >= this.dianjiSum * (parseInt(this.selectData.ticket *1000)/1000)){
            this.lable_sum.string = "" + this.dianjiSum;
        }else
        {
            this.dianjiSum = parseInt(this.lable_sum.string);
            Global.PageMgr.showTipPage("门票不足请购买门票"); 
        }
    },

    //自减
    sinceReduction()
    {
        if(this.dianjiSum > 1){
            this.dianjiSum -=1;
        }
        this.lable_sum.string = "" + this.dianjiSum;
    },
    //提交信息
    submitMessage()
    {
        if(this.editBox_id.string == "")
        {
            Global.PageMgr.showTipPage("ID为空"); 
            return;
        }else if(this.editBox_name.string == "")
        {
            Global.PageMgr.showTipPage("昵称为空"); 
            return;
        }else if(this.dianjiSum <= 0)
        {
            Global.PageMgr.showTipPage("门票不能小于1"); 
            return;
        }
        else if(this._availableCoinOne < this.dianjiSum * (parseInt(this.selectData.ticket *1000)/1000))
        {
            Global.PageMgr.showTipPage("门票不足请购买门票"); 
            return;
        }else if(this.did==-1){
            Global.PageMgr.showTipPage("还未选择设备");
            return;
        }
        this.setUrl();
    },

    setUrl()
    {
        let reqData = {
            game_id:this.selectData.id,//游戏id
            sg_id:this.numberID,//游戏场次ID
            number:"" + this.dianjiSum,//游戏数量
            game_account:this.editBox_id.string,//游戏账号
            game_nickname:this.editBox_name.string,//游戏昵称
            type:this.did.toString(),
        }

        Global.ProtocolMgr.startCompetitiveGame(reqData,(res)=>{
            console.log(res)
            if(res.code!=3001){
                // let data = res.data;
                // // data = this.data[0];
                // for(let i = 0;i < data.length;i++){
                //     // if(data[i].type==this.curType){
                //         let gameItemNode = cc.instantiate(this.game_item);
                //         gameItemNode.getComponent("game_item").setData(data[i],this.goEnterGamePanel);
                //         this.container.addChild(gameItemNode);
                //     // }
                // }
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.bundleId);
                this.breakPanle(null,0);
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },

    breakPanle(event,customData){
        if(this.selectData != null)
        {
            Global.PageMgr.pages[7].getComponent("GamePanel").Panle.active = false;
            Global.PageMgr.pages[7].getComponent("GamePanel").Panle2.active = true;
            Global.PageMgr.pages[7].getComponent("GamePanel").Panle3.active= false;
        }
        // this.curType = 2;
        // lobal.PageMgr.pages[7].getComponent("GamePanel").getGameList(null,2);
    },

    goGamePanelUI(selectData,index){
        this.container2.removeAllChildren();
        this.Panle.active = false;
        this.Panle2.active = true;
        this.Panle3.active= false;
        this.curType = 0;
        this.selectData = selectData;
        this.numberID = index;
        this.getGameList(null,0);
    },

    getGameList(event,customData){
        this.btn_item.forEach(e=>{
            e.spriteFrame = null;
        })
        cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, (err, sf)=>{
            if (!err){
                this.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        this.bgSprite.active = false;
        switch (parseInt(customData)) {
            case 0:
                this.curType = 0;
                this.Panle4.active = false;
                this.bgSprite.active = true;
                this.gameQueryGameList();
                break;
            case 1:
                // this.Panle4.active = false;
                // this.bgSprite.active = true;
                // this.curType = 1;
                // this.gameQueryGameList();
                this.Panle4.active = true;
                this.container.removeAllChildren();
                this.curType = 3;
                break;
            case 2:
                // this.curType = 2;
                this.Panlelist2.active = true;
                this.Panlelist3.active = false;
                this.Panlelist4.active = false;
                this.PanleBG.active = false;
                this.container2.removeAllChildren();
                this.container3.removeAllChildren();
                this.goSetlectGamePanle();
                break;
            case 3:
                this.container2.removeAllChildren();
                this.container3.removeAllChildren();
                // this.curType = 3;
                this.Panlelist3.active = true;
                this.Panlelist2.active = false;
                this.Panlelist4.active = false;
                this.PanleBG.active = false;
                this.setStationRecordUI(); 
                break;
            case 4:
                this.Panle4.active = true;
                this.container.removeAllChildren();
                this.curType = 3;
                break;
            case 5:
                this.curType = 0;
                this.selectData = null;
                this.container2.removeAllChildren();
                this.container3.removeAllChildren();
                this.Panlelist3.active = false;
                this.Panlelist2.active = false;
                this.Panlelist4.active = true;
                this.PanleBG.active = true;
                this.MobileGamesList();
                break;
            default:
                break;
        }
    },

    //战绩列表更新数据
    setStationRecordUI()
    {
        Global.ProtocolMgr.queryStationRecordList(100,1,(res)=>{
            this.container3.removeAllChildren();
            if(res.code==200){
                let data = res.data;
                for(let i = 0;i < data.length;i++){
                    let gameItemNode = cc.instantiate(this.game_item3);
                    gameItemNode.getComponent("Game_Item3").setData(data[i]);
                    this.container3.addChild(gameItemNode);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },

    gameQueryGameList()
    {
        this.container.removeAllChildren();
        Global.ProtocolMgr.queryGameList(1,1,(res)=>{
            this.container.removeAllChildren();
            if(res.code==200){
                let data = res.data;
                // data = this.data[0];
                for(let i = 0;i < data.length;i++){
                    if(this.selectData != null)
                    {
                        if(data[i].is_true == 0)
                        {
                            continue;
                        } 
                    }
                    if(data[i].game_terminal==this.curType){
                        let gameItemNode = cc.instantiate(this.game_item);
                        gameItemNode.getComponent("game_item").setData(data[i],this.goEnterGamePanel);
                        this.container.addChild(gameItemNode);
                    }
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },

    MobileGamesList()
    {
        Global.ProtocolMgr.queryGameList(1,1,(res)=>{
            this.container4.removeAllChildren();
            if(res.code==200){
                let data = res.data;
                for(let i = 0;i < data.length;i++){
                    if(data[i].game_terminal==this.curType && data[i].is_true == 0){
                        let gameItemNode = cc.instantiate(this.game_item);
                        gameItemNode.getComponent("game_item").setData(data[i],this.goEnterGamePanel);
                        this.container4.addChild(gameItemNode);
                    }
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },

    setPageData(event){
        // let param = parseInt(event.target.name);
        // Global.ProtocolMgr.queryGameList(param,1,(res)=>{
        //     this.container.removeAllChildren();
        //     if(res.code==200){
        //         let data = res.data;
        //         if(param-1 > data.length)
        //         {
        //             data = data[param-1];
        //         }
                
        //         for(let i = 0;i < data.length;i++){
        //             // if(data[i].type==this.curType){
        //                 let gameItemNode = cc.instantiate(this.game_item);
        //                 gameItemNode.getComponent("game_item").setData(data[i],this.goEnterGamePanel);
        //                 this.container.addChild(gameItemNode);
        //             // }
        //         }
        //     }else{
        //         Global.PageMgr.showTipPage(res.message);
        //     }
        // })
    }
    // update (dt) {},
});
