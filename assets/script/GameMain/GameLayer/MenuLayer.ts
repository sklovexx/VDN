import { ResourceType } from "../Resource/ResourceType";
import ResourceLayer from "../GameLayer/ResourceLayer";
import GameMainLayer from "./GameMainLayer";
import EnemyLayer from "./EnemyLayer";
import SoliderLayer from "./SoliderLayer";
import EffectLayer from "./EffectLayer";
import BaseLayer from "./BaseLayer";
import { uiManager } from "../../../framework/ui/UIManager";
import { EventMgr } from "../../../framework/common/EventManager";
import { dataManager } from "../../Manager/dataManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuLayer extends cc.Component {
    static instance: MenuLayer;
    @property(cc.Node)
    resourceRoot: Array<cc.Node> = [];
    curSpeed:number = 1;

    // LIFE-CYCLE CALLBACKS:
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
    reviveSolider(){
        EventMgr.raiseEvent("reviveSolider");
    }
    tabMap(){
        if(dataManager.checkpointID == 1000){
            dataManager.checkpointID = 1001;
            // ResourceLayer.instance.addObstable();
        }else{
            dataManager.checkpointID = 1000;
            // ResourceLayer.instance.removeObstable();
        }
        EventMgr.raiseEvent("tabMap");
        EnemyLayer.instance.initCheckPointEnemy();
        EnemyLayer.instance.clearAllEnemy();
        SoliderLayer.instance.clearAllSolider();
        EffectLayer.instance.clearAllEffect();
        BaseLayer.instance.reStart();
        GameMainLayer.instance.resume();
        GameMainLayer.instance.initCheckPointData();
        ResourceLayer.instance.initCheckpointData();
        ResourceLayer.instance.initData();
    }
    // update (dt) {}
}
