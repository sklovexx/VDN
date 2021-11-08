

cc.Class({
    extends: cc.Component,

    properties: {
        label_content:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onEnable(){
        Global.ProtocolMgr.queryGonggao((res)=>{
            if(res.code==200){
                if(res.data)
                {
                    this.label_content.string = res.data.content;
                }
                
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    }
    // update (dt) {},
});
