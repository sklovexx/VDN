(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Global/GameData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f6c0hQACFPkK5cop45cenm', 'GameData', __filename);
// Script/Global/GameData.js

"use strict";

window.GameData = {
    curLanguage: 'zh',
    token: "",
    audio: false,
    ClickState: 1,
    UserData: [],
    EmailData: [],
    HaveEmailPage: [],
    HongBaoUserData: {},
    HongBaoPlayerList: [],
    HongBaoList: [],
    HongBaoSurplus: 0,
    CurHongBao: {},
    CurHongBaoCount: 0,
    HongBaoJieGuo: 0,
    CountDown: 0,
    CountDownAll: 0,
    KaiJiangList: [],
    FriendNongChangUserData: [],
    ZhongZiData: [],
    GuoShiData: [],
    ShangChengData: [],
    ZhongZhiReady: { pos: null },
    FriendData: [],
    RacingTimer: null,
    RacingGameState: 0, //赛车游戏状态0:倒计时阶段,1:进行中,2:已结束
    KuangJiData: [],
    SlotUserData: null
};

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
        //# sourceMappingURL=GameData.js.map
        