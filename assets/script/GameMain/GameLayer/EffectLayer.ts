import ObjectPool from "../../ObjectPool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectLayer extends cc.Component {
    static instance: EffectLayer;
    // LIFE-CYCLE CALLBACKS:
    colorArray = [
        {
            //普通攻击
            color: new cc.Color(255, 255, 255),
            time: 0.5,
            lableSize: 50,
            y: 0,
            labelAnimFun: (labelNode, cfg) => {
                cc.tween(labelNode).to(cfg.time, { position: cc.v2(labelNode.x, labelNode.y + 50), opacity: 0 }).call(() => {
                    ObjectPool.getInstance().put(labelNode);
                }).start();
            }
        },
        //技能攻击
        // {
        //     color: new cc.Color(251, 223, 5),
        //     time: 1,
        //     lableSize: 50,
        //     y: 0,
        //     labelAnimFun: (labelNode, cfg) => {
        //         cc.tween(labelNode).to(cfg.time, { position: cc.v2(labelNode.x, labelNode.y + 50), opacity: 0 }).call(() => {
        //             ObjectPool.getInstance().put(labelNode);
        //         }).start();
        //     }
        // },
        //加血
        {
            color: new cc.Color(15, 255, 0),
            time: 1.5,
            lableSize: 40,
            y: 0,
            labelAnimFun: (labelNode, cfg) => {
                cc.tween(labelNode).to(cfg.time, { position: cc.v2(labelNode.x, labelNode.y + 50), opacity: 0 }).call(() => {
                    ObjectPool.getInstance().put(labelNode);
                }).start();
            }
        }
    ]
    onLoad () {
        EffectLayer.instance = this;
    }
    onDestroy(){
        EffectLayer.instance = null;
    }
    start () {

    }
    addDamageLabel(damageStr: string, worldPos: cc.Vec2 | cc.Vec3, index: number) {
        if (index == 2) {
            this.addCriticalHitLabel(damageStr, worldPos);
            return
        }
        let cfg = this.colorArray[index]
        let labelNode = ObjectPool.getInstance().get("damageLabel");
        let label = labelNode.getComponent(cc.Label);
        labelNode.opacity = 255;
        labelNode.color = cfg.color;
        label.string = damageStr;
        label.fontSize = cfg.lableSize;
        worldPos.y += cfg.y;
        labelNode.setPosition(this.node.convertToNodeSpaceAR(worldPos));
        this.addChildEffectNode(labelNode);
        this.colorArray[index].labelAnimFun(labelNode, cfg);
    }
    addCriticalHitLabel(damageStr: string, worldPos: cc.Vec2 | cc.Vec3) {
        let labelNode = ObjectPool.getInstance().get("criticalHitLabel");
        labelNode.opacity = 255;
        let label = labelNode.getComponent(cc.Label);
        labelNode.setPosition(this.node.convertToNodeSpaceAR(worldPos));
        this.addChildEffectNode(labelNode);
        label.string = damageStr;
        cc.tween(labelNode).to(1.5, { position: cc.v2(labelNode.x, labelNode.y + 50), opacity: 0 }).call(() => {
            ObjectPool.getInstance().put(labelNode);
        }).start();
    }
    addChildEffectNode(effectNode: cc.Node) {
        //TODO:自己存储一次key，不通过getChildByName获取，getChildByName是通过for循环取的
        // let rootNode = this.node.getChildByName(effectNode.name + "_root");
        // if (!rootNode) {
        //     rootNode = new cc.Node;
        //     rootNode.name = effectNode.name + "_root";
        //     rootNode.width = cc.winSize.width;
        //     rootNode.height = cc.winSize.height;
        //     this.node.addChild(rootNode);
        //     if (effectNode.name == "health_bar") rootNode.zIndex = 99;
        // }
        this.node.addChild(effectNode);
    }
    clearAllEffect(){
        this.node.removeAllChildren();
    }
    revive(){
        let children = this.node.children;
        let effectChildren = [];
        children.forEach(e=>{
            effectChildren.push(e);
        })
        for(let i = 0;i < effectChildren.length;i++){
            if(effectChildren[i].name != 'soliderNode' && effectChildren[i].name != 'health_bar'){
                effectChildren[i].removeFromParent();
                effectChildren[i] = null;
            }
        }
    }
    // update (dt) {}
}
