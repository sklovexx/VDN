import ObjectPool from "../../ObjectPool";
import { audioMgr } from "../../../framework/audio/AudioMgr";
import { SoliderObj, SoliderState } from "./ISolider";
import Util from "../../Util";
import BaseLayer from "../GameLayer/BaseLayer";
import EnemyLayer from "../GameLayer/EnemyLayer";
import SoliderLayer from "../GameLayer/SoliderLayer";
import EnemyNode from "../Enemy/EnemyNode";
import { EnemyState } from "../Enemy/IEnemy";
import ResManager from "../../ResManager";
import EffectLayer from "../GameLayer/EffectLayer";
import ResourceLayer from "../GameLayer/ResourceLayer";
import { ResourceType } from "../Resource/ResourceType";
import Bullet from "./Bullet";
import { tentType } from "../GameLayer/BaseLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import { dataManager } from "../../Manager/dataManager";
const {ccclass, property} = cc._decorator;
interface soliderComponent {
    component: cc.Node
    pos: { x: number, y: number }
}
@ccclass
export default class SoliderNode extends cc.Component {
    @property(sp.Skeleton)
    dieSpine:sp.Skeleton = null;
    @property(sp.Skeleton)
    hitSpine:sp.Skeleton = null;
    private _healthBar: cc.ProgressBar = null;
    private _soliderId: number = 0;
    private _modelId;
    private _soliderObj: SoliderObj = null;
    private _soliderLevelIncrease: number = 0;
    private _componentList: Array<soliderComponent> = [];
    /**移速 */
    private _speed: number = 200;
    private _attackTween = null;
    private _soliderSpine: sp.Skeleton = null;
    private _state: SoliderState = null;
    private _level: number = 0;
    private contactArray = [];
    private _index = 0;
    private scope:Array<any>;
    private targetX:number;
    private targetY:number;
    private moveTween;
    private atk_dis:number = 200;
    private space_dis:number = 10;
    private targetPath:Array<any>;
    
