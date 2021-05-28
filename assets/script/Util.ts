import { uiManager } from "../framework/ui/UIManager";
import { dataManager } from "./Manager/dataManager";
import { UIID } from "./UIConfig";

const { ccclass } = cc._decorator;

export enum CHCHE_TYPE {
    MUSIC = "musicTurnOn",
    EFFECT = "effectTurnOn",
    ZD = "ZDTurnOn",
}
export enum TURN_ON {
    ON = "OPEN",
    OFF = "OFF",
}

let Units = ["", "K", "W", "B", "T", "M", "O", "N", "S"];

@ccclass
export default class Util {
    /**
    * 格式化钱的显示
    * @param  {[type]} money  [description]
    * @param  {Number} fixNum [保留的小数点位数]
    * @param  {Number} i      [description]
    * @param  {isRounding} i  [是否取整显示]
    * @return {[type]}        [description]
    */
    static formatMoney(money, fixNum = 2, isRounding = false, i = 0) {
        var idx = 3;
        if (money > 100000) {
            idx = 2;
        }
        var str = null;
        if (money < Math.pow(10, idx)) {
            return money;
        }

        if (i >= Units.length) {
            return Math.pow(10, idx * Units.length) + Units[Units.length - 1];
        }

        if (money >= Math.pow(10, idx * Units.length)) {
            return Math.pow(10, idx * Units.length) + Units[Units.length - 1];
        }

        if (money >= Math.pow(10, idx * i) && money < Math.pow(10, idx * (i + 1))) {
            if (isRounding) {//取整显示
                if (money % Math.pow(10, 3 * i) == 0) {
                    return str = (money / Math.pow(10, idx * i)) + Units[i];
                }
            }
            return str = (money / Math.pow(10, idx * i)).toFixed(fixNum) + Units[i];
        }

        return Util.formatMoney(money, fixNum, isRounding, i + 1);
    }

    /**
     * 分割字符串
     */
    static splitStr(str: string, separator: string) {
        var arr = str.split(separator);
        return arr;
    }

