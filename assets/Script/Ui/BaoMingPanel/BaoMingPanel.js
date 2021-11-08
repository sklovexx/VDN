

cc.Class({
    extends: cc.Component,

    properties: {
        label_saiqu:cc.Label,
        // label_zhandui:cc.Label,
        editBox_zhandui:cc.EditBox,
        editBox_name:cc.EditBox,
        editBox_card:cc.EditBox,
        editBox_phone:cc.EditBox,
        editBox_email:cc.EditBox,
        selectItem:cc.Prefab,
        container_saiqu:cc.Node,
        container_zhandui:cc.Node,
        scroll_saiqu:cc.Node,
        Panle:cc.Node,
        Panle2:cc.Node,
        label_email:cc.Label,
        label_name:cc.Label,
        label_zhandui:cc.Label,
        label_saiqu2:cc.Label,
        label_dianhua:cc.Label,
        label_zhengjian:cc.Label,

        scroll_zhandui:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onEnable(){
        this.showApplyForTeamInformation();
    },

    //展示战队信息
    showApplyForTeamInformation()
    {
        this.Panle.active = false;
        this.Panle2.active = true;
        Global.ProtocolMgr.queryGetSignUPInfo((res)=>{
            if(res.code==200){
                let data = res.data
                if(data)
                {
                    this.label_email.string = data.email;
                    this.label_name.string = data.name;
                    this.label_zhandui.string = data.team_name;
                    this.label_saiqu2.string = data.division_name;
                    this.label_zhengjian.string = data.id_card_number;
                    this.label_dianhua.string = data.phone;
                }
            }
            else{
                this.showApplyForTeam();
            }
        })
    },

    //展示申请战队ui
    showApplyForTeam()
    {
        this.Panle.active = true;
        this.Panle2.active = false;
        this.did = 0;
        this.tid = 0;
        this.label_saiqu.string = '-选择赛区';
        this.editBox_name.string = "";
        this.editBox_email.string = "";
        this.editBox_phone.string = "";
        this.editBox_card.string = "";
        this.editBox_zhandui.string = "";
        Global.ProtocolMgr.queryDivisionList((res)=>{
            if(res.code==200){
                let data = res.data
                console.log(data);
                this.container_saiqu.removeAllChildren();
                for(let i = 0;i<data.length;i++){
                    let selectItem = cc.instantiate(this.selectItem);
                    selectItem.getComponent(cc.Label).string = data[i].division_name;
                    selectItem.on(cc.Node.EventType.TOUCH_END,()=>{
                        this.label_saiqu.string = data[i].division_name;
                        this.did = data[i].id;
                        console.log(this.did);
                        this.closeScroll();
                    })
                    this.container_saiqu.addChild(selectItem);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })

    },
    showScroll(event,customData){
        switch (customData) {
            case "saiqu":
                this.scroll_saiqu.active = true;
                break;
            case "zhandui":
                this.scroll_zhandui.active = true;
                break;
            default:
                break;
        }
    },

    closeScroll(){
        this.scroll_saiqu.active = false;
        this.scroll_zhandui.active = false;
    },
    submit(){
        if(this.did==0){
            Global.PageMgr.showTipPage("还未选择赛区");
            return;
        }
        if(this.editBox_zhandui.string==""){
            Global.PageMgr.showTipPage("还未填写战队");
            return;
        }
        if(this.editBox_name.string==""){
            Global.PageMgr.showTipPage("还未填写姓名");
            return;
        }
        if(this.editBox_card.string==""){
            Global.PageMgr.showTipPage("还未填写身份证号");
            return;
        }
        if(this.editBox_phone.string==""){
            Global.PageMgr.showTipPage("还未填写手机号");
            return;
        }
        if(this.editBox_email.string==""){
            Global.PageMgr.showTipPage("还未填写邮箱");
            return;
        }
        let reqData = {
            name:this.editBox_name.string,
            email:this.editBox_email.string,
            phone:this.editBox_phone.string,
            id_card_number:this.editBox_card.string,
            team_name :this.editBox_zhandui.string,
            did:this.did.toString(),
        }
        Global.ProtocolMgr.submitBaoMing(reqData,(res)=>{
            console.log(res)
            if(res.code==200){
                Global.PageMgr.showTipPage("报名成功");
                Global.PageMgr.onClosePage(17);
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    }
    // update (dt) {},
});
