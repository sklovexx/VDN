
cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Prefab,
        content:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onEnable(){
        let children = this.content.children;
        children.forEach(value =>{
            value.destroy();
        })
        let backPack = GameData.GuoShiData;
        let sum = 0;
        backPack.forEach(value => {
            let node = cc.instantiate(this.item);
            node.parent = this.content;
            let id = value.id + '';
            node.getChildByName('Count').getComponent(cc.Label).string = value.count
            let price = parseInt(dataFunc.queryValue('zhongzi',"price",id))*value.count
            sum+=price;
            node.getChildByName('Price').getComponent(cc.Label).string = '可售'+price+'ECC'
        })
        this.node.getChildByName('TotalPrice').getComponent(cc.Label).string = '当前可售出'+sum+'ECC'
    },
    saleing(){
        Global.ProtocolMgr.saleGuoShi(()=>{
            this.node.active = false;
            cc.find('Canvas/GainGold').getComponent('GainGold').onPlayCoinAni(()=>{
                console.log('获得金币')
            })
            console.log('卖出果实')
            Global.PageMgr.closeAllPages()
            Global.PageMgr.showTipPage('成功售出果实')
        })
    }
    // update (dt) {},
});
