let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        NFT_item:cc.Prefab,
        XHP_item:cc.Prefab,
        container:cc.Node,
        label_Usdt:cc.Label,
        btn_item:[cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable(){
        this.getShopList(null,0);
        let reqData = {};
        app.Post('member/getMemberInfo',reqData,(res)=>{
            if(res.code==200){
                if(res.data)
                    this.label_Usdt.string = res.data.totalUsdt;
            }
        });
        // cc.find("Canvas/UserDataPanel").active = true;
        // lobal.ProtocolMgr.queryUserData();
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
                Global.PageMgr.onClosePage(6);
                // cc.find('Canvas/ShopPanel/UserDataPanel').active = false;
               
                Global.ProtocolMgr.queryNFTList((res)=>{
                    console.log(res)
                    if(res.code==200){
                        let data = res.data;
                        for(let i = 0;i < data.length;i++){
                            let NFTItemNode = cc.instantiate(this.NFT_item);
                            NFTItemNode.getComponent("NFT_item").setData(data[i]);
                            this.container.addChild(NFTItemNode);
                        }
                    }else{
                        Global.PageMgr.showTipPage(res.message);
                    }
                })
                break;
            case 1:
                Global.PageMgr.onClosePage(6);
                Global.ProtocolMgr.queryXHPList((res)=>{
                    console.log(res)
                    if(res.code==200){
                        let data = res.data;
                        for(let i = 0;i < data.length;i++){
                            let XHPItemNode = cc.instantiate(this.XHP_item);
                            XHPItemNode.getComponent("XHP_item").setData(data[i]);
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
        cc.find('Canvas/'+Global.pages[6]).active = false;
    }
    // update (dt) {},
});
