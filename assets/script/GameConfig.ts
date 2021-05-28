import { resLoader } from "../framework/res/ResLoader";

export default class GameConfig {
    private static instance: GameConfig = null;
    public static getInstance() {
        if (GameConfig.instance == null) {
            GameConfig.instance = new GameConfig();
        }
        return GameConfig.instance;
    }

    private JsonConfigMap: Map<string, JSON> = new Map;

    loadJson(url: string) {
        resLoader.loadRes(url, cc.JsonAsset, (err, JsonAsset: cc.JsonAsset) => {
            this.JsonConfigMap.set(JsonAsset.name, JsonAsset.json);
        })
    }

    loadJsonArray(url: string, callBack?: Function) {
        resLoader.loadResDir(url, cc.JsonAsset, (err, JsonAssetAry: Array<cc.JsonAsset>) => {
            JsonAssetAry.forEach(JsonAsset => {
                this.JsonConfigMap.set(JsonAsset.name, JsonAsset.json);
            });
            if (callBack) callBack(JsonAssetAry);
        })
    }

    getJson(name: string) {
        return this.JsonConfigMap.get(name);
    }
}
