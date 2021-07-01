import { uiManager } from "../../../../framework/ui/UIManager";
import { UIID } from "../../../UIConfig";
import { dataManager } from "../../../Manager/dataManager";
import LocalDataManager from "../../../LocalDataManager";
import { EventMgr } from "../../../../framework/common/EventManager";
import GameConfig from "../../../GameConfig";
import LocalStorageData from "../../../LocalStorageData";
import UserLocalData from "../../../UserLocalData";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingItem extends cc.Component {

    @property(cc.Label)
    label_name: cc.Label = null;
    @property(cc.Label)
    label_level: cc.Label = null;
    @property(cc.Label)
    label_res_add_speed: cc.Label = null;
    @property(cc.Label)
    label_need_gold: cc.Label = null;
    @property(cc.Label)
    label_btn_levelUp: cc.Label = null;
    @property(cc.Node)
    btn_levelUp: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    buildingData:any;
    curBuildingId:string = '';
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this)

    }
    onClick(){
        let data = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData).sub_building_info[this.curBuildingId];
        if(data.level<=0){
            uiManager.open(UIID.SystemInfoLayer,"建筑未解锁");
            return;
        }
        switch (this.curBuildingId) {
            case "1002":
                uiManager.open(UIID.FolkHourses);
                break;
            case "1001":
                uiManager.open(UIID.Technology);
                break;
            default:
                break;
        }
    }
    start () {

    }
    setData(buildingId){
        this.curBuildingId = buildingId;
        let data = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData).sub_building_info[this.curBuildingId];
        let buildingData = GameConfig.getInstance().getJson('buildingData')["buildingData"].sub_building_info[buildingId];
        this.label_name.string = cc.js.formatStr("%s",buildingData.name);
        this.label_level.string = cc.js.formatStr("Lv%s",data.level);
        this.label_res_add_speed.string = cc.js.formatStr("%s/次",buildingData.resource_add_speed[data.level]);
        this.label_need_gold.string = cc.js.formatStr("%s",buildingData.need_gold[data.level]);
        if(data.level<=0){
            this.label_btn_levelUp.string = "解锁";
        }else{
            this.label_btn_levelUp.string = "升级";
        }
        if(data.level>=buildingData.max_level){
            let material:cc.Material = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.btn_levelUp.getComponent(cc.Button).interactable = false;
            this.btn_levelUp.getComponent(cc.Sprite).setMaterial(0, material);
            this.label_btn_levelUp.string = "已满级";
            this.label_need_gold.string = "";
        }
    }
    levelUpBtn(){
        if(dataManager.gold<parseFloat(this.label_need_gold.string)){
            uiManager.open(UIID.SystemInfoLayer,"资源不足");
            return;
        }
        dataManager.gold -= parseFloat(this.label_need_gold.string);
        LocalDataManager.buildingLevelUp(this.curBuildingId);
        this.setData(this.curBuildingId);
        EventMgr.raiseEvent("updatePlayerCityData");
    }
    // update (dt) {}
}
