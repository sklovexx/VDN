(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/util/event_lister.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd485eyCsiBLBqweDM7SjVQh', 'event_lister', __filename);
// ddz/scripts/util/event_lister.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var eventLister = function eventLister(obj) {
    var register = {};

    obj.on = function (type, method) {
        if (register.hasOwnProperty(type)) {
            register[type].push(method);
        } else {
            register[type] = [method];
        }
    };

    obj.fire = function (type) {
        if (register.hasOwnProperty(type)) {
            var methodList = register[type];
            for (var i = 0; i < methodList.length; ++i) {
                var handle = methodList[i];
                var args = [];
                for (var i = 1; i < arguments.length; ++i) {
                    args.push(arguments[i]);
                }

                //handle.call(this,args)
                console.log("handle.call(this,args) type:" + type);
                handle.apply(this, args);
            }
        }
    };

    obj.removeLister = function (type) {
        register[type] = [];
    };

    obj.removeAllLister = function () {
        register = {};
    };

    return obj;
};

exports.default = eventLister;
module.exports = exports["default"];

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
        //# sourceMappingURL=event_lister.js.map
        