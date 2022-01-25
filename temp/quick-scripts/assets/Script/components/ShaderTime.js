(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/components/ShaderTime.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5866cn/yXtO664c25gnwSdk', 'ShaderTime', __filename);
// Script/components/ShaderTime.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        //# sourceMappingURL=ShaderTime.js.map
        