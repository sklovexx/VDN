"use strict";
cc._RF.push(module, '8d9aby287FNLoErBwjCZgo/', 'GraySprite');
// NiuNiu/script/common/GraySprite.js

/**
 * Created by skyxu on 2018/5/7.
 * 精灵组件，让精灵置灰
 */

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        _gray: false,
        gray: {
            type: Boolean,
            set: function set(g) {
                this._gray = g;
                var s = g ? 1 : 0;
                this.getComponent(cc.Sprite)._sgNode.setState(s);
            },
            get: function get() {
                return this._gray;
            }
        }
    },

    onLoad: function onLoad() {
        this.gray = this._gray;
    }
});

cc._RF.pop();