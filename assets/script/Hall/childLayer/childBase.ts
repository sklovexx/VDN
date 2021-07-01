import ResManager from "../../ResManager";
import UIHelper from "../../UIHelper";
import { UIView } from "../../../framework/ui/UIView";
import { uiManager } from "../../../framework/ui/UIManager";

const { ccclass, property } = cc._decorator;

/**子页面基类 */
@ccclass
export default class childBase extends UIView {

    @property({ type: cc.Button })
    private btnClose: cc.Button = null;

    protected _rootNode: cc.Node;

    init(...arg): void {
        this._rootNode = this.node.getChildByName('spr_bg');
        if (!this.btnClose) return
        UIHelper.bindComponent(this, this.btnClose.node, "onClickCloseBtn");
    }
    onOpen(fromUI: number, ...arg): void {
        this.setMask();
        this.setData(arg);
    }
    /**设置遮罩 */
    setMask() {
        if (this.node.getChildByName("maskLayer")) return;
        let maskPrefab = ResManager.getInstance().getCommonPrefabRes("maskLayer");
        let _masklayer = cc.instantiate(maskPrefab);
        _masklayer.name = "maskLayer"
        _masklayer.zIndex = 0;
        this.node.addChild(_masklayer);
        let bg = this.node.getChildByName("spr_bg")
        bg.zIndex = 1;
        // let node = this.node.getParent().getParent()
        // //console.log("node == " + node.name)
        // node.zIndex = 2;
    }
    // 手动关闭
    public onClickCloseBtn(event?: cc.Event.EventTouch) {
        this.node.getParent().getParent().zIndex = 0;
        uiManager.close(this);
    }

    public onOpenAniOver() {

    }
    /**设置参数 */
    public setData(...arg) { };
}
