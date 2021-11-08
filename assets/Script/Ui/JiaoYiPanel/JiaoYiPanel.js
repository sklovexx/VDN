
cc.Class({
    extends: cc.Component,

    properties: {
        jiaoyi_item:cc.Prefab,
        container:cc.Node,
        btn_item:[cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable(){
        this.getListData(null,0)
    },
    getListData(event,customData){
        this.btn_item.forEach(e=>{
            e.spriteFrame = null;
        })
        cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, (err, sf)=>{
            if (!err){
                this.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        Global.ProtocolMgr.queryJiaoYiList((res)=>{
            if(res.code==200){
                let data = res.data
                console.log(data);
                this.container.removeAllChildren();
                for(let i = 0;i<data.length;i++){
                    let jiaoyiItemNode = cc.instantiate(this.jiaoyi_item);
                    jiaoyiItemNode.getComponent("jiaoyi_item").setData(i,data[i]);
                    this.container.addChild(jiaoyiItemNode);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },
    close(){
        Global.PageMgr.onClosePage(3);
    }
    // update (dt) {},
});
