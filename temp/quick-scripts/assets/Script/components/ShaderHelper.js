(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/components/ShaderHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '49d0auleM9GkaUgf+inMFoR', 'ShaderHelper', __filename);
// Script/components/ShaderHelper.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
var ShaderProperty = /** @class */ (function () {
    function ShaderProperty() {
        this.key = '';
        this.value = 0.0;
    }
    __decorate([
        property({ readonly: true })
    ], ShaderProperty.prototype, "key", void 0);
    __decorate([
        property(cc.Float)
    ], ShaderProperty.prototype, "value", void 0);
    ShaderProperty = __decorate([
        ccclass('ShaderProperty')
    ], ShaderProperty);
    return ShaderProperty;
}());
exports.ShaderProperty = ShaderProperty;
;
var ShaderEnum = cc.Enum({});
var ShaderHelper = /** @class */ (function (_super) {
    __extends(ShaderHelper, _super);
    function ShaderHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //枚举Shader程序
        _this._program = 0;
        //shader参数
        _this._props = [];
        //材质对象
        _this.material = null;
        return _this;
    }
    ShaderHelper_1 = ShaderHelper;
    Object.defineProperty(ShaderHelper.prototype, "program", {
        get: function () {
            return this._program;
        },
        set: function (value) {
            if (this._program === value) {
                return;
            }
            this._program = value;
            this.applyEffect();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderHelper.prototype, "props", {
        get: function () {
            return this._props;
        },
        set: function (value) {
            this._props = value;
            this.applyEffect();
        },
        enumerable: true,
        configurable: true
    });
    ShaderHelper.prototype.start = function () {
        if (CC_EDITOR) {
            setTimeout(function () {
                // this.applyEffect();
            }, 1000);
        }
        else {
            // this.applyEffect();
        }
        //this.node.on(cc.Node.EventType.TOUCH_END, this.next, this);
    };
    ShaderHelper.prototype.applyEffect = function (program) {
        //获取精灵组件
        var sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }
        // let effectAsset = ShaderHelper.effectAssets[this.program];
        var effectAsset = ShaderHelper_1.effectAssets[program];
        //实例化一个材质对象
        var material = new cc.Material();
        //在材质对象上开启USE_TEXTURE定义
        var defineUserTexture = !!effectAsset.shaders.find(function (shader) { return shader.defines.find(function (def) { return def.name === 'USE_TEXTURE'; }); });
        if (defineUserTexture) {
            material.define('USE_TEXTURE', true);
        }
        //为材质设置effect，也是就绑定Shader了
        material.effectAsset = effectAsset;
        material.name = effectAsset.name;
        //将材质绑定到精灵组件上，精灵可以绑定多个材质
        //这里我们替换0号默认材质
        sprite.setMaterial(0, material);
        //从精灵组件上获取材质，这步很重要，不然没效果
        this.material = sprite.getMaterial(0);
        this.setProperty(effectAsset);
        this.node.emit('effect-changed', this, this.material);
    };
    ShaderHelper.prototype.setProperty = function (effectAsset) {
        var _this = this;
        if (CC_EDITOR) {
            var oldProps = this._props;
            this._props = [];
            var keys = Object.keys(effectAsset._effect._properties);
            //@ts-ignore
            var values = Object.values(effectAsset._effect._properties);
            var _loop_1 = function (i) {
                var value = values[i].value;
                var key = keys[i];
                var type = values[i].type;
                if (value !== null && (type === 4 || type === 13)) {
                    var oldItem = oldProps.find(function (item) { return item.key === key; });
                    if (oldItem) {
                        value = oldItem.value;
                    }
                    var sp = new ShaderProperty();
                    sp.key = key;
                    sp.value = typeof (value) === 'object' ? value[0] : value;
                    this_1._props.push(sp);
                }
            };
            var this_1 = this;
            for (var i = 0; i < values.length; i++) {
                _loop_1(i);
            }
            // setTimeout(() => {
            var shaderTimer = this.getComponent('ShaderTime');
            //cc.log(shaderTimer.max);
            if (shaderTimer) {
                shaderTimer.max = shaderTimer.max;
            }
            //}, 1000);
        }
        if (this._props.length) {
            this._props.forEach(function (item) { return item.key && _this.material.setProperty(item.key, item.value || 0); });
        }
        // @ts-ignore
        cc.Class.Attr.setClassAttr(ShaderHelper_1, 'props', 'visible', !!this._props.length);
    };
    ShaderHelper.prototype.next = function () {
        this.program = (this.program + 1) % ShaderHelper_1.effectAssets.length;
    };
    ShaderHelper.prototype.prev = function () {
        if (this.program === 0) {
            this.program = ShaderHelper_1.effectAssets.length - 1;
            return;
        }
        this.program = (this.program - 1) % ShaderHelper_1.effectAssets.length;
    };
    var ShaderHelper_1;
    //effect的数组
    ShaderHelper.effectAssets = null;
    __decorate([
        property
    ], ShaderHelper.prototype, "_program", void 0);
    __decorate([
        property({ type: ShaderEnum })
    ], ShaderHelper.prototype, "program", null);
    __decorate([
        property({ type: [ShaderProperty] })
    ], ShaderHelper.prototype, "_props", void 0);
    __decorate([
        property({ type: [ShaderProperty] })
    ], ShaderHelper.prototype, "props", null);
    ShaderHelper = ShaderHelper_1 = __decorate([
        ccclass,
        executeInEditMode
    ], ShaderHelper);
    return ShaderHelper;
}(cc.Component));
exports.default = ShaderHelper;
cc.game.on(cc.game.EVENT_ENGINE_INITED, function () {
    cc.dynamicAtlasManager.enabled = false;
    cc.loader.loadResDir('effect', cc.EffectAsset, function (error, res) {
        ShaderHelper.effectAssets = res;
        var array = ShaderHelper.effectAssets.map(function (item, i) {
            return { name: item._name, value: i };
        });
        //@ts-ignore
        cc.Class.Attr.setClassAttr(ShaderHelper, 'program', 'enumList', array);
    });
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
        //# sourceMappingURL=ShaderHelper.js.map
        