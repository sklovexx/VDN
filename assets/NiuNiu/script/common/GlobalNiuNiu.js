/**
 * Created by skyxu on 2018/3/13.
 */

"use strict";

window.GlobalNiuNiu = window.GlobalNiuNiu || {};

let UiUpdater = require("./UiUpdater");
let GCONFIG = require("./GCONFIG");
let AudioMgr = require("./AudioMgr");
let IapMgr = require("./IAPMgr");
let DataMgr = require("./DataMgr");
let ViewMgr = require("./ViewMgr");
let UtilsCross = require("./UtilsCross");
let NetProxy = require("./../net/socket/NetProxy");
GlobalNiuNiu.connectState = false;
    /**
 * 全局事件管理器, 收发事件统一使用
 * esp: GlobalNiuNiu.eventMgr.on("event",function(){});
 */
GlobalNiuNiu.eventMgr = new cc.EventTarget();

// 用来刷新ui
GlobalNiuNiu.uiUpdater = new UiUpdater();

// 常驻节点，用来管理游戏流程
GlobalNiuNiu.gameMgr = null;

// 用来管理游戏assets（prefab etc.)
GlobalNiuNiu.assetMgr = null;

GlobalNiuNiu.effectMgr = null;

GlobalNiuNiu.config = GCONFIG;

// 用来管理游戏音频播放
GlobalNiuNiu.audioMgr = null;

GlobalNiuNiu.tips = null;

GlobalNiuNiu.iapMgr = IapMgr.getInstance();

GlobalNiuNiu.dataMgr = DataMgr.getInstance();

GlobalNiuNiu.viewMgr = ViewMgr.getInstance();

GlobalNiuNiu.utilsCross = UtilsCross;

GlobalNiuNiu.netProxy = new NetProxy();
GlobalNiuNiu.netProxy.init();

/**
 * hack preloadScene for add progress callback
 * @param _This
 * @param sceneName
 * @param onLoaded
 * @param onProgress
 */
GlobalNiuNiu.preloadScene = function(_This, sceneName, onLoaded, onProgress) {
    let director = cc.director;
    let info = director._getSceneUuid(sceneName);
    if (info) {
        director.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING,sceneName);
        cc.loader.load({
            uuid: info.uuid,
            type: "uuid"
        }, null == onProgress ? null : function(e, a) {
            onProgress && onProgress.call(_This, e, a);
        }, function(error, asset) {
            error && cc.errorID(1215, sceneName, error.message);
            onLoaded && onLoaded(error, asset);
        });
    } else {
        let error = 'Can not preload the scene "' + sceneName + '" because it is not in the build settings.';
        onLoaded && onLoaded(new Error(error));
        cc.error("preloadScene: " + error);
    }
};

GlobalNiuNiu.loadScene = function(sceneName,callback){
    GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_CHANGE_SCENE);
    if(callback){
        cc.director.loadScene(sceneName,callback);
    }else{
        cc.director.loadScene(sceneName);
    }
};
