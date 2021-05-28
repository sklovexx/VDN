import { audioMgr } from "../framework/audio/AudioMgr";

export default class UIHelper {

    // 前缀(组件简写)映射相应的组件, 用于自动绑定 绑定到到相应的组件
    public static PREFIX_MAP: { [key: string]: string } = {
        "_lab": "cc.Label",
        "_btn": "cc.Button",
        "_sp": "cc.Sprite",
        "_rt": "cc.RichText",
        "_mask": "cc.Mask ",
        "_ms": "cc.MotionStreak",
        "_tm": "cc.TiledMap",
        "_tt": "cc.TiledTile",
        "_spine": "sp.Spine ",
        "_gh": "cc.Graphics",
        "_ani": "cc.Animation",
        "_wv": "cc.WebView ",
        "_eb": "cc.EditBox",
        "_sv": "cc.ScrollView ",
        "_vp": "cc.VideoPlayer",
        "_pb": "cc.ProgressBar",
        "_pv": "cc.PageView",
        "_sli": "cc.Slider",
        "_tg": "cc.Toggle",
    };

    // 绑定组件
    public static bindComponent(component: cc.Component, target: cc.Node, funName: string) {
        this.bindNode(component, target, funName);
    }

    
    // 绑定node
    public static bindNode(component: cc.Component, target: cc.Node, funName: string) {
        if (component[`$collector`] === target.uuid) {
            cc.warn(`重复绑定退出.${target.name}`)
            return;
        }
        component[`$collector`] = target.uuid;
        this._bindSubNode(target, component, funName);
    }

    // 绑定子节点
    private static _bindSubNode(node: cc.Node, component: cc.Component, funName: string) {
        // 检测前缀是否符合绑定规范
        let name = node.name;
        let names = name.split("$");
        let componentName = names[0];
        if (this.checkNodePrefix(name)) {
            // 查询这个节点是否重复绑定到同一个用户自定义组件上
            if (component[name]) {
                cc.warn(`组件中有相同节点被重复绑定了. ${name}`)
                component[name] = null;
                delete component[name];
            }

            let nodeName = this.getNodePrefix(name);
            component[`${componentName}`] = (nodeName && this.PREFIX_MAP[nodeName]) ? node.getComponent(this.PREFIX_MAP[nodeName]) : node;
            this._bindButtonEvent(node, component, funName);
            // this._bindNodeEvent(node, component);
            // this._bindNodeLongEvent(node, component);
        }

        // 绑定子节点
        node.children.forEach((target: cc.Node) => {
            this._bindSubNode(target, component, funName);
        });
    }

    private static _bindButtonEvent(node: cc.Node, component: cc.Component, funName: string): void {
        // 不是下划线开头的节点不绑定事件
        if (!node.name.match(/^_btn/) && !node.name.match(/^_tg/)) return;
        let tempEvent = component[funName];
        let buttonComponent = component[node.name]
        if (tempEvent && buttonComponent && buttonComponent.clickEvents.length === 0) {
            // var clickEventHandler = new cc.Component.EventHandler();
            // clickEventHandler.target = component.node;
            // clickEventHandler.component = this._getComponentName(component);
            // clickEventHandler.handler = funName;
            // buttonComponent.clickEvents.push(clickEventHandler);
            node.on(cc.Node.EventType.TOUCH_END,function(event){
                // audioMgr.playCommonEffect("tongyong_dianji");
                if(node.getComponent(cc.Button) && node.getComponent(cc.Button).interactable == false 
                || node.getComponent(cc.Toggle) && node.getComponent(cc.Toggle).interactable == false) 
                    return;
                tempEvent.call(component,event);
            })
        }
    }

    // // 开始触摸事件函数 = on + TouchStart
    // // 触摸移动事件函数 = on + TouchMove
    // // 触摸结束事件函数 = on + TouchEnd
    // // 触摸取消事件函数 = on + TouchCancel
    // private static _getTouchEventName(name: string): any[] {
    //     return [
    //         [`TouchStart`, cc.Node.EventType.TOUCH_START],
    //         [`TouchMove`, cc.Node.EventType.TOUCH_MOVE],
    //         [`TouchEnd`, cc.Node.EventType.TOUCH_END],
    //         [`TouchCancel`, cc.Node.EventType.TOUCH_CANCEL],
    //     ];
    // }

    // // 绑定节点事件
    // private static _bindNodeEvent(node: cc.Node, component: cc.Component): void {
    //     if (node.getComponent(cc.EditBox)) {
    //         return;
    //     }
    //     let eventNames = this._getTouchEventName(node.name);
    //     eventNames.forEach((item) => {
    //         let eventName = item[0];
    //         let eventType = item[1];
    //         eventName = eventName.replace(/^_/, "");
    //         eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);
    //         eventName = `on${eventName}`;
    //         let tempEvent = component[eventName];
    //         if (tempEvent) {
    //             node.on(eventType, tempEvent, component);
    //         }
    //     })
    // }

    // //长按事件函数 = on + 控件的名字 + TouchLong
    // private static _bindNodeLongEvent(node: cc.Node, component: cc.Component): void {
    //     let eventName = node.name;
    //     eventName = eventName.replace(/^_/, "");
    //     eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);
    //     eventName = `on${eventName}TouchLong`
    //     let tempEvent = component[eventName];
    //     if (tempEvent) {
    //         let timer = -1;
    //         node.on(cc.Node.EventType.TOUCH_START, () => {
    //             timer = setTimeout(() => {
    //                 tempEvent.call(component);
    //             }, 3000);
    //         }, component);

    //         node.on(cc.Node.EventType.TOUCH_END, () => {
    //             if (timer >= 0) {
    //                 clearTimeout(timer)
    //                 timer = -1;
    //             }
    //         }, component);
    //         node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
    //             if (timer >= 0) {
    //                 clearTimeout(timer)
    //                 timer = -1;
    //             }
    //         }, component);
    //     };
    // }

    public static checkNodePrefix(name: string): boolean {
        let ret = name.match(/^_/);
        return ret !== null && ret !== undefined;
    }

    public static getNodePrefix(name: string): string {
        let ret = name.match(/^_[a-z]*/);
        return ret ? ret[0] : null;
    }

    private static _getComponentName(component: cc.Component) {
        return component.name.match(/<.*>$/)[0].slice(1, -1);
    }

}