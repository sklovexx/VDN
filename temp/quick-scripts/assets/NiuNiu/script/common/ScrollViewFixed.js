(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/ScrollViewFixed.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6b10btYYwJF2J+YhWOd1Cea', 'ScrollViewFixed', __filename);
// NiuNiu/script/common/ScrollViewFixed.js

/**
 * 修改系统ScrollView，去除本身触摸事件，增加设置滚动越界距离
 * 触摸事件由外部传递过去（touchstart touchmove touchend touchcancle)
 */

"use strict";

cc.Class({
    extends: cc.ScrollView,
    properties: {
        maxBounceDistance: {
            tooltip: "允许超过边界的最大值",
            default: cc.v2(100, 100)
        },
        rate: {
            tooltip: "移动速率(0-1), 1表示跟随手指, 0表示不动",
            default: 1,
            max: 1,
            min: 0
        }
    },

    // mark 取消自身的触摸事件
    _registerEvent: function _registerEvent() {},
    _moveContent: function _moveContent(deltaMove, canStartBounceBack) {
        var adjustedMove = this._flattenVectorByDirection(deltaMove);
        var scaleFactor = cc.director.getContentScaleFactor();
        scaleFactor = 1;

        var newPosition = cc.pAdd(this.getContentPosition(), adjustedMove);
        var maxOffset = this.getMaxScrollOffset();

        newPosition.x = newPosition.x >= -maxOffset.x / 2 - this.maxBounceDistance.x * scaleFactor ? newPosition.x : -maxOffset.x / 2 - this.maxBounceDistance.x * scaleFactor;
        newPosition.x = newPosition.x <= maxOffset.x / 2 + this.maxBounceDistance.x * scaleFactor ? newPosition.x : maxOffset.x / 2 + this.maxBounceDistance.x * scaleFactor;
        newPosition.y = newPosition.y >= -maxOffset.y / 2 - this.maxBounceDistance.x * scaleFactor ? newPosition.y : -maxOffset.y / 2 - this.maxBounceDistance.x * scaleFactor;
        newPosition.y = newPosition.y <= maxOffset.y / 2 + this.maxBounceDistance.x * scaleFactor ? newPosition.y : maxOffset.y / 2 + this.maxBounceDistance.x * scaleFactor;

        this.setContentPosition(newPosition);

        var outOfBoundary = this._getHowMuchOutOfBoundary();
        this._updateScrollBar(outOfBoundary);

        if (this.elastic && canStartBounceBack) {
            this._startBounceBackIfNeeded();
        }
    },


    _handleMoveLogic: function _handleMoveLogic(touch) {
        var deltaMove = touch.getDelta();
        this._processDeltaMove(cc.pMult(deltaMove, this.rate));
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
        //# sourceMappingURL=ScrollViewFixed.js.map
        