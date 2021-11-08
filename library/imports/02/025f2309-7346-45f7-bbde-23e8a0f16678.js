"use strict";
cc._RF.push(module, '025f2MJc0ZF97veI+ig8WZ4', 'GameMgr');
// NiuNiu/script/GameMgr.js

/**
 * Created by skyxu on 2019/3/28.
 */

"use strict";

var Toast = require("./views/ToastCtrl");
var dataMgr = require("./common/DataMgr").getInstance();

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        GlobalNiuNiu.gameMgr = this;
    },
    start: function start() {
        this.listenEvent();
    },
    listenEvent: function listenEvent() {
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_NETWORK_OPENED, this.onNetOpen, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_NETWORK_CLOSED, this.onNetClosed, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_LOGIN_SUC, this.onLoginSuc, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_LOGIN_FAILED, this.onLoginFailed, this);
    },
    onNetOpen: function onNetOpen(event) {
        cc.log("net opened.");
        // this.startBeatHeart();
        GlobalNiuNiu.connectState = true;
        GlobalNiuNiu.netProxy.login(0);
    },
    onNetClosed: function onNetClosed(event) {
        cc.log("net closed. 5s 后重试连接.");
        Toast.showText("网络连接失败，正在重试.", 2);
        GlobalNiuNiu.connectState = false;
        this.scheduleOnce(function (dt) {
            if (!GlobalNiuNiu.netProxy.isNetworkOpened()) {
                GlobalNiuNiu.netProxy.connect();
            }
        }, 5);
    },
    onLoginSuc: function onLoginSuc(event) {
        var resp = event;
        cc.log("登陆成功.");
        cc.log(event);
        if (resp.uid != null) {
            dataMgr.playerObj.parse(resp);
            dataMgr.saveDataToLocal();
        }
    },
    onLoginFailed: function onLoginFailed(event) {
        cc.log("登陆失败. 5s后重试.");
        this.scheduleOnce(function (dt) {
            GlobalNiuNiu.netProxy.login(0);
        }, 5);
    },
    startBeatHeart: function startBeatHeart() {
        var _this = this;

        this.schedule(function (dt) {
            if (!_this.checkInternet()) return;
            var t = Date.now();
            GlobalNiuNiu.netProxy.beatHeart(function (resp) {
                cc.log(JSON.stringify(resp));
                cc.log("delay: " + (resp.t - t));
            });
        }, 5);
    },
    checkInternet: function checkInternet() {
        return GlobalNiuNiu.netProxy.isNetworkOpened();
    },
    onOpenRoom: function onOpenRoom(resp) {
        if (resp.err > 0) {
            Toast.showText("开房失败.", 2);
            return;
        }
        GlobalNiuNiu.loadScene("RoomNet", function () {
            setTimeout(function () {
                GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_OPEN_ROOM, resp);
            }, 1000);
        });
    },
    onEnterRoom: function onEnterRoom(resp) {
        if (resp.err > 0) {
            Toast.showText("加入失败，请检查房间号.", 2);
            return;
        }
        GlobalNiuNiu.loadScene("RoomNet", function () {
            setTimeout(function () {
                GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_ENTER_ROOM, resp);
            }, 1000);
        });
    }
});

cc._RF.pop();