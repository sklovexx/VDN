import UIHelper from "../../UIHelper";
import ObjectPool from "../../ObjectPool";
import ResourceLayer from "./ResourceLayer";
import { EventMgr } from "../../../framework/common/EventManager";
import { ResourceType } from "../Resource/ResourceType";
import SoliderLayer from "./SoliderLayer";
import EffectLayer from "./EffectLayer";
import GameMainLayer from "./GameMainLayer";
import MenuLayer from "./MenuLayer";
import { uiManager } from "../../../framework/ui/UIManager";
import { UIID } from "../../UIConfig";
const {ccclass, property} = cc._decorator;
export enum tentType {
    Footmen,
    Archers,
    Horsemen
}
@ccclass
export default class BaseLayer extends cc.Component {
    static instance: BaseLayer;
    @property(cc.ProgressBar)
    healthBar: cc.ProgressBar = null;
    @property(cc.Sprite)
    progress: cc.Sprite = null;
    @property(cc.Sprite)
    expProgress: cc.Sprite = null;
    @property(cc.Node)
    progressNode: cc.Node = null;
    @property(cc.Node)
    soliderBtn: Array<cc.Node> = [];
    @property(cc.Label)
    label_need_gold: cc.Label = null;
    @property(cc.Label)
    label_need_wood: cc.Label = null;
    baseX:number;
    baseY:number;
    baseWidth:number;
    baseHeight:number;
    private progressSchedule;
    /**最大血量 */
    private maxHealthValue: number = 10000;
    /**当前血量 */
    private _healthValue: number = 10000;
    /**士兵加载进度 */
    private soliderFillRangle:Array<number> = [0,0,0];
    /**兵营建造进度 */
    private tentProgress:Array<number>= [0,0,0];
    /**兵营经验进度 */
    private tentExpProgress:Array<number>= [0,0,0];
    /**兵营等级 */
    private tentLevel:Array<number>= [1,1,1];
    private curTentType:tentType;
    private delayArg:number;
    public get healthValue(): number {
        return this._healthValue;
    }
    public set healthValue(value: number) {
        this._healthValue = value;
        this.setHealthBar();
    }
    onLoad () {
        BaseLayer.instance = this;
        this.baseX = this.node.x;
        this.baseY = this.node.y;
        this.baseWidth = 500;
        this.baseHeight = this.node.height;
        this.soliderBtn.forEach(e=>{
            e.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
            e.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
            e.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd, this);
        });
        EventMgr.addEventListener("resourceUpdate",this.resourceUpdate,this);
    }
    start(){
        this.soliderFillRangle = [0,0,0];
        this.tentProgress = [-1,-1,-1];
        this.tentExpProgress = [0,0,0];
        this.tentLevel = [1,1,1];
        this.delayArg = 0;
    }
    onDisable(){
        this.unschedule(this.creatorSolider);
        this.unschedule(this.constructTent);
    }
    TouchStart(event){
        let name = event.target.name;
        switch (name) {
            case "_btn_solider_footmen":
                if(ResourceLayer.instance.curResourceType == ResourceType.Footmen){
                    return;
                }else{
                    ResourceLayer.instance.curResourceType = ResourceType.Footmen;
                    this.curTentType = tentType.Footmen;
                    this.label_need_wood.string = "0";
                }
                break;
            case "_btn_solider_archers":
                if(ResourceLayer.instance.curResourceType == ResourceType.Archers){
                    return;
                }else{
                    ResourceLayer.instance.curResourceType = ResourceType.Archers;
                    this.curTentType = tentType.Archers;
                    this.label_need_wood.string = "20";
                }
                break;
            case "_btn_solider_horsemen":
                if(ResourceLayer.instance.curResourceType == ResourceType.Horsemen){
                    return;
                }else{
                    ResourceLayer.instance.curResourceType = ResourceType.Horsemen;
                    this.curTentType = tentType.Horsemen;
                    this.label_need_wood.string = "20";
                }
                break;
            default:
                break;
        }
        this.progressNode.x = this.soliderBtn[this.curTentType].x;
        this.progressNode.y = this.soliderBtn[this.curTentType].y + 200;
        EventMgr.raiseEvent("resourceUpdate");
        this.progressNode.opacity = 255;
        if(this.tentProgress[this.curTentType]>-1){
            this.progress.fillRange = this.tentProgress[this.curTentType];
            this.expProgress.fillRange = this.tentExpProgress[this.curTentType];
            this.schedule(this.constructTent,0.01);
        }else{
            this.progress.fillRange = this.soliderFillRangle[this.curTentType];
            this.expProgress.fillRange = this.tentLevel[this.curTentType]>=4? -1 : this.tentExpProgress[this.curTentType];
            this.startCreatorSolider();
        }
    }
    TouchEnd(event){
        ResourceLayer.instance.curResourceType = null;
        this.curTentType = null;
        this.resourceUpdate();
    }
    resourceUpdate(){
        this.progressNode.opacity = 0;
        this.progress.fillRange = 0;
        this.unschedule(this.creatorSolider);
        this.unschedule(this.constructTent);
        this.delayArg = 0;
    }
    constructTent(){
        if(ResourceLayer.instance.goldNumber<1){
            this.createResourceAddNode('金币不足')
            return;
        }
        if(ResourceLayer.instance.woodNumber<1){
            this.createResourceAddNode('木材不足')
            return;
        }
        this.progress.fillRange -= 0.005 * MenuLayer.instance.curSpeed;
        this.tentProgress[this.curTentType] = this.progress.fillRange;
        ResourceLayer.instance.goldNumber = ResourceLayer.instance._goldNumber - 1 * MenuLayer.instance.curSpeed;
        ResourceLayer.instance.woodNumber = ResourceLayer.instance._woodNumber - 1 * MenuLayer.instance.curSpeed;
        if(this.progress.fillRange <= -1){
            EffectLayer.instance.soliderTent[this.curTentType].active = true;
            this.unschedule(this.constructTent);
            this.progress.fillRange = this.soliderFillRangle[this.curTentType];
            this.startCreatorSolider();
        }
    }
    startCreatorSolider(){
        this.schedule(this.creatorSolider,0.01);
    }
    creatorSolider(){
        this.delayArg++;
        if(this.delayArg<30 && this.soliderFillRangle[this.curTentType] == 0){
            return;
        }
        if(ResourceLayer.instance.goldNumber<1){
            this.createResourceAddNode('金币不足')
            return;
        }
        if(ResourceLayer.instance.woodNumber<1){
            this.createResourceAddNode('木材不足')
            return;
        }
        this.progress.fillRange -= 0.01 * MenuLayer.instance.curSpeed;
        this.soliderFillRangle[this.curTentType] = this.progress.fillRange;
        ResourceLayer.instance.goldNumber = ResourceLayer.instance._goldNumber - 0.2 * MenuLayer.instance.curSpeed;
        if(this.curTentType != tentType.Footmen){
            ResourceLayer.instance.woodNumber = ResourceLayer.instance._woodNumber - 0.2 * MenuLayer.instance.curSpeed;
        }
        if(this.progress.fillRange <= -1){
            this.delayArg = 0;
            this.progress.fillRange = 0;
            let soliderId;
            if(this.curTentType == tentType.Footmen ||this.curTentType == tentType.Horsemen){
                soliderId = 400001;
            }else if(this.curTentType == tentType.Archers){
                soliderId = 400039;
            }
            this.soliderFillRangle[this.curTentType] = 0;
            SoliderLayer.instance.creatorSolider(this.curTentType,soliderId,this.tentLevel[this.curTentType],EffectLayer.instance.soliderTent[this.curTentType].position);
            if(this.tentLevel[this.curTentType]<4){
                this.expProgress.fillRange -= 0.1;
                if((Math.round(this.expProgress.fillRange*100)/100) <= -1){
                    this.expProgress.fillRange = 0;
                    this.tentLevel[this.curTentType]++;
                }
                if(this.tentLevel[this.curTentType]>=4){
                    this.tentExpProgress[this.curTentType] = this.expProgress.fillRange = -1;
                }else{
                    this.tentExpProgress[this.curTentType] = this.expProgress.fillRange
                }
            }
        }
    }
    createResourceAddNode(text:string){
        let objPool = ObjectPool.getInstance();
        let resourceAddNode = objPool.get("reourceAddNode");
        resourceAddNode.getComponent(cc.Label).string = text;
        this.node.addChild(resourceAddNode);
        let animation = resourceAddNode.getComponent(cc.Animation);
        animation.play();
        animation.on('finished',()=>{
            ObjectPool.getInstance().put(resourceAddNode);
        },this);
    }
    onDestroy(){
        BaseLayer.instance = null;
    }
    setHealthBar() {
        let scale = this.healthValue / this.maxHealthValue;
        this.healthBar.progress = scale;
        return scale;
    }
    /**设置当前血量 */
    setHealthValue(value: number) {
        if (!this.node.parent) return
        let num = this.healthValue + value;
        if (num <= 0) {
            console.log('游戏结束');
            this.node.active = false;
            uiManager.open(UIID.EndLayer, true);
            return true;
        };
        this.healthValue = num;
    }
    reStart(){
        this.node.active = true;
        this.healthValue = this.maxHealthValue;
    }
    // update (dt) {}
}
