(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/BaoMingPanel/BaoMingPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5cc0aPY98ZNQ4nRAH9o+Jcn', 'BaoMingPanel', __filename);
// Script/Ui/BaoMingPanel/BaoMingPanel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        label_saiqu: cc.Label,
        editBox_zhandui: cc.EditBox,
        editBox_name: cc.EditBox,
        editBox_card: cc.EditBox,
        editBox_phone: cc.EditBox,
        editBox_email: cc.EditBox,
        selectItem: cc.Prefab,
        container_saiqu: cc.Node,
        container_zhandui: cc.Node,
        scroll_saiqu: cc.Node,
        Panle: cc.Node,
        Panle2: cc.Node,
        Panle3: cc.Node,
        Panle4: cc.Node,
        label_email: cc.Label,
        label_name: cc.Label,
        label_zhandui: cc.Label,
        label_saiqu2: cc.Label,
        label_dianhua: cc.Label,
        label_zhengjian: cc.Label,
        label_gamename: cc.Label,
        game_item: cc.Prefab,
        container: cc.Node,
        scroll_zhandui: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {
        this.showDivisionRegistrationRanking();
    },


    //展示赛区报名排行
    showDivisionRegistrationRanking: function showDivisionRegistrationRanking() {
        var _this = this;

        this.Panle.active = false;
        this.Panle2.active = false;
        this.Panle3.active = true;
        this.Panle4.active = false;
        this.container.removeAllChildren();
        Global.ProtocolMgr.queryGetGameSignRank(function (res) {
            console.log(res);
            if (res.code == 200) {
                var data = res.data;
                for (var i = 0; i < data.length; i++) {
                    var gameItemNode = cc.instantiate(_this.game_item);
                    gameItemNode.getComponent("BaoMing_Item").setData(data[i]);
                    _this.container.addChild(gameItemNode);
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
        // this.showApplyForTeamInformation();
    },

    //展示战队信息
    showApplyForTeamInformation: function showApplyForTeamInformation() {
        var _this2 = this;

        this.Panle.active = false;
        this.Panle2.active = true;
        this.Panle3.active = false;
        Global.ProtocolMgr.queryGetSignUPInfo(function (res) {
            if (res.code == 200) {
                var data = res.data;
                if (data) {
                    _this2.label_email.string = data.email;
                    _this2.label_name.string = data.name;
                    _this2.label_zhandui.string = data.team_name;
                    _this2.label_saiqu2.string = data.division_name;
                    _this2.label_gamename.string = data.id_card_number;
                    _this2.label_dianhua.string = data.phone;
                }
            } else {
                _this2.showApplyForTeam();
            }
        });
    },


    //展示申请战队ui
    showApplyForTeam: function showApplyForTeam() {
        var _this3 = this;

        this.Panle.active = true;
        this.Panle2.active = false;
        this.scroll_saiqu.active = false;
        this.scroll_zhandui.active = false;
        this.container_saiqu.removeAllChildren();
        this.container_zhandui.removeAllChildren();
        this.did = 0;
        this.tid = 0;
        this.label_saiqu.string = '选择赛区';
        this.label_zhengjian.string = '比赛项目';
        this.editBox_name.string = "";
        this.editBox_email.string = "";
        this.editBox_phone.string = "";
        this.editBox_card.string = "";
        this.editBox_zhandui.string = "";
        Global.ProtocolMgr.queryDivisionList(function (res) {
            if (res.code == 200) {
                (function () {
                    var data = res.data;
                    console.log(data);
                    _this3.container_saiqu.removeAllChildren();

                    var _loop = function _loop(i) {
                        var selectItem = cc.instantiate(_this3.selectItem);
                        selectItem.getComponent(cc.Label).string = data[i].division_name;
                        selectItem.on(cc.Node.EventType.TOUCH_END, function () {
                            _this3.label_saiqu.string = data[i].division_name;
                            _this3.did = data[i].id;
                            console.log(_this3.did);
                            _this3.closeScroll();
                        });
                        _this3.container_saiqu.addChild(selectItem);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop(i);
                    }
                })();
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });

        Global.ProtocolMgr.queryGetGameSignList(function (res) {
            if (res.code == 200) {
                (function () {
                    var data = res.data;
                    _this3.container_zhandui.removeAllChildren();

                    var _loop2 = function _loop2(i) {
                        var selectItem = cc.instantiate(_this3.selectItem);
                        selectItem.getComponent(cc.Label).string = data[i].game_name;
                        selectItem.on(cc.Node.EventType.TOUCH_END, function () {
                            _this3.label_zhengjian.string = data[i].game_name;
                            _this3.tid = data[i].id;
                            _this3.closeScroll();
                        });
                        _this3.container_zhandui.addChild(selectItem);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop2(i);
                    }
                })();
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    showScroll: function showScroll(event, customData) {
        switch (customData) {
            case "saiqu":
                this.scroll_saiqu.active = true;
                break;
            case "zhandui":
                this.scroll_zhandui.active = true;
                break;
            default:
                break;
        }
    },
    closeScroll: function closeScroll() {
        this.scroll_saiqu.active = false;
        this.scroll_zhandui.active = false;
    },
    submit: function submit() {
        var _this4 = this;

        if (this.did == 0) {
            Global.PageMgr.showTipPage("还未选择赛区");
            return;
        }
        if (this.editBox_zhandui.string == "") {
            Global.PageMgr.showTipPage("还未填写战队");
            return;
        }
        if (this.editBox_name.string == "") {
            Global.PageMgr.showTipPage("还未填写姓名");
            return;
        }
        if (this.tid == 0) {
            Global.PageMgr.showTipPage("还未选择游戏");
            return;
        }
        if (this.editBox_phone.string == "") {
            Global.PageMgr.showTipPage("还未填写手机号");
            return;
        }
        if (this.editBox_email.string == "") {
            Global.PageMgr.showTipPage("还未填写邮箱");
            return;
        }
        var reqData = {
            name: this.editBox_name.string,
            email: this.editBox_email.string,
            phone: this.editBox_phone.string,
            team_name: this.editBox_zhandui.string,
            did: this.did.toString(),
            game_id: this.tid.toString()
            // id_card_number:this.editBox_card.string,
        };
        console.log("选择的游戏是：" + this.tid.toString());
        console.log("选择的赛区是：" + this.did.toString());
        Global.ProtocolMgr.submitBaoMing(reqData, function (res) {
            console.log(res);
            if (res.code == 200) {
                // Global.PageMgr.showTipPage("报名成功");
                // Global.PageMgr.onClosePage(17);
                _this4.Panle4.active = true;
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    }
}
// //返回界面
// onClickBack()
// {
//     this.Panle.active = false;
//     this.Panle2.active = false;
//     this.Panle3.active = true;
// },
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
        //# sourceMappingURL=BaoMingPanel.js.map
        