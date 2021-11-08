(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/data/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ec2a0fYPv1ASr8YTOKp3Np/', 'player', __filename);
// ddz/scripts/data/player.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getRandomStr = function getRandomStr(count) {
    var str = '';
    for (var i = 0; i < count; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
};

var playerData = function playerData() {
    var that = {};

    //that.uniqueID = "200000";
    //that.uniqueID = "1328014"
    that.uniqueID = 1 + getRandomStr(6);
    that.accountID = "2" + getRandomStr(6);
    that.nickName = "tiny" + getRandomStr(3);
    var str = "avatar_" + (Math.floor(Math.random() * 3) + 1);
    that.avatarUrl = str; //随机一个头像
    that.gobal_count = 0;
    that.master_accountid = 0;
    return that;
};

exports.default = playerData;
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
        //# sourceMappingURL=player.js.map
        