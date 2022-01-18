

cc.Class({
    extends: cc.Component,

    properties: {
        emailItem:cc.Prefab,
        container_email:cc.Node
    },
    start () {

    },
    onEnable(){
        Global.ProtocolMgr.queryGetMessage((res)=>{
            if(res.code==200){
                let data = res.data
                this.container_email.removeAllChildren();
                for(let i = 0;i<data.length;i++){
                    let emailItem = cc.instantiate(this.emailItem);
                    emailItem.getComponent("emailItem").setData(data[i],2)
                    emailItem.on(cc.Node.EventType.TOUCH_END,()=>{
                        Global.PageMgr.onOpenPage(20);
                        Global.PageMgr.pages[20].getComponent("EmailDetailPanel").setData(data[i],2);
                        // if(data[i].state==0){
                        //     Global.ProtocolMgr.readEmail(data[i].id,(res2)=>{
                        //         if(res2.code==200){
                        //             console.log(res2);
                        //         }else{
                        //             Global.PageMgr.showTipPage(res2.message); 
                        //         }
                        //     })
                        // }
                    })
                    this.container_email.addChild(emailItem);
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    }
});
