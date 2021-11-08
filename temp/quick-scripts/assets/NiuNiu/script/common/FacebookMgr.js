(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/FacebookMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '580bedOpK9LVronfmXGcM6P', 'FacebookMgr', __filename);
// NiuNiu/script/common/FacebookMgr.js

/**
 * Created by skyxu on 2018/3/13.
 */

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Facebook = require('./Facebook');

var FacebookMgr = cc.Class({

    ctor: function ctor() {

        /**
         * @type {Facebook}
         */
        this.facebook = new Facebook();

        /**
         * @type {array}
         */
        this.inviteFriends = [];

        /**
         * @type {array}
         */
        this.installFriends = [];

        /**
         * @type {boolean}
         */
        this._initSuccess = false;

        /**
         * @type {function} 邀请回调
         */
        this._onInviteFriendsCallback = null;
        /**
         * @type {function}
         */
        this._loginCallback = null;
        /**
         * @type {function}
         */
        this._loginFailCallback = null;

        /**
         *
         * @type {function}
         * @private
         */
        this._requestPicCallback = null;

        this._requestNameCallback = null;

        /**
         * 权限数组
         * @type {Array}
         */
        this._permissions = [];
    },

    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (FacebookMgr.instance == null) {
                FacebookMgr.instance = new FacebookMgr();
            }
            return FacebookMgr.instance;
        }
    },

    /**
     * @param {string} facebookId
     */
    initFacebook: function initFacebook(facebookId, permissions) {
        this._initSuccess = this.facebook.init(this, facebookId);
        this._permissions = permissions;
    },

    /**
     * @param {string} facebookId
     */
    loginFacebook: function loginFacebook(facebookId, permissions, successCallback, failCallback) {
        if (!this._initSuccess) {
            this.initFacebook(facebookId, permissions);
            if (!this._initSuccess) {
                if (failCallback) failCallback();
                return;
            }
        }

        this._permissions = permissions;
        this._loginCallback = successCallback;
        this._loginFailCallback = failCallback;

        if (!this.facebook.isLoggedIn()) {
            cc.log("FacebookMgr: to login");
            this.facebook.login(this._permissions);
        } else {
            cc.log("FacebookMgr: to requestInvitableFriends");
            this.facebook.requestInvitableFriends();
            if (successCallback) successCallback();
        }
    },

    /**
     * 登出
     */
    logout: function logout() {
        if (this.isLogin()) {
            this.facebook.logout();
        }
    },

    /**
     * @return {string}
     */
    getAccessToken: function getAccessToken() {
        return this.facebook.getAccessToken();
    },

    /**
     * @returns {*|string}
     */
    getUserID: function getUserID() {
        return this.facebook.getUserID();
    },

    /**
     * 邀请好友
     * @param {Array} arr
     * @param {string} title
     * @param {string} text
     * @param {function} callback
     */
    inviteFriendsWithInviteIds: function inviteFriendsWithInviteIds(arr, title, text, callback) {
        if (cc.sys.isMobile) {
            this._onInviteFriendsCallback = callback;
            this.facebook.inviteFriendsWithInviteIds(arr, title, text);
        } else {
            callback(true, null);
        }
    },

    /**
     * 获取要请请求
     */
    getInviteRequest: function getInviteRequest() {
        var params = new Object();
        //params.fields = "from";
        this.facebook.api("/me/apprequests", "GET", params, "apprequests");
    },

    /**
     * 获取邀请安装好友 onRequestInvitableFriends回调
     */
    requestInvitableFriends: function requestInvitableFriends() {
        var params = new Object();
        this.facebook.api("/me/app_requests", "GET", params, "invitable_friends");
    },

    /**
     * 获取头像信息
     * @param callback{function}
     */
    requestUserPicture: function requestUserPicture(callback) {
        this._requestPicCallback = callback;
        this.facebook.requestUserPicture();
    },

    /**
     * 获取用户名字
     * @param callback
     */
    requestUserName: function requestUserName(callback) {
        this._requestNameCallback = callback;
        this.facebook.requestUserName();
    },

    fetchFriends: function fetchFriends() {
        if (this.isLogin()) {
            this.facebook.fetchFriends();
        }
    },

    /**
     * share
     * @param {string} link
     * @param {string} title
     * @param {string} text
     * @param {string} image
     */
    shareLink: function shareLink(link, title, text, image, callback) {
        if (this.isLogin()) {
            this._shareCallback = callback;
            this.facebook.dialogLink(link, title, text, image);
        }
    },

    /*********************
     * check
     *********************/

    /**
     * @returns {boolean}
     */
    isLogin: function isLogin() {
        return this._initSuccess && this.facebook.isLoggedIn();
    },

    /*********************
     * Facebook callbacks
     *********************/

    onLogin: function onLogin(isLogin, msg) {
        cc.log("onLogin");
        if (!isLogin) {
            cc.log("FacebookMgr: Facebook login fail  msg: " + msg);
            if (this._loginFailCallback) this._loginFailCallback();
            return;
        }
        cc.log("FacebookMgr: Facebook had login");
        this.facebook.requestInvitableFriends();
        if (this._loginCallback) this._loginCallback();
    },

    onGetUserInfo: function onGetUserInfo(userInfo) {
        cc.log("onGetUserInfo: " + JSON.stringify(userInfo));
    },

    onInviteFriendsWithInviteIdsResult: function onInviteFriendsWithInviteIdsResult(result, msg) {
        cc.log("FacebookMgr: onInviteFriendsWithInviteIdsResult " + result + "  " + msg);
        if (this._onInviteFriendsCallback) {
            var callback = this._onInviteFriendsCallback;
            this._onInviteFriendsCallback = null;
            callback(result, msg);
        }
    },

    onFetchFriends: function onFetchFriends(ok, msg) {
        cc.log("FacebookMgr: onFetchFriends " + ok);
        this.installFriends = this.facebook.getInstallFriends();
        cc.log(JSON.stringify(this.installFriends));
        for (var i = 0; i < this.installFriends.length; i++) {
            var friend = this.installFriends[i];
            cc.log("-----------");
            cc.log(">> uid=%s", friend.uid);
            cc.log(">> name=%s", friend.name);
        }
    },

    /**
     * @param {Object} friends
     */
    onRequestInvitableFriends: function onRequestInvitableFriends(friends) {
        cc.log("FacebookMgr: onRequestInvitableFriends " + friends);
        this.inviteFriends = friends.data;
        /*
         for (let i = 0; i < this.inviteFriends.length; i++) {
         let friend = this.inviteFriends[i];
         cc.log("-----------");
         cc.log(">> id=%s", friend.id);
         }
         */
    },

    onPermission: function onPermission(isLogin, msg) {
        cc.log("onPermission: " + isLogin + "   msg: " + msg);
    },

    onSharedSuccess: function onSharedSuccess(data) {
        cc.log("onSharedSuccess");
        if (this._shareCallback) {
            this._shareCallback();
            this._shareCallback = null;
        }
    },

    onSharedFailed: function onSharedFailed(data) {
        cc.log("onSharedFailed == " + JSON.stringify(data));
        if (this._shareCallback) {
            this._shareCallback = null;
        }
    },

    onSharedCancel: function onSharedCancel() {
        cc.log("onSharedCancel");
        if (this._shareCallback) {
            this._shareCallback = null;
        }
    },

    /**
     * @param {String} tag
     * @param {String} data
     */
    onAPI: function onAPI(tag, data) {
        cc.log("onAPI: " + (typeof data === "undefined" ? "undefined" : _typeof(data)) + " | " + data);
        switch (tag) {
            case "invitable_friends":
                {
                    //cc.log("invitable_friends : " + data);
                    // this.inviteFriends = JSON.parse(data).data;
                    break;
                }
            case "request_picture":
                {
                    if (this._requestPicCallback) {
                        cc.log("onAPI request_picture: " + data);
                        this._requestPicCallback(JSON.parse(data).data);
                    }
                    break;
                }
            case "request_name":
                {
                    cc.log("onAPI request_name: " + data);
                    if (this._requestNameCallback) {
                        this._requestNameCallback(JSON.parse(data));
                    }
                }
        }
    }

});

module.exports = FacebookMgr;

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
        //# sourceMappingURL=FacebookMgr.js.map
        