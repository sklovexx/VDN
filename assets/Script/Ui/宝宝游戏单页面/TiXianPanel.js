
let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        label_Usdt:cc.Label,
        label_daojishi:cc.Label,
        editBox_dizhi:cc.EditBox,
        editBox_sum:cc.EditBox,
        editBox_code:cc.EditBox,
        toggle: cc.Toggle,
        btn_code:cc.Node,
    },
    // onLoad () {},
    onEnable(){
        this.editBox_dizhi.string = "";//地址
        this.editBox_sum.string = "";//数量
        this.editBox_code.string = "";
        this.label_daojishi.string = "";
        this.btn_code.active = true;
        let reqData = {};
        app.Post('member/getMemberInfo',reqData,(res)=>{
            if(res.code==200){
                if(res.data){
                    this.label_Usdt.string = cc.js.formatStr("%s",parseFloat(res.data.totalUsdt).toFixed(4));
                    this.username = res.data.username;
                }
            }
        });
        this.toggle.isChecked = true;
        this.typeid = 1;
        this.timeSum = 0;
        this._time = -1;
    },
    start () {

    },

    //提现
    onClickWithdrawal()
    {
        if(this.editBox_dizhi.string == "")
        {
            Global.PageMgr.showTipPage("请输入地址"); 
            return;
        }else if(this.editBox_sum.string == "")
        {
            Global.PageMgr.showTipPage("请输入数量"); 
            return;
        }else if(this.editBox_code.string == "")
        {
            Global.PageMgr.showTipPage("请输入验证码"); 
            return;
        }else if(parseFloat(this.editBox_sum.string) > parseFloat(this.label_Usdt.string))
        {
            Global.PageMgr.showTipPage("可用额度不够"); 
            return;
        }else if(this.typeid < 0)
        {
            Global.PageMgr.showTipPage("请选择提币类型"); 
            return;
        }
        let reqData = {
            address:this.editBox_dizhi.string,//地址
            number:this.editBox_sum.string,//数量
            type:this.typeid,//类型: 0->bep20 USDT; 1->TRC20 USDT;
            code:this.editBox_code.string,
        }

        Global.ProtocolMgr.queryWithdrawApply(reqData,(res)=>{
            if(res.code==200){
                Global.PageMgr.onClosePage(12);
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    //提现列表
    onClickWithdrawalList()
    {
        Global.PageMgr.onOpenPage(27);
    },
    //选择货币类型
    ToggleEvent( toggleSelf, customEventData )
    { 
        this.typeid = customEventData;
    },
    
    //粘贴
    onClickcopyTextToClip()
    {
        jsb.copyTextToClipboard
    },
    
    //获取验证码
    GetVerificationCode()
    {
        if(this._time > 0)
        {
            Global.PageMgr.showTipPage("请稍后再试"); 
            return;
        }
        let reqData = {
            account:this.username,
            verifyType:1,
        };
        
        Global.ProtocolMgr.queryGetAuthCode(reqData,(res)=>{
            if(res.code==200){
                this._time = 120;
                this.label_daojishi.string = cc.js.formatStr("倒计时:%s",this._time);
                this.btn_code.active = false;
                Global.PageMgr.showTipPage("已发送验证码到注册账号邮箱!");
            }
            else
            {
                Global.PageMgr.showTipPage(res.message);
            }
        });
        
    },
    update (dt) {
        if(this._time > 0)
        {
            this.timeSum += dt;
            if(this.timeSum >= 1)
            {
                this._time -= 1;
                this.timeSum = 0;
                this.label_daojishi.string = cc.js.formatStr("倒计时:%s",this._time);
            }
        }else if(this._time == 0)
        {
            this.btn_code.active = true;
            this.label_daojishi.string ="";
            this._time = -1;
        }

    },
});
