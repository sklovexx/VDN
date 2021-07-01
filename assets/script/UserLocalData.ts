import GameConfig from "./GameConfig";
import CryptoJS = require("../framework/crypto-js.min.js");
export default class UserLocalData {
    static aesKey = "12345678";
    static encryptData(data:string){
        //加密
        let encrypt = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(this.aesKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
          return encrypt;
    }
    static decryptData(data:string){
        //解密
        var decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(this.aesKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
        return decrypt;
    }
    static getLocalStorage(key:string){
        let data = cc.sys.localStorage.getItem(key);
        if(data){
            //读取数据时解密
            return JSON.parse(this.decryptData(data));
        }
        let defData = GameConfig.getInstance().getJson('defaultData');
        if (!defData) console.error('key有误');
        return defData[key];
    }
    static setLocalStorage(key:string, data:any){
        //存储数据时先进行加密
        cc.sys.localStorage.setItem(key,this.encryptData(JSON.stringify(data)));
    }
}
