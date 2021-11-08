"use strict";
cc._RF.push(module, '0ed2cS4TFpGyo6y5mPlpF50', 'ShaderMouse');
// Script/components/ShaderMouse.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode;
var Shader = /** @class */ (function (_super) {
    __extends(Shader, _super);
    function Shader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shader.prototype.onLoad = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on('effect-changed', function (sender, material) {
            if (material.effect._properties.iResolution) {
                var size = _this.node.getBoundingBox().size;
                material.effect.setProperty('iResolution', cc.v2(size.width, size.height));
                _this._material = material;
            }
            else {
                _this._material = null;
            }
        }, this);
    };
    Shader.prototype.onDestroy = function () {
        this.node.targetOff(this);
    };
    Shader.prototype._onTouchMove = function (event) {
        if (this._material) {
            this._material.effect.setProperty('mouse', event.getLocation());
        }
    };
    Shader = __decorate([
        ccclass,
        executeInEditMode
    ], Shader);
    return Shader;
}(cc.Component));
exports.default = Shader;

cc._RF.pop();