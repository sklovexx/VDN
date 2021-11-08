(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/net/GameHttp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8afc1m51YpB/YM/mIkdgeO+', 'GameHttp', __filename);
// NiuNiu/script/net/GameHttp.js

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 默认的Http超时时间，毫秒
 * @const {number}
 */
var DEFAULT_HTTP_TIMEOUT = 10000;

/**
 * @enum {string}
 */
var HttpError = {
    TIMEOUT: 'timeout',
    ERROR: 'error',
    ABORT: 'abort'
};

/**
 * 统一封装Http的响应，方便使用。
 * 目前暂时只支持XMLHttpRequest。
 * @type {HttpResponse}
 */
var HttpResponse = cc.Class({

    ctor: function ctor() {
        /**
         * @type {XMLHttpRequest}
         */
        this.xhr_ = null;
        /**
         * 错误信息
         * @type {?HttpError}
         * @private
         */
        this.error_ = null;
    },

    init: function init(xhr) {
        this.xhr_ = xhr;
    },

    /**
     * 请求是否成功并且正确
     * @returns {boolean}
     */
    isOk: function isOk() {
        var xhr = this.xhr_;
        return xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 207;
    },

    /**
     * Response的数据，
     * @returns {(string|ArrayBuffer|Blob|Object|Document)}
     */
    getBody: function getBody() {
        return this.xhr_.response;
    },

    /**
     * @param {!HttpError} error
     */
    setError: function setError(error) {
        this.error_ = error;
    },

    /**
     * 错误原因，可能为：'timeout', 'error', 'abort'
     * 当isOk()返回false时有效。
     * @returns {?HttpError}
     */
    getError: function getError() {
        return this.error_;
    },

    /**
     * 返回所有的Http Response Header
     * @returns {object.<string, Array.<string>>} 每一个key，可能会有多个值
     */
    getHeaders: function getHeaders() {
        // todo: 需要实现
    },

    /**
     * 返回指定的Http Response Header
     * @param {string} name Header名字
     * @returns {Array.<string>} 如果不存在，返回[]
     */
    getHeader: function getHeader(name) {
        // todo: 需要实现
    }
});

/**
 * 注册XmlHttpRequest的事件
 * @param {XMLHttpRequest} xhr
 * @param {function} callback
 * @private
 */
var registerEventsForXmlHttpRequest_ = function registerEventsForXmlHttpRequest_(xhr, callback) {
    var r = new HttpResponse();
    r.init(xhr);

    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {
            callback(r);
        }
    };

    xhr.ontimeout = function (evt) {
        r.setError(HttpError.TIMEOUT);
        callback(r);
    };

    xhr.onerror = function (evt) {
        r.setError(HttpError.ERROR);
        callback(r);
    };

    xhr.onabort = function (evt) {
        r.setError(HttpError.ABORT);
        callback(r);
    };
};

/**
 * Http GET请求
 * @param {string} url
 * @param {function} callback 可选。成功或失败后回调，callback(HttpResponse)
 * @param {number} opt_timeout 可选。超时时间，毫秒。
 */
var httpGet = function httpGet(url, callback, opt_timeout) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.timeout = opt_timeout ? opt_timeout : DEFAULT_HTTP_TIMEOUT;
    if (callback) {
        registerEventsForXmlHttpRequest_(xhr, callback);
    }
    xhr.open('GET', url, true);

    // xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
    // 必须放在open()之后。否则jsb的实现会判断url如果以.json结尾，则设为JSON类型
    //xhr.responseType = 'arraybuffer';

    xhr.send();
};

/**
 * Http Post请求
 * @param url
 * @param data{String} 数据
 * @param callback
 * @param opt_timeout
 */
var httpPost = function httpPost(url, data, callback, opt_timeout) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.timeout = opt_timeout ? opt_timeout : DEFAULT_HTTP_TIMEOUT;
    if (callback) {
        registerEventsForXmlHttpRequest_(xhr, callback);
    }

    xhr.open('POST', url, true);
    // 默认使用json格式传输数据(否则服务器Express不能正确解析json格式)
    xhr.setRequestHeader("Content-Type", "application/json");
    cc.log("httpPost: " + (typeof data === 'undefined' ? 'undefined' : _typeof(data)) + " | " + JSON.stringify(data));

    // xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
    // 必须放在open()之后。否则jsb的实现会判断url如果以.json结尾，则设为JSON类型
    //xhr.responseType = 'arraybuffer';

    xhr.send(data);
};

module.exports = {
    httpGet: httpGet,
    httpPost: httpPost
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
        //# sourceMappingURL=GameHttp.js.map
        