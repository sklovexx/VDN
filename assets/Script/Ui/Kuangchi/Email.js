
cc.Class({
    extends: cc.Component,

    properties: {
        EmailItem:cc.Prefab,
        Content:cc.Node,
        EmailContent:cc.Node,
        load:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.GlobalEvent.on("EmailData",this.onEmailUpdate,this)

    },

    start () {

    },
    onEnable(){
        Global.ProtocolMgr.queryEmail(1)
    },
    onEmailUpdate(){
        this.load.active = false;
        let children = this.Content.children;
        children.forEach(node=>{
            node.destroy()
        })
        for(let i = 0;i<GameData.EmailData.length;i++){
            let node = cc.instantiate(this.EmailItem);
            node.parent = this.Content;
            node.getChildByName('Title').getComponent(cc.Label).string = GameData.EmailData[i].title;
            node.getChildByName('Time').getComponent(cc.Label).string = this.getMyDate(GameData.EmailData[i].createTime);
            node.getChildByName('Tag').getComponent(cc.Label).string = eval(GameData.EmailData[i].isRead) == false ? '未读' : '已读';
            node.on(cc.Node.EventType.TOUCH_END,()=>{
                this.showEmailContent(i)
                Global.ProtocolMgr.readEmail(GameData.EmailData[i].id)
            },this)
        }
    },
    onScrolling(event){
        let tag = event.content.y%1260
        //GameData.ClickState用于阻止事件多次调用
        if(tag==0&&(event.content.y/1260)!=0&&GameData.ClickState){
            this.load.active = true;
            GameData.ClickState = 0
            Global.ProtocolMgr.queryEmail(event.content.y/1260+1)
        }
    },
    showEmailContent(i){
        this.EmailContent.active = true;
        this.EmailContent.getChildByName('Title').getComponent(cc.Label).string = GameData.EmailData[i].title;
        this.EmailContent.getChildByName('Time').getComponent(cc.Label).string = this.getMyDate(GameData.EmailData[i].createTime);
        this.EmailContent.getChildByName('New ScrollView').getChildByName('view').getChildByName('Content').getComponent(cc.Label).string = GameData.EmailData[i].content;
    },
    closeEmailContent(){
        this.EmailContent.active = false;
        this.EmailContent.getChildByName('Title').getComponent(cc.Label).string = '';
        this.EmailContent.getChildByName('Time').getComponent(cc.Label).string = '';
        this.EmailContent.getChildByName('New ScrollView').getChildByName('view').getChildByName('Content').getComponent(cc.Label).string = '';
    },
    getMyDate(str) {
        let oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ this.addZero(oMonth) +'-'+ this.addZero(oDay) +' '+ this.addZero(oHour) +':'+
                this.addZero(oMin) +':'+this.addZero(oSen);
        return oTime;
    },

//补零操作
    addZero(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
    },
    onDestroy(){
        cc.director.GlobalEvent.off("EmailData")
    },
    // update (dt) {},
});
