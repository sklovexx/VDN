cc.Class({
    extends: cc.Component,

    properties: {
        incomeDetailsItem:cc.Prefab,
        container_incomeDetails:cc.Node,
        pageSum:1,
        pageSum2:1,
    },

    onEnable(){
        this.pageSum = 1;
        this.upDataAccountDetail();
    },

    upDataAccountDetail()
    {
        Global.ProtocolMgr.queryGetWithdrawApplyDetail(10,this.pageSum,(res)=>{
            if(res.code==200){
                if(res.data)
                {
                    let data = res.data;
                    if(data.length == 0)
                    {
                        if(this.pageSum != 1)
                        {
                            Global.PageMgr.showTipPage("已经是最后页了"); 
                        }
                        this.pageSum = this.pageSum2 + 1;
                        return;
                    }
                    this.pageSum2 = this.pageSum;
                    if(this.pageSum != 1)
                    {
                        Global.PageMgr.showTipPage("刷新成功！"); 
                    }
                    this.container_incomeDetails.removeAllChildren();
                    for(let i = 0;i<data.length;i++){
                        let incomeDetailsItem = cc.instantiate(this.incomeDetailsItem);
                        incomeDetailsItem.getComponent("WithdrawalList_Item").setData(data[i])
                        this.container_incomeDetails.addChild(incomeDetailsItem);
                    }
                }
            }else{
                Global.PageMgr.showTipPage(res.message);
            }
        })
    },
    onClickDown()
    {
        if(this.pageSum > 2)
        {
            this.pageSum -=1;
        }
        else
        {
            this.pageSum = 1;
            Global.PageMgr.showTipPage("已经是首页了"); 
        }
        this.upDataAccountDetail();
    },
    onClickUp()
    {
        this.pageSum +=1;
        this.upDataAccountDetail();
    },

    // update (dt) {},
});
