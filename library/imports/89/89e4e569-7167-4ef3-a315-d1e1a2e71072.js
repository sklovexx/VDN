"use strict";
cc._RF.push(module, '89e4eVpcWdO86MV0eGi5xBy', 'JiaoYiPanel');
// Script/Ui/JiaoYiPanel/JiaoYiPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jiaoyi_item: cc.Prefab,
        container: cc.Node,
        btn_item: [cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable: function onEnable() {
        this.getListData(null, 0);
    },
    getListData: function getListData(event, customData) {
        var _this = this;

        this.btn_item.forEach(function (e) {
            e.spriteFrame = null;
        });
        cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function (err, sf) {
            if (!err) {
                _this.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        Global.ProtocolMgr.queryJiaoYiList(function (res) {
            if (res.code == 200) {
                var data = res.data;
                console.log(data);
                _this.container.removeAllChildren();
                for (var i = 0; i < data.length; i++) {
                    var jiaoyiItemNode = cc.instantiate(_this.jiaoyi_item);
                    jiaoyiItemNode.getComponent("jiaoyi_item").setData(i, data[i]);
                    _this.container.addChild(jiaoyiItemNode);
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    close: function close() {
        Global.PageMgr.onClosePage(3);
    }
    // update (dt) {},

});

cc._RF.pop();