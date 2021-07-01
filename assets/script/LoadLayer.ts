const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadLayer extends cc.Component {

    @property(cc.ProgressBar)
    loadBar: cc.ProgressBar = null;
    // @property(cc.Node)
    // spineNode: cc.Node = null;
    // @property(cc.Node)
    // lineNode: cc.Node = null
    // @property(cc.Node)
    // spineNode2: cc.Node = null;
    @property(cc.Label)
    loadWZLab: cc.Label = null;

    private barVal = 0;
    private actionTime = 10;//进度条时间 5秒
    private speed = 0.9 / (this.actionTime * 60);

    private callBack = null;
    onLoad() {

    }

    onEnable() {
        // this.lineNode.height = 30;
    }

    start() {
        this.schedule(this.updateBar, 1 / 60)
    }

    onDestroy() {
        //console.log("onDestroy")
        this.node.stopAllActions()
        this.callBack()
    }

    setSpineNodeX() {
        // this.spineNode.x = (this.barVal * 400) + 233;
    }

    updateBar(dt) {
        if (this.barVal > 0.9) {
            return
        }
        // this.lineNode.height += 5;
        // this.spineNode2.y = -this.lineNode.height;
        this.loadBar.progress = this.barVal
        this.setSpineNodeX();
        this.barVal = this.barVal + this.speed;
        this.loadWZLab.string = (this.barVal * 100).toFixed(2) + "%";
    }

    setBarComplete(callback) {
        this.unschedule(this.updateBar);
        this.callBack = callback;
        this.loadBar.progress = 1;
        this.barVal = 1;
        this.setSpineNodeX();
        this.loadWZLab.string = "100%";
        cc.tween(this.node).delay(0.1).call(() => {
            this.node.removeFromParent(true);
            this.node.destroy();
        }).start()
    }
}
