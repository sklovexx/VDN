(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/ViewMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '981f3vJkZhPjbyqp7Nh8M6i', 'ViewMgr', __filename);
// NiuNiu/script/common/ViewMgr.js

/**
 * Created by skyxu on 2018/3/27.
 */

"use strict";

var GCONFIG = require("./GCONFIG");

var ViewMgr = cc.Class({

    ctor: function ctor() {

        /**
         *
         * @type {Array.<View>}
         * @private
         */
        this._views = [];

        this.rootNode = null;

        this._isShowing = false; // 标记当前有view正在显示

        /**
         * @type {cc.Node}
         */
        this.loading = null;

        GlobalNiuNiu.eventMgr.on(GCONFIG.EVENT_CHANGE_SCENE, function () {
            this.beforeChangeScene();
        }, this);
    },

    statics: {
        _instance: null,
        getInstance: function getInstance() {
            if (!ViewMgr._instance) {
                ViewMgr._instance = new ViewMgr();
            }
            return ViewMgr._instance;
        }
    },

    /**
     * 切换场景之前要调用一下，用来移除所有没有移除的view
     */
    beforeChangeScene: function beforeChangeScene() {
        cc.log("---before change scene.");
        this.removeAllView();
    },


    /**
     * 显示视图
     * @param {cc.Node} view inherit ViewBase
     * @param {Boolean} noMask
     * @param {Boolean} immediatelyHandle 是否立即开始调用回掉函数
     */
    pushView: function pushView(view, noMask, immediatelyHandle) {
        this._pushViewAndInit(view, noMask, immediatelyHandle);
        view.getComponent("ViewBase")._owner = this;
        this._views.push(view);
        this._sortView();
        this._showNextView();
    },

    _pushViewAndInit: function _pushViewAndInit(view, noMask, immediatelyHandle) {
        var viewBase = view.getComponent("ViewBase");
        cc.assert(viewBase, "view must has component ViewBase or inherit ViewBase.");

        if (!this.rootNode) {
            var root = cc.Canvas.instance.node;
            this.rootNode = new cc.Node();
            this.rootNode.width = root.width;
            this.rootNode.height = root.height;
            this.rootNode.zIndex = GCONFIG.LOCAL_ZINDEX_MAX;
            root.addChild(this.rootNode);
        }

        if (noMask && viewBase.mask) {
            viewBase.mask.active = false;
        }
        viewBase.immediatelyHandle = immediatelyHandle !== undefined ? immediatelyHandle : false;
    },


    // 独立于队列，直接显示
    pushViewImmediate: function pushViewImmediate(view, noMask, immediatelyHandle) {
        this._pushViewAndInit(view, noMask, immediatelyHandle);
        view.getComponent("ViewBase").showWithAni();
        this.rootNode.addChild(view);
    },
    onViewDestroy: function onViewDestroy() {
        this._isShowing = false;
        this._showNextView();
    },
    _sortView: function _sortView() {
        // todo:  可以对队列里的view按照某个顺序进行排序
    },
    _showNextView: function _showNextView() {
        if (this._isShowing) {
            return;
        }

        if (this._views.length < 0) {
            return;
        }

        var view = this._views.shift();

        if (view) {
            view.getComponent("ViewBase").showWithAni();
            this.rootNode.addChild(view);
            this._isShowing = true;
        } else {
            this._isShowing = false;
        }
    },


    removeAllView: function removeAllView() {
        for (var i = 0; i < this._views.length; i++) {
            var view = this._views[i];
            view.destroy();
        }
        if (this.loading) {
            this.loading.parent = null;
            this.loading.destroy();
            this.loading = null;
        }
        if (this.rootNode) {
            this.rootNode.parent = null;
            this.rootNode.destroy();
            this.rootNode = null;
        }
        this._views = [];
        this._isShowing = false;
    }
});

module.exports = ViewMgr;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ViewMgr.js.map
        