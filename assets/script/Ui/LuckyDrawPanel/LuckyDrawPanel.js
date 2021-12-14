// let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        luckyDraw_item:cc.Prefab,
        container:cc.Node,
        Panle:cc.Node,
        Panle2:cc.Node,
        Panle3:cc.Node,
        pageSum:1,
        pageSum2:1,
        btn_item:[cc.Sprite]
    },

    onLoad () {
    },

    onEnable(){
        this.pageSum = 1;
        this.getGameList(null,0);
    },

    goLuckyDrawUI(){
        Global.ProtocolMgr.queryLuckDrawList(20,this.pageSum,(res)=>{
            if(res.code==200){
                let data = res.data.list;

                if(data.length == 0)
                {
                    if(this.pageSum != 1)
                    {
                        Global.PageMgr.showTipPage("已经是最后页了"); 
                    }
                    this.pageSum = this.pageSum2 + 1;
                    return;
                }
                this.pageSum2 = this.pageSum;
                if(this.pageSum != 1)
                {
                    Global.PageMgr.showTipPage("刷新成功！"); 
                }
                this.container.removeAllChildren();
                for(let i = 0;i < data.length;i++){
                    let gameItemNode = cc.instantiate(this.luckyDraw_item);
                    gameItemNode.getComponent("LuckyDrawItem").setData(data[i]);
                    this.container.addChild(gameItemNode);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },

    getGameList(event,customData){
        this.btn_item.forEach(e=>{
            e.spriteFrame = null;
        })
        cc.loader.loadRes("imgs/按钮bg2", cc.SpriteFrame, (err, sf)=>{
            if (!err){
                this.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        switch (parseInt(customData)) {
            case 0:
                this.onClickBeganTheDetail(null,1);
                break;
            case 1:
                this.onClickBeganTheDetail(null,0);
                this.goLuckyDrawUI();
                break;
            case 2:
                this.onClickBeganTheDetail(null,2);
                break;
            default:
                break;
        }
    },

    //开始抽奖
    onClickBeganToDraw()
    {
        Global.PageMgr.showTipPage("每周六下午5点,官方统一抽奖",20); 
    },
    //点击抽奖规则
    onClickSweepstakesRules()
    {
        this.onClickBeganTheDetail(null,2);
        this.Panle3.active = true;
    },
    //点击明显或者返回
    onClickBeganTheDetail(event,customData)
    {
        var index = parseInt(customData);
        this.Panle.active = index == 1 ? true:false;
        this.Panle2.active = index == 0 ? true:false;
        this.Panle3.active = index == 2 ? true:false;
        // if(index == 0)
        // {
        //     this.goLuckyDrawUI();
        // }
    },

    onClickDown()
    {
        if(this.pageSum > 2)
        {
            this.pageSum -=1;
        }
        else
        {
            this.pageSum = 1;
            Global.PageMgr.showTipPage("已经是首页了"); 
        }
        this.goLuckyDrawUI();
    },

    onClickUp()
    {
        this.pageSum +=1;
        this.goLuckyDrawUI();
    },
});
