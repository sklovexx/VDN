import { audioMgr } from "../framework/audio/AudioMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(sp.Skeleton)
    soliderSpine:sp.Skeleton = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        audioMgr.playEffect("picador_atk");
        this.soliderSpine.setAnimation(0, "attack", false);
        this.soliderSpine.setCompleteListener(()=>{
            setTimeout(()=>{
                audioMgr.playEffect("picador_atk");
                this.soliderSpine.setAnimation(0, "attack", false);
            },1000)
        });
    }

    // update (dt) {}
}
