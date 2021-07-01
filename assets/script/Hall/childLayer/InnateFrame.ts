import childBase from "./childBase";
import { UIView } from "../../../framework/ui/UIView";
import { dataManager } from "../../Manager/dataManager";
import LocalDataManager from "../../LocalDataManager";
import { uiManager } from "../../../framework/ui/UIManager";
import { UIID } from "../../UIConfig";
import { EventMgr } from "../../../framework/common/EventManager";
import LocalStorageData from "../../LocalStorageData";
import UserLocalData from "../../UserLocalData";
import GameConfig from "../../GameConfig";
const {ccclass, property} = cc._decorator;

@ccclass
export default class InnateFrame extends UIView {

    @property(cc.Node)
    innateStars: Array<cc.Node> = [];
    @property(cc.Label)
    label_innate_name: cc.Label = null;
    @property(cc.Label)
    label_innate_effect: cc.Label = null;
    @property(cc.Label)
    label_star_number: cc.Label = null;
    @property(cc.Label)
    label_btn_levelUp: cc.Label = null;
    @property(cc.Node)
    btn_levelUp:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    id:string;
    // onLoad () {}

    start () {

    }
    onOpen(fromUI: number, ...arg): void {
        let material:cc.Material = cc.Material.getBuiltinMaterial('2d-sprite');
        this.btn_levelUp.getComponent(cc.Button).interactable = true;
        this.btn_levelUp.getComponent(cc.Sprite).setMaterial(0, material);
        this.setData(arg[0]);
    }
    setData(id){
        this.id = id;
        let data = UserLocalData.getLocalStorage(LocalStorageData.PlayerInnateData)[this.id];
        let innateData = GameConfig.getInstance().getJson("innateData")["innateData"][this.id];
        this.label_innate_name.string = cc.js.formatStr("%s",innateData.name);
        this.label_innate_effect.string = cc.js.formatStr("%s%s→%s",innateData.description,innateData.value[data.level-1]||0,innateData.value[data.level]||"");
        this.label_star_number.string = cc.js.formatStr("%s/99",dataManager.starNumber);
        for(let i = 0;i<data.level;i++){
            this.innateStars[i].active = true;
        }
        this.label_btn_levelUp.string = "升级";
        if(data.level>=innateData.max_level){
            let material:cc.Material = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.btn_levelUp.getComponent(cc.Button).interactable = false;
            this.btn_levelUp.getComponent(cc.Sprite).setMaterial(0, material);
            this.label_btn_levelUp.string = "已满级";
        }
    }
    onClose(){
        this.innateStars.forEach(e=>{
            e.active = false;
        })
        this.label_innate_name.string = "";
        this.label_innate_effect.string = "";
        this.label_star_number.string = "";
    }
    levelUpBtn(){
        if(dataManager.starNumber<=0){
            uiManager.open(UIID.SystemInfoLayer,"星星不足");
            return;
        }
        LocalDataManager.innateLevelUp(this.id);
        this.setData(this.id);
        EventMgr.raiseEvent("updateInnateData");
    }
    // update (dt) {}
}
