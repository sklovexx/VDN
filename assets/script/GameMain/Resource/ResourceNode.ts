import ObjectPool from "../../ObjectPool";
import { ResourceType } from "./ResourceType";
import ResourceLayer from "../GameLayer/ResourceLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import ResourceAdd from "./ResourceAdd";
import { audioMgr } from "../../../framework/audio/AudioMgr";
import ResManager from "../../ResManager";
import MenuLayer from "../GameLayer/MenuLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceNode extends cc.Component {
    @property
    resourceType: number = 0;
    private ResourceNumber:number;
    private isExploitRecource:boolean = false;
    private resourceAniTimer;
    private resourceAddTimer;
    private audioID:number;
    private spriteFrame:cc.SpriteFrame;
    private futouAni;
    private gaoziAni;
    onLoad () {
        EventMgr.addEventListener("resourceUpdate",this.resourceUpdate,this);
        this.node.zIndex = -this.node.y;
        this.futouAni = cc.tween(ResourceLayer.instance.futou).repeatForever(
            cc.tween(ResourceLayer.instance.futou)
            .to(0.125,{angle:-45})
            .to(0.25,{angle:45})
            .call(()=>{
                audioMgr.playEffect('cut_tree');
            })
            .to(0.25,{angle:0})
        )
        this.gaoziAni = cc.tween(ResourceLayer.instance.gaozi).repeatForever(
            cc.tween(ResourceLayer.instance.gaozi)
            .to(0.125,{angle:-45})
            .to(0.25,{angle:45})
            .call(()=>{
                audioMgr.playEffect('mining');
            })
            .to(0.25,{angle:0})
        )
    }
    onEnable(){
        if(this.resourceType == 0){
            cc.pathFindMgr.addObstable(this.getNodePoints());
            this.spriteFrame = ResManager.getInstance().getSpriteFrameRes("coolect_gold");
        }else{
            this.spriteFrame = ResManager.getInstance().getSpriteFrameRes("coolect_wood");
        }
        this.ResourceNumber = 1000;
    }
    setResourceData(data){
        this.node.getComponent(cc.Sprite).spriteFrame = ResManager.getInstance().getSpriteFrameRes(data.img);
        this.node.x = data.x;
        this.node.y = data.y;
        this.resourceType = data.resourceType;
    }
    onDisable(){
        if(this.resourceType == 0){
            cc.pathFindMgr.removeObstable(this.getNodePoints());
        }
    }
    getNodePoints(){
        let rect = new cc.Rect(this.node.x,this.node.y + this.node.height/2,this.node.width+200-cc.pathFindMgr.gx,this.node.height-cc.pathFindMgr.gx);
        let pointArr = [];
        let rectxMin = rect.x - rect.width/2;
        let rectyMin = rect.y - rect.height/2;
        for(let i = 0;i < rect.width/cc.pathFindMgr.gx;i++){
            for(let j = 0;j < rect.height/cc.pathFindMgr.gx;j++){
                let point = {x:rectxMin + i*cc.pathFindMgr.gx,y:rectyMin + j*cc.pathFindMgr.gx};
                pointArr.push(point);
            }
        }
        return pointArr
    }
    resourceUpdate(){
        if(ResourceLayer.instance.curResourceType != this.resourceType){
            this.endCollect();
        }
    }
    endCollect(){
        clearInterval(this.resourceAniTimer);
        clearInterval(this.resourceAddTimer);
        ResourceLayer.instance.gaozi.active = false;
        ResourceLayer.instance.futou.active = false;
        this.gaoziAni.stop();
        this.futouAni.stop();
    }
    startCollect(){
        if(this.resourceType==0){
            ResourceLayer.instance.gaozi.x = this.node.x + ResourceLayer.instance.gaozi.width;
            ResourceLayer.instance.gaozi.y = this.node.y + ResourceLayer.instance.futou.height;
            ResourceLayer.instance.gaozi.active = true;
            this.gaoziAni.start();
        }else{
            ResourceLayer.instance.futou.x = this.node.x + ResourceLayer.instance.futou.width;
            ResourceLayer.instance.futou.y = this.node.y + ResourceLayer.instance.futou.height/2;
            ResourceLayer.instance.futou.active = true;
            this.futouAni.start();
        }
        this.resourceAniTimer = setInterval(()=>{
            this.createResourceAddNode();
        },500/MenuLayer.instance.curSpeed);
        this.resourceAddTimer = setInterval(()=>{
            if(this.resourceType==0){
                ResourceLayer.instance.addResource(ResourceType.Gold,1 * MenuLayer.instance.curSpeed);
            }else{
                ResourceLayer.instance.addResource(ResourceType.Wood,1 * MenuLayer.instance.curSpeed);
            }
            this.ResourceNumber-= 1 * MenuLayer.instance.curSpeed;
            if(this.ResourceNumber<=0){
                this.endCollect();
                ObjectPool.getInstance().put(this.node);
                ResourceAdd.instance.chanceResource();
            }
        },50);
    }
    createResourceAddNode(){
        let objPool = ObjectPool.getInstance();
        let resourceAddNode = objPool.get("reourceAddNode");
        resourceAddNode.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.spriteFrame;
        resourceAddNode.getChildByName('label_resNum').getComponent(cc.Label).string = "+10";
        resourceAddNode.opacity = 255;
        resourceAddNode.x = this.node.x;
        resourceAddNode.y = this.node.y;
        ResourceLayer.instance.resourcesRoot.addChild(resourceAddNode);
        cc.tween(resourceAddNode)
            .by(0.3,{y:100})
            .by(0.3,{y:100,opacity:-255})
            .call(()=>{
                ObjectPool.getInstance().put(resourceAddNode);
            })
            .start()
    }
    start () {

    }

    // update (dt) {}
}
