(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Global/GlobalEvent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c347aQ7szpGVZmWaAZr75xU', 'GlobalEvent', __filename);
// Script/Global/GlobalEvent.js

'use strict';

cc.director.GlobalEvent = {
    _handles: {},

    // 触发事件
    emit: function emit(event, data) {
        var rArray = [];

        //data.event = event;

        for (var name in this._handles) {
            if (name === event) {
                for (var i = 0; i < this._handles[name].length; i++) {
                    if (typeof this._handles[name][i] === 'function') {
                        var rValue = this._handles[name][i](data);
                        rArray.push(rValue);
                    }
                }
            }
        }
        return rArray;
    },

    // 监听事件
    on: function on(event, callback, target) {
        this._handles[event] = this._handles[event] || [];
        this._handles[event].push(callback.bind(target));
        return this;
    },

    // 取消监听
    off: function off(event) {
        this._handles[event] = [];
        return this;
    },
    offAll: function offAll() {
        this._handles = {};
        return this;
    }
};

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
        //# sourceMappingURL=GlobalEvent.js.map
        