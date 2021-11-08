"use strict";
cc._RF.push(module, '9b6e6LcvoVJ8oGX3acEI4ls', 'EmailPanel');
// Script/Ui/EmailPanel/EmailPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        emailItem: cc.Prefab,
        container_email: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {
        var _this = this;

        Global.ProtocolMgr.queryEmail(function (res) {
            console.log(res);
            if (res.code == 200) {
                (function () {
                    var data = res.data.list;
                    console.log(data);
                    _this.container_email.removeAllChildren();

                    var _loop = function _loop(i) {
                        var emailItem = cc.instantiate(_this.emailItem);
                        emailItem.getComponent("emailItem").setData(data[i]);
                        emailItem.on(cc.Node.EventType.TOUCH_END, function () {
                            Global.PageMgr.onOpenPage(20);
                            Global.PageMgr.pages[20].getComponent("EmailDetailPanel").setData(data[i]);
                            if (data[i].state == 0) {
                                Global.ProtocolMgr.readEmail(data[i].id, function (res2) {
                                    if (res2.code == 200) {
                                        console.log(res2);
                                    } else {
                                        Global.PageMgr.showTipPage(res2.message);
                                    }
                                });
                            }
                        });
                        _this.container_email.addChild(emailItem);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop(i);
                    }
                })();
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    }
    // update (dt) {},

});

cc._RF.pop();