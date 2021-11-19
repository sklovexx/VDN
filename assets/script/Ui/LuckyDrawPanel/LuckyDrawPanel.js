// let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        luckyDraw_item:cc.Prefab,
        container:cc.Node,
        Panle:cc.Node,
        Panle2:cc.Node,
        btn_item:[cc.Sprite]
    },

    onLoad () {
    },

    onEnable(){
        this.getGameList(null,0);
    },

    goLuckyDrawUI(){
        this.container.removeAllChildren();
        Global.ProtocolMgr.queryLuckDrawList(100,1,(res)=>{
            if(res.code==200){
                let data = res.data.list;
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
            default:
                break;
        }
    },

    //开始抽奖
    onClickBeganToDraw()
    {
        Global.PageMgr.showTipPage("每周六下午5点,官方统一抽奖",20); 
    },

    //点击明显或者返回
    onClickBeganTheDetail(event,customData)
    {
        var index = parseInt(customData);
        this.Panle.active = index > 0 ? true:false;
        this.Panle2.active = index <= 0 ? true:false;
        if(index == 0)
        {
            this.goLuckyDrawUI();
        }
    },
});