    /**打乱数组排序 */
    static shuffle(arr: Array<any>) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    /**
    * 求圆周上等分点的坐标
    * @param r 半径
    * @param ox 圆心坐标x
    * @param oy 圆心坐标y
    * @param count 等分个数
    */
    static getPoint(r, ox, oy, count) {
        let point = []; //结果
        let radians = (Math.PI / 180) * Math.round(360 / count), //弧度
            i = 0;
        for (; i < count; i++) {
            let x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);
            point.unshift({ x: x, y: y }); //为保持数据顺时针
        }
        return point;
    }

    static distance(p1, p2) {
        let dx = Math.abs(p2.x - p1.x);
        let dy = Math.abs(p2.y - p1.y);
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    static clone(value: any) {
        if (!value || typeof value != "object") {
            return value;
        }
        let out: any = value.contructor === Array ? [] : {}
        let _clone: Function = ((o: Object, c: any) => {
            for (let i in o) {
                if (o[i] && typeof o[i] === "object") {
                    if (o[i].contructor === Array) {
                        c[i] = []
                    }
                    else {
                        c[i] = {}
                    }
                    _clone(o[i], c[i]);
                }
                else {
                    c[i] = o[i]
                }
            }
            return c;
        })
        return _clone(value, out)
    }

    //根据概率获得结果，例：1,100,60（60是爆率）
    static getResultRandom(min, max, probability) {
        let random = this.random(min, max);
        let result = probability > random ? true : false;
        return result;
    }

    // 求指定范围内的一个随机数
    static random(min: number, max: number) {
        let sum = max - min + 1;
        return Math.floor(Math.random() * sum + min);
    }

    // 求指定范围内n个不重复的随机数
    static myNum(n, min, max) {
        let a = [];
        for (let i = 0; i < n; i++) {
            a[i] = this.random(min, max);
            for (let z = 0; z < i; z++) {
                if (a[i] == a[z]) {
                    i--;
                    break;
                }
            }
        }
        return a;
    }

    /**
    * 生成从minNum到maxNum的随机数。
    * 如果指定decimalNum个数，则生成指定小数位数的随机数
    * 如果不指定任何参数，则生成0-1之间的随机数。
    * @param maxNum [数据类型是Integer]生成的随机数的最大值
    * @param minNum [数据类型是Integer]生成的随机数的最小值（minNum和maxNum可以调换位置）
    * @param decimalNum [数据类型是Integer]如果生成的是带有小数的随机数，则指定随机数的小数点后的位数
    */
    static randomNum(maxNum: number, minNum: number, decimalNum?: number): number {
        let max = 0, min = 0;
        minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
        switch (arguments.length) {
            case 1:
                return Math.floor(Math.random() * (max + 1));
            case 2:
                return Math.floor(Math.random() * (max - min + 1) + min);
            case 3:
                return Number((Math.random() * (max - min) + min).toFixed(decimalNum));
            default:
                return Math.random();
        }
    }

    /**
     * 计算A点到B点的朝向
     */
    static getAngle(start: cc.Vec2, end: cc.Vec2) {
        let dirVec = end.sub(start);//获得从startPos指向endPos的方向向量
        let comVec = cc.v2(1, 0);//计算夹角的参考方向，这里选择x轴正方向
        let radian = dirVec.signAngle(comVec);//获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
        let degree = Math.floor(cc.misc.radiansToDegrees(radian));
        let angle = -degree;
        return angle;
    }
    //秒转 时分秒
    static formatSeconds(value, format?: boolean) {
        let theTime = value;// 秒
        let middle = 0;// 分
        let hour = 0;// 小时

        if (theTime > 60) {
            middle = Math.floor(theTime / 60);
            theTime = theTime % 60;
            if (middle > 60) {
                hour = Math.floor(middle / 60);
                middle = middle % 60;
            }
        }
        let formatTime = (time) => {
            let ret = "00"
            if (time > 0) ret = (time < 10 ? ("0" + time) : time).toString();
            return ret;
        }
        let result = "" + formatTime(theTime);
        if (format) {
            if (middle >= 0) {
                result = "" + formatTime(middle) + "分" + result;
            }
            if (hour > 0) {
                result = "" + formatTime(hour) + "时" + result;
            }
            result = result + "秒";
        } else {
            if (middle >= 0) {
                result = "" + formatTime(middle) + ":" + result;
            }
            if (hour > 0) {
                result = "" + formatTime(hour) + ":" + result;
            }
        }

        return result;
    }

    /**奖励切割 */
    static awardSpilt(award: string): any {
        let retAwards = [];
        let awardStrs = award.split(";");
        for (let idx = 0; idx < awardStrs.length; idx++) {
            let splitStr = awardStrs[idx].split(":")
            let key = Number(splitStr[0]);
            let val = Util.formatMoney(Number(splitStr[1]));
            let aw = { key: key };
            if (splitStr.length > 2) {
                aw["vals"] = [];
                for (let idx = 1; idx < splitStr.length; idx++) {
                    aw["vals"].push(Util.formatMoney(Number(splitStr[idx]),0));
                }
            } else {
                aw["val"] = val
            }
            retAwards[idx] = aw;
        }
        return retAwards;
    }

    /**奖励切割 不加后缀的值 */
    static awardSpilts(award: string): any {
        let retAwards = [];
        let awardStrs = award.split(";");
        for (let idx = 0; idx < awardStrs.length; idx++) {
            let splitStr = awardStrs[idx].split(":")
            let key = Number(splitStr[0]);
            let val = Number(splitStr[1]);
            let aw = { key: key };
            if (splitStr.length > 2) {
                aw["vals"] = [];
                for (let idx = 1; idx < splitStr.length; idx++) {
                    aw["vals"].push(Number(splitStr[idx]));
                }
            } else {
                aw["val"] = val
            }
            retAwards[idx] = aw;
        }
        return retAwards;
    }

    /**名字太长... */
    static nickNameFromat(str, maxChars?: number) {
        maxChars = maxChars || 4;
        var toCodePoint = function (unicodeSurrogates) {
            var r = [], c = 0, p = 0, i = 0;
            while (i < unicodeSurrogates.length) {
                var pos = i;
                c = unicodeSurrogates.charCodeAt(i++);//返回位置的字符的 Unicode 编码 
                if (c == 0xfe0f) {
                    continue;
                }
                if (p) {
                    var value = (0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00));
                    r.push({
                        v: value,
                        pos: pos,
                    }); //计算4字节的unicode
                    p = 0;
                } else if (0xD800 <= c && c <= 0xDBFF) {
                    p = c; //如果unicode编码在oxD800-0xDBff之间，则需要与后一个字符放在一起
                } else {
                    r.push({
                        v: c,
                        pos: pos
                    }); //如果是2字节，直接将码点转为对应的十六进制形式
                }
            }
            return r;
        }
        maxChars *= 2;

        var codeArr = toCodePoint(str);
        var numChar = 0;
        var index = 0;
        for (var i = 0; i < codeArr.length; ++i) {
            var code = codeArr[i].v;
            var add = 1;
            if (code >= 128) {
                add = 2;
            }
            //如果超过了限制，则按上一个为准
            if (numChar + add > maxChars) {
                break;
            }
            index = i;
            //累加
            numChar += add;
        }
        if (codeArr.length - 1 == index) {
            return str;
        }
        var more = "..." ? 1 : 0;
        return str.substring(0, codeArr[index - more].pos + 1) + "...";
    }

    /**设置缓存 */
    static getCacheTurnOn(key: CHCHE_TYPE) {
        let turnOn = cc.sys.localStorage.getItem(key);
        if (turnOn == null) {
            turnOn = TURN_ON.ON;
            Util.setCacheTurnOn(key, TURN_ON.ON);
        }
        // //console.log("get turnOn "+ key + " " + turnOn);
        return turnOn;
    }

    static setCacheTurnOn(key: CHCHE_TYPE, val: TURN_ON) {
        // //console.log("set turnOn "+ key + " " + val);
        cc.sys.localStorage.setItem(key, val);
    }

    /**获取距离最近的n个节点 */
    static getDistanceNode(n: number, stratPos: cc.Vec3, monsterArray: Array<any>) {
        let array = [];
        for (let i = 0; i < monsterArray.length; i++) {
            let dest = monsterArray[i].node.position;
            let distance = stratPos.sub(dest).mag();
            let attackTarget = {
                monster: monsterArray[i],
                distance: distance,
            };

            if (i < n) {
                array.push(attackTarget);
                continue
            }
            for (let z = 0; z < array.length; z++) {
                if (distance < array[z].distance && array.indexOf(attackTarget) < 0) {
                    array[z] = attackTarget;
                }
            }
        }
        return array;
    }

    static isAdopt(checkpointId: number, index: number, str?: string) {
        let id = Number(dataManager.meinvLevel[index].wsLevel);
        if (id <= checkpointId) {
            if (str) uiManager.open(UIID.showSystemHint, str);
            return false;
        }

        return true;
    }
    /**睡眠函数 */
    static sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
            return;
            }
    }
    /**置灰用 */
    static retMaterial(isBool) {
        if (isBool) return cc.Material.getBuiltinMaterial('2d-sprite');  // 恢复
        else return cc.Material.getBuiltinMaterial('2d-gray-sprite');   // 置灰
    }
    //对应几率对象
    static obj:any;

    //根据对应几率抽奖
    static getRand(obj){
        this.obj = obj;
        return this.init();
    }

    //获取几率总和
    static sum = function(key){
        let obj = this.obj;
        let sum=0;
        for(let i in obj){
            sum+=obj[i][key];
        }
        return sum;
    };

    //取得结果
    static init = function(){
        let result = null;
        let obj = this.obj;
        let sum = this.sum('prob');	//几率总和
        for(let i in obj){
            let rand =Math.trunc(Math.random()*sum);
            if(rand<=obj[i].prob){
                result = obj[i];
                break;
            }else{
                sum-=obj[i].prob;
            }
        }
        return result;
    };
}
