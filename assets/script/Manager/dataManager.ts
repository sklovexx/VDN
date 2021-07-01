export module dataManager {
    //已完成的新手引导索引
    export let completedGuideIndexArr = [];
    //待完成的新手引导索引
    export let waitGuideIndexArr = [];
    export let checkpointID:number = 1001;
    export let gold:number = 1000;
    export let starNumber:number = 0;
    export let population:number = 1000;
    export let studyData =  {
        base:{},
        footmen:{},
        archers:{},
        horsemen:{}
    }
    export let innateData =  {
        base:{},
        footmen:{},
        archers:{},
        horsemen:{}
    }
    export let missionResult = [false,false,false];
}
