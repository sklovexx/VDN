(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/HongBao/HongBaoList1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba017aHvAFDvqmKfXxXorXN', 'HongBaoList1', __filename);
// Script/Ui/HongBao/HongBaoList1.js

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
        //# sourceMappingURL=HongBaoList1.js.map
        