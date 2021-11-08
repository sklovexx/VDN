"use strict";
cc._RF.push(module, 'ee9afyHSeJGaahOsOe7M5FZ', 'GameProtocols');
// NiuNiu/script/net/socket/GameProtocols.js

/**
 * Created by skyxu on 2018/10/9.
 */

"use strict";

/**
 * 消息基类对象，请求消息BaseRequest， 回调消息BaseResponse都继承BaseProtocol
 */

var BaseProtocol = cc.Class({
    ctor: function ctor() {
        /**
         * 请求动作类型
         */
        this.act = '';

        /**
         * 每个请求的sequence_id应该唯一
         */
        this.seq = 0;

        /**
         * 错误代码，0为正常
         */
        this.err = 0;

        /**
         * 错误信息
         * @type {string}
         */
        this.msg = "";

        /**
         * 是否需要等待服务器回调
         */
        this.is_async = false;
    }
});

/**
 * 请求消息基类，客户端的请求都继承这个类
 */
var BaseRequest = cc.Class({
    extends: BaseProtocol
});

/**
 * 服务器返回的消息对应的对象，包含返回数据，一般和BaseRequest成对使用
 * @class BaseResponse
 * @extends BaseProtocol
 */
var BaseResponse = cc.Class({
    extends: BaseProtocol,

    /**
     * 读取返回数据，设置BaseResponse对象
     */
    loadData: function loadData(data) {
        var key;
        for (key in data) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] !== undefined && data[key] !== null) {
                this[key] = data[key];
            }
        }
    }
});

//-------------------------------------------------------
var HeartRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = 'heart';
        this.t = 0; // 发送时间
    }
});

var HeartResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'heart';
        this.t = 0;
    }
});

var CreateRoomRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "createRoom";
        this.uid = 0;
    }
});

var CreateRoomResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "createRoom";
        this.rid = 0;
        this.user = null;
    }
});
//-------------------------------------------------------
var QuitRoomRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "quitRoom";
    }
});
//-------------------------------------------------------
var EnterRoomRequest = cc.Class({
    extends: CreateRoomResponse,
    ctor: function ctor() {
        this.act = "enterRoom";
    }
});
var EnterRoomResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.rid = 0;
        this.users = null;
    }
});
var PushEnterRoom = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.user = null;
    }
});

//-------------------------------------------------------
var countRewardResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.countReward = [];
    }
});
//-------------------------------------------------------
var ConfigRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "config";
    }
});
var ConfigResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.config = [];
    }
});

//-------------------------------------------------------
var StartGameRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "startGame";
        this.uid = "";
    }
});
var StartGameResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "startGame";
    }
});
//-------------------------------------------------------
var ReadyRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "gameReady";
    }
});
var ReadyResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "gameReady";
    }
});
var OtherReadyResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "otherReady";
        this.user = null;
    }
});
//-------------------------------------------------------
var KickRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "kick";
        this.uid = 0;
        this.bet = 0;
    }
});
//-------------------------------------------------------
var BetRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "payBet";
        this.uid = 0;
        this.bet = 0;
    }
});
//-------------------------------------------------------
var ChatRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = 'chat';
        this.msg = '';
        this.uid = '';
    }
});

var PushChat = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = 'chat';
        this.msg = '';
        this.uid = '';
    }
});

var PushDeal = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = 'pDeal';
        this.cards = [];
    }
});

var PushBet = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = 'pBet';
        this.bet = 0;
        this.uid = 0;
    }
});

var PushStartBet = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "pStartBet";
        this.expired = 0;
    }
});

var PushShowCards = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "pShowCards";
        this.users = [];
    }
});

//-------------------------------------------------------
var LoginRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'login';

        /**
         * facebook用户的accessToken，或游客的UUID
         */
        this.token = '';

        /**
         * token来源，默认0:游客，1:facebook
         */
        this.origin = 0;

        /**
         * 平台: 必须为以下几种之一：android/ios/winphone/pc
         */
        this.os = '';

        /**
         * 平台系统版本
         */
        this.osVersion = '';

        /**
         * 设备产品型号, 示例 iPhone8,2, SM-G 9280
         */
        this.deviceModel = '';

        /**
         * 渠道ID
         */
        this.channelId = 0;

        /**
         * Ios设备广告标示符
         */
        this.idfa = '';

        /**
         * 安卓设备id
         */
        this.androidId = '';

        /**
         * Google广告平台账号，安装了google play的设备可取到
         */
        this.googleAid = '';

        /**
         * 应用版本号
         */
        this.appVersion = '';

        /**
         * 取package name或者bundle id
         */
        this.packName = '';

        /**
         * 设备语言
         * @type {string}
         */
        this.language = '';

        this.locale = "";

        this.uid = 0;
    }
});

var LoginResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'login';
        this.uid = 0;
        this.bid = 0;
        this.coins = 0;
        this.nickname = "";
        this.avatar = "";
    }
});
//-------------------------------------------------------
var LogoutRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'logout';
    }
});

var LogoutResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'logout';
    }
});
//-------------------------------------------------------
/**
 * 绑定fb账号
 * @extends BaseRequest
 */
var BindFacebookRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'bindFb';

        /**
         * facebook用户的accessToken，或游客的UUID
         */
        this.token = '';
    }
});
/**
 * 绑定fb账号
 * @extends BaseResponse
 */
var BindFacebookResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'bindFb';

        /**
         * fb数据
         */
        this.me = 0;

        /**
         * fb好友
         */
        this.friends = 0;
    }
});
//-------------------------------------------------------
/**
 * 获取排名
 * @extends BaseRequest
 */
var RankRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'rankboard';

        /**
         * 请求动作类型{ 0全部，1本地，2好友 }
         * @type {int}
         */
        this.type = 0;
    }
});
/**
 * 获取排名
 * @extends BaseResponse
 */
var RankResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'rankboard';

        /**
         *  我的排名
         */
        this.myRank = 0;

        /**
         * 排名玩家数据
         */
        this.men = [];
    }
});

//----------------------only push------------------------
var PushExitRoom = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {

        this.act = 'exitRoom';

        this.user = null;
    }
});
//----------------------only push------------------------
var ChangeBanker = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {

        this.act = 'changeBanker';

        this.uid = 0;
    }
});

//-------------------------------------------------------
/**
 * debug回调
 * @extends BaseRequest
 */
var DebugChangeMeRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {

        this.act = "cmdTest"; //请求动作类型
        this.cmd = "";
        //  "player coins add 100", cmd格式：player field value 或者 player field add value
        //  Building field [add] value where playerId value type value
    }

});
/**
 * debug回调
 * @extends BaseResponse
 */
var DebugChangeMeResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = "cmdTest";

        /**
         * 玩家数据
         * @type {Object}
         */
        this.me = {};

        /**
         * 体力恢复周期
         * @type {Number}
         */
        this.spInterval = null;

        /**
         * 体力恢复剩余时间
         * @type {Number}
         */
        this.spStepLeftTime = null;

        /**
         * 存钱罐速度
         * @type {Number}
         */
        this.farmDailyOut = null;

        /**
         * 存钱罐可回收金币
         * @type {Number}
         */
        this.farmCoins = null;

        /**
         * 存钱罐回收周期
         * @type {Number}
         */
        this.farmInterval = null;

        /**
         * 岛屿建筑数据
         * @type {Array}
         */
        this.buildings = null;
    }
});

var response_classes = {
    login: LoginResponse,
    logout: LogoutResponse,
    bindFb: BindFacebookResponse,
    heart: HeartResponse,
    createRoom: CreateRoomResponse,
    enterRoom: EnterRoomResponse,
    gameReady: ReadyResponse,
    otherReady: OtherReadyResponse,
    payBet: BetRequest,
    countReward: countRewardResponse,
    config: ConfigResponse,
    startGame: StartGameResponse,
    //push
    pEnterRoom: PushEnterRoom,
    pExitRoom: PushExitRoom,
    changeBanker: ChangeBanker,
    pDeal: PushDeal,
    pBet: PushBet,
    pStartBet: PushStartBet,
    pShowCards: PushShowCards,
    chat: PushChat,

    // debug
    cmdTest: DebugChangeMeResponse
};

module.exports = {
    LoginRequest: LoginRequest,
    LoginResponse: LoginResponse,
    LogoutRequest: LogoutRequest,
    LogoutResponse: LogoutResponse,
    BindFacebookRequest: BindFacebookRequest,
    BindFacebookResponse: BindFacebookResponse,
    RankRequest: RankRequest,
    RankResponse: RankResponse,
    HeartRequest: HeartRequest,
    HeartResponse: HeartResponse,
    ChatRequest: ChatRequest,
    CreateRoomRequest: CreateRoomRequest,
    CreateRoomResponse: CreateRoomResponse,
    EnterRoomRequest: EnterRoomRequest,
    QuitRoomRequest: QuitRoomRequest,
    EnterRoomResponse: EnterRoomResponse,
    StartGameRequest: StartGameRequest,
    StartGameResponse: StartGameResponse,
    ConfigRequest: ConfigRequest,
    ReadyRequest: ReadyRequest,
    ReadyResponse: ReadyResponse,
    OtherReadyResponse: OtherReadyResponse,
    KickRequest: KickRequest,
    BetRequest: BetRequest,

    // debug
    DebugChangeMeRequest: DebugChangeMeRequest,
    DebugChangeMeResponse: DebugChangeMeResponse,
    countRewardResponse: countRewardResponse,
    ConfigResponse: ConfigResponse,
    //push消息
    PushEnterRoom: PushEnterRoom,
    PushExitRoom: PushExitRoom,
    PushDeal: PushDeal,
    PushChat: PushChat,
    PushBet: PushBet,
    PushStartBet: PushStartBet,
    PushShowCards: PushShowCards,

    response_classes: response_classes
};

cc._RF.pop();