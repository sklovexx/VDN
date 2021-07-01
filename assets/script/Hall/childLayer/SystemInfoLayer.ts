import { uiManager } from "../../../framework/ui/UIManager";
import childBase from "./childBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SystemInfoLayer extends childBase {

    @property(cc.Label)
    label_info: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tween:any;
    start () {

    }
    setData(arg){
        this.label_info.string = arg[0];
        if(this.tween){
            this.node.opacity = 255;
            this.tween.stop();
        }
        this.tween = cc.tween(this.node)
            .to(2,{opacity:255})
            .to(0.25,{opacity:0})
            .call(()=>{
                uiManager.close(this);
            })
            .start();
    }
    // update (dt) {}
}
