(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/NongChang/NongChang.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3031dvXoiJPCpmW3C2+1ZWo', 'NongChang', __filename);
// Script/Ui/NongChang/NongChang.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        NongChang: [cc.Node],
        TuDi: [cc.Node],
        NongChangDesc: cc.Node,
        NongChangCount: 6
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on("NongChangUserData", this.onNongChangUserData, this);
        cc.director.GlobalEvent.on("FriendNongChangUserData", this.onFriendNongChangUserData, this);
        //加载数据表
        dataFunc.loadConfigs(false, function () {
            // Global.ProtocolMgr.queryNongChangUserData()
        });
    },
    start: function start() {},
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("NongChangUserData");
        cc.director.GlobalEvent.off("FriendNongChangUserData");
    },

    //监听农场信息更新
    onNongChangUserData: function onNongChangUserData() {
        var _this = this;

        var table = 'zhongzi';
        var backPack = GameData.NongChangUserData;

        var _loop = function _loop(i) {
            if (backPack[i] != undefined && backPack[i] != null) {
                var id = backPack[i].id + '';
                _this.NongChang[i].getComponent(cc.Sprite).enabled = true;
                cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "name", id) + backPack[i].period, function (err, res) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    var spriteFrame = new cc.SpriteFrame(res);
                    _this.NongChang[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    if (backPack[i].period == 3) {
                        //防止重复
                        try {
                            _this.NongChang[i].getChildByName('Tip').destroy();
                        } catch (e) {}
                        var tip = cc.instantiate(Global.ResourceMgr.tip);
                        tip.parent = _this.NongChang[i];
                        tip.getComponent('Tip').setItem('收获');
                        tip.x = 0;
                        tip.y = 33;
                    }
                });
                _this.NongChang[i].off(cc.Node.EventType.TOUCH_END);
                _this.NongChang[i].on(cc.Node.EventType.TOUCH_END, function () {
                    if (!backPack[i]) {
                        return;
                    }
                    var id = backPack[i].id + '';
                    _this.clearPage();
                    _this.NongChangDesc.active = true;
                    _this.NongChangDesc.x = _this.NongChang[i].x;
                    _this.NongChangDesc.y = _this.NongChang[i].y;
                    _this.NongChangDesc.getChildByName('name').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id);
                    var time = backPack[i].time;
                    var period = dataFunc.queryValue(table, 'time', id);
                    _this.NongChangDesc.getChildByName('period').getComponent(cc.Label).string = dataFunc.getMyDate(time);
                    _this.NongChangDesc.getChildByName('process').getComponent(cc.Sprite).fillRange = (period - time) / period;
                    //时期为3表示可收获
                    if (backPack[i].period == 3) {
                        Global.ProtocolMgr.shouHuoNongZuoWu(i, function (data) {
                            if (data) {
                                // Global.ProtocolMgr.queryNongChangUserData()
                                _this.NongChang[i].getChildByName('Tip').destroy();
                                cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "name", id) + '4', function (err, res) {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    var spriteFrame = new cc.SpriteFrame(res);
                                    _this.NongChang[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                                });
                                var finish = function finish() {
                                    _this.NongChang[i].y -= 50;
                                    _this.NongChang[i].getComponent(cc.Sprite).spriteFrame = null;
                                    cc.director.GlobalEvent.emit("NongChangUserData", {});
                                };
                                _this.shouhuoAnim(_this.NongChang[i], finish);
                            } else {
                                Global.PageMgr.showTipPage('收获失败');
                            }
                        });
                        return;
                    }
                });
            } else {
                try {
                    _this.NongChang[i].getChildByName('Tip').destroy();
                } catch (e) {
                    console.log('空土地');
                }
                _this.NongChang[i].off(cc.Node.EventType.TOUCH_END);
                _this.NongChang[i].on(cc.Node.EventType.TOUCH_END, function () {
                    console.log(GameData.ZhongZhiReady.state);
                    if (GameData.ZhongZhiReady.state) {
                        Global.ProtocolMgr.zhongZhi(GameData.ZhongZhiReady.id, i);
                    } else {
                        _this.clearPage();
                        GameData.ZhongZhiReady.pos = i;
                        Global.PageMgr.onOpenPage(2);
                    }
                });
            }
        };

        for (var i = 0; i < backPack.length; i++) {
            _loop(i);
        }
    },

    //监听好友农场信息更新
    onFriendNongChangUserData: function onFriendNongChangUserData() {
        var _this2 = this;

        var table = 'zhongzi';
        var backPack = GameData.FriendNongChangUserData;

        var _loop2 = function _loop2(i) {
            if (backPack[i] != undefined && backPack[i] != null) {
                var id = backPack[i].id + '';
                cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "name", id) + backPack[i].period, function (err, res) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    var spriteFrame = new cc.SpriteFrame(res);
                    _this2.NongChang[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    if (backPack[i].period == 3) {
                        //防止重复
                        try {
                            _this2.NongChang[i].getChildByName('Tip').destroy();
                        } catch (e) {}
                        var tip = cc.instantiate(Global.ResourceMgr.tip);
                        tip.parent = _this2.NongChang[i];
                        tip.getComponent('Tip').setItem('偷取');
                        tip.x = 0;
                        tip.y = 33;
                    }
                });
                _this2.NongChang[i].off(cc.Node.EventType.TOUCH_END);
                _this2.NongChang[i].on(cc.Node.EventType.TOUCH_END, function () {
                    var id = backPack[i].id + '';
                    _this2.clearPage();
                    _this2.NongChangDesc.active = true;
                    _this2.NongChangDesc.x = _this2.NongChang[i].x;
                    _this2.NongChangDesc.y = _this2.NongChang[i].y;
                    _this2.NongChangDesc.getChildByName('name').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id);
                    var time = backPack[i].time;
                    var period = dataFunc.queryValue(table, 'time', id);
                    _this2.NongChangDesc.getChildByName('period').getComponent(cc.Label).string = dataFunc.getMyDate(time);
                    _this2.NongChangDesc.getChildByName('process').getComponent(cc.Sprite).fillRange = (period - time) / period;
                    if (backPack[i].period == 3) {
                        Global.ProtocolMgr.shouHuoNongZuoWu(i, function (data) {
                            if (data) {
                                // Global.ProtocolMgr.queryNongChangUserData()
                                cc.director.GlobalEvent.emit("FriendNongChangUserData", {});
                                Global.PageMgr.showTipPage(dataFunc.queryValue(table, "name", id) + '+1');
                                _this2.NongChangDesc.active = false;
                                _this2.NongChang[i].getChildByName('Tip').destroy();
                            } else {
                                Global.PageMgr.showTipPage('收获失败');
                            }
                        });
                        return;
                    }
                });
            } else {
                _this2.NongChang[i].getComponent(cc.Sprite).spriteFrame = null;
                try {
                    _this2.NongChang[i].getChildByName('Tip').destroy();
                } catch (e) {
                    console.log('空土地');
                }
            }
        };

        for (var i = 0; i < backPack.length; i++) {
            _loop2(i);
        }
    },

    //收获动画
    shouhuoAnim: function shouhuoAnim(target, callback) {
        var action = cc.sequence(cc.moveBy(1, cc.v2(0, 50)), cc.callFunc(callback));
        target.runAction(action);
        this.NongChangDesc.active = false;
    },
    clearPage: function clearPage() {
        this.NongChangDesc.active = false;
        Global.PageMgr.closeAllPages();
    }
}
// update (dt) {},
);

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
        //# sourceMappingURL=NongChang.js.map
        