(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Util/appScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '68775/0DWtJ1YJFtFTKIb7T', 'appScript', __filename);
// Script/Util/appScript.js

"use strict";

var appScript = {
    version: "1.0.0",
    Get: function Get(url, reqData, callback) {
        var fixBaseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        var self = this;

        if (reqData != "") {
            url += "?";
            for (var item in reqData) {
                url += item + "=" + reqData[item] + "&";
            }
        }
        // console.log(self.ip + url)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status <= 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        console.log(responseJson);
                        callback(responseJson);
                    } else {
                        console.log("返回数据不存在");
                        callback(false);
                    }
                } else {
                    console.log("请求失败");
                    callback(false);
                }
            }
        };
        if (fixBaseUrl != "") {
            xhr.open("GET", fixBaseUrl + url, true);
        } else {
            xhr.open("GET", Config.baseUrl + url, true);
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("token", 'magic' + GameData.token);
        xhr.setRequestHeader("language", GameData.curLanguage);
        xhr.send();
    },

    Post: function Post(url, reqData, callback) {
        var fixBaseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        var self = this;
        //2.发起请求
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            console.log(xhr);
            if (xhr.readyState == 4) {
                console.log("---------1-----------------url:" + Config.baseUrl + url);
                if (xhr.status >= 200 && xhr.status <= 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        console.log(responseJson);
                        if (responseJson.code == 401) {
                            cc.sys.localStorage.removeItem("com.game.vdn.token");
                            Global.PageMgr.closeAllPages();
                            Global.PageMgr.onOpenPage(0);
                            return;
                        }
                        callback(responseJson);
                    } else {
                        console.log("返回数据不存在");
                        callback(false);
                    }
                } else {
                    console.log("请求失败");
                    callback(false);
                }
            }
        };
        if (fixBaseUrl != "") {
            xhr.open("POST", fixBaseUrl + url, true);
        } else {
            xhr.open("POST", Config.baseUrl + url, true);
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("token", GameData.token);
        xhr.setRequestHeader("language", GameData.curLanguage);
        console.log("-------|" + GameData.token);
        console.log("-------reqData：" + JSON.stringify(reqData));

        xhr.send(JSON.stringify(reqData)); //reqData为字符串形式： "key=value"
    },
    GetQueryVariable: function GetQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

};

module.exports = appScript;

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
        //# sourceMappingURL=appScript.js.map
        