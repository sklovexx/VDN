(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/SpriteRemote.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f93b9VEGo1NFKnj3jl8TuM8', 'SpriteRemote', __filename);
// NiuNiu/script/common/SpriteRemote.js

/**
 * Created by skyxu on 2018/3/22.
 */

"use strict";

cc.Class({
    extends: cc.Sprite,

    properties: {

        imgAddr: "",
        spSize: cc.Size
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._newSpFrame = null;
        if (this.imgAddr && this.imgAddr.length > 0) {
            this.setSPLink(this.imgAddr);
        }
    },

    setSPLink: function setSPLink(link) {
        if (link && link.length > 0) {
            this.imgAddr = link;
            cc.loader.load(this.imgAddr, function (progress) {
                cc.log("~~~~~SpriteRemote progress:" + progress);
            }, function (error, tex) {
                if (error) {
                    cc.log("~~~~~SprieRemote error:" + error);
                    return;
                }

                this._newSpFrame = new cc.SpriteFrame(tex);

                if (!this.node) return;
                var oldW = this.node.width;
                var oldH = this.node.height;

                this.getComponent(cc.Sprite).spriteFrame = this._newSpFrame;

                this.node.width = this.spSize.width ? this.spSize.width : oldW;
                this.node.height = this.spSize.height ? this.spSize.height : oldH;
            }.bind(this));
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

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
        //# sourceMappingURL=SpriteRemote.js.map
        