import { UIConf } from "../framework/ui/UIManager";

export enum UIID {
    EndLayer,
}


let hallRootUrl = "childLayer/";
let gameRootUrl = "childLayer/";


export let UICF: { [key: number]: UIConf } = {
    [UIID.EndLayer]: { prefab: gameRootUrl + "EndLayer", preventTouch: true },
}