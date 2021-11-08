"use strict";
cc._RF.push(module, '5866cn/yXtO664c25gnwSdk', 'ShaderTime');
// Script/components/ShaderTime.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShaderTime = /** @class */ (function (_super) {
    __extends(ShaderTime, _super);
    function ShaderTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._max = 65535;
        _this._start = 0;
        return _this;
    }
    Object.defineProperty(ShaderTime.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = value;
            if (!CC_EDITOR) {
                return;
            }
            var sprite = this.node.getComponent(cc.Sprite);
            if (sprite) {
                this._material = this.getComponent(cc.Sprite).sharedMaterials[0];
                if (this._material.effect._properties.time) {
                    var material = sprite.sharedMaterials[0];
                    material.effect.setProperty('time', value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ShaderTime.prototype.update = function (dt) {
        this._material = this.node.getComponent(cc.Sprite).sharedMaterials[0];
        if (this.node.active && this._material && this._material.effect._properties.time) {
            this._setShaderTime(dt);
        }
    };
    ShaderTime.prototype._setShaderTime = function (dt) {
        var start = this._start;
        if (start > this.max)
            start = 0;
        start += 0.02;
        this._material.effect.setProperty('time', start);
        this._start = start;
    };
    __decorate([
        property
    ], ShaderTime.prototype, "_max", void 0);
    __decorate([
        property
    ], ShaderTime.prototype, "max", null);
    ShaderTime = __decorate([
        ccclass
    ], ShaderTime);
    return ShaderTime;
}(cc.Component));
exports.default = ShaderTime;

cc._RF.pop();