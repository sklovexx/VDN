import { EventMgr } from "../../../framework/common/EventManager";
import { dataManager } from "../../Manager/dataManager";
import childBase from "./childBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends childBase {

    @property(cc.Label)
    label_name: cc.Label = null;
    @property(cc.Label)
    label_description: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start () {

    }
    setData(arg){
        let data = arg[0];
        dataManager.checkpointID = data.level_id;
        this.label_name.string = cc.js.formatStr("%s",data.name);
        this.label_description.string = cc.js.formatStr("%s",data.description);
    }
    onBattleBtnClick(){
        EventMgr.raiseEvent("startGame");
    }
    // update (dt) {}
}
