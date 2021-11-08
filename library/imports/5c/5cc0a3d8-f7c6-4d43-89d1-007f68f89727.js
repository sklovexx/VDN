"use strict";
cc._RF.push(module, '5cc0aPY98ZNQ4nRAH9o+Jcn', 'BaoMingPanel');
// Script/Ui/BaoMingPanel/BaoMingPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_saiqu: cc.Label,
        // label_zhandui:cc.Label,
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
        label_email: cc.Label,
        label_name: cc.Label,
        label_zhandui: cc.Label,
        label_saiqu2: cc.Label,
        label_dianhua: cc.Label,
        label_zhengjian: cc.Label,

        scroll_zhandui: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {
        this.showApplyForTeamInformation();
    },


    //展示战队信息
    showApplyForTeamInformation: function showApplyForTeamInformation() {
        var _this = this;

        this.Panle.active = false;
        this.Panle2.active = true;
        Global.ProtocolMgr.queryGetSignUPInfo(function (res) {
            if (res.code == 200) {
                var data = res.data;
                if (data) {
                    _this.label_email.string = data.email;
                    _this.label_name.string = data.name;
                    _this.label_zhandui.string = data.team_name;
                    _this.label_saiqu2.string = data.division_name;
                    _this.label_zhengjian.string = data.id_card_number;
                    _this.label_dianhua.string = data.phone;
                }
            } else {
                _this.showApplyForTeam();
            }
        });
    },


    //展示申请战队ui
    showApplyForTeam: function showApplyForTeam() {
        var _this2 = this;

        this.Panle.active = true;
        this.Panle2.active = false;
        this.did = 0;
        this.tid = 0;
        this.label_saiqu.string = '-选择赛区';
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
                    _this2.container_saiqu.removeAllChildren();

                    var _loop = function _loop(i) {
                        var selectItem = cc.instantiate(_this2.selectItem);
                        selectItem.getComponent(cc.Label).string = data[i].division_name;
                        selectItem.on(cc.Node.EventType.TOUCH_END, function () {
                            _this2.label_saiqu.string = data[i].division_name;
                            _this2.did = data[i].id;
                            console.log(_this2.did);
                            _this2.closeScroll();
                        });
                        _this2.container_saiqu.addChild(selectItem);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop(i);
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
        if (this.editBox_card.string == "") {
            Global.PageMgr.showTipPage("还未填写身份证号");
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
            id_card_number: this.editBox_card.string,
            team_name: this.editBox_zhandui.string,
            did: this.did.toString()
        };
        Global.ProtocolMgr.submitBaoMing(reqData, function (res) {
            console.log(res);
            if (res.code == 200) {
                Global.PageMgr.showTipPage("报名成功");
                Global.PageMgr.onClosePage(17);
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    }
    // update (dt) {},

});

cc._RF.pop();