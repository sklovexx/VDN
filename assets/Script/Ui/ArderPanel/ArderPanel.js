let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        icon_logo:[cc.Sprite],
        arfer_item:cc.Prefab,
        container:cc.Node,
        game_item2:cc.Prefab,
        container2:cc.Node,

        Panle:cc.Node,
        Panle2:cc.Node,
        Panle3:cc.Node,
        label_Usdt:cc.Label,
        lable_id:cc.Label,
        lable_name:cc.Label,
        lable_pic:cc.Label,
        lable_limit:cc.Label,
        lable_gold:cc.Label,
        lable_sum:cc.Label,
        editBox_id:cc.EditBox,
        editBox_name:cc.EditBox,
        btn_skip:cc.Sprite,
        _availableCoinOne:0,
        label_description:[cc.Label]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.pageData = [
        //     [
        //         {
        //             logo:"书",
        //             description:"书吧",
        //             bundleId:"1,com.qidian.QDReader,https://m.qidian.com/"
        //         },
        //         {
        //             logo:"健身",
        //             description:"健身APP",
        //             bundleId:"1,com.gotokeep.keep,https://www.gotokeep.com/"
        //         },
        //         {
        //             logo:"厨艺",
        //             description:"厨艺",
        //             bundleId:"1,com.xiachufang.lazycook,http://vcook.xiachufang.com/"
        //         },
        //         {
        //             logo:"音乐",
        //             description:"音乐",
        //             bundleId:"1,com.tencent.qqmusic,https://i.y.qq.com/n2/m/index.html"
        //         },
        //     ],
        //     [
        //         {
        //             logo:"花",
        //             description:"花艺"
        //         },
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //     ],
        //     [
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //         {
        //             logo:"",
        //             description:"尽请期待"
        //         },
        //     ],
        // ];
        // this.curPageData = [];
        Global.ProtocolMgr.queryUserData();
        // this.setPageData({target:{name:0}});
    },

    onEnable(){
        this.goSetlectLieFallowPanle();
        let reqData = {};
        app.Post('member/getMemberInfo',reqData,(res)=>{
            if(res.code==200){
                if(res.data)
                {
                    // window.DEFAULT_availableUsdt = res.data.availableCoinOne;
                    this.label_Usdt.string = res.data.totalUsdt;
                    this._availableCoinOne = res.data.availableCoinOne;
                }
            }
        });
    },

    breakSetlectLieFallowPanle(event,customData){
        this.goSetlectLieFallowPanle();
    },

    goGamePanelUI(datas,index){
        this.Panle.active = false;
        this.Panle2.active = true;
        this.Panle3.active = false;
        this.datas = datas;
        this.numberID = index;
        // this.setPageData({target:{name:0}});
        this.container2.removeAllChildren();
        Global.ProtocolMgr.queryGameList(1,2,(res)=>{
            if(res.code==200){
                let data = res.data;
                for(let i = 0;i < data.length;i++){
                    if(datas != null)
                    {
                    //     if(data[i].is_true == 1)
                    //     {
                    //         continue;
                    //     } 
                    // }
                    // else
                    // {
                        if(data[i].is_true == 0)
                        {
                            continue;
                        } 
                    }
                    let gameItemNode = cc.instantiate(this.game_item2);
                    gameItemNode.getComponent("game_item").setData(data[i],this.goEnterGamePanel);
                    this.container2.addChild(gameItemNode);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },
    onClickSkip()
    {
        this.goGamePanelUI(null);
    },

    //回调
    goEnterGamePanel(bundleId,datas){
        var node = Global.PageMgr.pages[8].getComponent("ArderPanel");
        node.datas2 = datas;
        node.selectData = datas;
        if(node.datas != null)//
        {
            node.Panle.active = false;
            node.Panle2.active = false;
            node.Panle3.active = true;
            node.editBox_id.string = "";
            node.editBox_name.string = "";
            node.bundleId = cc.js.formatStr("1,%s,%s",datas.game_package_name,datas.game_web_link);
            node.lable_pic.string = cc.js.formatStr("%s",parseFloat(node.datas.ticket).toFixed(3));
            node.lable_gold.string = cc.js.formatStr("%s张",parseFloat(node._availableCoinOne).toFixed(3));//parseFloat(window.DEFAULT_availableUsdt).toFixed(3)
            node.lable_limit.string = datas.number_limit;
            if(datas.number_limit == "0")
            {
                node.lable_limit.string = "无限"; 
            }
            node.dianjiSum = 0;
            
            node.lable_sum.string = "" + node.dianjiSum;
        }else
        {
            let bundleId = cc.js.formatStr("1,%s,%s",node.datas2.game_package_name,node.datas2.game_web_link);
            let res= jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", bundleId);
        }


        // console.log(this.curPageData[parseInt(customData)]);
        // let classPath = "org/cocos2dx/javascript/AppActivity";
            // if(!this.curPageData[parseInt(customData)]||!this.curPageData[parseInt(customData)].bundleId){
            //     return;
            // }
            // // console.log(this.curPageData[parseInt(customData)]);
            // let res= jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.curPageData[parseInt(customData)].bundleId);
            // if (!res){
            //     Global.PageMgr.showTipPage("跳转失败");
            // }
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", "com.tencent.mm");
    },
    
    goSetlectLieFallowPanle()
    {
        this.Panle.active = true;
        this.Panle2.active = false;
        this.Panle3.active = false;
        this.container.removeAllChildren();
        Global.ProtocolMgr.queryLieFallowList(1,(res)=>{
            if(res.code==200){
                let data = res.data;
                for(let i = 0;i < data.length;i++){
                    let gameItemNode = cc.instantiate(this.arfer_item);
                    gameItemNode.getComponent("Arder_Item").setData(data[i]);
                    
                    this.container.addChild(gameItemNode);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },


    setPageData(event){
        let data = this.curPageData = this.pageData[parseInt(event.target.name)];
        for(let i = 0;i<data.length;i++){
            if(data[i].logo!=""){
                cc.loader.loadRes("imgs/" + data[i].logo, cc.SpriteFrame, (err, sf)=>{
                    if (!err){
                        this.icon_logo[i].spriteFrame = sf;
                    }
                });
            }else{
                this.icon_logo[i].spriteFrame = null;
            }
            this.label_description[i].string = data[i].description;
            if(data[i].description=="尽请期待"){
                this.label_description[i].node.opacity = 178;
            }else{
                this.label_description[i].node.opacity = 255;
            }
        }
    },

    jumpTo(event,customData){
        // this.Panle.active = false;
        // this.Panle2.active = false;
        // this.Panle3.active = true;

        // this.lable_pic.string = cc.js.formatStr("%sPMV",parseFloat(this.datas.ticket).toFixed(3));
        // this.lable_gold.string = cc.js.formatStr("%sPMV",parseFloat(window.DEFAULT_availableUsdt).toFixed(3));
        // // this.lable_limit.string = datas.number_limit;
        // this.dianjiSum = 0;
        // // this.datas = datas;
        // this.lable_sum.string = "" + this.dianjiSum;

        // console.log(this.curPageData[parseInt(customData)]);
        // // let classPath = "org/cocos2dx/javascript/AppActivity";
        //     // if(!this.curPageData[parseInt(customData)]||!this.curPageData[parseInt(customData)].bundleId){
        //     //     return;
        //     // }
        //     // // console.log(this.curPageData[parseInt(customData)]);
        //     // let res= jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.curPageData[parseInt(customData)].bundleId);
        //     // if (!res){
        //     //     Global.PageMgr.showTipPage("跳转失败");
        //     // }
        // // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", "com.tencent.mm");
    },

    breakPanle(event,customData){
        this.Panle.active = false;
        this.Panle2.active = true;
        this.Panle3.active = false;
    },

    //自增
    sinceIncrease()
    {
        this.dianjiSum +=1;
        if(this._availableCoinOne >= this.dianjiSum * (parseInt(this.datas.ticket *1000)/1000)){
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
        if(this.dianjiSum <= 0)
        {
            Global.PageMgr.showTipPage("门票不能小于1"); 
            return;
        }
        else if(this._availableCoinOne < this.dianjiSum * (parseInt(this.datas.ticket *1000)/1000))
        {
            Global.PageMgr.showTipPage("门票不足请购买门票"); 
            return;
        }

        let reqData = {
            game_id:this.datas2.id,//游戏id
            sg_id:this.numberID,//游戏场次ID
            number:"" + this.dianjiSum,//游戏数量
        }

        Global.ProtocolMgr.startLeisureGame(reqData,(res)=>{
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
                
                // if(!this.curPageData[parseInt(customData)]||!this.curPageData[parseInt(customData)].bundleId){
                //     return;
                // }
                // console.log(this.curPageData[parseInt(customData)]);
                
                let bundleId = cc.js.formatStr("1,%s,%s",this.datas2.game_package_name,this.datas2.game_web_link);
                let res = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", bundleId);
                if(res)
                {
                    this.breakPanle(null,0);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },
    // update (dt) {},
});
