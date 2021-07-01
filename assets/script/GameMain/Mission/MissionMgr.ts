import { dataManager } from "../../Manager/dataManager";
import BaseLayer from "../GameLayer/BaseLayer";
const {ccclass} = cc._decorator;

@ccclass
export default class MissionMgr {

    // LIFE-CYCLE CALLBACKS:

    static missionMgr: Array<any> = [];
    static registerMission(missionType: string,index:number){
        let check:Function;
        switch (missionType) {
            case "300秒内通关":
                let startGameTime = new Date().getTime();
                check = ()=>{
                    let endTime = new Date().getTime();
                    let target = 600 * 1000;
                    if(endTime - startGameTime  <= target){
                        dataManager.levelStar++;
                        dataManager.missionResult[index] = true;
                    }
                }
                this.missionMgr.push(check);
                break;
            case "城堡剩余血量100%":
                check = ()=>{
                    if(BaseLayer.instance.healthValue >= BaseLayer.instance.maxHealthValue){
                        dataManager.levelStar++;
                        dataManager.missionResult[index] = true;
                    }
                }
                this.missionMgr.push(check);
                break;
            case "击败所有敌人":
                check = ()=>{
                    dataManager.levelStar++;
                    dataManager.missionResult[index] = true;
                }
                this.missionMgr.push(check);
                break;
            default:
                break;
        }
    }
    static checkCompeleteMission(){
        this.missionMgr.forEach(e=>{
            e();
        })
    }
    // update (dt) {}
}
