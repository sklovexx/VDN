import { EventMgr } from "../framework/common/EventManager";
import LocalStorageData from "./LocalStorageData";
import UserLocalData from "./UserLocalData";
export default class LocalDataManager {
    static buildingLevelUp(buildingId?:string){
        let PlayerCityData = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData);
        if(buildingId!=undefined){
            PlayerCityData.sub_building_info[buildingId].level++;
            PlayerCityData.progress++;
        }else{
            PlayerCityData.level++;
        }
        UserLocalData.setLocalStorage(LocalStorageData.PlayerCityData,PlayerCityData);
        EventMgr.raiseEvent("updateGold");
    }
    static studyLevelUp(studyId:string){
        let studyData = UserLocalData.getLocalStorage(LocalStorageData.PlayerStudyData);
        studyData[studyId].level++;
        UserLocalData.setLocalStorage(LocalStorageData.PlayerStudyData,studyData);
        EventMgr.raiseEvent("updateGold");
    }
    static innateLevelUp(innateId:string){
        let innateData = UserLocalData.getLocalStorage(LocalStorageData.PlayerInnateData);
        innateData[innateId].level++;
        UserLocalData.setLocalStorage(LocalStorageData.PlayerInnateData,innateData);
    }
    static folkHoursesProduceLevelUp(produceType:string){
        let PlayerCityData = UserLocalData.getLocalStorage(LocalStorageData.PlayerCityData);
        if(produceType == "produce_time_level"){
            PlayerCityData.sub_building_info["1002"].produce_time_level++;
        }else{
            PlayerCityData.sub_building_info["1002"].produce_multiple_level++;
        }
        UserLocalData.setLocalStorage(LocalStorageData.PlayerCityData,PlayerCityData);
        EventMgr.raiseEvent("updateGold");
    }
}
function aseKey(aseKey: any): any {
    throw new Error("Function not implemented.");
}

