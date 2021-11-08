"use strict";
cc._RF.push(module, '4cd0ffQe75Ddod5dqnEgLHx', 'ShaderNameLabel');
// Script/components/ShaderNameLabel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderHelper_1 = require("./ShaderHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shaderHelper = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var _this = this;
        if (!this.shaderHelper) {
            return;
        }
        setTimeout(function () {
            var effectAsset = ShaderHelper_1.default.effectAssets[_this.shaderHelper.program];
            _this.getComponent(cc.Label).string = effectAsset.name;
        }, 1000);
    };
    __decorate([
        property(ShaderHelper_1.default)
    ], NewClass.prototype, "shaderHelper", void 0);
    NewClass = __decorate([
        ccclass,
        executeInEditMode
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();