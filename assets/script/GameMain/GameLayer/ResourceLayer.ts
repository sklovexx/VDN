
import { ResourceType } from "../Resource/ResourceType";
import { EventMgr } from "../../../framework/common/EventManager";
import GameMainLayer from "./GameMainLayer";
import ObjectPool from "../../ObjectPool";
import MenuLayer from "./MenuLayer";
import ResourceNode from "../Resource/ResourceNode";
import EffectLayer from "./EffectLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceLayer extends cc.Component {
    static instance:ResourceLayer;
    @property(cc.Label)
    label_gold:cc.Label = null;
    @property(cc.Label)
    label_wood:cc.Label = null;
    @property(cc.Node)
    futou:cc.Node = null;
    @property(cc.Node)
    gaozi:cc.Node = null;
    @property(cc.Node)
    obstableRoot:cc.Node = null;
    @property(cc.Node)
    resourcesRoot:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    _goldNumber:number = 0;
    public get goldNumber(): number {
        return this._goldNumber;
    }
    public set goldNumber(value: number) {
        this.label_gold.string = cc.js.formatStr("%s", Math.round(value));
        let calculateValue = Math.round(value*100)/100;
        this._goldNumber = calculateValue;
    }
    _woodNumber:number = 0;
    public get woodNumber(): number {
        return this._woodNumber;
    }
    public set woodNumber(value: number) {
        this.label_wood.string = cc.js.formatStr("%s", Math.round(value));
        let calculateValue = Math.round(value*100)/100;
        this._woodNumber = calculateValue;
    }
    curResourceType:ResourceType;
    bg0Res:Array<any> = [
        {x: 319.881, y: 10.815, resourceType: 1, img:'shu_03'},
        {x: 410.006, y: 652.836, resourceType: 0, img:'kuangjin'},
        {x: 216.887, y: 726.035, resourceType: 1, img:'shu_03'},
        {x: 255.823, y: 615.198, resourceType: 1, img:'shu_03'},
        {x: 122.281, y: 589.803, resourceType: 1, img:'shu_03'},
        {x: 122.281, y: 589.803, resourceType: 1, img:'shu_03'},
        {x: 183.26, y: 401.305, resourceType: 0, img:'kuangjin'},
        {x: 310.368, y: 276, resourceType: 1, img:'shu_03'},
        {x: 429.332, y: 542.174, resourceType: 1, img:'shu_03'},
        {x: 338.271, y: 394.589, resourceType: 1, img:'shu_03'},
        {x: 455.427, y: 162.443, resourceType: 1, img:'shu_03'},
        {x: -391.404, y: -600, resourceType: 0, img: "kuangjin"},
        {x: -300.306, y: -650, resourceType: 1, img: "shu_03"},
        {x: -448.958, y: -650, resourceType: 1, img: "shu_03"},
    ]
    bg1Res:Array<any> = [
        {x: 389.069, y: 614.278, resourceType: 0, img: "kuangjin"},
        {x: 195.95, y: 687.477, resourceType: 1, img: "shu_01"},
        {x: 234.886, y: 576.64, resourceType: 1, img: "shu_01"},
        {x: 267.525, y: 372.802, resourceType: 0, img: "kuangjin"},
        {x: 266.232, y: 237.442, resourceType: 1, img: "shu_01"},
        {x: 101.344, y: 551.245, resourceType: 1, img: "shu_01"},
        {x: 101.344, y: 551.245, resourceType: 1, img: "shu_01"},
        {x: 68.719, y: 407.542, resourceType: 1, img: "shu_01"},
        {x: 111.369, y: 309.677, resourceType: 1, img: "shu_01"},
        {x: -465.93, y: 177.068, resourceType: 1, img: "shu_01"},
        {x: -428.313, y: 16.957, resourceType: 1, img: "shu_01"},
        {x: -472.738, y: -90.403, resourceType: 1, img: "shu_01"},
        {x: -80.085, y: 567.249, resourceType: 1, img: "shu_01"},
        {x: 408.395, y: 503.616, resourceType: 1, img: "shu_01"},
        {x: -391.404, y: -559.962, resourceType: 0, img: "kuangjin"},
        {x: 472.814, y: 356.031, resourceType: 1, img: "shu_01"},
        {x: -457.19, y: -313.433, resourceType: 1, img: "shu_01"},
        {x: -239.492, y: -452.929, resourceType: 1, img: "shu_01"},
        {x: -300.306, y: -627.009, resourceType: 1, img: "shu_01"},
        {x: -448.958, y: -627.009, resourceType: 1, img: "shu_01"},
    ]
    onLoad () {
        ResourceLayer.instance = this;
        this.goldNumber = 500;
        this.woodNumber = 500;
        this.addObstable();
    }
    onDestroy(){
        ResourceLayer.instance = null;
    }
    addResource(resourceType:ResourceType,number:number){
        if(resourceType == ResourceType.Gold){
            this.goldNumber = this._goldNumber + number;
        }else{
            this.woodNumber = this._woodNumber + number;
        }
    }
    start () {
        this.tabBg(1);
    }
    tabBg(index){
        let objPool = ObjectPool.getInstance();
        if(index == 0){
            this.bg0Res.forEach(e=>{
                let resourceNode = objPool.get("resourceNode");
                let resourceNodeScript = resourceNode.getComponent(ResourceNode);
                resourceNodeScript.setResourceData(e);
                EffectLayer.instance.addChildEffectNode(resourceNode);
            })
        }else{
            this.bg1Res.forEach(e=>{
                let resourceNode = objPool.get("resourceNode");
                let resourceNodeScript = resourceNode.getComponent(ResourceNode);
                resourceNodeScript.setResourceData(e);
                EffectLayer.instance.addChildEffectNode(resourceNode);
            })
        }
    }
    addObstable(){
        this.obstableRoot.children.forEach(e=>{
            cc.pathFindMgr.addObstable(e.getComponent(cc.PolygonCollider).points);
        })
    }
    removeObstable(){
        this.obstableRoot.children.forEach(e=>{
            cc.pathFindMgr.removeObstable(e.getComponent(cc.PolygonCollider).points);
        })
    }
    reStart(){
        this.goldNumber = 500;
        this.woodNumber = 500;
        this.tabBg(MenuLayer.instance.bg);
    }
    // update (dt) {}
}
