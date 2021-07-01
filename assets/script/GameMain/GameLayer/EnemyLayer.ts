import GameConfig from "../../GameConfig";
import EnemyNode from "../Enemy/EnemyNode";
import ObjectPool from "../../ObjectPool";
import Util from "../../Util";
import EffectLayer from "./EffectLayer";
import ResManager from "../../ResManager";
import { uiManager } from "../../../framework/ui/UIManager";
import { UIID } from "../../UIConfig";
import MenuLayer from "./MenuLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import { dataManager } from "../../Manager/dataManager";
import MissionMgr from "../Mission/MissionMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyLayer extends cc.Component {
    static instance: EnemyLayer;
    @property(cc.Label)
    label_wave: cc.Label = null;
    @property(sp.Skeleton)
    shalouSpine: sp.Skeleton = null;
    private maxX: number = 0;
    private scopeX:Array<number>;
    private maxY: number = 0;
    private refreshArray: Array<number>;
    private refreshTime: number = 0.5;
    private surplusEnemy: Array<any> = new Array;
    private createEmenyTween;
    private enemyId: number;
    /**当前怪物波数 */
    private _curEnemyWave: number = 0;
    public get curEnemyWave(): number {
        return this._curEnemyWave;
    }
    public set curEnemyWave(value: number) {
        this._curEnemyWave = value;
    }
    enemyArray: Array<EnemyNode> = new Array;
    enemyCollider: Array<cc.Collider> = new Array;
    baseX:number = -600;
    baseY:number = 300;
    curWave:number = 0;
    maxWave:number = 0;
    curCheckpoint:any;
    inspectEnable:boolean = false;
    onLoad() {
    }
    onDestroy() {
        EnemyLayer.instance = null;
    }
    start () {
        this.initCheckPointEnemy();
        this.createEmenyTween = cc.tween(this.node).repeatForever(
            cc.tween().by(this.refreshTime, {}).call(() => {
                // this.refreshTime = Util.randomNum(this.refreshArray[0], this.refreshArray[1], 1);
                if (this.surplusEnemy.length <= 0) {
                    this.createEmenyTween.stop();
                    return;
                }
                let enemyIndex = Util.random(0, this.surplusEnemy.length - 1);
                this.creatorEnemy(this.surplusEnemy[enemyIndex]);
                this.surplusEnemy.splice(enemyIndex, 1);
            })
        );
        EnemyLayer.instance = this;
    }
    initCheckPointEnemy(){
        this.curCheckpoint = GameConfig.getInstance().getJson("checkpoint")[dataManager.checkpointID];
        this.curWave = 0;
        this.maxWave = this.curCheckpoint.enemy.length;
        this.clearAllEnemy();
        this.refreshTime = parseFloat(this.curCheckpoint.refresh);
    }
    startCreatorEnemy(){
        this.shalouSpine.paused = false;
        this.shalouSpine.timeScale = this.shalouSpine.findAnimation('animation').duration/this.curCheckpoint.ready_time;
        this.label_wave.string = "";
        this.shalouSpine.setCompleteListener(this.creatorWave.bind(this));
    }
    creatorWave(){
        // MissionMgr.checkCompeleteMission();
        EventMgr.raiseEvent("NextWave");
        this.curWave++;
        this.creatorEnemyWave();
        this.shalouSpine.timeScale = this.shalouSpine.findAnimation('animation').duration/this.curCheckpoint.wave_cd[this.curWave-1];
        this.label_wave.string = this.curWave <=0 ? "" : "波数" + this.curWave + "/" + this.maxWave;
        if(this.curWave>=this.maxWave){
            this.shalouSpine.paused = true;
            this.label_wave.string = "";
        }
    }
    creatorEnemyWave(){
        if(this.enemyArray.length<=0){
            this.inspectEnable = false;
            this.scheduleOnce(()=>{
                this.inspectEnable = true;
            },6);
        }
        let waveCfg = this.curCheckpoint.enemy[this.curWave - 1];
        let enemyArr = Util.splitStr(waveCfg,";");
        for (let k = 0; k < enemyArr.length; k++) {
            let enemyCfg = Util.splitStr(enemyArr[k], ":");
            let enemyId = Number(enemyCfg[0]);
            let enemyNum = Number(enemyCfg[1]);
            this.addEnemyCount(enemyId, enemyNum);
        }
        Util.shuffle(this.surplusEnemy);
        this.createEmenyTween.start();
    }
    addEnemyCount(enemyId:number,enemyNum:number){
        for (let i = 0; i < enemyNum; i++) {
            let eObj = {
                wave: this.curWave,
                eId: enemyId
            }
            this.surplusEnemy.push(eObj);
        }
    }
    creatorEnemy(eObj:any) {
        let objPool = ObjectPool.getInstance();
        let enemyObj = GameConfig.getInstance().getJson("enemy")[eObj.eId];
        let enemyNode = objPool.get("enemyNode");
        let initialAngle;
        // if(MenuLayer.instance.bg==0){
        //     this.baseX = 600;
        //     initialAngle = -(Math.random()*(180-90+1) + 90);
        // }else{
        //     this.baseX = -600;
        //     initialAngle = -(Math.random()*(45+1))
        // }
        
        let baseY = Util.random(-300,600);
        if(baseY<0){
            initialAngle = -(Math.random()*(30+1));
        }else{
            initialAngle = -(Math.random()*(70+1));
        }
        enemyNode.setPosition(this.baseX, baseY);
        let enemyScript = enemyNode.getComponent(EnemyNode);
        enemyScript.setEnemyData(initialAngle,eObj.eId,enemyObj);
        let healthBarNode = null;
        healthBarNode = objPool.get("health_bar_enemy");
        healthBarNode.y = 5000;//资源复用时不会在屏幕上闪烁一次
        EffectLayer.instance.addChildEffectNode(healthBarNode);
        enemyScript.setHealthBarNode(healthBarNode);
        this.addChildEnemyNode(enemyNode, 1);
        this.enemyArray.push(enemyScript);
    }
    
    /**获取敌人模型 */
    getEnemyModel(modelName: string) {
        return ResManager.getInstance().getSkeletonData(modelName);
    }
    private addChildEnemyNode(enemyNode: cc.Node, enemyId: number) {
        // let nodeName = "enemy_" + enemyId;
        // let rootNode = this.node.getChildByName(nodeName);
        // if (!rootNode) {
        //     rootNode = new cc.Node;
        //     rootNode.name = nodeName;
        //     rootNode.width = cc.winSize.width;
        //     rootNode.height = cc.winSize.height;
        //     this.node.addChild(rootNode);
        // }
        // rootNode.addChild(enemyNode);
        EffectLayer.instance.addChildEffectNode(enemyNode);
    }
    spliceEnemyArray(mScript: EnemyNode) {
        this.enemyArray.splice(this.enemyArray.indexOf(mScript), 1);
        if(this.enemyArray.length<=0&&this.curWave>=this.maxWave){
            //成功通关
            MissionMgr.checkCompeleteMission();
            uiManager.open(UIID.EndLayer, true);
        }
    }
    addEnemyColliderArr(enemyCollider: cc.Collider) {
        this.enemyCollider.push(enemyCollider);
    }

    spliceEnemyColliderArr(enemyCollider: cc.Collider) {
        this.enemyCollider.splice(this.enemyCollider.indexOf(enemyCollider), 1);
    }
    clearAllEnemy(){
        this.enemyArray = [];
        this.enemyCollider = [];
        this.startCreatorEnemy();
        // this.creatorEnemyWave();
        this.shalouSpine.setAnimation(0,'animation',true)
        if(this.createEmenyTween!=null){
            this.createEmenyTween.stop();
        }
    }
    restart(){
        this.clearAllEnemy();
        this.curWave = 0;
    }
    revive(){
        this.clearAllEnemy();
        this.curWave--;
    }
    // update (dt) {}
}
