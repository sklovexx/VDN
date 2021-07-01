import childBase from "./childBase";
import { IFolkHoursesData } from "./IBuildingData";
import LocalStorageData from "../../LocalStorageData";
import UserLocalData from "../../UserLocalData";
import { ITechnologyData } from "./IBuildingData";
import ResManager from "../../ResManager";
import StudyItem from "./childItem/StudyItem";
import InnateItem from "./childItem/InnateItem";
import BaseBuilding from "./BaseBuilding";
import UIHelper from "../../UIHelper";
import { uiManager } from "../../../framework/ui/UIManager";
import { UIID } from "../../UIConfig";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Technology extends childBase {
    @property(cc.Node)
    studyLayer: cc.Node = null;
    @property(cc.Node)
    innateLayer: cc.Node = null;
    @property(cc.Node)
    btn_root: cc.Node = null;
    @property(cc.Node)
    studyRoot: cc.Node = null;
    @property(cc.Node)
    innateRoot: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    private set curTechnologyPage(value:string){
        switch(value){
            case '_btn_to_study':
                this.studyLayer.active = true;
                this.innateLayer.active = false;
                break;
            case '_btn_to_innate':
                this.studyLayer.active = false;
                this.innateLayer.active = true;
                break;
        }

    }
    onLoad () {
        UIHelper.bindComponent(this,this.btn_root,"tabPage")
    }
    start () {

    }
    tabPage(event){
        let name = event.target.name;
        this.curTechnologyPage = name;
    }
    setData(){
        let studyData =  UserLocalData.getLocalStorage(LocalStorageData.PlayerStudyData);
        let objStudy = studyData;
        for(let i in objStudy){
            let studyItemPrefab = ResManager.getInstance().getPrefabRes("studyItem");
            let studyItemNode = cc.instantiate(studyItemPrefab);
            studyItemNode.getComponent(StudyItem).setData(i); 
            this.studyRoot.addChild(studyItemNode);
        }
        let innateData =  UserLocalData.getLocalStorage(LocalStorageData.PlayerInnateData);
        for(let i in innateData){
            let innateItemPrefab = ResManager.getInstance().getPrefabRes("innateItem");
            let innateItemNode = cc.instantiate(innateItemPrefab);
            innateItemNode.getComponent(InnateItem).setData(i); 
            this.innateRoot.addChild(innateItemNode);
        }
    }
    onClose(){
        console.log('页面关闭');
        this.studyRoot.removeAllChildren();
        this.innateRoot.removeAllChildren();
        if(uiManager.getUI(UIID.InnateFrame)){
            uiManager.close(uiManager.getUI(UIID.InnateFrame))
        }
    }
    // update (dt) {}
}
