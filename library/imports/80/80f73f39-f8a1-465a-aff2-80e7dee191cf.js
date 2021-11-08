"use strict";
cc._RF.push(module, '80f7385+KFGWq/ygOfe4ZHP', 'ResourceMgr');
// Script/Manager/ResourceMgr.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bgAudioClip: {
            type: cc.AudioClip,
            default: null
        },
        loginAudioClip: {
            type: cc.AudioClip,
            default: null
        },
        hongBaoAudioClip: {
            type: cc.AudioClip,
            default: null
        },
        nongChangTexture: {
            type: cc.Texture2D,
            default: []
        },
        SlotTexture: {
            type: cc.Texture2D,
            default: []
        },
        tip: {
            type: cc.Prefab,
            default: null
        },
        Transition: {
            type: cc.Prefab,
            default: null
        },
        CarTexture: {
            type: cc.Texture2D,
            default: []
        },
        clickClip: {
            type: cc.AudioClip,
            default: null
        },
        winAudioClip: {
            type: cc.AudioClip,
            default: null
        },
        failAudioClip: {
            type: cc.AudioClip,
            default: null
        },
        slotClip: {
            type: cc.AudioClip,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        cc.game.addPersistRootNode(this.node);
    },
    playLoginAudio: function playLoginAudio() {
        // cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.loginAudioClip, true, 0.2 * (GameData.audio + 0));
    },

    //播放背景音樂
    playBgAudio: function playBgAudio() {
        // cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.bgAudioClip, true, 0.2 * (GameData.audio + 0));
    },

    //播放紅包背景音樂
    playHongBaoAudio: function playHongBaoAudio() {
        cc.audioEngine.pauseAll();
        cc.audioEngine.play(this.hongBaoAudioClip, true, 0.2 * (GameData.audio + 0));
    },

    //播放點擊音效
    playClickAudio: function playClickAudio() {
        cc.audioEngine.play(this.clickClip, false, 10 * (GameData.audio + 0));
    },
    playTransitionIn: function playTransitionIn() {
        var node = cc.instantiate(this.Transition);
        node.parent = cc.find('Canvas');
    }
}
// update (dt) {},
);

cc._RF.pop();