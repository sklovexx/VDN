
cc.Class({
    extends: cc.Component,

    properties: {
        NFT_item:cc.Prefab,
        XHP_item:cc.Prefab,
        container:cc.Node,
        btn_item:[cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable(){
        this.getShopList(null,0);
        Global.ProtocolMgr.queryUserData();
    },
    getShopList(event,customData){
        this.btn_item.forEach(e=>{
            e.spriteFrame = null;
        })
        cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, (err, sf)=>{
            if (!err){
                this.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        this.container.removeAllChildren();
        switch (parseInt(customData)) {
            case 0:
                Global.ProtocolMgr.queryKnapsackNFTList((res)=>{
                    console.log(res)
                    if(res.code==200){
                        let data = res.data;
                        for(let i = 0;i < data.length;i++){
                            let NFTItemNode = cc.instantiate(this.NFT_item);
                            NFTItemNode.getComponent("NFT_item").setData(data[i],2);
                            this.container.addChild(NFTItemNode);
                        }
                    }else{
                        Global.PageMgr.showTipPage(res.message);
                    }
                })
                break;
            case 1:
                Global.ProtocolMgr.queryKnapsackXHPList((res)=>{
                    console.log(res)
                    if(res.code==200){
                        let data = res.data;
                        for(let i = 0;i < data.length;i++){
                            let XHPItemNode = cc.instantiate(this.XHP_item);
                            XHPItemNode.getComponent("XHP_item").setData(data[i],2);
                            this.container.addChild(XHPItemNode);
                        }
                    }else{
                        Global.PageMgr.showTipPage(res.message);
                    }
                })
                break;
            case 2:
                Global.PageMgr.onOpenPage(6);
                break;
            default:
                break;
        }
    },
    onDisable(){
    }
    // update (dt) {},
});
