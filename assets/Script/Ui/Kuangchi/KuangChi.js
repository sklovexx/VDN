
cc.Class({
    extends: cc.Component,

    properties: {
        UserData:[cc.Node],
        SubPanel:[cc.Node],
        GonGao:cc.Node,
        ECC:cc.Prefab,
        Count:10
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("UserData",this.onUpdateUserData,this)
        Global.ProtocolMgr.queryUserData();
        Global.ProtocolMgr.queryEcc((data)=>{
            this.Count = parseInt(data.data.number);
            //生成矿球
            for(let i = 0;i<this.Count;i++){
                let node = cc.instantiate(this.ECC);
                let position = this.randomPosition();
                node.parent = this.node
                node.x = position.x;
                node.y = position.y;
                let jump = cc.repeatForever(cc.sequence(cc.moveBy(1,cc.v2(0,20)),cc.moveBy(1,cc.v2(0,-20))))
                setTimeout(()=>{node.runAction(jump)},Math.random()*1000)
                node.on(cc.Node.EventType.TOUCH_END,()=>{
                    //防止操作其他节点
                    if(node.name=="ECC"){
                        //防止多次点击
                        Global.ProtocolMgr.addEcc()
                        node.off(cc.Node.EventType.TOUCH_END)
                        node.destroy()
                        // let fadeOut = cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){}));
                        // node.runAction(fadeOut)
                    }
                },this)
            }
        })
    },
    //监听用户信息更新
    onUpdateUserData(){
        try {
            cc.loader.load({url:GameData.UserData[0],type:'png'},(err,res)=>{
                this.UserData[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res)
            })
        }catch (e) {
            console.warn(e)
        }
        for(let i = 1;i<this.UserData.length;i++){
            this.UserData[i].getComponent(cc.Label).string =parseFloat(GameData.UserData[i]).toFixed(2);
        }
    },
    start () {

    },
    //获取随机位置
    randomPosition(){
        let canvas = cc.director.getScene().getChildByName('Canvas').getComponent(cc.Canvas).node
        let pad = 80
            , minX = -canvas.width / 2 + pad
            , minY = -canvas.height / 2 + pad
            , maxX = canvas.width / 2 - pad
            , maxY = canvas.height / 2 - pad;
        let x = dataFunc.randomNum(minX,maxX)
            , y = dataFunc.randomNum(minY,maxY);
        return {x,y}
    },
    showSubPanel(event,index){
        this.SubPanel[index].active = true;
    },
    closeSubPanel(event,index){
        this.SubPanel[index].active = false;
    },
    filterClick(){
        console.log('点击过滤')
        return
    },
    onDestroy(){
        cc.director.GlobalEvent.off("UserData")
    },
    // update (dt) {},
});
