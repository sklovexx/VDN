import ResManager from "./ResManager";
import { EventMgr } from "../framework/common/EventManager";
import { resLoader } from "../framework/res/ResLoader";
import { UICF } from "./UIConfig";
import { uiManager } from "../framework/ui/UIManager";
import { ResUtil } from "../framework/res/ResUtil";
import GameConfig from "./GameConfig";
import LoadLayer from "./LoadLayer";
import GameManager from "./GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(LoadLayer)
    loadLayer: LoadLayer = null;
    // LIFE-CYCLE CALLBACKS:
    private loadPres: number = 0 // json common hall 三个资源都加载完毕时 load完毕 
    private loadComleteFlag = 2 // common 暂未回调 为2 即可关闭 load
    onLoad () {
        this.initLayer();
    }
    initLayer() {
        GameManager.getInstance().init();
        cc.pathFindMgr = cc.find("Canvas/pathFind").getComponent("pathFind");
        // console.log(cc.pathFindMgr)
        let resInstance = ResManager.getInstance();
        let completeArr = [false];
        let completeFun = ()=>{
            for (let i = 0; i < completeArr.length; i++) if (!completeArr[i]) return//未完成不可执行
            this.loadResComplete();
        }
        //加载游戏资源
        let urlArr = ['soliderModel/xiaobing','soliderModel/xiaobing2','soliderModel/xiaobing3','soliderModel/xiaobing4','soliderModel/xiaobing5','soliderModel/400039_daodanfashe','enemyModel/guai1','enemyModel/guai2','enemyModel/400015_jian']
        GameConfig.getInstance().loadJsonArray("json", (JsonAssetAry) => {
            this.loadResComplete();
            // 初始化公共资源
            resInstance.initLoadCommonRes(() => {
                setTimeout(()=>{
                    resInstance.initLoadHallRes(() => {
                        this.loadResComplete();
                        // console.log('大厅资源加载完成')
                    });
                },100)
            })
            // resInstance.initLoadGameRes(() => {
            //     resLoader.loadArray(urlArr, sp.SkeletonData, (error, skeletonDataArr) => {
            //         skeletonDataArr.forEach(skeletonData => { resInstance.pushSceneAsset(sp.SkeletonData, skeletonData) });
            //         completeArr[0] = true;
            //         completeFun();
            //     });
            // });
        })
        uiManager.initUIConf(UICF);
    }
    loadResComplete() {
        this.loadPres++;
        //console.log("loadResComplete " + this.loadPres + " " + this.loadComleteFlag);
        if (this.loadPres != this.loadComleteFlag) return;
        this.loadLayer.setBarComplete(() => {
            // this.startGame()
            let hallPrefab = ResManager.getInstance().getPrefabRes("Hall");
            let hallNode = ResUtil.instantiate(hallPrefab);
            hallNode.setPosition(cc.v2(0, 0));
            this.node.addChild(hallNode);
            this.node.removeComponent(this);
        })
    }
    startGame(){
        let resInstance = ResManager.getInstance();
        let gameLayer = resInstance.getPrefabRes("GameMainLayer");
        let gameNode = ResUtil.instantiate(gameLayer);
        gameNode.setPosition(cc.v2(0, 0))
        cc.find("Canvas").addChild(gameNode);
    }
    start () {
    }

    // update (dt) {}
}
