import { UIView } from "../../../framework/ui/UIView";
import ObjectPool from "../../ObjectPool";
import GameMainLayer from "./GameMainLayer";
import EnemyLayer from "./EnemyLayer";
import SoliderLayer from "./SoliderLayer";
import EffectLayer from "./EffectLayer";
import BaseLayer from "./BaseLayer";
import ResourceLayer from "./ResourceLayer";
import { uiManager } from "../../../framework/ui/UIManager";
import { dataManager } from "../../Manager/dataManager";
import { EventMgr } from "../../../framework/common/EventManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EndLayer extends UIView {


    @property(cc.Label)
    label_title: cc.Label = null;
    @property(cc.Label)
    label_mission: Array<cc.Label> = [];
    @property(cc.Node)
    missions: Array<cc.Node> = [];
    @property(cc.Node)
    starBottom: Array<cc.Node> = [];
    @property(cc.Node)
    stars: Array<cc.Node> = [];
    @property(cc.Node)
    restartBtn: cc.Node = null;
    @property(cc.Node)
    reviveBtn: cc.Node = null;
    successLabel: Array<string> = [
        "击败所有敌人",
        "300秒内通关",
        "城堡剩余血量100%"
    ];
    fileLabel: Array<string> = [
        "提升科技",
        "发展人口",
        "升级建筑"
    ];
    onLoad () {
        
    }

    start () {

    }
    onOpen(fromUI: number, ...arg): void {
        console.log(arg[0])
        this.restartBtn.active = arg[0];
        this.reviveBtn.active = !arg[0];
        for(let i = 0;i < 3;i++){
            this.starBottom[i].active = arg[0];
            this.stars[i].active = false;
            this.label_mission[i].string = "";
            this.missions[i].active = arg[0];
            this.missions[i].getChildByName("gou_icon").active = false;
        }
        if(arg[0]){
            this.label_title.string = "成功通关";
            for(let i = 0;i < this.successLabel.length;i++){
                this.label_mission[i].node.anchorX = 0;
                this.label_mission[i].node.x = -254;
                this.label_mission[i].string = this.successLabel[i];
            }
            for(let i = 0;i < dataManager.levelStar;i++){
                this.stars[i].active = true;
            }
            dataManager.missionResult.forEach((e,i)=>{
                this.missions[i].getChildByName("gou_icon").active = e;
            })
        }else{
            this.label_title.string = "守卫失败";
            for(let i = 0;i < this.fileLabel.length;i++){
                this.label_mission[i].node.anchorX = 0.5;
                this.label_mission[i].node.x = 0;
                this.label_mission[i].string = this.fileLabel[i];
            }
        }
        GameMainLayer.instance.pause();
    }

    onClose() {
    }
    reStart(){
        EnemyLayer.instance.restart();
        SoliderLayer.instance.clearAllSolider();
        EffectLayer.instance.clearAllEffect();
        BaseLayer.instance.reStart();
        ResourceLayer.instance.reStart();
        GameMainLayer.instance.resume();
        uiManager.close(this);
    }
    backHall(){
        EventMgr.raiseEvent("backHall");
    }
    revive(){
        EnemyLayer.instance.revive();
        EffectLayer.instance.revive();
        BaseLayer.instance.revive();
        ResourceLayer.instance.revive();
        GameMainLayer.instance.resume();
        uiManager.close(this);
    }
    // update (dt) {}
}
