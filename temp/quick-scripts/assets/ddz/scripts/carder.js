(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/carder.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f2b73KEahtEPqUTXAvLqtnu', 'carder', __filename);
// ddz/scripts/carder.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var carder = function carder() {
    var that = {};
    var cardvalue = {
        "A": 12,
        "2": 13,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 4,
        "7": 5,
        "8": 6,
        "9": 7,
        "10": 8,
        "J": 9,
        "Q": 10,
        "K": 11

        // 黑桃：spade
        // 红桃：heart
        // 梅花：club
        // 方片：diamond
    };var CardShape = {
        "S": 1,
        "H": 2,
        "C": 3,
        "D": 4
    };

    //大小玩分开写是因为只有一张，并且没有黑桃这些区分
    var Kings = {
        "kx": 14, //小王
        "Kd": 15 //大王
    };
    var that = {};
    that.card_list = [];

    //出一张牌
    var isOneCard = function isOneCard(cardList) {
        if (cardList.length === 1) {
            return true;
        }
        return false;
    };

    //是否对子
    var IsDoubleCard = function IsDoubleCard(cardList) {

        if (cardList.length != 2) {
            return false;
        }
        //cardList[0].value==undefined说明是大小王，值是存储在king字段
        if (cardList[0].card_data.value == undefined || cardList[0].card_data.value != cardList[1].card_data.value) {
            return false;
        }

        return true;
    };

    //三张不带
    var Isthree = function Isthree(cardList) {

        if (cardList.length != 3) {
            return false;
        }
        //不能是大小王
        if (cardList[0].card_data.value == undefined || cardList[1].card_data.value == undefined) {
            return false;
        }
        //判断三张牌是否相等
        if (cardList[0].card_data.value != cardList[1].card_data.value) {
            return false;
        }

        if (cardList[0].card_data.value != cardList[2].card_data.value) {
            return false;
        }

        if (cardList[1].card_data.value != cardList[2].card_data.value) {
            return false;
        }
        return true;
    };
    //三带一
    var IsThreeAndOne = function IsThreeAndOne(cardList) {
        if (cardList.length != 4) {
            return false;
        }
        //被带的一张放在2头
        if (cardList[1].card_data.value == undefined || cardList[2].card_data.value == undefined) {
            return false;
        }
        if (cardList[0].card_data.value == cardList[1].card_data.value && cardList[1].card_data.value == cardList[2].card_data.value) {
            return true;
        } else if (cardList[1].card_data.value == cardList[2].card_data.value && cardList[2].card_data.value == cardList[3].card_data.value) {
            return true;
        }
        return false;
    };

    //三带二
    var IsThreeAndTwo = function IsThreeAndTwo(cardList) {
        if (cardList.length != 5) {
            return false;
        }

        if (cardList[0].card_data.value == cardList[1].card_data.value && cardList[1].card_data.value == cardList[2].card_data.value) {
            if (cardList[3].card_data.value == cardList[4].card_data.value) {
                return true;
            }
        } else if (cardList[2].card_data.value == cardList[3].card_data.value && cardList[3].card_data.value == cardList[4].card_data.value) {
            if (cardList[0].card_data.value == cardList[1].card_data.value) {
                return true;
            }
        }

        return false;
    };

    //四张炸弹
    var IsBoom = function IsBoom(cardList) {
        if (cardList.length != 4) {
            return false;
        }

        var map = {};
        for (var i = 0; i < cardList.length; i++) {
            if (map.hasOwnProperty(cardList[i].card_data.value)) {
                map[cardList[i].card_data.value]++;
            } else {
                map[cardList[i].card_data.value] = 1;
            }
        }

        var keys = Object.keys(map);
        if (keys.length == 1) {
            return true;
        }

        return false;
    };

    //王炸
    var IsKingBoom = function IsKingBoom(cardList) {
        if (cardList.length != 2) {
            return false;
        }

        if (cardList[0].card_data.king != undefined && cardList[1].card_data.king != undefined) {
            return true;
        }

        return false;
    };

    //飞机不带
    var IsPlan = function IsPlan(cardList) {
        if (cardList.length != 6) {
            return false;
        }

        var map = {};
        for (var i = 0; i < cardList.length; i++) {
            if (map.hasOwnProperty(cardList[i].card_data.value)) {
                map[cardList[i].card_data.value]++;
            } else {
                map[cardList[i].card_data.value] = 1;
            }
        }

        var keys = Object.keys(map);
        console.log("IsPlan keys" + keys);
        if (keys.length == 2) {
            //判断相同牌是否为三张
            for (key in map) {
                if (map[key] != 3) {
                    return false;
                }
            }

            //判断是否为相邻的牌
            var p1 = Number(keys[0]);
            var p2 = Number(keys[1]);
            if (Math.abs(p1 - p2) != 1) {
                return false;
            }
            return true;
        }

        return false;
    };

    //飞机带2个单张
    var IsPlanWithSing = function IsPlanWithSing(cardList) {
        if (cardList.length != 8) {
            return false;
        }

        var map = {};
        for (var i = 0; i < cardList.length; i++) {
            if (map.hasOwnProperty(cardList[i].card_data.value)) {
                map[cardList[i].card_data.value]++;
            } else {
                map[cardList[i].card_data.value] = 1;
            }
        }

        var keys = Object.keys(map);
        console.log("IsPlan keys" + keys);
        if (keys.length != 4) {
            return false;
        }
        //判断是否有2个三张牌
        var three_list = [];
        var sing_count = 0;
        for (var i in map) {
            if (map[i] == 3) {
                three_list.push(i);
            } else if (map[i] == 1) {
                sing_count++;
            }
        }

        if (three_list.length != 2 || sing_count != 2) {
            return false;
        }

        //判断是否为相邻的牌
        var p1 = Number(three_list[0]);
        var p2 = Number(three_list[1]);
        if (Math.abs(p1 - p2) != 1) {
            return false;
        }

        return true;
    };
    //飞机带2对 
    var IsPlanWithDouble = function IsPlanWithDouble(cardList) {
        if (cardList.length != 10) {
            return false;
        }

        var map = {};
        for (var i = 0; i < cardList.length; i++) {
            if (map.hasOwnProperty(cardList[i].card_data.value)) {
                map[cardList[i].card_data.value]++;
            } else {
                map[cardList[i].card_data.value] = 1;
            }
        }

        var keys = Object.keys(map);
        if (keys.length != 4) {
            return false;
        }
        /*
        "3":3,
        "4":4,
        "j":2,
        "9":2,
        */
        var three_list = [];
        var double_count = 0;
        for (var i in map) {
            if (map[i] == 3) {
                three_list.push(i);
            } else if (map[i] == 2) {
                double_count++;
            }
        }

        if (three_list.length != 2 || double_count != 2) {
            return false;
        }

        //判断是否为相邻的牌
        var p1 = Number(three_list[0]);
        var p2 = Number(three_list[1]);
        if (Math.abs(p1 - p2) != 1) {
            return false;
        }

        return true;
    };

    //顺子
    var IsShunzi = function IsShunzi(cardList) {

        if (cardList.length < 5 || cardList.length > 12) {
            return false;
        }
        var tmp_cards = cardList;
        //不能有2或者大小王
        for (var i = 0; i < tmp_cards.length; i++) {
            if (tmp_cards[i].card_data.value == 13 || tmp_cards[i].card_data.value == 14 || tmp_cards[i].card_data.value == 15) {
                return false;
            }
        }

        //排序 从小到大
        //sort返回正值做交换
        tmp_cards.sort(function (x, y) {
            return Number(x.card_data.value) - Number(y.card_data.value);
        });
        //console.log("IsShunzi tmp_cards"+JSON.stringify(tmp_cards))
        for (var i = 0; i < tmp_cards.length; i++) {
            if (i + 1 == tmp_cards.length) {
                break;
            }
            var p1 = Number(tmp_cards[i].card_data.value);
            var p2 = Number(tmp_cards[i + 1].card_data.value);
            if (Math.abs(p1 - p2) != 1) {
                return false;
            }
        }

        return true;
    };

    //连队
    var IsLianDui = function IsLianDui(cardList) {
        if (cardList.length < 6 || cardList.length > 24) {
            return false;
        }

        //不能包括大小王,和2
        for (var i = 0; i < cardList.length; i++) {
            if (cardList[i].card_data.value == 14 || cardList[i].card_data.value == 15 || cardList[i].card_data.value == 13) {
                return false;
            }
        }

        var map = {};
        for (var i = 0; i < cardList.length; i++) {
            if (map.hasOwnProperty(cardList[i].card_data.value)) {
                map[cardList[i].card_data.value]++;
            } else {
                map[cardList[i].card_data.value] = 1;
            }
        }

        //相同牌只能是2张
        for (var key in map) {
            if (map[key] != 2) {
                return false;
            }
        }
        var keys = Object.keys(map);
        if (keys.length < 3) {
            return false;
        }
        //从小到大排序
        keys.sort(function (x, y) {
            return Number(x) - Number(y);
        });

        //对子之间相减绝对值只能是1
        for (var i = 0; i < keys.length; i++) {
            if (i + 1 == keys.length) {
                break;
            }
            var p1 = Number(keys[i]);
            var p2 = Number(keys[i + 1]);
            if (Math.abs(p1 - p2) != 1) {
                return false;
            }
        }

        return true;
    };

    //牌型之间大小数值的定义
    var CardsValue = {
        'one': {
            name: 'One',
            value: 1
        },
        'double': {
            name: 'Double',
            value: 1
        },
        'three': {
            name: 'Three',
            value: 1
        },
        'boom': { //炸弹
            name: 'Boom',
            value: 2
        },
        'threeWithOne': {
            name: 'ThreeWithOne',
            value: 1
        },
        'threeWithTwo': {
            name: 'ThreeWithTwo',
            value: 1
        },
        'plane': {
            name: 'Plane',
            value: 1
        },
        'planeWithOne': {
            name: 'PlaneWithOne',
            value: 1
        },
        'planeWithTwo': {
            name: 'PlaneWithTwo',
            value: 1
        },
        'scroll': { //顺子
            name: 'Scroll',
            value: 1
        },
        'doubleScroll': { //连队
            name: 'DoubleScroll',
            value: 1
        },
        'kingboom': { //王炸
            name: 'kingboom',
            value: 3
        }

    };

    //cardA是上次出的牌
    //cardB是当前出的牌
    //cardB大于cardA返回true
    var compareOne = function compareOne(cardA, cardB) {
        console.log("compareOne");
        var valueA = 0;
        if (cardA[0].card_data.value == undefined) {
            valueA = cardA[0].card_data.king;
        } else {
            valueA = cardA[0].card_data.value;
        }

        var valueB = 0;
        if (cardB[0].card_data.value == undefined) {
            valueB = cardB[0].card_data.king;
        } else {
            valueB = cardB[0].card_data.value;
        }

        if (valueA >= valueB) {
            return false;
        }
        return true;
    };

    var compareDouble = function compareDouble(cardA, cardB) {
        console.log("compareDouble");
        var result = compareOne(cardA, cardB);
        return result;
    };

    var compareThree = function compareThree(cardA, cardB) {
        console.log("compareThree");
        var result = compareOne(cardA, cardB);
        return result;
    };

    var compareBoom = function compareBoom(cardA, cardB) {
        console.log("compareBoom");
        var result = false;
        if (cardA.length == 4 && cardB.length == 4) {
            result = compareOne(cardA, cardB);
        }

        return result;
    };

    var compareBoomKing = function compareBoomKing(cardA, cardB) {
        if (cardB.length != 2) {
            return false;
        }
        return true;
    };
    //三带一大小比较
    var comparePlanWithSing = function comparePlanWithSing(cardA, cardB) {
        //将三带存储到2个列表
        var lista = [];
        var listb = [];
        var map = {};
        for (var i = 0; i < cardA.length; i++) {
            if (map.hasOwnProperty(cardA.card_data.value)) {
                lista.push(cardA);
            } else {
                map[cardA.card_data.value] = 1;
            }
        }

        for (var i = 0; i < cardB.length; i++) {
            if (map.hasOwnProperty(cardB.card_data.value)) {
                listb.push(cardB);
            } else {
                map[cardB.card_data.value] = 1;
            }
        }

        var result = compareOne(cardA, cardB);
        return result;
    };

    var comparePlanWithTow = function comparePlanWithTow(cardA, cardB) {
        var mapA = {};
        var mapB = {};

        for (var i = 0; i < cardA.length; i++) {
            if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
                mapA[cardA[i].card_data.value].push(cardA[i]);
            } else {
                mapA[cardA[i].card_data.value] = [cardA[i]];
            }
        }
        for (var i = 0; i < cardB.length; i++) {
            if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
                mapB[cardB[i].card_data.value].push(cardB[i]);
            } else {
                mapB[cardB[i].card_data.value] = [cardB[i]];
            }
        }

        var listA = [];
        for (var i in mapA) {
            if (mapA[i].length === 3) {
                listA = mapA[i];
            }
        }

        var listB = [];
        for (var i in mapB) {
            if (mapB[i].length === 3) {
                listB = mapB[i];
            }
        }

        var result = compareOne(listA, listB);
        return result;
    };

    var comparePlan = function comparePlan(cardA, cardB) {
        var mapA = {};
        for (var i = 0; i < cardA.length; i++) {
            if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
                mapA[cardA[i].card_data.value].push(cardA[i]);
            } else {
                mapA[cardA[i].card_data.value] = [cardA[i]];
            }
        }

        var listA = [];
        var maxNum = 16;
        //找到飞机里最小的一张牌
        for (var i in mapA) {
            if (Number(i) < maxNum) {
                maxNum = Number(i);
                listA = mapA[i];
            }
        }

        //处理cardB
        var mapB = {};
        for (var i = 0; i < cardB.length; i++) {
            if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
                mapB[cardB[i].card_data.value].push(cardB[i]);
            } else {
                mapB[cardB[i].card_data.value] = [cardB[i]];
            }
        }

        maxNum = 16;
        var listB = [];
        for (var i in mapB) {
            if (Number(i) < maxNum) {
                maxNum = Number(i);
                listB = mapB[i];
            }
        }

        var result = compareThree(listA, listB);
        return result;
    };

    //飞机带2张单排
    var comparePlaneWithOne = function comparePlaneWithOne(cardA, cardB) {
        var result = false;
        var mapA = {};
        var listA = [];
        for (var i = 0; i < cardA.length; i++) {
            if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
                listA.push(cardA[i]);
            } else {
                mapA[cardA[i].card_data.value] = [cardA[i]];
            }
        }

        var mapB = {};
        var listB = [];
        for (var i = 0; i < cardB.length; i++) {
            if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
                listB.push(cardB[i]);
            } else {
                mapB[cardB[i].card_data.value] = [cardB[i]];
            }
        }

        result = comparePlan(listA, listB);
        return result;
    };

    //飞机带2对
    var comparePlaneWithDouble = function comparePlaneWithDouble(cardA, cardB) {
        var mapA = {};
        for (var i = 0; i < cardA.length; i++) {
            if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
                mapA[cardA[i].card_data.value].push(cardA[i]);
            } else {
                mapA[cardA[i].card_data.value] = [cardA[i]];
            }
        }
        var mapB = {};
        for (var i = 0; i < cardB.length; i++) {
            if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
                mapB[cardB[i].card_data.value].push(cardB[i]);
            } else {
                mapB[cardB[i].card_data.value] = [cardB[i]];
            }
        }

        var listA = [];
        for (var i in mapA) {
            if (mapA[i].length === 3) {
                for (var j = 0; j < mapA[i].length; j++) {
                    listA.push(mapA[i][j]);
                }
            }
        }
        console.log('list a = ' + JSON.stringify(listA));

        var listB = [];
        for (var i in mapB) {
            if (mapB[i].length === 3) {
                for (var j = 0; j < mapB[i].length; j++) {
                    listB.push(mapB[i][j]);
                }
            }
        }

        var result = comparePlan(listA, listB);
        return result;
    };

    var compareScroll = function compareScroll(cardA, cardB) {
        console.log("compareScroll");
        if (cardA.length != cardB.length) {
            return false;
        }

        var minNumA = 100;
        for (var i = 0; i < cardA.length; i++) {
            if (cardA[i].card_data.value < minNumA) {
                minNumA = cardA[i].card_data.value;
            }
        }

        var minNumB = 100;
        for (var _i = 0; _i < cardB.length; _i++) {
            if (cardB[_i].card_data.value < minNumB) {
                minNumB = cardB[_i].card_data.value;
            }
        }

        console.log('min a = ' + minNumA);
        console.log('min b = ' + minNumB);
        if (minNumA <= minNumB) {
            return true;
        }

        return false;
    };

    var compareDoubleScroll = function compareDoubleScroll(cardA, cardB) {
        var mapA = {};
        var listA = [];
        for (var i = 0; i < cardA.length; i++) {
            if (mapA.hasOwnProperty(cardA[i].card_data.value)) {} else {
                mapA[cardA[i].card_data.value] = true;
                listA.push(a[i]);
            }
        }

        var mapB = {};
        var listB = [];
        for (var i = 0; i < cardB.length; i++) {
            if (mapB.hasOwnProperty(cardB[i].card_data.value)) {} else {
                mapB[cardB[i].card_data.value] = true;
                listB.push(cardB[i]);
            }
        }

        console.log('list a = ' + JSON.stringify(listA));
        console.log('list b = ' + JSON.stringify(listB));

        return compareScroll(listA, listB);
    };
    //cardA上次出的牌
    //cardB本次出的牌
    //current_card_value当前牌型
    var compare = function compare(cardA, cardB, current_card_value) {
        var result = false;
        switch (current_card_value.name) {
            case CardsValue.one.name:
                result = compareOne(cardA, cardB);
                break;
            case CardsValue.double.name:
                result = compareDouble(cardA, cardB);
                break;
            case CardsValue.three.name:
                result = compareThree(cardA, cardB);
                break;
            case CardsValue.boom.name:
                result = compareBoom(cardA, cardB);
                break;
            case CardsValue.kingboom.name:
                result = compareBoomKing(cardA, cardB);
                break;
            case CardsValue.planeWithOne.name:
                result = comparePlanWithSing(cardA, cardB);
                break;
            case CardsValue.planeWithTwo.name:
                result = comparePlanWithTow(cardA, cardB);
                break;
            case CardsValue.plane.name:
                result = comparePlan(cardA, cardB);
                break;
            case CardsValue.planeWithOne.name:
                result = comparePlaneWithOne(cardA, cardB);
                break;
            case CardsValue.planeWithTwo.name:
                result = comparePlaneWithDouble(cardA, cardB);
                break;
            case CardsValue.scroll.name:
                result = compareScroll(cardA, cardB);
                break;
            case CardsValue.doubleScroll.name:
                result = compareDoubleScroll(cardA, cardB);
                break;
            default:
                console.log("no found card value!");
                result = false;
                break;
        }

        return result;
    };
    that.findWithCard = function (last_cards, current_cards) {
        var card_last_value = getCardValue(last_cards);
        // switch
    };
    that.compareWithCard = function (last_cards, current_cards) {
        //last_cards[{"cardid":3,"card_data":{"index":3,"value":13,"shape":4}},
        //{"cardid":0,"card_data":{"index":0,"value":13,"shape":1}}]
        console.log("last_cards" + JSON.stringify(last_cards));
        console.log("current_cards" + JSON.stringify(current_cards));
        var card_last_value = getCardValue(last_cards);
        var card_current_value = getCardValue(current_cards);
        //console.log("card_last_value"+JSON.stringify(card_last_value))
        //console.log("card_current_value"+JSON.stringify(card_current_value))
        if (last_cards.value < current_cards.value) {
            console.log("compareWithCard less");
            return true;
        } else if (last_cards.value == current_cards.value) {
            //牌型必须相同
            if (card_last_value.name != card_current_value.name) {
                return '牌型不同';
            }

            var result = compare(last_cards, current_cards, card_last_value);

            return result;
        } else {
            return false;
        }

        return true;
    };

    that.IsCanPushs = function (cardList) {
        if (isOneCard(cardList)) {
            console.log("isOneCard sucess");
            return CardsValue.one;
        }

        if (IsDoubleCard(cardList)) {
            console.log("IsDoubleCard sucess");
            return CardsValue.double;
        }

        if (Isthree(cardList)) {
            console.log("Isthree sucess");
            return CardsValue.three;
        }

        if (IsThreeAndOne(cardList)) {
            console.log("IsThreeAndOne sucess");
            return CardsValue.threeWithOne;
        }

        if (IsThreeAndTwo(cardList)) {
            console.log("IsThreeAndTwo sucess");
            return CardsValue.threeWithTwo;
        }

        if (IsBoom(cardList)) {
            console.log("IsBoom sucess");
            return CardsValue.boom;
        }

        if (IsKingBoom(cardList)) {
            console.log("IsKingBoom sucess");
            return CardsValue.kingboom;
        }

        if (IsPlan(cardList)) {
            console.log("IsPlan sucess");
            return CardsValue.plane;
        }

        if (IsPlanWithSing(cardList)) {
            console.log("IsPlanWithSing sucess");
            return CardsValue.planeWithOne;
        }

        if (IsPlanWithDouble(cardList)) {
            console.log("IsPlanWithDouble sucess");
            return CardsValue.planeWithTwo;
        }

        if (IsShunzi(cardList)) {
            console.log("IsShunzi sucess");
            return CardsValue.scroll;
        }

        if (IsLianDui(cardList)) {
            console.log("IsLianDui sucess");
            return CardsValue.DoubleScroll;
        }
        //return false
        return undefined;
    };

    var getCardValue = that.IsCanPushs;
    return that;
};
exports.default = carder;
// module.exports = function(){


//     return that
// }

module.exports = exports["default"];

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
        //# sourceMappingURL=carder.js.map
        