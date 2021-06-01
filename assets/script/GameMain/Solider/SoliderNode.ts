import ObjectPool from "../../ObjectPool";
import { SoliderObj, SoliderState } from "./ISolider";
import Util from "../../Util";
import BaseLayer from "../GameLayer/BaseLayer";
import EnemyLayer from "../GameLayer/EnemyLayer";
import SoliderLayer from "../GameLayer/SoliderLayer";
import EnemyNode from "../Enemy/EnemyNode";
import { EnemyState } from "../Enemy/IEnemy";
import ResManager from "../../ResManager";
import EffectLayer from "../GameLayer/EffectLayer";
import Bullet from "./Bullet";
import { tentType } from "../GameLayer/BaseLayer"
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
    private _collider: cc.Collider = null;
    private _colliderBody: cc.Collider = null;
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
    private soliderType:tentType;
    public get state(): SoliderState {
        return this._state;
    }
    public set state(value: SoliderState) {
        this._state = value;
        switch (value) {
            case SoliderState.Stand:
                this._soliderSpine.setAnimation(0, "stand", true);
                if(this.attackTarget==null) return;
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
                let angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY));
                //攻击敌人时改变角色朝向，防止背对攻击敌人
                if((angle<=-90&&angle>=-180)||(angle>90&&angle<=180)){
                    this.node.eulerAngles = cc.v3(0, 180, 0)
                }else if(angle>-90&&angle<=90){
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
        this.dieSpine.setCompleteListener(this.spineAnimEnd.bind(this));
        this.hitSpine.setCompleteListener(this.spineAnimEnd.bind(this));
    }

    start () {

    }
    onEnable(){
        this._soliderSpine.enabled = true;
        this.dieSpine.node.active = false;
        this.scope = [{x:cc.winSize.width/2 - 50,y:BaseLayer.instance.baseY + BaseLayer.instance.baseHeight + 50},{x:BaseLayer.instance.baseX - BaseLayer.instance.baseWidth/2 -50,y:-cc.winSize.height/2 + 400}]
        this.initAttackTarget();
        this.healthValue = this.maxHealthValue;
        this.isOutBase = false;
        this.setSoliderModel()
        this.state = SoliderState.Run;
    }
    setSoliderData(soliderType:tentType,soliderId:number,level:number){
        this.soliderType = soliderType;
        this._soliderId = soliderId;
        this._level = level;
        // this.node.getChildByName('level').getComponent(cc.Label).string = 'Lv.' + this._level.toString();
        switch (this.soliderType) {
            case tentType.Footmen:
                this._modelId = "xiaobing";
                this._speed = 100;
                this.atk_dis = 200;
                this.attackType = 0;
                this.PosOutBase = cc.v2(this.node.x, BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 60);
                break;
            case tentType.Archers:
                this._modelId = "xiaobing5";
                this._speed = 100;
                this.atk_dis = 400;
                this.attackType = 1;
                this.PosOutBase = cc.v2(this.node.x, BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 60);
                break;
            case tentType.Horsemen:
                this._modelId = "xiaobing3";
                this._speed = 200;
                this.atk_dis = 200;
                this.attackType = 0;
                this.PosOutBase = cc.v2(BaseLayer.instance.baseX - BaseLayer.instance.baseWidth/2 - 60, this.node.y);
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
    /**最大血量 */
    maxHealthValue: number = 100;
    /**损失的血量 */
    lossHealthValue: number = 0;
    /**基础攻击力 */
    attackValue: number = 2;
    /**攻速 */
    attackSpeed: number = 1000;
    /**攻击目标 */
    attackTarget = null;
    /**是否走出基地 */
    isOutBase: boolean = false;
    /**基地外集结点 */
    PosOutBase:cc.Vec2;
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
                // if(this.attackType==0){
                    
                // }else this.creatorBullet();
                this.setSoliderState(SoliderState.Stand);
                break;
            case "die":
                ObjectPool.getInstance().put(this.node);
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
        }
    }
    setHealthBarNode(health: cc.Node) {
        this._healthBar = health.getComponent(cc.ProgressBar);
        this.addComponentList({
            component: health,
            pos: { x: 0, y: 150 }
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
        // this.setEnemyState(EnemyState.Break);
    }
    /**开始寻路 */
    startFindPath(){
        cc.pathFindMgr.operatePoint({x:this.node.x,y:this.node.y,type:3});
        cc.pathFindMgr.operatePoint({x:this.targetX,y:this.targetY,type:4});
        cc.pathFindMgr.startFindPath();
    }
    initAttackTarget(){
        this.attackTarget = null;
        let random = Util.random(0,1);
        this.targetX = Util.random(-cc.winSize.width/2 + 50,this.scope[random].x);
        this.targetY = Util.random(this.scope[random].y,0);
        this.space_dis = 10;
        // this.startFindPath();
    }
    setAttackTarget(enemyNode){
        this.attackTarget = enemyNode;
        this.targetX = enemyNode.node.x;
        this.targetY = enemyNode.node.y;
        this.space_dis = this.atk_dis;
    }
    //检测敌人 
    private inspectEnemy(){
        let enemyArray = EnemyLayer.instance.enemyArray;
        let minPos:number = null;
        let targetNode = null;
        if(!this.isOutBase && this.attackType!=1){
            return;
        }
        for (let i = 0; i < enemyArray.length; i++) {
            if(enemyArray[i].state == EnemyState.Death || enemyArray[i].isEnter) continue;
            if(minPos==null){
                minPos = Util.distance({x:enemyArray[i].node.x,y:enemyArray[i].node.y},{x:this.node.x,y:this.node.y});
                targetNode = enemyArray[i];
            }else{
                let dis = Util.distance({x:enemyArray[i].node.x,y:enemyArray[i].node.y},{x:this.node.x,y:this.node.y})
                if(dis<minPos){
                    minPos = dis;
                    targetNode = enemyArray[i];
                }
            }
        }
        if(targetNode!=null){
            this.setAttackTarget(targetNode);
            if(this.state== SoliderState.Stand){
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
        if(Util.distance(cc.v2(this.node.x,this.node.y),this.PosOutBase)<20){
            this.isOutBase = true;
        }
        if(this.isEndDis()&&this.attackTarget==null){
            this.setSoliderState(SoliderState.Stand);
            return;
        }
        if(this.isEndDis()&&this.attackTarget!=null&&this.attackType == 1){
            this.setSoliderState(SoliderState.Attack)
            return
        }
        let angle;
        let isEndDis = 1;
        if(!this.isOutBase) angle = Util.getAngle(cc.v2(this.node.x,this.node.y),this.PosOutBase);
        else {
            if(this.isEndDis()&&Math.abs(this.node.y-this.targetY)<20){
                this.setSoliderState(SoliderState.Attack)
                return
            }else if(this.isEndDis()){
                if(this.node.x<this.targetX){
                    this.targetX = this.targetX - 100;
                }else{
                    this.targetX = this.targetX + 100;
                }
                isEndDis = 0;
            }
            angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY));
        }
        let x = Math.cos(angle * (Math.PI / 180)) * this._speed * dt * isEndDis;
        let y = Math.sin(angle * (Math.PI / 180)) * this._speed * dt;
        let targetX = this.node.x + x;
        let targetY = this.node.y + y;
        //移动到基地边缘时，根据角度阻止前进方向
        if(targetX>BaseLayer.instance.baseX - BaseLayer.instance.baseHeight/2 - 40 && targetY<BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 40 && this.isOutBase){
            if(angle<=-90&&angle>=-180){
                y = 0;
                x = x * 1.2;
            }else if(angle<=90&&angle>=0){
                x = 0;
                y = y * 1.2;
            }
        }
        //角色朝向
        if((angle<=-90&&angle>=-180)||(angle>90&&angle<=180)&&isEndDis==1){
            this.node.eulerAngles = cc.v3(0, 180, 0)
        }else if(angle>-90&&angle<=90&&isEndDis==1){
            this.node.eulerAngles = cc.v3(0, 0, 0)
        }
        this.node.x += x; 
        this.node.y += y;
        //移动自身组件
        this.moveComponent();
        this.setzIndex(); 
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
        soliderBullet.setPosition(this.node.position);
    }
    /**士兵等级对应攻击特性 */
    footmenAttack(){
        let enemyArray = EnemyLayer.instance.enemyArray;
        //命中目标死亡
        if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
            this.attackEnd();
            return;
        }
        switch (this._level) {
            case 1:
                
                break;
            case 2:
                this.scheduleOnce(()=>{
                    //第一次攻击未死亡则造成第二次伤害
                    if  (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
                        this.attackEnd();
                        return;
                    }
                },0.5)
                break;
            case 3:
                //攻击剩余两个目标
                let num = 0;
                for(let i = 0;i < enemyArray.length;i++){
                    if(enemyArray[i].uuid == this.attackTarget.uuid)continue;
                    if(num>=2) return;
                    if(Util.distance(this.node.position,enemyArray[i].node.position)<=this.atk_dis){
                        num++;
                        enemyArray[i].setHealthValue(-this.attackValue,this);
                    }
                }
                break;
            case 4:
                //遍历士兵数组，恢复范围内所有士兵的血量
                let soliderArray = SoliderLayer.instance.soliderArray;
                for(let i = 0;i < soliderArray.length;i++){
                    if(Util.distance(this.node.position,soliderArray[i].node.position)<=this.atk_dis){
                        soliderArray[i].setHealthValue(this.attackValue);
                    }
                }
                break;    
            default:
                break;
        }
    }
    archersAttack(){
        let enemyArray = EnemyLayer.instance.enemyArray;
        switch (this._level) {
            case 1:
                this.creatorBullet();
                break;
            case 2:
                this.creatorBullet(2,true);
                break;
            case 3:
                this.creatorBullet(3,true);
                break;
            case 4:
                this.creatorBullet(4,true);
                break;
            default:
                break;
        }
    }
    horsemenAttack(){
        let enemyArray = EnemyLayer.instance.enemyArray;
        switch (this._level) {
            case 1:
                //命中目标死亡
                if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
                    this.attackEnd();
                    return;
                }
                break;
            case 2:
                //命中目标死亡
                if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
                    this.attackEnd();
                    return;
                }
                this.attackTarget.setBleed();
                break;
            case 3:
                //命中目标死亡
                if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue,this)) {
                    this.attackEnd();
                    return;
                }
                for(let i = 0;i < enemyArray.length;i++){
                    if(enemyArray[i].uuid == this.attackTarget.uuid)continue;
                    if(Util.distance(this.attackTarget.node.position,enemyArray[i].node.position)<=this.atk_dis){
                        enemyArray[i].setHealthValue(-this.attackValue,this)
                    }
                }
                break;
            case 4:
                //命中目标死亡
                if (this.attackTarget==null || this.attackTarget.setHealthValue(-this.attackValue * 2,this,true)) {
                    this.attackEnd();
                    return;
                }
                this.attackTarget.setBackDis(this.node.x);
                break;    
            default:
                break;
        }
    }
    // update (dt) {}
}
