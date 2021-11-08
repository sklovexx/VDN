"use strict";
cc._RF.push(module, 'd6853XDnZZA1Iq7Sh+4EBEX', 'Tip');
// Script/Tip/Tip.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var action = cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.v2(0, -30)), cc.moveBy(0.5, cc.v2(0, 30))));
        this.node.runAction(action);
        setInterval(function () {}, 1000);
        this.tag = [];
        this.tag['获得E金币'] = 'getEGold';
        this.tag['去社区'] = 'backToMain';
    },
    start: function start() {},
    setItem: function setItem(name) {
        this.item = this.tag[name];
        this.text.getComponent(cc.Label).string = name;
    },
    update: function update(dt) {
        if (cc.sys.localStorage.getItem(this.item) == 1) {
            this.node.destroy();
        }
    }
});

cc._RF.pop();