import chapterRes from "./chapterRes"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    chapterRes: cc.Prefab = null;
    @property(cc.Node)
    resourceRoot: cc.Node = null;
    @property(cc.Node)
    addNode: Array<cc.Node> = [];
    @property(cc.Label)
    enemyInfo: cc.Label = null;
    @property(cc.EditBox)
    wave: cc.EditBox = null;
    @property(cc.EditBox)
    enemy: cc.EditBox = null;
    @property(cc.EditBox)
    wave_cd: cc.EditBox = null;
    @property(cc.EditBox)
    resourceType: cc.EditBox = null;
    @property(cc.EditBox)
    resourceImg: cc.EditBox = null;
    @property(cc.EditBox)
    resourceNumber: cc.EditBox = null;
    @property(cc.EditBox)
    mapImg: cc.EditBox = null;
    @property(cc.EditBox)
    level_id: cc.EditBox = null;
    @property(cc.EditBox)
    level_name: cc.EditBox = null;
    @property(cc.EditBox)
    ready_time: cc.EditBox = null;
    @property(cc.EditBox)
    refresh: cc.EditBox = null;
    @property(cc.Sprite)
    map: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    enemyWaves: Array<any> = [];
    start () {
    }
    showUI(event, customEventData){
        console.log(customEventData);
        this.addNode.forEach(e =>{
            e.active = false;
        })
        this.addNode[customEventData].active = true
    }
    closeUI(event, customEventData){
        this.addNode.forEach(e =>{
            e.active = false;
        })
    }
    updateMapBg(){
        cc.loader.loadRes('game/img/'+this.mapImg.string, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            cc.log('Result should be a sprite frame: ' + (spriteFrame instanceof cc.SpriteFrame));
            this.map.spriteFrame = spriteFrame;
        });
    }
    addEnemyWave(){
        let obj = {
            wave:this.wave.string,
            enemy:this.enemy.string,
            wave_cd:this.wave_cd.string
        }
        this.enemyWaves[parseInt(obj.wave)-1] = obj;
        this.wave.string = "";
        this.enemy.string = "";
        this.wave_cd.string = "";
        this.updateEnemyInfo();
    }
    addResource(){
        let obj = {
            resourceType:this.resourceType.string,
            resourceImg:this.resourceImg.string,
            resourceNumber:this.resourceNumber.string
        }
        let resourceNode = cc.instantiate(this.chapterRes);
        resourceNode.getComponent(chapterRes).setResourceData(obj);
        this.resourceRoot.addChild(resourceNode);
        this.resourceType.string = "";
        this.resourceImg.string = "";
        this.resourceNumber.string = "";
    }
    updateEnemyInfo(){
        let str = '';
        this.enemyWaves.forEach(e=>{
            let strWave = cc.js.formatStr("第%s波: 怪物信息:'%s',波数刷新时间:%s\n",e.wave,e.enemy,e.wave_cd);
            str += strWave;
        })
        this.enemyInfo.string = str;
    }
    createCheckpoint(){
        let checkpoint = {};
        let checkpointArr = []
        let level_id = this.level_id.string;
        let enemy = [];
        let wave_cd = [];
        let resource_node = [];
        this.resourceRoot.children.forEach((e)=>{
            let script = e.getComponent(chapterRes);
            let obj = {
                x:e.x,
                y:e.y,
                resourceType:script.resourceType,
                img:script.resourceImg,
                resourceNumber:script.resourceNumber
            };
            resource_node.push(obj);
        })
        this.enemyWaves.forEach(e=>{
            enemy.push(e.enemy);
            wave_cd.push(e.wave_cd);
        })
        this.enemyWaves.forEach(e=>{
            let obj = {
                level_id:parseInt(level_id),
                enemy,
                resource_node,
                obstable:[],
                refresh:parseInt(this.refresh.string),
                ready_time:parseInt(this.ready_time.string),
                wave_cd,
                name:this.level_name.string,
                map_bg:this.map.spriteFrame.name
            }
            checkpointArr.push(obj)
        })
        checkpointArr.forEach(e=>{
            checkpoint[e.level_id] = e;
        })
        this.saveJSON(JSON.stringify(checkpoint),"checkpoint.json")
    }
    saveJSON(data, filename){
        if(!data) {
            alert('保存的数据为空');
            return;
        }
        if(!filename) 
            filename = 'json.json'
        if(typeof data === 'object'){
            data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
    // update (dt) {}
}
