import { resLoader } from "../framework/res/ResLoader";
import Singleton from "../framework/Singleton";
import async from "../framework/GodGuide/lib/async"
export interface ResCfg {
    resType: typeof cc.Asset;
    url: string;
    completeBool?: boolean;
}

export default class ResManager extends Singleton<ResManager> {
    greyMaterial: cc.Material = null;
    normalMaterial: cc.Material = null;
    spineNormalMaterial: cc.Material = null;

    private _commonResCfg: Array<ResCfg> = [
        { resType: cc.Prefab, url: "common/prefab" },
        { resType: cc.Font, url: "common/font" },
        { resType: cc.AudioClip, url: "common/sound" },
        { resType: cc.SpriteFrame, url: "common/img" },
    ];

    // private _hallResCfg: Array<ResCfg> = [
    //     { resType: cc.Prefab, url: "hall/prefab", completeBool: false },
    //     { resType: cc.SpriteFrame, url: "hall/img", completeBool: false },
    //     { resType: cc.AudioClip, url: "hall/sound", completeBool: false },
    //     { resType: sp.SkeletonData, url: "hall/spine", completeBool: false },
    // ];

    private _gameResCfg: Array<ResCfg> = [
        { resType: cc.Prefab, url: "game/prefab", completeBool: false },
        { resType: cc.SpriteFrame, url: "game/img", completeBool: false },
        { resType: cc.AudioClip, url: "game/sound", completeBool: false },
        { resType: sp.SkeletonData, url: "game/spine", completeBool: false },
    ];

    private _commonAssetMap: Map<typeof cc.Asset, Map<string, typeof cc.Asset>> = new Map();
    private _sceneAssetMap: Map<typeof cc.Asset, Map<string, typeof cc.Asset>> = new Map();

    private _completeFun: Function = null;

    constructor() {
        super();
        this._commonAssetMap.set(cc.Prefab, new Map());
        this._commonAssetMap.set(cc.Font, new Map());
        this._commonAssetMap.set(cc.AudioClip, new Map());
        this._commonAssetMap.set(cc.SpriteFrame, new Map());
    }

    initAssetMap() {
        this._sceneAssetMap.set(cc.Prefab, new Map());
        this._sceneAssetMap.set(cc.AudioClip, new Map());
        this._sceneAssetMap.set(cc.SpriteFrame, new Map());
        this._sceneAssetMap.set(sp.SkeletonData, new Map());
    }

    initLoadCommonRes(completeFun?: Function) {
        async.eachSeries(this._commonResCfg,(element,cb)=>{
            this.loadResArray(this._commonAssetMap, element, cb, this._commonResCfg);
        })
        // this._commonResCfg.forEach(element => {
        //     this.loadResArray(this._commonAssetMap, element, null, this._commonResCfg);
        // });
        this._completeFun = completeFun;
    }

    // initLoadHallRes(completeFun?: Function) {
    //     //加载大厅代码包
    //     resLoader.loadSubpackage('hall_script', () => {
    //         this.initAssetMap();
    //         async.eachSeries(this._hallResCfg,(element,cb)=>{
    //             this.loadResArray(this._sceneAssetMap, element, cb, this._hallResCfg);
    //         })
    //         // this._hallResCfg.forEach(element => {
    //         //     console.log('加载单个资源')
    //         //     this.loadResArray(this._sceneAssetMap, element, this._hallResCfg);
    //         // });
    //         this._completeFun = completeFun;
    //     })
    // }

    initLoadGameRes(completeFun?: Function) {
        this.initAssetMap();
        this._gameResCfg.forEach(element => {
            this.loadResArray(this._sceneAssetMap, element, null, this._gameResCfg);
        });
        this._completeFun = completeFun;
    }

    getRes(resType: typeof cc.Asset, name: string) {
        return this._sceneAssetMap.get(resType).get(name);
    }

    getPrefabRes(name: string): cc.Prefab {
        let prefab: any = this._sceneAssetMap.get(cc.Prefab).get(name);
        // if (!prefab) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return prefab;
    }

    getSpriteFrameRes(name: string): cc.SpriteFrame {
        let spriteFrame: any = this._sceneAssetMap.get(cc.SpriteFrame).get(name);
        // if (!spriteFrame) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return spriteFrame;
    }

    getAudioClipRes(name: string): cc.AudioClip {
        let audioClip: any = this._sceneAssetMap.get(cc.AudioClip).get(name);
        // if (!audioClip) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return audioClip;
    }

    getSkeletonData(name: string): sp.SkeletonData {
        let skeletonData: any = this._sceneAssetMap.get(sp.SkeletonData).get(name);
        // if (!skeletonData) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return skeletonData;
    }

