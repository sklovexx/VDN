
cc.Class({
    extends: cc.Component,

    properties: {
        label_name:cc.Label,
        label_time:cc.Label,
        label_pic:cc.Label,
        label_yuanyin:cc.Label,
    },

    start () {
    },
    setData(data){
        try {
        }catch (e) {
            console.warn(e)
        }
        this.label_name.string = data.title;
        this.label_time.string = data.createTime;
        this.label_yuanyin.string = data.failedReason;
        this.label_pic.string = cc.js.formatStr("%s",parseFloat(data.actualValue).toFixed(4));
        let str = "";
        switch(data.withdrawStatus)
        {
            case 0:
                str = "申请中";
                break;
            case 1:
                str = "确认中";
                break;
            case 2:
                str = "成功";
                break;
            case 3:
                str = "失败";
                break;
        }
        this.label_name.string = str;
    },
    // "id": 1,  序号
    // "actualValue": "8.00000000”,到账值
    // "address": "fdsfewed”,地址
    // "arrivedTime": “”,到账时间
    // "createTime": "2022-01-24 10:55:58”,提现时间
    // "failedReason": "222222222”,失败原因
    // "poundage": "2.00000000”,手续费
    // "value": "10.00000000", 提现值
    // "withdrawStatus": 3,提现状态: 0->申请中; 1->确认中; 2->成功; 3->失败
    // "withdrawType": 1  地址类型 0为bep20 1为trx20
    // update (dt) {},
});