    public get state(): SoliderState {
        return this._state;
    }
    public set state(value: SoliderState) {
        this._state = value;
        switch (value) {
            case SoliderState.Stand:
                this._soliderSpine.setAnimation(0, "stand", true);
                if(this.attackTarget==null&&this.isEndDis()) {
                    this.node.eulerAngles = cc.v3(0, 180, 0)
                    return;
                }
                if(this.isEndDis()){
                    this.resstAttackTime();
                }else{
                    this.setStateRun();
                }
                break;
            case SoliderState.Attack:
                if(this.attackTarget==null){
                    this.setStateRun();
                    return;
                }
                if(this._soliderSpine.animation == 'attack'){
                    return;
                }
                //攻击敌人时改变角色朝向，防止背对攻击敌人
                if(this.node.x>this.attackTarget.node.x){
                    this.node.eulerAngles = cc.v3(0, 180, 0)
                }else if(this.node.x<=this.attackTarget.node.x){
                    this.node.eulerAngles = cc.v3(0, 0, 0)
                }
                this._soliderSpine.setAnimation(0, "attack", true);
                break;
            case SoliderState.Run:
                this._soliderSpine.setAnimation(0, "walk", true);
                // console.log('开始移动');
                if (this._attackTween) {
                    this._attackTween.stop();
                    this._attackTween = null;
                }
                break;
            case SoliderState.Death:
                EventMgr.addEventListener("reviveSolider", this.revive, this);
                EventMgr.addEventListener("NextWave", this.putObjectPool, this);
                SoliderLayer.instance.spliceSoliderArray(this);
                this.recoverySolider();
                //播放死亡动画
                this.dieSpine.node.active = true;
                this._soliderSpine.enabled = false;
                this.dieSpine.setAnimation(0, "die", false);
                break;
            case SoliderState.Break:
                break; 
            case SoliderState.Static:
            case SoliderState.Pause:
                break;
        }
    }
    /**当前血量 */
    private _healthValue: number = 0;
    public get healthValue(): number {
        return this._healthValue;
    }
    public set healthValue(value: number) {
        // console.log(value,this.maxHealthValue)
        if (value >= this.maxHealthValue) {
            this._healthValue = this.maxHealthValue;
            this._healthBar.node.active = false;
        }
        else {
            this._healthValue = value;
            this._healthBar.node.active = true;
        }

        this.lossHealthValue = this.maxHealthValue - this._healthValue;
        this.setHealthBar();
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._soliderSpine = this.node.getComponent(sp.Skeleton);
        this._soliderSpine.setCompleteListener(this.spineAnimEnd.bind(this));
        this._soliderSpine.setStartListener(this.spineAnimStart.bind(this));
        this.dieSpine.setCompleteListener(this.spineAnimEnd.bind(this));
        this.hitSpine.setCompleteListener(this.spineAnimEnd.bind(this));
        this.scope = [{x:cc.winSize.width/2 - 50,y:BaseLayer.instance.baseY + BaseLayer.instance.baseHeight + 50}]
    }
    start () {

    }
    initData(){
        //初始化所有spine动画状态
        this._soliderSpine.enabled = true;
        this._soliderSpine.paused = false;
        this.dieSpine.paused = false;
        this.hitSpine.paused = false;
        this.dieSpine.node.active = false;
        this.hitSpine.node.active = false;
        this.initAttackTarget();
        this.healthValue = this.maxHealthValue;
        this.state = SoliderState.Run;
    }
    onEnable(){
        this.isOutBase = false;
        this.setSoliderModel()
        this.initData();
    }
    revive(){
        if(this.state != SoliderState.Death) return;
        // console.log('复活士兵');
        let objPool = ObjectPool.getInstance();
        let healthBarNode = null;
        healthBarNode = objPool.get("health_bar");
        healthBarNode.y = 5000;//资源复用时不会在屏幕上闪烁一次
        EffectLayer.instance.addChildEffectNode(healthBarNode);
        this.setHealthBarNode(healthBarNode);
        this.initData();
        SoliderLayer.instance.addSoliderArray(this);
        switch (this.soliderType) {
            case tentType.Footmen:
                ResourceLayer.instance.footmenNumber++;
                break;
            case tentType.Archers:
                ResourceLayer.instance.archersNumber++;
                break;
            case tentType.Horsemen:
                ResourceLayer.instance.horsemenNumber++;
                break;
            default:
                break;
        }
    }
    putObjectPool(){
        if(this.state != SoliderState.Death) return;
        // console.log('移除士兵');
        EventMgr.removeEventListener("reviveSolider", this.revive, this);
        EventMgr.removeEventListener("NextWave", this.putObjectPool, this);
        ObjectPool.getInstance().put(this.node);
    }
    onDisable(){
        EventMgr.removeEventListener("reviveSolider", this.revive, this);
        EventMgr.removeEventListener("NextWave", this.putObjectPool, this);
    }
    setSoliderData(soliderType:tentType,soliderId:number,level:number){
        this.soliderType = soliderType;
        this._soliderId = soliderId;
        this._level = level;
        let baseAttackValue = 3 + 2*this._level;
        let baseHealthValue;
        switch (this.soliderType) {
            case tentType.Footmen:
                this._modelId = "xiaobing4";
                this._speed = 100;
                this.atk_dis = 120;
                this.attackType = 0;
                baseHealthValue = 150 + 20*this._level;
                this.maxHealthValue = baseHealthValue + dataManager.studyData.footmen["hp"] + baseHealthValue*dataManager.innateData.footmen["hp"];
                this.attackValue = baseAttackValue + dataManager.studyData.footmen["attackValue"] + baseHealthValue*dataManager.innateData.footmen["attackValue"];
                break;
            case tentType.Archers:
                this._modelId = "xiaobing5";
                this._speed = 100;
                this.atk_dis = 300;
                this.attackType = 1;
                baseHealthValue = 100 + 20*this._level;
                this.maxHealthValue = baseHealthValue + dataManager.studyData.archers["hp"] + baseHealthValue*dataManager.innateData.archers["hp"];
                this.attackValue = baseAttackValue + dataManager.studyData.archers["attackValue"] + baseHealthValue*dataManager.innateData.archers["attackValue"];
                break;
            case tentType.Horsemen:
                this._modelId = "xiaobing3";
                this._speed = 180;
                this.atk_dis = 120;
                this.attackType = 0;
                baseHealthValue = 100 + 20*this._level;
                this.maxHealthValue = baseHealthValue + dataManager.studyData.horsemen["hp"] + baseHealthValue*dataManager.innateData.horsemen["hp"];
                this.attackValue = baseAttackValue + dataManager.studyData.horsemen["attackValue"] + baseHealthValue*dataManager.innateData.horsemen["attackValue"];
                break;
            default:
                break;
        }
    }
    /**设置模型 */
    setSoliderModel() {
        let skeletonData = SoliderLayer.instance.getSoliderModel(this._modelId);
        this._soliderSpine.skeletonData = skeletonData;
    }
    soliderType:tentType;
    /**最大血量 */
    maxHealthValue: number = 100;
    /**损失的血量 */
    lossHealthValue: number = 0;
    /**基础攻击力 */
    attackValue: number = 5;
    /**攻速 */
    attackSpeed: number = 500;
    /**攻击目标 */
    attackTarget = null;
    /**是否走出基地 */
    isOutBase: boolean = false;
    /**攻击类型 */
    attackType: number = 0;
    /** */
    recoverySolider() {
        if (this._attackTween) {
            this._attackTween.stop();
            this._attackTween = null;
        }
        let objPool = ObjectPool.getInstance();
        for (let i = 0; i < this._componentList.length; i++) {
            objPool.put(this._componentList[i].component)
        }
        this._componentList = [];
        this._healthBar = null;
    }
    spineAnimStart(event: sp.spine.TrackEntry){
        switch (event.animation.name) {
            case "attack":
                if(this.soliderType == tentType.Footmen){
                    audioMgr.playEffect("infantry_atk");
                }
                if(this.soliderType == tentType.Archers){
                    audioMgr.playEffect("archer_atk");
                }
                if(this.soliderType == tentType.Horsemen){
                    audioMgr.playEffect("cavalry_atk");
                }
                break;
        
            default:
                break;
        }
    }
    spineAnimEnd(event: sp.spine.TrackEntry) {
        switch (event.animation.name) {
            case "attack":
                //攻击目标为空
                if (this.attackTarget==null||this.attackTarget.state == EnemyState.Death) {
                    this.attackEnd();
                    return
                }
                if(this.soliderType == tentType.Footmen){
                    this.footmenAttack();
                }
                if(this.soliderType == tentType.Archers){
                    this.archersAttack();
                }
                if(this.soliderType == tentType.Horsemen){
                    this.horsemenAttack();
                }
                this.setSoliderState(SoliderState.Stand);
                break;
            case "die":
                // ObjectPool.getInstance().put(this.node);
                break;
            case "hit":
                this.hitSpine.node.active = false;
                break;  
            default:
                break;
        }
    }
    /**攻击结束，初始化攻击目标并重新开始寻找目标 */
    attackEnd(){
        this.initAttackTarget();
        this.inspectEnemy();
        this.setStateRun();
    }
    /**判断此次攻击是否造成攻击目标死亡 */
    attackIsDie(value){
        //命中目标死亡
        if (this.attackTarget==null || this.attackTarget.setHealthValue(value,this)) {
            this.attackEnd();
            return;
        }
    }
    addComponentList(comObj: soliderComponent) {
        this._componentList.push(comObj);
        this.moveComponent();
    }
    moveComponent() {
        for (let i = 0; i < this._componentList.length; i++) {
            let node = this._componentList[i].component;
            let pos = this._componentList[i].pos;
            node.x = this.node.x + pos.x;
            node.y = this.node.y + pos.y;
            node.zIndex = this.node.zIndex + 1;
        }
    }
    setHealthBarNode(health: cc.Node) {
        this._healthBar = health.getComponent(cc.ProgressBar);
        this.addComponentList({
            component: health,
            pos: { x: 0, y: 180 }
        })
    }
    setHealthBar() {
        let scale = this.healthValue / this.maxHealthValue;
        this._healthBar.progress = scale;
        return scale;
    }
    /**设置当前血量 */
    setHealthValue(value: number,Solider?:SoliderNode,isCrit?: boolean) {
        // this.node.getComponent(cc.Animation).play();
        if (this.state == SoliderState.Death || value == 0) return true
        if (!this.node.parent) return true
        let wolrdPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        wolrdPos.y += 150;
        //-------------TODO：补丁
        let index;
        if (value > 0) index = 1;
        else index = isCrit ? 2 : 0;
        let dmgStr = index == 2 ? "B" + Math.abs(value).toString() : Math.abs(value).toString();
        //----------------------------
        EffectLayer.instance.addDamageLabel(dmgStr, wolrdPos, index);
        if(value < 0 && !this.hitSpine.node.active){
            this.hitSpine.node.active = true;
            this.hitSpine.setAnimation(0, "hit", false);
        }
        let num = this.healthValue + value;
        if (num <= 0) {
            this.setSoliderState(SoliderState.Death)
            return true;
        };
        this.healthValue = num;
    }
    /**开始寻路 */
    startFindPath(){
        return cc.pathFindMgr.startFindPath({x:this.node.x,y:this.node.y},{x:this.targetX,y:this.targetY});
    }
    initAttackTarget(){
        this.attackTarget = null;
        this.space_dis = 10;
        let baseX = 100;
        if(this.attackType == 1){
            baseX = 250;
        }
        this.targetX = Util.random(baseX,cc.winSize.width/2 - 50);
        this.targetY = Util.random(BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 70,600);
        this.targetPath = this.startFindPath();
        //若终点生成于障碍物内，则取固定范围坐标
        if(this.targetPath.length<=0){
            this.targetX = Util.random(baseX,400);
            this.targetY = Util.random(BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 70,-100);
            this.targetPath = this.startFindPath();
        }
        //递归方法获取不在障碍物内的终点，由于士兵数过多时循环计算量过大会导致卡死，故废弃
        // while (true) {
        //     randomPos();
        //     this.targetPath = [];
        //     this.targetPath = this.startFindPath();
        //     if(this.targetPath.length>0){
        //         break;
        //     }
        // }
    }
    setAttackTarget(enemyNode){
        this.attackTarget = enemyNode;
        if(this.node.x < enemyNode.node.x){
            this.targetX = enemyNode.node.x - 60; 
        }else{
            this.targetX = enemyNode.node.x + 60; 
        }
        this.targetY = enemyNode.node.y;
        this.space_dis = this.atk_dis;
        this.targetPath = this.startFindPath();
        if(this.targetPath.length<=0){
            this.targetX = enemyNode.node.x; 
            this.targetPath = this.startFindPath();
        }
    }
    //检测敌人 
    private inspectEnemy(){
        if(this.attackTarget!=null){
            this.setAttackTarget(this.attackTarget);
            if(this.state == SoliderState.Stand){
                this.setSoliderState(SoliderState.Stand);
            }
        }
        let enemyArray = EnemyLayer.instance.enemyArray;
        let minPos:number = null;
        let targetNode = null;
        if(!this.isOutBase||!EnemyLayer.instance.inspectEnable){
            return;
        }
        //随机寻找敌人
        // let validEnemyArray = [];
        // for (let i = 0; i < enemyArray.length; i++) {
        //     if(enemyArray[i].state == EnemyState.Death || enemyArray[i].isEnter) continue;
        //     validEnemyArray.push(enemyArray[i]);
        // }
        // let index = Util.random(0,validEnemyArray.length-1);
        // targetNode = validEnemyArray[index];
        //寻找距离最近的敌人
        for (let i = 0; i < enemyArray.length; i++) {
            if(enemyArray[i].state == EnemyState.Death || enemyArray[i].isEnter) continue;
            let dis = Util.distance({x:enemyArray[i].node.x,y:enemyArray[i].node.y},{x:this.node.x,y:this.node.y});
            if(minPos==null){
                minPos = Util.distance({x:enemyArray[i].node.x,y:enemyArray[i].node.y},{x:this.node.x,y:this.node.y});
                targetNode = enemyArray[i];
            }else if(dis<minPos){
                minPos = dis;
                targetNode = enemyArray[i];
            }
        }
        if(targetNode!=null){
            this.setAttackTarget(targetNode);
            if(this.state == SoliderState.Stand){
                this.setSoliderState(SoliderState.Stand);
            }
        }
    }
    resstAttackTime() {
        //无法攻击
        if (this.state == SoliderState.Pause || this.state == SoliderState.Static || this.state == SoliderState.Break || this._attackTween != null) return
        let attackTime = this.attackSpeed / 1000;
        this._attackTween = cc.tween(this.node).delay(attackTime).call(() => {
            this._attackTween = null;
            this.setSoliderState(SoliderState.Attack);
        }).start();
    }
    gameUpdate(dt){
        if (this._index <= 0 &&this.state!=SoliderState.Death) {
            this._index = 20;
            this.inspectEnemy();
        }
        this._index--;
        //敌人死亡立即检测附近是否还有敌人
        if(this.attackTarget!=null&&this.attackTarget.state==EnemyState.Death){
            this.initAttackTarget();
            this.inspectEnemy();
            this.setStateRun();
            return;
        }
        if(this.state!=SoliderState.Run){
            return;
        }
        if(Util.distance(cc.v2(this.node.x,this.node.y),cc.v2(BaseLayer.instance.chengbaoNode.x,BaseLayer.instance.chengbaoNode.y))>=380){
            this.isOutBase = true;
        }
        if(this.isEndDis()&&this.attackTarget==null){
            this.setSoliderState(SoliderState.Stand);
            return;
        }
        let angle;
        let isEndDis = 1;
        if(this.isEndDis()&&(Math.abs(this.node.y-this.targetY)<40 ||this.attackType == 1)){
            this.setSoliderState(SoliderState.Attack)
            return
        }else if(this.isEndDis()&&(this.attackType == 1 || this.targetPath.length<=0 || this.targetPath[0].hasArrive)){
            isEndDis = 0;
        }
        angle = this.getTargetAngle();
        // angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY))
        let x = Math.cos(angle * (Math.PI / 180)) * this._speed * dt * isEndDis;
        let y = Math.sin(angle * (Math.PI / 180)) * this._speed * dt;
        //角色朝向
        if((angle<=-90&&angle>=-180)||(angle>90&&angle<=180)&&isEndDis==1){
            this.node.eulerAngles = cc.v3(0, 180, 0)
        }else if(angle>-90&&angle<=90&&isEndDis==1){
            this.node.eulerAngles = cc.v3(0, 0, 0)
        }
        this.node.x += x; 
        this.node.y += y;
        this.setzIndex(); 
        //移动自身组件
        this.moveComponent();
    }
    getTargetAngle(){
        for(let i = this.targetPath.length-1;i >= 0;i--){
            if(this.targetPath[i].hasArrive == false){
                if(Util.distance(cc.v2(this.node.x,this.node.y),cc.v2(this.targetPath[i].x,this.targetPath[i].y))<40){
                    this.targetPath[i].hasArrive = true;
                    continue;
                }
                return Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetPath[i].x,this.targetPath[i].y));
            }
        }
        if(this.targetPath.length>0&&this.targetPath[0].hasArrive){
            if(this.node.x<this.targetPath[0].x&&this.attackTarget!=null){
                this.targetX = this.targetPath[0].x - 100;
            }else if(this.attackTarget!=null){
                this.targetX = this.targetPath[0].x + 100;
            }else{
                this.targetX = this.targetPath[0].x;
            }
            this.targetY = this.targetPath[0].y;
        }
        return Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY));
    }
    setzIndex() {
        this.node.zIndex = -this.node.y;
        this._healthBar.node.zIndex = this.node.zIndex;
    }
    isEndDis(){
        return Util.distance(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY))<this.space_dis
    }
    setSoliderState(state: SoliderState) {
        if (this.state == SoliderState.Death) return;
        this.state = state;
    }
    setStateRun() {
        if (this.state == SoliderState.Death || this.state == SoliderState.Run) return
        this.setSoliderState(SoliderState.Run);
    }
    creatorBullet(level?:number,effect?:boolean) {
        let soliderBullet = ObjectPool.getInstance().get("bullet");
        let spriteData = ResManager.getInstance().getSpriteFrameRes("jt");
        soliderBullet.getComponent(Bullet).setBulletData(this, spriteData, this.attackTarget, level, effect);
        EffectLayer.instance.addChildEffectNode(soliderBullet);
        soliderBullet.x = this.node.x;
        soliderBullet.y = this.node.y + 50;
    }
    /**士兵等级对应攻击特性 */
    footmenAttack(){
        let enemyArray = EnemyLayer.instance.enemyArray;
        //命中目标死亡
        if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
            this.attackEnd();
            return;
        }
        // switch (this._level) {
        //     case 1:
                
        //         break;
        //     case 2:
        //         this.scheduleOnce(()=>{
        //             //第一次攻击未死亡则造成第二次伤害
        //             if  (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
        //                 this.attackEnd();
        //                 return;
        //             }
        //         },0.5)
        //         break;
        //     case 3:
        //         //攻击剩余两个目标
        //         let num = 0;
        //         for(let i = 0;i < enemyArray.length;i++){
        //             if(enemyArray[i].uuid == this.attackTarget.uuid)continue;
        //             if(num>=2) return;
        //             if(Util.distance(this.node.position,enemyArray[i].node.position)<=this.atk_dis){
        //                 num++;
        //                 enemyArray[i].setHealthValue(-this.attackValue,this);
        //             }
        //         }
        //         break;
        //     case 4:
        //         //遍历士兵数组，恢复范围内所有士兵的血量
        //         let soliderArray = SoliderLayer.instance.soliderArray;
        //         for(let i = 0;i < soliderArray.length;i++){
        //             if(Util.distance(this.node.position,soliderArray[i].node.position)<=this.atk_dis){
        //                 soliderArray[i].setHealthValue(this.attackValue);
        //             }
        //         }
        //         break;    
        //     default:
        //         break;
        // }
    }
    archersAttack(){
        this.creatorBullet();
        // switch (this._level) {
        //     case 1:
        //         this.creatorBullet();
        //         break;
        //     case 2:
        //         this.creatorBullet(2,true);
        //         break;
        //     case 3:
        //         this.creatorBullet(3,true);
        //         break;
        //     case 4:
        //         this.creatorBullet(4,true);
        //         break;
        //     default:
        //         break;
        // }
    }
    horsemenAttack(){
        if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
            this.attackEnd();
            return;
        }
        // let enemyArray = EnemyLayer.instance.enemyArray;
        // switch (this._level) {
        //     case 1:
        //         //命中目标死亡
        //         if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
        //             this.attackEnd();
        //             return;
        //         }
        //         break;
        //     case 2:
        //         //命中目标死亡
        //         if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
        //             this.attackEnd();
        //             return;
        //         }
        //         this.attackTarget.setBleed();
        //         break;
        //     case 3:
        //         //命中目标死亡
        //         if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
        //             this.attackEnd();
        //             return;
        //         }
        //         for(let i = 0;i < enemyArray.length;i++){
        //             if(enemyArray[i].uuid == this.attackTarget.uuid)continue;
        //             if(Util.distance(this.attackTarget.node.position,enemyArray[i].node.position)<=this.atk_dis){
        //                 enemyArray[i].setHealthValue(-this.attackValue,this)
        //             }
        //         }
        //         break;
        //     case 4:
        //         //命中目标死亡
        //         if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue * 2,this,true)) {
        //             this.attackEnd();
        //             return;
        //         }
        //         this.attackTarget.setBackDis(this.node.x);
        //         break;    
        //     default:
        //         break;
        // }
    }
    // update (dt) {}
}
