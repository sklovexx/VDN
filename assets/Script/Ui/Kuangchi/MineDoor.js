
cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight:0,
        duration:0,
        mineDoor:cc.Node,
        treasureBox:cc.Prefab,
        gold:cc.Prefab,
        tip:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.sys.localStorage.clear('getEGold')
        setTimeout(()=>{
            Global.ProtocolMgr.queryMillOutput((data)=>{
                let res = eval(data.data.canAccept)
                if(cc.sys.localStorage.getItem('getEGold')==null&&res){
                    let tip = cc.instantiate(this.tip);
                    tip.parent = this.node.parent;
                    tip.getComponent('Tip').setItem('获得E金币')
                    tip.x = this.node.x;
                    tip.y = this.node.y;
                }
            })
        },400)

        this.isOpen = false;
        this.node.on(cc.Node.EventType.TOUCH_START,function (t) {
            Global.ProtocolMgr.queryMillOutput((data)=>{
                let res = eval(data.data.canAccept)
                if(res&&!this.isOpen){
                    if(cc.sys.localStorage.getItem('getEGold')==null){
                        cc.sys.localStorage.setItem('getEGold',1)
                    }
                    //打开宝箱
                    this.isOpen = true;
                    let jumpDown = cc.moveBy(this.duration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
                    this.mineDoor.runAction(jumpDown);
                    let treasureBox = cc.instantiate(this.treasureBox);
                    treasureBox.parent = this.node.parent;
                    treasureBox.x = 187;
                    treasureBox.y = -220;
                    setTimeout(()=>{
                        Global.ProtocolMgr.addEgold()
                        let jump = cc.repeat(cc.sequence(cc.moveBy(1,cc.v2(0,20)),cc.moveBy(1,cc.v2(0,-20))),10)
                        treasureBox.runAction(jump)
                        let count = 0
                        let timer = setInterval(()=>{
                            if(count>=20){
                                clearInterval(timer)
                            }
                            let node = cc.instantiate(this.gold)
                            node.x = treasureBox.x;
                            node.y = treasureBox.y;
                            node.parent = this.node.parent;
                            let dir = dataFunc.randomNum(0,1)==0 ? 1 : -1;
                            node.getComponent('Gold').launch(dir)
                            count++;
                        },20)
                    },500)
                    setTimeout(()=>{
                        console.log('获得金币');
                        let fadeOut = cc.sequence(cc.fadeOut(1),cc.callFunc(this.closeTreasureBox,this,treasureBox));
                        treasureBox.runAction(fadeOut);
                        //关闭宝箱
                        let jumpDown = cc.sequence(cc.moveBy(this.duration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()),cc.callFunc(this.closeFinish,this));
                        this.mineDoor.runAction(jumpDown);
                    },4000)
                }
            })
        },this);
    },
    closeTreasureBox(treasureBox){
        treasureBox.destroy()
    },
    closeFinish(){
        this.isOpen = false;
    },
    start () {

    },

    // update (dt) {},
});
