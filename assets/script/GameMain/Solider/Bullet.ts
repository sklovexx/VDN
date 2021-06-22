import SoliderNode from "./SoliderNode";
import EnemyNode from "../Enemy/EnemyNode";
import ObjectPool from "../../ObjectPool";
import GameMainLayer from "../GameLayer/GameMainLayer";
import Util from "../../Util";
import { EnemyState } from "../Enemy/IEnemy"
import BaseLayer from "../GameLayer/BaseLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property(cc.Sprite)
    bulletSprite: cc.Sprite = null;

    private source;
    private _collider: cc.Collider = null;
    private _index = 0;
    private attackTarget = null;
    private targetX:number;
    private targetY:number;
    private bulletLevel:number = 1;
    private fixAngle:number;
    attackValue:number;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onEnable(){
        GameMainLayer.instance.addUpdateVoidArr(this);
    }
    gameUpdate(dt){
        //超出边界时回收
        if(this.isBounding()){
            GameMainLayer.instance.spliceUpdateVoidArr(this);
            ObjectPool.getInstance().put(this.node);
            return;
        }
        //当攻击目标改变时将当前子弹攻击目标设为null,即子弹飞往攻击目标改变前的最新位置时回收
        if(this.source.attackTarget==null||this.source.attackTarget.state == EnemyState.Death || (this.attackTarget&&this.source.attackTarget.uuid!=this.attackTarget.uuid)){
            this.attackTarget = null;
        }else if(this.attackTarget!=null&&this.attackTarget != BaseLayer.instance){
            //实时记录攻击目标的最新位置
            this.targetX = this.attackTarget.node.x;
            this.targetY = this.attackTarget.node.y + this.attackTarget.node.height/2;
        }
        if(this.isEndDis()&&this.bulletLevel<4){
            GameMainLayer.instance.spliceUpdateVoidArr(this);
            ObjectPool.getInstance().put(this.node);
            if(this.source.attackTarget==null||this.source.attackTarget.state == EnemyState.Death || this.attackTarget == null){
                this.attackEnd();
                return;
            }
            switch (this.bulletLevel) {
                case 1:
                    if(this.source.attackTarget.setHealthValue(-this.source.attackValue, this.source)){
                        this.attackEnd();
                        return;
                    }
                    break;
                case 2:
                    if(this.source.attackTarget.setHealthValue(-this.source.attackValue * 2, this.source, true)){
                        this.attackEnd();
                        return;
                    }
                    break;
                case 3:
                    if(this.source.attackTarget.setHealthValue(-this.source.attackValue, this.source)){
                        this.attackEnd();
                        return;
                    }
                    this.source.attackTarget.setSlowSpeed();
                    break;
                default:
                    break;
            }
            return;
        }
        if(this.isEndDis()&&this.bulletLevel==4&&this.fixAngle==null){
            this.node.getComponent(cc.BoxCollider).enabled = true;
            this.fixAngle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY)); 
        }
        let angle;
        //4级子弹飞至目标时固定角度飞至边界回收
        if(this.bulletLevel==4&&this.fixAngle!=null){
            angle = this.fixAngle;
        }
        else if(this.attackTarget==null || this.attackTarget==BaseLayer.instance){
            angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY)); 
        }else angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.attackTarget.node.x,this.attackTarget.node.y + this.attackTarget.node.height/2)); 
        this.node.angle = angle - 90;
        let x = Math.cos(angle * (Math.PI / 180)) * 800 * dt;
        let y = Math.sin(angle * (Math.PI / 180)) * 800 * dt;
        this.node.x += x; 
        this.node.y += y;
    }
    attackEnd(){
        this.source.initAttackTarget();
        this.source.inspectEnemy();
        this.source.setStateRun();
    }
    setBulletData(source: SoliderNode|EnemyNode, spriteData, attackTarget, level?:number, effect?:boolean, x?:number, y?:number) {
        this.bulletLevel = 1;
        this.fixAngle = null;
        this.source = source;
        this.attackTarget = attackTarget;
        this.bulletSprite.spriteFrame = spriteData
        this.attackValue = this.source.attackValue;
        if(level&&effect){
            this.bulletLevel = level;
        }
        if(x&&y){
            this.targetX = x;
            this.targetY = y;
            if(this.attackTarget != BaseLayer.instance){
                this.targetY = y + this.attackTarget.node.height/2;
            }
        }
    }
    isEndDis(){
        return Util.distance(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY)) < 30
    }
    isBounding(){
        if(this.node.x>cc.winSize.width/2||this.node.x<-cc.winSize.width/2||this.node.y>cc.winSize.height/2||this.node.y<-cc.winSize.height/2){
            return true;
        }
        return false
    }
    // update (dt) {}
}
