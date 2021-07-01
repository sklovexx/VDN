import { resLoader } from "../framework/res/ResLoader";
import { ResUtil } from "../framework/res/ResUtil";
import Singleton from "../framework/Singleton";
import { uiManager } from "../framework/ui/UIManager";
import ObjectPool from "./ObjectPool";
import ResManager from "./ResManager";
import LoadLayer from "./LoadLayer";
import { EventMgr } from "../framework/common/EventManager";
import UserLocalData from "./UserLocalData";
import LocalStorageData from "./LocalStorageData";
import GameConfig from "./GameConfig";
import { dataManager } from "./Manager/dataManager";
export default class GameManager extends Singleton<GameManager> {
    init(){
        EventMgr.addEventListener("startGame",this.startGame,this);
        EventMgr.addEventListener("backHall",this.backHall,this);
        EventMgr.addEventListener("startColectRes",this.startColectRes,this);
    }
    private calculateResAddSpeed(){
        let PlayerCityData = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData);
        let buildingData = GameConfig.getInstance().getJson('buildingData')["buildingData"];
        let resource_add_speed = 0;
        let subPlayerCityData = PlayerCityData.sub_building_info;
        let subBuildingData = buildingData.sub_building_info;
        for(let i in subPlayerCityData){
            resource_add_speed += subBuildingData[i].resource_add_speed[subPlayerCityData[i].level];
        }
        resource_add_speed = resource_add_speed * buildingData.resource_add_speed[PlayerCityData.level-1];
        return resource_add_speed;
    }
    private startColectRes(){
        setInterval(()=>{
            dataManager.gold += this.calculateResAddSpeed();
            EventMgr.raiseEvent("updateGold");
        },5000);
    }
    private startGame(){
        //配置科技数据
        let PlayerStudyData = UserLocalData.getLocalStorage(LocalStorageData.PlayerStudyData);
        let studyData = GameConfig.getInstance().getJson("studyData")["studyData"];
        for(let i in studyData){
            let studyItem = studyData[i]
            dataManager.studyData[studyItem.act_on][studyItem.type] = studyItem.value[PlayerStudyData[i].level];
        }
        //配置天赋数据
        let PlayerInnateData = UserLocalData.getLocalStorage(LocalStorageData.PlayerInnateData);
        let innateData = GameConfig.getInstance().getJson("innateData")["innateData"];
        for(let i in innateData){
            let innateItem = innateData[i]
            dataManager.innateData[innateItem.act_on][innateItem.type] = (parseInt(innateItem.value[PlayerInnateData[i].level-1])||0)/100;
        }
        let resInstance = ResManager.getInstance();
        //添加加载层
        let canvasNode = cc.find("Canvas");
        let loadNode = cc.instantiate(resInstance.getCommonPrefabRes("loadingLayer"));
        canvasNode.addChild(loadNode);
        let loadingScript = loadNode.getComponent(LoadLayer);
        //施放大厅所有资源
        let hallMainNode = canvasNode.getChildByName("Hall");
        if (hallMainNode) hallMainNode.destroy();
        uiManager.closeAll();
        uiManager.clearCache();
        resLoader.getResKeeper().releaseAutoRes();
        resInstance.clearAllRes();
        cc.sys.garbageCollect();
        let completeArr = [false];
        let completeFun = ()=>{
            for (let i = 0; i < completeArr.length; i++) if (!completeArr[i]) return//未完成不可执行
            //完成
            loadingScript.setBarComplete(() => {
                let gameLayer = resInstance.getPrefabRes("GameMainLayer");
                let gameNode = ResUtil.instantiate(gameLayer);
                gameNode.setPosition(cc.v2(0, 0))
                cc.find("Canvas").addChild(gameNode);
            })
        }
        //加载游戏资源
        let urlArr = ['soliderModel/xiaobing','soliderModel/xiaobing2','soliderModel/xiaobing3','soliderModel/xiaobing4','soliderModel/xiaobing5','soliderModel/400039_daodanfashe','enemyModel/guai1','enemyModel/guai2','enemyModel/400015_jian']
        resInstance.initLoadGameRes(() => {
            resLoader.loadArray(urlArr, sp.SkeletonData, (error, skeletonDataArr) => {
                skeletonDataArr.forEach(skeletonData => { resInstance.pushSceneAsset(sp.SkeletonData, skeletonData) });
                completeArr[0] = true;
                completeFun();
            });
        });
    }
    private backHall() {
        let resInstance = ResManager.getInstance();
        //添加加载层
        let canvasNode = cc.find("Canvas");
        let loadNode = cc.instantiate(resInstance.getCommonPrefabRes("loadingLayer"));
        canvasNode.addChild(loadNode);
        let loadingScript = loadNode.getComponent(LoadLayer);

        cc.find("Canvas/GameMainLayer").destroy();

        //TODO:检查节点池是否清理干净
        ObjectPool.getInstance().clearPoolMap();

        uiManager.closeAll();
        uiManager.clearCache();
        resLoader.getResKeeper().releaseAutoRes();
        resInstance.clearAllRes();
        cc.sys.garbageCollect();
        // 初始大厅资源
        resInstance.initLoadHallRes(function () {
            let hallPrefab = resInstance.getPrefabRes("Hall");
            let hallNode = ResUtil.instantiate(hallPrefab);
            hallNode.setPosition(cc.v2(0, 0));
            cc.find("Canvas").addChild(hallNode);
            //完成
            loadingScript.setBarComplete(() => { })
        });
    }
}
