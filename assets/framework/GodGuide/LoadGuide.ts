import { dataManager } from "../../script/Manager/dataManager";
import { EventMgr } from "../common/EventManager";
import GodGuide from "./GodGuide";
let async = require('async');

// cc.Class({
//     extends: cc.Component,
//     properties: {
//         PREFAB: cc.Prefab, //预制件
//         parent: cc.Node,   //预制件实例化后所在的父节点
//         zIndex: 0,
//         tasks: [cc.String],
//     },

//     onLoad() {
//         if (!CC_EDITOR) {
//             this.loadPrefab();
//         }
//     },

//     start() {
//         this.runTask();
//     },

//     loadPrefab() {
//         try {
//             let node = cc.instantiate(this.PREFAB);
//             node.zIndex = this.zIndex;
//             node.position = cc.v2(0, 0);
//             //不持久化到编辑器
//             node._objFlags = cc.Object.Flags.DontSave;
//             node.parent = this.parent || this.node;
//             this._godGuide = node.getComponent('GodGuide');
//         }
//         catch (error) {
//             cc.error(this.PREFAB);
//             cc.error(error);
//         }
//     },

//     runTask() {
//         async.eachSeries(this.tasks, (taskFile, cb) => {
//             let task = require(taskFile);
//             this._godGuide.setTask(task);
//             this._godGuide.run(cb);
//         }, () => {
//             //cc.log('任务全部完成');
//         });
//     }
// });



const { ccclass, property } = cc._decorator;
@ccclass
export default class LoadGuide extends cc.Component {

    //显示的文本
    callback: any;


    @property(cc.Prefab)
    PREFAB: cc.Prefab = null; //预制件

    @property(cc.Node)
    parent: cc.Node = null;  //预制件实例化后所在的父节点

    // @property()
    // zIndex = 0;

    _godGuide: GodGuide;

    private tasksObj = {
        '50800': ['task_50800'],
        '50801': ['task_50801'],
        '50802': ['task_50802'],

        '50805': ['task_50805'],
        '50806': ['task_50806'],
        '50808': ['task_50808'],
        // '50809': ['task_50809'],

        '50811': ['task_50811'],

        '50813': ['task_50813'],
        '50814': ['task_50814'],
        '50815': ['task_50815'],
        // '50816': ['task_50816'],
        '50817': ['task_50817'],
        '50818': ['task_50818'],
    }

    onLoad() {
        loadGuide = this;
        EventMgr.addEventListener("inspectProcess", this.runTask, this);
    }

    start() {

    }

    onDestroy() {
        EventMgr.removeEventListener("inspectProcess", this.runTask, this);
    }

    loadPrefab() {
        if (this.node.getChildByName(this.PREFAB.name)) return
        let node = cc.instantiate(this.PREFAB);
        node.zIndex = 98;//tipsLayer.zIndex = 99;
        node.position = cc.v3(0, 0);
        //不持久化到编辑器
        // node._objFlags = cc.Object.Flags.DontSave;
        node.parent = this.parent || this.node;
        this._godGuide = node.getComponent('GodGuide');

        // this.runTask();
        // try {

        // }
        // catch (error) {
        //     cc.error(this.PREFAB);
        //     cc.error(error);
        // }
    }

    spliceWaitGuideIndex(guideId: string) {
        let index = dataManager.waitGuideIndexArr.indexOf(guideId);
        if (index < 0) {
            //console.error("guideId error.  guideId == " + guideId);
            return
        }
        // //console.log('删除完成引导id == ' + guideId + ",    index == " + index);
        dataManager.completedGuideIndexArr.push({ wsClientMsg: guideId });
        dataManager.waitGuideIndexArr.splice(index, 1);
        // //console.log('waitGuideIndexArr == ', dataManager.waitGuideIndexArr + ",  completedGuideIndexArr ", dataManager.completedGuideIndexArr);
        // let netObj = {
        //     main: NetMsg.NET_GAME_MAIN,
        //     sub: NetMsg.SUB_GC_WS_ROOM_C2S_SET_CLIENT_MSG,
        //     msg: guideId
        // }
        // netMgr.send(netObj);
    }
    runTask() {
        //TODO:test
        // dataManager.waitGuideIndexArr = [];
        // dataManager.waitGuideIndexArr.push('50801');

        //检查待完成的新手引导
        let guideId = dataManager.waitGuideIndexArr[0];
        if (guideId) {
            async.eachSeries(this.tasksObj[guideId], (taskFile, cb) => {
                //console.log('taskFile---------->', taskFile)
                let { task } = require(taskFile);
                let bool = this._godGuide.setTask(task);
                if (bool) this._godGuide.run(cb);
            }, () => {
                //cc.log('任务全部完成');
            });
        }

        //console.log('LoadGuid runTask');

        // let task = this.tasks[dataManager.NewUserState];
        // async.eachSeries(task, (taskFile, cb) => {
        //     //console.log('taskFile---------->', taskFile)
        //     let { task } = require(taskFile);
        //     this._godGuide.setTask(task);
        //     this._godGuide.run(cb);
        // }, () => {
        //     //cc.log('任务全部完成');
        // });
    }
}

export let loadGuide: LoadGuide = null;