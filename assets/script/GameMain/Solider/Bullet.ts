import SoliderNode from "./SoliderNode";
import EnemyNode from "../Enemy/EnemyNode";
import ObjectPool from "../../ObjectPool";
import GameMainLayer from "../GameLayer/GameMainLayer";
import Util from "../../Util";
import { EnemyState } from "../Enemy/IEnemy"
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
        if(this.isBounding()){
            GameMainLayer.instance.spliceUpdateVoidArr(this);
            ObjectPool.getInstance().put(this.node);
            return;
        }
        if(this.source.attackTarget==null||this.source.attackTarget.state == EnemyState.Death || (this.attackTarget&&this.source.attackTarget.uuid!=this.attackTarget.uuid)){
            this.attackTarget = null;
        }else if(this.attackTarget!=null){
            this.targetX = this.attackTarget.node.x;
            this.targetY = this.attackTarget.node.y;
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
                    if(this.source.attackTarget.setHealthValue(-this.source.attackValue * 1.5, this.source, true)){
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
            this.fixAngle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY)); 
        }
        let angle;
        if(this.bulletLevel==4&&this.fixAngle!=null){
            angle = this.fixAngle;
        }
        else if(this.attackTarget==null){
            angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY)); 
        }else angle = Util.getAngle(cc.v2(this.node.x,this.node.y),cc.v2(this.attackTarget.node.x,this.attackTarget.node.y)); 
        this.node.angle = angle - 90;
        let x = Math.cos(angle * (Math.PI / 180)) * 600 * dt;
        let y = Math.sin(angle * (Math.PI / 180)) * 600 * dt;
        this.node.x += x; 
        this.node.y += y;
    }
    attackEnd(){
        this.source.initAttackTarget();
        this.source.inspectEnemy();
        this.source.setStateRun();
    }
    setBulletData(source: SoliderNode|EnemyNode, spriteData, attackTarget, level?:number, effect?:boolean) {
        this.bulletLevel = 1;
        this.fixAngle = null;
        this.source = source;
        this.attackTarget = attackTarget;
        this.bulletSprite.spriteFrame = spriteData
        this.attackValue = this.source.attackValue;
        if(level&&effect){
            this.bulletLevel = level;
        }
    }
    isEndDis(){
        return Util.distance(cc.v2(this.node.x,this.node.y),cc.v2(this.targetX,this.targetY)) < 50
    }
    isBounding(){
        if(this.node.x>cc.winSize.width/2||this.node.x<-cc.winSize.width/2||this.node.y>cc.winSize.height/2||this.node.y<-cc.winSize.height/2){
            return true;
        }
        return false
    }
    // update (dt) {}
}
