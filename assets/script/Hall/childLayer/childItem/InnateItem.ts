import { uiManager } from "../../../../framework/ui/UIManager";
import { UIID } from "../../../UIConfig";
import { EventMgr } from "../../../../framework/common/EventManager";
import LocalStorageData from "../../../LocalStorageData";
import UserLocalData from "../../../UserLocalData";
const {ccclass, property} = cc._decorator;

@ccclass
export default class InnateItem extends cc.Component {

    @property(cc.Node)
    stars: Array<cc.Node> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
        EventMgr.addEventListener("updateInnateData",this.updateUI,this);
    }
    id:string;
    start () {

    }
    setData(id){
        this.id = id;
        this.updateUI();
    }
    updateUI(){
        let data = UserLocalData.getLocalStorage(LocalStorageData.PlayerInnateData)[this.id];
        this.stars.forEach(e=>{
            e.active = false;
        })
        for(let i = 0;i<data.level;i++){
            this.stars[i].active = true;
        }
    }
    onDestroy(){
        EventMgr.removeEventListener("updateInnateData",this.updateUI,this);
    }
    onClick(){
        if(uiManager.getUI(UIID.InnateFrame)){
            uiManager.close(uiManager.getUI(UIID.InnateFrame))
        }
        uiManager.open(UIID.InnateFrame,this.id)
    }
}
