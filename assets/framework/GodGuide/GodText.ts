import { loadGuide } from "./LoadGuide";

const { ccclass, property } = cc._decorator;
@ccclass
export default class GodText extends cc.Component {

    //显示的文本
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Node)
    tipsNode: cc.Node = null;

    callback: any;
    _tipsWidget: cc.Widget;

    onLoad() {
        this._tipsWidget = this.tipsNode.getComponent(cc.Widget);
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
    }

    setText(txt, pos, cb?) {
        // this.tipsNode.setPosition(pos);
        this._tipsWidget.isAlignTop = pos.isAlignTop;
        this._tipsWidget.isAlignBottom = pos.isAlignBottom;
        this._tipsWidget.top = pos.top;
        this._tipsWidget.bottom = pos.bottom;
        this._tipsWidget.updateAlignment();
        this.callback = cb;
        this.node.active = true;
        loadGuide._godGuide.node.active = true;
        // if (!this.label) {
        //     this.label = this.node.getComponentInChildren(cc.Label);
        // }
        this.label.string = txt;
    }
}
