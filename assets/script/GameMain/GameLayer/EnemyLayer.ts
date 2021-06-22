import GameConfig from "../../GameConfig";
import EnemyNode from "../Enemy/EnemyNode";
import ObjectPool from "../../ObjectPool";
import Util from "../../Util";
import EffectLayer from "./EffectLayer";
import ResManager from "../../ResManager";
import { uiManager } from "../../../framework/ui/UIManager";
import { UIID } from "../../UIConfig";
import MenuLayer from "./MenuLayer";
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
    baseX:number;
    baseY:number = 300;
    curWave:number = 0;
    maxWave:number = 30;
    onLoad() {
    }
    onDestroy() {
        EnemyLayer.instance = null;
    }
    start () {
        this.createEmenyTween = cc.tween(this.node).repeatForever(
            cc.tween().by(this.refreshTime, {}).call(() => {
                // this.refreshTime = Util.randomNum(this.refreshArray[0], this.refreshArray[1], 1);
                if (this.surplusEnemy.length <= 0) {
                    this.createEmenyTween.stop();
                    return;
                }
                let ran = Util.random(0, 1);
                let enemyId;
                if(ran==0){
                    enemyId = 400013;
                }else if(ran==1){
                    enemyId = 400015;
                }
                let enemyIndex = Util.random(0, this.surplusEnemy.length - 1);
                this.creatorEnemy(enemyId,0);
                this.surplusEnemy.splice(enemyIndex, 1);
            })
        );
        EnemyLayer.instance = this;
        this.startCreatorEnemy();
        // this.creatorEnemyWave();
    }
    startCreatorEnemy(){
        this.shalouSpine.paused = false;
        this.label_wave.string = "";
        this.shalouSpine.setCompleteListener(this.creatorWave.bind(this));
    }
    creatorWave(){
        this.creatorEnemyWave();
        this.curWave++;
        this.label_wave.string = this.curWave <=0 ? "" : "波数" + this.curWave + "/" + this.maxWave;
        if(this.curWave>=this.maxWave){
            this.shalouSpine.paused = true;
            this.label_wave.string = "";
        }
    }
    /**添加当前怪物数量 */
    addCurEnemyNum(enemyId: number, enemyNum: number) {
        for (let i = 0; i < enemyNum; i++) {
            let eObj = {
                wave: this.curEnemyWave,
                eId: enemyId
            }

            this.surplusEnemy.push(eObj);
        }
    }
    creatorEnemyWave(){
        this.surplusEnemy = new Array((this.curWave + 1) * 2).fill(0);
        this.enemyId = 400013;
        this.createEmenyTween.start();
    }
    creatorEnemy(enemyId:number,level:number) {
        let objPool = ObjectPool.getInstance();
        // let enemyObj = GameConfig.getInstance().getJson("enemy")[parseInt(mObj.enemyGrade)-1];
        let enemyNode = objPool.get("enemyNode");
        let ran = 0;
        let initialAngle;
        // if(MenuLayer.instance.bg==0){
        //     this.baseX = 600;
        //     initialAngle = -(Math.random()*(180-90+1) + 90);
        // }else{
        //     this.baseX = -600;
        //     initialAngle = -(Math.random()*(45+1))
        // }
        this.baseX = -600;
        initialAngle = -(Math.random()*(45+1))
        enemyNode.setPosition(this.baseX, this.baseY);
        let enemyScript = enemyNode.getComponent(EnemyNode);
        enemyScript.setEnemyData(initialAngle,enemyId,level);
        let healthBarNode = null;
        healthBarNode = objPool.get("health_bar");
        healthBarNode.y = 5000;//资源复用时不会在屏幕上闪烁一次
        EffectLayer.instance.addChildEffectNode(healthBarNode);
        enemyScript.setHealthBarNode(healthBarNode);
        this.addChildEnemyNode(enemyNode, 1);
        this.enemyArray.push(enemyScript);
    }
    /**获取士兵模型 */
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
        this.curWave = 0;
        // this.node.removeAllChildren();
        this.enemyArray = [];
        this.enemyCollider = [];
        this.startCreatorEnemy();
        this.shalouSpine.setAnimation(0,'animation',true)
        if(this.createEmenyTween!=null){
            this.createEmenyTween.stop();
        }
    }
    // update (dt) {}
}
