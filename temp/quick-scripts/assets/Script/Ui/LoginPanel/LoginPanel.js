(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/LoginPanel/LoginPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e904gS4ftLr7UWWl4gQQBq', 'LoginPanel', __filename);
// Script/Ui/LoginPanel/LoginPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        btn_login: cc.Node,
        btn_register: cc.Node,
        btn_go_login: cc.Node,
        btn_go_register: cc.Node,
        editBox_zhujici: [cc.EditBox],
        editBox_password: cc.EditBox,
        editBox_inviteCode: cc.EditBox,
        PanleLogin: cc.Node,
        Panle2: cc.Node,
        PanleForgetPassword: cc.Node,
        editBox_RegisterPassword: cc.EditBox,
        editBox_RegisterPassword2: cc.EditBox,
        editBox_RegisterinviteCode: cc.EditBox,
        editBox_InviteCodeEditBox: cc.EditBox,

        editBox_RegisterPassword3: cc.EditBox,
        editBox_RegisterPassword4: cc.EditBox,
        editBox_VerificationCode: cc.EditBox,
        editBox_mail: cc.EditBox,
        Register_btn_determine: cc.Node,
        Register_btn_ObtainingVerificationCode: cc.Node,

        Register_btn_register: cc.Node,
        Register_btn_break: cc.Node,
        _time: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    onEnable: function onEnable() {
        this.editBox_password.string = "";
        this.editBox_inviteCode.string = "";
        var token = cc.sys.localStorage.getItem("com.game.vdn.token");
        // console.log(token)
        if (token && token != "") {
            GameData.token = token;
            Global.ResourceMgr.playBgAudio();
            Global.PageMgr.onClosePage(0);
            Global.ProtocolMgr.queryGonggao(function (res2) {
                if (res2.code == 200) {
                    cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = res2.data.title;
                } else {
                    Global.PageMgr.showTipPage(res2.message);
                }
            });
            return;
        }
        GameData.audio = true;
        Global.ResourceMgr.playLoginAudio();
        this.goLogin();
    },
    start: function start() {},
    goLogin: function goLogin() {
        // this.btn_login.active = true;
        // this.btn_go_login.active = false;
        // this.btn_go_register.active = true;
        // this.btn_register.active = false;
        this.PanleLogin.active = true;
        this.Panle2.active = false;
        this.PanleForgetPassword.active = false;
        // this.editBox_inviteCode.node.active = false;
        var zhujici = void 0;
        // let zhujici = "bitter,undo,later,custom,unfold,owner,bargain,electric,rigid,ginger,range,cupboard"
        for (var i = 0; i < this.editBox_zhujici.length; i++) {
            this.editBox_zhujici[i].enabled = true;
            this.editBox_zhujici[i].string = "";
        }
        if (zhujici) {
            var zhujiciArr = zhujici.split(",");
            for (var _i = 0; _i < this.editBox_zhujici.length; _i++) {
                this.editBox_zhujici[_i].string = zhujiciArr[_i];
            }
        }
    },

    //登录
    login: function login() {
        var _this = this;

        if (this.editBox_password.string != "" && this.editBox_inviteCode.string != "") {
            var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!myreg.test(this.editBox_inviteCode.string)) {
                Global.PageMgr.showTipPage("请输入正确的邮箱");
            } else {
                var zhujici = this.getZhujici();
                var reqData = {
                    account: this.editBox_inviteCode.string,
                    password: this.editBox_password.string
                };
                Global.ProtocolMgr.login(reqData, function (res) {
                    if (res.code != 3001) {
                        GameData.token = res.data.tokenHead + " " + res.data.token;
                        cc.sys.localStorage.setItem("com.game.vdn.token", GameData.token);
                        Global.PageMgr.showTipPage(res.message);
                        Global.ResourceMgr.playBgAudio();
                        Global.PageMgr.onClosePage(0);
                        // Global.ProtocolMgr.queryGonggao((res2)=>{
                        //     if(res2.code != 3001){
                        //         console.log(cc.find("Canvas/Main/view/mask/label_gonggao"),res2.data.title)
                        //         cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = res2.data.title;
                        //     }else{
                        //         Global.PageMgr.showTipPage(res2.message);
                        //     }
                        // })
                        // console.log(cc.find("Canvas/Main/view/mask/label_gonggao"),res2.data.title)
                        if (cc.find("Canvas/Main/view/mask/label_gonggao") != null) {
                            cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = res2.data.title;
                        }
                        _this.editBox_password.string = "";
                        _this.editBox_inviteCode.string = "";
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
            }
        } else {
            if (this.editBox_inviteCode.string == "") {
                Global.PageMgr.showTipPage("邮箱为空");
            } else if (this.editBox_password.string == "") {
                Global.PageMgr.showTipPage("密码为空");
            }
        }
    },


    //忘记密码
    forgotPassword: function forgotPassword() {
        this.PanleLogin.active = false;
        this.Panle2.active = false;
        this.PanleForgetPassword.active = true;
    },


    //点击登录界面注册按钮
    goRegister: function goRegister() {
        this.PanleLogin.active = false;
        this.Panle2.active = true;
        this.PanleForgetPassword.active = false;
        this.editBox_password.string = "";
        this.editBox_inviteCode.string = "";

        // Global.ProtocolMgr.queryZhujici((res)=>{
        //     if(res.code==200){
        //         let zhujiciArr = res.data.mnemonic.split(",");
        //         this.btn_login.active = false;
        //         this.btn_go_login.active = true;
        //         this.btn_go_register.active = false;
        //         this.btn_register.active = true;
        //         this.editBox_inviteCode.node.active = true;
        //         for(let i = 0;i<this.editBox_zhujici.length;i++){
        //             this.editBox_zhujici[i].string = zhujiciArr[i];
        //             this.editBox_zhujici[i].enabled = false;
        //         }
        //     }else{
        //         Global.PageMgr.showTipPage(res.message);
        //     }
        // });
    },


    //点击注册界面注册按钮
    register: function register() {
        var _this2 = this;

        if (this.editBox_RegisterPassword.string != "" && this.editBox_RegisterPassword2.string != "" && this.editBox_RegisterinviteCode.string != "") {
            if (this.editBox_RegisterPassword2.string == this.editBox_RegisterPassword.string) {
                var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!myreg.test(this.editBox_RegisterinviteCode.string)) {
                    Global.PageMgr.showTipPage("请输入正确的邮箱");
                } else {
                    var reqData = void 0;
                    if (this.editBox_InviteCodeEditBox.string != "") {
                        reqData = {
                            account: this.editBox_RegisterinviteCode.string,
                            payPassword: this.editBox_RegisterPassword.string,
                            channelCode: this.editBox_InviteCodeEditBox.string
                        };
                    } else {
                        reqData = {
                            account: this.editBox_RegisterinviteCode.string,
                            payPassword: this.editBox_RegisterPassword.string
                        };
                    }

                    Global.ProtocolMgr.register(reqData, function (res) {
                        if (res.code == 200) {
                            // GameData.token = res.data.token;
                            cc.sys.localStorage.setItem("com.game.vdn.token", res.data.token);
                            // Global.PageMgr.showTipPage(res.message);
                            // Global.ResourceMgr.playBgAudio();
                            // Global.PageMgr.onClosePage(0);
                            _this2.editBox_inviteCode.string = _this2.editBox_RegisterinviteCode.string;
                            _this2.editBox_password.string = _this2.editBox_RegisterPassword.string;
                            _this2.login();
                            Global.ProtocolMgr.queryGonggao(function (res2) {
                                if (res2.code == 200) {
                                    console.log(cc.find("Canvas/Main/view/mask/label_gonggao"), res2.data.title);
                                    cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = res2.data.title;
                                    _this2.setRegisterString();
                                } else {
                                    Global.PageMgr.showTipPage(res2.message);
                                }
                            });
                        } else {
                            Global.PageMgr.showTipPage(res.message);
                        }
                    });
                }
            } else {
                Global.PageMgr.showTipPage("密码不一致");
            }
        } else {
            if (this.editBox_RegisterinviteCode.string == "") {
                Global.PageMgr.showTipPage("邮箱为空");
            } else if (this.editBox_RegisterPassword.string == "") {
                Global.PageMgr.showTipPage("密码为空");
            } else if (this.editBox_RegisterPassword2.string == "") {
                Global.PageMgr.showTipPage("确定密码为空");
            }
        }
    },
    getZhujici: function getZhujici() {
        var zhujici = [];
        for (var i = 0; i < this.editBox_zhujici.length; i++) {
            zhujici.push(this.editBox_zhujici[i].string);
        }
        return zhujici.join(",");
    },


    //返回登录
    breakLogin: function breakLogin() {
        this.PanleLogin.active = true;
        this.Panle2.active = false;
        this.PanleForgetPassword.active = false;
        this.setRegisterString();
    },


    //确定修改密码
    onClickSureModify: function onClickSureModify() {
        var _this3 = this;

        if (this.editBox_RegisterPassword3.string != "" && this.editBox_RegisterPassword4.string != "" && this.editBox_VerificationCode.string != "" && this.editBox_mail.string != "") {
            if (this.editBox_RegisterPassword3.string == this.editBox_RegisterPassword4.string) {
                var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!myreg.test(this.editBox_mail.string)) {
                    Global.PageMgr.showTipPage("请输入正确的邮箱");
                } else {
                    var reqData = {
                        account: this.editBox_mail.string,
                        authCode: this.editBox_VerificationCode.string,
                        password: this.editBox_RegisterPassword3.string,
                        rePassword: this.editBox_RegisterPassword4.string
                    };

                    Global.ProtocolMgr.queryForgetPassword(reqData, function (res) {
                        if (res.code == 200) {
                            Global.PageMgr.showTipPage("修改成功");
                            _this3.breakLogin();
                        } else {
                            Global.PageMgr.showTipPage(res.message);
                        }
                    });
                }
            } else {
                Global.PageMgr.showTipPage("密码不一致");
            }
        } else {
            if (this.editBox_mail.string == "") {
                Global.PageMgr.showTipPage("邮箱为空");
            } else if (this.editBox_RegisterPassword3.string == "") {
                Global.PageMgr.showTipPage("密码为空");
            } else if (this.editBox_RegisterPassword4.string == "") {
                Global.PageMgr.showTipPage("确定密码为空");
            } else if (this.editBox_VerificationCode.string == "") {
                Global.PageMgr.showTipPage("验证码为空");
            }
        }
    },


    //获取验证码
    onClickObtainingVerificationCode: function onClickObtainingVerificationCode() {
        if (this._time > 0) {
            Global.PageMgr.showTipPage("请稍后再试");
            return;
        }
        if (this.editBox_mail.string != "") {
            var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!myreg.test(this.editBox_mail.string)) {
                Global.PageMgr.showTipPage("请输入正确的邮箱");
            } else {
                this._time = 30;
                var reqData = {
                    account: this.editBox_mail.string,
                    verifyType: 1
                };

                Global.ProtocolMgr.queryGetAuthCode(reqData, function (res) {
                    if (res.code == 200) {
                        Global.PageMgr.showTipPage("获取成功");
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
            }
        } else {
            Global.PageMgr.showTipPage("邮箱不能为空");
        }
    },


    //设置文本框空值
    setRegisterString: function setRegisterString() {
        this.editBox_RegisterPassword.string = "";
        this.editBox_RegisterPassword2.string = "";
        this.editBox_RegisterinviteCode.string = "";
        this.editBox_InviteCodeEditBox.string = "";

        this.editBox_RegisterPassword3.string = "";
        this.editBox_RegisterPassword4.string = "";
        this.editBox_VerificationCode.string = "";
        this.editBox_mail.string = "";
    },
    update: function update(dt) {
        if (this._time > 0) {
            this._time -= dt;
        }
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
        //# sourceMappingURL=LoginPanel.js.map
        