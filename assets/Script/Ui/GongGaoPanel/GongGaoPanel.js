

cc.Class({
    extends: cc.Component,

    properties: {
        label_content:cc.Label,
        container:cc.Node,
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
                    this.label_content._forceUpdateRenderData(true); // 这里调用一次手动渲染
                    this.container.height = this.label_content.node.getContentSize().height + 5; // 修改尺寸
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    }
    // update (dt) {},
});
