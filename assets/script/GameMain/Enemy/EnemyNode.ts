import ObjectPool from "../../ObjectPool";
import { EnemyObj, EnemyState } from "./IEnemy";
import { SoliderState } from "../Solider/ISolider";
import Util from "../../Util";
import BaseLayer from "../GameLayer/BaseLayer";
import SoliderNode from "../Solider/SoliderNode";
import SoliderLayer from "../GameLayer/SoliderLayer";
import EnemyLayer from "../GameLayer/EnemyLayer";
import ResManager from "../../ResManager";
import EffectLayer from "../GameLayer/EffectLayer";
import Bullet from "../Solider/Bullet";
const {ccclass, property} = cc._decorator;
interface enemyComponent {
    component: cc.Node
    pos: { x: number, y: number }
}
@ccclass
export default class EnemyNode extends cc.Component {
    @property(sp.Skeleton)
    dieSpine:sp.Skeleton = null;
    @property(sp.Skeleton)
    hitSpine:sp.Skeleton = null;
    private _healthBar: cc.ProgressBar = null;
    private _collider: cc.Collider = null;
    private _colliderBody: cc.Collider = null;
    private _enemyId: number = 0;
    private _modelId: string;
    private _enemyObj: EnemyObj = null;
    private _enemyLevelIncrease: number = 0;
    private _componentList: Array<enemyComponent> = [];
    private _speed: number = 100;
    private _slowSpeed: number = 1;
    private _attackTween = null;
    private _enemySpine: sp.Skeleton = null;
    private _state: EnemyState = null;
    private _level: number = 0;
    private contactArray = [];
    private _index = 0;
    private scopeX:Array<number>;
    private scopeY:Array<number>;
    private targetX:number;
    private targetY:number;
    private atk_dis:number = 200;
    private space_dis:number = 50;
    /**开始攻击基地 */
    private isAttackBase:boolean = false;
    public get state(): EnemyState {
        return this._state;
    }
    public set state(value: EnemyState) {
        // if (this._soliderSpine.paused) this._soliderSpine.paused = false;
        // this._monsterSpine.timeScale = 1;
        this._state = value;
        switch (value) {
            case EnemyState.Stand:
                this._enemySpine.setAnimation(0, "hold", true);
                if(this.isEndDis()){
                    this.resstAttackTime();
                }else{
                    this.setStateRun();
                }
                break;
            case EnemyState.Attack:
                if(this._enemySpine.animation == 'attack'){
                    return;
                }
                let angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.attackTarget.node.x,this.attackTarget.node.y));
                //攻击时改变角色朝向，防止背对攻击
                if((angle<=-90&&angle>=-180)||(angle>90&&angle<=180)){
                    this.node.eulerAngles = cc.v3(0, 180, 0)
                }else if(angle>-90&&angle<=90){
                    this.node.eulerAngles = cc.v3(0, 0, 0)
                }
                this._enemySpine.setAnimation(0, "attack", true);
                break;
            case EnemyState.Run:
                this._enemySpine.setAnimation(0, "walk", true);
                if(this._attackTween) {
                    this._attackTween.stop();
                    this._attackTween = null;
                }
                break;
            case EnemyState.Death:
                EnemyLayer.instance.spliceEnemyArray(this);
                this.recoveryEnemy();
                this.dieSpine.node.active = true;
                this._enemySpine.enabled = false;
                this.dieSpine.setAnimation(0, "die", false);
                this.unschedule(this.bleed);
                break;
            case EnemyState.Break:
                break; 
            case EnemyState.Static:
            case EnemyState.Pause:
                break;
        }
        
    }
    /**当前血量 */
    private _healthValue: number = 0;
    public get healthValue(): number {
        return this._healthValue;
    }
    public set healthValue(value: number) {
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
        this._enemySpine = this.node.getComponent(sp.Skeleton);
        this._enemySpine.setCompleteListener(this.spineAnimEnd.bind(this));
        this.dieSpine.setCompleteListener(this.spineAnimEnd.bind(this));
        this.hitSpine.setCompleteListener(this.spineAnimEnd.bind(this));
    }

    start () {

    }
    
    setEnemyData(angle,enemyId:number,level:number){
        this.initialAngle = angle;
        this._enemyId = enemyId;
        if(this._enemyId == 400015){
            this._modelId = "guai1";
            this.atk_dis = 400;
            this.attackType = 1;
        }else{
            this._modelId = "guai2";
            this.atk_dis = 200;
            this.attackType = 0;
        }
    }
    setEnemyModel(){
        let skeletonData = SoliderLayer.instance.getSoliderModel(this._modelId);
        this._enemySpine.skeletonData = skeletonData;
    }
    /**最大血量 */
    maxHealthValue: number = 100;
    /**损失的血量 */
    lossHealthValue: number = 0;
    /**基础攻击力 */
    attackValue: number = 2;
    /**攻速 */
    attackSpeed: number = 1500;
    attackTarget = null;
    /**入场移动角度 */
    initialAngle: number = 0;
    /**是否正在入场 */
    isEnter:boolean = true;
    /**攻击类型 */
    attackType: number = 0;
    onEnable() {
        this._enemySpine.enabled = true;
        this.initAttackTarget();
        this.healthValue = this.maxHealthValue;
        this.setEnemyModel();
        this.state=EnemyState.Run;
        this.isEnter = true;
        this.isAttackBase = false;
        this.scheduleOnce(()=>{this.isEnter = false;},3)
    }
    recoveryEnemy() {
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
                //开始攻击基地后只有被小兵攻击才会切换攻击目标
                if(this.attackTarget == BaseLayer.instance){
                    this.isAttackBase = true;
                }
                if(this.attackType == 0){
                    //命中目标死亡
                    if (this.attackTarget.setHealthValue(-this.attackValue)) {
                        this.initAttackTarget();
                        this.setStateRun();
                        return
                    }
                }else this.creatorBullet();
                this.setEnemyState(EnemyState.Stand)
                break;
            case "die":
                ObjectPool.getInstance().put(this.node);
                break;
            case "beatk":
                this.setEnemyState(EnemyState.Stand);
                break;
            case "hit":
                this.hitSpine.node.active = false;
                break;   
            default:
                break;
        }
    }
    addComponentList(comObj: enemyComponent) {
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
        if(Solider!=null&&this.isAttackBase&&Solider.isOutBase){
            this.setAttackTarget(Solider);
        }
        // this.node.getComponent(cc.Animation).play();
        if (this.state == EnemyState.Death || value == 0) return true
        if (!this.node.parent) return true;
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
            this.setEnemyState(EnemyState.Death)
            return true;
        };
        this.healthValue = num;
        // this.setEnemyState(EnemyState.Break);
    }
    initAttackTarget(){
        this.attackTarget = BaseLayer.instance;
        let random = Util.random(0,1);
        if(random == 0){
            this.targetX = BaseLayer.instance.baseX - BaseLayer.instance.baseX/2;
            this.targetY = Util.random(BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 - 50, BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 50);
        }else{
            this.targetX = Util.random(BaseLayer.instance.baseX - BaseLayer.instance.baseHeight/2 - 50, BaseLayer.instance.baseX + BaseLayer.instance.baseHeight/2 + 50);
            this.targetY = BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 50;
        }
    }
    setAttackTarget(soliderNode){
        this.attackTarget = soliderNode;
        this.targetX = soliderNode.node.x;
        this.targetY = soliderNode.node.y;
    }
    //检测敌人 
    private inspectEnemy(){
        if(this.isEnter || this.isAttackBase) return
        let soliderArray = SoliderLayer.instance.soliderArray;
        let minPos:number = null;
        let targetNode = null;
        for (let i = 0; i < soliderArray.length; i++) {
            if(soliderArray[i].state == SoliderState.Death || !soliderArray[i].isOutBase) continue;
            if(minPos==null){
                minPos = Util.distance({x:soliderArray[i].node.x,y:soliderArray[i].node.y},{x:this.node.x,y:this.node.y});
                targetNode = soliderArray[i];
            }else{
                let dis = Util.distance({x:soliderArray[i].node.x,y:soliderArray[i].node.y},{x:this.node.x,y:this.node.y})
                if(dis<minPos){
                    minPos = dis;
                    targetNode = soliderArray[i];
                }
            }
        }
        if(targetNode!=null){
            this.setAttackTarget(targetNode);
        }
    }
    resstAttackTime() {
        //无法攻击
        if (this.state == EnemyState.Pause || this.state == EnemyState.Static || this.state == EnemyState.Break || this._attackTween != null) return

        let attackTime = this.attackSpeed / 1000 / this._slowSpeed;
        this._attackTween = cc.tween(this.node).delay(attackTime).call(() => {
            this._attackTween = null;
            this.setEnemyState(EnemyState.Attack);
        }).start();
    }
    gameUpdate(dt){
        //移动自身组件
        this.moveComponent();
        this.setzIndex(); 
        if (this._index <=0 &&this.state!=EnemyState.Death) {
            this._index = 50;
            this.inspectEnemy();
        }
        this._index--;
        if(this.attackTarget!=BaseLayer.instance&&this.attackTarget.state==EnemyState.Death){
            this.initAttackTarget();
            this.setStateRun();
            return;
        }
        if(this.state!=EnemyState.Run){
            return;
        }
        // if(this.isEndDis()&&this.attackTarget==BaseLayer.instance){
        //     this.setEnemyState(EnemyState.Attack)
        //     return;
        // }
        let angle;
        let isEndDis = 1;
        if(this.isEnter) angle = this.initialAngle;
        else {
            if(this.isEndDis()&&(Math.abs(this.node.y-this.targetY)<5 || this.attackType == 1)){
                this.setEnemyState(EnemyState.Attack)
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
        let x = Math.cos(angle * (Math.PI / 180)) * this._speed * this._slowSpeed * dt * isEndDis;
        let y = Math.sin(angle * (Math.PI / 180)) * this._speed * this._slowSpeed * dt;
        let targetX = this.node.x + x;
        let targetY = this.node.y + y;
        //移动到基地边缘时，根据角度阻止前进方向
        if(targetX>BaseLayer.instance.baseX - BaseLayer.instance.baseWidth/2 - 40 && targetY<BaseLayer.instance.baseY + BaseLayer.instance.baseHeight/2 + 40){
            if(angle<=-90&&angle>=-180){
                y = 0;
                x = x * 1.2;
            }else if(angle<=90&&angle>=0){
                x = 0;
                y = y * 1.2;
            }
        }
        //敌人朝向
        if((angle<=-90&&angle>=-180)||(angle>90&&angle<=180)&&isEndDis==1){
            this.node.eulerAngles = cc.v3(0, 180, 0)
        }else if(angle>-90&&angle<=90&&isEndDis==1){
            this.node.eulerAngles = cc.v3(0, 0, 0)
        }
        this.node.x += x; 
        this.node.y += y;
    }
    setzIndex() {
        this.node.zIndex = -this.node.y;
        this._healthBar.node.zIndex = this.node.zIndex;
    }
    isEndDis(){
        return Util.distance(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY))<this.atk_dis
    }
    setEnemyState(state: EnemyState) {
        if (this.state == EnemyState.Death) return;
        this.state = state;
    }
    setStateRun() {
        if (this.state == EnemyState.Death) return
        this.setEnemyState(EnemyState.Run);
    }
    creatorBullet() {
        let soliderBullet = ObjectPool.getInstance().get("bullet");
        let spriteData = ResManager.getInstance().getSpriteFrameRes("mao");
        soliderBullet.getComponent(Bullet).setBulletData(this, spriteData, this.attackTarget);
        EffectLayer.instance.addChildEffectNode(soliderBullet);
        soliderBullet.setPosition(this.node.position);
    }
    /**被击退 */
    setBackDis(x){
        let dis = 0;
        if(x<this.node.x){
            dis = 100;
        }else{
            dis = -100;
        }
        cc.tween(this.node)
                .by(0.5,{x:dis})
                .call(()=>{
                    this.initAttackTarget();
                    this.inspectEnemy();
                    this.setStateRun();
                })
                .start()
    }
    setBleed(){
        this.schedule(this.bleed,1,5);
    }
    setSlowSpeed(){
        this._enemySpine.timeScale = 0.5;
        this._slowSpeed = 0.5;
        this.scheduleOnce(()=>{
            this._enemySpine.timeScale = 1;
            this._slowSpeed = 1;
        },2)
    }
    bleed(){
        this.setHealthValue(-5);
    }
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
     onCollisionEnter(other, self) {
        let bullet = other.node.getComponent(Bullet)
        if(bullet.bulletLevel<4){
            return;
        }
        if(other.tag==2&&this.state!=EnemyState.Death){
            this.setHealthValue(-bullet.attackValue,bullet.source);
        }
    }
    // update (dt) {}
}
