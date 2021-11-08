"use strict";
cc._RF.push(module, '6f834FCZQNNhrho1fz+oZW6', 'ToastCtrl');
// NiuNiu/script/views/ToastCtrl.js

/**
 * Created by skyxu on 2019/3/22.
 */

"use strict";

var ViewBase = require("./../common/ViewBase");
var ViewMgr = require("./../common/ViewMgr");

var ToastCtrl = cc.Class({
    extends: ViewBase,

    properties: {
        content: cc.Label,
        bg: cc.Node
    },

    initView: function initView(content, t, cb) {
        this.content.string = content;
        this._cb = cb;
        this._t = t;
    },
    _rmSelf: function _rmSelf() {
        if (this._cb) {
            this._cb();
        }
        this.node.removeFromParent(true);
        this.node.destroy();
    },
    start: function start() {
        this._t = this._t ? this._t : 1;
        this.scheduleOnce(this._rmSelf, this._t);
    }
});

/**
 * 提示框
 * @param content{String} 内容
 * @param t{Number} 停留时间
 */
ToastCtrl.showText = function (content, t, cb) {
    t = t ? t : 1;
    var toast = cc.instantiate(GlobalNiuNiu.assetMgr.toastPrefab);
    var tCtrl = toast.getComponent("ToastCtrl");
    tCtrl.initView(content, t, cb);
    ViewMgr.getInstance().pushViewImmediate(toast);
};

cc._RF.pop();