(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/RankPanel/RankPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '751d31ArTdOQrOYcFAJb8ZA', 'RankPanel', __filename);
// Script/Ui/RankPanel/RankPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        rank_item: cc.Prefab,
        container: cc.Node,
        icon_1: cc.Node,
        icon_2: cc.Node,
        icon_3: cc.Node,
        icon_head: cc.Sprite,
        label_name: cc.Label,
        label_level: cc.Label,
        label_canchu: cc.Label,
        label_life: cc.Label,
        label_linli: cc.Label,
        label_zhanli: cc.Label,
        label_num: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.setData();
    },
    setData: function setData() {
        var _this = this;

        Global.ProtocolMgr.queryRankList(function (res) {
            if (res.code == 200) {
                var data = res.data;
                console.log(data);
                _this.container.removeAllChildren();
                for (var i = 0; i < data.length; i++) {
                    var rankItemNode = cc.instantiate(_this.rank_item);
                    rankItemNode.getComponent("rank_item").setData(data[i]);
                    _this.container.addChild(rankItemNode);
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
        Global.ProtocolMgr.queryRankInfo(function (res) {
            if (res.code == 200) {
                var data = res.data;
                console.log(data);
                try {
                    cc.loader.load({ url: data.icon, type: 'png' }, function (err, res) {
                        _this.icon_head.spriteFrame = new cc.SpriteFrame(res);
                    });
                } catch (e) {
                    console.warn(e);
                }
                _this.label_name.string = data.name;
                _this.label_level.string = data.level;
                _this.label_canchu.string = data.canchu;
                _this.label_life.string = data.life;
                _this.label_linli.string = data.linli;
                _this.label_zhanli.string = data.zhanli;
                _this.icon_1.active = false;
                _this.icon_2.active = false;
                _this.icon_3.active = false;
                _this.label_num.node.active = false;
                switch (data.num) {
                    case 1:
                        _this.icon_1.active = true;
                        break;
                    case 2:
                        _this.icon_2.active = true;
                        break;
                    case 3:
                        _this.icon_3.active = true;
                        break;
                    default:
                        _this.label_num.node.active = true;
                        _this.label_num.string = data.num;
                        break;
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    }
    // update (dt) {},

});

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
        //# sourceMappingURL=RankPanel.js.map
        