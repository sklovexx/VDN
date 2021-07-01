import childBase from "./childBase";
import LocalStorageData from "../../LocalStorageData";
import UserLocalData from "../../UserLocalData";
import IBuilingData from "./IBuildingData";
import ResManager from "../../ResManager";
import { EventMgr } from "../../../framework/common/EventManager";
import BuildingItem from "./childItem/BuildingItem";
import { dataManager } from "../../Manager/dataManager";
import LocalDataManager from "../../LocalDataManager";
import GameConfig from "../../GameConfig";
import { UIID } from "../../UIConfig";
import { uiManager } from "../../../framework/ui/UIManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseBuilding extends childBase {
    @property(cc.Label)
    label_city_level:cc.Label = null;
    @property(cc.Label)
    label_res_add_speed:cc.Label = null;
    @property(cc.Label)
    label_progress_city:cc.Label = null;
    @property(cc.Label)
    label_need_gold:cc.Label = null;
    @property(cc.Label)
    label_btn_levelUp: cc.Label = null;
    @property(cc.ProgressBar)
    progress_need_gold:cc.ProgressBar = null;
    @property(cc.Node)
    sub_building_root:cc.Node = null;
    @property(cc.Node)
    btn_levelUp:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    PlayerCityData: IBuilingData;
    onLoad () {
        EventMgr.addEventListener("updatePlayerCityData",this.setData,this);
    }
    onDestroy(){
        EventMgr.removeEventListener("updatePlayerCityData",this.setData,this);
    }
    start () {
    }
    setData(){
        let data = this.PlayerCityData = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData);
        let buildingData = GameConfig.getInstance().getJson('buildingData')["buildingData"];
        this.label_city_level.string = cc.js.formatStr("繁荣度等级 Lv%s",data.level);
        this.label_res_add_speed.string = cc.js.formatStr("资源产出X%s",buildingData.resource_add_speed[data.level-1]);
        this.progress_need_gold.progress = data.progress/buildingData.needProgress[data.level-1];
        this.label_progress_city.string = cc.js.formatStr("%s/%s",data.progress,buildingData.needProgress[data.level-1]);
        this.label_need_gold.string = cc.js.formatStr("%s",buildingData.need_gold[data.level-1]);
        this.sub_building_root.removeAllChildren();
        let obj = data.sub_building_info;
        for(let i in obj){
            // console.log(i,":",obj[i]);
            let buildingItemPrefab = ResManager.getInstance().getPrefabRes("buildingItem");
            let buildingItemNode = cc.instantiate(buildingItemPrefab);
            buildingItemNode.getComponent(BuildingItem).setData(i);
            this.sub_building_root.addChild(buildingItemNode);
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
        }
    }
    levelUpBtn(){
        if(dataManager.gold<parseFloat(this.label_need_gold.string)){
            uiManager.open(UIID.SystemInfoLayer,"资源不足");
            return;
        }
        if(this.progress_need_gold.progress<1){
            console.log('经验不足');
            return;
        }
        dataManager.gold -= parseFloat(this.label_need_gold.string)
        this.PlayerCityData.level++;
        LocalDataManager.buildingLevelUp();
        this.setData();
    }
    // update (dt) {}
}
