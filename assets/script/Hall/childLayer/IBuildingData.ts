export interface ITechnologyData {
    id: number,
    name: string,
    level: number,
    resource_add_speed: Array<number>,
    need_gold: Array<number>,
    technology_type: any
}
export interface IFolkHoursesData {
    id: number,
    name: string,
    level: number,
    people: number,
    produce_multiple_level:number,
    produce_time_level:number,
    produce_multiple: Array<number>,
    produce_time: Array<number>,
    resource_add_speed: Array<number>,
    need_gold: Array<number>,
    produce_multiple_need_gold: Array<number>,
    produce_time_need_gold: Array<number>,
}

export default interface ICityData {
    id: number,
    name: string,
    level: number,
    progress: number,
    needProgress: Array<number>,
    resource_add_speed: Array<number>,
    need_gold: Array<number>,
    sub_building_info:any
}
