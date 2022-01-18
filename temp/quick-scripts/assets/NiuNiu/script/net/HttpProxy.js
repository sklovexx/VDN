(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/net/HttpProxy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ae20cwKtwdBMZtY6Ie6ZibZ', 'HttpProxy', __filename);
// NiuNiu/script/net/HttpProxy.js

/**
 * Created by skyxu on 2018/7/13.
 */

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var GameHttp = require("./GameHttp");
var DataMgr = require("./../common/DataMgr");
var FacebookMgr = require("./../common/FacebookMgr");
var UtilsCross = require("./../common/UtilsCross");
var Md5 = require("./../encrypt/Md5").md5_hex_hmac;

// let urlroot = "http://localhost:3000";
// let urlroot = "http://52.44.165.172:3000";
// let urlroot = "http://106.55.241.55:9501/";//测试版本ip

// let urlroot = "http://192.168.0.114:9501/";//本地接口
// let urlroot = "http://api.vdnmetaverse.org/api/";//正式发布
var urlroot = "http://156.241.191.27:9501/api/"; //正式发布2


var encryptKey = "tclsafegame";

cc.Class({
    ctor: function ctor() {},


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    login: function login(onSuc, onFailed) {
        var uid = UtilsCross.getUID();
        cc.log("uid=" + uid);
        if (!uid && onFailed) {
            onFailed();
            return;
        }

        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/login";
        var data = { uid: uid };
        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    bindFb: function bindFb(onSuc, onFailed) {
        var uid = UtilsCross.getUID();
        cc.log("uid=" + uid);
        if (!uid && onFailed) {
            onFailed();
            return;
        }

        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/bind_fb";
        var data = { sid: pObj.sid, fbid: pObj.fbid, uid: uid };
        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    updateIcon: function updateIcon(onSuc, onFailed) {
        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/update_icon";
        var data = { fbid: pObj.fbid, fbicon: pObj.fbicon };
        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    updateName: function updateName(onSuc, onFailed) {
        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/update_name";
        var data = { fbid: pObj.fbid, fbname: pObj.fbname };
        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    uploadScore: function uploadScore(onSuc, onFailed) {
        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/upload_score";
        var data = { sid: pObj.sid, score: pObj.bestScore };
        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    getRankList: function getRankList(onSuc, onFailed) {
        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/get_rank";
        var data = { sid: pObj.sid };
        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param onSuc
     * @param onFailed
     */
    getFriendsRankList: function getFriendsRankList(onSuc, onFailed) {
        var pObj = DataMgr.getInstance().playerObj;
        var url = urlroot + "/get_rank_friends";
        var friends = FacebookMgr.getInstance().installFriends;

        if (pObj.fbid <= 0) {
            if (onFailed) {
                onFailed("Haven't any friend.");
                return;
            }
        }

        cc.log((typeof friends === "undefined" ? "undefined" : _typeof(friends)) + " | " + friends);
        cc.log("friends + " + JSON.stringify(friends));
        var friendsSend = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = friends[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var f = _step.value;

                friendsSend.push(parseInt(f.uid));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        cc.log((typeof friendsSend === "undefined" ? "undefined" : _typeof(friendsSend)) + " | " + friendsSend);
        cc.log(JSON.stringify(friendsSend));

        var data = { fbid: pObj.fbid, friends: friendsSend };
        cc.log("get friend rank: " + JSON.stringify(data));

        this.serverRequest(url, data, onSuc, onFailed);
    },


    /**
     *
     * @param url
     * @param data
     * @param onSuc
     * @param onFailed
     */
    serverRequest: function serverRequest(url, data, onSuc, onFailed) {
        cc.log("serverRequest: " + (typeof data === "undefined" ? "undefined" : _typeof(data)) + " | " + JSON.stringify(data));
        data = typeof data === "string" ? data : JSON.stringify(data);
        // 加密校验传输
        var encryptStr = Md5(encryptKey, data);
        var newData = {
            data: JSON.parse(data),
            encrypt: encryptStr,
            version: UtilsCross.getAppVersion() || "2.0.0"
        };
        newData = JSON.stringify(newData);

        GameHttp.httpPost(url, newData, function (req) {
            if (req.isOk()) {
                cc.log("requrest: " + url + " 成功。");
                if (onSuc) {
                    onSuc(req.getBody());
                }
            } else {
                cc.log("requrest: " + url + " 失败。");
                if (onFailed) {
                    onFailed(req.getError() || req.getBody());
                }
            }
        });
    }
});

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
        //# sourceMappingURL=HttpProxy.js.map
        