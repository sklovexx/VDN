
import { ResourceType } from "../Resource/ResourceType";
import { EventMgr } from "../../../framework/common/EventManager";
import GameMainLayer from "./GameMainLayer";
import MenuLayer from "./MenuLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceLayer extends cc.Component {
    static instance:ResourceLayer;
    @property(cc.Label)
    label_gold:cc.Label = null;
    @property(cc.Label)
    label_wood:cc.Label = null;
    @property(cc.Node)
    futou:cc.Node = null;
    @property(cc.Node)
    gaozi:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    _goldNumber:number = 0;
    public get goldNumber(): number {
        return this._goldNumber;
    }
    public set goldNumber(value: number) {
        this.label_gold.string = cc.js.formatStr("%s", Math.round(value));
        this._goldNumber = value;
    }
    _woodNumber:number = 0;
    public get woodNumber(): number {
        return this._woodNumber;
    }
    public set woodNumber(value: number) {
        this.label_wood.string = cc.js.formatStr("%s", Math.round(value));
        this._woodNumber = value;
    }
    curResourceType:ResourceType;
    onLoad () {
        ResourceLayer.instance = this;
        this.goldNumber = 1000;
        this.woodNumber = 1000;
    }
    onDestroy(){
        ResourceLayer.instance = null;
    }
    addResource(resourceType:ResourceType,number:number){
        if(resourceType == ResourceType.Gold){
            this.goldNumber = this._goldNumber + number * MenuLayer.instance.curSpeed;
        }else{
            this.woodNumber = this._woodNumber + number * MenuLayer.instance.curSpeed;
        }
    }
    start () {

    }
    reStart(){
        this.goldNumber = 1000;
        this.woodNumber = 1000;
    }
    // update (dt) {}
}
