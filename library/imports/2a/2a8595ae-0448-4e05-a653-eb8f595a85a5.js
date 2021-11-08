"use strict";
cc._RF.push(module, '2a859WuBEhOBaZT649ZWoWl', 'IncomeDetails_Item');
// Script/Ui/IncomeDetails/IncomeDetails_Item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_name: cc.Label,
        label_time: cc.Label,
        label_pic: cc.Label
    },

    start: function start() {},
    setData: function setData(data) {
        try {
            // cc.loader.loadRes("imgs/bg" + data.id, cc.SpriteFrame, (err, sf)=>{
            //     if (!err){
            //         this.icon_pic.spriteFrame = sf;
            //     }
            // });
        } catch (e) {
            console.warn(e);
        }
        this.label_name.string = data.title;
        this.label_time.string = data.tradeTime;
        var sum = parseFloat(data.tradeValue).toFixed(4);
        if (data.tradeType == 0) //加
            {
                this.label_pic.string = cc.js.formatStr("+%s", sum);
            } else {
            this.label_pic.string = cc.js.formatStr("-%s", sum);
        }
    }
}

// update (dt) {},
);

cc._RF.pop();