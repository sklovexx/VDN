"use strict";
cc._RF.push(module, '25b69IOFlRK4peKZ1MjTpzy', 'LuckyDrawPanel');
// Script/Ui/LuckyDrawPanel/LuckyDrawPanel.js

"use strict";

// let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        luckyDraw_item: cc.Prefab,
        container: cc.Node,
        Panle: cc.Node,
        Panle2: cc.Node,
        Panle3: cc.Node,
        pageSum: 1,
        pageSum2: 1,
        btn_item: [cc.Sprite]
    },

    onLoad: function onLoad() {},
    onEnable: function onEnable() {
        this.pageSum = 1;
        this.getGameList(null, 0);
    },
    goLuckyDrawUI: function goLuckyDrawUI() {
        var _this = this;

        Global.ProtocolMgr.queryLuckDrawList(20, this.pageSum, function (res) {
            if (res.code == 200) {
                var data = res.data.list;

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
                _this.container.removeAllChildren();
                for (var i = 0; i < data.length; i++) {
                    var gameItemNode = cc.instantiate(_this.luckyDraw_item);
                    gameItemNode.getComponent("LuckyDrawItem").setData(data[i]);
                    _this.container.addChild(gameItemNode);
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    getGameList: function getGameList(event, customData) {
        var _this2 = this;

        this.btn_item.forEach(function (e) {
            e.spriteFrame = null;
        });
        cc.loader.loadRes("imgs/按钮bg2", cc.SpriteFrame, function (err, sf) {
            if (!err) {
                _this2.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        switch (parseInt(customData)) {
            case 0:
                this.onClickBeganTheDetail(null, 1);
                break;
            case 1:
                this.onClickBeganTheDetail(null, 0);
                this.goLuckyDrawUI();
                break;
            case 2:
                this.onClickBeganTheDetail(null, 2);
                break;
            default:
                break;
        }
    },


    //开始抽奖
    onClickBeganToDraw: function onClickBeganToDraw() {
        Global.PageMgr.showTipPage("每周六下午5点,官方统一抽奖", 20);
    },

    //点击抽奖规则
    onClickSweepstakesRules: function onClickSweepstakesRules() {
        this.onClickBeganTheDetail(null, 2);
        this.Panle3.active = true;
    },

    //点击明显或者返回
    onClickBeganTheDetail: function onClickBeganTheDetail(event, customData) {
        var index = parseInt(customData);
        this.Panle.active = index == 1 ? true : false;
        this.Panle2.active = index == 0 ? true : false;
        this.Panle3.active = index == 2 ? true : false;
        // if(index == 0)
        // {
        //     this.goLuckyDrawUI();
        // }
    },
    onClickDown: function onClickDown() {
        if (this.pageSum > 2) {
            this.pageSum -= 1;
        } else {
            this.pageSum = 1;
            Global.PageMgr.showTipPage("已经是首页了");
        }
        this.goLuckyDrawUI();
    },
    onClickUp: function onClickUp() {
        this.pageSum += 1;
        this.goLuckyDrawUI();
    }
});

cc._RF.pop();