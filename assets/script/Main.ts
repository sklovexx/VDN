import ResManager from "./ResManager";
import { EventMgr } from "../framework/common/EventManager";
import { resLoader } from "../framework/res/ResLoader";
import { UICF } from "./UIConfig";
import { uiManager } from "../framework/ui/UIManager";
import { ResUtil } from "../framework/res/ResUtil";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.pathFindMgr = cc.find("Canvas/pathFind").getComponent("pathFind");
        console.log(cc.pathFindMgr)
        let resInstance = ResManager.getInstance();
        let completeArr = [false];
        let completeFun = ()=>{
            for (let i = 0; i < completeArr.length; i++) if (!completeArr[i]) return//未完成不可执行
            this.startGame()
        }
        //加载游戏资源
        let urlArr = ['soliderModel/xiaobing','soliderModel/xiaobing2','soliderModel/xiaobing3','soliderModel/xiaobing5','soliderModel/400039_daodanfashe','enemyModel/guai1','enemyModel/guai2','enemyModel/400015_jian']
        resInstance.initLoadGameRes(() => {
            resLoader.loadArray(urlArr, sp.SkeletonData, (error, skeletonDataArr) => {
                skeletonDataArr.forEach(skeletonData => { resInstance.pushSceneAsset(sp.SkeletonData, skeletonData) });
                completeArr[0] = true;
                completeFun();
            });
        });
        uiManager.initUIConf(UICF);
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
