import ObjectPool from "../../ObjectPool";
import { ResourceType } from "./ResourceType";
import ResourceLayer from "../GameLayer/ResourceLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import ResourceAdd from "./ResourceAdd";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceNode extends cc.Component {
    @property
    resourceType: number = 0;
    private ResourceNumber:number;
    private isExploitRecource:boolean = false;
    private resourceAniTimer;
    private resourceAddTimer;
    onLoad () {
        EventMgr.addEventListener("resourceUpdate",this.resourceUpdate,this);
        if(this.resourceType == 0){
            // this.getNodePoints();
        }
    }
    onEnable(){
        this.ResourceNumber = 1000;
    }
    getNodePoints(){
        let rect = new cc.Rect(this.node.x,this.node.y,this.node.width-cc.pathFindMgr.gx,this.node.height-cc.pathFindMgr.gx);
        let pointArr = [];
        let rectxMin = rect.x - rect.width/2;
        let rectyMin = rect.y - rect.height/2;
        for(let i = 0;i < rect.width/cc.pathFindMgr.gx;i++){
            for(let j = 0;j < rect.height/cc.pathFindMgr.gx;j++){
                let point = {x:rectxMin + i*cc.pathFindMgr.gx,y:rectyMin + j*cc.pathFindMgr.gx};
                pointArr.push(point);
            }
        }
        cc.pathFindMgr.addObstable(pointArr);
    }
    resourceUpdate(){
        if(ResourceLayer.instance.curResourceType != this.resourceType){
            clearInterval(this.resourceAniTimer);
            clearInterval(this.resourceAddTimer);
            ResourceLayer.instance.gaozi.active = false;
            ResourceLayer.instance.futou.active = false;
        }
    }
    startCollect(){
        if(this.resourceType==0){
            ResourceLayer.instance.gaozi.x = this.node.x + ResourceLayer.instance.gaozi.width;
            ResourceLayer.instance.gaozi.y = this.node.y - ResourceLayer.instance.gaozi.height/2;
            ResourceLayer.instance.gaozi.active = true;
        }else{
            ResourceLayer.instance.futou.x = this.node.x + ResourceLayer.instance.futou.width;
            ResourceLayer.instance.futou.y = this.node.y - ResourceLayer.instance.futou.height;
            ResourceLayer.instance.futou.active = true;
        }
        this.resourceAniTimer = setInterval(()=>{
            this.createResourceAddNode();
        },500);
        this.resourceAddTimer = setInterval(()=>{
            if(this.resourceType==0){
                ResourceLayer.instance.addResource(ResourceType.Gold,1);
            }else{
                ResourceLayer.instance.addResource(ResourceType.Wood,1);
            }
            this.ResourceNumber--;
            if(this.ResourceNumber<=0){
                ResourceAdd.instance.chanceResource();
                clearInterval(this.resourceAniTimer);
                clearInterval(this.resourceAddTimer);
                ObjectPool.getInstance().put(this.node);
            }
        },50);
    }
    createResourceAddNode(){
        let objPool = ObjectPool.getInstance();
        let resourceAddNode = objPool.get("reourceAddNode");
        resourceAddNode.getChildByName('label_resNum').getComponent(cc.Label).string = "+10";
        this.node.addChild(resourceAddNode);
        let animation = resourceAddNode.getComponent(cc.Animation);
        animation.play();
        animation.on('finished',()=>{
            ObjectPool.getInstance().put(resourceAddNode);
        },this);
    }
    start () {

    }

    // update (dt) {}
}
