"use strict";
cc._RF.push(module, '000d7uVI4JGWLDdcS0wtQ9E', 'ShejiaoPanel');
// Script/Ui/ShejiaoPanel/ShejiaoPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_logo: [cc.Sprite],
        label_description: [cc.Label]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.pageData = [[{
            logo: "微信",
            description: "微信",
            bundleId: "1,com.tencent.mm,https://weixin.qq.com/"
        }, {
            logo: "fb",
            description: "FB",
            bundleId: "1,com.xxx.xxx,https://m.facebook.com/"
        }, {
            logo: "抖音",
            description: "抖音",
            bundleId: "1,com.ss.android.ugc.aweme,https://www.douyin.com/recommend"
        }, {
            logo: "SOUL",
            description: "Soul",
            bundleId: "1,cn.soulapp.android,https://www.soulapp.cn/"
        }], [{
            logo: "陌陌",
            description: "陌陌",
            bundleId: "1,com.immomo.momo,http://www.immomo.com/"
        }, {
            logo: "",
            description: "尽请期待"
        }, {
            logo: "",
            description: "尽请期待"
        }, {
            logo: "",
            description: "尽请期待"
        }], [{
            logo: "",
            description: "尽请期待"
        }, {
            logo: "",
            description: "尽请期待"
        }, {
            logo: "",
            description: "尽请期待"
        }, {
            logo: "",
            description: "尽请期待"
        }]];
        this.curPageData = [];
        this.setPageData({ target: { name: 0 } });
    },
    start: function start() {},
    setPageData: function setPageData(event) {
        var _this = this;

        var data = this.curPageData = this.pageData[parseInt(event.target.name)];

        var _loop = function _loop(i) {
            if (data[i].logo != "") {
                cc.loader.loadRes("imgs/" + data[i].logo, cc.SpriteFrame, function (err, sf) {
                    if (!err) {
                        _this.icon_logo[i].spriteFrame = sf;
                    }
                });
            } else {
                _this.icon_logo[i].spriteFrame = null;
            }
            _this.label_description[i].string = data[i].description;
            if (data[i].description == "尽请期待") {
                _this.label_description[i].node.opacity = 178;
            } else {
                _this.label_description[i].node.opacity = 255;
            }
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
    },
    jumpTo: function jumpTo(event, customData) {
        // let classPath = "org/cocos2dx/javascript/AppActivity";
        if (!this.curPageData[parseInt(customData)] || !this.curPageData[parseInt(customData)].bundleId) {
            return;
        }
        // console.log(this.curPageData[parseInt(customData)]);
        var res = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.curPageData[parseInt(customData)].bundleId);
        if (!res) {
            Global.PageMgr.showTipPage("跳转失败");
        }
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", "com.tencent.mm");
    }
    // update (dt) {},

});

cc._RF.pop();