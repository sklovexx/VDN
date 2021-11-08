
cc.Class({
    extends: cc.Component,

    properties: {
        Item:cc.Prefab,
        Content:cc.Node,
        MaxCount:200
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("HongBaoListData",this.onUpdateHongBaoListData,this)
    },
    start () {

    },
    onEnable(){
        // Global.ProtocolMgr.queryHongBaoList();
        this.onUpdateHongBaoListData()
    },
    onUpdateHongBaoListData(){
        this.clearContent();
        let backPack = GameData.HongBaoList;
        for(let i = 0;i<backPack.length;i++){
            let node = cc.instantiate(this.Item);
            node.parent = this.Content;
            node.getChildByName('Index').getComponent(cc.Label).string = i+1;
            node.getChildByName('UserName').getComponent(cc.Label).string = backPack[i].nickname;
            node.getChildByName('Count').getComponent(cc.Label).string = backPack[i].amount;
            cc.loader.load({url:backPack[i].headPortrait,type:'png'},(err,res)=>{
                let spriteFrame = new cc.SpriteFrame(res)
                node.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
        }
    },
    clearContent(){
        //清理列表
        let children = this.Content.children;
        for(let i = 0;i<children.length;i++){
            children[i].destroy();
        }
    },
    // update (dt) {},
});
