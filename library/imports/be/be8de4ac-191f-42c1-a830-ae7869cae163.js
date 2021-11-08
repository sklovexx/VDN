"use strict";
cc._RF.push(module, 'be8deSsGR9CwagwrnhpyuFj', 'BtnCtrl');
// NiuNiu/script/common/BtnCtrl.js

/**
 * Created by skyxu on 2018/3/13.
 * 该节点有button组件，通过接受消息来控制button的可用与不可用
 */

"use strict";

var GCONFIG = require("./GCONFIG");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var btn = this.node.getComponent(cc.Button);
        if (!btn) {
            return;
        } else {
            // btn.enableAutoGrayEffect = true;
            GlobalNiuNiu.eventManager.on(GCONFIG.EVENT_ONSPIN, this._onStartSpin, this);
            GlobalNiuNiu.eventManager.on(GCONFIG.EVENT_STOPSPIN, this._onStopSpin, this);
        }
    },


    _onStartSpin: function _onStartSpin() {
        var btn = this.node.getComponent(cc.Button);
        btn.interactable = false;
    },
    _onStopSpin: function _onStopSpin() {
        var btn = this.node.getComponent(cc.Button);
        btn.interactable = true;
    },

    // start () {

    // },

    onDestroy: function onDestroy() {
        GlobalNiuNiu.eventManager.off(GCONFIG.EVENT_ONSPIN, this._onStartSpin);
        GlobalNiuNiu.eventManager.off(GCONFIG.EVENT_STOPSPIN, this._onStopSpin);
    }

    // update (dt) {},
});

cc._RF.pop();