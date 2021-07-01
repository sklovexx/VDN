import GameConfig from "../../GameConfig";
import ResManager from "../../ResManager";
import childBase from "./childBase";
import checkPointItem from "./childItem/CheckPointItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CheckPoint extends childBase {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    checkPointRoot: cc.Node = null;
    // onLoad () {}

    start () {

    }
    setData(){
        let checkPointObj = GameConfig.getInstance().getJson('checkpoint');
        for(let i in checkPointObj){
            let checkPointItemPrefab = ResManager.getInstance().getPrefabRes("checkPointItem");
            let checkPointItemNode = cc.instantiate(checkPointItemPrefab);
            checkPointItemNode.getComponent(checkPointItem).setData(i);
            this.checkPointRoot.addChild(checkPointItemNode);
        }
    }
    onClose(){
        this.checkPointRoot.removeAllChildren();
    }
    // update (dt) {}
}
