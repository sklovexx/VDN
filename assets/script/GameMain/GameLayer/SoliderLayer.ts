import GameConfig from "../../GameConfig";
import SoliderNode from "../Solider/SoliderNode";
import ObjectPool from "../../ObjectPool";
import Util from "../../Util";
import EffectLayer from "./EffectLayer";
import ResManager from "../../ResManager";
import BaseLayer from "./BaseLayer";
import ResourceLayer from "./ResourceLayer";
import { ResourceType } from "../Resource/ResourceType";
import { tentType } from "../GameLayer/BaseLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SoliderLayer extends cc.Component {
    static instance: SoliderLayer;

    private maxX: number = 0;
    private maxY: number = 0;
    private refreshArray: Array<number>;
    private refreshTime: number;
    topY:number = 0;

    soliderArray: Array<SoliderNode> = new Array;
    soliderCollider: Array<cc.Collider> = new Array;
    baseX:number = -700;
    baseY:number = -800;
    onLoad() {
        SoliderLayer.instance = this;
        this.maxX = 500;
        this.maxY = -cc.winSize.height/12;
        this.topY = this.node.height / 2 +500;
    }
    onDestroy() {
        SoliderLayer.instance = null;
    }
    start () {

    }
    getTopY(){
        return this.topY
    }
    creatorSolider(soliderType,soliderId,level:number,pos) {
        let objPool = ObjectPool.getInstance();
        // let soliderObj = GameConfig.getInstance().getJson("solider")[parseInt(mObj.soldierGrade)-1];
        let soliderNode = objPool.get("soliderNode");
        soliderNode.setPosition(pos.x,pos.y);
        let soliderScript = soliderNode.getComponent(SoliderNode);
        soliderScript.setSoliderData(soliderType,soliderId,level);
        let healthBarNode = null;
        healthBarNode = objPool.get("health_bar");
        healthBarNode.y = 5000;//资源复用时不会在屏幕上闪烁一次
        EffectLayer.instance.addChildEffectNode(healthBarNode);
        soliderScript.setHealthBarNode(healthBarNode);
        this.addChildSoliderNode(soliderNode, 1);
        this.soliderArray.push(soliderScript);
    }
    /**获取士兵模型 */
    getSoliderModel(modelName: string) {
        return ResManager.getInstance().getSkeletonData(modelName);
    }
    private addChildSoliderNode(soliderNode: cc.Node, soliderId: number) {
        // let nodeName = "solider_" + soliderId;
        // let rootNode = this.node.getChildByName(nodeName);
        // if (!rootNode) {
        //     rootNode = new cc.Node;
        //     rootNode.name = nodeName;
        //     rootNode.width = cc.winSize.width;
        //     rootNode.height = cc.winSize.height;
        //     this.node.addChild(rootNode);
        // }
        // rootNode.addChild(soliderNode);
        EffectLayer.instance.addChildEffectNode(soliderNode);
    }
    addSoliderArray(mScript: SoliderNode) {
        this.soliderArray.push(mScript);
    }
    spliceSoliderArray(mScript: SoliderNode) {
        switch (mScript.soliderType) {
            case tentType.Footmen:
                ResourceLayer.instance.footmenNumber--;
                break;
            case tentType.Archers:
                ResourceLayer.instance.archersNumber--;
                break;
            case tentType.Horsemen:
                ResourceLayer.instance.horsemenNumber--;
                break;
            default:
                break;
        }
        this.soliderArray.splice(this.soliderArray.indexOf(mScript), 1);
    }
    addSoliderColliderArr(soliderCollider: cc.Collider) {
        this.soliderCollider.push(soliderCollider);
    }

    spliceSoliderColliderArr(soliderCollider: cc.Collider) {
        this.soliderCollider.splice(this.soliderCollider.indexOf(soliderCollider), 1);
    }
    clearAllSolider(){
        // this.node.removeAllChildren();
        this.soliderArray = [];
        this.soliderCollider = [];
    }
    // update (dt) {}
}
