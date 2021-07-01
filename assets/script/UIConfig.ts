import { UIConf } from "../framework/ui/UIManager";

export enum UIID {
    BaseBuilding,
    FolkHourses,
    Technology,
    InnateFrame,
    CheckPoint,
    CheckPointHelp,
    SystemInfoLayer,
    EndLayer,
}


let hallRootUrl = "childLayer/";
let gameRootUrl = "childLayer/";


export let UICF: { [key: number]: UIConf } = {
    [UIID.BaseBuilding]: { prefab: hallRootUrl + "BaseBuilding", preventTouch: true },
    [UIID.FolkHourses]: { prefab: hallRootUrl + "FolkHourses", preventTouch: true },
    [UIID.Technology]: { prefab: hallRootUrl + "Technology", preventTouch: true },
    [UIID.InnateFrame]: { prefab: hallRootUrl + "InnateFrame", preventTouch: false },
    [UIID.CheckPoint]: { prefab: hallRootUrl + "CheckPoint", preventTouch: true },
    [UIID.CheckPointHelp]: { prefab: hallRootUrl + "CheckPointHelp", preventTouch: true },
    [UIID.SystemInfoLayer]: { prefab: hallRootUrl + "SystemInfoLayer", preventTouch: true },
    [UIID.EndLayer]: { prefab: gameRootUrl + "EndLayer", preventTouch: true },
    [UIID.SystemInfoLayer]: { prefab: gameRootUrl + "SystemInfoLayer", preventTouch: true },
}