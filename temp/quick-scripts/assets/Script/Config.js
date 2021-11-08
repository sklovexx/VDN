(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Config.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ad421JwltpGp7gZdhlgNvti', 'Config', __filename);
// Script/Config.js

"use strict";

window.Config = {
    // baseUrl:"http://interface.app.ecciot.net/api/",//新版ECC
    // baseUrl:"http://47.104.224.184:8096/api/",//旧版ECC
    // baseUrl:"http://106.55.241.55:9501/api/",//旧版ECC
    baseUrl: "http://192.168.2.99:9501/api/", //本地接口
    // baseUrl:"http://api.vdnmetaverse.org/api/",//正式发布
    // baseUrl:"http://interface.app.goailab.com/api/",//Dssc
    // baseUrl:"http://interface.newapp.cnyiliaosc.com/api/",//USDT
    // baseUrl:"http://192.168.199.221:8091/api/",
    // socketUrl:"47.90.62.61",//新版ECC
    // socketUrl:"47.56.173.151",//旧版ECC                                                                                                                       
    // socketUrl:"192.168.199.221",
    // socketUrl:"8.129.16.28",//Dssc
    socketUrl: "8.210.235.222"
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
        //# sourceMappingURL=Config.js.map
        