"use strict";
cc._RF.push(module, 'b913frxb8NN/7Cj9AtDiB8A', 'WithdrawalListPanel');
// Script/Ui/WithdrawalList/WithdrawalListPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        incomeDetailsItem: cc.Prefab,
        container_incomeDetails: cc.Node,
        pageSum: 1,
        pageSum2: 1
    },

    onEnable: function onEnable() {
        this.pageSum = 1;
        this.upDataAccountDetail();
    },
    upDataAccountDetail: function upDataAccountDetail() {
        var _this = this;

        Global.ProtocolMgr.queryGetWithdrawApplyDetail(10, this.pageSum, function (res) {
            if (res.code == 200) {
                if (res.data) {
                    var data = res.data;
                    if (data.length == 0) {
                        if (_this.pageSum != 1) {
                            Global.PageMgr.showTipPage("已经是最后页了");
                        }
                        _this.pageSum = _this.pageSum2 + 1;
                        return;
                    }
                    _this.pageSum2 = _this.pageSum;
                    if (_this.pageSum != 1) {
                        Global.PageMgr.showTipPage("刷新成功！");
                    }
                    _this.container_incomeDetails.removeAllChildren();
                    for (var i = 0; i < data.length; i++) {
                        var incomeDetailsItem = cc.instantiate(_this.incomeDetailsItem);
                        incomeDetailsItem.getComponent("WithdrawalList_Item").setData(data[i]);
                        _this.container_incomeDetails.addChild(incomeDetailsItem);
                    }
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    onClickDown: function onClickDown() {
        if (this.pageSum > 2) {
            this.pageSum -= 1;
        } else {
            this.pageSum = 1;
            Global.PageMgr.showTipPage("已经是首页了");
        }
        this.upDataAccountDetail();
    },
    onClickUp: function onClickUp() {
        this.pageSum += 1;
        this.upDataAccountDetail();
    }
}

// update (dt) {},
);

cc._RF.pop();