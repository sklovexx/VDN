import ObjectPool from "../../ObjectPool";
import { ResourceType } from "./ResourceType";
import ResourceLayer from "../GameLayer/ResourceLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import  ResourceNode from "./ResourceNode";
import  MenuLayer from "../GameLayer/MenuLayer";
import EffectLayer from "../GameLayer/EffectLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceAdd extends cc.Component {
    static instance:ResourceAdd;
    @property
    resourceType: number = 0;
    private isExploitRecource:boolean = false;

    onLoad () {
        ResourceAdd.instance = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.Touchend, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.Touchend, this);
    }
    onDestroy(){
        ResourceAdd.instance = null;
    }
    private TouchStart(evt: cc.Event.EventTouch){
        this.isExploitRecource = true;
        if(ResourceLayer.instance.curResourceType == this.resourceType){
            return;
        }else{
            ResourceLayer.instance.curResourceType = this.resourceType;
            EventMgr.raiseEvent("resourceUpdate");
        }
        this.chanceResource();
    }
    chanceResource(){
        let rootChildren = EffectLayer.instance.node.children;
        for(let i = 0;i < rootChildren.length;i++){
            let resourceNode = rootChildren[i].getComponent(ResourceNode);
            if(resourceNode&&resourceNode.resourceType==ResourceLayer.instance.curResourceType){
                resourceNode.startCollect();
                return;
            }
        }
    }
    private Touchend(){
        ResourceLayer.instance.curResourceType = null;
        EventMgr.raiseEvent("resourceUpdate");
    }
    start () {
    }
    reStart(){

    }
    // update (dt) {}
}
