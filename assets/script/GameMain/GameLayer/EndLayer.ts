import { UIView } from "../../../framework/ui/UIView";
import ObjectPool from "../../ObjectPool";
import GameMainLayer from "./GameMainLayer";
import EnemyLayer from "./EnemyLayer";
import SoliderLayer from "./SoliderLayer";
import EffectLayer from "./EffectLayer";
import BaseLayer from "./BaseLayer";
import ResourceLayer from "./ResourceLayer";
import { uiManager } from "../../../framework/ui/UIManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EndLayer extends UIView {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onOpen(fromUI: number, ...arg): void {
        GameMainLayer.instance.pause();
    }

    onClose() {
    }
    reStart(){
        EnemyLayer.instance.clearAllEnemy();
        SoliderLayer.instance.clearAllSolider();
        EffectLayer.instance.clearAllEffect();
        BaseLayer.instance.reStart();
        ResourceLayer.instance.reStart();
        GameMainLayer.instance.resume();
        uiManager.close(this);
    }
    // update (dt) {}
}
