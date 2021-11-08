/**
 * Created by skyxu on 2019/3/28.
 */

"use strict";

let Toast = require("./views/ToastCtrl");
let dataMgr = require("./common/DataMgr").getInstance();

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad(){
        GlobalNiuNiu.gameMgr = this;
    },

    start(){
        this.listenEvent();
    },

    listenEvent(){
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_NETWORK_OPENED, this.onNetOpen, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_NETWORK_CLOSED, this.onNetClosed, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_LOGIN_SUC, this.onLoginSuc, this);
        GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_LOGIN_FAILED, this.onLoginFailed, this);
    },

    onNetOpen(event){
        cc.log("net opened.");
        // this.startBeatHeart();
        GlobalNiuNiu.connectState = true;
        GlobalNiuNiu.netProxy.login(0);
    },

    onNetClosed(event){
        cc.log("net closed. 5s 后重试连接.");
        Toast.showText("网络连接失败，正在重试.", 2);
        GlobalNiuNiu.connectState = false;
        this.scheduleOnce((dt)=>{
            if (!GlobalNiuNiu.netProxy.isNetworkOpened()){
                GlobalNiuNiu.netProxy.connect();
            }
        }, 5);

    },

    onLoginSuc(event){
        let resp = event;
        cc.log("登陆成功.");
        cc.log(event)
        if (resp.uid != null){
            dataMgr.playerObj.parse(resp);
            dataMgr.saveDataToLocal();
        }
    },

    onLoginFailed(event){
        cc.log("登陆失败. 5s后重试.");
        this.scheduleOnce((dt)=>{
            GlobalNiuNiu.netProxy.login(0);
        }, 5)
    },

    startBeatHeart(){
        this.schedule((dt)=>{
            if (!this.checkInternet()) return;
            let t = Date.now();
            GlobalNiuNiu.netProxy.beatHeart((resp)=>{
                cc.log(JSON.stringify(resp));
                cc.log("delay: " + (resp.t - t));
            });
        }, 5);
    },

    checkInternet(){
        return GlobalNiuNiu.netProxy.isNetworkOpened();
    },

    onOpenRoom(resp){
        if (resp.err > 0){
            Toast.showText("开房失败.", 2);
            return;
        }
        GlobalNiuNiu.loadScene("RoomNet",()=>{
            setTimeout(()=>{
                GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_OPEN_ROOM, resp);
            },1000)
        });
    },

    onEnterRoom(resp){
        if (resp.err > 0){
            Toast.showText("加入失败，请检查房间号.", 2);
            return;
        }
        GlobalNiuNiu.loadScene("RoomNet",()=>{
            setTimeout(()=>{
                GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_ENTER_ROOM, resp);
            },1000)
        });
    }
});
