"use strict";
cc._RF.push(module, '965542AQ+dGJ6THH7D/WvxQ', 'Dssc');
// Script/Dssc/Dssc.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
        Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
        Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
        GameData.audio = 1;
    },
    Nav: function Nav(event, customEventData) {
        Global.ResourceMgr.playTransitionIn();
        cc.director.loadScene(customEventData, function () {});
    },
    closeGames: function closeGames() {
        try {
            app.closeUI();
        } catch (e) {
            console.log(e);
        }
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();