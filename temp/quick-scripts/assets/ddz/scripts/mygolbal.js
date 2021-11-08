(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/mygolbal.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd9667atqdBHIb60A67blB9L', 'mygolbal', __filename);
// ddz/scripts/mygolbal.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket_ctr = require("./data/socket_ctr.js");

var _socket_ctr2 = _interopRequireDefault(_socket_ctr);

var _player = require("./data/player.js");

var _player2 = _interopRequireDefault(_player);

var _event_lister = require("./util/event_lister.js");

var _event_lister2 = _interopRequireDefault(_event_lister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myglobal = {} || myglobal;
myglobal.socket = (0, _socket_ctr2.default)();
myglobal.playerData = (0, _player2.default)();
myglobal.eventlister = (0, _event_lister2.default)({});
myglobal.roomState = 0;
myglobal.allPlayerData = [];
exports.default = myglobal;
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
        //# sourceMappingURL=mygolbal.js.map
        