
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    resourceType: number = 0;
    resourceNumber:number;
    resourceImg:string = '';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.Touch, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.Touch, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.Touch, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.Touch, this);
    }
    private Touch(evt: cc.Event.EventTouch) {
        let pos = evt.getLocation();
        pos.x -= 540;
        pos.y -= 960 + this.node.height;
        this.node.setPosition(pos);
    }
    start () {

    }
    onEnable(){
        cc.loader.loadRes('game/img/'+this.resourceImg, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            cc.log('Result should be a sprite frame: ' + (spriteFrame instanceof cc.SpriteFrame));
            console.log(this.node)
            this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
    setResourceData(data:any){
        this.resourceType = data.resourceType;
        this.resourceImg = data.resourceImg;
        this.resourceNumber = data.resourceNumber;
    }
    // update (dt) {}
}