    getCommonPrefabRes(name: string): cc.Prefab {
        let prefab: any = this._commonAssetMap.get(cc.Prefab).get(name);
        // if (!prefab) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return prefab;
    }


    getCommonSpriteFrameRes(name: string): cc.SpriteFrame {
        let spriteFrame: any = this._commonAssetMap.get(cc.SpriteFrame).get(name);
        // if (!spriteFrame) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return spriteFrame;
    }

    getCommonAudioClipRes(name: string): cc.AudioClip {
        let audioClip: any = this._commonAssetMap.get(cc.AudioClip).get(name);
        // if (!audioClip) {
        //     console.warn("资源获取失败,请检查。name == " + name);
        // }
        return audioClip;
    }

    setPropSprite(name: string, sprite: cc.Sprite) {
        let spriteFrame = this.getCommonSpriteFrameRes(name);
        if (!spriteFrame) {
            resLoader.loadRes("img_prop/" + name, cc.SpriteFrame, (error, spriteFrame) => {
                // if(error) return
                sprite.spriteFrame = spriteFrame;
                this._commonAssetMap.get(cc.SpriteFrame).set(spriteFrame.name, spriteFrame);
            });
            return
        }
        sprite.spriteFrame = spriteFrame;
    }

    pushSceneAsset(resType: typeof cc.Asset, asset: any) {
        this._sceneAssetMap.get(resType).set(asset.name, asset);
    }

    clearAllRes() {
        this._sceneAssetMap.forEach(assetMap => {
            assetMap.forEach(asset => {
                resLoader.releaseAsset(asset);
            })
        })

        this.initAssetMap();
        // this._hallResCfg.forEach(element => { element.completeBool = false; });
        this._gameResCfg.forEach(element => { element.completeBool = false; });
    }

    private loadResArray(map, resCfg: ResCfg,cb: Function, resArray?: Array<ResCfg>) {
        resLoader.loadResDir(resCfg.url, resCfg.resType, (error: Error, resource: typeof cc.Asset[]) => {
            if (error) {
                //console.log("load error");
                //console.log("loadResArray  error == " + JSON.stringify(error));
            }
            resource.forEach(element => {
                map.get(resCfg.resType).set(element.name, element);
            });
            resCfg.completeBool = true;
            if (!resArray) return
            this.inspectComplete(resArray);
            if(cb!=null){
                cb()
            }
        });
    }

    private inspectComplete(resArray: Array<ResCfg>) {
        for (let i = 0; i < resArray.length; i++) {
            if (!resArray[i].completeBool) return false;
        }
        if (this._completeFun) {
            this._completeFun();
            this._completeFun = null;
        }
        return true;
    }


    public setComponentGreyMaterial(component: cc.Node) {
        // if (component.getComponent(cc.Sprite)) {
        //     component.getComponent(cc.Sprite).setMaterial(0, this.greyMaterial);
        //     component.children.forEach((node: cc.Node) => {
        //         if (node.getComponent(cc.Sprite))
        //             node.getComponent(cc.Sprite).setMaterial(0, this.greyMaterial);
        //     });
        // }
        // else if (component.getComponent(sp.Skeleton)) {
        //     component.getComponent(sp.Skeleton).setMaterial(0, this.greyMaterial);
        // }
    }

    public setComponentNormalMaterial(component: cc.Node) {
        // if (component.getComponent(cc.Sprite)) {
        //     component.getComponent(cc.Sprite).setMaterial(0, this.normalMaterial);
        //     component.children.forEach((node: cc.Node) => {
        //         if (node.getComponent(cc.Sprite))
        //             node.getComponent(cc.Sprite).setMaterial(0, this.normalMaterial);
        //     });
        // }
        // else if (component.getComponent(sp.Skeleton)) {
        //     component.getComponent(sp.Skeleton).setMaterial(0, this.spineNormalMaterial);
        // }

    }

    /**显示红点 */
    public showRedDot(node, isVisible) {
        node.getChildByName("dot").active = isVisible;
        if (node.getChildByName("dot").getChildByName("count")) {
            node.getChildByName("dot").getChildByName("count").getComponent(cc.Label).string = isVisible
        }
    }

    /**变换按钮状态 
     * @param node 节点
     * @param isGrey 是否置灰
    */
    changeBtnState(node: cc.Node, isGrey: boolean) {
        // if (isGrey) {
        //     if (node.getComponent(cc.Button)) node.getComponent(cc.Button).interactable = false;
        //     ResManager.getInstance().setComponentGreyMaterial(node);
        // } else {
        //     if (node.getComponent(cc.Button)) node.getComponent(cc.Button).interactable = true;
        //     ResManager.getInstance().setComponentNormalMaterial(node);
        // }
    }
}
