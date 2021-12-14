(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/HongBao/HongBao.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e55f9b3L4BEqpjn5SQGMf2U', 'HongBao', __filename);
// Script/Ui/HongBao/HongBao.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        PlayerCount: 10,
        QiangButton: cc.Node,
        CloseButton: cc.Node,
        StatusNode: [cc.Node],
        SubPanel: [cc.Node],
        ZhaDanClip: {
            type: cc.AudioClip,
            default: null
        },
        Texture: {
            type: cc.Texture2D, // use 'type:' to define an array of Texture2D objects
            default: []
        },
        Automatic: false,
        NextHongBao: cc.Node,
        HongBaoTab: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        if (Global.ResourceMgr == undefined) {
            Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
            Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
            Global.SocketMgr = cc.find("SocketMgr").getComponent("SocketMgr");
            Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
        }
        GameData.ReadParkSinl = 0;
        cc.director.GlobalEvent.on("CurHongBaoData", this.onUpdateCurHongBaoData, this);
        cc.director.GlobalEvent.on("HongBaoUserData", this.onUpdateHongBaoUserData, this);
        cc.director.GlobalEvent.on("CurHongBaoCountData", this.onUpdateCurHongBaoCountData, this);
        cc.director.GlobalEvent.on("KaiJiangList", this.OnUpdateKaiJiangList, this);
        cc.director.GlobalEvent.on("KaiJiang", this.OnUpdateKaiJiang, this);
        cc.director.GlobalEvent.on("CountDown", this.onUpdateCountDown, this);
        Global.SocketMgr.openSocket();
        this.PlayerList = this.node.getChildByName('PlayerList');
        this.pageMgr = cc.find("PageMgr").getComponent("PageMgr");
        this.dataList = [];
        var listChildren = this.PlayerList.children;
        listChildren.forEach(function (e) {
            _this.initItem(e);
            _this.dataList.push(e);
        });
        //抢红包按钮监听
        this.QiangButton.off(cc.Node.EventType.TOUCH_END);
        this.QiangButton.on(cc.Node.EventType.TOUCH_END, function () {
            _this.qiangHongBao();
        });
    },

    //玩家列表item属性初始化
    initItem: function initItem(item) {
        item.text = item.getChildByName('Text').getComponent(cc.Label);
        item.count = item.getChildByName('Count').getComponent(cc.Label);
        item.icon = item.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite);
        item.icon2 = item.getChildByName('Icon2').getComponent(cc.Sprite);
    },

    //用户信息更新
    onUpdateHongBaoUserData: function onUpdateHongBaoUserData() {
        var me = this.node.getChildByName('Me');
        var icon = me.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite);
        var userName = me.getChildByName('Text').getComponent(cc.Label);
        var count = me.getChildByName('Count').getComponent(cc.Label);
        userName.string = GameData.HongBaoUserData.nickname;
        count.string = GameData.HongBaoUserData.amount;
        cc.loader.load({ url: GameData.HongBaoUserData.headPortrait, type: 'png' }, function (err, res) {
            var spriteFrame = new cc.SpriteFrame(res);
            icon.spriteFrame = spriteFrame;
        });
    },

    //当前主红包信息更新
    onUpdateCurHongBaoData: function onUpdateCurHongBaoData() {
        var _this2 = this;

        var hb = this.node.getChildByName('State').getChildByName('HB').getChildByName('Text').getComponent(cc.Label);
        hb.string = '剩余：' + 10;
        this.StatusNode.forEach(function (element) {
            element.active = false;
        });
        this.StatusNode[0].active = true;
        this.HongBaoTab.active = true;
        var anim = this.HongBaoTab.getComponent(cc.Animation);
        anim.play();
        this.PlayerListFadeOutAnim();
        this.ClearPlayerList();
        setTimeout(function () {
            _this2.PlayerListFadeInAnim();
        }, 300);
        setTimeout(function () {
            _this2.HongBaoTab.active = false;
            _this2.StatusNode[0].getChildByName('抢').active = true;
            _this2.StatusNode[0].getChildByName('JieSuanZhong').active = false;
            GameData.ReadParkSinl = 1;
            var icon = _this2.node.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite);
            var userName = _this2.node.getChildByName('UserName').getComponent(cc.Label);
            var zd = _this2.node.getChildByName('State').getChildByName('ZD').getChildByName('Text').getComponent(cc.Label);
            var text = _this2.node.getChildByName('State').getChildByName('Timer').getChildByName('Text').getComponent(cc.Label);
            text.string = GameData.CurHongBao.amount;
            userName.string = GameData.CurHongBao.nickname;
            zd.string = '雷号：' + GameData.CurHongBao.bombDigital;
            cc.loader.load({ url: GameData.CurHongBao.headPortrait, type: 'png' }, function (err, res) {
                var spriteFrame = new cc.SpriteFrame(res);
                icon.spriteFrame = spriteFrame;
            });
        }, 180);
    },
    onUpdateCurHongBaoCountData: function onUpdateCurHongBaoCountData() {
        var hb = this.node.getChildByName('State').getChildByName('HB').getChildByName('Text').getComponent(cc.Label);
        hb.string = '剩余：' + GameData.CurHongBaoCount;
    },

    //倒计时更新
    onUpdateCountDown: function onUpdateCountDown() {
        var text = this.node.getChildByName('Clock').getChildByName('Text').getComponent(cc.Label);
        text.string = GameData.CountDown;
    },

    //自动抢按钮
    toggleAutomatic: function toggleAutomatic(event) {
        this.Automatic = event.isChecked;
        // if(this.Automatic){
        //     event.node.getChildByName('Text').getComponent(cc.Label).string = '已自动'
        // }else{
        //     event.node.getChildByName('Text').getComponent(cc.Label).string = '自动抢'
        // }
    },

    //监听开奖列表更新
    OnUpdateKaiJiangList: function OnUpdateKaiJiangList() {
        var _this3 = this;

        var backPack = GameData.KaiJiangList;
        var hb = this.node.getChildByName('State').getChildByName('HB').getChildByName('Text').getComponent(cc.Label);
        hb.string = '剩余：' + (10 - backPack.length);

        var _loop = function _loop(i) {
            if (backPack[i] != undefined) {
                _this3.dataList[i].text.string = backPack[i].nickname;
                _this3.dataList[i].count.string = backPack[i].reward;
                if (backPack[i].status == 0) {
                    _this3.dataList[i].count.string = '未开奖';
                } else if (backPack[i].status == 2) {
                    var spriteFrame = new cc.SpriteFrame(_this3.Texture[1]);
                    _this3.dataList[i].icon2.spriteFrame = spriteFrame;
                }
                cc.loader.load({ url: backPack[i].headPortrait, type: 'png' }, function (err, res) {
                    var spriteFrame = new cc.SpriteFrame(res);
                    _this3.dataList[i].icon.spriteFrame = spriteFrame;
                });
            } else {
                _this3.dataList[i].text.string = '';
                _this3.dataList[i].count.string = '';
                _this3.dataList[i].icon.spriteFrame = null;
                _this3.dataList[i].icon2.spriteFrame = null;
            }
        };

        for (var i = 0; i < 10; i++) {
            _loop(i);
        }
    },

    //开奖
    OnUpdateKaiJiang: function OnUpdateKaiJiang() {
        var backPack = GameData.KaiJiangList;
        for (var i = 0; i < backPack.length; i++) {
            if (backPack[i].memberId && backPack[i].memberId == GameData.HongBaoUserData.memberId && backPack[i].status == 1) {
                this.StatusNode.forEach(function (element) {
                    element.active = false;
                });
                cc.audioEngine.pauseAll();
                cc.audioEngine.play(Global.ResourceMgr.winAudioClip, false, 0.1);
                this.scheduleOnce(function () {
                    Global.ResourceMgr.playHongBaoAudio();
                }, 12);
                this.StatusNode[1].active = true;
                this.StatusNode[1].getChildByName('LeiHao').getComponent(cc.Label).string = '雷号：' + GameData.CurHongBao.bombDigital;
                var _sign = GameData.HongBaoJieGuo > 0 ? '+' : '';
                this.StatusNode[1].getChildByName('Num').getComponent(cc.Label).string = '庄家：' + _sign + GameData.HongBaoJieGuo;
                this.StatusNode[1].getChildByName('JinE').getComponent(cc.Label).string = '+' + backPack[i].reward;
                return;
            } else if (backPack[i].memberId && backPack[i].memberId == GameData.HongBaoUserData.memberId && backPack[i].status == 2) {
                this.StatusNode.forEach(function (element) {
                    element.active = false;
                });
                cc.audioEngine.pauseAll();
                cc.audioEngine.play(Global.ResourceMgr.failAudioClip, false, 0.3);
                cc.audioEngine.play(this.ZhaDanClip, false, GameData.audio + 0);
                this.scheduleOnce(function () {
                    Global.ResourceMgr.playHongBaoAudio();
                }, 3);
                this.StatusNode[3].active = true;
                this.StatusNode[3].getChildByName('LeiHao').getComponent(cc.Label).string = '雷号：' + GameData.CurHongBao.bombDigital;
                var _sign2 = GameData.HongBaoJieGuo > 0 ? '+' : '';
                this.StatusNode[3].getChildByName('Num').getComponent(cc.Label).string = '庄家：' + _sign2 + GameData.HongBaoJieGuo;
                this.StatusNode[3].getChildByName('Gain').getComponent(cc.Label).string = '已中奖:' + backPack[i].reward;
                this.StatusNode[3].getChildByName('Paid').getComponent(cc.Label).string = '已赔付:' + GameData.CurHongBao.amount;
                var ani = this.StatusNode[3].getComponent(cc.Animation);
                ani.play();
                return;
            }
        }
        this.StatusNode.forEach(function (element) {
            element.active = false;
        });
        this.StatusNode[2].active = true;
        this.StatusNode[2].getChildByName('LeiHao').getComponent(cc.Label).string = '雷号：' + GameData.CurHongBao.bombDigital;
        var sign = GameData.HongBaoJieGuo > 0 ? '+' : '';
        this.StatusNode[2].getChildByName('Num').getComponent(cc.Label).string = '庄家：' + sign + GameData.HongBaoJieGuo;
    },
    start: function start() {
        Global.ResourceMgr.playHongBaoAudio();
        // window.sdk = {
        // }
        // sdk.openAudio = ()=>{
        //     cc.audioEngine.pauseAll();
        //     Global.ResourceMgr.playHongBaoAudio();
        //     if(GameData.audio==false){
        //         cc.audioEngine.pauseAll();
        //     }
        // }
        // sdk.closeAudio = ()=>{
        //     cc.audioEngine.pauseAll();
        // }
    },
    onEnable: function onEnable() {},
    ClearPlayerList: function ClearPlayerList() {
        for (var i = 0; i < 10; i++) {
            this.dataList[i].text.string = '';
            this.dataList[i].count.string = '';
            this.dataList[i].icon.spriteFrame = null;
            this.dataList[i].icon2.spriteFrame = null;
        }
    },

    //玩家列表出现动画
    PlayerListFadeInAnim: function PlayerListFadeInAnim() {
        var list = this.PlayerList.children;
        var index1 = 0;
        var timer1 = setInterval(function () {
            if (index1 >= 10) {
                clearInterval(timer1);
                return;
            }
            list[index1].x += list[index1].width;
            var action = cc.spawn(cc.moveBy(0.5, cc.v2(-list[index1].width, 0)), cc.fadeIn(0.5));
            list[index1].runAction(action);
            index1 += 2;
        }, 200);
        var index2 = 1;
        var timer2 = setInterval(function () {
            if (index2 >= 10) {
                clearInterval(timer2);
                return;
            }
            list[index2].x -= list[index2].width;
            var action = cc.spawn(cc.moveBy(0.3, cc.v2(list[index2].width, 0)), cc.fadeIn(0.3));
            list[index2].runAction(action);
            index2 += 2;
        }, 200);
    },

    //玩家列表消失动画
    PlayerListFadeOutAnim: function PlayerListFadeOutAnim() {
        var list = this.PlayerList.children;
        list.forEach(function (e) {
            var action = cc.fadeOut(0.3);
            e.runAction(action);
        });
        // let list = this.PlayerList.children;
        // let index1 = 0;
        // let timer1 = setInterval(()=>{
        //     if(index1>=10){
        //         clearInterval(timer1)
        //         return
        //     }
        //     let finish = ()=>{
        //         list[index1].x +=list[index1].width;
        //     }
        //     let action = cc.sequence(cc.moveBy(0.5,cc.v2(-list[index1].width,0)),cc.fadeOut(0.1),cc.callFunc(finish));
        //     list[index1].runAction(action);
        //     index1+=2;
        // },200)
        // let index2 = 1;
        // let timer2 = setInterval(()=>{
        //     if(index2>=10){
        //         clearInterval(timer2)
        //         return
        //     }
        //     let finish = ()=>{
        //         list[index1].x -=list[index1].width;
        //     }
        //     let action = cc.sequence(cc.moveBy(0.5,cc.v2(list[index2].width,0)),cc.fadeOut(0.1),cc.callFunc(finish));
        //     list[index2].runAction(action);
        //     index2+=2;
        // },200)
    },
    showSubPanel: function showSubPanel(event, index) {
        this.SubPanel[index].active = true;
    },
    closeSubPanel: function closeSubPanel(event, index) {
        this.SubPanel[index].active = false;
    },
    closeGames: function closeGames() {
        var _this4 = this;

        Global.SocketMgr.closeSocket(function () {
            _this4.node.destroy();
        });
    },

    //抢红包
    qiangHongBao: function qiangHongBao() {
        var _this5 = this;

        if (GameData.ReadParkSinl == 1) {
            GameData.ReadParkSinl = 0;
            Global.ProtocolMgr.QiangHongBao(function (data) {
                if (data.code == 200 && data.data == 'true') {
                    _this5.StatusNode[0].getChildByName('抢').active = false;
                    _this5.StatusNode[0].getChildByName('JieSuanZhong').active = true;
                    Global.PageMgr.closeLoadingPage();
                } else {
                    Global.PageMgr.closeLoadingPage();
                    Global.PageMgr.showTipPage2(data.message);
                    GameData.ReadParkSinl = 1;
                }
            });
        } else {
            // Global.PageMgr.showTipPage('当前没有红包')
        }
    },
    update: function update(dt) {
        //当前有红包时自动抢红包
        if (this.Automatic && this.StatusNode[0].active) {
            this.qiangHongBao();
        }
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("CurHongBaoData");
        cc.director.GlobalEvent.off("HongBaoUserData");
        cc.director.GlobalEvent.off("CurHongBaoCountData");
        cc.director.GlobalEvent.off("KaiJiangList");
        cc.director.GlobalEvent.off("KaiJiang");
        cc.director.GlobalEvent.off("CountDown");
        cc.audioEngine.pauseAll();
        Global.ResourceMgr.playTransitionIn();
        cc.director.loadScene('Dssc', function () {
            // Global.ResourceMgr.playBgAudio()
            console.log('切换场景');
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
        //# sourceMappingURL=HongBao.js.map
        