import ResManager from "../../script/ResManager";
import { resLoader } from "../res/ResLoader";
import { ResUtil } from "../res/ResUtil";

/** * 滑动方向枚举 */
export enum ScrollDirEnum {
    Vertical,
    Horizon
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScrollHelper extends cc.Component {

    protected itemUrl: string = "";

    @property(cc.ScrollView)
    public scrollView: cc.ScrollView = null;

    //附加mask组件的对象
    @property(cc.Node)
    public maskNode: cc.Node = null;

    //方向，0是垂直方向，1是水平方向
    @property({ type: cc.Enum(ScrollDirEnum) })
    public scrollDir: ScrollDirEnum = ScrollDirEnum.Vertical;

    @property
    public spacing: number = 0;

    @property({ tooltip: '实际生成 item 数量' })
    public spawnCount: number = 0;

    @property({ tooltip: 'item 加载路径' })
    public url: string = "";

    public get ScrollDir() {
        return this.scrollDir;
    }
    public set ScrollDir(val) {
        this.scrollDir = val;
    }

    public totalCount = 0;    //需要显示的数量
    public itemsHeight = 120;   //物品高度
    public OnScrollFun = null;//滑动回调

    //可见范围
    private minY: number = 0;
    private maxY: number = 0;
    //可以显示的范围，可见范围 超过 可以显示的范围，就刷新列表（把缓存的item放到下面或上面）
    private minVisibleY: number = 0;
    private maxVisibleY: number = 0;

    public initX = this.spacing / 2;
    public initY = -this.spacing / 2;

    private content: cc.Node = null;
    private needSize = 0;//需求要求的高度/宽度
    private visibleHeight = 0;//显示范围高度

    init() {

        this.content = this.scrollView.content;

        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "UIScrollHelper";
        eventHandler.handler = "OnScroll";
        this.scrollView.scrollEvents.push(eventHandler);

        let curX = 0, curY = 0;
        for (let i = 0; i < this.spawnCount; i++) {
            let itemNode = cc.instantiate(ResManager.getInstance().getPrefabRes(this.url));
            // let itemNode = ResUtil.instantiate(ResManager.getInstance().getPrefabRes(this.url));
            itemNode.parent = this.content;
            itemNode.active = true;
            if (this.scrollDir == ScrollDirEnum.Horizon) {
                curX = this.initX + this.spacing * i;
            }
            else {
                curY = this.initY - this.spacing * i;
            }
            itemNode.x = curX;
            itemNode.y = curY;
            this.onRefresh(itemNode, i.toString(), i);
            this.itemsList.push(itemNode);
        }


        // resLoader.loadRes(`${this.url}`, cc.Prefab, (error: Error, prefab: cc.Prefab) => {
        //     if (error) return;
        //     for (let i = 0; i < this.spawnCount; i++) {
        //         let itemNode = ResUtil.instantiate(prefab);
        //         itemNode.parent = this.content;
        //         itemNode.active = true;
        //         if (this.scrollDir == ScrollDirEnum.Horizon) {
        //             curX = this.initX + this.spacing * i;
        //         }
        //         else {
        //             curY = this.initY - this.spacing * i;
        //         }
        //         itemNode.x = curX;
        //         itemNode.y = curY;
        //         this.onRefresh(itemNode, i.toString(), i);
        //         this.itemsList.push(itemNode);
        //     }
        //     this.adjustContentSize();
        // });
    }

    public adjustContentSize(): void {
        this.curOffset = 0;

        for (let i = 0; i < this.itemsList.length; i++) {
            const item = this.itemsList[i];
            if (i <= this.totalCount - 1) {
                item.active = true;
            } else {
                item.active = false;
            }
        }

        this.needSize = this.totalCount * this.spacing;
        if (this.scrollDir == ScrollDirEnum.Horizon) {
            this.initX = this.spacing / 2;
            this.initY = 0;
            this.content.setContentSize(new cc.Size(this.needSize, this.content.getContentSize().height));
        } else {
            this.initX = 0;
            this.initY = -this.spacing / 2;
            this.content.setContentSize(new cc.Size(this.content.getContentSize().width, this.needSize));
        }
        this.visibleHeight = this.maskNode.getContentSize().height;
    }

    //初始化可见的item
    private _itemsList = new Array();
    public get itemsList() {
        return this._itemsList;
    }
    public set itemsList(value) {
        this._itemsList = value;
    }

    //计算边界，超过边界则刷新列表
    //offset是左上角原点滑动的偏移量
    private countBorder(offset) {
        let height = this.visibleHeight;//可见高度
        this.minY = offset;//获得相对于左上角原点的最小y值
        this.maxY = offset + height;//获得相对于左上角原点的最大y值
    }

    private miniIdx = 0;
    private maxIdx = 0;
    private curOffset = 0;
    OnScroll() {
        //获取滚动视图相对于左上角原点的当前滚动偏移
        let scrollOffset: cc.Vec2 = this.scrollView.getScrollOffset();
        let offset = 0;
        if (this.scrollDir == ScrollDirEnum.Horizon)
            //水平的offset是负数，为什么会有这么sb的设计，将它取反和垂直方向的统一一下
            offset = -scrollOffset.x;
        else
            offset = scrollOffset.y;
        this.curOffset = offset;
        this.refresh();
    }

    //强行刷新
    public refresh() {
        let offset = this.curOffset;

        //最大高度，超过该高度，不刷新
        let maxY = this.needSize;
        // if (offset < 0 || offset + this.visibleHeight >= maxY) return;

        let idx: number = 0;//从0开始
        this.countBorder(offset);
        this.miniIdx = Math.floor(offset / this.spacing);
        // //console.error("this.miniIdx:" + this.miniIdx);

        this.minVisibleY = this.miniIdx * this.spacing;
        this.maxVisibleY = this.maxIdx * this.spacing;
        //miniIdx到maxIdx都会刷新
        for (let i = 0; i < this.spawnCount; i++) {
            let obj = this.itemsList[i];
            idx = this.miniIdx + i;
            this.refreshItem(idx, i, obj);
        }
        this.maxIdx = this.miniIdx + this.spawnCount;
    }

    //idx是UI该刷新的第几个元素
    private refreshItem(idx, objIdx, obj) {
        if (idx < 0 || idx >= this.totalCount)
            return;
        if (obj == null) {
            // //console.error("obj为空！");
            return;
        }
        let curX = 0;
        let curY = 0;
        if (this.scrollDir == ScrollDirEnum.Horizon) {
            curX = this.initX + this.spacing * idx;
        } else {
            curY = this.initY - this.spacing * idx;
        }
        obj.x = curX; obj.y = curY;
        this.onRefresh(obj, idx, objIdx);
    }

    /**
     * 刷新回调
     * @param obj 
     * @param idx    需求显示的索引
     * @param objIdx 实际的item索引
     */
    public onRefresh(obj, idx: string, objIdx) {
        if (this.OnScrollFun) {
            this.OnScrollFun(obj, idx, objIdx);
        }
    }

    clear() {
        this.content.removeAllChildren();
        this.scrollView.scrollEvents = [];
        this.itemsList = [];
    }
}