(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/gameScene/prefabs/card.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2afe8rz92BOl7CbQfKSCoLh', 'card', __filename);
// ddz/scripts/gameScene/prefabs/card.js

"use strict";

var _mygolbal = require("../../mygolbal.js");

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        cards_sprite_atlas: cc.SpriteAtlas

    },

    onLoad: function onLoad() {
        this.flag = false;
        this.offset_y = 20;

        this.node.on("reset_card_flag", function (event) {
            if (this, flag == true) {
                this, flag = false;
                this.node.y -= this.offset_y;
            }
        }.bind(this));

        // this.node.on("chu_card_succ",function(event){
        //    var chu_card_list = event
        //    for(var i=0;i<chu_card_list.length;i++){
        //     if(chu_card_list[i].card_id==this.card_id){
        //         //this.runToCenter(chu_card_list[i])
        //         //this.node.destory()
        //     }
        //    }
        // }.bind(this))
    },
    runToCenter: function runToCenter() {
        //移动到屏幕中间，并带一个牌缩小的效果
    },
    start: function start() {},
    init_data: function init_data(data) {},

    // update (dt) {},
    setTouchEvent: function setTouchEvent() {
        if (this.accountid == _mygolbal2.default.playerData.accountID) {
            // this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            //     var gameScene_node = this.node.parent.parent  
            //     var room_state = gameScene_node.getComponent("gameScene").roomstate
            //     if(room_state==RoomState.ROOM_PLAYING){
            //         console.log("TOUCH_START id:"+this.card_id)
            //         if(this.flag==false){
            //             this.flag = true
            //             this.node.y += this.offset_y
            //             //通知gameui层选定的牌
            //             var carddata = {
            //                 "cardid":this.card_id,
            //                 "card_data":this.card_data,
            //             }
            //             gameScene_node.emit("choose_card_event",carddata)
            //         }else{
            //             this.flag=false
            //             this.node.y -= this.offset_y
            //             //通知gameUI取消了那张牌
            //            gameScene_node.emit("unchoose_card_event",this.card_id)
            //         }
            //     }

            // }.bind(this))
        }
    },
    showCards: function showCards(card, accountid) {
        //card.index是服务器生成card给对象设置的一副牌里唯一id
        this.card_id = card.index;
        //传入参数 card={"value":5,"shape":1,"index":20}
        this.card_data = card;
        if (accountid) {
            this.accountid = accountid; //标识card属于的玩家
        }

        //this.node.getComponent(cc.Sprite).spriteFrame = 
        //服务器定义牌的表示
        // const cardvalue = {
        //     "A": 12,
        //     "2": 13,
        //     "3": 1,
        //     "4": 2,
        //     "5": 3,
        //     "6": 4,
        //     "7": 5,
        //     "8": 6,
        //     "9": 7,
        //     "10": 8,
        //     "J": 9,
        //     "Q": 10,
        //     "K": 11,
        // }


        //服务器返回的是key,value对应的是资源的编号
        var CardValue = {
            "12": 1,
            "13": 2,
            "1": 3,
            "2": 4,
            "3": 5,
            "4": 6,
            "5": 7,
            "6": 8,
            "7": 9,
            "8": 10,
            "9": 11,
            "10": 12,
            "11": 13
        };

        // 黑桃：spade
        // 红桃：heart
        // 梅花：club
        // 方片：diamond
        // const CardShape = {
        //     "S": 1,
        //     "H": 2,
        //     "C": 3,
        //     "D": 4,
        // };
        var cardShpae = {
            "1": 3,
            "2": 2,
            "3": 1,
            "4": 0
        };
        var Kings = {
            "14": 54,
            "15": 53
        };

        var spriteKey = '';
        if (card.shape) {
            spriteKey = 'card_' + (cardShpae[card.shape] * 13 + CardValue[card.value]);
        } else {
            spriteKey = 'card_' + Kings[card.king];
        }

        // console.log("spriteKey"+spriteKey)
        this.node.getComponent(cc.Sprite).spriteFrame = this.cards_sprite_atlas.getSpriteFrame(spriteKey);
        this.setTouchEvent();
    }
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
        //# sourceMappingURL=card.js.map
        