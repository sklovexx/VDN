"use strict";
cc._RF.push(module, '3d915DioGxOC6wlj6B9/lLu', 'SwitchControl');
// NiuNiu/script/common/SwitchControl.js

/**
 * Created by skyxu on 2018/8/23.
 */

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        isOn: {
            default: true,
            notify: function notify() {
                this._updateState();
            }
        },

        interactable: true,

        bgOnSp: cc.Sprite,
        bgOffSp: cc.Sprite,
        barSp: cc.Sprite,

        switchEvents: {
            default: [],
            type: cc.Component.EventHandler
        }
    },

    _updateState: function _updateState() {
        if (this.isOn) {
            this.barSp.node.x = this.bgOffSp.node.x + 10;
        } else {
            this.barSp.node.x = this.bgOnSp.node.x - 10;
        }
    },
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },
    onClick: function onClick(event) {
        if (!this.interactable) {
            return;
        }
        this.isOn = !this.isOn;
        if (this.switchEvents) {
            cc.Component.EventHandler.emitEvents(this.switchEvents, this);
        }
    },
    start: function start() {}
});

cc._RF.pop();