import LocalStorageData from "../LocalStorageData";
import UserLocalData from "../UserLocalData";
import IBuilingData from "./childLayer/IBuildingData";
import UIHelper from "../UIHelper";
import { uiManager } from "../../framework/ui/UIManager";
import { UIID } from "../UIConfig";
import { dataManager } from "../Manager/dataManager";
import { EventMgr } from "../../framework/common/EventManager";
import LocalDataManager from "../LocalDataManager";
import GameManager from "../GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {
    static instance:Hall;
    @property(cc.Label)
    label_gold: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:
    public set gold(value:number){
        this.label_gold.string = cc.js.formatStr("%s", Math.round(value));
    }
    PlayerCityData: IBuilingData;
    onLoad () {
        Hall.instance = this;
        UIHelper.bindComponent(this,this.node,"onClick");
        EventMgr.addEventListener("updateGold",this.updateData,this);
        EventMgr.raiseEvent("startColectRes");
    }
    onDestroy(){
        Hall.instance = null;
        EventMgr.removeEventListener("updateGold",this.updateData,this);
    }
    onClick(event){
        let name = event.target.name;
        switch (name) {
            case '_btn_base_building':
                uiManager.open(UIID.BaseBuilding);
                break;
            case '_btn_study':
                if(this.PlayerCityData.sub_building_info["1001"].level<=0){
                    uiManager.open(UIID.SystemInfoLayer,"建筑未解锁");
                    return;
                }
                uiManager.open(UIID.Technology);
                break;
            case '_btn_folk_hourses':
                if(this.PlayerCityData.sub_building_info["1002"].level<=0){
                    uiManager.open(UIID.SystemInfoLayer,"建筑未解锁");
                    return;
                }
                uiManager.open(UIID.FolkHourses);
                break;
            case '_btn_checkPoint':
                uiManager.open(UIID.CheckPoint);
                break;
            default:
                break;
        }
    }
    start () {
        this.PlayerCityData = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData);
        this.updateData()
    }
    updateData(){
        this.gold = dataManager.gold;
    }
    // update (dt) {}
}
