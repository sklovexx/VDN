cc.Class({
    extends: cc.Component,

    properties: {
        boolRandom:{
            default : false,
            displayName : "随机位置",
            tooltip : '确定结果区域后,是否在该区域内随机落下'
        },

        intTotalPrize:{
            default : 6,
            type : cc.Integer,
            displayName : "奖品/区域总数",
            tooltip : '游戏总奖品数'
        },

        intResultId:{
            default : 1,
            type : cc.Integer,
            displayName : "奖品/目标Id",
            tooltip : '中奖奖品'
        },

        floatAccelerated:{
            default : 360 * 2,
            type : cc.Float,
            displayName : "加速度",
            tooltip : '加速度值,每秒速度增加几度,°/s²'
        },

        floatDeceleration:{
            default : -270,
            type : cc.Float,
            displayName : "减速度",
            tooltip : '加速度值,每秒速度减少几度,°/s²'
        },

        floatMaxRangeSpeed:{
            default : 360 * 3,
            type : cc.Float,
            displayName : "最大速度",
            tooltip : '每秒速度减少几度,°/s'
        }
    },

    // 初始化属性
    initProperties() {
        // 旋转角度范围
        this._range = 360;
        // 当前旋转速度
        this._currentRotationSpeed = 0; 
        // 目标角度
        this._targetRotation = 0;
        // 目标节点
        this._turntableBg = this.node.getChildByName("TurntableBg");
        // 说明节点
        // this._labExplain = this.node.getChildByName("LabExplain").getComponent(cc.Label);
        // this._labExplain.string = '初始化成功' 

        // 处理奖品Id
        if(this.intResultId <= 0 || this.intTotalPrize < this.intResultId || this.intTotalPrize <= 0)
        {
            // this._labExplain.string = '区域总数或奖品Id不准确...'
        }
        this.intResultId = this.intTotalPrize + 1 - this.intResultId ;
        // 时间间隔
        this._interval = 0.02;   
    },

    onLoad() {
        this.initProperties();
    },

    /**
     * 随机函数
     * 方法: 将目标区域分为多个小块,随机落到除两边外其他位置(防止指针指到边上指示不明确)
     */
    onRandomPlace() {
        cc.log("随机该区域内位置")
        var random = (Math.random() - 0.5) * this._range / (this.intTotalPrize + 2);
        return random;
    },

    // 开始
    onStart()
    {
        Global.PageMgr.showTipPage("每周六由官方统一抽奖",2); 
        return;
        if(this._currentState == undefined || this._currentState == 0)
        {
            this._currentState = 1; // 0:静止 1:加速 2减速
            this._turntableBg.rotation = 0;
        }else{
            // cc.log("转盘已经开始转动...");
        }
        this.schedule(this.updateRotation, this._interval);

    },

    // 暂停
    onStop()
    {
        if(this._currentState == undefined || this._currentState == 0)
        {
            cc.log("转盘已经停止...");
        }else{
            // 当前状态静止
            // this._labExplain.string = '转盘已经暂停...'
            this.unschedule(this.updateRotation);
        }
    },

    // 计算开始减速时机
    onVirtualCompute()
    {
        // 虚拟转动角度
        var virtualRotationAngle = 0;
        // 虚拟角度速度
        var rotationSpeed = this.floatMaxRangeSpeed;
        while(rotationSpeed > 0)
        {
            virtualRotationAngle = virtualRotationAngle + rotationSpeed * this._interval;
            rotationSpeed = rotationSpeed + this._interval * this.floatDeceleration;
        }

        return virtualRotationAngle;
    },

    // 获取开始减速的时机 角度
    onGetValue(targetRotation)
    {
        var temp = targetRotation - this.onVirtualCompute();
        if(temp > 0) {
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
    detectionAngle() {
        // 目标旋转角度
        var targetRotation = this._range / this.intTotalPrize * this.intResultId;
        if(this.boolRandom) {
            targetRotation += this.onRandomPlace();
        }
        var tempRotation = this.onGetValue(targetRotation);
        this._turntableBg.rotation = tempRotation;
        this._currentState = 2;
    },

    /**
     * 每一帧回调
     * @param {*}  
     */
    updateRotation() {
        switch (this._currentState) {
            case 0:
                // this._labExplain.string = '静止中...'
                break;
            case 1:
                {
                    if(this._currentRotationSpeed >= this.floatMaxRangeSpeed)
                    {
                        // this._labExplain.string = '速度到达顶峰...'
                        this._currentRotationSpeed = this.floatMaxRangeSpeed;

                        this.detectionAngle();
                    }else
                    {
                        this._currentRotationSpeed += this.floatAccelerated * this._interval;
                        // this._labExplain.string = '加速中...'
                    }
                }
                break;
            case 2:
                {
                    if(this._currentRotationSpeed <= 0)
                    {
                        // this._labExplain.string = '速度到减为0...'

                        this._currentRotationSpeed = 0; //当前速度设置为 0rad/s
                        this._currentState = 0;         //当前状态设置为 0
                    }else{
                        // this._labExplain.string = '减速中...'

                        this._currentRotationSpeed += this.floatDeceleration * this._interval;
                    }
                }
                break;
            default:
                {
                    // this._labExplain.string = '未知定义状态,强行停止旋转...'

                    this._currentRotationSpeed = 0; //当前速度设置为 0rad/s
                    this._currentState = 0;         //当前状态设置为 0
                }
                break;
        }
        cc.log("当前旋转速度 : ",this._currentRotationSpeed);

        var tempRotationSpeed = this._currentRotationSpeed * this._interval;
        cc.log("当前转盘转动速度" + tempRotationSpeed + "°/" + this._interval + "s");

        // this._labExplain.string = this._labExplain.string + "\n当前转盘转动速度: " +  Math.round(this._currentRotationSpeed) + "°/s";
        this._turntableBg.rotation += tempRotationSpeed;
    },

    /**
     * 统一回收组件
     */
    onDestroy() {
        this.node.onDestroy();
    }
});