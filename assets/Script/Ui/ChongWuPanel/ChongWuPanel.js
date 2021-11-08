let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        label_id:cc.Label,
        label_zhanli:cc.Label,
        label_tili:cc.Label,
        label_zili:cc.Label,
        label_xingzuan:cc.Label,
        label_lv:cc.Label,
        icon_pic:cc.Sprite,
        label_Usdt:cc.Label,
    },

    onLoad () {
        
    },

    start () {
        
    },
    onEnable(){
        this.showData();
    },

    showData()
    {
        let reqData = {};
        app.Post('member/getMemberInfo',reqData,(res)=>{
            if(res.code==200){
                if(res.data)
                {
                    this.label_id.string = res.data.username;
                    this.label_lv.string = res.data.grade+"级";
                    this.label_Usdt.string = res.data.totalUsdt;
                }
            }
        })

        Global.ProtocolMgr.queryKnapsackpetAnimalList(100,1,(res)=>{
            if(res.code==200){
                let data = res.data;
                if(data)
                {
                    this.label_zhanli.string = parseFloat(data[0].combat_value).toFixed(4);
                    this.label_tili.string = parseFloat(data[0].spirit_value).toFixed(4);
                    this.label_zili.string = parseFloat(data[0].intellect_value).toFixed(4);
                    cc.loader.load({url:data[0].icon,type:'png'},(err,res)=>{
                        this.icon_pic.spriteFrame = new cc.SpriteFrame(res)
                    })
                }
            }
        });
    },
    //收益明细
    onClickIncomeDetails()
    {
        Global.PageMgr.onOpenPage(22);
    },
    // update (dt) {},
});
