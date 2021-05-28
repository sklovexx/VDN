import ResManager from "../../script/ResManager";
import { TURN_ON } from "../../script/Util";
import Singleton from "../Singleton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioMgr extends Singleton<AudioMgr>  {
    //记录播放的音效，防止短时间内重复播放
    private _effectArray: Array<string> = [];

    private _musicOnOff: string = "";
    private _effectOnOff: string = "";

    private _curBgmName: string = "";

    setMusicTURNON(musicOnOff) {
        this._musicOnOff = musicOnOff;
    }

    setEffectTURNON(effectOnOff) {
        this._effectOnOff = effectOnOff;
    }

    /** * 播放音乐 */
    public playMusic(name: string, loop = true) {
        this._curBgmName = name;
        if (this._musicOnOff == TURN_ON.OFF) return
        if (cc.audioEngine.isMusicPlaying()) cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(ResManager.getInstance().getAudioClipRes(name), loop);
    }

    public playCommonEffect(name: string, loop = false) {
        this.playEffectAudio("getCommonAudioClipRes", name, loop);
    }

    public playEffect(name: string, loop = false): number {
        return this.playEffectAudio("getAudioClipRes", name, loop);
    }

    private playEffectAudio(funName: string, audioName: string, loop = false) {
        if (this._effectOnOff == TURN_ON.OFF) return
        let index = this._effectArray.indexOf(audioName);
        if (index < 0) this._effectArray.push(audioName);
        else return
        let audioID = cc.audioEngine.playEffect(ResManager.getInstance()[funName](audioName), loop);
        setTimeout(() => { this._effectArray.splice(this._effectArray.indexOf(audioName), 1); }, 200);
        return audioID;
    }

    public stopEffect(audioID: number) {
        cc.audioEngine.stopEffect(audioID);
    }

    public pauseMusic() {
        cc.audioEngine.stopMusic();
    }

    public pauseEffects() {
        cc.audioEngine.stopAllEffects();
    }

    public resumeMusic() {
        this.playMusic(this._curBgmName);
        cc.audioEngine.resumeMusic();
    }

    public resumeEffects() {
        cc.audioEngine.resumeAllEffects();
    }
}

export let audioMgr = AudioMgr.getInstance();