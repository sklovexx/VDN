import GodGuide from "./GodGuide";
import async from "./lib/async";
import { loadGuide } from "./LoadGuide";
/**
 * zxh
 */
//根据命令
export class GodCommand {

    static readonly DIALOGUE: string = 'dialogue';//对话框
    static readonly FINGER: string = 'finger';//节点定位加手指指引
    static readonly TEXT: string = 'text';//文本显示
    static readonly LOCATOR: string = 'locator';//节点定位
    static readonly SAVE: string = 'save';//保存进度

    static readonly typeList = [GodCommand.DIALOGUE, GodCommand.FINGER, GodCommand.TEXT, GodCommand.LOCATOR, GodCommand.SAVE];


    //定位节点
    static locator(godGuide, step, callback) {
        let { args, findCallback, fullScreen, jiantouBool = true,
            graphicsCfg = {
                funName: "_focusCircleToNode",
                rotation: 0,
                pos: cc.v2(0, 0)
            } } = step.command;

        godGuide.find(args, (node) => {
            godGuide[graphicsCfg.funName](node, graphicsCfg.rotation, graphicsCfg.pos);
            godGuide._jiantou.active = jiantouBool;
            godGuide._targetNode = node;
            if (findCallback) findCallback(node);
            //点击确认
            if (fullScreen) {
                loadGuide._godGuide._mask.node.parent.once(cc.Node.EventType.TOUCH_END, () => {
                    //cc.log('节点被点击');
                    //任务完成
                    callback();
                });
            }
            else {
                //点击确认
                node.once(cc.Node.EventType.TOUCH_END, () => {
                    //cc.log('节点被点击');
                    //任务完成
                    callback();
                });
            }


            //触摸模拟
            let autorun = godGuide.getTask().autorun;
            if (autorun) {
                godGuide.touchSimulation(node);
            }
        });
    }

    //定位节点，显示一个手指动画
    static finger(godGuide, step, callback) {
        let { args, findCallback, graphicsCfg = {
            funName: "_focusCircleToNode",
            rotation: 0,
            pos: cc.v2(0, 0)
        } } = step.command;
        godGuide._targetNode = null;
        //定位节点
        godGuide.find(args, (node) => {
            godGuide[graphicsCfg.funName](node, graphicsCfg.rotation, graphicsCfg.pos);
            //手指动画
            godGuide.fingerToNode(node, () => {
                if (findCallback) findCallback(node);
                godGuide._targetNode = node;

                node.once(cc.Node.EventType.TOUCH_END, () => {
                    //cc.log('节点被点击');
                    //任务完成
                    callback();
                });
            });

            //触摸模拟
            let autorun = godGuide.getTask().autorun;
            if (autorun) {
                godGuide.touchSimulation(node);
            }
        });
    }

    //文本指令
    static text(godGuide, step, callback) {
        let { args, pos = {
            isAlignTop: true, isAlignBottom: true,
            top: cc.winSize.height / 2, bottom: cc.winSize.height / 2
        } } = step.command;
        if (args && (typeof args === 'string' || typeof args === 'number')) {
            args = [args];
        }

        //触摸模拟
        let autorun = godGuide.getTask().autorun;

        let index = 0;
        //顺序显示文本
        async.eachSeries(args, (str, cb) => {
            let flag = false;
            godGuide.showText(str, pos, () => {
                if (flag) {
                    return;
                }
                flag = true;
                cb();
            });

            if (index++ >= args.length - 1) {
                flag = true;
                cb();
                return;
            }

            //自动引导
            if (autorun) {
                setTimeout(() => {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    cb();
                }, 1000);
            }
        }, callback);
    }

    //对话框
    static dialogue(godGuide, step, callback) {
        let { args } = step.command;
        if (args && (typeof args === 'string' || typeof args === 'number')) {
            args = [args];
        }

        //触摸模拟
        let autorun = godGuide.getTask().autorun;

        let index = 0;
        //顺序显示文本
        async.eachSeries(args, (str, cb) => {
            let flag = false;
            let next = () => {
                if (++index >= args.length - 1) {
                    godGuide._dialogue.active = false;
                    flag = true;
                    cb();
                    return;
                } else {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    godGuide._dialogue.active = false;
                    cb();
                }
            }

            godGuide.showDialogue(str, () => {//点击回调
                next();
            });

            //自动引导
            if (autorun) {
                setTimeout(() => {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    cb();
                }, 10000);
            }
        }, callback);
    }
};