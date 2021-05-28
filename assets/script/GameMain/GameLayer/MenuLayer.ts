import { ResourceType } from "../Resource/ResourceType";
import ResourceLayer from "../GameLayer/ResourceLayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuLayer extends cc.Component {
    static instance: MenuLayer;
    curSpeed:number = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        MenuLayer.instance = this;
    }
    onDestroy(){
        MenuLayer.instance = null;
    }
    start () {

    }
    speedUpdate(){
        if(this.curSpeed == 1){
            this.curSpeed = 2;
        }else{
            this.curSpeed = 1;
        }
        console.log(this.curSpeed)
        //@ts-ignore
        cc.kSpeed(this.curSpeed);
    }
    addResource(){
        ResourceLayer.instance.addResource(ResourceType.Gold,500);
        ResourceLayer.instance.addResource(ResourceType.Wood,500);
    }
    
    // update (dt) {}
}
