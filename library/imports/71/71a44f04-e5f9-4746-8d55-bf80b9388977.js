"use strict";
cc._RF.push(module, '71a448E5flHRo1Vv4C5OIl3', 'GCONFIG');
// NiuNiu/script/common/GCONFIG.js

/**
 * Created by skyxu on 2018/3/13.
 * 游戏中全局固定配置文件
 */

"use strict";

var GCONFIG = GCONFIG || {};

GCONFIG.DEBUG_MODE = false; // 是否debug模式

GCONFIG.ROOM_MULT = 1;

GCONFIG.BETS_WAITING = 10; // 下注等待时间

GCONFIG.GAME_MODE = 3; // 首发3、4、5张牌

GCONFIG.USER_BASE_COINS = 1000;

GCONFIG.BIND_FB_COINS = 200;

GCONFIG.SUBS_REWARD = 2000;

GCONFIG.ONLINE_MODE = true; // 房卡模式
GCONFIG.BET_VALUE = [];
/*******************key start********************/
GCONFIG.KEY_SETTING = "KEY_SETTING";
GCONFIG.KEY_PLAYERDATA = "KEY_PLAYERDATA";
GCONFIG.KEY_IAPDATA = "KEY_IAPDATA";
GCONFIG.KEY_GAME_GUIDE_DATA = "KEY_GAME_GUIDE_DATA";
GCONFIG.KEY_CHEST_DATA = "KEY_CHEST_DATA";
GCONFIG.KEY_ACHIEVE_DATA = "KEY_ACHIEVE_DATA";
/*******************key end**********************/

/*******************event start*******************/
GCONFIG.EVENT_CHANGE_SCENE = "EVENT_CHANGE_SCENE";
GCONFIG.EVENT_USER_COINS_CHANGED = "EVENT_USER_COINS_CHANGED";

GCONFIG.EVENT_NETWORK_OPENED = "GAME_EVENT_NETWORK_OPENED";
GCONFIG.EVENT_NETWORK_CLOSED = "GAME_EVENT_NETWORK_CLOSED";
GCONFIG.EVENT_CHAT = "GAME_EVENT_CHAT";
GCONFIG.EVENT_EXITROOM = "GAME_EVENT_EXITROOM";
GCONFIG.EVENT_LOGIN_SUC = "GAME_EVENT_LOGIN_SUC";
GCONFIG.EVENT_LOGIN_FAILED = "GAME_EVENT_LOGIN_FAILED";
GCONFIG.EVENT_PLAYCHESS = "GAME_EVENT_PLAYCHESS";

GCONFIG.EVENT_START_GAME = "EVENT_START_GAME"; // 开始游戏
GCONFIG.EVENT_OPEN_ROOM = "EVENT_OPEN_ROOM";
GCONFIG.EVENT_ENTER_ROOM = "EVENT_ENTER_ROOM";

/*******************event end*********************/

/****************siblingIndex start*****************/
GCONFIG.SIBLING_INDEX_MAX = 100;
GCONFIG.LOCAL_ZINDEX_MAX = 100;
/*****************siblingIndex end******************/

/*******************facebook start******************/
//fb id
GCONFIG.FACEBOOK_ID = "123123123123123";
// fb permissions(exclusive "user_friends")
GCONFIG.FACEBOOK_PERMISSIONS = ["public_profile", "email"];
/*******************facebook end********************/

module.exports = GCONFIG;

cc._RF.pop();