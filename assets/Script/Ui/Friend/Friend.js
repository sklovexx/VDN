
cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Prefab,
        content:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on('FriendData',this.onUpdateFriendData,this)
    },

    start () {

    },
    onUpdateFriendData(){
        let backPack = GameData.FriendData;
        backPack.forEach(e =>{
            let node = cc.instantiate(this.item);
            node.parent = this.content;
            cc.loader.load(e.url,(err,res)=>{
                let spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            })
            node.getChildByName('Name').getComponent(cc.Label).string = e.name;
            node.getChildByName('State').getComponent(cc.Label).string = e.state == 1 ? '可偷取':'';
            node.off(cc.Node.EventType.TOUCH_END);
            node.on(cc.Node.EventType.TOUCH_END,()=>{
                Global.ProtocolMgr.queryFriendNongChang()
            },this);
        })
    },
    onEnable(){
        Global.ProtocolMgr.queryFriend()
    },
    onDisable(){
        let children = this.content.children;
        children.forEach(e =>{
            e.destroy()
        })
    },
    // update (dt) {},
});
