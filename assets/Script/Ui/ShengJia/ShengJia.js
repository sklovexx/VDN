
cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.on('UpdateUserData',this.UpdateUserData,this);
        this.UpdateUserData();
        let dian1 = this.node.getChildByName('dian1').getComponent(cc.Animation);
        let dian2 = this.node.getChildByName('dian2').getComponent(cc.Animation);
        dian1.play();
        dian2.play();
        setInterval(()=>{
            dian1.play();
            dian2.play();
        },5000)
        let node = cc.instantiate(this.item);
        node.parent = this.node;
        let jump = cc.repeatForever(cc.sequence(cc.moveBy(1,cc.v2(0,20)),cc.moveBy(1,cc.v2(0,-20))))
        setTimeout(()=>{node.runAction(jump)},Math.random()*1000)
        node.on(cc.Node.EventType.TOUCH_MOVE,(e)=>{
            let location = e.getLocation()
            node.position = node.parent.convertToNodeSpaceAR(location);
        })
        let jump2 = cc.repeatForever(cc.sequence(cc.moveBy(2,cc.v2(0,20)),cc.moveBy(2,cc.v2(0,-20))))
        this.node.getChildByName('圆顶').runAction(jump2)
    },
    goSheQu(){
        cc.director.loadScene('ECC',()=>{
        })
    },
    //更新用户数据
    UpdateUserData(){
        this.node.getChildByName('ZuanShi').getChildByName('Text').getComponent(cc.Label).string = '钻石：0.00';
        this.node.getChildByName('DongLi').getChildByName('Text').getComponent(cc.Label).string = '动力：30';
    },
    start () {

    },

    // update (dt) {},
});
