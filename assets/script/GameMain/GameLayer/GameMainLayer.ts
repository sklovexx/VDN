import ObjectPool from "../../ObjectPool";
import ResManager from "../../ResManager";
import SoliderLayer from "./SoliderLayer";
import EnemyLayer from "./EnemyLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import GameConfig from "../../GameConfig";
import { dataManager } from "../../Manager/dataManager";
import MissionMgr from "../Mission/MissionMgr";
import Util from "../../Util";
const {ccclass, property} = cc._decorator;
let objPoolArr = ['damageLabel', 'criticalHitLabel','soliderNode','enemyNode','health_bar','health_bar_enemy','resourceNode','reourceAddNode','bullet'];
@ccclass
export default class GameMainLayer extends cc.Component {
    static instance: GameMainLayer;
    @property(cc.Sprite)
    bg:cc.Sprite = null;
    isPause:boolean = false;
    private updateVoidArr: Array<any> = [];
    private resumeVoidArr: Array<any> = [];
    onLoad () {
        GameMainLayer.instance = this;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.initCheckPointData();
        this.initObjectPool();
    }
    onDestroy(){
        GameMainLayer.instance = null;
    }
    start () {
        
    }
    reStart(){
        
    }
    initCheckPointData(){
        let checkpointCfg = GameConfig.getInstance().getJson("checkpoint")[dataManager.checkpointID];
        this.bg.spriteFrame = ResManager.getInstance().getSpriteFrameRes(checkpointCfg.map_bg);
        let allMission = checkpointCfg.all_mission;
        allMission.forEach((e,i)=>{
            MissionMgr.registerMission(e,i);
        })
    }
    private initObjectPool() {
        let resMag = ResManager.getInstance();
        let objPool = ObjectPool.getInstance();

        for (let i = 0; i < objPoolArr.length; i++) {
            objPool.addPrefabPool(resMag.getPrefabRes(objPoolArr[i]));
        }
    }
    /**
     * 设置root节点下所有spine动画的暂停状态
     * @param root 
     * @param bool 
     */
     setSkeletonAnimPaused(root: cc.Node, bool: boolean) {
        if (!root) return
        // if (!root || this.isPause == bool) return;
        // this.isPause = bool;
        // cc.director.getActionManager().pauseAllRunningActions();
        if (bool) root.pauseAllActions();
        else root.resumeAllActions();

        let skeleton = root.getComponent(sp.Skeleton);
        if(skeleton){
            skeleton.paused = bool;
        }
        // if (skeleton) {
        //     //检查怪物类型动画是否需要继续
        //     let monsterNode = root.getComponent(MonsterNode);
        //     if (bool == false && monsterNode && monsterNode.state == MonsterState.Pause) { }
        //     else {
        //         skeleton.paused = bool;
        //     }
        // }
        let childrenCount = root.childrenCount;
        for (var i = 0; i < childrenCount; i++) {
            let node = root.children[i];
            this.setSkeletonAnimPaused(node, bool);
        }

        //恢复游戏时的函数回调
        if (!bool) {
            for (let i = 0; i < this.resumeVoidArr.length; i++) {
                let callBack = this.resumeVoidArr[i];
                callBack.back.call(callBack.target);
            }
            this.resumeVoidArr = [];
        }
    }

    /**暂停游戏update */
    pause() {
        this.setGameState(true);
        // EventMgr.raiseEvent("PauseGame");
    }

    /**恢复游戏update */
    resume() {
        this.setGameState(false);
        // EventMgr.raiseEvent("ResumeGame");
    }

    setGameState(bool: boolean) {
        if (this.isPause == bool) return;
        this.isPause = bool;
        this.setSkeletonAnimPaused(cc.find("Canvas"), bool);
    }

    registerResumeVoidArr(fun: () => void, target) {
        let callBack = {
            back: fun,
            target: target,
        }
        this.resumeVoidArr.push(callBack);

        // iterator.callBack.call(iterator.target, eventName, eventData);
    }
    /**添加update类型的函数 */
    addUpdateVoidArr(any) {
        this.updateVoidArr.push(any);
    }

    spliceUpdateVoidArr(any) {
        let index = this.updateVoidArr.indexOf(any);
        if (index < 0) return
        this.updateVoidArr.splice(index, 1);
    }
    update (dt) {
        if (this.isPause) return;
        let soliderArray = SoliderLayer.instance.soliderArray//.concat();
        for (let i = 0; i < soliderArray.length; i++) {
            soliderArray[i].gameUpdate(dt);
        }
        let enemyArray = EnemyLayer.instance.enemyArray//.concat();
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i].gameUpdate(dt);
        }
        for (let i = 0; i < this.updateVoidArr.length; i++) {
            this.updateVoidArr[i].gameUpdate(dt);
        }
    }
}
