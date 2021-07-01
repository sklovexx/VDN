import childBase from "./childBase";
import { IFolkHoursesData } from "./IBuildingData";
import LocalStorageData from "../../LocalStorageData";
import UserLocalData from "../../UserLocalData";
import UIHelper from "../../UIHelper";
import { dataManager } from "../../Manager/dataManager";
import LocalDataManager from "../../LocalDataManager";
import GameConfig from "../../GameConfig";
import { uiManager } from "../../../framework/ui/UIManager";
import { UIID } from "../../UIConfig";
const {ccclass, property} = cc._decorator;

@ccclass
export default class FolkHourses extends childBase {

    @property(cc.Label)
    label_level: cc.Label = null;
    @property(cc.Label)
    label_people: cc.Label = null;
    @property(cc.Label)
    label_need_gold: cc.Label = null;
    @property(cc.Label)
    label_produceMultiple: cc.Label = null;
    @property(cc.Label)
    label_produceMultiple_need_gold: cc.Label = null;
    @property(cc.Label)
    label_produceTime: cc.Label = null;
    @property(cc.Label)
    label_produceTime_need_gold: cc.Label = null;
    @property(cc.Label)
    label_btn_levelUp: cc.Label = null;
    @property(cc.Node)
    produceMultiple_level:Array<cc.Node> = [];
    @property(cc.Node)
    btn_levelUp:cc.Node = null;
    @property(cc.Node)
    btn_produceTimeLevelUp:cc.Node = null;
    @property(cc.Node)
    btn_produceMultiple_levelUp:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    folkHoursesData: IFolkHoursesData;
    onLoad () {
    }
    setData(){
        // console.log(UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData))
        let data = this.folkHoursesData = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData).sub_building_info["1002"];
        let buildingData = GameConfig.getInstance().getJson('buildingData')["buildingData"].sub_building_info["1002"];
        this.label_level.string = cc.js.formatStr("Lv%s",data.level);
        this.label_people.string = cc.js.formatStr("人口:%s",buildingData.population[data.level]);
        this.label_need_gold.string = cc.js.formatStr("%s",buildingData.need_gold[data.level]);
        this.label_produceMultiple.string = cc.js.formatStr("产出X%s",buildingData.produce_multiple[data.produce_multiple_level]);
        this.label_produceMultiple_need_gold.string = cc.js.formatStr("%s",buildingData.produce_multiple_need_gold[data.produce_multiple_level]);
        this.label_produceTime.string = cc.js.formatStr("减少%s%",buildingData.produce_time[data.produce_time_level]);
        this.label_produceTime_need_gold.string = cc.js.formatStr("%s",buildingData.produce_time_need_gold[data.produce_time_level]);
        for(let i = 0;i<data.produce_multiple_level;i++){
            this.produceMultiple_level[i].active = true;
        }
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
        if(data.produce_time_level>=buildingData.max_produce_time_level){
            let material:cc.Material = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.btn_produceTimeLevelUp.getComponent(cc.Button).interactable = false;
            this.btn_produceTimeLevelUp.getComponent(cc.Sprite).setMaterial(0, material);
        }
        if(data.produce_multiple_level>=buildingData.max_produce_multiple_level){
            let material:cc.Material = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.btn_produceMultiple_levelUp.getComponent(cc.Button).interactable = false;
            this.btn_produceMultiple_levelUp.getComponent(cc.Sprite).setMaterial(0, material);
        }
    }
    onDisable(){
        this.produceMultiple_level.forEach(e=>{
            e.active = false;
        })
    }
    levelUpBtn(event){
        let name = event.target.name;
        switch (name) {
            case "btn_levelUp":
                if(dataManager.gold<parseFloat(this.label_need_gold.string)){
                    uiManager.open(UIID.SystemInfoLayer,"资源不足");
                    return;
                }
                dataManager.gold -= parseFloat(this.label_need_gold.string);
                LocalDataManager.buildingLevelUp("1002");
                break;
            case "btn_produceTimeLevelUp":
                if(dataManager.gold<parseFloat(this.label_produceTime_need_gold.string)){
                    uiManager.open(UIID.SystemInfoLayer,"资源不足");
                    return;
                }
                dataManager.gold -= parseFloat(this.label_produceTime_need_gold.string);
                LocalDataManager.folkHoursesProduceLevelUp("produce_time_level")
                break;
            case "btn_produceMultiple_levelUp":
                if(dataManager.gold<parseFloat(this.label_produceMultiple_need_gold.string)){
                    uiManager.open(UIID.SystemInfoLayer,"资源不足");
                    return;
                }
                dataManager.gold -= parseFloat(this.label_produceMultiple_need_gold.string);
                LocalDataManager.folkHoursesProduceLevelUp("produce_multiple_level")
                break;
            default:
                break;
        }
        this.setData()
    }
    start () {

    }

    // update (dt) {}
}
