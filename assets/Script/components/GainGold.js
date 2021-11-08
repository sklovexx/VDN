// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //飞的金币预制
        coinpre: cc.Prefab,
        //目标节点
        coinNode: cc.Node,
        //生成金币个数
        createcoin: 20,
        //随机范围(random1~random2之间)
        random1:-200,
        random2:200,
        //随机范围(random1~random2之间)
        createTime: 0.15,
        //停留时间
        standingTime: 0.2,
        //金币移动速度
        coinSpeed: 1000
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    onPlayCoinAni(callback) {
        let tempPlayer = cc.v2(0,0)
        for (let i = 0; i < this.createcoin; i++) {
            let pre = cc.instantiate(this.coinpre)
            pre.parent = this.node
            pre.setPosition(tempPlayer)
            let rannumx = Math.floor(Math.random() * (this.random2 - this.random1 + 1) + this.random1)
            let rannumy = Math.floor(Math.random() * (this.random2 - this.random1 + 1) / 1.5 + this.random1 / 1.5)
            pre.runAction(cc.moveBy(this.createTime, rannumx, rannumy))
            this.scheduleOnce(() => {
                pre.stopAllActions()
                let finshend = cc.callFunc(function () {
                    pre.destroy()
                    // this.coinNode.getComponent(cc.Animation).play()
                    if (i == this.createcoin - 1) {
                        //结束
                        this.scheduleOnce(() => {
                            callback()
                        }, 0.5)
                    }
                }, this);
                let pos = pre.getPosition()
                let coinpos = this.coinNode.getPosition()
                let playTime = pos.sub(coinpos).mag() / this.coinSpeed
                pre.runAction(cc.sequence(cc.moveTo(playTime, coinpos.x, coinpos.y), finshend))
            }, this.standingTime + this.createTime);

        }
    },
    start () {

    },

    // update (dt) {},
});
