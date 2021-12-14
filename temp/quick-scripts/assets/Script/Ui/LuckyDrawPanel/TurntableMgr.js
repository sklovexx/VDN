(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/LuckyDrawPanel/TurntableMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1d8b1mXi9VEd6NGyE5BVmaP', 'TurntableMgr', __filename);
// Script/Ui/LuckyDrawPanel/TurntableMgr.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        boolRandom: {
            default: false,
            displayName: "随机位置",
            tooltip: '确定结果区域后,是否在该区域内随机落下'
        },

        intTotalPrize: {
            default: 6,
            type: cc.Integer,
            displayName: "奖品/区域总数",
            tooltip: '游戏总奖品数'
        },

        intResultId: {
            default: 1,
            type: cc.Integer,
            displayName: "奖品/目标Id",
            tooltip: '中奖奖品'
        },

        floatAccelerated: {
            default: 360 * 2,
            type: cc.Float,
            displayName: "加速度",
            tooltip: '加速度值,每秒速度增加几度,°/s²'
        },

        floatDeceleration: {
            default: -270,
            type: cc.Float,
            displayName: "减速度",
            tooltip: '加速度值,每秒速度减少几度,°/s²'
        },

        floatMaxRangeSpeed: {
            default: 360 * 3,
            type: cc.Float,
            displayName: "最大速度",
            tooltip: '每秒速度减少几度,°/s'
        },
        item_name: [cc.Label],
        item_Prizename: [cc.Label],
        Panle: cc.Node,
        Panle2: cc.Node,
        Panle3: cc.Node,
        Panle4: cc.Node,
        winning_name: cc.Label,
        winning_Prizename: cc.Label,
        winning_icon: cc.Sprite,

        editBox_name: cc.EditBox,
        editBox_weixin: cc.EditBox,
        editBox_phone: cc.EditBox,
        label_mendian: cc.Label,

        selectItem: cc.Prefab,
        container_mendian: cc.Node,
        scroll_mendian: cc.Node,

        item_icon: [cc.Sprite]
    },

    onLoad: function onLoad() {},
    onEnable: function onEnable() {
        this.initProperties();
    },


    // 初始化属性
    initProperties: function initProperties() {
        this.Panle.active = false;
        this.Panle2.active = false;
        this.Panle3.active = false;
        this.Panle4.active = false;
        // 旋转角度范围
        this._range = 360;
        // 当前旋转速度
        this._currentRotationSpeed = 0;
        this.isLuckyDraw = true;
        // 目标角度
        this._targetRotation = 0;
        // 目标节点
        this._turntableBg = this.node.getChildByName("TurntableBg");

        this._turntableBg.angle = 0;
        // 说明节点
        // this._labExplain = this.node.getChildByName("LabExplain").getComponent(cc.Label);
        // this._labExplain.string = '初始化成功' 

        // 处理奖品Id
        if (this.intResultId <= 0 || this.intTotalPrize < this.intResultId || this.intTotalPrize <= 0) {}
        // this._labExplain.string = '区域总数或奖品Id不准确...'

        // 时间间隔
        this._interval = 0.02;
        this.updatePrizeList();
    },


    //获取抽奖列表
    updatePrizeList: function updatePrizeList() {
        var _this = this;

        Global.ProtocolMgr.queryPrizeList(function (res) {
            if (res.code == 200) {
                var data = res.data.list;
                _this.PrizeList = _this.ModifyPrizeList(data);

                var _loop = function _loop(i) {
                    cc.loader.load({ url: _this.PrizeList[i].good_img, type: 'png' }, function (err, res) {

                        _this.item_icon[i].spriteFrame = new cc.SpriteFrame(res);
                    });
                    _this.item_name[i].string = cc.js.formatStr("%s", _this.PrizeList[i].level);
                    _this.item_Prizename[i].string = _this.PrizeList[i].good_name;
                };

                for (var i = 0; i < _this.PrizeList.length; i++) {
                    _loop(i);
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },

    //修改数组
    ModifyPrizeList: function ModifyPrizeList(arr) {
        var empty = [];
        var data;
        var len = arr.length;
        for (var index = 0; index < 8; index++) {
            data = arr[index % len];
            empty.push(data);
        }
        // empty = this.UpsetArray(empty);
        return empty;
    },

    //打乱数组
    UpsetArray: function UpsetArray(arr) {
        var newArr = this.copyArray(arr);
        var randomNumber = function randomNumber() {
            return 0.5 - Math.random();
        };
        newArr.sort(randomNumber);
        return newArr;
    },


    //复制数组
    copyArray: function copyArray(arr) {
        return JSON.parse(JSON.stringify(arr));
    },
    getPrizeListData: function getPrizeListData(_id) {
        for (var index = 0; index < this.PrizeList.length; index++) {
            if (this.PrizeList[index].id == _id) {
                return index + 1;
            }
        }
    },


    /**
     * 随机函数
     * 方法: 将目标区域分为多个小块,随机落到除两边外其他位置(防止指针指到边上指示不明确)
     */
    onRandomPlace: function onRandomPlace() {
        var random = (Math.random() - 0.5) * this._range / (this.intTotalPrize + 2);
        return random;
    },


    // 开始
    onStart: function onStart() {
        var _this2 = this;

        if (!this.isLuckyDraw) {
            return;
        }
        // Global.PageMgr.showTipPage("每周六下午5点,官方统一抽奖",2); 
        // return;
        Global.ProtocolMgr.queryLuckDraw(function (res) {
            if (res.code == 200) {
                var data = res.data;
                _this2.LuckDrawdata = data;
                _this2.intResultId = _this2.getPrizeListData(data.yes_good_id);
                if (_this2._currentState == undefined || _this2._currentState == 0) {
                    _this2._currentState = 1; // 0:静止 1:加速 2减速
                    // this._turntableBg.rotation = 0;
                    _this2._turntableBg.angle = 0;
                } else {
                    // cc.log("转盘已经开始转动...");
                    _this2.isLuckyDraw = false;
                }
                _this2.schedule(_this2.updateRotation, _this2._interval);
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    onClickBreak: function onClickBreak() {
        this.Panle.active = false;
        this.isLuckyDraw = true;
    },

    // 暂停
    onStop: function onStop() {
        if (this._currentState == undefined || this._currentState == 0) {
            cc.log("转盘已经停止...");
        } else {
            // 当前状态静止
            cc.log("转盘已经停止2...");
            this.unschedule(this.updateRotation);
        }
    },


    // 计算开始减速时机
    onVirtualCompute: function onVirtualCompute() {
        // 虚拟转动角度
        var virtualRotationAngle = 0;
        // 虚拟角度速度
        var rotationSpeed = this.floatMaxRangeSpeed;
        while (rotationSpeed > 0) {
            virtualRotationAngle = virtualRotationAngle + rotationSpeed * this._interval;
            rotationSpeed = rotationSpeed + this._interval * this.floatDeceleration;
        }

        return virtualRotationAngle;
    },


    // 获取开始减速的时机 角度
    onGetValue: function onGetValue(targetRotation) {
        var temp = targetRotation - this.onVirtualCompute();
        if (temp > 0) {
            while (temp >= 360) {
                temp -= this._range;
            }
        } else {
            while (temp < 0) {
                temp += this._range;
            }
        }
        return temp;
    },


    /**
     * 转动检测
     */
    detectionAngle: function detectionAngle() {
        // 目标旋转角度
        var targetRotation = this._range / this.intTotalPrize * (this.intResultId - 1);
        if (this.boolRandom) {
            targetRotation += this.onRandomPlace();
        }
        var tempRotation = this.onGetValue(targetRotation);
        // this._turntableBg.rotation = tempRotation;
        this._turntableBg.angle = tempRotation;
        this._currentState = 2;
    },


    /**
     * 每一帧回调
     * @param {*}  
     */
    updateRotation: function updateRotation() {
        switch (this._currentState) {
            case 0:
                break;
            case 1:
                {
                    if (this._currentRotationSpeed >= this.floatMaxRangeSpeed) {
                        this._currentRotationSpeed = this.floatMaxRangeSpeed;
                        this.detectionAngle();
                    } else {
                        this._currentRotationSpeed += this.floatAccelerated * this._interval;
                    }
                }
                break;
            case 2:
                {
                    if (this._currentRotationSpeed <= 0) {
                        this._currentRotationSpeed = 0; //当前速度设置为 0rad/s
                        this._currentState = 0; //当前状态设置为 0

                        this.setTheWinning();
                    } else {
                        this._currentRotationSpeed += this.floatDeceleration * this._interval;
                    }
                }
                break;
            default:
                {
                    this._currentRotationSpeed = 0; //当前速度设置为 0rad/s
                    this._currentState = 0; //当前状态设置为 0
                }
                break;
        }
        var tempRotationSpeed = this._currentRotationSpeed * this._interval;
        // this._labExplain.string = this._labExplain.string + "\n当前转盘转动速度: " +  Math.round(this._currentRotationSpeed) + "°/s";
        // this._turntableBg.rotation += tempRotationSpeed;
        this._turntableBg.angle += tempRotationSpeed;
    },
    setTheWinning: function setTheWinning() {
        var _this3 = this;

        this.Panle.active = true;
        if (this.LuckDrawdata.is_win == 0) {
            this.Panle3.active = true;
        } else {
            this.Panle2.active = true;
            cc.loader.load({ url: this.LuckDrawdata.yes_goode_img, type: 'png' }, function (err, res) {

                _this3.winning_icon.spriteFrame = new cc.SpriteFrame(res);
            });
            this.winning_name.string = cc.js.formatStr("%s", this.LuckDrawdata.yes_good_name);
            this.winning_Prizename.string = this.LuckDrawdata.yes_goode_level;
        }
    },
    onClickToReceive: function onClickToReceive() {
        var _this4 = this;

        this.onClickMessagePanle(null, 1);
        this.Panle.active = false;

        Global.ProtocolMgr.queryGetPickUpLocation(function (res) {
            if (res.code == 200) {
                (function () {
                    var data = res.data;
                    _this4.container_mendian.removeAllChildren();

                    var _loop2 = function _loop2(i) {
                        var selectItem = cc.instantiate(_this4.selectItem);
                        selectItem.getComponent(cc.Label).string = data[i].address;
                        selectItem.on(cc.Node.EventType.TOUCH_END, function () {
                            _this4.label_mendian.string = data[i].address;
                            _this4.tid = data[i].id;
                            _this4.scroll_mendian.active = false;
                        });
                        _this4.container_mendian.addChild(selectItem);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop2(i);
                    }
                })();
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
        this.editBox_name.string = "";
        this.editBox_weixin.string = "";
        this.editBox_phone.string = "";
    },
    submit: function submit() {
        var _this5 = this;

        if (this.did == 0) {
            Global.PageMgr.showTipPage("还未选择门店");
            return;
        }
        if (this.editBox_name.string == "") {
            Global.PageMgr.showTipPage("还未填写姓名");
            return;
        }
        if (this.editBox_phone.string == "") {
            Global.PageMgr.showTipPage("还未填写手机号");
            return;
        }
        if (this.editBox_weixin.string == "") {
            Global.PageMgr.showTipPage("还未填写微信");
            return;
        }
        var reqData = {
            name: this.editBox_name.string,
            phone: this.editBox_phone.string,
            wx_number: this.editBox_weixin.string,
            lid: this.tid.toString()
        };
        console.log("选择的游戏是：" + this.tid.toString());
        Global.ProtocolMgr.queryReceivePrizes(reqData, function (res) {
            if (res.code == 200) {
                Global.PageMgr.showTipPage("提交成功");
                // Global.PageMgr.onClosePage(17);
                _this5.onClickMessagePanle(null, 0);
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    onClickMessagePanle: function onClickMessagePanle(event, customData) {
        var index = parseInt(customData);
        this.Panle4.active = index == 1 ? true : false;
    },
    showScroll: function showScroll(event, customData) {
        switch (customData) {
            case "mendian":
                this.scroll_mendian.active = true;
                break;
            default:
                break;
        }
    },

    /**
     * 统一回收组件
     */
    onDestroy: function onDestroy() {
        this.node.onDestroy();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=TurntableMgr.js.map
        