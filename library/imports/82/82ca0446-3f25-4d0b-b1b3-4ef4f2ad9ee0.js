"use strict";
cc._RF.push(module, '82ca0RGPyVNC7GzTvTyrZ7g', 'AudioMgr');
// NiuNiu/script/common/AudioMgr.js

/**
 * Created by skyxu on 2018/4/17.
 *
 * 用来管理音频的播放
 * 挂置在一个常驻节点上
 */

"use strict";

var DataMgr = require("./DataMgr");
var Utils = require("./UtilsOther");

cc.Class({
    extends: cc.Component,

    properties: {
        effNiu_0: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_1: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_2: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_3: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_4: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_5: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_6: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_7: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_8: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_9: {
            url: cc.AudioClip,
            default: null
        },
        effNiu_10: {
            url: cc.AudioClip, // 牛牛
            default: null
        },
        effNiu_11: {
            url: cc.AudioClip, // 银牛
            default: null
        },
        effNiu_12: {
            url: cc.AudioClip, // 四炸
            default: null
        },
        effNiu_13: {
            url: cc.AudioClip, // 五花牛
            default: null
        },
        effNiu_14: {
            url: cc.AudioClip, // 五小牛
            default: null
        },

        roomMusic: {
            url: cc.AudioClip,
            default: null
        },
        gameMusic: {
            url: cc.AudioClip,
            default: null
        },
        effFlyCoins: {
            url: cc.AudioClip,
            default: null
        },
        effFapai: {
            url: cc.AudioClip,
            default: null
        },
        effMdls: {
            url: cc.AudioClip,
            default: null
        },
        effKaipai: {
            url: cc.AudioClip,
            default: null
        },
        effBtnClose: {
            url: cc.AudioClip,
            default: null
        }
    },

    onLoad: function onLoad() {
        this._bgMusicID = null;
        this._lastBGM = null;
        this._setData = DataMgr.getInstance().settingObj;
        this._allEffects = [];

        GlobalNiuNiu.audioMgr = this;
    },

    /**
     *
     * @param efx {cc.AudioClip}
     * @param loop {Boolean} 循环
     */
    playEffect: function playEffect(efx, loop) {
        if (!this._setData.effectOn) return null;
        loop = loop !== undefined ? loop : false;
        var audioId = cc.audioEngine.play(efx, loop, this._setData.effectVol);
        this._allEffects.push(audioId);
        cc.audioEngine.setFinishCallback(audioId, this.onEffectPlayFinished.bind(this, audioId));
        return audioId;
    },

    /**
     *
     * @param audioId
     */
    stopEffect: function stopEffect(audioId) {
        if (audioId !== undefined && audioId !== null) {
            cc.audioEngine.stop(audioId);
            Utils.arrayRmObj(this._allEffects, audioId);
        }
    },

    stopAllEffects: function stopAllEffects() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._allEffects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var audioId = _step.value;

                cc.audioEngine.stop(audioId);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },

    pauseAllEffects: function pauseAllEffects() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this._allEffects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var audioId = _step2.value;

                cc.audioEngine.pause(audioId);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    },

    resumeAllEffects: function resumeAllEffects() {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this._allEffects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var audioId = _step3.value;

                cc.audioEngine.resume(audioId);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    },

    setEffectVolume: function setEffectVolume(vol) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = this._allEffects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var audioId = _step4.value;

                cc.audioEngine.setVolume(audioId, vol);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    },

    /**
     *
     * @param a {AudioID}
     * @param b
     */
    onEffectPlayFinished: function onEffectPlayFinished(a, b) {
        Utils.arrayRmObj(this._allEffects, a);
        cc.log("_allEffects:" + this._allEffects.length);
    },


    /**
     *
     * @param m {cc.AudioClip}
     */
    playMusic: function playMusic(m) {
        // mark: 必须优先保存，后面用来恢复播放
        this._lastBGM = m;

        if (!this._setData.musicOn) return;

        //todo 先暂停再播放
        if (this._bgMusicID !== null) {
            cc.audioEngine.stop(this._bgMusicID);
        }
        this._bgMusicID = cc.audioEngine.play(m, true, this._setData.musicVol);
    },

    getLastMusic: function getLastMusic() {
        return this._lastBGM;
    },

    playLastMusic: function playLastMusic() {
        if (!this._setData.musicOn) return;

        if (this._lastBGM) {
            //todo 先暂停再播放
            if (this._bgMusicID !== null) {
                cc.audioEngine.stop(this._bgMusicID);
            }
            this._bgMusicID = cc.audioEngine.play(this._lastBGM, true, this._setData.musicVol);
        }
    },

    stopMusic: function stopMusic() {
        if (this._bgMusicID === null) {
            return;
        }
        cc.audioEngine.stop(this._bgMusicID);
    },

    pauseMusic: function pauseMusic() {
        if (this._bgMusicID === null) {
            return;
        }
        cc.audioEngine.pause(this._bgMusicID);
    },

    resumeMusic: function resumeMusic() {
        if (this._bgMusicID === null) {
            return;
        }
        cc.audioEngine.resume(this._bgMusicID);
    },

    setMusicVolume: function setMusicVolume(vol) {
        if (this._bgMusicID === null) {
            return;
        }
        cc.audioEngine.setVolume(this._bgMusicID, vol);
    }
});

cc._RF.pop();