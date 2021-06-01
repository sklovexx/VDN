import { ResourceType } from "../Resource/ResourceType";
import ResourceLayer from "../GameLayer/ResourceLayer";
import GameMainLayer from "./GameMainLayer";
import EnemyLayer from "./EnemyLayer";
import SoliderLayer from "./SoliderLayer";
import EffectLayer from "./EffectLayer";
import BaseLayer from "./BaseLayer";
import { uiManager } from "../../../framework/ui/UIManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuLayer extends cc.Component {
    static instance: MenuLayer;
    @property(cc.Node)
    resourceRoot: Array<cc.Node> = [];
    curSpeed:number = 1;

    // LIFE-CYCLE CALLBACKS:
    bg:number = 0;
    onLoad () {
        MenuLayer.instance = this;
        this.node.zIndex = 999;
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
    tabMap(){
        if(this.bg==0){
            this.bg = 1;
            cc.find("Canvas/bg").active = false;
            cc.find("Canvas/bg2").active = true;
            this.resourceRoot[0].active = false;
            this.resourceRoot[1].active = true;
        }else{
            this.bg = 0;
            this.resourceRoot[1].active = false;
            this.resourceRoot[0].active = true;
            cc.find("Canvas/bg").active = true;
            cc.find("Canvas/bg2").active = false;
        }
        EnemyLayer.instance.clearAllEnemy();
        SoliderLayer.instance.clearAllSolider();
        EffectLayer.instance.clearAllEffect();
        BaseLayer.instance.reStart();
        GameMainLayer.instance.resume();
    }
    // update (dt) {}
}
