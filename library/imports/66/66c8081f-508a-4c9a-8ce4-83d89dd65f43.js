"use strict";
cc._RF.push(module, '66c80gfUIpMmozkg9id1l9D', 'HongBaoList');
// Script/Ui/HongBao/HongBaoList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        Item: cc.Prefab,
        Content: cc.Node,
        MaxCount: 200
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on("HongBaoListData", this.onUpdateHongBaoListData, this);
    },
    start: function start() {},
    onEnable: function onEnable() {
        // Global.ProtocolMgr.queryHongBaoList();
        this.onUpdateHongBaoListData();
    },
    onUpdateHongBaoListData: function onUpdateHongBaoListData() {
        var _this = this;

        this.clearContent();
        var backPack = GameData.HongBaoList;

        var _loop = function _loop(i) {
            var node = cc.instantiate(_this.Item);
            node.parent = _this.Content;
            node.getChildByName('Index').getComponent(cc.Label).string = i + 1;
            node.getChildByName('UserName').getComponent(cc.Label).string = backPack[i].nickname;
            node.getChildByName('Count').getComponent(cc.Label).string = backPack[i].amount;
            cc.loader.load({ url: backPack[i].headPortrait, type: 'png' }, function (err, res) {
                var spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        };

        for (var i = 0; i < backPack.length; i++) {
            _loop(i);
        }
    },
    clearContent: function clearContent() {
        //清理列表
        var children = this.Content.children;
        for (var i = 0; i < children.length; i++) {
            children[i].destroy();
        }
    }
}
// update (dt) {},
);

cc._RF.pop();