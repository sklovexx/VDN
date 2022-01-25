(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/components/ShaderMouse.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0ed2cS4TFpGyo6y5mPlpF50', 'ShaderMouse', __filename);
// Script/components/ShaderMouse.ts

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
        //# sourceMappingURL=ShaderMouse.js.map
        