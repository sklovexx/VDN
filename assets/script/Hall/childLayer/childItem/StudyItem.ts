import { dataManager } from "../../../Manager/dataManager";
import LocalDataManager from "../../../LocalDataManager";
import GameConfig from "../../../GameConfig";
import LocalStorageData from "../../../LocalStorageData";
import UserLocalData from "../../../UserLocalData";
import { uiManager } from "../../../../framework/ui/UIManager";
import { UIID } from "../../../UIConfig";
const {ccclass, property} = cc._decorator;

@ccclass
export default class StudyItem extends cc.Component {

    @property(cc.Label)
    label_name: cc.Label = null;
    @property(cc.Label)
    label_effect: cc.Label = null;
    @property(cc.Label)
    label_needGold: cc.Label = null;
    @property(cc.Label)
    label_btn_levelUp: cc.Label = null;
    @property(cc.Node)
    btn_levelUp: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    id:string;
    start () {

    }
    setData(id){
        this.id = id;
        let data = UserLocalData.getLocalStorage(LocalStorageData.PlayerStudyData)[this.id];
        let studyData = GameConfig.getInstance().getJson("studyData")["studyData"][this.id];
        this.label_name.string = cc.js.formatStr("%sLv%s",studyData.name,data.level);
        this.label_effect.string = cc.js.formatStr("%s%s",studyData.description,studyData.value[data.level]);
        this.label_needGold.string = cc.js.formatStr("%s",studyData.need_gold[data.level]);
        if(data.level<=0){
            this.label_btn_levelUp.string = "解锁";
        }else{
            this.label_btn_levelUp.string = "升级";
        }
        if(data.level>=studyData.max_level){
            let material:cc.Material = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.btn_levelUp.getComponent(cc.Button).interactable = false;
            this.btn_levelUp.getComponent(cc.Sprite).setMaterial(0, material);
            this.label_btn_levelUp.string = "已满级";
            this.label_needGold.string = "";
        }
    }
    levelUpBtn(){
        if(dataManager.gold<parseFloat(this.label_needGold.string)){
            uiManager.open(UIID.SystemInfoLayer,"资源不足");
            return;
        }
        dataManager.gold -= parseFloat(this.label_needGold.string);
        LocalDataManager.studyLevelUp(this.id);
        this.setData(this.id);
    }
    // update (dt) {}
}
