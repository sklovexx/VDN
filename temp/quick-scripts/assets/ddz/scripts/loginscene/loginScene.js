(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/ddz/scripts/loginscene/loginScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b05a68gSOpBWr8ddvT03Jpj', 'loginScene', __filename);
// ddz/scripts/loginscene/loginScene.js

'use strict';

var _mygolbal = require('../mygolbal.js');

var _mygolbal2 = _interopRequireDefault(_mygolbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        wait_node: cc.Node,
        tipsLabel: cc.Label, //tips
        loginBg: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        //console.log("qian_state.qian:"+ qian_state.qian)
        if (true) {
            cc.audioEngine.play(this.loginBg, true);
        }
        cc.director.GlobalEvent.on('connected', function () {
            _mygolbal2.default.socket.login({
                token: _this.GetQueryVariable('token')
            }, function (err, result) {
                //请求返回
                //先隐藏等待UI
                //this.wait_node.active = false
                if (err != 0) {
                    console.log("err:" + err);
                    this.tipsLabel.string = result;
                    setTimeout(function () {
                        this.tipsLabel.string = "";
                    }.bind(this), 2000);
                    return;
                }

                console.log("login sucess" + JSON.stringify(result));
                console.log(result);
                _mygolbal2.default.playerData.gobal_count = result.goldCount;
                _mygolbal2.default.playerData.accountID = result.accountID;
                _mygolbal2.default.playerData.avatarUrl = result.avatarUrl;
                _mygolbal2.default.playerData.nickName = result.nickName;
                cc.director.loadScene("hallScene");
            }.bind(_this));
            // myglobal.socket.request_wxLogin({
            //     uniqueID:myglobal.playerData.uniqueID,
            //     accountID:myglobal.playerData.accountID,
            //     nickName:myglobal.playerData.nickName,
            //     avatarUrl:myglobal.playerData.avatarUrl,
            // },function(err,result){
            //     //请求返回
            //     //先隐藏等待UI
            //     //this.wait_node.active = false
            //     if(err!=0){
            //        console.log("err:"+err)
            //        return     
            //     }

            //     console.log("login sucess" + JSON.stringify(result))
            //     myglobal.playerData.gobal_count = result.goldcount
            //     cc.director.loadScene("hallScene")
            // }.bind(this))
        }, this);
        _mygolbal2.default.socket.initSocket();
    },
    start: function start() {},
    onButtonCilck: function onButtonCilck(event, customData) {
        switch (customData) {
            case "wx_login":
                console.log("wx_login request");

                //this.wait_node.active = true

                // myglobal.socket.login({
                //     token:this.GetQueryVariable('token')
                // },function(err,result){
                //     //请求返回
                //     //先隐藏等待UI
                //     //this.wait_node.active = false
                //     if(err!=0){
                //        console.log("err:"+err)
                //        this.tipsLabel.string=result.data
                //        setTimeout(function(){
                //            this.tipsLabel.string=""
                //        }.bind(this), 2000);
                //        return     
                //     }

                //     console.log("login sucess" + JSON.stringify(result))
                //     myglobal.playerData.gobal_count = result.goldcount
                //     cc.director.loadScene("hallScene")
                // }.bind(this))
                break;
            default:
                break;
        }
    },

    GetQueryVariable: function GetQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
    // update (dt) {},


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
        //# sourceMappingURL=loginScene.js.map
        