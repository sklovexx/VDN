import { uiManager } from "../../../../framework/ui/UIManager";
import GameConfig from "../../../GameConfig";
import { UIID } from "../../../UIConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CheckPointItem extends cc.Component {

    @property(cc.Label)
    label_name: cc.Label = null;
    @property(cc.Label)
    label_description: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    private checkpointData:any;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this)
    }
    onClick() {
        uiManager.open(UIID.CheckPointHelp,this.checkpointData);
    }
    checkpointID:string;
    start () {

    }
    setData(checkpointID){
        this.checkpointData = GameConfig.getInstance().getJson("checkpoint")[checkpointID];
        this.label_name.string = cc.js.formatStr("%s",this.checkpointData.name);
        this.label_description.string = cc.js.formatStr("%s",this.checkpointData.description);
    }

    // update (dt) {}
}
