import { EventMgr } from "../../../framework/common/EventManager";
import { dataManager } from "../../Manager/dataManager";
import GameMainLayer from "../GameLayer/GameMainLayer"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        EventMgr.addEventListener("tabMap",this.tabMap,this)
    }
    tabMap() {
        if(dataManager.checkpointID == 1000){
            cc.pathFindMgr.removeObstable(this.getNodePoints());
        }else{
            cc.pathFindMgr.addObstable(this.getNodePoints());
        }
    }

    start () {

    }
    onEnable(){
        if(dataManager.checkpointID == 1001){
            this.getNodePoints();
            cc.pathFindMgr.addObstable(this.getNodePoints());
        }
        
    }
    onDisable(){
        if(dataManager.checkpointID == 1001){
            cc.pathFindMgr.removeObstable(this.getNodePoints());
        }
    }
    getNodePoints(){
        let rect = new cc.Rect(this.node.x,this.node.y,this.node.width,this.node.height);
        let pointArr = [];
        let rectxMin = rect.x - rect.width/2;
        let rectyMin = rect.y - rect.height/2;
        for(let i = 0;i < rect.width/cc.pathFindMgr.gx;i++){
            for(let j = 0;j < rect.height/cc.pathFindMgr.gx;j++){
                let point = {x:rectxMin + i*cc.pathFindMgr.gx,y:rectyMin + j*cc.pathFindMgr.gx};
                pointArr.push(point);
            }
        }
        return pointArr
    }
    // update (dt) {}
}
