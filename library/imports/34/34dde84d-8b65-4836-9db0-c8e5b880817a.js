"use strict";
cc._RF.push(module, '34ddehNi2VINp2wyOW4gIF6', 'Friend');
// Script/Ui/Friend/Friend.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        content: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on('FriendData', this.onUpdateFriendData, this);
    },
    start: function start() {},
    onUpdateFriendData: function onUpdateFriendData() {
        var _this = this;

        var backPack = GameData.FriendData;
        backPack.forEach(function (e) {
            var node = cc.instantiate(_this.item);
            node.parent = _this.content;
            cc.loader.load(e.url, function (err, res) {
                var spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            node.getChildByName('Name').getComponent(cc.Label).string = e.name;
            node.getChildByName('State').getComponent(cc.Label).string = e.state == 1 ? '可偷取' : '';
            node.off(cc.Node.EventType.TOUCH_END);
            node.on(cc.Node.EventType.TOUCH_END, function () {
                Global.ProtocolMgr.queryFriendNongChang();
            }, _this);
        });
    },
    onEnable: function onEnable() {
        Global.ProtocolMgr.queryFriend();
    },
    onDisable: function onDisable() {
        var children = this.content.children;
        children.forEach(function (e) {
            e.destroy();
        });
    }
}
// update (dt) {},
);

cc._RF.pop();