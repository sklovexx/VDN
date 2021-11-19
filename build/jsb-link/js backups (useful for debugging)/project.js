window.__require = function e(t, n, i) {
function a(r, c) {
if (!n[r]) {
if (!t[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (o) return o(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var u = n[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return a(t[r][1][e] || e);
}, u, u.exports, e, t, n, i);
}
return n[r].exports;
}
for (var o = "function" == typeof __require && __require, r = 0; r < i.length; r++) a(i[r]);
return a;
}({
AchievementData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fcf9elNP8RP2L8nsFohp9LI", "AchievementData");
var i = e("./../common/UtilsOther"), a = cc.Class({
extends: cc.Class,
name: "AchievementData",
ctor: function() {
this.id = -1;
this.type = -1;
this.order = -1;
this.condition = -1;
this.desc = "";
this.reward = 0;
}
});
a._jsonData = null;
a.achieveData = [];
a.setData = function(e) {
a._jsonData = e;
};
a.initData = function() {
if (a._jsonData) {
for (var e = a._jsonData.pop().type.split(",").map(function(e) {
return parseInt(e);
}), t = 0; t < e.length; t++) {
for (var n, o = 0, r = 0; r < t; r++) o += e[r];
n = o + e[t];
var c = [], s = a._jsonData.slice(o, n), l = !0, u = !1, d = void 0;
try {
for (var h, g = s[Symbol.iterator](); !(l = (h = g.next()).done); l = !0) {
var f = h.value, p = new a();
i.clone(f, p);
for (var m in p) p.hasOwnProperty(m) && (p[m] = "desc" === m ? p[m].toString() : parseInt(p[m]));
c.push(p);
}
} catch (e) {
u = !0;
d = e;
} finally {
try {
!l && g.return && g.return();
} finally {
if (u) throw d;
}
}
a.achieveData.push(c);
}
delete a._jsonData;
}
};
cc._RF.pop();
}, {
"./../common/UtilsOther": "UtilsOther"
} ],
AlertBindFBCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bc276DH0slIioDEKLzoOj1x", "AlertBindFBCtrl");
var i = e("./../common/ViewBase"), a = (e("./../common/DataMgr"), e("./../common/UtilsOther"));
cc.Class({
extends: i,
properties: {
btnLogin: cc.Button,
btnCollect: cc.Button,
btnClose: cc.Button,
labelCoins: cc.Label,
_showType: 0,
showType: {
type: cc.Integer,
set: function(e) {
this.setType(e);
},
get: function() {
return this._showType;
}
}
},
setType: function(e) {
this._showType = e;
var t = !1;
e <= 0 && (t = !0);
this.btnLogin.node.active = t;
this.btnClose.node.active = t;
this.btnCollect.node.active = !t;
},
onLoad: function() {
this.labelCoins.string = "+" + a.getThousandSeparatorString(GlobalNiuNiu.config.BIND_FB_COINS);
},
onEnable: function() {
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
},
onDisable: function() {
GlobalNiuNiu.eventMgr.off(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
},
onBindFbSuc: function() {
this.setType(1);
},
onBtnLoginFb: function() {
GlobalNiuNiu.gameMgr.loginFb(!0);
},
onBtnCollect: function() {
GlobalNiuNiu.uiUpdater.updateUserCoins();
this.onBtnClose();
}
});
cc._RF.pop();
}, {
"./../common/DataMgr": "DataMgr",
"./../common/UtilsOther": "UtilsOther",
"./../common/ViewBase": "ViewBase"
} ],
Algo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d18ccVTPSlPKasd+dtGaYsS", "Algo");
var i = {
cipher: function(e, t) {
for (var n = t.length / 4 - 1, a = [ [], [], [], [] ], o = 0; o < 16; o++) a[o % 4][Math.floor(o / 4)] = e[o];
a = i.addRoundKey(a, t, 0, 4);
for (var r = 1; r < n; r++) {
a = i.subBytes(a, 4);
a = i.shiftRows(a, 4);
a = i.mixColumns(a, 4);
a = i.addRoundKey(a, t, r, 4);
}
a = i.subBytes(a, 4);
a = i.shiftRows(a, 4);
a = i.addRoundKey(a, t, n, 4);
for (var c = new Array(16), s = 0; s < 16; s++) c[s] = a[s % 4][Math.floor(s / 4)];
return c;
},
keyExpansion: function(e) {
for (var t = e.length / 4, n = t + 6, a = new Array(4 * (n + 1)), o = new Array(4), r = 0; r < t; r++) {
var c = [ e[4 * r], e[4 * r + 1], e[4 * r + 2], e[4 * r + 3] ];
a[r] = c;
}
for (var s = t; s < 4 * (n + 1); s++) {
a[s] = new Array(4);
for (var l = 0; l < 4; l++) o[l] = a[s - 1][l];
if (s % t == 0) {
o = i.subWord(i.rotWord(o));
for (var u = 0; u < 4; u++) o[u] ^= i.rCon[s / t][u];
} else t > 6 && s % t == 4 && (o = i.subWord(o));
for (var d = 0; d < 4; d++) a[s][d] = a[s - t][d] ^ o[d];
}
return a;
},
subBytes: function(e, t) {
for (var n = 0; n < 4; n++) for (var a = 0; a < t; a++) e[n][a] = i.sBox[e[n][a]];
return e;
},
shiftRows: function(e, t) {
for (var n = new Array(4), i = 1; i < 4; i++) {
for (var a = 0; a < 4; a++) n[a] = e[i][(a + i) % t];
for (var o = 0; o < 4; o++) e[i][o] = n[o];
}
return e;
},
mixColumns: function(e, t) {
for (var n = 0; n < 4; n++) {
for (var i = new Array(4), a = new Array(4), o = 0; o < 4; o++) {
i[o] = e[o][n];
a[o] = 128 & e[o][n] ? e[o][n] << 1 ^ 283 : e[o][n] << 1;
}
e[0][n] = a[0] ^ i[1] ^ a[1] ^ i[2] ^ i[3];
e[1][n] = i[0] ^ a[1] ^ i[2] ^ a[2] ^ i[3];
e[2][n] = i[0] ^ i[1] ^ a[2] ^ i[3] ^ a[3];
e[3][n] = i[0] ^ a[0] ^ i[1] ^ i[2] ^ a[3];
}
return e;
},
addRoundKey: function(e, t, n, i) {
for (var a = 0; a < 4; a++) for (var o = 0; o < i; o++) e[a][o] ^= t[4 * n + o][a];
return e;
},
subWord: function(e) {
for (var t = 0; t < 4; t++) e[t] = i.sBox[e[t]];
return e;
},
rotWord: function(e) {
for (var t = e[0], n = 0; n < 3; n++) e[n] = e[n + 1];
e[3] = t;
return e;
},
sBox: [ 99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22 ],
rCon: [ [ 0, 0, 0, 0 ], [ 1, 0, 0, 0 ], [ 2, 0, 0, 0 ], [ 4, 0, 0, 0 ], [ 8, 0, 0, 0 ], [ 16, 0, 0, 0 ], [ 32, 0, 0, 0 ], [ 64, 0, 0, 0 ], [ 128, 0, 0, 0 ], [ 27, 0, 0, 0 ], [ 54, 0, 0, 0 ] ]
};
"undefined" != typeof t && t.exports && (t.exports = i);
"function" == typeof define && define.amd && define([], function() {
return i;
});
cc._RF.pop();
}, {} ],
ArderPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "88bc9XXEwZE3ae2QSgM9Ms2", "ArderPanel");
var i = e("../../Util/appScript");
cc.Class({
extends: cc.Component,
properties: {
icon_logo: [ cc.Sprite ],
arfer_item: cc.Prefab,
container: cc.Node,
game_item2: cc.Prefab,
container2: cc.Node,
Panle: cc.Node,
Panle2: cc.Node,
Panle3: cc.Node,
label_Usdt: cc.Label,
lable_id: cc.Label,
lable_name: cc.Label,
lable_pic: cc.Label,
lable_limit: cc.Label,
lable_gold: cc.Label,
lable_sum: cc.Label,
editBox_id: cc.EditBox,
editBox_name: cc.EditBox,
btn_skip: cc.Sprite,
label_description: [ cc.Label ]
},
onLoad: function() {
Global.ProtocolMgr.queryUserData();
},
onEnable: function() {
var e = this;
this.goSetlectLieFallowPanle();
i.Post("member/getMemberInfo", {}, function(t) {
200 == t.code && t.data && (e.label_Usdt.string = t.data.totalUsdt);
});
},
breakSetlectLieFallowPanle: function(e, t) {
this.goSetlectLieFallowPanle();
},
goGamePanelUI: function(e) {
var t = this;
this.Panle.active = !1;
this.Panle2.active = !0;
this.Panle3.active = !1;
this.datas = e;
this.container2.removeAllChildren();
Global.ProtocolMgr.queryGameList(1, 2, function(e) {
if (200 == e.code) for (var n = e.data, i = 0; i < n.length; i++) {
var a = cc.instantiate(t.game_item2);
a.getComponent("game_item").setData(n[i], t.goEnterGamePanel);
t.container2.addChild(a);
} else Global.PageMgr.showTipPage(e.message);
});
},
onClickSkip: function() {
this.goGamePanelUI(null);
},
goEnterGamePanel: function(e, t) {
var n = Global.PageMgr.pages[8].getComponent("ArderPanel");
n.datas2 = t;
if (null != this.selectData) {
n.Panle.active = !1;
n.Panle2.active = !1;
n.Panle3.active = !0;
n.bundleId = cc.js.formatStr("1,%s,%s", t.game_package_name, t.game_web_link);
n.lable_pic.string = cc.js.formatStr("%s", parseFloat(n.datas.ticket).toFixed(3));
n.lable_gold.string = cc.js.formatStr("%s钻", parseFloat(window.DEFAULT_availableUsdt).toFixed(3));
n.lable_limit.string = t.number_limit;
"0" == t.number_limit && (n.lable_limit.string = "无限");
n.dianjiSum = 0;
n.lable_sum.string = "" + n.dianjiSum;
} else {
var i = cc.js.formatStr("1,%s,%s", n.datas2.game_package_name, n.datas2.game_web_link);
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", i);
}
},
goSetlectLieFallowPanle: function() {
var e = this;
this.Panle.active = !0;
this.Panle2.active = !1;
this.Panle3.active = !1;
this.container.removeAllChildren();
Global.ProtocolMgr.queryLieFallowList(1, function(t) {
if (200 == t.code) for (var n = t.data, i = 0; i < n.length; i++) {
var a = cc.instantiate(e.arfer_item);
a.getComponent("Arder_Item").setData(n[i]);
e.container.addChild(a);
} else Global.PageMgr.showTipPage(t.message);
});
},
setPageData: function(e) {
for (var t = this, n = this.curPageData = this.pageData[parseInt(e.target.name)], i = function(e) {
"" != n[e].logo ? cc.loader.loadRes("imgs/" + n[e].logo, cc.SpriteFrame, function(n, i) {
n || (t.icon_logo[e].spriteFrame = i);
}) : t.icon_logo[e].spriteFrame = null;
t.label_description[e].string = n[e].description;
"尽请期待" == n[e].description ? t.label_description[e].node.opacity = 178 : t.label_description[e].node.opacity = 255;
}, a = 0; a < n.length; a++) i(a);
},
jumpTo: function(e, t) {},
breakPanle: function(e, t) {
this.Panle.active = !1;
this.Panle2.active = !0;
this.Panle3.active = !1;
},
sinceIncrease: function() {
this.dianjiSum < 100 && (this.dianjiSum += 1);
this.lable_sum.string = "" + this.dianjiSum;
},
sinceReduction: function() {
this.dianjiSum > 1 && (this.dianjiSum -= 1);
this.lable_sum.string = "" + this.dianjiSum;
},
submitMessage: function() {
var e = this;
if (this.dianjiSum <= 0) Global.PageMgr.showTipPage("门票不能小于1"); else if (window.DEFAULT_availableUsdt < this.dianjiSum * (parseInt(1e3 * this.datas.ticket) / 1e3)) Global.PageMgr.showTipPage("钻不够请充值"); else {
var t = {
game_id: this.datas2.id,
sg_id: this.datas.id,
number: "" + this.dianjiSum
};
Global.ProtocolMgr.startLeisureGame(t, function(t) {
console.log(t);
if (3001 != t.code) {
n.data;
if (!e.curPageData[parseInt(customData)] || !e.curPageData[parseInt(customData)].bundleId) return;
var n = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", e.bundleId);
n || Global.PageMgr.showTipPage("跳转失败");
} else Global.PageMgr.showTipPage(t.message);
});
}
}
});
cc._RF.pop();
}, {
"../../Util/appScript": "appScript"
} ],
Arder_Item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "79c6dD2xEBPZKCAuQ5YfZ0E", "Arder_Item");
cc.Class({
extends: cc.Component,
properties: {
icon_pic: cc.Sprite,
label_name: cc.Label,
label_menpiao: cc.Label,
label_pic: cc.Label,
label_fee: cc.Label,
propId: 1
},
start: function() {},
setData: function(e) {
var t = this;
try {
cc.loader.loadRes("imgs/bg" + e.id, cc.SpriteFrame, function(e, n) {
e || (t.icon_pic.spriteFrame = n);
});
} catch (e) {
console.warn(e);
}
console.log(e);
this.propId = e.id;
this.label_name.string = e.grade_field_name;
this.label_pic.string = cc.js.formatStr("%s个星钻\n每局胜奖励负扣减%s", parseFloat(e.crystal_quantity).toFixed(1), parseFloat(e.reward).toFixed(4));
this.label_menpiao.string = cc.js.formatStr("门票:%s", parseFloat(e.ticket).toFixed(4));
this.datas = e;
},
buy: function() {
window.DEFAULT_availableUsdt >= parseInt(this.datas.crystal_quantity) ? Global.PageMgr.pages[8].getComponent("ArderPanel").goGamePanelUI(this.datas) : Global.PageMgr.showTipPage(cc.js.formatStr("星钻不足%s", parseFloat(this.datas.crystal_quantity).toFixed(1)));
}
});
cc._RF.pop();
}, {} ],
AssetMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e9840SFrGVL6b/gAnf9irV8", "AssetMgr");
cc.Class({
extends: cc.Component,
properties: {
settingPrefab: cc.Prefab,
shopPrefab: cc.Prefab,
dialogPrefab: cc.Prefab,
toastPrefab: cc.Prefab,
cardPrefab: cc.Prefab,
modeSelPre: cc.Prefab
},
onLoad: function() {
cc.game.addPersistRootNode(this.node);
GlobalNiuNiu.assetMgr = this;
this.setAutoRelease(!0);
},
setAutoRelease: function(e) {},
releaseGameRes: function() {}
});
cc._RF.pop();
}, {} ],
AudioMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "82ca0RGPyVNC7GzTvTyrZ7g", "AudioMgr");
var i = e("./DataMgr"), a = e("./UtilsOther");
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
url: cc.AudioClip,
default: null
},
effNiu_11: {
url: cc.AudioClip,
default: null
},
effNiu_12: {
url: cc.AudioClip,
default: null
},
effNiu_13: {
url: cc.AudioClip,
default: null
},
effNiu_14: {
url: cc.AudioClip,
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
onLoad: function() {
this._bgMusicID = null;
this._lastBGM = null;
this._setData = i.getInstance().settingObj;
this._allEffects = [];
GlobalNiuNiu.audioMgr = this;
},
playEffect: function(e, t) {
if (!this._setData.effectOn) return null;
t = void 0 !== t && t;
var n = cc.audioEngine.play(e, t, this._setData.effectVol);
this._allEffects.push(n);
cc.audioEngine.setFinishCallback(n, this.onEffectPlayFinished.bind(this, n));
return n;
},
stopEffect: function(e) {
if (void 0 !== e && null !== e) {
cc.audioEngine.stop(e);
a.arrayRmObj(this._allEffects, e);
}
},
stopAllEffects: function() {
var e = !0, t = !1, n = void 0;
try {
for (var i, a = this._allEffects[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
var o = i.value;
cc.audioEngine.stop(o);
}
} catch (e) {
t = !0;
n = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw n;
}
}
},
pauseAllEffects: function() {
var e = !0, t = !1, n = void 0;
try {
for (var i, a = this._allEffects[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
var o = i.value;
cc.audioEngine.pause(o);
}
} catch (e) {
t = !0;
n = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw n;
}
}
},
resumeAllEffects: function() {
var e = !0, t = !1, n = void 0;
try {
for (var i, a = this._allEffects[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
var o = i.value;
cc.audioEngine.resume(o);
}
} catch (e) {
t = !0;
n = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw n;
}
}
},
setEffectVolume: function(e) {
var t = !0, n = !1, i = void 0;
try {
for (var a, o = this._allEffects[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var r = a.value;
cc.audioEngine.setVolume(r, e);
}
} catch (e) {
n = !0;
i = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (n) throw i;
}
}
},
onEffectPlayFinished: function(e, t) {
a.arrayRmObj(this._allEffects, e);
cc.log("_allEffects:" + this._allEffects.length);
},
playMusic: function(e) {
this._lastBGM = e;
if (this._setData.musicOn) {
null !== this._bgMusicID && cc.audioEngine.stop(this._bgMusicID);
this._bgMusicID = cc.audioEngine.play(e, !0, this._setData.musicVol);
}
},
getLastMusic: function() {
return this._lastBGM;
},
playLastMusic: function() {
if (this._setData.musicOn && this._lastBGM) {
null !== this._bgMusicID && cc.audioEngine.stop(this._bgMusicID);
this._bgMusicID = cc.audioEngine.play(this._lastBGM, !0, this._setData.musicVol);
}
},
stopMusic: function() {
null !== this._bgMusicID && cc.audioEngine.stop(this._bgMusicID);
},
pauseMusic: function() {
null !== this._bgMusicID && cc.audioEngine.pause(this._bgMusicID);
},
resumeMusic: function() {
null !== this._bgMusicID && cc.audioEngine.resume(this._bgMusicID);
},
setMusicVolume: function(e) {
null !== this._bgMusicID && cc.audioEngine.setVolume(this._bgMusicID, e);
}
});
cc._RF.pop();
}, {
"./DataMgr": "DataMgr",
"./UtilsOther": "UtilsOther"
} ],
AutoScaleFixedWidth: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6cbbe/s0lpIH6mU4AAT2kP6", "AutoScaleFixedWidth");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = cc.Canvas.instance.designResolution, t = cc.director.getWinSize().width / e.width;
t = Math.min(1, t);
this.node.scaleX *= t;
this.node.scaleY *= t;
}
});
cc._RF.pop();
}, {} ],
BaoMingPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5cc0aPY98ZNQ4nRAH9o+Jcn", "BaoMingPanel");
cc.Class({
extends: cc.Component,
properties: {
label_saiqu: cc.Label,
editBox_zhandui: cc.EditBox,
editBox_name: cc.EditBox,
editBox_card: cc.EditBox,
editBox_phone: cc.EditBox,
editBox_email: cc.EditBox,
selectItem: cc.Prefab,
container_saiqu: cc.Node,
container_zhandui: cc.Node,
scroll_saiqu: cc.Node,
Panle: cc.Node,
Panle2: cc.Node,
Panle3: cc.Node,
Panle4: cc.Node,
label_email: cc.Label,
label_name: cc.Label,
label_zhandui: cc.Label,
label_saiqu2: cc.Label,
label_dianhua: cc.Label,
label_zhengjian: cc.Label,
label_gamename: cc.Label,
game_item: cc.Prefab,
container: cc.Node,
scroll_zhandui: cc.Node
},
start: function() {},
onEnable: function() {
this.showDivisionRegistrationRanking();
},
showDivisionRegistrationRanking: function() {
var e = this;
this.Panle.active = !1;
this.Panle2.active = !1;
this.Panle3.active = !0;
this.Panle4.active = !1;
this.container.removeAllChildren();
Global.ProtocolMgr.queryGetGameSignRank(function(t) {
console.log(t);
if (200 == t.code) for (var n = t.data, i = 0; i < n.length; i++) {
var a = cc.instantiate(e.game_item);
a.getComponent("BaoMing_Item").setData(n[i]);
e.container.addChild(a);
} else Global.PageMgr.showTipPage(t.message);
});
},
showApplyForTeamInformation: function() {
var e = this;
this.Panle.active = !1;
this.Panle2.active = !0;
this.Panle3.active = !1;
Global.ProtocolMgr.queryGetSignUPInfo(function(t) {
if (200 == t.code) {
var n = t.data;
if (n) {
e.label_email.string = n.email;
e.label_name.string = n.name;
e.label_zhandui.string = n.team_name;
e.label_saiqu2.string = n.division_name;
e.label_gamename.string = n.id_card_number;
e.label_dianhua.string = n.phone;
}
} else e.showApplyForTeam();
});
},
showApplyForTeam: function() {
var e = this;
this.Panle.active = !0;
this.Panle2.active = !1;
this.scroll_saiqu.active = !1;
this.scroll_zhandui.active = !1;
this.container_saiqu.removeAllChildren();
this.container_zhandui.removeAllChildren();
this.did = 0;
this.tid = 0;
this.label_saiqu.string = "选择赛区";
this.label_zhengjian.string = "比赛项目";
this.editBox_name.string = "";
this.editBox_email.string = "";
this.editBox_phone.string = "";
this.editBox_card.string = "";
this.editBox_zhandui.string = "";
Global.ProtocolMgr.queryDivisionList(function(t) {
200 == t.code ? function() {
var n = t.data;
console.log(n);
e.container_saiqu.removeAllChildren();
for (var i = function(t) {
var i = cc.instantiate(e.selectItem);
i.getComponent(cc.Label).string = n[t].division_name;
i.on(cc.Node.EventType.TOUCH_END, function() {
e.label_saiqu.string = n[t].division_name;
e.did = n[t].id;
console.log(e.did);
e.closeScroll();
});
e.container_saiqu.addChild(i);
}, a = 0; a < n.length; a++) i(a);
}() : Global.PageMgr.showTipPage(t.message);
});
Global.ProtocolMgr.queryGetGameSignList(function(t) {
200 == t.code ? function() {
var n = t.data;
e.container_zhandui.removeAllChildren();
for (var i = function(t) {
var i = cc.instantiate(e.selectItem);
i.getComponent(cc.Label).string = n[t].game_name;
i.on(cc.Node.EventType.TOUCH_END, function() {
e.label_zhengjian.string = n[t].game_name;
e.tid = n[t].id;
e.closeScroll();
});
e.container_zhandui.addChild(i);
}, a = 0; a < n.length; a++) i(a);
}() : Global.PageMgr.showTipPage(t.message);
});
},
showScroll: function(e, t) {
switch (t) {
case "saiqu":
this.scroll_saiqu.active = !0;
break;

case "zhandui":
this.scroll_zhandui.active = !0;
}
},
closeScroll: function() {
this.scroll_saiqu.active = !1;
this.scroll_zhandui.active = !1;
},
submit: function() {
var e = this;
if (0 != this.did) if ("" != this.editBox_zhandui.string) if ("" != this.editBox_name.string) if (0 != this.tid) if ("" != this.editBox_phone.string) if ("" != this.editBox_email.string) {
var t = {
name: this.editBox_name.string,
email: this.editBox_email.string,
phone: this.editBox_phone.string,
team_name: this.editBox_zhandui.string,
did: this.did.toString(),
game_id: this.tid.toString()
};
console.log("选择的游戏是：" + this.tid.toString());
console.log("选择的赛区是：" + this.did.toString());
Global.ProtocolMgr.submitBaoMing(t, function(t) {
console.log(t);
200 == t.code ? e.Panle4.active = !0 : Global.PageMgr.showTipPage(t.message);
});
} else Global.PageMgr.showTipPage("还未填写邮箱"); else Global.PageMgr.showTipPage("还未填写手机号"); else Global.PageMgr.showTipPage("还未选择游戏"); else Global.PageMgr.showTipPage("还未填写姓名"); else Global.PageMgr.showTipPage("还未填写战队"); else Global.PageMgr.showTipPage("还未选择赛区");
}
});
cc._RF.pop();
}, {} ],
BaoMing_Item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "31a6dKaXt9OQLYIOHvLBCwu", "BaoMing_Item");
cc.Class({
extends: cc.Component,
properties: {
icon_paiming: cc.Sprite,
label_pingming: cc.Label,
label_quyuname: cc.Label,
label_sum: cc.Label,
icon_paiming2: cc.Node,
propId: 1
},
start: function() {},
setData: function(e) {
var t = this;
this.icon_paiming2.active = !1;
this.label_pingming.string = cc.js.formatStr("NO.%s", e.ranking);
this.label_quyuname.string = e.division_name;
this.label_sum.string = e.number;
try {
if (parseInt(e.ranking) <= 3) {
this.icon_paiming2.active = !0;
this.label_pingming.string = "";
cc.loader.loadRes("imgs/R" + e.ranking, cc.SpriteFrame, function(e, n) {
e || (t.icon_paiming.spriteFrame = n);
});
}
} catch (e) {
console.warn(e);
}
}
});
cc._RF.pop();
}, {} ],
BtnCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "be8deSsGR9CwagwrnhpyuFj", "BtnCtrl");
var i = e("./GCONFIG");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
if (this.node.getComponent(cc.Button)) {
GlobalNiuNiu.eventManager.on(i.EVENT_ONSPIN, this._onStartSpin, this);
GlobalNiuNiu.eventManager.on(i.EVENT_STOPSPIN, this._onStopSpin, this);
}
},
_onStartSpin: function() {
this.node.getComponent(cc.Button).interactable = !1;
},
_onStopSpin: function() {
this.node.getComponent(cc.Button).interactable = !0;
},
onDestroy: function() {
GlobalNiuNiu.eventManager.off(i.EVENT_ONSPIN, this._onStartSpin);
GlobalNiuNiu.eventManager.off(i.EVENT_STOPSPIN, this._onStopSpin);
}
});
cc._RF.pop();
}, {
"./GCONFIG": "GCONFIG"
} ],
ButtonSafe: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a2e43MvAeRN34TuG61351Ie", "ButtonSafe");
cc.Class({
extends: cc.Component,
properties: {
safeTime: {
default: .5,
tooltip: "按钮保护时间，指定间隔内只能点击一次."
}
},
start: function() {
var e = this, t = this.getComponent(cc.Button);
if (t) {
this.clickEvents = t.clickEvents;
this.node.on("click", function() {
t.clickEvents = [];
e.scheduleOnce(function(n) {
t.clickEvents = e.clickEvents;
}, e.safeTime);
}, this);
}
}
});
cc._RF.pop();
}, {} ],
BuyPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "65a98iZfitJ6KU0WxbQ634i", "BuyPanel");
cc.Class({
extends: cc.Component,
properties: {
password: cc.EditBox,
number: cc.EditBox,
label_name: cc.Label,
label_Value: cc.Label,
propId: 1,
type: 0
},
start: function() {},
onEnable: function() {
console.log(this.propId);
console.log(this.type);
Global.ProtocolMgr.queryUserData();
cc.director.GlobalEvent.on("UpdateUserData", this.UpdateUserData, this);
if (1 == this.type) {
this.label_name.string = "使用";
this.label_Value.string = "使用";
} else {
this.label_name.string = "购买";
this.label_Value.string = "购买";
}
this.number.string = "";
},
buy: function() {
var e = void 0;
switch (this.type) {
case 0:
e = {
id: this.propId,
number: this.number.string
};
Global.ProtocolMgr.queryBuyConsumable(e, function(e) {
if (200 == e.code) {
Global.PageMgr.showTipPage("购买成功");
Global.PageMgr.onClosePage(15);
} else Global.PageMgr.showTipPage(e.message);
});
break;

case 1:
e = {
mc_id: this.propId,
number: this.number.string
};
Global.ProtocolMgr.queryUseConsumable(e, function(e) {
if (200 == e.code) {
Global.PageMgr.showTipPage("使用成功");
Global.PageMgr.pages[10].getComponent("KnapsackPanel").getShopList(null, 1);
Global.PageMgr.pages[11].getComponent("ChongWuPanel").showData();
Global.PageMgr.onClosePage(15);
} else Global.PageMgr.showTipPage(e.message);
});
}
},
UpdateUserData: function(e) {},
onDestroy: function() {
cc.director.GlobalEvent.off("UpdateUserData");
}
});
cc._RF.pop();
}, {} ],
CSVParser: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "aab19B0yLhC7JV+rBaX1XJH", "CSVParser");
var i = {
DefaultOptions: {
delim: ",",
quote: '"',
rowdelim: "\n"
}
};
function a(e) {
this.message = e;
Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
}
a.prototype = new Error();
a.prototype.constructor = a;
a.prototype.name = "CSVSyntaxError";
"[object Error]" == new Error().toString() && (a.prototype.toString = function() {
return this.name + ": " + this.message;
});
function o(e, t) {
this.str = e;
this.options = i.DefaultOptions;
if (t) {
t.delim = t.delim || i.DefaultOptions.delim;
t.quote = t.quote || i.DefaultOptions.quote;
if (1 != t.quote.length) throw new RangeError("options.quote should be only 1 char");
t.rowdelim = t.rowdelim || i.DefaultOptions.rowdelim;
this.options = t;
}
this.pos = 0;
this.endpos = e.length;
this.lineNo = 1;
}
o.prototype.next = function(e) {
if (this.pos < this.endpos) {
var t = e.length;
if (this.str.substring(this.pos, this.pos + t) == e) {
this.pos += t;
return !0;
}
}
return !1;
};
o.prototype.ahead = function(e) {
if (this.pos < this.endpos) {
if (!e) return !0;
var t = e.length;
if (this.str.substring(this.pos, this.pos + t) == e) return !0;
}
return !1;
};
function r(e, t) {
for (var n = 0, i = e.indexOf(t); i > 0; ) {
n++;
i = e.indexOf(t, i + t.length);
}
return n;
}
o.prototype.quotedField = function() {
var e = this.pos;
if (!this.next(this.options.quote)) {
this.pos = e;
return null;
}
for (var t = [], n = this.pos; n < this.endpos; ) {
var i = this.str.indexOf(this.options.quote, n);
if (i < 0) throw new a("line " + this.lineNo + ": missing close quote");
var o = this.str.substring(n, i);
this.lineNo += r(o, "\n");
t.push(o);
if (!(i + 1 < this.endpos && this.str.charAt(i + 1) == this.options.quote)) {
this.pos = i + 1;
break;
}
n = i + 2;
i = this.str.indexOf(this.options.quote, n);
}
return t.join(this.options.quote);
};
o.prototype.normalField = function() {
var e = this.pos, t = this.str.indexOf(this.options.delim, e);
t < 0 && (t = this.endpos);
var n = this.str.indexOf(this.options.rowdelim, e);
n < 0 && (n = this.endpos);
this.pos = Math.min(t, n);
return this.str.substring(e, this.pos);
};
o.prototype.nextField = function() {
var e = this.quotedField();
return null !== e ? e : this.normalField();
};
o.prototype.nextRow_0 = function() {
var e = this.pos;
if (!this.next(this.options.delim)) {
this.pos = e;
return null;
}
var t = this.nextField();
if (null === t) {
this.pos = e;
return null;
}
return t;
};
o.prototype.nextRow = function() {
var e = [], t = this.pos, n = this.nextField();
if (null === n) {
this.pos = t;
return null;
}
e.push(n);
n = this.nextRow_0();
for (;null !== n; ) {
e.push(n);
n = this.nextRow_0();
}
if (!this.next(this.options.rowdelim) && this.ahead()) throw new a("line " + this.lineNo + ": " + this.str.substring(Math.max(this.pos - 5, 0), this.pos + 5));
"\n" == this.str.charAt(this.pos - 1) && this.lineNo++;
return e;
};
o.prototype.nextRowSimple = function() {
var e = [], t = this.pos, n = this.nextField();
if (null === n) {
this.pos = t;
return null;
}
e.push(n);
n = this.nextRow_0();
for (;null !== n; ) {
e.push(n);
n = this.nextRow_0();
}
if (!this.next(this.options.rowdelim) && this.ahead()) throw new a("line " + this.lineNo + ": " + this.str.substring(Math.max(this.pos - 5, 0), this.pos + 5));
"\n" == this.str.charAt(this.pos - 1) && this.lineNo++;
return 1 === e.length ? e[0] : e;
};
o.prototype.hasNext = function() {
return this.ahead();
};
i.CSVSyntaxError = a;
i.CSVParser = o;
i.parseOne = function(e, t) {
var n = new o(e, t);
return n.hasNext() ? n.nextRow() : null;
};
i.parseOneSimple = function(e, t) {
var n = new o(e, t);
return n.hasNext() ? n.nextRowSimple() : null;
};
Array.prototype.map || (Array.prototype.map = function(e, t) {
var n, i, a;
if (null === this) throw new TypeError(" this is null or not defined");
var o = Object(this), r = o.length >>> 0;
if ("[object Function]" != {}.toString.call(e)) throw new TypeError(e + " is not a function");
t && (n = t);
i = new Array(r);
a = 0;
for (;a < r; ) {
var c, s;
if (a in o) {
c = o[a];
s = e.call(n, c, a, o);
i[a] = s;
}
a++;
}
return i;
});
t.exports = o;
cc._RF.pop();
}, {} ],
CardCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1e452Ex1jFOaIQQZ24wXiDf", "CardCtrl");
var i = [ 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
cc.Enum({
DIAMOND: 1,
CLUB: 2,
HEART: 3,
SPADE: 4
});
cc.Class({
extends: cc.Component,
properties: {
cardFace: cc.Sprite,
cardPointSp: cc.Sprite,
cardPointSp2: cc.Sprite,
cardSuitSp: cc.Sprite,
cardAtlas: cc.SpriteAtlas,
cardPoint: {
default: 10,
type: cc.Integer,
min: 1,
max: 13,
notify: function() {
this._updateCard();
}
},
cardShuit: {
default: 1,
type: cc.Integer,
min: 1,
max: 4,
notify: function() {
this._updateCard();
}
},
showFace: {
default: !0,
notify: function() {
this.cardFace.node.active = this.showFace;
}
}
},
start: function() {},
initCard: function(e, t, n) {
cc.assert(e >= 1 && e <= 13, "point must be [1,13]");
cc.assert(t >= 1 && t <= 4, "suit must be [1,4");
this.cardPointSp.spriteFrame = this.cardPointSp2.spriteFrame = this.cardAtlas.getSpriteFrame(this._getPointSpriteFrameName(e, t));
this.cardSuitSp.spriteFrame = this.cardAtlas.getSpriteFrame(this._getSuitSpriteFrameName(e, t));
this.showFace = void 0 != n && n;
},
_updateCard: function() {
this.initCard(this.cardPoint, this.cardShuit);
},
_getPointSpriteFrameName: function(e, t) {
var n = "B";
return (n = 1 === t || 3 === t ? "R" : n) + i[e - 1] + "L";
},
_getSuitSpriteFrameName: function(e, t) {
var n = "fangkuai_L";
if (e < 11) 2 === t ? n = "meihua_L" : 3 === t ? n = "hongtao_L" : 4 === t && (n = "heitao_L"); else {
var a = "hong_";
2 !== t && 4 !== t || (a = "hei_");
n = a + i[e - 1] + "_hua";
}
return n;
}
});
cc._RF.pop();
}, {} ],
ChongWuPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "db0e03FiNlODouREjsYTZEL", "ChongWuPanel");
e("../../../NiuNiu/script/common/UtilsCross").rmAndroidSplash;
var i = e("../../Util/appScript");
cc.Class({
extends: cc.Component,
properties: {
label_id: cc.Label,
label_zhanli: cc.Label,
label_tili: cc.Label,
label_zili: cc.Label,
label_xingzuan: cc.Label,
label_lv: cc.Label,
icon_pic: cc.Sprite,
label_Usdt: cc.Label
},
onLoad: function() {},
start: function() {},
onEnable: function() {
this.showData();
},
showData: function() {
var e = this;
this.goGamePanelUI();
Global.ProtocolMgr.queryKnapsackpetAnimalList(100, 1, function(t) {
if (200 == t.code) {
var n = t.data;
if (n) {
e.label_zhanli.string = parseFloat(n[0].combat_value).toFixed(4);
e.label_tili.string = parseFloat(n[0].spirit_value).toFixed(4);
e.label_zili.string = parseFloat(n[0].intellect_value).toFixed(4);
cc.loader.load({
url: n[0].icon,
type: "png"
}, function(t, n) {
e.icon_pic.spriteFrame = new cc.SpriteFrame(n);
});
}
}
});
},
goGamePanelUI: function() {
var e = this;
i.Post("member/getMemberInfo", {}, function(t) {
if (200 == t.code && t.data) {
e.label_id.string = t.data.username;
e.label_lv.string = t.data.grade + "级";
e.label_Usdt.string = t.data.totalUsdt;
}
});
},
onClickIncomeDetails: function() {
Global.PageMgr.onOpenPage(22);
}
});
cc._RF.pop();
}, {
"../../../NiuNiu/script/common/UtilsCross": "UtilsCross",
"../../Util/appScript": "appScript"
} ],
ChongWuUserDataPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "44611bpDwlGCrRKCTBwvXBN", "ChongWuUserDataPanel");
cc.Class({
extends: cc.Component,
properties: {
label_zhanliValue: cc.Label,
label_lifeValue: cc.Label,
label_coinValue: cc.Label,
label_diamondValue: cc.Label,
label_id: cc.Label
},
onEnable: function() {
cc.director.GlobalEvent.on("ChongWuUserDataPanel", this.UpdateUserData, this);
},
start: function() {
null != this.label_id && (this.label_id.string = window.DEFAULT_userID);
},
UpdateUserData: function(e) {
this.label_zhanliValue.string = e.zhanli;
this.label_lifeValue = e.life;
this.label_coinValue.string = e.totalUsdt;
this.label_diamondValue.string = e.totalCoinOne;
this.label_id.string = 0;
},
onDestroy: function() {
cc.director.GlobalEvent.off("ChongWuUserDataPanel");
}
});
cc._RF.pop();
}, {} ],
ChongZhiPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "033f3gSTNBJvIrAPSEL+kX9", "ChongZhiPanel");
cc.Class({
extends: cc.Component,
properties: {
btn_item: [ cc.Node ],
editBox_ZS: cc.EditBox,
label_RMB: cc.Label
},
start: function() {},
toggle: function(e) {
this.btn_item.forEach(function(e) {
e.getChildByName("label").color = new cc.Color(248, 145, 1);
});
e.target.getChildByName("label").color = new cc.Color(255, 255, 255);
},
onEdit: function(e) {
console.log(e.string);
if (parseFloat(e.string) < .1) {
Global.PageMgr.showTipPage("最少要充值0.1个水晶星钻");
this.editBox_ZS.string = "";
this.label_RMB.string = "";
}
"" != this.editBox_ZS.string ? this.label_RMB.string = cc.js.formatStr("需支付:%sRMB", 99 * parseFloat(e.string)) : this.label_RMB.string = "";
},
onDisable: function() {
this.editBox_ZS.string = "";
this.label_RMB.string = "";
}
});
cc._RF.pop();
}, {} ],
ClickEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8ca7dPw7P9EXoSRflkuBeGi", "ClickEvent");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function() {
Global.ResourceMgr.playClickAudio();
return !0;
}, this);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
CoinsMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "28fd1biYCRK2aPpm7QT7GDe", "CoinsMgr");
var i = e("./DataMgr"), a = e("./ViewMgr"), o = cc.Class({
ctor: function() {}
});
o.costCoins = function(e, t, n, o) {
var r = i.getInstance().playerObj;
o = void 0 === o || o;
if (e > r.coins) {
(o ? function() {
a.getInstance().showShopView();
} : n)();
} else {
r.coins -= e;
GlobalNiuNiu.uiUpdater.updateUserCoins();
t && t();
}
};
o.addCoins = function(e, t) {
var n = i.getInstance().playerObj, a = i.getInstance().achieveObj;
n.coins += e;
a.accCoins += e;
void 0 !== t && null !== t || (t = !0);
t && GlobalNiuNiu.uiUpdater.updateUserCoins();
};
t.exports = o;
cc._RF.pop();
}, {
"./DataMgr": "DataMgr",
"./ViewMgr": "ViewMgr"
} ],
ComboBox: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a304dC8m29MW4KTXaOiKsIC", "ComboBox");
cc.Class({
extends: cc.Component,
properties: {
triangle: cc.Node,
comboLabel: cc.Label,
dropDown: cc.Node,
vLayoutNode: cc.Node,
contentNode: cc.Node,
itemPrefab: cc.Prefab
},
onLoad: function() {
this.isDropDown = !1;
this.itemArray = [ "100", "200", "300" ];
this.initItems();
},
comboboxClicked: function() {
this.rotateTriangle();
this.showHideDropDownBox();
this.isDropDown ? this.isDropDown = !1 : this.isDropDown = !0;
},
rotateTriangle: function() {
if (this.isDropDown) {
var e = cc.rotateTo(.5, -90).easing(cc.easeCubicActionOut());
this.triangle.runAction(e);
} else {
var t = cc.rotateTo(.5, 180).easing(cc.easeCubicActionOut());
this.triangle.runAction(t);
}
},
showHideDropDownBox: function() {
this.isDropDown ? this.dropDown.active = !1 : this.dropDown.active = !0;
},
initItems: function() {
for (var e = 0, t = 0; t < this.itemArray.length; t++) {
var n = cc.instantiate(this.itemPrefab);
n.children[0].getComponent(cc.Label).string = this.itemArray[t];
n.getComponent("Item").initComboBox(this);
this.vLayoutNode.addChild(n);
e += n.height;
}
e > this.contentNode.height && (this.contentNode.height = e);
}
});
cc._RF.pop();
}, {} ],
Config: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ad421JwltpGp7gZdhlgNvti", "Config");
window.Config = {
baseUrl: "http://api.vdnmetaverse.org/api/",
socketUrl: "8.210.235.222"
};
cc._RF.pop();
}, {} ],
CustomerServicePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cd521NoEUVC5aXTj7udrVYD", "CustomerServicePanel");
cc.Class({
extends: cc.Component,
properties: {
label_email: cc.Label
},
start: function() {},
onEnable: function() {
var e = this;
Global.ProtocolMgr.querygetCommonInfo(function(t) {
t.data && (e.label_email.string = t.data.customerServiceQq);
});
},
closeUi: function() {
this.node.active = !1;
},
copy: function() {
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyEmail", "(Ljava/lang/String;)Z", this.label_email.string) && Global.PageMgr.showTipPage("复制成功");
}
});
cc._RF.pop();
}, {} ],
1: [ function(e, t, n) {
"use strict";
n.byteLength = function(e) {
var t = l(e), n = t[0], i = t[1];
return 3 * (n + i) / 4 - i;
};
n.toByteArray = function(e) {
var t, n, i = l(e), r = i[0], c = i[1], s = new o(u(e, r, c)), d = 0, h = c > 0 ? r - 4 : r;
for (n = 0; n < h; n += 4) {
t = a[e.charCodeAt(n)] << 18 | a[e.charCodeAt(n + 1)] << 12 | a[e.charCodeAt(n + 2)] << 6 | a[e.charCodeAt(n + 3)];
s[d++] = t >> 16 & 255;
s[d++] = t >> 8 & 255;
s[d++] = 255 & t;
}
if (2 === c) {
t = a[e.charCodeAt(n)] << 2 | a[e.charCodeAt(n + 1)] >> 4;
s[d++] = 255 & t;
}
if (1 === c) {
t = a[e.charCodeAt(n)] << 10 | a[e.charCodeAt(n + 1)] << 4 | a[e.charCodeAt(n + 2)] >> 2;
s[d++] = t >> 8 & 255;
s[d++] = 255 & t;
}
return s;
};
n.fromByteArray = function(e) {
for (var t, n = e.length, a = n % 3, o = [], r = 0, c = n - a; r < c; r += 16383) o.push(h(e, r, r + 16383 > c ? c : r + 16383));
if (1 === a) {
t = e[n - 1];
o.push(i[t >> 2] + i[t << 4 & 63] + "==");
} else if (2 === a) {
t = (e[n - 2] << 8) + e[n - 1];
o.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=");
}
return o.join("");
};
for (var i = [], a = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, s = r.length; c < s; ++c) {
i[c] = r[c];
a[r.charCodeAt(c)] = c;
}
a["-".charCodeAt(0)] = 62;
a["_".charCodeAt(0)] = 63;
function l(e) {
var t = e.length;
if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
var n = e.indexOf("=");
-1 === n && (n = t);
return [ n, n === t ? 0 : 4 - n % 4 ];
}
function u(e, t, n) {
return 3 * (t + n) / 4 - n;
}
function d(e) {
return i[e >> 18 & 63] + i[e >> 12 & 63] + i[e >> 6 & 63] + i[63 & e];
}
function h(e, t, n) {
for (var i, a = [], o = t; o < n; o += 3) {
i = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]);
a.push(d(i));
}
return a.join("");
}
}, {} ],
2: [ function(e, t, n) {
(function(t) {
"use strict";
var i = e("base64-js"), a = e("ieee754"), o = e("isarray");
n.Buffer = s;
n.SlowBuffer = function(e) {
+e != e && (e = 0);
return s.alloc(+e);
};
n.INSPECT_MAX_BYTES = 50;
s.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
try {
var e = new Uint8Array(1);
e.__proto__ = {
__proto__: Uint8Array.prototype,
foo: function() {
return 42;
}
};
return 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
} catch (e) {
return !1;
}
}();
n.kMaxLength = r();
function r() {
return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function c(e, t) {
if (r() < t) throw new RangeError("Invalid typed array length");
if (s.TYPED_ARRAY_SUPPORT) (e = new Uint8Array(t)).__proto__ = s.prototype; else {
null === e && (e = new s(t));
e.length = t;
}
return e;
}
function s(e, t, n) {
if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(e, t, n);
if ("number" == typeof e) {
if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
return h(this, e);
}
return l(this, e, t, n);
}
s.poolSize = 8192;
s._augment = function(e) {
e.__proto__ = s.prototype;
return e;
};
function l(e, t, n, i) {
if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? p(e, t, n, i) : "string" == typeof t ? g(e, t, n) : m(e, t);
}
s.from = function(e, t, n) {
return l(null, e, t, n);
};
if (s.TYPED_ARRAY_SUPPORT) {
s.prototype.__proto__ = Uint8Array.prototype;
s.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
value: null,
configurable: !0
});
}
function u(e) {
if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
if (e < 0) throw new RangeError('"size" argument must not be negative');
}
function d(e, t, n, i) {
u(t);
return t <= 0 ? c(e, t) : void 0 !== n ? "string" == typeof i ? c(e, t).fill(n, i) : c(e, t).fill(n) : c(e, t);
}
s.alloc = function(e, t, n) {
return d(null, e, t, n);
};
function h(e, t) {
u(t);
e = c(e, t < 0 ? 0 : 0 | b(t));
if (!s.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) e[n] = 0;
return e;
}
s.allocUnsafe = function(e) {
return h(null, e);
};
s.allocUnsafeSlow = function(e) {
return h(null, e);
};
function g(e, t, n) {
"string" == typeof n && "" !== n || (n = "utf8");
if (!s.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
var i = 0 | _(t, n), a = (e = c(e, i)).write(t, n);
a !== i && (e = e.slice(0, a));
return e;
}
function f(e, t) {
var n = t.length < 0 ? 0 : 0 | b(t.length);
e = c(e, n);
for (var i = 0; i < n; i += 1) e[i] = 255 & t[i];
return e;
}
function p(e, t, n, i) {
t.byteLength;
if (n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
if (t.byteLength < n + (i || 0)) throw new RangeError("'length' is out of bounds");
t = void 0 === n && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, n) : new Uint8Array(t, n, i);
s.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = s.prototype : e = f(e, t);
return e;
}
function m(e, t) {
if (s.isBuffer(t)) {
var n = 0 | b(t.length);
if (0 === (e = c(e, n)).length) return e;
t.copy(e, 0, 0, n);
return e;
}
if (t) {
if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || $(t.length) ? c(e, 0) : f(e, t);
if ("Buffer" === t.type && o(t.data)) return f(e, t.data);
}
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function b(e) {
if (e >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
return 0 | e;
}
s.isBuffer = function(e) {
return !(null == e || !e._isBuffer);
};
s.compare = function(e, t) {
if (!s.isBuffer(e) || !s.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
if (e === t) return 0;
for (var n = e.length, i = t.length, a = 0, o = Math.min(n, i); a < o; ++a) if (e[a] !== t[a]) {
n = e[a];
i = t[a];
break;
}
return n < i ? -1 : i < n ? 1 : 0;
};
s.isEncoding = function(e) {
switch (String(e).toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "latin1":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return !0;

default:
return !1;
}
};
s.concat = function(e, t) {
if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === e.length) return s.alloc(0);
var n;
if (void 0 === t) {
t = 0;
for (n = 0; n < e.length; ++n) t += e[n].length;
}
var i = s.allocUnsafe(t), a = 0;
for (n = 0; n < e.length; ++n) {
var r = e[n];
if (!s.isBuffer(r)) throw new TypeError('"list" argument must be an Array of Buffers');
r.copy(i, a);
a += r.length;
}
return i;
};
function _(e, t) {
if (s.isBuffer(e)) return e.length;
if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
"string" != typeof e && (e = "" + e);
var n = e.length;
if (0 === n) return 0;
for (var i = !1; ;) switch (t) {
case "ascii":
case "latin1":
case "binary":
return n;

case "utf8":
case "utf-8":
case void 0:
return J(e).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * n;

case "hex":
return n >>> 1;

case "base64":
return X(e).length;

default:
if (i) return J(e).length;
t = ("" + t).toLowerCase();
i = !0;
}
}
s.byteLength = _;
function y(e, t, n) {
var i = !1;
(void 0 === t || t < 0) && (t = 0);
if (t > this.length) return "";
(void 0 === n || n > this.length) && (n = this.length);
if (n <= 0) return "";
if ((n >>>= 0) <= (t >>>= 0)) return "";
e || (e = "utf8");
for (;;) switch (e) {
case "hex":
return k(this, t, n);

case "utf8":
case "utf-8":
return L(this, t, n);

case "ascii":
return B(this, t, n);

case "latin1":
case "binary":
return F(this, t, n);

case "base64":
return T(this, t, n);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return A(this, t, n);

default:
if (i) throw new TypeError("Unknown encoding: " + e);
e = (e + "").toLowerCase();
i = !0;
}
}
s.prototype._isBuffer = !0;
function v(e, t, n) {
var i = e[t];
e[t] = e[n];
e[n] = i;
}
s.prototype.swap16 = function() {
var e = this.length;
if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var t = 0; t < e; t += 2) v(this, t, t + 1);
return this;
};
s.prototype.swap32 = function() {
var e = this.length;
if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var t = 0; t < e; t += 4) {
v(this, t, t + 3);
v(this, t + 1, t + 2);
}
return this;
};
s.prototype.swap64 = function() {
var e = this.length;
if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
for (var t = 0; t < e; t += 8) {
v(this, t, t + 7);
v(this, t + 1, t + 6);
v(this, t + 2, t + 5);
v(this, t + 3, t + 4);
}
return this;
};
s.prototype.toString = function() {
var e = 0 | this.length;
return 0 === e ? "" : 0 === arguments.length ? L(this, 0, e) : y.apply(this, arguments);
};
s.prototype.equals = function(e) {
if (!s.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
return this === e || 0 === s.compare(this, e);
};
s.prototype.inspect = function() {
var e = "", t = n.INSPECT_MAX_BYTES;
if (this.length > 0) {
e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
this.length > t && (e += " ... ");
}
return "<Buffer " + e + ">";
};
s.prototype.compare = function(e, t, n, i, a) {
if (!s.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
void 0 === t && (t = 0);
void 0 === n && (n = e ? e.length : 0);
void 0 === i && (i = 0);
void 0 === a && (a = this.length);
if (t < 0 || n > e.length || i < 0 || a > this.length) throw new RangeError("out of range index");
if (i >= a && t >= n) return 0;
if (i >= a) return -1;
if (t >= n) return 1;
t >>>= 0;
n >>>= 0;
i >>>= 0;
a >>>= 0;
if (this === e) return 0;
for (var o = a - i, r = n - t, c = Math.min(o, r), l = this.slice(i, a), u = e.slice(t, n), d = 0; d < c; ++d) if (l[d] !== u[d]) {
o = l[d];
r = u[d];
break;
}
return o < r ? -1 : r < o ? 1 : 0;
};
function C(e, t, n, i, a) {
if (0 === e.length) return -1;
if ("string" == typeof n) {
i = n;
n = 0;
} else n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648);
n = +n;
isNaN(n) && (n = a ? 0 : e.length - 1);
n < 0 && (n = e.length + n);
if (n >= e.length) {
if (a) return -1;
n = e.length - 1;
} else if (n < 0) {
if (!a) return -1;
n = 0;
}
"string" == typeof t && (t = s.from(t, i));
if (s.isBuffer(t)) return 0 === t.length ? -1 : N(e, t, n, i, a);
if ("number" == typeof t) {
t &= 255;
return s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? a ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : N(e, [ t ], n, i, a);
}
throw new TypeError("val must be string, number or Buffer");
}
function N(e, t, n, i, a) {
var o, r = 1, c = e.length, s = t.length;
if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
if (e.length < 2 || t.length < 2) return -1;
r = 2;
c /= 2;
s /= 2;
n /= 2;
}
function l(e, t) {
return 1 === r ? e[t] : e.readUInt16BE(t * r);
}
if (a) {
var u = -1;
for (o = n; o < c; o++) if (l(e, o) === l(t, -1 === u ? 0 : o - u)) {
-1 === u && (u = o);
if (o - u + 1 === s) return u * r;
} else {
-1 !== u && (o -= o - u);
u = -1;
}
} else {
n + s > c && (n = c - s);
for (o = n; o >= 0; o--) {
for (var d = !0, h = 0; h < s; h++) if (l(e, o + h) !== l(t, h)) {
d = !1;
break;
}
if (d) return o;
}
}
return -1;
}
s.prototype.includes = function(e, t, n) {
return -1 !== this.indexOf(e, t, n);
};
s.prototype.indexOf = function(e, t, n) {
return C(this, e, t, n, !0);
};
s.prototype.lastIndexOf = function(e, t, n) {
return C(this, e, t, n, !1);
};
function P(e, t, n, i) {
n = Number(n) || 0;
var a = e.length - n;
i ? (i = Number(i)) > a && (i = a) : i = a;
var o = t.length;
if (o % 2 != 0) throw new TypeError("Invalid hex string");
i > o / 2 && (i = o / 2);
for (var r = 0; r < i; ++r) {
var c = parseInt(t.substr(2 * r, 2), 16);
if (isNaN(c)) return r;
e[n + r] = c;
}
return r;
}
function S(e, t, n, i) {
return Q(J(t, e.length - n), e, n, i);
}
function w(e, t, n, i) {
return Q(Y(t), e, n, i);
}
function D(e, t, n, i) {
return w(e, t, n, i);
}
function E(e, t, n, i) {
return Q(X(t), e, n, i);
}
function R(e, t, n, i) {
return Q(K(t, e.length - n), e, n, i);
}
s.prototype.write = function(e, t, n, i) {
if (void 0 === t) {
i = "utf8";
n = this.length;
t = 0;
} else if (void 0 === n && "string" == typeof t) {
i = t;
n = this.length;
t = 0;
} else {
if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
t |= 0;
if (isFinite(n)) {
n |= 0;
void 0 === i && (i = "utf8");
} else {
i = n;
n = void 0;
}
}
var a = this.length - t;
(void 0 === n || n > a) && (n = a);
if (e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
i || (i = "utf8");
for (var o = !1; ;) switch (i) {
case "hex":
return P(this, e, t, n);

case "utf8":
case "utf-8":
return S(this, e, t, n);

case "ascii":
return w(this, e, t, n);

case "latin1":
case "binary":
return D(this, e, t, n);

case "base64":
return E(this, e, t, n);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return R(this, e, t, n);

default:
if (o) throw new TypeError("Unknown encoding: " + i);
i = ("" + i).toLowerCase();
o = !0;
}
};
s.prototype.toJSON = function() {
return {
type: "Buffer",
data: Array.prototype.slice.call(this._arr || this, 0)
};
};
function T(e, t, n) {
return 0 === t && n === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, n));
}
function L(e, t, n) {
n = Math.min(e.length, n);
for (var i = [], a = t; a < n; ) {
var o = e[a], r = null, c = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
if (a + c <= n) {
var s, l, u, d;
switch (c) {
case 1:
o < 128 && (r = o);
break;

case 2:
128 == (192 & (s = e[a + 1])) && (d = (31 & o) << 6 | 63 & s) > 127 && (r = d);
break;

case 3:
s = e[a + 1];
l = e[a + 2];
128 == (192 & s) && 128 == (192 & l) && (d = (15 & o) << 12 | (63 & s) << 6 | 63 & l) > 2047 && (d < 55296 || d > 57343) && (r = d);
break;

case 4:
s = e[a + 1];
l = e[a + 2];
u = e[a + 3];
128 == (192 & s) && 128 == (192 & l) && 128 == (192 & u) && (d = (15 & o) << 18 | (63 & s) << 12 | (63 & l) << 6 | 63 & u) > 65535 && d < 1114112 && (r = d);
}
}
if (null === r) {
r = 65533;
c = 1;
} else if (r > 65535) {
r -= 65536;
i.push(r >>> 10 & 1023 | 55296);
r = 56320 | 1023 & r;
}
i.push(r);
a += c;
}
return G(i);
}
var M = 4096;
function G(e) {
var t = e.length;
if (t <= M) return String.fromCharCode.apply(String, e);
for (var n = "", i = 0; i < t; ) n += String.fromCharCode.apply(String, e.slice(i, i += M));
return n;
}
function B(e, t, n) {
var i = "";
n = Math.min(e.length, n);
for (var a = t; a < n; ++a) i += String.fromCharCode(127 & e[a]);
return i;
}
function F(e, t, n) {
var i = "";
n = Math.min(e.length, n);
for (var a = t; a < n; ++a) i += String.fromCharCode(e[a]);
return i;
}
function k(e, t, n) {
var i = e.length;
(!t || t < 0) && (t = 0);
(!n || n < 0 || n > i) && (n = i);
for (var a = "", o = t; o < n; ++o) a += Z(e[o]);
return a;
}
function A(e, t, n) {
for (var i = e.slice(t, n), a = "", o = 0; o < i.length; o += 2) a += String.fromCharCode(i[o] + 256 * i[o + 1]);
return a;
}
s.prototype.slice = function(e, t) {
var n, i = this.length;
e = ~~e;
t = void 0 === t ? i : ~~t;
e < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i);
t < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i);
t < e && (t = e);
if (s.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = s.prototype; else {
var a = t - e;
n = new s(a, void 0);
for (var o = 0; o < a; ++o) n[o] = this[o + e];
}
return n;
};
function x(e, t, n) {
if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
}
s.prototype.readUIntLE = function(e, t, n) {
e |= 0;
t |= 0;
n || x(e, t, this.length);
for (var i = this[e], a = 1, o = 0; ++o < t && (a *= 256); ) i += this[e + o] * a;
return i;
};
s.prototype.readUIntBE = function(e, t, n) {
e |= 0;
t |= 0;
n || x(e, t, this.length);
for (var i = this[e + --t], a = 1; t > 0 && (a *= 256); ) i += this[e + --t] * a;
return i;
};
s.prototype.readUInt8 = function(e, t) {
t || x(e, 1, this.length);
return this[e];
};
s.prototype.readUInt16LE = function(e, t) {
t || x(e, 2, this.length);
return this[e] | this[e + 1] << 8;
};
s.prototype.readUInt16BE = function(e, t) {
t || x(e, 2, this.length);
return this[e] << 8 | this[e + 1];
};
s.prototype.readUInt32LE = function(e, t) {
t || x(e, 4, this.length);
return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
};
s.prototype.readUInt32BE = function(e, t) {
t || x(e, 4, this.length);
return 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
s.prototype.readIntLE = function(e, t, n) {
e |= 0;
t |= 0;
n || x(e, t, this.length);
for (var i = this[e], a = 1, o = 0; ++o < t && (a *= 256); ) i += this[e + o] * a;
i >= (a *= 128) && (i -= Math.pow(2, 8 * t));
return i;
};
s.prototype.readIntBE = function(e, t, n) {
e |= 0;
t |= 0;
n || x(e, t, this.length);
for (var i = t, a = 1, o = this[e + --i]; i > 0 && (a *= 256); ) o += this[e + --i] * a;
o >= (a *= 128) && (o -= Math.pow(2, 8 * t));
return o;
};
s.prototype.readInt8 = function(e, t) {
t || x(e, 1, this.length);
return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
};
s.prototype.readInt16LE = function(e, t) {
t || x(e, 2, this.length);
var n = this[e] | this[e + 1] << 8;
return 32768 & n ? 4294901760 | n : n;
};
s.prototype.readInt16BE = function(e, t) {
t || x(e, 2, this.length);
var n = this[e + 1] | this[e] << 8;
return 32768 & n ? 4294901760 | n : n;
};
s.prototype.readInt32LE = function(e, t) {
t || x(e, 4, this.length);
return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
s.prototype.readInt32BE = function(e, t) {
t || x(e, 4, this.length);
return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
s.prototype.readFloatLE = function(e, t) {
t || x(e, 4, this.length);
return a.read(this, e, !0, 23, 4);
};
s.prototype.readFloatBE = function(e, t) {
t || x(e, 4, this.length);
return a.read(this, e, !1, 23, 4);
};
s.prototype.readDoubleLE = function(e, t) {
t || x(e, 8, this.length);
return a.read(this, e, !0, 52, 8);
};
s.prototype.readDoubleBE = function(e, t) {
t || x(e, 8, this.length);
return a.read(this, e, !1, 52, 8);
};
function I(e, t, n, i, a, o) {
if (!s.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (t > a || t < o) throw new RangeError('"value" argument is out of bounds');
if (n + i > e.length) throw new RangeError("Index out of range");
}
s.prototype.writeUIntLE = function(e, t, n, i) {
e = +e;
t |= 0;
n |= 0;
if (!i) {
I(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
}
var a = 1, o = 0;
this[t] = 255 & e;
for (;++o < n && (a *= 256); ) this[t + o] = e / a & 255;
return t + n;
};
s.prototype.writeUIntBE = function(e, t, n, i) {
e = +e;
t |= 0;
n |= 0;
if (!i) {
I(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
}
var a = n - 1, o = 1;
this[t + a] = 255 & e;
for (;--a >= 0 && (o *= 256); ) this[t + a] = e / o & 255;
return t + n;
};
s.prototype.writeUInt8 = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 1, 255, 0);
s.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
this[t] = 255 & e;
return t + 1;
};
function O(e, t, n, i) {
t < 0 && (t = 65535 + t + 1);
for (var a = 0, o = Math.min(e.length - n, 2); a < o; ++a) e[n + a] = (t & 255 << 8 * (i ? a : 1 - a)) >>> 8 * (i ? a : 1 - a);
}
s.prototype.writeUInt16LE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 2, 65535, 0);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else O(this, e, t, !0);
return t + 2;
};
s.prototype.writeUInt16BE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 2, 65535, 0);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else O(this, e, t, !1);
return t + 2;
};
function U(e, t, n, i) {
t < 0 && (t = 4294967295 + t + 1);
for (var a = 0, o = Math.min(e.length - n, 4); a < o; ++a) e[n + a] = t >>> 8 * (i ? a : 3 - a) & 255;
}
s.prototype.writeUInt32LE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 4, 4294967295, 0);
if (s.TYPED_ARRAY_SUPPORT) {
this[t + 3] = e >>> 24;
this[t + 2] = e >>> 16;
this[t + 1] = e >>> 8;
this[t] = 255 & e;
} else U(this, e, t, !0);
return t + 4;
};
s.prototype.writeUInt32BE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 4, 4294967295, 0);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else U(this, e, t, !1);
return t + 4;
};
s.prototype.writeIntLE = function(e, t, n, i) {
e = +e;
t |= 0;
if (!i) {
var a = Math.pow(2, 8 * n - 1);
I(this, e, t, n, a - 1, -a);
}
var o = 0, r = 1, c = 0;
this[t] = 255 & e;
for (;++o < n && (r *= 256); ) {
e < 0 && 0 === c && 0 !== this[t + o - 1] && (c = 1);
this[t + o] = (e / r >> 0) - c & 255;
}
return t + n;
};
s.prototype.writeIntBE = function(e, t, n, i) {
e = +e;
t |= 0;
if (!i) {
var a = Math.pow(2, 8 * n - 1);
I(this, e, t, n, a - 1, -a);
}
var o = n - 1, r = 1, c = 0;
this[t + o] = 255 & e;
for (;--o >= 0 && (r *= 256); ) {
e < 0 && 0 === c && 0 !== this[t + o + 1] && (c = 1);
this[t + o] = (e / r >> 0) - c & 255;
}
return t + n;
};
s.prototype.writeInt8 = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 1, 127, -128);
s.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
e < 0 && (e = 255 + e + 1);
this[t] = 255 & e;
return t + 1;
};
s.prototype.writeInt16LE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 2, 32767, -32768);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else O(this, e, t, !0);
return t + 2;
};
s.prototype.writeInt16BE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 2, 32767, -32768);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else O(this, e, t, !1);
return t + 2;
};
s.prototype.writeInt32LE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 4, 2147483647, -2147483648);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
this[t + 2] = e >>> 16;
this[t + 3] = e >>> 24;
} else U(this, e, t, !0);
return t + 4;
};
s.prototype.writeInt32BE = function(e, t, n) {
e = +e;
t |= 0;
n || I(this, e, t, 4, 2147483647, -2147483648);
e < 0 && (e = 4294967295 + e + 1);
if (s.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else U(this, e, t, !1);
return t + 4;
};
function j(e, t, n, i, a, o) {
if (n + i > e.length) throw new RangeError("Index out of range");
if (n < 0) throw new RangeError("Index out of range");
}
function q(e, t, n, i, o) {
o || j(e, 0, n, 4);
a.write(e, t, n, i, 23, 4);
return n + 4;
}
s.prototype.writeFloatLE = function(e, t, n) {
return q(this, e, t, !0, n);
};
s.prototype.writeFloatBE = function(e, t, n) {
return q(this, e, t, !1, n);
};
function V(e, t, n, i, o) {
o || j(e, 0, n, 8);
a.write(e, t, n, i, 52, 8);
return n + 8;
}
s.prototype.writeDoubleLE = function(e, t, n) {
return V(this, e, t, !0, n);
};
s.prototype.writeDoubleBE = function(e, t, n) {
return V(this, e, t, !1, n);
};
s.prototype.copy = function(e, t, n, i) {
n || (n = 0);
i || 0 === i || (i = this.length);
t >= e.length && (t = e.length);
t || (t = 0);
i > 0 && i < n && (i = n);
if (i === n) return 0;
if (0 === e.length || 0 === this.length) return 0;
if (t < 0) throw new RangeError("targetStart out of bounds");
if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
if (i < 0) throw new RangeError("sourceEnd out of bounds");
i > this.length && (i = this.length);
e.length - t < i - n && (i = e.length - t + n);
var a, o = i - n;
if (this === e && n < t && t < i) for (a = o - 1; a >= 0; --a) e[a + t] = this[a + n]; else if (o < 1e3 || !s.TYPED_ARRAY_SUPPORT) for (a = 0; a < o; ++a) e[a + t] = this[a + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
return o;
};
s.prototype.fill = function(e, t, n, i) {
if ("string" == typeof e) {
if ("string" == typeof t) {
i = t;
t = 0;
n = this.length;
} else if ("string" == typeof n) {
i = n;
n = this.length;
}
if (1 === e.length) {
var a = e.charCodeAt(0);
a < 256 && (e = a);
}
if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
if ("string" == typeof i && !s.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
} else "number" == typeof e && (e &= 255);
if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
if (n <= t) return this;
t >>>= 0;
n = void 0 === n ? this.length : n >>> 0;
e || (e = 0);
var o;
if ("number" == typeof e) for (o = t; o < n; ++o) this[o] = e; else {
var r = s.isBuffer(e) ? e : J(new s(e, i).toString()), c = r.length;
for (o = 0; o < n - t; ++o) this[o + t] = r[o % c];
}
return this;
};
var H = /[^+\/0-9A-Za-z-_]/g;
function z(e) {
if ((e = W(e).replace(H, "")).length < 2) return "";
for (;e.length % 4 != 0; ) e += "=";
return e;
}
function W(e) {
return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Z(e) {
return e < 16 ? "0" + e.toString(16) : e.toString(16);
}
function J(e, t) {
t = t || Infinity;
for (var n, i = e.length, a = null, o = [], r = 0; r < i; ++r) {
if ((n = e.charCodeAt(r)) > 55295 && n < 57344) {
if (!a) {
if (n > 56319) {
(t -= 3) > -1 && o.push(239, 191, 189);
continue;
}
if (r + 1 === i) {
(t -= 3) > -1 && o.push(239, 191, 189);
continue;
}
a = n;
continue;
}
if (n < 56320) {
(t -= 3) > -1 && o.push(239, 191, 189);
a = n;
continue;
}
n = 65536 + (a - 55296 << 10 | n - 56320);
} else a && (t -= 3) > -1 && o.push(239, 191, 189);
a = null;
if (n < 128) {
if ((t -= 1) < 0) break;
o.push(n);
} else if (n < 2048) {
if ((t -= 2) < 0) break;
o.push(n >> 6 | 192, 63 & n | 128);
} else if (n < 65536) {
if ((t -= 3) < 0) break;
o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
} else {
if (!(n < 1114112)) throw new Error("Invalid code point");
if ((t -= 4) < 0) break;
o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
}
}
return o;
}
function Y(e) {
for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
return t;
}
function K(e, t) {
for (var n, i, a, o = [], r = 0; r < e.length && !((t -= 2) < 0); ++r) {
i = (n = e.charCodeAt(r)) >> 8;
a = n % 256;
o.push(a);
o.push(i);
}
return o;
}
function X(e) {
return i.toByteArray(z(e));
}
function Q(e, t, n, i) {
for (var a = 0; a < i && !(a + n >= t.length || a >= e.length); ++a) t[a + n] = e[a];
return a;
}
function $(e) {
return e != e;
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"base64-js": 1,
ieee754: 4,
isarray: 3
} ],
3: [ function(e, t, n) {
var i = {}.toString;
t.exports = Array.isArray || function(e) {
return "[object Array]" == i.call(e);
};
}, {} ],
4: [ function(e, t, n) {
n.read = function(e, t, n, i, a) {
var o, r, c = 8 * a - i - 1, s = (1 << c) - 1, l = s >> 1, u = -7, d = n ? a - 1 : 0, h = n ? -1 : 1, g = e[t + d];
d += h;
o = g & (1 << -u) - 1;
g >>= -u;
u += c;
for (;u > 0; o = 256 * o + e[t + d], d += h, u -= 8) ;
r = o & (1 << -u) - 1;
o >>= -u;
u += i;
for (;u > 0; r = 256 * r + e[t + d], d += h, u -= 8) ;
if (0 === o) o = 1 - l; else {
if (o === s) return r ? NaN : Infinity * (g ? -1 : 1);
r += Math.pow(2, i);
o -= l;
}
return (g ? -1 : 1) * r * Math.pow(2, o - i);
};
n.write = function(e, t, n, i, a, o) {
var r, c, s, l = 8 * o - a - 1, u = (1 << l) - 1, d = u >> 1, h = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = i ? 0 : o - 1, f = i ? 1 : -1, p = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
t = Math.abs(t);
if (isNaN(t) || Infinity === t) {
c = isNaN(t) ? 1 : 0;
r = u;
} else {
r = Math.floor(Math.log(t) / Math.LN2);
if (t * (s = Math.pow(2, -r)) < 1) {
r--;
s *= 2;
}
if ((t += r + d >= 1 ? h / s : h * Math.pow(2, 1 - d)) * s >= 2) {
r++;
s /= 2;
}
if (r + d >= u) {
c = 0;
r = u;
} else if (r + d >= 1) {
c = (t * s - 1) * Math.pow(2, a);
r += d;
} else {
c = t * Math.pow(2, d - 1) * Math.pow(2, a);
r = 0;
}
}
for (;a >= 8; e[n + g] = 255 & c, g += f, c /= 256, a -= 8) ;
r = r << a | c;
l += a;
for (;l > 0; e[n + g] = 255 & r, g += f, r /= 256, l -= 8) ;
e[n + g - f] |= 128 * p;
};
}, {} ],
DailyRewardData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3214f8oCIdGv4LUboyfIDRN", "DailyRewardData");
var i = e("./../common/UtilsOther"), a = [], o = cc.Class({
properties: {
id: -1,
roleMaxLevel: 0,
rewardInfos: "",
rewardInfoArr: []
},
init: function(e) {
i.clone(e, this);
this.id = Number(this.id);
this.roleMaxLevel = Number(this.roleMaxLevel);
if (this.rewardInfos && "-1" != this.rewardInfos) {
this.rewardInfoArr = i.splitWithValueType(this.rewardInfos, String, ";");
this.rewardInfoArr.forEach(function(e, t, n) {
var a = i.splitWithValueType(e, Number, ",");
n[t] = {
coins: a[0],
weight: a[1]
};
});
}
}
});
o.setData = function(e) {
o._jsonData = e;
};
o.initData = function() {
if (o._jsonData) {
var e = o._jsonData, t = !0, n = !1, i = void 0;
try {
for (var r, c = e[Symbol.iterator](); !(t = (r = c.next()).done); t = !0) {
var s = r.value, l = new o();
l.init(s);
a.push(l);
}
} catch (e) {
n = !0;
i = e;
} finally {
try {
!t && c.return && c.return();
} finally {
if (n) throw i;
}
}
delete o._jsonData;
o._jsonData = null;
}
};
o.getRewardData = function(e) {
var t = a.length;
if (t <= 0) return null;
for (var n = 0, i = 0, o = 0; o < t; o++) {
n = a[o].roleMaxLevel;
i = o + 1 < t ? a[o + 1].roleMaxLevel : Number.MAX_VALUE;
if (e >= n && e < i) return a[o];
}
return a[t - 1];
};
cc._RF.pop();
}, {
"./../common/UtilsOther": "UtilsOther"
} ],
DataFunc: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "65af3WdcipBA4hi/Q3G/T+7", "DataFunc");
window.dataFunc = {
arrTables: [ "zhongzi", "zhongziperiod" ],
csvTables: {},
csvTableForArr: {},
tableCast: {},
tableComment: {},
CELL_DELIMITERS: [ ",", ";", "\t", "|", "^" ],
LINE_DELIMITERS: [ "\r\n", "\r", "\n" ],
uiPanelAnimationClips: {}
};
dataFunc.randomNum = function(e, t) {
var n = t - e, i = Math.random();
return e + Math.round(i * n);
};
dataFunc.getMyDate = function(e) {
var t = parseInt(e / 1e3), n = Math.floor(t / 3600), i = t % 3600, a = Math.floor(i / 60), o = i % 60;
return dataFunc.addZero(n) + "小时" + dataFunc.addZero(a) + "分" + dataFunc.addZero(o) + "秒";
};
dataFunc.addZero = function(e) {
parseInt(e) < 10 && (e = "0" + e);
return e;
};
dataFunc.getTable = function(e) {
return dataFunc.csvTables[e];
};
dataFunc.getTableArr = function(e) {
return dataFunc.csvTableForArr[e];
};
dataFunc.queryOne = function(e, t, n) {
var i = dataFunc.getTable(e);
if (!i) return null;
if (!t) return i[n];
for (var a in i) if (i.hasOwnProperty(a) && i[a][t] === n) return i[a];
};
dataFunc.queryValue = function(e, t, n) {
var i = dataFunc.getTable(e);
if (!i) return null;
if (t) for (var a in i) if (i.hasOwnProperty(a) && a === n) return i[a][t];
};
dataFunc.queryByID = function(e, t) {
return dataFunc.queryOne(e, null, t);
};
dataFunc.queryAll = function(e, t, n) {
var i = dataFunc.getTable(e);
if (!i || !t) return null;
var a = {};
for (var o in i) i.hasOwnProperty(o) && i[o][t] === n && (a[o] = i[o]);
return a;
};
dataFunc.loadConfigs = function(e, t) {
cc.loader.loadResDir("panelAnimClips", cc.AnimationClip, function(e, t) {
if (e) cc.error(e.message || e); else for (var n = 0; n < t.length; n++) dataFunc.uiPanelAnimationClips[t[n].name] = t[n];
});
var n = 0;
dataFunc.arrTables.forEach(function(a, o) {
cc.loader.loadRes("data/" + a, function(r, c) {
if (r) cc.error(r.message || r); else {
e && e(o + 1, dataFunc.arrTables.length);
i(a, c.text);
t && ++n >= dataFunc.arrTables.length && t();
}
});
});
function i(e, t, n) {
if (!dataFunc.csvTables[e] || n) {
var i = {}, a = [];
o.parse(t, {
header: !0
}, function(e, t) {
i[e[t]] = e;
a.push(e);
});
dataFunc.tableCast[e] = o.opts.cast;
dataFunc.tableComment[e] = o.opts.comment;
dataFunc.csvTables[e] = i;
dataFunc.csvTableForArr[e] = a;
}
}
function a(e, t, n, i) {
return n instanceof Array ? "number" === n[t] ? Number(i[t]) : "boolean" === n[t] ? "true" === i[t] || "t" === i[t] || "1" === i[t] : i[t] : isNaN(Number(e)) ? "false" == e || "true" == e || "t" == e || "f" == e ? "true" === i[t] || "t" === i[t] || "1" === i[t] : i[t] : Number(i[t]);
}
var o = {
STANDARD_DECODE_OPTS: {
skip: 0,
limit: !1,
header: !1,
cast: !1,
comment: ""
},
STANDARD_ENCODE_OPTS: {
delimiter: dataFunc.CELL_DELIMITERS[0],
newline: dataFunc.LINE_DELIMITERS[0],
skip: 0,
limit: !1,
header: !1
},
quoteMark: '"',
doubleQuoteMark: '""',
quoteRegex: /"/g,
assign: function() {
for (var e = Array.prototype.slice.call(arguments), t = e[0], n = e.slice(1), i = 0, a = n.length; i < a; i++) for (var o in n[i]) t[o] = n[i][o];
return t;
},
map: function(e, t) {
for (var n = [], i = 0, a = e.length; i < a; i++) n[i] = t(e[i], i);
return n;
},
getType: function(e) {
return Object.prototype.toString.call(e).slice(8, -1);
},
getLimit: function(e, t) {
return !1 === e ? t : e;
},
buildObjectConstructor: function(e, t, n) {
return function(i) {
var o = new Object(), r = function(e, t) {
return o[e] = t;
};
n ? e.forEach(function(e, o) {
r(e, a(t[o], o, n, i));
}) : e.forEach(function(e, n) {
r(e, a(t[n], n, null, i));
});
return o;
};
},
buildArrayConstructor: function(e, t) {
return function(n) {
var i = new Array(e.length), o = function(e, t) {
return i[e] = t;
};
t ? fields.forEach(function(i, r) {
o(i, a(e[r], r, t, n));
}) : fields.forEach(function(t, i) {
o(t, a(e[i], i, null, n));
});
return i;
};
},
frequency: function(e, t, n) {
void 0 === n && (n = !1);
for (var i = 0, a = 0, o = this.getLimit(n, e.length); a < o && -1 !== (a = e.indexOf(t, a)); ) {
a += 1;
i++;
}
return i;
},
mostFrequent: function(e, t, n) {
for (var i, a = t.length - 1; a >= 0; a--) this.frequency(e, t[a], n) > 0 && (i = t[a]);
return i || t[0];
},
unsafeParse: function(e, t, n) {
var i, a, o = e.split(t.newline);
t.skip > 0 && o.splice(t.skip);
function r(e) {
var n = e.shift();
if (n.indexOf('"') >= 0) {
for (var i = 0, a = 0, o = 0; e.length > 0 && (-1 !== (i = n.indexOf('"', a)) || o % 2 != 0); ) if (-1 !== i) {
a = i + 1;
o++;
} else n = n + t.newline + e.shift();
var r, c = [], s = 0, l = 0, u = 0, d = n.length;
for (var h in n) if (n.hasOwnProperty(h)) {
var g = n[h = parseInt(h)];
if (0 === h && '"' === g) {
s++;
l = 1;
}
if ('"' === g) {
s++;
n[h - 1] === t.delimiter && l === h && l++;
}
if ('"' === g && s % 2 == 0 && (n[h + 1] === t.delimiter || h + 1 === d)) {
u = h;
r = n.substring(l, u);
c.push(r);
u = l = u + 2;
}
if (g === t.delimiter && s % 2 == 0) if ((u = h) > l) {
r = n.substring(l, u);
c.push(r);
u = l = u + 1;
} else if (u === l) {
c.push("");
u = l = u + 1;
}
}
if ((u = d) >= l) {
r = n.substring(l, u);
c.push(r);
}
return c;
}
return n.split(t.delimiter);
}
if (t.header) {
if (!0 === t.header) {
t.comment = r(o);
t.cast = r(o);
i = r(o);
} else "Array" === this.getType(t.header) && (i = t.header);
a = this.buildObjectConstructor(i, o[0].split(t.delimiter), t.cast);
} else a = this.buildArrayConstructor(o[0].split(t.delimiter), t.cast);
for (;o.length > 0; ) {
var c = r(o);
c.length > 1 && n(a(c), i[0]);
}
return !0;
},
parse: function(e, t, n) {
var i;
if ("Function" === this.getType(t)) {
n = t;
t = {};
} else "Function" !== this.getType(n) ? n = (i = []).push.bind(i) : i = [];
t = this.assign({}, this.STANDARD_DECODE_OPTS, t);
this.opts = t;
if (!t.delimiter || !t.newline) {
var a = Math.min(48, Math.floor(e.length / 20), e.length);
t.delimiter = t.delimiter || this.mostFrequent(e, dataFunc.CELL_DELIMITERS, a);
t.newline = t.newline || this.mostFrequent(e, dataFunc.LINE_DELIMITERS, a);
}
return this.unsafeParse(e, t, n) && (!(i.length > 0) || i);
}
};
};
cc._RF.pop();
}, {} ],
DataMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f0614tDnHdKLrNGj3kI3yCG", "DataMgr");
var i = e("./DataObject"), a = e("./GCONFIG"), o = cc.Class({
ctor: function() {
this.playerObj = new i.PlayerObject();
this.iapObj = new i.IapObject();
this.settingObj = new i.SettingObject();
this.guideObj = new i.GuideObject();
this.chestObj = new i.ChestObject();
this.achieveObj = new i.AchieveObject();
},
statics: {
instance: null,
getInstance: function() {
null == o.instance && (o.instance = new o());
return o.instance;
}
},
loadDataFromLocal: function() {
cc.log("...load local data start...");
var e = cc.sys.localStorage.getItem(a.KEY_PLAYERDATA);
e && this.playerObj.parse(JSON.parse(e));
(e = cc.sys.localStorage.getItem(a.KEY_IAPDATA)) && this.iapObj.parse(JSON.parse(e));
(e = cc.sys.localStorage.getItem(a.KEY_SETTING)) && this.settingObj.parse(JSON.parse(e));
(e = cc.sys.localStorage.getItem(a.KEY_GAME_GUIDE_DATA)) && this.guideObj.parse(JSON.parse(e));
(e = cc.sys.localStorage.getItem(a.KEY_CHEST_DATA)) && this.chestObj.parse(JSON.parse(e));
(e = cc.sys.localStorage.getItem(a.KEY_ACHIEVE_DATA)) && this.achieveObj.parse(JSON.parse(e));
cc.log("...load local data finished...");
},
saveDataToLocal: function() {
cc.log("...save data to local start...");
cc.sys.localStorage.setItem(a.KEY_PLAYERDATA, this.playerObj.toString());
cc.sys.localStorage.setItem(a.KEY_IAPDATA, this.iapObj.toString());
cc.sys.localStorage.setItem(a.KEY_SETTING, this.settingObj.toString());
cc.sys.localStorage.setItem(a.KEY_GAME_GUIDE_DATA, this.guideObj.toString());
cc.sys.localStorage.setItem(a.KEY_CHEST_DATA, this.chestObj.toString());
cc.sys.localStorage.setItem(a.KEY_ACHIEVE_DATA, this.achieveObj.toString());
cc.log("...save data to local finished...");
}
});
t.exports = o;
cc._RF.pop();
}, {
"./DataObject": "DataObject",
"./GCONFIG": "GCONFIG"
} ],
DataObject: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "17a0doA5SJKoqDwFu7p2V05", "DataObject");
var i = cc.Class({
properties: {},
parse: function(e) {
var t;
for (t in e) this.hasOwnProperty(t) && void 0 !== e[t] && null !== e[t] && (this[t] = e[t]);
},
toString: function() {
return JSON.stringify(this);
}
}), a = cc.Class({
extends: i,
properties: {
uid: 0,
fbid: 0,
fbtoken: 0,
fbicon: "",
fbname: "",
fb_cache_key: "",
bid: "",
coins: 1e5,
nickname: "逢赌必赢",
rkeys: 10,
avatar: ""
},
ctor: function() {
this.props = cc.js.createMap();
void 0 === this.lastDailyRewardTime && (this.lastDailyRewardTime = 0);
void 0 === this.normalGameTimes && (this.normalGameTimes = 0);
void 0 === this.challengeGameTimes && (this.challengeGameTimes = 0);
void 0 === this.isControlTime && (this.isControlTime = !0);
},
getMaxGunLevel: function() {
for (var e = 0, t = 1; t <= GlobalNiuNiu.config.GUN_COUNTS; t++) e = Math.max(e, this[cc.js.formatStr("gun%dLevel", t)]);
return e;
}
}), o = cc.Class({
extends: i,
properties: {
type: 0,
num: 0
},
ctor: function() {},
init: function(e, t) {
this.type = e;
this.num = t;
}
}), r = cc.Class({
extends: i,
properties: {
hadPay: 0,
propRefreshTime: 0,
prop1hadBuy: !1,
prop2hadBuy: !1,
prop3hadBuy: !1,
shopProps: [],
showPropTips: !1,
vipValid: !1
}
}), c = cc.Class({
extends: i,
properties: {
musicOn: !0,
effectOn: !0,
musicVol: 1,
effectVol: 1,
notify: !0
}
}), s = cc.Class({
extends: i,
properties: {
accCoins: 0,
killMonsters: 0,
gotFrozens: 0,
gotShields: 0,
hadDone: null
},
ctor: function() {
this.hadDone = cc.js.createMap();
}
}), l = cc.Class({
extends: i,
properties: {
oneOnlyNum: 0,
starNumCollect: 0,
shortOpenTime: 0,
longOpenTime: 0,
showChestTips: !1
}
}), u = cc.Class({
extends: i,
properties: {}
});
t.exports = {
DataObject: i,
PlayerObject: a,
PropObject: o,
IapObject: r,
SettingObject: c,
GuideObject: u,
ChestObject: l,
AchieveObject: s
};
cc._RF.pop();
}, {} ],
DialogCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "643a4tFjXxPPZc29sk64lAE", "DialogCtrl");
var i = e("./../common/ViewBase"), a = e("./../common/ViewMgr"), o = cc.Class({
extends: i,
properties: {
btnLeft: cc.Node,
btnRight: cc.Node,
content: cc.Label,
leftCall: null,
rightCall: null
},
start: function() {},
initView: function(e, t, n, i, a) {
this.content.string = e;
t ? this.btnLeft.getChildByName("Label").getComponent(cc.Label).string = t : this.btnLeft.active = !1;
n ? this.btnRight.getChildByName("Label").getComponent(cc.Label).string = n : this.btnRight.active = !1;
i && (this.leftCall = i);
a && (this.rightCall = a);
},
onBtnLeft: function() {
this._rmSelf();
this.leftCall && this.leftCall();
},
onBtnRight: function() {
this._rmSelf();
this.rightCall && this.rightCall();
},
_rmSelf: function() {
this.node.removeFromParent(!0);
this.node.destroy();
}
});
o.show = function(e, t, n, i, o) {
var r = cc.instantiate(GlobalNiuNiu.assetMgr.dialogPrefab);
r.getComponent("DialogCtrl").initView(e, t, n, i, o);
a.getInstance().pushViewImmediate(r);
};
o.showGreen = function(e, t, n) {
o.show(e, null, t, null, n);
};
o.showRed = function(e, t, n) {
o.show(e, t, null, n, null);
};
cc._RF.pop();
}, {
"./../common/ViewBase": "ViewBase",
"./../common/ViewMgr": "ViewMgr"
} ],
DoorBg: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a1b30h3aURETa8JOLsNn1Wq", "DoorBg");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
tip: cc.Prefab
},
onLoad: function() {
cc.sys.localStorage.clear("backToMain");
if (null == cc.sys.localStorage.getItem("backToMain")) {
var e = cc.instantiate(this.tip);
e.parent = this.node.parent;
e.getComponent("Tip").setItem("去社区");
e.x = this.node.x;
e.y = this.node.y;
}
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
cc.find("Canvas/KuangChi/view/content/DoorTop").getComponent("DoorTop").startClose();
cc.find("Canvas/KuangChi/view/content/DoorBottom").getComponent("DoorBottom").startClose();
}, this);
}
});
cc._RF.pop();
}, {} ],
DoorBottom: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d9240gdMDdKNY4n+HQ39DRI", "DoorBottom");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
isOpen: !1,
audioClip: {
type: cc.AudioClip,
default: null
},
DoorTop: cc.Node
},
startOpen: function() {
if (!this.isOpen) {
this.isOpen = !0;
null == cc.sys.localStorage.getItem("backToMain") && cc.sys.localStorage.setItem("backToMain", 1);
var e = cc.sequence(cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionOut()), cc.callFunc(this.startClose, this));
this.node.runAction(e);
}
},
startClose: function() {
if (this.isOpen) {
this.isOpen = !1;
var e = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionIn());
this.node.runAction(e);
}
},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
if (1 == Global.PageMgr.state) {
this.startOpen();
cc.audioEngine.play(this.audioClip, !1, GameData.audio + 0);
setTimeout(function() {
Global.PageMgr.onClosePage(0);
}, 1e3 * this.jumpDuration);
this.DoorTop.getComponent("DoorTop").startOpen();
} else Global.PageMgr.showTipPage("时空转换器开启中");
}, this);
}
});
cc._RF.pop();
}, {} ],
DoorTop: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1f69f5sADRBWrRcatcwTdxC", "DoorTop");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
audioClip: {
type: cc.AudioClip,
default: null
},
isOpen: !1,
DoorBottom: cc.Node
},
startOpen: function() {
if (!this.isOpen) {
this.isOpen = !0;
null == cc.sys.localStorage.getItem("backToMain") && cc.sys.localStorage.setItem("backToMain", 1);
var e = cc.sequence(cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()), cc.callFunc(this.startClose, this));
this.node.runAction(e);
}
},
startClose: function() {
if (this.isOpen) {
this.isOpen = !1;
var e = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
this.node.runAction(e);
}
},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
if (1 == Global.PageMgr.state) {
this.startOpen();
cc.audioEngine.play(this.audioClip, !1, GameData.audio + 0);
setTimeout(function() {
Global.PageMgr.onClosePage(0);
}, 1e3 * this.jumpDuration);
this.DoorBottom.getComponent("DoorBottom").startOpen();
} else Global.PageMgr.showTipPage("时空转换器开启中");
}, this);
}
});
cc._RF.pop();
}, {} ],
DragSelect: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0a947WkQyZKsam4FQ+0roUk", "DragSelect");
cc.Class({
extends: cc.Component,
start: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.cardsArr = this.node.getChildren();
var e = this.cardsArr[0];
this.CARD_DISTANCE = e.width * e.anchorX + this.node.getComponent(cc.Layout).spacingX;
cc.log("CARD_DISTANCE: " + this.CARD_DISTANCE);
},
onTouchStart: function(e) {
var t = e.getLocation(), n = this._beginPos = this.node.convertToNodeSpaceAR(t);
this._checkSelectCard(n, n, !0);
},
onTouchMove: function(e) {
var t = e.getLocation(), n = this.node.convertToNodeSpaceAR(t);
this._checkSelectCard(n, n);
this._checkSelectCardReverse(this._beginPos, n);
},
onTouchEnd: function(e) {
var t = !0, n = !1, i = void 0;
try {
for (var a, o = this.cardsArr[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var r = a.value.getComponent("CardCtrl");
r.touched && (r.selected = !r.selected);
r.touched = !1;
}
} catch (e) {
n = !0;
i = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (n) throw i;
}
}
},
_checkSelectCard: function(e, t, n) {
var i = this.cardsArr.length;
if (n) for (var a = i - 1; a >= 0; a--) {
var o = this.cardsArr[a];
if (cc.rectContainsPoint(o.getBoundingBox(), e)) {
o.getComponent("CardCtrl").touched = !0;
return;
}
} else for (var r = Math.max(1, Math.abs(e.x - t.x)), c = Math.max(1, Math.abs(e.y - t.y)), s = Math.min(e.x, t.x), l = Math.min(e.y, t.y), u = cc.rect(s, l, r, c), d = i - 1; d >= 0; d--) {
var h = this.cardsArr[d];
if (cc.rectIntersectsRect(h.getBoundingBox(), u)) {
h.getComponent("CardCtrl").touched = !0;
return;
}
}
},
_checkSelectCardReverse: function(e, t) {
for (var n = e.x < t.x ? e : t, i = Math.abs(e.x - t.x), a = Math.abs(e.y - t.y), o = cc.rect(n.x, n.y, i, a), r = this.cardsArr.length, c = r - 1; c >= 0; c--) {
var s = this.cardsArr[c];
cc.rectIntersectsRect(s.getBoundingBox(), o) || (s.getComponent("CardCtrl").touched = !1);
}
for (var l = 0; l < r; l++) {
var u = this.cardsArr[l];
n.x - u.x >= this.CARD_DISTANCE && (u.getComponent("CardCtrl").touched = !1);
}
}
});
cc._RF.pop();
}, {} ],
Dssc: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "965542AQ+dGJ6THH7D/WvxQ", "Dssc");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
GameData.audio = 1;
},
Nav: function(e, t) {
Global.ResourceMgr.playTransitionIn();
cc.director.loadScene(t, function() {});
},
closeGames: function() {
try {
app.closeUI();
} catch (e) {
console.log(e);
}
},
start: function() {}
});
cc._RF.pop();
}, {} ],
EmailDetailPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "09a9dNKyD1MbZQc3yIKyEDC", "EmailDetailPanel");
cc.Class({
extends: cc.Component,
properties: {
label_content: cc.Label
},
start: function() {},
setData: function(e) {
this.label_content.string = e.content;
}
});
cc._RF.pop();
}, {} ],
EmailPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9b6e6LcvoVJ8oGX3acEI4ls", "EmailPanel");
cc.Class({
extends: cc.Component,
properties: {
emailItem: cc.Prefab,
container_email: cc.Node
},
start: function() {},
onEnable: function() {
var e = this;
Global.ProtocolMgr.queryEmail(function(t) {
console.log(t);
200 == t.code ? function() {
var n = t.data.list;
console.log(n);
e.container_email.removeAllChildren();
for (var i = function(t) {
var i = cc.instantiate(e.emailItem);
i.getComponent("emailItem").setData(n[t]);
i.on(cc.Node.EventType.TOUCH_END, function() {
Global.PageMgr.onOpenPage(20);
Global.PageMgr.pages[20].getComponent("EmailDetailPanel").setData(n[t]);
0 == n[t].state && Global.ProtocolMgr.readEmail(n[t].id, function(e) {
200 == e.code ? console.log(e) : Global.PageMgr.showTipPage(e.message);
});
});
e.container_email.addChild(i);
}, a = 0; a < n.length; a++) i(a);
}() : Global.PageMgr.showTipPage(t.message);
});
}
});
cc._RF.pop();
}, {} ],
Email: [ function(require, module, exports) {
"use strict";
cc._RF.push(module, "78a9a5jyzRKPJuAhYW6YEdA", "Email");
cc.Class({
extends: cc.Component,
properties: {
EmailItem: cc.Prefab,
Content: cc.Node,
EmailContent: cc.Node,
load: cc.Node
},
onLoad: function() {
cc.director.GlobalEvent.on("EmailData", this.onEmailUpdate, this);
},
start: function() {},
onEnable: function() {
Global.ProtocolMgr.queryEmail(1);
},
onEmailUpdate: function onEmailUpdate() {
var _this = this;
this.load.active = !1;
var children = this.Content.children;
children.forEach(function(e) {
e.destroy();
});
for (var _loop = function _loop(i) {
var node = cc.instantiate(_this.EmailItem);
node.parent = _this.Content;
node.getChildByName("Title").getComponent(cc.Label).string = GameData.EmailData[i].title;
node.getChildByName("Time").getComponent(cc.Label).string = _this.getMyDate(GameData.EmailData[i].createTime);
node.getChildByName("Tag").getComponent(cc.Label).string = 0 == eval(GameData.EmailData[i].isRead) ? "未读" : "已读";
node.on(cc.Node.EventType.TOUCH_END, function() {
_this.showEmailContent(i);
Global.ProtocolMgr.readEmail(GameData.EmailData[i].id);
}, _this);
}, i = 0; i < GameData.EmailData.length; i++) _loop(i);
},
onScrolling: function(e) {
if (0 == e.content.y % 1260 && e.content.y / 1260 != 0 && GameData.ClickState) {
this.load.active = !0;
GameData.ClickState = 0;
Global.ProtocolMgr.queryEmail(e.content.y / 1260 + 1);
}
},
showEmailContent: function(e) {
this.EmailContent.active = !0;
this.EmailContent.getChildByName("Title").getComponent(cc.Label).string = GameData.EmailData[e].title;
this.EmailContent.getChildByName("Time").getComponent(cc.Label).string = this.getMyDate(GameData.EmailData[e].createTime);
this.EmailContent.getChildByName("New ScrollView").getChildByName("view").getChildByName("Content").getComponent(cc.Label).string = GameData.EmailData[e].content;
},
closeEmailContent: function() {
this.EmailContent.active = !1;
this.EmailContent.getChildByName("Title").getComponent(cc.Label).string = "";
this.EmailContent.getChildByName("Time").getComponent(cc.Label).string = "";
this.EmailContent.getChildByName("New ScrollView").getChildByName("view").getChildByName("Content").getComponent(cc.Label).string = "";
},
getMyDate: function(e) {
var t = new Date(e), n = t.getFullYear(), i = t.getMonth() + 1, a = t.getDate(), o = t.getHours(), r = t.getMinutes(), c = t.getSeconds();
return n + "-" + this.addZero(i) + "-" + this.addZero(a) + " " + this.addZero(o) + ":" + this.addZero(r) + ":" + this.addZero(c);
},
addZero: function(e) {
parseInt(e) < 10 && (e = "0" + e);
return e;
},
onDestroy: function() {
cc.director.GlobalEvent.off("EmailData");
}
});
cc._RF.pop();
}, {} ],
Encrypt: [ function(e, t, n) {
(function(i) {
"use strict";
cc._RF.push(t, "d01c6ZTO/VDm45rxncbJpPQ", "Encrypt");
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
(function(e, i) {
"undefined" != typeof n && "undefined" != typeof t ? t.exports = i() : "function" == typeof define && "object" === a(define.amd) ? define(i) : "function" == typeof define && "object" === a(define.petal) ? define("encryptjs", [], i) : this.encryptjs = i();
})(0, function(n) {
(n = {
version: "1.0.0"
}).init = function() {
console.log("--------------------Applying Encryption Algorithm------------------ ");
};
var o = null;
"undefined" != typeof t && t.exports && (o = e("./Algo"));
n.encrypt = function(e, t, i) {
if (128 != i && 192 != i && 256 != i) return "";
e = String(e).utf8Encode();
t = String(t).utf8Encode();
for (var a = i / 8, r = new Array(a), c = 0; c < a; c++) r[c] = isNaN(t.charCodeAt(c)) ? 0 : t.charCodeAt(c);
var s = o.cipher(r, o.keyExpansion(r));
s = s.concat(s.slice(0, a - 16));
for (var l = new Array(16), u = new Date().getTime(), d = u % 1e3, h = Math.floor(u / 1e3), g = Math.floor(65535 * Math.random()), f = 0; f < 2; f++) l[f] = d >>> 8 * f & 255;
for (var p = 0; p < 2; p++) l[p + 2] = g >>> 8 * p & 255;
for (var m = 0; m < 4; m++) l[m + 4] = h >>> 8 * m & 255;
for (var b = "", _ = 0; _ < 8; _++) b += String.fromCharCode(l[_]);
for (var y = o.keyExpansion(s), v = Math.ceil(e.length / 16), C = new Array(v), N = 0; N < v; N++) {
for (var P = 0; P < 4; P++) l[15 - P] = N >>> 8 * P & 255;
for (var S = 0; S < 4; S++) l[15 - S - 4] = N / 4294967296 >>> 8 * S;
for (var w = o.cipher(l, y), D = N < v - 1 ? 16 : (e.length - 1) % 16 + 1, E = new Array(D), R = 0; R < D; R++) {
E[R] = w[R] ^ e.charCodeAt(16 * N + R);
E[R] = String.fromCharCode(E[R]);
}
C[N] = E.join("");
}
var T = b + C.join("");
return T = n.base64Encode(T);
};
n.decrypt = function(e, t, i) {
if (128 != i && 192 != i && 256 != i) return "";
e = n.base64Decode(String(e));
t = String(t).utf8Encode();
for (var a = i / 8, r = new Array(a), c = 0; c < a; c++) r[c] = isNaN(t.charCodeAt(c)) ? 0 : t.charCodeAt(c);
var s = o.cipher(r, o.keyExpansion(r));
s = s.concat(s.slice(0, a - 16));
for (var l = new Array(8), u = e.slice(0, 8), d = 0; d < 8; d++) l[d] = u.charCodeAt(d);
for (var h = o.keyExpansion(s), g = Math.ceil((e.length - 8) / 16), f = new Array(g), p = 0; p < g; p++) f[p] = e.slice(8 + 16 * p, 8 + 16 * p + 16);
e = f;
for (var m = new Array(e.length), b = 0; b < g; b++) {
for (var _ = 0; _ < 4; _++) l[15 - _] = b >>> 8 * _ & 255;
for (var y = 0; y < 4; y++) l[15 - y - 4] = (b + 1) / 4294967296 - 1 >>> 8 * y & 255;
for (var v = o.cipher(l, h), C = new Array(e[b].length), N = 0; N < e[b].length; N++) {
C[N] = v[N] ^ e[b].charCodeAt(N);
C[N] = String.fromCharCode(C[N]);
}
m[b] = C.join("");
}
var P = m.join("");
return P = P.utf8Decode();
};
var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
n.base64Encode = function(e) {
var t = "", i = void 0, a = void 0, o = void 0, c = void 0, s = void 0, l = void 0, u = void 0, d = 0;
e = n._utf8_encode(e);
for (;d < e.length; ) {
i = e.charCodeAt(d++);
a = e.charCodeAt(d++);
o = e.charCodeAt(d++);
c = i >> 2;
s = (3 & i) << 4 | a >> 4;
l = (15 & a) << 2 | o >> 6;
u = 63 & o;
isNaN(a) ? l = u = 64 : isNaN(o) && (u = 64);
t = t + r.charAt(c) + r.charAt(s) + r.charAt(l) + r.charAt(u);
}
return t;
};
n.base64Decode = function(e) {
var t = "", i = void 0, a = void 0, o = void 0, c = void 0, s = void 0, l = void 0, u = void 0, d = 0;
e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;d < e.length; ) {
c = r.indexOf(e.charAt(d++));
s = r.indexOf(e.charAt(d++));
l = r.indexOf(e.charAt(d++));
u = r.indexOf(e.charAt(d++));
i = c << 2 | s >> 4;
a = (15 & s) << 4 | l >> 2;
o = (3 & l) << 6 | u;
t += String.fromCharCode(i);
64 != l && (t += String.fromCharCode(a));
64 != u && (t += String.fromCharCode(o));
}
return t = n._utf8_decode(t);
};
n._utf8_encode = function(e) {
e = e.replace(/\r\n/g, "\n");
for (var t = "", n = 0; n < e.length; n++) {
var i = e.charCodeAt(n);
if (i < 128) t += String.fromCharCode(i); else if (i > 127 && i < 2048) {
t += String.fromCharCode(i >> 6 | 192);
t += String.fromCharCode(63 & i | 128);
} else {
t += String.fromCharCode(i >> 12 | 224);
t += String.fromCharCode(i >> 6 & 63 | 128);
t += String.fromCharCode(63 & i | 128);
}
}
return t;
};
n._utf8_decode = function(e) {
for (var t = "", n = 0, i = 0, a = 0, o = 0; n < e.length; ) if ((i = e.charCodeAt(n)) < 128) {
t += String.fromCharCode(i);
n++;
} else if (i > 191 && i < 224) {
a = e.charCodeAt(n + 1);
t += String.fromCharCode((31 & i) << 6 | 63 & a);
n += 2;
} else {
a = e.charCodeAt(n + 1);
o = e.charCodeAt(n + 2);
t += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | 63 & o);
n += 3;
}
return t;
};
n.getTextEncryptAndSaveToTextFile = function(e, t, n) {
throw Error("Command line not supported on this platform");
};
n.getTextEncryptAndSaveToJSONFile = function(e, t, n) {
throw Error("Command line not supported on this platform");
};
n.writeCipherTextToJSON = function(e, t, n, i) {
if (null == i) {
i = n;
n = {};
}
var o = "object" === ("undefined" == typeof n ? "undefined" : a(n)) && null !== n && "spaces" in n ? n.spaces : this.spaces;
try {
JSON.stringify(t, n ? n.replacer : null, o) + "\n";
} catch (e) {
if (i) return i(e, null);
}
};
"undefined" == typeof String.prototype.utf8Encode && (String.prototype.utf8Encode = function() {
return unescape(encodeURIComponent(this));
});
"undefined" == typeof String.prototype.utf8Decode && (String.prototype.utf8Decode = function() {
try {
return decodeURIComponent(escape(this));
} catch (e) {
return this;
}
});
"undefined" == typeof String.prototype.base64Encode && (String.prototype.base64Encode = function() {
if ("undefined" != typeof btoa) return btoa(this);
if ("undefined" != typeof i) return new i(this, "utf8").toString("base64");
throw new Error("No Base64 Encode");
});
"undefined" == typeof String.prototype.base64Decode && (String.prototype.base64Decode = function() {
if ("undefined" != typeof atob) return atob(this);
if ("undefined" != typeof i) return new i(this, "base64").toString("utf8");
throw new Error("No Base64 Decode");
});
n.init();
return n;
});
cc._RF.pop();
}).call(this, e("buffer").Buffer);
}, {
"./Algo": "Algo",
buffer: 2
} ],
EnemyBaseData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "34616/OLB5PRb+SOEFVlxct", "EnemyBaseData");
var i = e("./../common/UtilsOther"), a = cc.Enum({
NULL: 0,
NORMAL: 1,
ADVANCED: 2,
BOSS: 3,
EGG: 4,
TORTOISE: 5,
TIGER: 6,
FLY_REWARD: 7
}), o = cc.Enum({
NULL: 0,
THROW_TOP: 1,
THROW_SIDE: 2,
HORIZONTAL: 3
}), r = cc.Enum({
NULL: 0,
BOMB: 1,
CALL_ENEMYS: 2,
HIDE: 3
}), c = cc.Enum({
NULL: 0,
COINS: 1,
PROP_FROZEN: 2,
PROP_SHIELD: 3,
COINS_SPECIAL: 4
}), s = {}, l = [], u = cc.Class({
statics: {
Type: a,
MoveType: o,
SkillType: r,
DropItemType: c,
ID_DEFAULT: 1,
ID_NULL: 0,
GROUP_APPEAR: "appear",
_jsonData: null
},
properties: {
id: -1,
type: a.NULL,
minBlood: 0,
maxBlood: 0,
scale: "",
scaleArr: [],
rotatePeriod: "",
rotatePeriodArr: [],
moveType: "",
moveTypeArr: [],
breedBloodRatio: 0,
breedOdds: 0,
canSpeedUp: 0,
skillType: "",
skillTypeArr: [],
dropItem: "",
dropItemArr: [],
avatarId: "",
avatarIdArr: [],
fixPath: !1,
notCalcNum: !1,
subEnemyId: "",
subEnemyIdArr: []
},
init: function(e) {
i.clone(e, this);
this.id = Number(this.id);
this.type = Number(this.type);
this.minBlood = Number(this.minBlood);
this.maxBlood = Number(this.maxBlood);
this.breedBloodRatio = Number(this.breedBloodRatio);
this.breedOdds = Number(this.breedOdds);
this.canSpeedUp = Number(this.canSpeedUp);
this.scaleArr = i.splitWithValueType(this.scale, Number, ",");
this.rotatePeriodArr = i.splitWithValueType(this.rotatePeriod, Number, ",");
this.moveTypeArr = i.splitWithValueType(this.moveType, Number, ",");
this.skillTypeArr = i.splitWithValueType(this.skillType, Number, ",");
if (this.dropItem && "-1" != this.dropItem) {
this.dropItemArr = i.splitWithValueType(this.dropItem, String, ";");
this.dropItemArr.forEach(function(e, t, n) {
var a = i.splitWithValueType(e, Number, ",");
n[t] = {
type: a[0],
odds: a[1],
num: a[2]
};
});
}
this.avatarIdArr = i.splitWithValueType(this.avatarId, Number, ",");
this.fixPath = "true" === this.fixPath;
this.notCalcNum = "true" === this.notCalcNum;
this.subEnemyId && "-1" != this.subEnemyId && (this.subEnemyIdArr = i.splitWithValueType(this.subEnemyId, Number, ","));
},
getRandomScale: function() {
var e = i.arrayRandomValue(this.scaleArr);
null == e && (e = 1);
return e;
},
getRandomRotatePeriod: function() {
var e = i.arrayRandomValue(this.rotatePeriodArr);
null == e && (e = 0);
return e;
},
getRandomMoveType: function() {
var e = i.arrayRandomValue(this.moveTypeArr);
null == e && (e = o.THROW_TOP);
return e;
},
getRandomAvatarId: function() {
var e = i.arrayRandomValue(this.avatarIdArr);
null == e && (e = u.ID_DEFAULT);
return e;
},
getSmallerScale: function(e) {
for (var t = this.scaleArr.length - 1; t >= 0; t--) if (this.scaleArr[t] < e) return this.scaleArr[t];
return 0;
},
isOwnSkill: function(e) {
return this.skillTypeArr.indexOf(e) >= 0;
},
getDropItemArr: function() {
var e = [], t = null;
for (var n in this.dropItemArr) {
t = this.dropItemArr[n];
Math.random() < t.odds && e.push(t);
}
return e;
},
getDropItem: function(e) {
var t = !0, n = !1, i = void 0;
try {
for (var a, o = this.dropItemArr[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var r = a.value;
if (r.type == e) return r;
}
} catch (e) {
n = !0;
i = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (n) throw i;
}
}
return null;
}
});
u.setData = function(e) {
u._jsonData = e;
};
u.initData = function() {
if (u._jsonData) {
var e = u._jsonData;
for (var t in e) {
var n = new u();
n.init(e[t]);
s[e[t].id] = n;
l.push(n);
}
delete u._jsonData;
u._jsonData = null;
}
};
u.getData = function(e) {
return s[e];
};
u.getDataList = function() {
return l;
};
cc._RF.pop();
}, {
"./../common/UtilsOther": "UtilsOther"
} ],
EnemyGroupData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "151f1H21khOcpCAXWlrs0Zh", "EnemyGroupData");
var i = e("./../common/UtilsOther"), a = e("./EnemyBaseData"), o = {}, r = [], c = cc.Class({
statics: {
_jsonData: null
},
properties: {
id: -1,
enemysInfo: "",
enemyInfoArr: [],
createTimes: 0
},
init: function(e) {
i.clone(e, this);
this.id = Number(this.id);
this.enemyInfoArr = i.splitWithValueType(this.enemysInfo, String, ";");
this.enemyInfoArr.forEach(function(e, t, n) {
var a = i.splitWithValueType(e, Number, ",");
n[t] = {
id: a[0],
num: a[1],
isLimitOthers: a[2]
};
});
this.createTimes = Number(this.createTimes);
},
clone: function(e) {
this.id = e.id;
this.enemysInfo = e.enemysInfo;
this.enemyInfoArr = JSON.parse(JSON.stringify(e.enemyInfoArr));
this.createTimes = e.createTimes;
return this;
},
getRandomEnemy: function() {
var e = this.enemyInfoArr.length;
if (e <= 0 || this.createTimes <= 0) return null;
var t = i.randomInteger(0, e - 1), n = this.enemyInfoArr[t];
n.num--;
n.num <= 0 && i.arrayRmObj(this.enemyInfoArr, n);
this.createTimes--;
return a.getData(n.id);
},
isRemainEnemy: function() {
return this.enemyInfoArr.length > 0 && this.createTimes > 0;
},
isLimitOthers: function(e) {
var t = !0, n = !1, i = void 0;
try {
for (var a, o = this.enemyInfoArr[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var r = a.value;
if (r.id == e) return r.isLimitOthers;
}
} catch (e) {
n = !0;
i = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (n) throw i;
}
}
return !1;
}
});
c.setData = function(e) {
c._jsonData = e;
};
c.initData = function() {
if (c._jsonData) {
var e = c._jsonData;
for (var t in e) {
var n = new c();
n.init(e[t]);
o[e[t].id] = n;
r.push(n);
}
delete c._jsonData;
c._jsonData = null;
}
};
c.getData = function(e) {
return o[e];
};
c.getDataCopy = function(e) {
return e instanceof c ? new c().clone(e) : null;
};
c.getDataList = function() {
return r;
};
cc._RF.pop();
}, {
"./../common/UtilsOther": "UtilsOther",
"./EnemyBaseData": "EnemyBaseData"
} ],
FaHongBao: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9b2163aF7tES4UTQy0h25XT", "FaHongBao");
cc.Class({
extends: cc.Component,
properties: {
JinECount: 5,
LeiQuCount: 10,
JinE: cc.Node,
LeiQu: cc.Node,
Tab: cc.Prefab,
LeiQuTab: cc.Prefab
},
onLoad: function() {
cc.director.GlobalEvent.on("FaHongBaoConfig", this.onUpdateFaHongBaoConfig, this);
Global.ProtocolMgr.faHongBaoConfig();
this.numText = this.node.getChildByName("Num").getComponent(cc.Label);
this.curLeiQU = 0;
this.node.getChildByName("发红包").on(cc.Node.EventType.TOUCH_END, this.faHongBao, this);
this.node.getChildByName("发5个红包").on(cc.Node.EventType.TOUCH_END, this.faHongBaos, this);
},
onUpdateFaHongBaoConfig: function() {
for (var e = GameData.FaHongBaoConfig.redPackAmounts, t = GameData.FaHongBaoConfig.bombDigitals, n = 0; n < 5; n++) {
var i = cc.instantiate(this.Tab);
i.parent = this.JinE;
i.getChildByName("Label").getComponent(cc.Label).string = e[n];
}
for (var a = 0; a < t.length; a++) {
var o = cc.instantiate(this.LeiQuTab);
o.parent = this.LeiQu;
o.getChildByName("Label").getComponent(cc.Label).string = t[a];
}
},
onEnable: function() {
if (this.JinE.children.length > 0) {
this.JinE.children[0].getComponent(cc.Toggle).isChecked = !0;
this.LeiQu.children[0].getComponent(cc.Toggle).isChecked = !0;
}
},
start: function() {},
faHongBao: function() {
var e = this;
Global.ProtocolMgr.faHongBao(this.curLeiQU, parseInt(this.numText.string), 1, function(t) {
if (200 == t.code) {
Global.PageMgr.closeLoadingPage();
e.node.active = !1;
} else {
Global.PageMgr.closeLoadingPage();
Global.PageMgr.showTipPage2(t.message);
}
});
},
faHongBaos: function() {
var e = this;
Global.ProtocolMgr.faHongBao(this.curLeiQU, parseInt(this.numText.string), 5, function(t) {
if (200 == t.code) {
Global.PageMgr.closeLoadingPage();
e.node.active = !1;
} else {
Global.PageMgr.closeLoadingPage();
Global.PageMgr.showTipPage(t.message);
}
});
},
JinEToggle: function(e) {
var t = parseInt(e.node.getChildByName("Label").getComponent(cc.Label).string);
this.numText.string = t;
},
LeiQuToggle: function(e) {
var t = parseInt(e.node.getChildByName("Label").getComponent(cc.Label).string);
console.log(t);
this.curLeiQU = t;
}
});
cc._RF.pop();
}, {} ],
FacebookMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "580bedOpK9LVronfmXGcM6P", "FacebookMgr");
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("./Facebook"), o = cc.Class({
ctor: function() {
this.facebook = new a();
this.inviteFriends = [];
this.installFriends = [];
this._initSuccess = !1;
this._onInviteFriendsCallback = null;
this._loginCallback = null;
this._loginFailCallback = null;
this._requestPicCallback = null;
this._requestNameCallback = null;
this._permissions = [];
},
statics: {
instance: null,
getInstance: function() {
null == o.instance && (o.instance = new o());
return o.instance;
}
},
initFacebook: function(e, t) {
this._initSuccess = this.facebook.init(this, e);
this._permissions = t;
},
loginFacebook: function(e, t, n, i) {
if (!this._initSuccess) {
this.initFacebook(e, t);
if (!this._initSuccess) {
i && i();
return;
}
}
this._permissions = t;
this._loginCallback = n;
this._loginFailCallback = i;
if (this.facebook.isLoggedIn()) {
cc.log("FacebookMgr: to requestInvitableFriends");
this.facebook.requestInvitableFriends();
n && n();
} else {
cc.log("FacebookMgr: to login");
this.facebook.login(this._permissions);
}
},
logout: function() {
this.isLogin() && this.facebook.logout();
},
getAccessToken: function() {
return this.facebook.getAccessToken();
},
getUserID: function() {
return this.facebook.getUserID();
},
inviteFriendsWithInviteIds: function(e, t, n, i) {
if (cc.sys.isMobile) {
this._onInviteFriendsCallback = i;
this.facebook.inviteFriendsWithInviteIds(e, t, n);
} else i(!0, null);
},
getInviteRequest: function() {
var e = new Object();
this.facebook.api("/me/apprequests", "GET", e, "apprequests");
},
requestInvitableFriends: function() {
var e = new Object();
this.facebook.api("/me/app_requests", "GET", e, "invitable_friends");
},
requestUserPicture: function(e) {
this._requestPicCallback = e;
this.facebook.requestUserPicture();
},
requestUserName: function(e) {
this._requestNameCallback = e;
this.facebook.requestUserName();
},
fetchFriends: function() {
this.isLogin() && this.facebook.fetchFriends();
},
shareLink: function(e, t, n, i, a) {
if (this.isLogin()) {
this._shareCallback = a;
this.facebook.dialogLink(e, t, n, i);
}
},
isLogin: function() {
return this._initSuccess && this.facebook.isLoggedIn();
},
onLogin: function(e, t) {
cc.log("onLogin");
if (e) {
cc.log("FacebookMgr: Facebook had login");
this.facebook.requestInvitableFriends();
this._loginCallback && this._loginCallback();
} else {
cc.log("FacebookMgr: Facebook login fail  msg: " + t);
this._loginFailCallback && this._loginFailCallback();
}
},
onGetUserInfo: function(e) {
cc.log("onGetUserInfo: " + JSON.stringify(e));
},
onInviteFriendsWithInviteIdsResult: function(e, t) {
cc.log("FacebookMgr: onInviteFriendsWithInviteIdsResult " + e + "  " + t);
if (this._onInviteFriendsCallback) {
var n = this._onInviteFriendsCallback;
this._onInviteFriendsCallback = null;
n(e, t);
}
},
onFetchFriends: function(e, t) {
cc.log("FacebookMgr: onFetchFriends " + e);
this.installFriends = this.facebook.getInstallFriends();
cc.log(JSON.stringify(this.installFriends));
for (var n = 0; n < this.installFriends.length; n++) {
var i = this.installFriends[n];
cc.log("-----------");
cc.log(">> uid=%s", i.uid);
cc.log(">> name=%s", i.name);
}
},
onRequestInvitableFriends: function(e) {
cc.log("FacebookMgr: onRequestInvitableFriends " + e);
this.inviteFriends = e.data;
},
onPermission: function(e, t) {
cc.log("onPermission: " + e + "   msg: " + t);
},
onSharedSuccess: function(e) {
cc.log("onSharedSuccess");
if (this._shareCallback) {
this._shareCallback();
this._shareCallback = null;
}
},
onSharedFailed: function(e) {
cc.log("onSharedFailed == " + JSON.stringify(e));
this._shareCallback && (this._shareCallback = null);
},
onSharedCancel: function() {
cc.log("onSharedCancel");
this._shareCallback && (this._shareCallback = null);
},
onAPI: function(e, t) {
cc.log("onAPI: " + ("undefined" == typeof t ? "undefined" : i(t)) + " | " + t);
switch (e) {
case "invitable_friends":
break;

case "request_picture":
if (this._requestPicCallback) {
cc.log("onAPI request_picture: " + t);
this._requestPicCallback(JSON.parse(t).data);
}
break;

case "request_name":
cc.log("onAPI request_name: " + t);
this._requestNameCallback && this._requestNameCallback(JSON.parse(t));
}
}
});
t.exports = o;
cc._RF.pop();
}, {
"./Facebook": "Facebook"
} ],
Facebook: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "28a5drA9lRCGa1iN7Sh5E/7", "Facebook");
var i = cc.Class({
init: function(e, t) {
if ("undefined" == typeof sdkbox) {
cc.log("sdkbox: undefined");
return !1;
}
this._facebookId = t;
sdkbox.PluginFacebook.setListener(e);
sdkbox.PluginFacebook.init();
cc.log("sdkbox: init");
return !0;
},
isLoggedIn: function() {
return sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn();
},
login: function(e) {
sdkbox.PluginFacebook && !sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.login(e);
},
logout: function() {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.logout();
},
test: function() {
sdkbox.PluginFacebook.requestReadPermissions([ "public_profile", "email", "user_friends", "publish_actions" ]);
sdkbox.PluginFacebook.requestPublishPermissions([ "publish_actions" ]);
},
getUserID: function() {
return sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() ? sdkbox.PluginFacebook.getUserID() : "";
},
getPermissionList: function() {
return sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() ? sdkbox.PluginFacebook.getPermissionList() : null;
},
getAccessToken: function() {
return sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() ? sdkbox.PluginFacebook.getAccessToken() : null;
},
shareLink: function(e, t, n, i) {
if (sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn()) {
var a = new Object();
a.type = "link";
a.link = e;
a.title = t;
a.text = n;
a.image = i;
sdkbox.PluginFacebook.share(a);
}
},
dialogLink: function(e, t, n, i) {
if (sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn()) {
var a = new Object();
a.type = "link";
a.link = e;
a.title = t;
a.text = n;
a.image = i;
sdkbox.PluginFacebook.dialog(a);
}
},
inviteFriends: function(e) {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.inviteFriends("https://fb.me/" + this._facebookId, e);
},
inviteFriendsWithInviteIds: function(e, t, n) {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.inviteFriendsWithInviteIds(e, t, n);
},
fetchFriends: function() {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.fetchFriends();
},
requestInvitableFriends: function() {
if (sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn()) {
var e = new Object();
e.fields = "id,name";
e.limit = 100;
sdkbox.PluginFacebook.api("/me/invitable_friends", "GET", e, "invitable_friends");
}
},
requestUserPicture: function() {
if (sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn()) {
var e = new Object();
e.redirect = "false";
e.type = "large";
sdkbox.PluginFacebook.api("/me/picture?fields=cache_key,url", "GET", e, "request_picture");
}
},
requestUserName: function() {
if (sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn()) {
var e = new Object();
e.fields = "name";
sdkbox.PluginFacebook.api("/me", "GET", e, "request_name");
}
},
api: function(e, t, n, i) {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.api(e, i, n, i);
},
getInstallFriends: function() {
return sdkbox.PluginFacebook.getFriends();
},
requestReadPermissions: function(e) {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.requestReadPermissions(e);
},
requestPublishPermissions: function() {
sdkbox.PluginFacebook && sdkbox.PluginFacebook.isLoggedIn() && sdkbox.PluginFacebook.requestPublishPermissions(arr);
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
Fan: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "74685AmmcFA0atH+H6dI71r", "Fan");
cc.Class({
extends: cc.Component,
properties: {
rotateSpeed: 10
},
startRotate: function() {
var e = cc.rotateBy(1, 360);
return cc.repeatForever(e);
},
onLoad: function() {
this.jumpAction = this.startRotate();
this.node.runAction(this.jumpAction);
},
start: function() {},
update: function(e) {}
});
cc._RF.pop();
}, {} ],
Friend: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "34ddehNi2VINp2wyOW4gIF6", "Friend");
cc.Class({
extends: cc.Component,
properties: {
item: cc.Prefab,
content: cc.Node
},
onLoad: function() {
cc.director.GlobalEvent.on("FriendData", this.onUpdateFriendData, this);
},
start: function() {},
onUpdateFriendData: function() {
var e = this;
GameData.FriendData.forEach(function(t) {
var n = cc.instantiate(e.item);
n.parent = e.content;
cc.loader.load(t.url, function(e, t) {
var i = new cc.SpriteFrame(t);
n.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = i;
});
n.getChildByName("Name").getComponent(cc.Label).string = t.name;
n.getChildByName("State").getComponent(cc.Label).string = 1 == t.state ? "可偷取" : "";
n.off(cc.Node.EventType.TOUCH_END);
n.on(cc.Node.EventType.TOUCH_END, function() {
Global.ProtocolMgr.queryFriendNongChang();
}, e);
});
},
onEnable: function() {
Global.ProtocolMgr.queryFriend();
},
onDisable: function() {
this.content.children.forEach(function(e) {
e.destroy();
});
}
});
cc._RF.pop();
}, {} ],
GCONFIG: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "71a448E5flHRo1Vv4C5OIl3", "GCONFIG");
var i = i || {};
i.DEBUG_MODE = !1;
i.ROOM_MULT = 1;
i.BETS_WAITING = 10;
i.GAME_MODE = 3;
i.USER_BASE_COINS = 1e3;
i.BIND_FB_COINS = 200;
i.SUBS_REWARD = 2e3;
i.ONLINE_MODE = !0;
i.BET_VALUE = [];
i.KEY_SETTING = "KEY_SETTING";
i.KEY_PLAYERDATA = "KEY_PLAYERDATA";
i.KEY_IAPDATA = "KEY_IAPDATA";
i.KEY_GAME_GUIDE_DATA = "KEY_GAME_GUIDE_DATA";
i.KEY_CHEST_DATA = "KEY_CHEST_DATA";
i.KEY_ACHIEVE_DATA = "KEY_ACHIEVE_DATA";
i.EVENT_CHANGE_SCENE = "EVENT_CHANGE_SCENE";
i.EVENT_USER_COINS_CHANGED = "EVENT_USER_COINS_CHANGED";
i.EVENT_NETWORK_OPENED = "GAME_EVENT_NETWORK_OPENED";
i.EVENT_NETWORK_CLOSED = "GAME_EVENT_NETWORK_CLOSED";
i.EVENT_CHAT = "GAME_EVENT_CHAT";
i.EVENT_EXITROOM = "GAME_EVENT_EXITROOM";
i.EVENT_LOGIN_SUC = "GAME_EVENT_LOGIN_SUC";
i.EVENT_LOGIN_FAILED = "GAME_EVENT_LOGIN_FAILED";
i.EVENT_PLAYCHESS = "GAME_EVENT_PLAYCHESS";
i.EVENT_START_GAME = "EVENT_START_GAME";
i.EVENT_OPEN_ROOM = "EVENT_OPEN_ROOM";
i.EVENT_ENTER_ROOM = "EVENT_ENTER_ROOM";
i.SIBLING_INDEX_MAX = 100;
i.LOCAL_ZINDEX_MAX = 100;
i.FACEBOOK_ID = "123123123123123";
i.FACEBOOK_PERMISSIONS = [ "public_profile", "email" ];
t.exports = i;
cc._RF.pop();
}, {} ],
GainGold: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "466f4kkwzlDypFUDMvsCp20", "GainGold");
cc.Class({
extends: cc.Component,
properties: {
coinpre: cc.Prefab,
coinNode: cc.Node,
createcoin: 20,
random1: -200,
random2: 200,
createTime: .15,
standingTime: .2,
coinSpeed: 1e3
},
onLoad: function() {},
onPlayCoinAni: function(e) {
for (var t = this, n = cc.v2(0, 0), i = function(i) {
var a = cc.instantiate(t.coinpre);
a.parent = t.node;
a.setPosition(n);
var o = Math.floor(Math.random() * (t.random2 - t.random1 + 1) + t.random1), r = Math.floor(Math.random() * (t.random2 - t.random1 + 1) / 1.5 + t.random1 / 1.5);
a.runAction(cc.moveBy(t.createTime, o, r));
t.scheduleOnce(function() {
a.stopAllActions();
var n = cc.callFunc(function() {
a.destroy();
i == this.createcoin - 1 && this.scheduleOnce(function() {
e();
}, .5);
}, t), o = a.getPosition(), r = t.coinNode.getPosition(), c = o.sub(r).mag() / t.coinSpeed;
a.runAction(cc.sequence(cc.moveTo(c, r.x, r.y), n));
}, t.standingTime + t.createTime);
}, a = 0; a < this.createcoin; a++) i(a);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
GameCfg: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "35e68Y9Jy1Cc4NFiGgoZhQL", "GameCfg");
var i = e("./EnemyBaseData"), a = e("./GunData"), o = e("./EnemyGroupData"), r = e("./AchievementData"), c = e("./DailyRewardData"), s = e("./../Common/UtilsOther"), l = cc.Class({
properties: {
isLoadOver: !1,
enemyCfg: null
},
loadLocalCfg: function(e) {
var t = this;
this.loadCounts = 0;
var n = [ {
name: "enemyCfg",
onLoad: i.setData
}, {
name: "enemyGroupCfg",
onLoad: o.setData
}, {
name: "gunBaseCfg",
onLoad: a.setBaseData
}, {
name: "gunLevelCfg",
onLoad: a.setLevelData
}, {
name: "achievementCfg",
onLoad: r.setData
}, {
name: "dailyRewardCfg",
onLoad: c.setData
} ], l = function(l) {
var u = l;
s.isObject(l) && (u = l.name);
cc.loader.loadRes("config/" + u, function(t, d) {
if (t) cc.log("load local cfg " + u + " error: " + t); else {
cc.log("load local cfg " + u + " suc.");
this[u] = d;
s.isObject(l) && l.onLoad && l.onLoad(d);
}
this.loadCounts++;
this.isLoadOver = this.loadCounts >= n.length;
if (this.isLoadOver) {
i.initData();
o.initData();
a.initBaseData();
a.initLevelData();
r.initData();
c.initData();
e && e();
}
}.bind(t));
}, u = !0, d = !1, h = void 0;
try {
for (var g, f = n[Symbol.iterator](); !(u = (g = f.next()).done); u = !0) {
l(g.value);
}
} catch (e) {
d = !0;
h = e;
} finally {
try {
!u && f.return && f.return();
} finally {
if (d) throw h;
}
}
}
});
l.instance = null;
l.getInstance = function() {
l.instance || (l.instance = new l());
return l.instance;
};
t.exports = l;
cc._RF.pop();
}, {
"./../Common/UtilsOther": "UtilsOther",
"./AchievementData": "AchievementData",
"./DailyRewardData": "DailyRewardData",
"./EnemyBaseData": "EnemyBaseData",
"./EnemyGroupData": "EnemyGroupData",
"./GunData": "GunData"
} ],
GameData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4f6c0hQACFPkK5cop45cenm", "GameData");
window.GameData = {
curLanguage: "zh",
token: "",
audio: !1,
ClickState: 1,
UserData: [],
EmailData: [],
HaveEmailPage: [],
HongBaoUserData: {},
HongBaoPlayerList: [],
HongBaoList: [],
HongBaoSurplus: 0,
CurHongBao: {},
CurHongBaoCount: 0,
HongBaoJieGuo: 0,
CountDown: 0,
CountDownAll: 0,
KaiJiangList: [],
FriendNongChangUserData: [],
ZhongZiData: [],
GuoShiData: [],
ShangChengData: [],
ZhongZhiReady: {
pos: null
},
FriendData: [],
RacingTimer: null,
RacingGameState: 0,
KuangJiData: [],
SlotUserData: null
};
cc._RF.pop();
}, {} ],
GameHttp: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8afc1m51YpB/YM/mIkdgeO+", "GameHttp");
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = "timeout", o = "error", r = "abort", c = cc.Class({
ctor: function() {
this.xhr_ = null;
this.error_ = null;
},
init: function(e) {
this.xhr_ = e;
},
isOk: function() {
var e = this.xhr_;
return 4 == e.readyState && e.status >= 200 && e.status <= 207;
},
getBody: function() {
return this.xhr_.response;
},
setError: function(e) {
this.error_ = e;
},
getError: function() {
return this.error_;
},
getHeaders: function() {},
getHeader: function(e) {}
}), s = function(e, t) {
var n = new c();
n.init(e);
e.onreadystatechange = function(i) {
4 == e.readyState && t(n);
};
e.ontimeout = function(e) {
n.setError(a);
t(n);
};
e.onerror = function(e) {
n.setError(o);
t(n);
};
e.onabort = function(e) {
n.setError(r);
t(n);
};
};
t.exports = {
httpGet: function(e, t, n) {
var i = cc.loader.getXMLHttpRequest();
i.timeout = n || 1e4;
t && s(i, t);
i.open("GET", e, !0);
i.send();
},
httpPost: function(e, t, n, a) {
var o = cc.loader.getXMLHttpRequest();
o.timeout = a || 1e4;
n && s(o, n);
o.open("POST", e, !0);
o.setRequestHeader("Content-Type", "application/json");
cc.log("httpPost: " + ("undefined" == typeof t ? "undefined" : i(t)) + " | " + JSON.stringify(t));
o.send(t);
}
};
cc._RF.pop();
}, {} ],
GameMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "025f2MJc0ZF97veI+ig8WZ4", "GameMgr");
var i = e("./views/ToastCtrl"), a = e("./common/DataMgr").getInstance();
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
GlobalNiuNiu.gameMgr = this;
},
start: function() {
this.listenEvent();
},
listenEvent: function() {
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_NETWORK_OPENED, this.onNetOpen, this);
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_NETWORK_CLOSED, this.onNetClosed, this);
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_LOGIN_SUC, this.onLoginSuc, this);
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_LOGIN_FAILED, this.onLoginFailed, this);
},
onNetOpen: function(e) {
cc.log("net opened.");
GlobalNiuNiu.connectState = !0;
GlobalNiuNiu.netProxy.login(0);
},
onNetClosed: function(e) {
cc.log("net closed. 5s 后重试连接.");
i.showText("网络连接失败，正在重试.", 2);
GlobalNiuNiu.connectState = !1;
this.scheduleOnce(function(e) {
GlobalNiuNiu.netProxy.isNetworkOpened() || GlobalNiuNiu.netProxy.connect();
}, 5);
},
onLoginSuc: function(e) {
var t = e;
cc.log("登陆成功.");
cc.log(e);
if (null != t.uid) {
a.playerObj.parse(t);
a.saveDataToLocal();
}
},
onLoginFailed: function(e) {
cc.log("登陆失败. 5s后重试.");
this.scheduleOnce(function(e) {
GlobalNiuNiu.netProxy.login(0);
}, 5);
},
startBeatHeart: function() {
var e = this;
this.schedule(function(t) {
if (e.checkInternet()) {
var n = Date.now();
GlobalNiuNiu.netProxy.beatHeart(function(e) {
cc.log(JSON.stringify(e));
cc.log("delay: " + (e.t - n));
});
}
}, 5);
},
checkInternet: function() {
return GlobalNiuNiu.netProxy.isNetworkOpened();
},
onOpenRoom: function(e) {
e.err > 0 ? i.showText("开房失败.", 2) : GlobalNiuNiu.loadScene("RoomNet", function() {
setTimeout(function() {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_OPEN_ROOM, e);
}, 1e3);
});
},
onEnterRoom: function(e) {
e.err > 0 ? i.showText("加入失败，请检查房间号.", 2) : GlobalNiuNiu.loadScene("RoomNet", function() {
setTimeout(function() {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_ENTER_ROOM, e);
}, 1e3);
});
}
});
cc._RF.pop();
}, {
"./common/DataMgr": "DataMgr",
"./views/ToastCtrl": "ToastCtrl"
} ],
GameNetwork: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6d3b90F1ltPQqEXXz0L8FEx", "GameNetwork");
var i = e("./GameWebSocket"), a = e("./GameProtocols"), o = "0", r = cc.Class({
properties: {
request: null,
callback: null
},
init: function(e, t) {
this.request = e;
this.callback = t;
}
}), c = cc.Class({
extends: i.GameWebSocketDelegate,
ctor: function() {
this._socket = null;
this._delegate = null;
this._requestSequenceId = 0;
this.pushResponseCallback = {};
this._networkCallbacks = {};
},
setDelegate: function(e) {
this._delegate = e;
},
registerPushResponseCallback: function(e, t) {
this.pushResponseCallback[e] = t;
},
offCallback: function(e, t) {
this.pushResponseCallback[e] = null;
},
isSocketOpened: function() {
return this._socket && this._socket.getState() == i.GameWebSocketState.OPEN;
},
isSocketClosed: function() {
return null == this._socket;
},
connect: function(e) {
cc.log("webSocketUrls=" + e);
this._requestSequenceId = 0;
this._socket = new i.GameWebSocket();
this._socket.init(e, this);
this._socket.connect();
},
closeConnect: function() {
this._socket && this._socket.close();
},
onSocketOpen: function() {
cc.log("Socket:onOpen");
this._delegate && this._delegate.onNetworkOpen && this._delegate.onNetworkOpen();
},
onSocketError: function() {
cc.log("Socket:onError");
},
onSocketClosed: function(e) {
cc.log("Socket:onClose", e);
this._socket && this._socket.close();
this._socket = null;
this._delegate && this._delegate.onNetworkClose && this._delegate.onNetworkClose();
},
onSocketMessage: function(e) {
this._onResponse(e);
},
_onResponse: function(e) {
cc.log("response->resp:", e);
var t = JSON.parse(e), n = new (0, a.response_classes[t.act])();
n.loadData(t);
var i = !1;
if (-1 != n.seq) {
var r = this.pushResponseCallback[n.act];
r && r(n);
var c = this._networkCallbacks[n.seq];
c && (i = c.callback(n));
}
if (n.err && n.err != o && !i) if (n.is_async) ; else {
var s = t.msg;
cc.log("server err " + s);
}
},
sendRequest: function(e, t) {
e.seq = ++this._requestSequenceId;
if (t) {
this._networkCallbacks[e.seq] = new r();
this._networkCallbacks[e.seq].init(e, t);
}
this._sendSocketRequest(e);
},
_sendSocketRequest: function(e) {
cc.assert(this._socket);
var t = JSON.stringify(e);
if (this.isSocketOpened()) {
cc.log("WebSocketDelegate::send->" + t);
this._socket.send(t);
} else cc.log("socket error, can not send req: " + t);
}
});
t.exports = c;
cc._RF.pop();
}, {
"./GameProtocols": "GameProtocols",
"./GameWebSocket": "GameWebSocket"
} ],
GamePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "22bf8plH/hFVIBClkRfkZUN", "GamePanel");
var i = e("../../Util/appScript");
cc.Class({
extends: cc.Component,
properties: {
game_item: cc.Prefab,
container: cc.Node,
game_item2: cc.Prefab,
container2: cc.Node,
game_item3: cc.Prefab,
container3: cc.Node,
Panle: cc.Node,
Panle2: cc.Node,
Panle3: cc.Node,
Panle4: cc.Node,
bgSprite: cc.Node,
Panlelist2: cc.Node,
Panlelist3: cc.Node,
lable_id: cc.Label,
lable_name: cc.Label,
lable_pic: cc.Label,
lable_limit: cc.Label,
lable_gold: cc.Label,
lable_sum: cc.Label,
label_Usdt: cc.Label,
editBox_id: cc.EditBox,
editBox_name: cc.EditBox,
btn_skip: cc.Sprite,
btn_item: [ cc.Sprite ]
},
onLoad: function() {
Global.ProtocolMgr.queryUserData();
},
onEnable: function() {
var e = this;
i.Post("member/getMemberInfo", {}, function(t) {
200 == t.code && t.data && (e.label_Usdt.string = t.data.totalUsdt);
});
this.getGameList(null, 2);
},
breakSetlectGamePanle: function(e, t) {
this.getGameList(null, 2);
},
goSetlectGamePanle: function() {
var e = this;
this.Panle.active = !0;
this.Panle2.active = !1;
this.Panle3.active = !1;
this.curType = 2;
this.container2.removeAllChildren();
Global.ProtocolMgr.queryGameRoomList(1, function(t) {
if (200 == t.code) for (var n = t.data, i = 0; i < n.length; i++) {
var a = cc.instantiate(e.game_item2);
a.getComponent("Game_Item2").setData(n[i]);
e.container2.addChild(a);
} else Global.PageMgr.showTipPage(t.message);
});
},
goEnterGamePanel: function(e, t) {
var n = Global.PageMgr.pages[7].getComponent("GamePanel");
n.bundleId = cc.js.formatStr("1,%s,%s", t.game_package_name, t.game_web_link);
n.datas = t;
if (null != this.selectData) {
n.Panle.active = !1;
n.Panle2.active = !1;
n.Panle3.active = !0;
n.lable_id.string = t.game_customer_account;
n.lable_name.string = t.game_customer_nickname;
n.lable_pic.string = cc.js.formatStr("%s", parseFloat(n.selectData.ticket).toFixed(2));
n.lable_limit.string = t.number_limit;
"0" == t.number_limit && (n.lable_limit.string = "无限");
n.lable_gold.string = cc.js.formatStr("%s钻", parseFloat(window.DEFAULT_availableUsdt).toFixed(3));
n.dianjiSum = 0;
n.lable_sum.string = "" + n.dianjiSum;
} else {
var i = cc.js.formatStr("1,%s,%s", n.datas.game_package_name, n.datas.game_web_link);
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", i);
}
},
onClickSkip: function() {
this.goGamePanelUI(null);
},
sinceIncrease: function() {
this.dianjiSum < 100 && (this.dianjiSum += 1);
this.lable_sum.string = "" + this.dianjiSum;
},
sinceReduction: function() {
this.dianjiSum > 1 && (this.dianjiSum -= 1);
this.lable_sum.string = "" + this.dianjiSum;
},
submitMessage: function() {
"" != this.editBox_id.string ? "" != this.editBox_name.string ? this.dianjiSum <= 0 ? Global.PageMgr.showTipPage("门票不能小于1") : window.DEFAULT_availableUsdt < this.dianjiSum * (parseInt(1e3 * this.selectData.ticket) / 1e3) ? Global.PageMgr.showTipPage("钻不够请充值") : this.setUrl() : Global.PageMgr.showTipPage("昵称为空") : Global.PageMgr.showTipPage("ID为空");
},
setUrl: function() {
var e = this, t = {
game_id: this.selectData.id,
sg_id: this.datas.id,
number: "" + this.dianjiSum,
game_account: this.editBox_id.string,
game_nickname: this.editBox_name.string
};
Global.ProtocolMgr.startCompetitiveGame(t, function(t) {
console.log(t);
if (3001 != t.code) {
t.data;
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", e.bundleId);
e.breakPanle(null, 0);
} else Global.PageMgr.showTipPage(t.message);
});
},
breakPanle: function(e, t) {
if (null != this.selectData) {
Global.PageMgr.pages[7].getComponent("GamePanel").Panle.active = !1;
Global.PageMgr.pages[7].getComponent("GamePanel").Panle2.active = !0;
Global.PageMgr.pages[7].getComponent("GamePanel").Panle3.active = !1;
}
},
goGamePanelUI: function(e) {
this.container2.removeAllChildren();
this.Panle.active = !1;
this.Panle2.active = !0;
this.Panle3.active = !1;
this.curType = 0;
this.selectData = e;
this.getGameList(null, 0);
},
getGameList: function(e, t) {
var n = this;
this.btn_item.forEach(function(e) {
e.spriteFrame = null;
});
cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function(e, i) {
e || (n.btn_item[parseInt(t)].spriteFrame = i);
});
this.bgSprite.active = !1;
switch (parseInt(t)) {
case 0:
this.curType = 0;
this.Panle4.active = !1;
this.bgSprite.active = !0;
this.gameQueryGameList();
break;

case 1:
this.Panle4.active = !1;
this.bgSprite.active = !0;
this.curType = 1;
this.gameQueryGameList();
break;

case 2:
this.Panlelist2.active = !0;
this.Panlelist3.active = !1;
this.container2.removeAllChildren();
this.container3.removeAllChildren();
this.goSetlectGamePanle();
break;

case 3:
this.container2.removeAllChildren();
this.container3.removeAllChildren();
this.Panlelist3.active = !0;
this.Panlelist2.active = !1;
this.setStationRecordUI();
break;

case 4:
this.Panle4.active = !0;
this.container.removeAllChildren();
this.curType = 3;
}
},
setStationRecordUI: function() {
var e = this;
Global.ProtocolMgr.queryStationRecordList(100, 1, function(t) {
e.container3.removeAllChildren();
if (200 == t.code) for (var n = t.data, i = 0; i < n.length; i++) {
var a = cc.instantiate(e.game_item3);
a.getComponent("Game_Item3").setData(n[i]);
e.container3.addChild(a);
} else Global.PageMgr.showTipPage(t.message);
});
},
gameQueryGameList: function() {
var e = this;
this.container.removeAllChildren();
Global.ProtocolMgr.queryGameList(1, 1, function(t) {
e.container.removeAllChildren();
if (200 == t.code) {
for (var n = t.data, i = 0; i < n.length; i++) if (n[i].game_terminal == e.curType) {
var a = cc.instantiate(e.game_item);
a.getComponent("game_item").setData(n[i], e.goEnterGamePanel);
e.container.addChild(a);
}
} else Global.PageMgr.showTipPage(t.message);
});
},
setPageData: function(e) {}
});
cc._RF.pop();
}, {
"../../Util/appScript": "appScript"
} ],
GameProtocols: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee9afyHSeJGaahOsOe7M5FZ", "GameProtocols");
var i = cc.Class({
ctor: function() {
this.act = "";
this.seq = 0;
this.err = 0;
this.msg = "";
this.is_async = !1;
}
}), a = cc.Class({
extends: i
}), o = cc.Class({
extends: i,
loadData: function(e) {
var t;
for (t in e) this.hasOwnProperty(t) && void 0 !== e[t] && null !== e[t] && (this[t] = e[t]);
}
}), r = cc.Class({
extends: a,
ctor: function() {
this.act = "heart";
this.t = 0;
}
}), c = cc.Class({
extends: o,
ctor: function() {
this.act = "heart";
this.t = 0;
}
}), s = cc.Class({
extends: a,
ctor: function() {
this.act = "createRoom";
this.uid = 0;
}
}), l = cc.Class({
extends: o,
ctor: function() {
this.act = "createRoom";
this.rid = 0;
this.user = null;
}
}), u = cc.Class({
extends: a,
ctor: function() {
this.act = "quitRoom";
}
}), d = cc.Class({
extends: l,
ctor: function() {
this.act = "enterRoom";
}
}), h = cc.Class({
extends: o,
ctor: function() {
this.rid = 0;
this.users = null;
}
}), g = cc.Class({
extends: o,
ctor: function() {
this.user = null;
}
}), f = cc.Class({
extends: o,
ctor: function() {
this.countReward = [];
}
}), p = cc.Class({
extends: a,
ctor: function() {
this.act = "config";
}
}), m = cc.Class({
extends: o,
ctor: function() {
this.config = [];
}
}), b = cc.Class({
extends: a,
ctor: function() {
this.act = "startGame";
this.uid = "";
}
}), _ = cc.Class({
extends: o,
ctor: function() {
this.act = "startGame";
}
}), y = cc.Class({
extends: a,
ctor: function() {
this.act = "gameReady";
}
}), v = cc.Class({
extends: o,
ctor: function() {
this.act = "gameReady";
}
}), C = cc.Class({
extends: o,
ctor: function() {
this.act = "otherReady";
this.user = null;
}
}), N = cc.Class({
extends: a,
ctor: function() {
this.act = "kick";
this.uid = 0;
this.bet = 0;
}
}), P = cc.Class({
extends: a,
ctor: function() {
this.act = "payBet";
this.uid = 0;
this.bet = 0;
}
}), S = cc.Class({
extends: a,
ctor: function() {
this.act = "chat";
this.msg = "";
this.uid = "";
}
}), w = cc.Class({
extends: o,
ctor: function() {
this.act = "chat";
this.msg = "";
this.uid = "";
}
}), D = cc.Class({
extends: o,
ctor: function() {
this.act = "pDeal";
this.cards = [];
}
}), E = cc.Class({
extends: o,
ctor: function() {
this.act = "pBet";
this.bet = 0;
this.uid = 0;
}
}), R = cc.Class({
extends: o,
ctor: function() {
this.act = "pStartBet";
this.expired = 0;
}
}), T = cc.Class({
extends: o,
ctor: function() {
this.act = "pShowCards";
this.users = [];
}
}), L = cc.Class({
extends: a,
ctor: function() {
this.act = "login";
this.token = "";
this.origin = 0;
this.os = "";
this.osVersion = "";
this.deviceModel = "";
this.channelId = 0;
this.idfa = "";
this.androidId = "";
this.googleAid = "";
this.appVersion = "";
this.packName = "";
this.language = "";
this.locale = "";
this.uid = 0;
}
}), M = cc.Class({
extends: o,
ctor: function() {
this.act = "login";
this.uid = 0;
this.bid = 0;
this.coins = 0;
this.nickname = "";
this.avatar = "";
}
}), G = cc.Class({
extends: a,
ctor: function() {
this.act = "logout";
}
}), B = cc.Class({
extends: o,
ctor: function() {
this.act = "logout";
}
}), F = cc.Class({
extends: a,
ctor: function() {
this.act = "bindFb";
this.token = "";
}
}), k = cc.Class({
extends: o,
ctor: function() {
this.act = "bindFb";
this.me = 0;
this.friends = 0;
}
}), A = cc.Class({
extends: a,
ctor: function() {
this.act = "rankboard";
this.type = 0;
}
}), x = cc.Class({
extends: o,
ctor: function() {
this.act = "rankboard";
this.myRank = 0;
this.men = [];
}
}), I = cc.Class({
extends: o,
ctor: function() {
this.act = "exitRoom";
this.user = null;
}
}), O = cc.Class({
extends: o,
ctor: function() {
this.act = "changeBanker";
this.uid = 0;
}
}), U = cc.Class({
extends: a,
ctor: function() {
this.act = "cmdTest";
this.cmd = "";
}
}), j = cc.Class({
extends: o,
ctor: function() {
this.act = "cmdTest";
this.me = {};
this.spInterval = null;
this.spStepLeftTime = null;
this.farmDailyOut = null;
this.farmCoins = null;
this.farmInterval = null;
this.buildings = null;
}
}), q = {
login: M,
logout: B,
bindFb: k,
heart: c,
createRoom: l,
enterRoom: h,
gameReady: v,
otherReady: C,
payBet: P,
countReward: f,
config: m,
startGame: _,
pEnterRoom: g,
pExitRoom: I,
changeBanker: O,
pDeal: D,
pBet: E,
pStartBet: R,
pShowCards: T,
chat: w,
cmdTest: j
};
t.exports = {
LoginRequest: L,
LoginResponse: M,
LogoutRequest: G,
LogoutResponse: B,
BindFacebookRequest: F,
BindFacebookResponse: k,
RankRequest: A,
RankResponse: x,
HeartRequest: r,
HeartResponse: c,
ChatRequest: S,
CreateRoomRequest: s,
CreateRoomResponse: l,
EnterRoomRequest: d,
QuitRoomRequest: u,
EnterRoomResponse: h,
StartGameRequest: b,
StartGameResponse: _,
ConfigRequest: p,
ReadyRequest: y,
ReadyResponse: v,
OtherReadyResponse: C,
KickRequest: N,
BetRequest: P,
DebugChangeMeRequest: U,
DebugChangeMeResponse: j,
countRewardResponse: f,
ConfigResponse: m,
PushEnterRoom: g,
PushExitRoom: I,
PushDeal: D,
PushChat: w,
PushBet: E,
PushStartBet: R,
PushShowCards: T,
response_classes: q
};
cc._RF.pop();
}, {} ],
GameWebSocket: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7ba25vCzDxHGK1L/2U83Qx/", "GameWebSocket");
var i = cc.Enum({
CONNECTING: 1,
OPEN: 2,
CLOSING: 3,
CLOSED: 4
}), a = cc.Class({
onSocketOpen: function() {},
onSocketMessage: function(e) {},
onSocketError: function() {},
onSocketClosed: function(e) {}
}), o = cc.Class({
connect: function() {},
send: function() {},
close: function() {},
getState: function() {}
}), r = cc.Class({
extends: o,
properties: {
_address: null,
_delegate: null,
_webSocket: null
},
init: function(e, t) {
this._address = e;
this._delegate = t;
this._webSocket = null;
},
connect: function() {
cc.log("connect to " + this._address);
var e = this._webSocket = new WebSocket(this._address);
e.onopen = this._delegate.onSocketOpen.bind(this._delegate);
e.onmessage = function(e) {
this._delegate.onSocketMessage(e.data);
}.bind(this);
e.onerror = this._delegate.onSocketError.bind(this._delegate);
e.onclose = function(e) {
this._delegate.onSocketClosed(e.reason);
}.bind(this);
},
send: function(e) {
this._webSocket.send(e);
},
close: function() {
if (this._webSocket) {
try {
this._webSocket.close();
} catch (e) {
cc.log("error while closing webSocket", e.toString());
}
this._webSocket = null;
}
},
getState: function() {
if (this._webSocket) switch (this._webSocket.readyState) {
case WebSocket.OPEN:
return i.OPEN;

case WebSocket.CONNECTING:
return i.CONNECTING;

case WebSocket.CLOSING:
return i.CLOSING;

case WebSocket.CLOSED:
return i.CLOSED;
}
return i.CLOSED;
}
});
t.exports = {
GameWebSocketState: i,
GameWebSocketDelegate: a,
GameWebSocketInterface: o,
GameWebSocket: r
};
cc._RF.pop();
}, {} ],
Game_Item2: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fabe4c4MbhMSoihtJT7rMs9", "Game_Item2");
cc.Class({
extends: cc.Component,
properties: {
icon_pic: cc.Sprite,
label_name: cc.Label,
label_menpiao: cc.Label,
label_pic: cc.Label,
label_fee: cc.Label,
propId: 1
},
start: function() {},
setData: function(e) {
var t = this;
try {
cc.loader.loadRes("imgs/bg" + e.id, cc.SpriteFrame, function(e, n) {
e || (t.icon_pic.spriteFrame = n);
});
} catch (e) {
console.warn(e);
}
console.log(e);
this.propId = e.id;
this.label_name.string = e.grade_field_name;
this.label_pic.string = cc.js.formatStr("%s个星钻\n每局胜奖励负扣减%s", parseFloat(e.crystal_quantity).toFixed(1), parseFloat(e.reward).toFixed(1));
this.label_menpiao.string = cc.js.formatStr("门票:%s", parseFloat(e.ticket).toFixed(2));
this.data = e;
},
buy: function() {
window.DEFAULT_availableUsdt >= parseInt(this.data.crystal_quantity) ? Global.PageMgr.pages[7].getComponent("GamePanel").goGamePanelUI(this.data) : Global.PageMgr.showTipPage(cc.js.formatStr("星钻不足%s", parseFloat(this.data.crystal_quantity).toFixed(1)));
}
});
cc._RF.pop();
}, {} ],
Game_Item3: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "47f68Jdkl5MeYboYwTOqVUS", "Game_Item3");
cc.Class({
extends: cc.Component,
properties: {
icon_touxiang: cc.Sprite,
label_name: cc.Label,
label_changci: cc.Label,
label_pic: cc.Label,
label_time: cc.Label,
icon_winOrloser: cc.Sprite,
propId: 1
},
start: function() {},
setData: function(e) {
var t = this;
try {
cc.loader.load({
url: e.game_logo,
type: "png"
}, function(e, n) {
t.icon_touxiang.spriteFrame = new cc.SpriteFrame(n);
});
} catch (e) {
console.warn(e);
}
this.label_name.string = e.game_name;
this.label_changci.string = cc.js.formatStr("场次:%s场", e.grade_field_name);
this.label_time.string = e.create_time;
var n = parseFloat(e.value).toFixed(4);
if (0 == e.trade_type) {
this.label_pic.string = cc.js.formatStr("收益:+%s", n);
this.setSpriteFrame("imgs/胜利@2x");
} else {
this.label_pic.string = cc.js.formatStr("收益:-%s", n);
this.setSpriteFrame("imgs/失败@2x");
}
},
setSpriteFrame: function(e) {
var t = this;
cc.loader.loadRes(e, cc.SpriteFrame, function(e, n) {
e || (t.icon_winOrloser.spriteFrame = n);
});
},
buy: function() {}
});
cc._RF.pop();
}, {} ],
GivingCrystalPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7aebd91ELtFkJlP5sIMrwsV", "GivingCrystalPanel");
var i = e("../../Util/appScript");
cc.Class({
extends: cc.Component,
properties: {
editBox_ID: cc.EditBox,
editBox_SUM: cc.EditBox,
gold: cc.Label,
jiesao: cc.Label,
jine: cc.Label,
panle: cc.Node,
shouxufei: cc.Node
},
onLoad: function() {},
onEnable: function() {
var e = this;
i.Post("member/getMemberInfo", {}, function(t) {
if (200 == t.code && t.data) {
e.goleSum = parseFloat(t.data.totalUsdt).toFixed(4);
e.gold.string = cc.js.formatStr("可用余额:%s星钻", e.goleSum);
e.updataUI();
}
});
},
updataUI: function() {
this.editBox_ID.string = "";
this.editBox_SUM.string = "";
this.onClickBreak();
},
onClickGiving: function() {
if ("" != this.editBox_ID.string && "" != this.editBox_SUM.string) {
if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.editBox_ID.string)) {
var e = parseInt(this.editBox_SUM.string);
this.shoufeiyong = .01 * e;
this.shoufeiyong < .1 && (this.shoufeiyong = .1);
if (e > this.goleSum) Global.PageMgr.showTipPage("星钻不足"); else {
this.jiesao.string = cc.js.formatStr("您将给好友(%s)赠送%s星钻,请仔细核对 好友账号与赠送数量是否有误？", this.editBox_ID.string, this.editBox_SUM.string);
this.jine.string = cc.js.formatStr("手续费:%s星钻", this.shoufeiyong);
this.panle.active = !0;
}
} else Global.PageMgr.showTipPage("请输入正确的好友账号");
} else "" == this.editBox_ID.string ? Global.PageMgr.showTipPage("好友账号不能为空") : "" == this.editBox_SUM.string && Global.PageMgr.showTipPage("输入金额不能为空");
},
onClickOK: function() {
var e = this, t = {
transferType: 0,
transferAccount: this.editBox_ID.string,
number: this.editBox_SUM.string
};
Global.ProtocolMgr.queryTransfer(t, function(t) {
if (3001 != t.code) {
Global.PageMgr.showTipPage("赠送成功");
e.updataUI();
Global.PageMgr.onClosePage(22);
Global.PageMgr.onClosePage(24);
Global.PageMgr.pages[11].getComponent("ChongWuPanel").goGamePanelUI();
} else Global.PageMgr.showTipPage(t.message);
});
},
onClickBreak: function() {
this.panle.active = !1;
}
});
cc._RF.pop();
}, {
"../../Util/appScript": "appScript"
} ],
GlobalEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c347aQ7szpGVZmWaAZr75xU", "GlobalEvent");
cc.director.GlobalEvent = {
_handles: {},
emit: function(e, t) {
var n = [];
for (var i in this._handles) if (i === e) for (var a = 0; a < this._handles[i].length; a++) if ("function" == typeof this._handles[i][a]) {
var o = this._handles[i][a](t);
n.push(o);
}
return n;
},
on: function(e, t, n) {
this._handles[e] = this._handles[e] || [];
this._handles[e].push(t.bind(n));
return this;
},
off: function(e) {
this._handles[e] = [];
return this;
},
offAll: function() {
this._handles = {};
return this;
}
};
cc._RF.pop();
}, {} ],
GlobalNiuNiu: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0272b2/+49OF6sGkg7PRj2j", "GlobalNiuNiu");
window.GlobalNiuNiu = window.GlobalNiuNiu || {};
var i = e("./UiUpdater"), a = e("./GCONFIG"), o = (e("./AudioMgr"), e("./IAPMgr")), r = e("./DataMgr"), c = e("./ViewMgr"), s = e("./UtilsCross"), l = e("./../net/socket/NetProxy");
GlobalNiuNiu.connectState = !1;
GlobalNiuNiu.eventMgr = new cc.EventTarget();
GlobalNiuNiu.uiUpdater = new i();
GlobalNiuNiu.gameMgr = null;
GlobalNiuNiu.assetMgr = null;
GlobalNiuNiu.effectMgr = null;
GlobalNiuNiu.config = a;
GlobalNiuNiu.audioMgr = null;
GlobalNiuNiu.tips = null;
GlobalNiuNiu.iapMgr = o.getInstance();
GlobalNiuNiu.dataMgr = r.getInstance();
GlobalNiuNiu.viewMgr = c.getInstance();
GlobalNiuNiu.utilsCross = s;
GlobalNiuNiu.netProxy = new l();
GlobalNiuNiu.netProxy.init();
GlobalNiuNiu.preloadScene = function(e, t, n, i) {
var a = cc.director, o = a._getSceneUuid(t);
if (o) {
a.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
cc.loader.load({
uuid: o.uuid,
type: "uuid"
}, null == i ? null : function(t, n) {
i && i.call(e, t, n);
}, function(e, i) {
e && cc.errorID(1215, t, e.message);
n && n(e, i);
});
} else {
var r = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
n && n(new Error(r));
cc.error("preloadScene: " + r);
}
};
GlobalNiuNiu.loadScene = function(e, t) {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_CHANGE_SCENE);
t ? cc.director.loadScene(e, t) : cc.director.loadScene(e);
};
cc._RF.pop();
}, {
"./../net/socket/NetProxy": "NetProxy",
"./AudioMgr": "AudioMgr",
"./DataMgr": "DataMgr",
"./GCONFIG": "GCONFIG",
"./IAPMgr": "IAPMgr",
"./UiUpdater": "UiUpdater",
"./UtilsCross": "UtilsCross",
"./ViewMgr": "ViewMgr"
} ],
Global: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "831e5vkR+dErqXoIXLj4el1", "Global");
window.Global = {
PageMgr: null,
ProtocolMgr: null
};
cc._RF.pop();
}, {} ],
Gold: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "eb46fpprk9MrZ4zApodT23D", "Gold");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = this;
setInterval(function() {
var t = cc.rotate3DBy(.1, 0, -90, 0);
t.setTag(100);
e.node.stopActionByTag(100);
e.node.runAction(t);
}, 100);
},
launch: function(e) {
var t = cc.sequence(cc.jumpBy(.5, cc.v2(e * dataFunc.randomNum(1, 120), 150), 300, 1), cc.jumpBy(.5, cc.v2(e * dataFunc.randomNum(10, 120), dataFunc.randomNum(0, 80)), 50, dataFunc.randomNum(1, 4)), cc.fadeOut(1).easing(cc.easeCubicActionOut()), cc.callFunc(this.finish, this));
this.node.runAction(t);
},
finish: function() {
console.log(1);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
GongGaoPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a74a4EOpNdL6oiqRKGWz1OM", "GongGaoPanel");
cc.Class({
extends: cc.Component,
properties: {
label_content: cc.Label
},
start: function() {},
onEnable: function() {
var e = this;
Global.ProtocolMgr.queryGonggao(function(t) {
200 == t.code ? t.data && (e.label_content.string = t.data.content) : Global.PageMgr.showTipPage(t.message);
});
}
});
cc._RF.pop();
}, {} ],
GraySprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8d9aby287FNLoErBwjCZgo/", "GraySprite");
cc.Class({
extends: cc.Component,
properties: {
_gray: !1,
gray: {
type: Boolean,
set: function(e) {
this._gray = e;
var t = e ? 1 : 0;
this.getComponent(cc.Sprite)._sgNode.setState(t);
},
get: function() {
return this._gray;
}
}
},
onLoad: function() {
this.gray = this._gray;
}
});
cc._RF.pop();
}, {} ],
GunData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "edc77GCZjRCWKZeX/gkW46K", "GunData");
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("./../common/UtilsOther"), o = cc.Class({
ctor: function() {
this.level = 1;
this.attackAdd = 0;
this.denseAdd = 0;
this.range = 0;
this.expend = 0;
this.length = 1;
this.coolingAdd = 0;
}
}), r = cc.Class({
ctor: function() {
this.baseAttack = 10;
this.baseDense = 1.25;
this.baseLength = 1;
this.baseSpeed = 20;
this.baseSkillCooling = 10;
this.baseNum = 3;
this.baseGap = 5;
this.levels = new o();
this.skill1level = 1;
this.skill2level = 1;
this.skill3level = 1;
this.skill4level = 1;
this.skill1des = "";
this.skill2des = "";
this.skill3des = "";
this.skill4des = "";
this.unlockType = 1;
this.unlockAdTimes = 10;
this.unlockChallenge = 10;
}
}), c = cc.Class({});
c._jsonBaseData = null;
c._jsonLevelData = null;
c.gunData = null;
c.setBaseData = function(e) {
c._jsonBaseData = e;
};
c.setLevelData = function(e) {
c._jsonLevelData = e;
};
c.initBaseData = function() {
if (c._jsonBaseData) {
c.gunData = new c();
for (var e = 0; e < c._jsonBaseData.length; e++) {
var t = c._jsonBaseData[e];
c.gunData["gun_" + t.gunId] = new r();
c.clone(t, c.gunData["gun_" + t.gunId]);
}
delete c._jsonBaseData;
}
};
c.initLevelData = function() {
if (this._jsonLevelData) {
for (var e = 0; e < this._jsonLevelData.length; e++) {
var t = this._jsonLevelData[e];
c.gunData.hasOwnProperty("gun_" + t[0].gunId) && (c.gunData["gun_" + t[0].gunId].levels = t);
}
delete c._jsonLevelData;
}
};
c.getGunData = function(e) {
return c.gunData && c.gunData["gun_" + e] ? c.gunData["gun_" + e] : null;
};
c.clone = function(e, t) {
t || (t = e.constructor ? new e.constructor() : {});
var n = void 0, o = void 0;
for (n in e) e.hasOwnProperty(n) && -1 != e[n] && ("object" === ("undefined" == typeof (o = e[n]) ? "undefined" : i(o)) && o ? t[n] = a.clone(o, null) : t[n] = o);
return t;
};
cc._RF.pop();
}, {
"./../common/UtilsOther": "UtilsOther"
} ],
HongBaoList1: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ba017aHvAFDvqmKfXxXorXN", "HongBaoList1");
cc.Class({
extends: cc.Component,
properties: {
Item: cc.Prefab,
Content: cc.Node,
MaxCount: 200
},
onLoad: function() {
cc.director.GlobalEvent.on("HongBaoListData", this.onUpdateHongBaoListData, this);
},
start: function() {},
onEnable: function() {
this.onUpdateHongBaoListData();
},
onUpdateHongBaoListData: function() {
var e = this;
this.clearContent();
for (var t = GameData.HongBaoList, n = function(n) {
var i = cc.instantiate(e.Item);
i.parent = e.Content;
i.getChildByName("Index").getComponent(cc.Label).string = n + 1;
i.getChildByName("UserName").getComponent(cc.Label).string = t[n].nickname;
i.getChildByName("Count").getComponent(cc.Label).string = t[n].amount;
cc.loader.load({
url: t[n].headPortrait,
type: "png"
}, function(e, t) {
var n = new cc.SpriteFrame(t);
i.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = n;
});
}, i = 0; i < t.length; i++) n(i);
},
clearContent: function() {
for (var e = this.Content.children, t = 0; t < e.length; t++) e[t].destroy();
}
});
cc._RF.pop();
}, {} ],
HongBaoList: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "66c80gfUIpMmozkg9id1l9D", "HongBaoList");
cc.Class({
extends: cc.Component,
properties: {
Item: cc.Prefab,
Content: cc.Node,
MaxCount: 200
},
onLoad: function() {
cc.director.GlobalEvent.on("HongBaoListData", this.onUpdateHongBaoListData, this);
},
start: function() {},
onEnable: function() {
this.onUpdateHongBaoListData();
},
onUpdateHongBaoListData: function() {
var e = this;
this.clearContent();
for (var t = GameData.HongBaoList, n = function(n) {
var i = cc.instantiate(e.Item);
i.parent = e.Content;
i.getChildByName("Index").getComponent(cc.Label).string = n + 1;
i.getChildByName("UserName").getComponent(cc.Label).string = t[n].nickname;
i.getChildByName("Count").getComponent(cc.Label).string = t[n].amount;
cc.loader.load({
url: t[n].headPortrait,
type: "png"
}, function(e, t) {
var n = new cc.SpriteFrame(t);
i.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = n;
});
}, i = 0; i < t.length; i++) n(i);
},
clearContent: function() {
for (var e = this.Content.children, t = 0; t < e.length; t++) e[t].destroy();
}
});
cc._RF.pop();
}, {} ],
HongBao: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e55f9b3L4BEqpjn5SQGMf2U", "HongBao");
cc.Class({
extends: cc.Component,
properties: {
PlayerCount: 10,
QiangButton: cc.Node,
CloseButton: cc.Node,
StatusNode: [ cc.Node ],
SubPanel: [ cc.Node ],
ZhaDanClip: {
type: cc.AudioClip,
default: null
},
Texture: {
type: cc.Texture2D,
default: []
},
Automatic: !1,
NextHongBao: cc.Node,
HongBaoTab: cc.Node
},
onLoad: function() {
var e = this;
if (void 0 == Global.ResourceMgr) {
Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
Global.SocketMgr = cc.find("SocketMgr").getComponent("SocketMgr");
Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
}
GameData.ReadParkSinl = 0;
cc.director.GlobalEvent.on("CurHongBaoData", this.onUpdateCurHongBaoData, this);
cc.director.GlobalEvent.on("HongBaoUserData", this.onUpdateHongBaoUserData, this);
cc.director.GlobalEvent.on("CurHongBaoCountData", this.onUpdateCurHongBaoCountData, this);
cc.director.GlobalEvent.on("KaiJiangList", this.OnUpdateKaiJiangList, this);
cc.director.GlobalEvent.on("KaiJiang", this.OnUpdateKaiJiang, this);
cc.director.GlobalEvent.on("CountDown", this.onUpdateCountDown, this);
Global.SocketMgr.openSocket();
this.PlayerList = this.node.getChildByName("PlayerList");
this.pageMgr = cc.find("PageMgr").getComponent("PageMgr");
this.dataList = [];
this.PlayerList.children.forEach(function(t) {
e.initItem(t);
e.dataList.push(t);
});
this.QiangButton.off(cc.Node.EventType.TOUCH_END);
this.QiangButton.on(cc.Node.EventType.TOUCH_END, function() {
e.qiangHongBao();
});
},
initItem: function(e) {
e.text = e.getChildByName("Text").getComponent(cc.Label);
e.count = e.getChildByName("Count").getComponent(cc.Label);
e.icon = e.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite);
e.icon2 = e.getChildByName("Icon2").getComponent(cc.Sprite);
},
onUpdateHongBaoUserData: function() {
var e = this.node.getChildByName("Me"), t = e.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite), n = e.getChildByName("Text").getComponent(cc.Label), i = e.getChildByName("Count").getComponent(cc.Label);
n.string = GameData.HongBaoUserData.nickname;
i.string = GameData.HongBaoUserData.amount;
cc.loader.load({
url: GameData.HongBaoUserData.headPortrait,
type: "png"
}, function(e, n) {
var i = new cc.SpriteFrame(n);
t.spriteFrame = i;
});
},
onUpdateCurHongBaoData: function() {
var e = this;
this.node.getChildByName("State").getChildByName("HB").getChildByName("Text").getComponent(cc.Label).string = "剩余：10";
this.StatusNode.forEach(function(e) {
e.active = !1;
});
this.StatusNode[0].active = !0;
this.HongBaoTab.active = !0;
this.HongBaoTab.getComponent(cc.Animation).play();
this.PlayerListFadeOutAnim();
this.ClearPlayerList();
setTimeout(function() {
e.PlayerListFadeInAnim();
}, 300);
setTimeout(function() {
e.HongBaoTab.active = !1;
e.StatusNode[0].getChildByName("抢").active = !0;
e.StatusNode[0].getChildByName("JieSuanZhong").active = !1;
GameData.ReadParkSinl = 1;
var t = e.node.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite), n = e.node.getChildByName("UserName").getComponent(cc.Label), i = e.node.getChildByName("State").getChildByName("ZD").getChildByName("Text").getComponent(cc.Label);
e.node.getChildByName("State").getChildByName("Timer").getChildByName("Text").getComponent(cc.Label).string = GameData.CurHongBao.amount;
n.string = GameData.CurHongBao.nickname;
i.string = "雷号：" + GameData.CurHongBao.bombDigital;
cc.loader.load({
url: GameData.CurHongBao.headPortrait,
type: "png"
}, function(e, n) {
var i = new cc.SpriteFrame(n);
t.spriteFrame = i;
});
}, 180);
},
onUpdateCurHongBaoCountData: function() {
this.node.getChildByName("State").getChildByName("HB").getChildByName("Text").getComponent(cc.Label).string = "剩余：" + GameData.CurHongBaoCount;
},
onUpdateCountDown: function() {
this.node.getChildByName("Clock").getChildByName("Text").getComponent(cc.Label).string = GameData.CountDown;
},
toggleAutomatic: function(e) {
this.Automatic = e.isChecked;
},
OnUpdateKaiJiangList: function() {
var e = this, t = GameData.KaiJiangList;
this.node.getChildByName("State").getChildByName("HB").getChildByName("Text").getComponent(cc.Label).string = "剩余：" + (10 - t.length);
for (var n = function(n) {
if (void 0 != t[n]) {
e.dataList[n].text.string = t[n].nickname;
e.dataList[n].count.string = t[n].reward;
if (0 == t[n].status) e.dataList[n].count.string = "未开奖"; else if (2 == t[n].status) {
var i = new cc.SpriteFrame(e.Texture[1]);
e.dataList[n].icon2.spriteFrame = i;
}
cc.loader.load({
url: t[n].headPortrait,
type: "png"
}, function(t, i) {
var a = new cc.SpriteFrame(i);
e.dataList[n].icon.spriteFrame = a;
});
} else {
e.dataList[n].text.string = "";
e.dataList[n].count.string = "";
e.dataList[n].icon.spriteFrame = null;
e.dataList[n].icon2.spriteFrame = null;
}
}, i = 0; i < 10; i++) n(i);
},
OnUpdateKaiJiang: function() {
for (var e = GameData.KaiJiangList, t = 0; t < e.length; t++) {
if (e[t].memberId && e[t].memberId == GameData.HongBaoUserData.memberId && 1 == e[t].status) {
this.StatusNode.forEach(function(e) {
e.active = !1;
});
cc.audioEngine.pauseAll();
cc.audioEngine.play(Global.ResourceMgr.winAudioClip, !1, .1);
this.scheduleOnce(function() {
Global.ResourceMgr.playHongBaoAudio();
}, 12);
this.StatusNode[1].active = !0;
this.StatusNode[1].getChildByName("LeiHao").getComponent(cc.Label).string = "雷号：" + GameData.CurHongBao.bombDigital;
var n = GameData.HongBaoJieGuo > 0 ? "+" : "";
this.StatusNode[1].getChildByName("Num").getComponent(cc.Label).string = "庄家：" + n + GameData.HongBaoJieGuo;
this.StatusNode[1].getChildByName("JinE").getComponent(cc.Label).string = "+" + e[t].reward;
return;
}
if (e[t].memberId && e[t].memberId == GameData.HongBaoUserData.memberId && 2 == e[t].status) {
this.StatusNode.forEach(function(e) {
e.active = !1;
});
cc.audioEngine.pauseAll();
cc.audioEngine.play(Global.ResourceMgr.failAudioClip, !1, .3);
cc.audioEngine.play(this.ZhaDanClip, !1, GameData.audio + 0);
this.scheduleOnce(function() {
Global.ResourceMgr.playHongBaoAudio();
}, 3);
this.StatusNode[3].active = !0;
this.StatusNode[3].getChildByName("LeiHao").getComponent(cc.Label).string = "雷号：" + GameData.CurHongBao.bombDigital;
var i = GameData.HongBaoJieGuo > 0 ? "+" : "";
this.StatusNode[3].getChildByName("Num").getComponent(cc.Label).string = "庄家：" + i + GameData.HongBaoJieGuo;
this.StatusNode[3].getChildByName("Gain").getComponent(cc.Label).string = "已中奖:" + e[t].reward;
this.StatusNode[3].getChildByName("Paid").getComponent(cc.Label).string = "已赔付:" + GameData.CurHongBao.amount;
this.StatusNode[3].getComponent(cc.Animation).play();
return;
}
}
this.StatusNode.forEach(function(e) {
e.active = !1;
});
this.StatusNode[2].active = !0;
this.StatusNode[2].getChildByName("LeiHao").getComponent(cc.Label).string = "雷号：" + GameData.CurHongBao.bombDigital;
var a = GameData.HongBaoJieGuo > 0 ? "+" : "";
this.StatusNode[2].getChildByName("Num").getComponent(cc.Label).string = "庄家：" + a + GameData.HongBaoJieGuo;
},
start: function() {
Global.ResourceMgr.playHongBaoAudio();
},
onEnable: function() {},
ClearPlayerList: function() {
for (var e = 0; e < 10; e++) {
this.dataList[e].text.string = "";
this.dataList[e].count.string = "";
this.dataList[e].icon.spriteFrame = null;
this.dataList[e].icon2.spriteFrame = null;
}
},
PlayerListFadeInAnim: function() {
var e = this.PlayerList.children, t = 0, n = setInterval(function() {
if (t >= 10) clearInterval(n); else {
e[t].x += e[t].width;
var i = cc.spawn(cc.moveBy(.5, cc.v2(-e[t].width, 0)), cc.fadeIn(.5));
e[t].runAction(i);
t += 2;
}
}, 200), i = 1, a = setInterval(function() {
if (i >= 10) clearInterval(a); else {
e[i].x -= e[i].width;
var t = cc.spawn(cc.moveBy(.3, cc.v2(e[i].width, 0)), cc.fadeIn(.3));
e[i].runAction(t);
i += 2;
}
}, 200);
},
PlayerListFadeOutAnim: function() {
this.PlayerList.children.forEach(function(e) {
var t = cc.fadeOut(.3);
e.runAction(t);
});
},
showSubPanel: function(e, t) {
this.SubPanel[t].active = !0;
},
closeSubPanel: function(e, t) {
this.SubPanel[t].active = !1;
},
closeGames: function() {
var e = this;
Global.SocketMgr.closeSocket(function() {
e.node.destroy();
});
},
qiangHongBao: function() {
var e = this;
if (1 == GameData.ReadParkSinl) {
GameData.ReadParkSinl = 0;
Global.ProtocolMgr.QiangHongBao(function(t) {
if (200 == t.code && "true" == t.data) {
e.StatusNode[0].getChildByName("抢").active = !1;
e.StatusNode[0].getChildByName("JieSuanZhong").active = !0;
Global.PageMgr.closeLoadingPage();
} else {
Global.PageMgr.closeLoadingPage();
Global.PageMgr.showTipPage2(t.message);
GameData.ReadParkSinl = 1;
}
});
}
},
update: function(e) {
this.Automatic && this.StatusNode[0].active && this.qiangHongBao();
},
onDestroy: function() {
cc.director.GlobalEvent.off("CurHongBaoData");
cc.director.GlobalEvent.off("HongBaoUserData");
cc.director.GlobalEvent.off("CurHongBaoCountData");
cc.director.GlobalEvent.off("KaiJiangList");
cc.director.GlobalEvent.off("KaiJiang");
cc.director.GlobalEvent.off("CountDown");
cc.audioEngine.pauseAll();
Global.ResourceMgr.playTransitionIn();
cc.director.loadScene("Dssc", function() {
console.log("切换场景");
});
}
});
cc._RF.pop();
}, {} ],
HotUpdate: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c6edbCiqItFsKAVcesZSzJZ", "HotUpdate");
cc.Class({
extends: cc.Component,
properties: {
manifestUrl: {
type: cc.Asset,
default: null
},
infoLb: cc.Label,
searchPathsLb: cc.Label,
_updating: !1,
_canRetry: !1,
_storagePath: ""
},
checkCb: function(e) {
cc.log("Code: " + e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.infoLb.string = "本地没有发现manifest文件，跳过更新.";
cc.director.loadScene("ECC");
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.infoLb.string = "更新失败，跳过更新.";
cc.director.loadScene("ECC");
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.infoLb.string = "已经是最新版本,即将进入游戏.";
cc.director.loadScene("ECC");
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this.infoLb.string = "发现新版本,即将开始更新.";
this.scheduleOnce(this.hotUpdate, 1);
break;

default:
return;
}
this._am.setEventCallback(null);
this._checkListener = null;
this._updating = !1;
},
updateCb: function(e) {
var t = !1, n = !1;
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.infoLb.string = "本地没有发现manifest文件，跳过更新.";
n = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var i = e.getMessage();
if (i) {
this.infoLb.string = "正在更新...";
this.searchPathsLb.string = e.getPercentByFile() / 100 + "%";
console.log(e.getPercentByFile() / 100 + "% : " + i);
}
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.infoLb.string = "更新失败，跳过更新.";
n = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.infoLb.string = "已经是最新版本,即将进入游戏.";
n = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
this.infoLb.string = "更新已完成，等待重启游戏.";
t = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.infoLb.string = "更新失败，跳过更新.";
this._updating = !1;
this._canRetry = !0;
cc.director.loadScene("ECC");
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
this.infoLb.string = "更新失败，跳过更新.";
cc.director.loadScene("ECC");
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
this.infoLb.string = "文件比对错误";
}
if (n) {
this._am.setEventCallback(null);
this._updateListener = null;
this._updating = !1;
cc.director.loadScene("ECC");
}
if (t) {
this._am.setEventCallback(null);
this._updateListener = null;
var a = jsb.fileUtils.getSearchPaths(), o = this._am.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(o));
Array.prototype.unshift.apply(a, o);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(a));
jsb.fileUtils.setSearchPaths(a);
cc.audioEngine.stopAll();
cc.game.restart();
}
},
retry: function() {
if (!this._updating && this._canRetry) {
this._canRetry = !1;
this.infoLb.string = "更新失败";
this._am.downloadFailedAssets();
}
},
checkUpdate: function() {
if (this._updating) this.infoLb.string = "正在检查更新."; else {
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
var e = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
this._am.loadLocalManifest(e);
}
if (this._am.getLocalManifest() && this._am.getLocalManifest().isLoaded()) {
this._am.setEventCallback(this.checkCb.bind(this));
this._am.checkUpdate();
this._updating = !0;
} else {
this.infoLb.string = "本地没有发现manifest文件，跳过更新.";
cc.director.loadScene("ECC");
}
}
},
hotUpdate: function() {
if (this._am && !this._updating) {
this._am.setEventCallback(this.updateCb.bind(this));
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
var e = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
this._am.loadLocalManifest(e);
}
this._failCount = 0;
this._am.update();
this._updating = !0;
}
},
onLoad: function() {
if (cc.sys.isNative) {
this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjack-remote-asset";
cc.log("Storage path for remote asset : " + this._storagePath);
this.versionCompareHandle = function(e, t) {
cc.log("JS Custom Version Compare: version A is " + e + ", version B is " + t);
for (var n = e.split("."), i = t.split("."), a = 0; a < n.length; ++a) {
var o = parseInt(n[a]), r = parseInt(i[a] || 0);
if (o !== r) return o - r;
}
return i.length > n.length ? -1 : 0;
};
this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
this.infoLb.string = "正在检查更新.";
this._am.setVerifyCallback(function(e, t) {
t.compressed, t.md5, t.path, t.size;
return !0;
});
cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2);
this.scheduleOnce(this.checkUpdate, 1);
} else cc.director.loadScene("ECC");
},
onDestroy: function() {
if (this._updateListener) {
this._am.setEventCallback(null);
this._updateListener = null;
}
}
});
cc._RF.pop();
}, {} ],
HttpProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ae20cwKtwdBMZtY6Ie6ZibZ", "HttpProxy");
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("./GameHttp"), o = e("./../common/DataMgr"), r = e("./../common/FacebookMgr"), c = e("./../common/UtilsCross"), s = e("./../encrypt/Md5").md5_hex_hmac;
cc.Class({
ctor: function() {},
login: function(e, t) {
var n = c.getUID();
cc.log("uid=" + n);
if (n || !t) {
o.getInstance().playerObj;
var i = {
uid: n
};
this.serverRequest("http://api.vdnmetaverse.org/api//login", i, e, t);
} else t();
},
bindFb: function(e, t) {
var n = c.getUID();
cc.log("uid=" + n);
if (n || !t) {
var i = o.getInstance().playerObj, a = {
sid: i.sid,
fbid: i.fbid,
uid: n
};
this.serverRequest("http://api.vdnmetaverse.org/api//bind_fb", a, e, t);
} else t();
},
updateIcon: function(e, t) {
var n = o.getInstance().playerObj, i = {
fbid: n.fbid,
fbicon: n.fbicon
};
this.serverRequest("http://api.vdnmetaverse.org/api//update_icon", i, e, t);
},
updateName: function(e, t) {
var n = o.getInstance().playerObj, i = {
fbid: n.fbid,
fbname: n.fbname
};
this.serverRequest("http://api.vdnmetaverse.org/api//update_name", i, e, t);
},
uploadScore: function(e, t) {
var n = o.getInstance().playerObj, i = {
sid: n.sid,
score: n.bestScore
};
this.serverRequest("http://api.vdnmetaverse.org/api//upload_score", i, e, t);
},
getRankList: function(e, t) {
var n = o.getInstance().playerObj, i = {
sid: n.sid
};
this.serverRequest("http://api.vdnmetaverse.org/api//get_rank", i, e, t);
},
getFriendsRankList: function(e, t) {
var n = o.getInstance().playerObj, a = r.getInstance().installFriends;
if (n.fbid <= 0 && t) t("Haven't any friend."); else {
cc.log(("undefined" == typeof a ? "undefined" : i(a)) + " | " + a);
cc.log("friends + " + JSON.stringify(a));
var c = [], s = !0, l = !1, u = void 0;
try {
for (var d, h = a[Symbol.iterator](); !(s = (d = h.next()).done); s = !0) {
var g = d.value;
c.push(parseInt(g.uid));
}
} catch (e) {
l = !0;
u = e;
} finally {
try {
!s && h.return && h.return();
} finally {
if (l) throw u;
}
}
cc.log(("undefined" == typeof c ? "undefined" : i(c)) + " | " + c);
cc.log(JSON.stringify(c));
var f = {
fbid: n.fbid,
friends: c
};
cc.log("get friend rank: " + JSON.stringify(f));
this.serverRequest("http://api.vdnmetaverse.org/api//get_rank_friends", f, e, t);
}
},
serverRequest: function(e, t, n, o) {
cc.log("serverRequest: " + ("undefined" == typeof t ? "undefined" : i(t)) + " | " + JSON.stringify(t));
t = "string" == typeof t ? t : JSON.stringify(t);
var r = s("tclsafegame", t), l = {
data: JSON.parse(t),
encrypt: r,
version: c.getAppVersion() || "2.0.0"
};
l = JSON.stringify(l);
a.httpPost(e, l, function(t) {
if (t.isOk()) {
cc.log("requrest: " + e + " 成功。");
n && n(t.getBody());
} else {
cc.log("requrest: " + e + " 失败。");
o && o(t.getError() || t.getBody());
}
});
}
});
cc._RF.pop();
}, {
"./../common/DataMgr": "DataMgr",
"./../common/FacebookMgr": "FacebookMgr",
"./../common/UtilsCross": "UtilsCross",
"./../encrypt/Md5": "Md5",
"./GameHttp": "GameHttp"
} ],
IAPMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ba3e48snhxAYqGJTfBSUjaa", "IAPMgr");
var i = e("./IAP"), a = (e("./UtilsOther"), cc.Class({
ctor: function() {
this.iap = new i();
this._initSuccess = !1;
},
statics: {
instance: null,
getInstance: function() {
null == a.instance && (a.instance = new a());
return a.instance;
}
},
initIAP: function(e) {
cc.log("init iap");
this._initSuccess = this.iap.init(this, e);
},
pay: function(e) {
if (this._initSuccess) {
cc.log(" 购买的商品id：" + e);
this.iap.pay(e);
}
},
restore: function() {
if (this._initSuccess) {
cc.log("IAPMgr restore");
this.iap.restore();
}
},
savePurchaseSuccessProductInfo: function(e, t) {},
onInitialized: function(e) {
cc.log("sdkbox iap init: " + e);
},
onSuccess: function(e) {
cc.log("IAPMgr store onSuccess = " + JSON.stringify(e));
var t = {};
t.productId = e.name;
t.vender = "APPLE";
t.receipt = e.receiptCipheredPayload;
cc.log("buy success------------1");
cc.log("product.name:" + e.name);
IapTools.onBuySuc(e.name);
cc.log("buy success------------2");
},
onFailure: function(e, t) {
cc.log("IAPMgr store onFailure = " + JSON.stringify(e) + " ===   msg: " + t);
cc.log("buy failed------------1");
cc.log("product.name:" + e.name);
IapTools.onBuyFailed(t);
cc.log("buy failed------------2");
},
onCanceled: function(e) {},
onRestored: function(e) {
cc.log("IAPMgr: onRestored " + JSON.stringify(e));
},
onRestoreComplete: function(e, t) {
cc.log("IAPMgr: onRestored Complete " + e + ", " + t);
IapTools.onRestoreFinished(e, t);
},
onProductRequestSuccess: function(e) {
cc.log("IAPMgr store onProductRequestSuccess = " + JSON.stringify(e));
},
onProductRequestFailure: function(e) {
cc.log("IAPMgr: onProductRequestFailure " + e);
}
}));
t.exports = a;
cc._RF.pop();
}, {
"./IAP": "IAP",
"./UtilsOther": "UtilsOther"
} ],
IAP: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3b2796tpxBLwqvP7PRPoGTW", "IAP");
var i = cc.Class({
init: function(e, t) {
if ("undefined" == typeof sdkbox) {
cc.log("sdkbox undefined");
return !1;
}
sdkbox.IAP.setListener(e);
sdkbox.IAP.init();
sdkbox.IAP.setDebug(t);
sdkbox.IAP.enableUserSideVerification(!1);
sdkbox.IAP.refresh();
return !0;
},
pay: function(e) {
sdkbox.IAP && sdkbox.IAP.purchase(e);
},
restore: function() {
sdkbox.IAP && sdkbox.IAP.restore();
},
refresh: function() {
sdkbox.IAP && sdkbox.IAP.refresh();
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
IapTools: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8931ckxYbhIdaBvpbEduuhE", "IapTools");
var i = i || {};
window.IapTools = i;
i.buy = function(e, t, n) {
if (GlobalNiuNiu.config.DEBUG_MODE) {
i.sucCallback = t;
i.onBuySuc(e);
} else {
if (cc.sys.isNative) {
i.sucCallback = t;
i.failedCallback = n;
var a = "";
if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) a = jsb.reflection.callStaticMethod("HKPayManagerSolitaire", "applePay:", e); else if (cc.sys.platform === cc.sys.ANDROID) {
cc.log("iaptools buy android:" + e);
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "purchaseInApp", "(Ljava/lang/String;)V", e);
}
return a;
}
cc.log("only native can use iap.");
}
};
i.buySubs = function(e, t, n) {
if (GlobalNiuNiu.config.DEBUG_MODE) {
i.sucCallback = t;
i.onBuySuc(e);
} else {
if (cc.sys.isNative) {
i.sucCallback = t;
i.failedCallback = n;
var a = "";
if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) a = jsb.reflection.callStaticMethod("HKPayManagerSolitaire", "applePay:", e); else if (cc.sys.platform === cc.sys.ANDROID) {
cc.log("iaptools buy android:" + e);
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "purchaseSubs", "(Ljava/lang/String;)V", e);
}
return a;
}
cc.log("only native can use iap.");
}
};
i.getSubsSize = function() {
var e = 0;
if (!cc.sys.isNative) {
cc.log("only native can buySubs.");
return e;
}
cc.sys.platform === cc.sys.ANDROID && (e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getPurchasesSubsSize", "()I"));
return e;
};
i.restorePurchase = function(e, t) {
if (cc.sys.isNative) {
i.sucCallback = e;
i.failedCallback = t;
var n = "";
if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) n = jsb.reflection.callStaticMethod("HKPayManagerSolitaire", "restorePurchase"); else if (cc.sys.platform == cc.sys.ANDROID) {
a = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "restorePurchase", "()Ljava/lang/String;");
cc.log("restore suc ret:" + a);
var a = JSON.parse(a);
cc.log(a.length);
}
return n;
}
cc.log("only native can use iap.");
};
i.onBuySuc = function(e) {
cc.log("js购买成功. key=" + e);
if (i.sucCallback) {
i.sucCallback(e);
i.sucCallback = null;
}
};
i.onBuyFailed = function(e) {
cc.log("js购买失败. code=" + e);
if (i.failedCallback) {
i.failedCallback(e);
i.failedCallback = null;
}
};
i.onRestoreFinished = function(e, t) {
cc.log("IapTools.onRestoreFinished: " + e + ", " + t);
cc.log("js恢复购买成功.");
i.sucCallback && i.sucCallback();
};
i.verifyVip = function(e) {
cc.log("js verify Vip:" + e);
GlobalNiuNiu.dataMgr.iapObj.vipValid = "true" === e;
};
cc._RF.pop();
}, {} ],
ImageLoader: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "566a8u4E89OTpifgnBlXV1D", "ImageLoader");
function i(e, t) {
cc.loader.load({
url: e,
type: "jpeg"
}, function(e, n) {
e ? cc.error(e) : t(n);
});
}
t.exports = {
loadImage: function(t, n) {
if (cc.sys.isNative) {
var a = jsb.fileUtils.getWritablePath() + "TclGameImg/";
cc.log("dirpath: " + a);
var o = e("./../encrypt/Md5").md5_hex(t), r = a + o + ".jpg";
cc.log("filepath: " + r);
if (jsb.fileUtils.isFileExist(r)) {
cc.log("Remote img is find: " + r);
l();
} else {
var c = function(e) {
if (e && "undefined" != typeof e) {
jsb.fileUtils.isDirectoryExist(a) ? cc.log("路径 " + a + "已经存在。") : jsb.fileUtils.createDirectory(a);
if (jsb.fileUtils.writeDataToFile(new Uint8Array(e), r)) {
cc.log("Remote img save succeed.");
l();
} else cc.log("Remote img save failed.");
} else cc.log("Remote img download failed.");
}, s = cc.loader.getXMLHttpRequest();
s.onreadystatechange = function() {
cc.log("xhr.readyState: " + s.readyState);
cc.log("xhr.status: " + s.status);
4 === s.readyState && (200 === s.status ? c(s.response) : c(null));
}.bind(this);
s.responseType = "arraybuffer";
s.open("GET", t, !0);
s.send();
}
} else i(t, n);
function l() {
cc.loader.load(r, function(e, t) {
e ? cc.error(e) : n(t);
});
}
}
};
cc._RF.pop();
}, {
"./../encrypt/Md5": "Md5"
} ],
IncomeDetailsPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a873duKATBCFIbnWvflISIG", "IncomeDetailsPanel");
cc.Class({
extends: cc.Component,
properties: {
incomeDetailsItem: cc.Prefab,
container_incomeDetails: cc.Node,
pageSum: 1,
pageSum2: 1
},
onEnable: function() {
this.pageSum = 1;
this.upDataAccountDetail();
},
upDataAccountDetail: function() {
var e = this;
Global.ProtocolMgr.querygetAccountDetail(0, 10, this.pageSum, function(t) {
if (200 == t.code) {
if (t.data) {
var n = t.data.accountDetailList;
if (0 == n.length) {
1 != e.pageSum && Global.PageMgr.showTipPage("已经是最后页了");
e.pageSum = e.pageSum2 + 1;
return;
}
e.pageSum2 = e.pageSum;
1 != e.pageSum && Global.PageMgr.showTipPage("刷新成功！");
e.container_incomeDetails.removeAllChildren();
for (var i = 0; i < n.length; i++) {
var a = cc.instantiate(e.incomeDetailsItem);
a.getComponent("IncomeDetails_Item").setData(n[i]);
e.container_incomeDetails.addChild(a);
}
}
} else Global.PageMgr.showTipPage(t.message);
});
},
onClickDown: function() {
if (this.pageSum > 2) this.pageSum -= 1; else {
this.pageSum = 1;
Global.PageMgr.showTipPage("已经是首页了");
}
this.upDataAccountDetail();
},
onClickUp: function() {
this.pageSum += 1;
this.upDataAccountDetail();
},
onClickGivingCrystal: function() {
Global.PageMgr.onOpenPage(24);
}
});
cc._RF.pop();
}, {} ],
IncomeDetails_Item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2a859WuBEhOBaZT649ZWoWl", "IncomeDetails_Item");
cc.Class({
extends: cc.Component,
properties: {
label_name: cc.Label,
label_time: cc.Label,
label_pic: cc.Label
},
start: function() {},
setData: function(e) {
this.label_name.string = e.title;
this.label_time.string = e.tradeTime;
var t = parseFloat(e.tradeValue).toFixed(4);
0 == e.tradeType ? this.label_pic.string = cc.js.formatStr("+%s", t) : this.label_pic.string = cc.js.formatStr("-%s", t);
}
});
cc._RF.pop();
}, {} ],
Item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e40c0JyK6JBaItgKq5a3d6M", "Item");
cc.Class({
extends: cc.Component,
properties: {},
initComboBox: function(e) {
this.cb = e;
},
itemBtn: function(e) {
this.cb.comboLabel.string = e.target.children[0].getComponent(cc.Label).string;
this.cb.comboboxClicked();
}
});
cc._RF.pop();
}, {} ],
JiaoYiPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "89e4eVpcWdO86MV0eGi5xBy", "JiaoYiPanel");
cc.Class({
extends: cc.Component,
properties: {
jiaoyi_item: cc.Prefab,
container: cc.Node,
btn_item: [ cc.Sprite ]
},
onEnable: function() {
this.getListData(null, 0);
},
getListData: function(e, t) {
var n = this;
this.btn_item.forEach(function(e) {
e.spriteFrame = null;
});
cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function(e, i) {
e || (n.btn_item[parseInt(t)].spriteFrame = i);
});
Global.ProtocolMgr.queryJiaoYiList(function(e) {
if (200 == e.code) {
var t = e.data;
console.log(t);
n.container.removeAllChildren();
for (var i = 0; i < t.length; i++) {
var a = cc.instantiate(n.jiaoyi_item);
a.getComponent("jiaoyi_item").setData(i, t[i]);
n.container.addChild(a);
}
} else Global.PageMgr.showTipPage(e.message);
});
},
close: function() {
Global.PageMgr.onClosePage(3);
}
});
cc._RF.pop();
}, {} ],
KnapsackPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "be2faIGlPJOTprJIQSKkJ+A", "KnapsackPanel");
cc.Class({
extends: cc.Component,
properties: {
NFT_item: cc.Prefab,
XHP_item: cc.Prefab,
container: cc.Node,
btn_item: [ cc.Sprite ]
},
onEnable: function() {
this.getShopList(null, 0);
Global.ProtocolMgr.queryUserData();
},
getShopList: function(e, t) {
var n = this;
this.btn_item.forEach(function(e) {
e.spriteFrame = null;
});
cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function(e, i) {
e || (n.btn_item[parseInt(t)].spriteFrame = i);
});
this.container.removeAllChildren();
switch (parseInt(t)) {
case 0:
Global.ProtocolMgr.queryKnapsackNFTList(function(e) {
console.log(e);
if (200 == e.code) for (var t = e.data, i = 0; i < t.length; i++) {
var a = cc.instantiate(n.NFT_item);
a.getComponent("NFT_item").setData(t[i], 2);
n.container.addChild(a);
} else Global.PageMgr.showTipPage(e.message);
});
break;

case 1:
Global.ProtocolMgr.queryKnapsackXHPList(function(e) {
console.log(e);
if (200 == e.code) for (var t = e.data, i = 0; i < t.length; i++) {
var a = cc.instantiate(n.XHP_item);
a.getComponent("XHP_item").setData(t[i], 2);
n.container.addChild(a);
} else Global.PageMgr.showTipPage(e.message);
});
break;

case 2:
Global.PageMgr.onOpenPage(6);
}
},
onDisable: function() {}
});
cc._RF.pop();
}, {} ],
KuangChi: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3f2f8owz7RMu4c+1fcvsw1e", "KuangChi");
cc.Class({
extends: cc.Component,
properties: {
UserData: [ cc.Node ],
SubPanel: [ cc.Node ],
GonGao: cc.Node,
ECC: cc.Prefab,
Count: 10
},
onLoad: function() {
var e = this;
cc.director.GlobalEvent.on("UserData", this.onUpdateUserData, this);
Global.ProtocolMgr.queryUserData();
Global.ProtocolMgr.queryEcc(function(t) {
e.Count = parseInt(t.data.number);
for (var n = function(t) {
var n = cc.instantiate(e.ECC), i = e.randomPosition();
n.parent = e.node;
n.x = i.x;
n.y = i.y;
var a = cc.repeatForever(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(1, cc.v2(0, -20))));
setTimeout(function() {
n.runAction(a);
}, 1e3 * Math.random());
n.on(cc.Node.EventType.TOUCH_END, function() {
if ("ECC" == n.name) {
Global.ProtocolMgr.addEcc();
n.off(cc.Node.EventType.TOUCH_END);
n.destroy();
}
}, e);
}, i = 0; i < e.Count; i++) n();
});
},
onUpdateUserData: function() {
var e = this;
try {
cc.loader.load({
url: GameData.UserData[0],
type: "png"
}, function(t, n) {
e.UserData[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n);
});
} catch (e) {
console.warn(e);
}
for (var t = 1; t < this.UserData.length; t++) this.UserData[t].getComponent(cc.Label).string = parseFloat(GameData.UserData[t]).toFixed(2);
},
start: function() {},
randomPosition: function() {
var e = cc.director.getScene().getChildByName("Canvas").getComponent(cc.Canvas).node, t = -e.width / 2 + 80, n = -e.height / 2 + 80, i = e.width / 2 - 80, a = e.height / 2 - 80;
return {
x: dataFunc.randomNum(t, i),
y: dataFunc.randomNum(n, a)
};
},
showSubPanel: function(e, t) {
this.SubPanel[t].active = !0;
},
closeSubPanel: function(e, t) {
this.SubPanel[t].active = !1;
},
filterClick: function() {
console.log("点击过滤");
},
onDestroy: function() {
cc.director.GlobalEvent.off("UserData");
}
});
cc._RF.pop();
}, {} ],
KuangJiShiChang: [ function(require, module, exports) {
"use strict";
cc._RF.push(module, "f98b0G6LHVJR5l/ZyiURGR5", "KuangJiShiChang");
cc.Class({
extends: cc.Component,
properties: {
item: cc.Prefab,
Content: cc.Node,
KuangJiDetail: cc.Node,
Tips: cc.Node
},
onLoad: function() {
cc.director.GlobalEvent.on("KuangJiData", this.onUpdateKuangJiData, this);
Global.ProtocolMgr.queryKuangJi();
},
onUpdateKuangJiData: function onUpdateKuangJiData() {
var _this = this, backPack = GameData.KuangJiData;
backPack.forEach(function(e) {
var node = cc.instantiate(_this.item);
node.parent = _this.Content;
cc.loader.load({
url: e.picture,
type: "png"
}, function(e, t) {
node.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
});
node.getChildByName("Name").getComponent(cc.Label).string = e.name;
node.getChildByName("Text1").getComponent(cc.Label).string = "售价：" + e.rent;
node.getChildByName("Text2").getComponent(cc.Label).string = "E金币收益：" + e.coinIncome;
node.getChildByName("Text3").getComponent(cc.Label).string = "E矿场收益：" + e.mineIncome;
node.getChildByName("Text4").getComponent(cc.Label).string = "E令牌收益：" + e.tokenIncome;
node.getChildByName("Text5").getComponent(cc.Label).string = "总收益时长：" + e.incomeHour + "小时";
node.getChildByName("ZuYong").getChildByName("Background").color = eval(e.rentAble) ? new cc.color(219, 95, 156, 255) : new cc.color(102, 102, 102, 102);
eval(e.rentAble) && node.getChildByName("ZuYong").on(cc.Node.EventType.TOUCH_END, function() {
_this.showDetail(e, "租用");
});
node.getChildByName("YuYue").on(cc.Node.EventType.TOUCH_END, function() {
_this.showDetail(e, "预约");
});
});
},
showDetail: function(e, t) {
var n = this;
this.KuangJiDetail.active = !0;
cc.loader.load({
url: e.picture,
type: "png"
}, function(e, t) {
n.KuangJiDetail.getChildByName("Mask").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
});
var i = this.KuangJiDetail.getChildByName("Layout");
i.getChildByName("Name").getComponent(cc.Label).string = e.name;
i.getChildByName("Number").getComponent(cc.Label).string = "编号：" + e.name;
i.getChildByName("Count").getComponent(cc.Label).string = "预计投放：" + e.count + "(上限)";
i.getChildByName("Text").getComponent(cc.Label).string = "E金币收益：" + e.coinIncome;
i.getChildByName("Text1").getComponent(cc.Label).string = "E矿场收益：" + e.mineIncome;
i.getChildByName("Text2").getComponent(cc.Label).string = "E令牌收益：" + e.tokenIncome;
i.getChildByName("Text3").getComponent(cc.Label).string = "总收益时长：" + e.incomeHour + "小时";
i.getChildByName("Text4").getComponent(cc.Label).string = "租用金额：" + e.rent + "E金币";
this.KuangJiDetail.getChildByName("Button").getChildByName("Label").getComponent(cc.Label).string = t;
this.KuangJiDetail.getChildByName("Button").on(cc.Node.EventType.TOUCH_END, function() {
n.Tips.active = !0;
n.Tips.getChildByName("Content").getComponent(cc.Label).string = "是否消耗" + e.rent + "E金币进行" + t + "?";
n.Tips.getChildByName("Button").on(cc.Node.EventType.TOUCH_END, function() {
"预约" == t ? Global.ProtocolMgr.YuYueKuangJi(e.id, function(e) {
Global.PageMgr.closeLoadingPage();
if (200 == e.code) {
Global.PageMgr.showTipPage("预约成功");
n.closeDetail();
n.closeTips();
} else Global.PageMgr.showTipPage(e.message);
}) : Global.ProtocolMgr.ZuYongKuangJi(e.id, function(e) {
Global.PageMgr.closeLoadingPage();
if (200 == e.code) {
Global.PageMgr.showTipPage("租用成功");
n.closeDetail();
n.closeTips();
} else Global.PageMgr.showTipPage(e.message);
});
});
});
},
start: function() {},
closeDetail: function() {
this.KuangJiDetail.active = !1;
},
closeTips: function() {
this.Tips.active = !1;
},
closePage: function() {
Global.PageMgr.onClosePage(5);
},
onDestroy: function() {
cc.director.GlobalEvent.off("KuangJiData");
}
});
cc._RF.pop();
}, {} ],
LabelInteger: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "405f7hWPeJC67BWImVdh6Zm", "LabelInteger");
e("UtilsOther");
var i = cc.Enum({
None: 0,
ThousandSeparator: 1,
FormatTime: 2
}), a = function(e) {
var t = void 0;
if (e >= 0) {
var n = Math.floor(e / 3600), i = Math.floor(e / 60) % 60, a = e % 60, o = parseInt(n / 24);
if (1 == o) return o + " day";
if (o > 1) return o + " days";
t = o > 0 ? o + "day " + ("00" + (n -= 24 * o)).slice(-2) + ":" : n > 0 ? ("00" + n).slice(-2) + ":" : "";
i < 10 && (t += "0");
t += i + ":";
a < 10 && (t += "0");
t += parseInt(a);
}
return t;
};
cc.Class({
extends: cc.Label,
properties: {
formType: {
tooltip: "None: 不做格式化\nThousandSeparator: 3位逗号分隔\nFormatTime: 格式化时间",
type: i,
default: i.None,
notify: function(e) {
this.setValue(this.string);
}
},
animationDuration: {
tooltip: "动画时间",
default: .5
},
_textKey: 0,
string: {
override: !0,
tooltip: "必须是数字",
get: function() {
return this._textKey;
},
set: function(e) {
this._textKey = Number(e);
if (this._sgNode) {
switch (this.formType) {
case i.ThousandSeparator:
e = e.toString().split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
break;

case i.FormatTime:
e = a(e);
}
this._sgNode.setString(e);
this._updateNodeSize();
}
}
},
_curValue: 0,
_toValue: 0,
_delta: 0
},
setValue: function(e, t) {
("" === e || null === e || isNaN(e)) && cc.assert(!1, "The value of LabelInteger must be a Number!");
if (t) this._toValue = e; else {
this._toValue = e;
this._curValue = e;
this.string = e;
}
this._delta = 0;
},
setFormString: function(e) {
switch (this.formType) {
case i.None:
this.string = e;
break;

case i.ThousandSeparator:
this.string = e.split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
break;

case i.FormatTime:
this.string = a(e);
}
},
update: function(e) {
if (this._toValue != this._curValue) {
0 == this._delta && (this._delta = this._toValue - this._curValue);
var t = e / this.animationDuration * this._delta;
if (this._delta > 0) {
0 == (t = parseInt(t)) && (t = 1);
this._curValue += t;
this._curValue = Math.min(this._curValue, this._toValue);
} else {
t = -t;
0 == (t = parseInt(t)) && (t = 1);
this._curValue -= t;
this._curValue = Math.max(this._curValue, this._toValue);
}
this.string = this._curValue;
this._toValue == this._curValue && (this._delta = 0);
}
},
onLoad: function() {
this.setValue(this.string);
}
});
cc._RF.pop();
}, {
UtilsOther: "UtilsOther"
} ],
LabelOwnNumCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "858a73IPhtNkI+AvVWgT72B", "LabelOwnNumCtrl");
cc.Class({
extends: cc.Component,
properties: {
normalNode: cc.Node,
overflowNode: cc.Node
},
onLoad: function() {},
start: function() {},
setNum: function(e, t) {
this.normalNode.active = !1;
this.overflowNode.active = !1;
var n = this.normalNode;
e > t && (n = this.overflowNode);
n.active = !0;
n.getChildByName("labelOwnNum").getComponent(cc.Label).string = e;
n.getChildByName("labelMaxNum").getComponent(cc.Label).string = "/" + t;
}
});
cc._RF.pop();
}, {} ],
LanguageData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
var i = e("polyglot.min"), a = null;
window.i18n || (window.i18n = {
languages: {},
curLang: ""
});
0;
function o(e) {
return window.i18n.languages[e];
}
function r(e) {
e && (a ? a.replace(e) : a = new i({
phrases: e,
allowMissing: !0
}));
}
t.exports = {
init: function(e) {
if (e !== window.i18n.curLang) {
var t = o(e) || {};
window.i18n.curLang = e;
r(t);
this.inst = a;
}
},
t: function(e, t) {
if (a) return a.t(e, t);
},
inst: a,
updateSceneRenderers: function() {
for (var e = cc.director.getScene().children, t = [], n = 0; n < e.length; ++n) {
var i = e[n].getComponentsInChildren("LocalizedLabel");
Array.prototype.push.apply(t, i);
}
for (var a = 0; a < t.length; ++a) {
var o = t[a];
o.node.active && o.updateLabel();
}
for (var r = [], c = 0; c < e.length; ++c) {
var s = e[c].getComponentsInChildren("LocalizedSprite");
Array.prototype.push.apply(r, s);
}
for (var l = 0; l < r.length; ++l) {
var u = r[l];
u.node.active && u.updateSprite(window.i18n.curLang);
}
}
};
cc._RF.pop();
}, {
"polyglot.min": "polyglot.min"
} ],
ListView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e296byeSRBLjbkWFmmtp1Ev", "ListView");
var i = cc.Class({
ctor: function() {
this.dataSet = [];
},
setItemComponent: function(e) {
this.itemComponent = e;
},
getComponentType: function() {
return this.itemComponent;
},
setDataSet: function(e) {
this.dataSet = e;
},
getCount: function() {
return this.dataSet.length;
},
getItem: function(e) {
return this.dataSet[e];
},
_getView: function(e, t) {
var n = e.getComponent(this.itemComponent);
n ? this.updateView(n, t) : cc.warn("item 不包含组件:", this.itemComponent);
return e;
},
updateView: function(e, t) {}
}), a = cc.Class({
extends: cc.Component,
properties: {
itemTemplate: {
type: cc.Prefab,
default: null
},
spacing: {
type: cc.Float,
default: 1
},
spawnCount: {
type: cc.Integer,
default: 3
},
scrollView: {
type: cc.ScrollView,
default: null
},
content: {
type: cc.Node,
default: null,
visible: !1
},
adapter: {
type: i,
default: null,
visible: !1,
serializable: !1
},
_items: {
type: cc.NodePool,
default: null,
visible: !1
},
_filledIds: {
type: Object,
default: {},
visible: !1
},
horizontal: {
default: !1,
visible: !1
},
_itemHeight: 1,
_itemWidth: 1,
_itmesVisble: 1,
lastStartIndex: {
type: cc.Integer,
default: -1,
visible: !1
},
scrollTopNotifyed: {
default: !1,
visible: !1
},
scrollBottomNofityed: {
default: !1,
visible: !1
},
pullDownCallback: {
type: Object,
default: null,
visible: !1
},
pullUpCallback: {
type: Object,
default: null,
visible: !1
}
},
onLoad: function() {
if (this.scrollView) {
this.content = this.scrollView.content;
this.horizontal = this.scrollView.horizontal;
if (this.horizontal) {
this.scrollView.vertical = !1;
this.content.anchorX = 0;
this.content.x = this.content.getParent().width * this.content.getParent().anchorX;
} else {
this.scrollView.vertical = !0;
this.content.anchorY = 1;
this.content.y = this.content.getParent().height * this.content.getParent().anchorY;
}
} else console.error("ListView need a scrollView for showing.");
this._items = this._items || new cc.NodePool();
var e = this._items.get() || cc.instantiate(this.itemTemplate);
this._items.put(e);
this._itemHeight = e.height || 10;
this._itemWidth = e.width || 10;
this.horizontal ? this._itemsVisible = Math.ceil(this.content.getParent().width / this._itemWidth) : this._itemsVisible = Math.ceil(this.content.getParent().height / this._itemHeight);
console.log("可见区域的item数量为:", this._itemsVisible);
this.adjustEvent();
},
setAdapter: function(e) {
this.adapter = e;
if (null != this.adapter) if (null != this.itemTemplate) {
this._items.poolHandlerComp = this.adapter.getComponentType();
this.notifyUpdate();
} else cc.error("Listview 未设置待显示的Item模板."); else cc.warn("adapter 为空.");
},
getItemIndex: function(e) {
return Math.floor(Math.abs(e / (this._itemHeight + this.spacing)));
},
getPositionInView: function(e) {
var t = e.getParent().convertToWorldSpaceAR(e.position);
return this.scrollView.node.convertToNodeSpaceAR(t);
},
notifyUpdate: function(e) {
var t = this;
if (null != this.adapter) {
e && e.length > 0 ? e.forEach(function(e) {
t._filledIds.hasOwnProperty(e) && delete t._filledIds[e];
}) : Object.keys(this._filledIds).forEach(function(e) {
delete t._filledIds[e];
});
this.lastStartIndex = -1;
this.horizontal ? this.content.width = this.adapter.getCount() * (this._itemWidth + this.spacing) + this.spacing : this.content.height = this.adapter.getCount() * (this._itemHeight + this.spacing) + this.spacing;
this.scrollView.scrollToTop();
}
},
scrollToTop: function(e) {
this.scrollView.scrollToTop(e ? 1 : 0);
},
scrollToBottom: function(e) {
this.scrollView.scrollToBottom(e ? 1 : 0);
},
scrollToLeft: function(e) {
this.scrollView.scrollToLeft(e ? 1 : 0);
},
scrollToRight: function(e) {
this.scrollView.scrollToRight(e ? 1 : 0);
},
pullDown: function(e) {
this.pullDownCallback = e;
},
pullUp: function(e) {
this.pullUpCallback = e;
},
update: function(e) {
var t = this.checkNeedUpdate();
t >= 0 && this.updateView(t);
},
_layoutVertical: function(e, t) {
this.content.addChild(e);
e._tag = t;
this._filledIds[t] = t;
e.setPosition(0, -e.height * (.5 + t) - this.spacing * (t + 1));
},
_layoutHorizontal: function(e, t) {
this.content.addChild(e);
e._tag = t;
this._filledIds[t] = t;
e.setPosition(-e.width * (.5 + t) - this.spacing * (t + 1), 0);
},
getRecycleItems: function(e, t) {
var n = this, i = [];
this.content.children.forEach(function(a) {
if (a._tag < e || a._tag > t) {
i.push(a);
delete n._filledIds[a._tag];
}
});
return i;
},
updateView: function(e) {
var t = this, n = e, i = n + this._itemsVisible + (this.spawnCount || 2), a = this.adapter.getCount();
if (!(n >= a)) {
if (i > a) {
i = a;
if (!this.scrollBottomNotifyed) {
this.notifyScrollToBottom();
this.scrollBottomNotifyed = !0;
}
} else this.scrollBottomNotifyed = !1;
this.getRecycleItems(n - (this.spawnCount || 2), i).forEach(function(e) {
t._items.put(e);
});
var o = this.findUpdateIndex(n, i), r = !0, c = !1, s = void 0;
try {
for (var l, u = o[Symbol.iterator](); !(r = (l = u.next()).done); r = !0) {
var d = l.value, h = this.adapter._getView(this._items.get() || cc.instantiate(this.itemTemplate), d);
this.horizontal ? this._layoutHorizontal(h, d) : this._layoutVertical(h, d);
}
} catch (e) {
c = !0;
s = e;
} finally {
try {
!r && u.return && u.return();
} finally {
if (c) throw s;
}
}
}
},
checkNeedUpdate: function() {
if (null == this.adapter) return -1;
var e = this.horizontal ? this.content.x - this.content.getParent().width * this.content.getParent().anchorX : this.content.y - this.content.getParent().height * this.content.getParent().anchorY, t = Math.floor(e / ((this.horizontal ? this._itemWidth : this._itemHeight) + this.spacing));
if (t < 0 && !this.scrollTopNotifyed) {
this.notifyScrollToTop();
this.scrollTopNotifyed = !0;
return t;
}
t > 0 && (this.scrollTopNotifyed = !1);
if (this.lastStartIndex != t) {
this.lastStartIndex = t;
return t;
}
return -1;
},
findUpdateIndex: function(e, t) {
for (var n = [], i = e; i < t; i++) this._filledIds.hasOwnProperty(i) || n.push(i);
return n;
},
notifyScrollToTop: function() {
!this.adapter || this.adapter.getCount() <= 0 || this.pullDownCallback && this.pullDownCallback();
},
notifyScrollToBottom: function() {
!this.adapter || this.adapter.getCount() <= 0 || this.pullUpCallback && this.pullUpCallback();
},
adjustEvent: function() {
var e = this;
this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_END : cc.Node.EventType.MOUSE_UP, function() {
e.scrollTopNotifyed = !1;
e.scrollBottomNotifyed = !1;
}, this);
this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_CANCEL : cc.Node.EventType.MOUSE_LEAVE, function() {
e.scrollTopNotifyed = !1;
e.scrollBottomNotifyed = !1;
}, this);
},
isMobile: function() {
return cc.sys.isMobile || cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.QQ_PLAY;
}
});
t.exports = {
ListAdapter: i,
ListView: a
};
cc._RF.pop();
}, {} ],
LoadingCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "539dfETgYRGFKyeBNj7MYZ+", "LoadingCtrl");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
GlobalNiuNiu.dataMgr.loadDataFromLocal();
this.scheduleOnce(function() {
GlobalNiuNiu.loadScene("Menu");
}, .1);
}
});
cc._RF.pop();
}, {} ],
LobbyCardCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "93dd1zMxYVMPr7gCF16QY8F", "LobbyCardCtrl");
var i = e("./views/ModeSelViewCtrl");
cc.Class({
extends: cc.Component,
properties: {
logo: cc.Sprite,
mult: {
default: 1,
notify: function() {
this.multLabel.string = this.mult + "倍场";
}
},
multLabel: cc.Label
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onTouchEnd: function(e) {
GlobalNiuNiu.config.ROOM_MULT = this.mult;
i.show();
}
});
cc._RF.pop();
}, {
"./views/ModeSelViewCtrl": "ModeSelViewCtrl"
} ],
LobbyCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0586dFCtRpIW6bceNOwOlAU", "LobbyCtrl");
cc.Class({
extends: cc.Component,
properties: {
scrollView: cc.Node,
menu: cc.Node
},
start: function() {},
onBtnOffline: function() {
cc.log("单机模式.");
this.scrollView.active = !0;
this.menu.active = !1;
GlobalNiuNiu.config.ONLINE_MODE = !1;
},
onBtnRoom: function() {
GlobalNiuNiu.loadScene("Menu");
GlobalNiuNiu.config.ONLINE_MODE = !0;
}
});
cc._RF.pop();
}, {} ],
LocalizedLabel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
var i = e("LanguageData");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
menu: "i18n/LocalizedLabel"
},
properties: {
dataID: {
get: function() {
return this._dataID;
},
set: function(e) {
if (this._dataID !== e) {
this._dataID = e;
this.updateLabel();
}
}
},
_dataID: ""
},
onLoad: function() {
0;
i.inst || i.init();
cc.warn("dataID: " + this.dataID + " value: " + i.t(this.dataID));
this.fetchRender();
},
fetchRender: function() {
var e = this.getComponent(cc.Label);
if (e) {
this.label = e;
this.updateLabel();
} else ;
},
updateLabel: function() {
if (this.label) {
i.t(this.dataID) && (this.label.string = i.t(this.dataID));
} else cc.error("Failed to update localized label, label component is invalid!");
}
});
cc._RF.pop();
}, {
LanguageData: "LanguageData"
} ],
LocalizedSprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
var i = e("SpriteFrameSet");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
inspector: "packages://i18n/inspector/localized-sprite.js",
menu: "i18n/LocalizedSprite"
},
properties: {
spriteFrameSet: {
default: [],
type: i
}
},
onLoad: function() {
this.fetchRender();
},
fetchRender: function() {
var e = this.getComponent(cc.Sprite);
if (e) {
this.sprite = e;
this.updateSprite(window.i18n.curLang);
} else ;
},
getSpriteFrameByLang: function(e) {
for (var t = 0; t < this.spriteFrameSet.length; ++t) if (this.spriteFrameSet[t].language === e) return this.spriteFrameSet[t].spriteFrame;
},
updateSprite: function(e) {
if (this.sprite) {
var t = this.getSpriteFrameByLang(e);
!t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame);
this.sprite.spriteFrame = t;
} else cc.error("Failed to update localized sprite, sprite component is invalid!");
}
});
cc._RF.pop();
}, {
SpriteFrameSet: "SpriteFrameSet"
} ],
LoginPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e904gS4ftLr7UWWl4gQQBq", "LoginPanel");
cc.Class({
extends: cc.Component,
properties: {
btn_login: cc.Node,
btn_register: cc.Node,
btn_go_login: cc.Node,
btn_go_register: cc.Node,
editBox_zhujici: [ cc.EditBox ],
editBox_password: cc.EditBox,
editBox_inviteCode: cc.EditBox,
PanleLogin: cc.Node,
Panle2: cc.Node,
PanleForgetPassword: cc.Node,
editBox_RegisterPassword: cc.EditBox,
editBox_RegisterPassword2: cc.EditBox,
editBox_RegisterinviteCode: cc.EditBox,
editBox_InviteCodeEditBox: cc.EditBox,
editBox_RegisterPassword3: cc.EditBox,
editBox_RegisterPassword4: cc.EditBox,
editBox_VerificationCode: cc.EditBox,
editBox_mail: cc.EditBox,
Register_btn_determine: cc.Node,
Register_btn_ObtainingVerificationCode: cc.Node,
Register_btn_register: cc.Node,
Register_btn_break: cc.Node,
_time: 0
},
onLoad: function() {},
onEnable: function() {
this.editBox_password.string = "";
this.editBox_inviteCode.string = "";
var e = cc.sys.localStorage.getItem("com.game.vdn.token");
if (e && "" != e) {
GameData.token = e;
Global.ResourceMgr.playBgAudio();
Global.PageMgr.onClosePage(0);
Global.ProtocolMgr.queryGonggao(function(e) {
200 == e.code ? cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = e.data.title : Global.PageMgr.showTipPage(e.message);
});
} else {
GameData.audio = !0;
Global.ResourceMgr.playLoginAudio();
this.goLogin();
}
},
start: function() {},
goLogin: function() {
this.PanleLogin.active = !0;
this.Panle2.active = !1;
this.PanleForgetPassword.active = !1;
for (var e = 0; e < this.editBox_zhujici.length; e++) {
this.editBox_zhujici[e].enabled = !0;
this.editBox_zhujici[e].string = "";
}
},
login: function() {
var e = this;
if ("" != this.editBox_password.string && "" != this.editBox_inviteCode.string) {
if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.editBox_inviteCode.string)) {
this.getZhujici();
var t = {
account: this.editBox_inviteCode.string,
password: this.editBox_password.string
};
Global.ProtocolMgr.login(t, function(t) {
if (3001 != t.code) {
GameData.token = t.data.tokenHead + " " + t.data.token;
cc.sys.localStorage.setItem("com.game.vdn.token", GameData.token);
Global.PageMgr.showTipPage(t.message);
Global.ResourceMgr.playBgAudio();
Global.PageMgr.onClosePage(0);
null != cc.find("Canvas/Main/view/mask/label_gonggao") && (cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = res2.data.title);
e.editBox_password.string = "";
e.editBox_inviteCode.string = "";
} else Global.PageMgr.showTipPage(t.message);
});
} else Global.PageMgr.showTipPage("请输入正确的邮箱");
} else "" == this.editBox_inviteCode.string ? Global.PageMgr.showTipPage("邮箱为空") : "" == this.editBox_password.string && Global.PageMgr.showTipPage("密码为空");
},
forgotPassword: function() {
this.PanleLogin.active = !1;
this.Panle2.active = !1;
this.PanleForgetPassword.active = !0;
},
goRegister: function() {
this.PanleLogin.active = !1;
this.Panle2.active = !0;
this.PanleForgetPassword.active = !1;
this.editBox_password.string = "";
this.editBox_inviteCode.string = "";
},
register: function() {
var e = this;
if ("" != this.editBox_RegisterPassword.string && "" != this.editBox_RegisterPassword2.string && "" != this.editBox_RegisterinviteCode.string) if (this.editBox_RegisterPassword2.string == this.editBox_RegisterPassword.string) {
if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.editBox_RegisterinviteCode.string)) {
var t = void 0;
t = "" != this.editBox_InviteCodeEditBox.string ? {
account: this.editBox_RegisterinviteCode.string,
payPassword: this.editBox_RegisterPassword.string,
channelCode: this.editBox_InviteCodeEditBox.string
} : {
account: this.editBox_RegisterinviteCode.string,
payPassword: this.editBox_RegisterPassword.string
};
Global.ProtocolMgr.register(t, function(t) {
if (200 == t.code) {
cc.sys.localStorage.setItem("com.game.vdn.token", t.data.token);
e.editBox_inviteCode.string = e.editBox_RegisterinviteCode.string;
e.editBox_password.string = e.editBox_RegisterPassword.string;
e.login();
Global.ProtocolMgr.queryGonggao(function(t) {
if (200 == t.code) {
console.log(cc.find("Canvas/Main/view/mask/label_gonggao"), t.data.title);
cc.find("Canvas/Main/view/mask/label_gonggao").getComponent(cc.Label).string = t.data.title;
e.setRegisterString();
} else Global.PageMgr.showTipPage(t.message);
});
} else Global.PageMgr.showTipPage(t.message);
});
} else Global.PageMgr.showTipPage("请输入正确的邮箱");
} else Global.PageMgr.showTipPage("密码不一致"); else "" == this.editBox_RegisterinviteCode.string ? Global.PageMgr.showTipPage("邮箱为空") : "" == this.editBox_RegisterPassword.string ? Global.PageMgr.showTipPage("密码为空") : "" == this.editBox_RegisterPassword2.string && Global.PageMgr.showTipPage("确定密码为空");
},
getZhujici: function() {
for (var e = [], t = 0; t < this.editBox_zhujici.length; t++) e.push(this.editBox_zhujici[t].string);
return e.join(",");
},
breakLogin: function() {
this.PanleLogin.active = !0;
this.Panle2.active = !1;
this.PanleForgetPassword.active = !1;
this.setRegisterString();
},
onClickSureModify: function() {
var e = this;
if ("" != this.editBox_RegisterPassword3.string && "" != this.editBox_RegisterPassword4.string && "" != this.editBox_VerificationCode.string && "" != this.editBox_mail.string) if (this.editBox_RegisterPassword3.string == this.editBox_RegisterPassword4.string) {
if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.editBox_mail.string)) {
var t = {
account: this.editBox_mail.string,
authCode: this.editBox_VerificationCode.string,
password: this.editBox_RegisterPassword3.string,
rePassword: this.editBox_RegisterPassword4.string
};
Global.ProtocolMgr.queryForgetPassword(t, function(t) {
if (200 == t.code) {
Global.PageMgr.showTipPage("修改成功");
e.breakLogin();
} else Global.PageMgr.showTipPage(t.message);
});
} else Global.PageMgr.showTipPage("请输入正确的邮箱");
} else Global.PageMgr.showTipPage("密码不一致"); else "" == this.editBox_mail.string ? Global.PageMgr.showTipPage("邮箱为空") : "" == this.editBox_RegisterPassword3.string ? Global.PageMgr.showTipPage("密码为空") : "" == this.editBox_RegisterPassword4.string ? Global.PageMgr.showTipPage("确定密码为空") : "" == this.editBox_VerificationCode.string && Global.PageMgr.showTipPage("验证码为空");
},
onClickObtainingVerificationCode: function() {
if (this._time > 0) Global.PageMgr.showTipPage("请稍后再试"); else if ("" != this.editBox_mail.string) {
if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.editBox_mail.string)) {
this._time = 30;
var e = {
account: this.editBox_mail.string,
verifyType: 1
};
Global.ProtocolMgr.queryGetAuthCode(e, function(e) {
200 == e.code ? Global.PageMgr.showTipPage("获取成功") : Global.PageMgr.showTipPage(e.message);
});
} else Global.PageMgr.showTipPage("请输入正确的邮箱");
} else Global.PageMgr.showTipPage("邮箱不能为空");
},
setRegisterString: function() {
this.editBox_RegisterPassword.string = "";
this.editBox_RegisterPassword2.string = "";
this.editBox_RegisterinviteCode.string = "";
this.editBox_InviteCodeEditBox.string = "";
this.editBox_RegisterPassword3.string = "";
this.editBox_RegisterPassword4.string = "";
this.editBox_VerificationCode.string = "";
this.editBox_mail.string = "";
},
update: function(e) {
this._time > 0 && (this._time -= e);
}
});
cc._RF.pop();
}, {} ],
LuckyDrawItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "978beW/GwNJg5lQeAoZiG01", "LuckyDrawItem");
cc.Class({
extends: cc.Component,
properties: {
icon_touxiang: cc.Sprite,
label_name: cc.Label,
label_lv: cc.Label,
label_lVname: cc.Label,
label_time: cc.Label,
propId: 1
},
start: function() {},
setData: function(e) {
var t = this;
try {
cc.loader.load({
url: e.good_img,
type: "png"
}, function(e, n) {
t.icon_touxiang.spriteFrame = new cc.SpriteFrame(n);
});
} catch (e) {
console.warn(e);
}
this.label_name.string = e.nickname;
this.label_lVname.string = e.good_name;
this.label_lv.string = cc.js.formatStr("%s等奖", e.level);
this.label_time.string = e.create_time;
}
});
cc._RF.pop();
}, {} ],
LuckyDrawPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "25b69IOFlRK4peKZ1MjTpzy", "LuckyDrawPanel");
cc.Class({
extends: cc.Component,
properties: {
luckyDraw_item: cc.Prefab,
container: cc.Node,
Panle: cc.Node,
Panle2: cc.Node,
btn_item: [ cc.Sprite ]
},
onLoad: function() {},
onEnable: function() {
this.getGameList(null, 0);
},
goLuckyDrawUI: function() {
var e = this;
this.container.removeAllChildren();
Global.ProtocolMgr.queryLuckDrawList(100, 1, function(t) {
if (200 == t.code) for (var n = t.data.list, i = 0; i < n.length; i++) {
var a = cc.instantiate(e.luckyDraw_item);
a.getComponent("LuckyDrawItem").setData(n[i]);
e.container.addChild(a);
} else Global.PageMgr.showTipPage(t.message);
});
},
getGameList: function(e, t) {
var n = this;
this.btn_item.forEach(function(e) {
e.spriteFrame = null;
});
cc.loader.loadRes("imgs/按钮bg2", cc.SpriteFrame, function(e, i) {
e || (n.btn_item[parseInt(t)].spriteFrame = i);
});
switch (parseInt(t)) {
case 0:
this.onClickBeganTheDetail(null, 1);
break;

case 1:
this.onClickBeganTheDetail(null, 0);
this.goLuckyDrawUI();
}
},
onClickBeganToDraw: function() {
Global.PageMgr.showTipPage("每周六下午5点,官方统一抽奖", 20);
},
onClickBeganTheDetail: function(e, t) {
var n = parseInt(t);
this.Panle.active = n > 0;
this.Panle2.active = n <= 0;
0 == n && this.goLuckyDrawUI();
}
});
cc._RF.pop();
}, {} ],
MaiRu: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d33ba8XXW1BoYduJmqrN0KD", "MaiRu");
cc.Class({
extends: cc.Component,
properties: {
List: {
type: cc.Node,
default: []
},
Item0: {
type: cc.Prefab,
default: null
},
Item1: {
type: cc.Prefab,
default: null
}
},
Toggle: function(e) {
this.List.forEach(function(e) {
e.active = !1;
});
this.List[parseInt(e.node.name)].active = !0;
},
UpdateList0: function() {
var e = this;
[].forEach(function(t) {
cc.instantiate(e.Item0).parent = e.List[0];
});
},
UpdateList1: function() {
var e = this;
[].forEach(function(t) {
cc.instantiate(e.Item1).parent = e.List[1];
});
},
start: function() {}
});
cc._RF.pop();
}, {} ],
MainPage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f6b98h9dcJB5JXE14uqzs1C", "MainPage");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
OnOpenPage: function(e, t) {
Global.PageMgr.onOpenPage(t);
},
OnOpenPage2: function(e, t) {
Global.PageMgr.onOpenPage(t, 1);
},
openTipsPanel: function(e, t) {
var n = t.split("-");
Global.PageMgr.pages[4].getComponent("NFTPanel").setTitle(n[0], n[1]);
Global.PageMgr.onOpenPage(4);
},
showTips: function(e, t) {
Global.PageMgr.showTipPage(t);
},
start: function() {},
OpenTradingFloor: function() {},
OpenShoppingCenter: function() {}
});
cc._RF.pop();
}, {} ],
Main: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bade2KCgp5J+5NoNiE5+UPt", "Main");
cc.Class({
extends: cc.Component,
properties: {
content: cc.Node,
MainPage: cc.Prefab,
toggles: cc.Node
},
onLoad: function() {},
OnOpenPage: function(e, t) {
Global.PageMgr.onOpenPage(t);
},
start: function() {
if (void 0 != Global.ResourceMgr) ; else {
Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
Global.PageMgr.state = 1;
Global.PageMgr.onOpenPage(0);
}
cc.instantiate(this.MainPage).parent = this.content;
},
toggleChange: function(e) {
if (e.isChecked) {
GameData.audio = !0;
Global.ResourceMgr.playBgAudio();
e.target.getComponent(cc.Sprite).enabled = !1;
} else {
GameData.audio = !1;
cc.audioEngine.pauseAll();
e.target.getComponent(cc.Sprite).enabled = !0;
}
},
fanHui: function() {
cc.find("Canvas/Main/FanHui").active = !1;
Global.ProtocolMgr.queryNongChangUserData();
},
filterClick: function() {
console.log("点击过滤");
},
tabLanguager: function() {
if ("zh" == GameData.curLanguage) {
GameData.curLanguage = "en";
i18n.init("en");
i18n.updateSceneRenderers();
} else {
GameData.curLanguage = "zh";
i18n.init("zh");
i18n.updateSceneRenderers();
}
},
logOut: function() {
cc.sys.localStorage.removeItem("com.game.vdn.token");
Global.PageMgr.closeAllPages();
Global.PageMgr.onOpenPage(0);
},
onClickSubmitLogout: function() {
Global.ProtocolMgr.querySubmitLogout({}, function(e) {
200 == e.code && Global.PageMgr.onOpenPage(21);
});
}
});
cc._RF.pop();
}, {} ],
MairChu: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ba3cceuuwRDAY1yBe7O4+qW", "MairChu");
cc.Class({
extends: cc.Component,
properties: {
List: {
type: cc.Node,
default: []
},
Item0: {
type: cc.Prefab,
default: null
},
Item1: {
type: cc.Prefab,
default: null
}
},
Toggle: function(e) {
this.List.forEach(function(e) {
e.active = !1;
});
this.List[parseInt(e.node.name)].active = !0;
},
UpdateList0: function() {
var e = this;
[].forEach(function(t) {
cc.instantiate(e.Item0).parent = e.List[0];
});
},
UpdateList1: function() {
var e = this;
[].forEach(function(t) {
cc.instantiate(e.Item1).parent = e.List[1];
});
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Manor: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee423B2jwtB/J4qAIkc9WJ9", "Manor");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
goNongChang: function() {
Global.gameName = "NongChang";
cc.view.enableAutoFullScreen(!0);
Global.ResourceMgr.playTransitionIn();
cc.director.loadScene("NongChang", function() {});
},
goYuTang: function() {
Global.gameName = "YuTang";
cc.view.enableAutoFullScreen(!0);
Global.ResourceMgr.playTransitionIn();
cc.director.loadScene("YuTang", function() {});
},
closePage: function() {
Global.PageMgr.onClosePage(7);
}
});
cc._RF.pop();
}, {} ],
Md5: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "df9553a0RtFNZ/mf3UeoRp9", "Md5");
var i = 0, a = "", o = 8;
function r(e) {
return _(c(m(e), e.length * o));
}
function c(e, t) {
e[t >> 5] |= 128 << t % 32;
e[14 + (t + 64 >>> 9 << 4)] = t;
for (var n = 1732584193, i = -271733879, a = -1732584194, o = 271733878, r = 0; r < e.length; r += 16) {
var c = n, s = i, g = a, p = o;
i = h(i = h(i = h(i = h(i = d(i = d(i = d(i = d(i = u(i = u(i = u(i = u(i = l(i = l(i = l(i = l(i, a = l(a, o = l(o, n = l(n, i, a, o, e[r + 0], 7, -680876936), i, a, e[r + 1], 12, -389564586), n, i, e[r + 2], 17, 606105819), o, n, e[r + 3], 22, -1044525330), a = l(a, o = l(o, n = l(n, i, a, o, e[r + 4], 7, -176418897), i, a, e[r + 5], 12, 1200080426), n, i, e[r + 6], 17, -1473231341), o, n, e[r + 7], 22, -45705983), a = l(a, o = l(o, n = l(n, i, a, o, e[r + 8], 7, 1770035416), i, a, e[r + 9], 12, -1958414417), n, i, e[r + 10], 17, -42063), o, n, e[r + 11], 22, -1990404162), a = l(a, o = l(o, n = l(n, i, a, o, e[r + 12], 7, 1804603682), i, a, e[r + 13], 12, -40341101), n, i, e[r + 14], 17, -1502002290), o, n, e[r + 15], 22, 1236535329), a = u(a, o = u(o, n = u(n, i, a, o, e[r + 1], 5, -165796510), i, a, e[r + 6], 9, -1069501632), n, i, e[r + 11], 14, 643717713), o, n, e[r + 0], 20, -373897302), a = u(a, o = u(o, n = u(n, i, a, o, e[r + 5], 5, -701558691), i, a, e[r + 10], 9, 38016083), n, i, e[r + 15], 14, -660478335), o, n, e[r + 4], 20, -405537848), a = u(a, o = u(o, n = u(n, i, a, o, e[r + 9], 5, 568446438), i, a, e[r + 14], 9, -1019803690), n, i, e[r + 3], 14, -187363961), o, n, e[r + 8], 20, 1163531501), a = u(a, o = u(o, n = u(n, i, a, o, e[r + 13], 5, -1444681467), i, a, e[r + 2], 9, -51403784), n, i, e[r + 7], 14, 1735328473), o, n, e[r + 12], 20, -1926607734), a = d(a, o = d(o, n = d(n, i, a, o, e[r + 5], 4, -378558), i, a, e[r + 8], 11, -2022574463), n, i, e[r + 11], 16, 1839030562), o, n, e[r + 14], 23, -35309556), a = d(a, o = d(o, n = d(n, i, a, o, e[r + 1], 4, -1530992060), i, a, e[r + 4], 11, 1272893353), n, i, e[r + 7], 16, -155497632), o, n, e[r + 10], 23, -1094730640), a = d(a, o = d(o, n = d(n, i, a, o, e[r + 13], 4, 681279174), i, a, e[r + 0], 11, -358537222), n, i, e[r + 3], 16, -722521979), o, n, e[r + 6], 23, 76029189), a = d(a, o = d(o, n = d(n, i, a, o, e[r + 9], 4, -640364487), i, a, e[r + 12], 11, -421815835), n, i, e[r + 15], 16, 530742520), o, n, e[r + 2], 23, -995338651), a = h(a, o = h(o, n = h(n, i, a, o, e[r + 0], 6, -198630844), i, a, e[r + 7], 10, 1126891415), n, i, e[r + 14], 15, -1416354905), o, n, e[r + 5], 21, -57434055), a = h(a, o = h(o, n = h(n, i, a, o, e[r + 12], 6, 1700485571), i, a, e[r + 3], 10, -1894986606), n, i, e[r + 10], 15, -1051523), o, n, e[r + 1], 21, -2054922799), a = h(a, o = h(o, n = h(n, i, a, o, e[r + 8], 6, 1873313359), i, a, e[r + 15], 10, -30611744), n, i, e[r + 6], 15, -1560198380), o, n, e[r + 13], 21, 1309151649), a = h(a, o = h(o, n = h(n, i, a, o, e[r + 4], 6, -145523070), i, a, e[r + 11], 10, -1120210379), n, i, e[r + 2], 15, 718787259), o, n, e[r + 9], 21, -343485551);
n = f(n, c);
i = f(i, s);
a = f(a, g);
o = f(o, p);
}
return Array(n, i, a, o);
}
function s(e, t, n, i, a, o) {
return f(p(f(f(t, e), f(i, o)), a), n);
}
function l(e, t, n, i, a, o, r) {
return s(t & n | ~t & i, e, t, a, o, r);
}
function u(e, t, n, i, a, o, r) {
return s(t & i | n & ~i, e, t, a, o, r);
}
function d(e, t, n, i, a, o, r) {
return s(t ^ n ^ i, e, t, a, o, r);
}
function h(e, t, n, i, a, o, r) {
return s(n ^ (t | ~i), e, t, a, o, r);
}
function g(e, t) {
var n = m(e);
n.length > 16 && (n = c(n, e.length * o));
for (var i = Array(16), a = Array(16), r = 0; r < 16; r++) {
i[r] = 909522486 ^ n[r];
a[r] = 1549556828 ^ n[r];
}
var s = c(i.concat(m(t)), 512 + t.length * o);
return c(a.concat(s), 640);
}
function f(e, t) {
var n = (65535 & e) + (65535 & t);
return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
}
function p(e, t) {
return e << t | e >>> 32 - t;
}
function m(e) {
for (var t = Array(), n = (1 << o) - 1, i = 0; i < e.length * o; i += o) t[i >> 5] |= (e.charCodeAt(i / o) & n) << i % 32;
return t;
}
function b(e) {
for (var t = "", n = (1 << o) - 1, i = 0; i < 32 * e.length; i += o) t += String.fromCharCode(e[i >> 5] >>> i % 32 & n);
return t;
}
function _(e) {
for (var t = i ? "0123456789ABCDEF" : "0123456789abcdef", n = "", a = 0; a < 4 * e.length; a++) n += t.charAt(e[a >> 2] >> a % 4 * 8 + 4 & 15) + t.charAt(e[a >> 2] >> a % 4 * 8 & 15);
return n;
}
function y(e) {
for (var t = "", n = 0; n < 4 * e.length; n += 3) for (var i = (e[n >> 2] >> n % 4 * 8 & 255) << 16 | (e[n + 1 >> 2] >> (n + 1) % 4 * 8 & 255) << 8 | e[n + 2 >> 2] >> (n + 2) % 4 * 8 & 255, o = 0; o < 4; o++) 8 * n + 6 * o > 32 * e.length ? t += a : t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i >> 6 * (3 - o) & 63);
return t;
}
t.exports = {
md5_hex: r,
md5_b64: function(e) {
return y(c(m(e), e.length * o));
},
md5_str: function(e) {
return b(c(m(e), e.length * o));
},
md5_hex_hmac: function(e, t) {
return _(g(e, t));
},
md5_b64_hmac: function(e, t) {
return y(g(e, t));
},
md5_str_hmac: function(e, t) {
return b(g(e, t));
}
};
cc._RF.pop();
}, {} ],
MenuCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "aa1f3dmR0RGu5Tm+f9kUfen", "MenuCtrl");
cc.Class({
extends: cc.Component,
properties: {
editBox: cc.EditBox,
inputLayer: cc.Node,
rule: cc.Node
},
onLoad: function() {
this.inputLayer.active = !1;
},
showRule: function() {
this.rule.active = !0;
},
hideRule: function() {
this.rule.active = !1;
},
start: function() {
GlobalNiuNiu.connectState || GlobalNiuNiu.netProxy.connect();
},
onBtnOpenRoom: function() {
GlobalNiuNiu.netProxy.createRoom(function(e) {
GlobalNiuNiu.gameMgr.onOpenRoom(e);
});
},
onBtnEnterRoom: function() {
this.inputLayer.active = !1;
var e = parseInt(this.editBox.string);
cc.log("join rid:" + e);
GlobalNiuNiu.netProxy.enterRoom(e, function(e) {
GlobalNiuNiu.gameMgr.onEnterRoom(e);
});
},
quitGame: function() {
cc.director.loadScene("Dssc", function() {
console.log("切换场景");
});
},
onBtnInput: function() {
this.inputLayer.active = !0;
}
});
cc._RF.pop();
}, {} ],
MineDoor: [ function(require, module, exports) {
"use strict";
cc._RF.push(module, "e3506uOEnRJwrWs/MZa1Mhh", "MineDoor");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
duration: 0,
mineDoor: cc.Node,
treasureBox: cc.Prefab,
gold: cc.Prefab,
tip: cc.Prefab
},
onLoad: function onLoad() {
var _this = this;
cc.sys.localStorage.clear("getEGold");
setTimeout(function() {
Global.ProtocolMgr.queryMillOutput(function(data) {
var res = eval(data.data.canAccept);
if (null == cc.sys.localStorage.getItem("getEGold") && res) {
var tip = cc.instantiate(_this.tip);
tip.parent = _this.node.parent;
tip.getComponent("Tip").setItem("获得E金币");
tip.x = _this.node.x;
tip.y = _this.node.y;
}
});
}, 400);
this.isOpen = !1;
this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
var _this2 = this;
Global.ProtocolMgr.queryMillOutput(function(data) {
var res = eval(data.data.canAccept);
if (res && !_this2.isOpen) {
null == cc.sys.localStorage.getItem("getEGold") && cc.sys.localStorage.setItem("getEGold", 1);
_this2.isOpen = !0;
var jumpDown = cc.moveBy(_this2.duration, cc.v2(0, _this2.jumpHeight)).easing(cc.easeCubicActionOut());
_this2.mineDoor.runAction(jumpDown);
var treasureBox = cc.instantiate(_this2.treasureBox);
treasureBox.parent = _this2.node.parent;
treasureBox.x = 187;
treasureBox.y = -220;
setTimeout(function() {
Global.ProtocolMgr.addEgold();
var e = cc.repeat(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(1, cc.v2(0, -20))), 10);
treasureBox.runAction(e);
var t = 0, n = setInterval(function() {
t >= 20 && clearInterval(n);
var e = cc.instantiate(_this2.gold);
e.x = treasureBox.x;
e.y = treasureBox.y;
e.parent = _this2.node.parent;
var i = 0 == dataFunc.randomNum(0, 1) ? 1 : -1;
e.getComponent("Gold").launch(i);
t++;
}, 20);
}, 500);
setTimeout(function() {
console.log("获得金币");
var e = cc.sequence(cc.fadeOut(1), cc.callFunc(_this2.closeTreasureBox, _this2, treasureBox));
treasureBox.runAction(e);
var t = cc.sequence(cc.moveBy(_this2.duration, cc.v2(0, -_this2.jumpHeight)).easing(cc.easeCubicActionIn()), cc.callFunc(_this2.closeFinish, _this2));
_this2.mineDoor.runAction(t);
}, 4e3);
}
});
}, this);
},
closeTreasureBox: function(e) {
e.destroy();
},
closeFinish: function() {
this.isOpen = !1;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
ModeSelViewCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5f6daLTj1BN6aVCsw2Py+En", "ModeSelViewCtrl");
var i = e("./../common/ViewBase");
cc.Class({
extends: i,
properties: {},
start: function() {
this._tmpMode = 3;
},
onToggleSelect: function(e, t) {
cc.log(t);
this._tmpMode = parseInt(t);
},
onBtnOk: function() {
GlobalNiuNiu.config.GAME_MODE = this._tmpMode;
GlobalNiuNiu.loadScene("Room");
}
}).show = function() {
GlobalNiuNiu.viewMgr.pushView(cc.instantiate(GlobalNiuNiu.assetMgr.modeSelPre));
};
cc._RF.pop();
}, {
"./../common/ViewBase": "ViewBase"
} ],
NFTPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "befebRmDzlP+r4iKqEHDFnq", "NFTPanel");
cc.Class({
extends: cc.Component,
properties: {
label_title: cc.Label,
label_content: cc.Label
},
start: function() {},
onEnable: function() {},
setTitle: function(e, t) {
this.label_title.string = e;
this.label_content.string = cc.js.formatStr("%s暂未开通服务,程序员小哥哥正开启“秃头模式”努力开发中,先去其他房间看看吧，敬请期待哦！", t);
},
close: function() {
Global.PageMgr.onClosePage(4);
}
});
cc._RF.pop();
}, {} ],
NFT_item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "195a0kjzgFNW6tRsqgbtLT2", "NFT_item");
cc.Class({
extends: cc.Component,
properties: {
icon_pic: cc.Sprite,
label_name: cc.Label,
label_prop1: cc.Label,
label_prop2: cc.Label,
label_prop3: cc.Label,
label_fee: cc.Label,
propId: 1
},
start: function() {},
setData: function(e, t) {
var n = this;
try {
cc.loader.load({
url: e.icon,
type: "png"
}, function(e, t) {
n.icon_pic.spriteFrame = new cc.SpriteFrame(t);
});
} catch (e) {
console.warn(e);
}
this.label_name.string = e.name;
if (null == t) {
this.propId = e.id;
this.label_prop1.string = cc.js.formatStr("战力:%s", e.fightingPower);
this.label_prop2.string = cc.js.formatStr("体力:%s", e.physicalPower);
this.label_prop3.string = cc.js.formatStr("灵力:%s", e.wakanPower);
this.label_fee.string = cc.js.formatStr("%s", parseFloat(e.price).toFixed(4));
} else {
this.propId = e.id;
this.label_prop1.string = cc.js.formatStr("战力:%s", parseFloat(e.combat_value).toFixed(4));
this.label_prop2.string = cc.js.formatStr("体力:%s", parseFloat(e.spirit_value).toFixed(4));
this.label_prop3.string = cc.js.formatStr("灵力:%s", parseFloat(e.intellect_value).toFixed(4));
}
},
buy: function() {
var e = {
id: this.propId
};
Global.ProtocolMgr.queryBuyPetAnimal(e, function(e) {
200 == e.code ? Global.PageMgr.showTipPage("购买成功") : Global.PageMgr.showTipPage(e.message);
});
}
});
cc._RF.pop();
}, {} ],
NetProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5c22dewAxJE+aRwAPMkEflJ", "NetProxy");
var i = e("./GameNetwork"), a = e("./GameProtocols"), o = e("./../../Common/DataMgr").getInstance().playerObj, r = cc.Class({
ctor: function() {
this.network = null;
this._cachePushCallback = [];
},
init: function() {
this.network = new i();
this.network.setDelegate(this);
this.initPushCallback();
},
connect: function() {
this.network.connect("ws://8.210.235.222:3005/ws");
},
closeConnect: function() {
this.network.closeConnect();
},
isNetworkOpened: function() {
return this.network.isSocketOpened();
},
isNetworkClosed: function() {
return this.network.isSocketClosed();
},
onNetworkOpen: function() {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_NETWORK_OPENED);
},
onNetworkClose: function() {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_NETWORK_CLOSED);
},
initPushCallback: function() {
var e = this, t = function(t) {
e.pushCallback(t);
};
this.network.registerPushResponseCallback("chat", t);
this.network.registerPushResponseCallback("exitRoom", t);
this.network.registerPushResponseCallback("playChess", t);
},
registerPush: function(e, t, n) {
t && n && (t = t.bind(n));
this.network.registerPushResponseCallback(e, function(e) {
t && t(e);
GlobalNiuNiu.eventMgr.emit(e.act, e);
});
},
offPush: function(e, t) {
this.network.offCallback(e, t);
},
dealCachePush: function() {},
beatHeart: function(e) {
var t = new a.HeartRequest();
t.t = Date.now();
this.network.sendRequest(t, e);
},
chat: function(e) {
var t = new a.ChatRequest(), n = o.uid;
t.uid = n;
t.msg = e;
this.network.sendRequest(t);
},
createRoom: function(e) {
var t = new a.CreateRoomRequest();
t.uid = o.uid;
this.network.sendRequest(t, e);
},
enterRoom: function(e, t) {
var n = new a.EnterRoomRequest();
n.rid = e;
n.uid = o.uid;
this.network.sendRequest(n, t);
},
quitRoom: function(e, t) {
var n = new a.QuitRoomRequest();
n.rid = e;
n.uid = o.uid;
this.network.sendRequest(n, t);
},
startGame: function() {
var e = new a.StartGameRequest();
e.uid = o.uid;
this.network.sendRequest(e);
},
ready: function(e) {
var t = new a.ReadyRequest();
t.uid = o.uid;
this.network.sendRequest(t, e);
},
config: function() {
console.log(1);
var e = new a.ConfigRequest();
this.network.sendRequest(e);
},
kick: function() {
var e = new a.KickRequest();
e.uid = o.uid;
this.network.sendRequest(e);
},
payBet: function(e) {
var t = new a.BetRequest();
t.uid = o.uid;
t.bet = e;
this.network.sendRequest(t);
},
GetQueryVariable: function(e) {
for (var t = window.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
var i = t[n].split("=");
if (i[0] == e) return i[1];
}
return !1;
},
login: function(e, t) {
var n = new a.LoginRequest();
t && (n.token = t);
n.origin = e;
n.os = cc.sys.os;
n.osVersion = cc.sys.osVersion;
o.uid = this.GetQueryVariable("token");
var i = o.uid;
n.uid = i;
this.network.sendRequest(n, function(e) {
0 == e.err ? GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_LOGIN_SUC, e) : GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_LOGIN_FAILED, e);
});
},
logout: function() {},
bindFacebook: function(e) {},
getRank: function(e) {},
pushCallback: function(e) {
switch (e.act) {
case "friendInfoSync":
this.pushFriendSendTakeSp(e);
break;

case "playChess":
this.pushPlayChess(e);
break;

case "chat":
this.pushChat(e);
break;

case "exitRoom":
this.pushExitRoom(e);
}
},
pushFriendSendTakeSp: function(e) {},
pushChat: function(e) {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_CHAT, e);
},
pushExitRoom: function(e) {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_EXITROOM, e);
},
pushPlayChess: function(e) {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_PLAYCHESS, e);
},
debug_addCoins: function(e) {
var t = new a.DebugChangeMeRequest();
t.cmd = "btnAddCoins" === e ? "player coins add 100000000" : "btnClearCoins" === e ? "player coins 0" : "btnAddEnergy" === e ? "player sp add 10" : "btnClearEnergy" === e ? "player sp 0" : "btnAddWp" == e ? "player wp add 10" : "btnClearWp" == e ? "player wp 0" : "btnUnwrap" == e ? "player fbuid null" : "btnWizard1" == e ? "player wizard1 0" : "btnWizard2" == e ? "player wizard2 0" : "btnClearShield" == e ? "player shield 0" : "btnSpEc" == e ? "SpEc stepInterval 60000" : "btnFarmEc" == e ? "FarmEc stepInterval 60000" : "btnSpEcBack" == e ? "SpEc stepInterval 3600000" : "btnFarmBack" == e ? "FarmEc stepInterval 86400000" : "btnUpdateBuild" == e ? "Building lv 5" : e;
}
});
t.exports = r;
cc._RF.pop();
}, {
"./../../Common/DataMgr": "DataMgr",
"./GameNetwork": "GameNetwork",
"./GameProtocols": "GameProtocols"
} ],
NongChangPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "30affePXo9CMLtBP0cT06lG", "NongChangPanel");
cc.Class({
extends: cc.Component,
properties: {
content: cc.Node,
item: cc.Prefab,
ToggleContainer: [ cc.Node ],
SubPanel: [ cc.Node ]
},
onLoad: function() {
var e = this;
cc.director.GlobalEvent.on("ZhongZiData", this.onUpdateZhongZiData, this);
cc.director.GlobalEvent.on("GuoShiData", this.onUpdateGuoShiData, this);
cc.director.GlobalEvent.on("ShangChengData", this.onUpdateShangChengData, this);
this.currentCount = 0;
this.maxCount = 999;
this.ToggleContainer.forEach(function(t) {
t.on(cc.Node.EventType.TOUCH_END, function() {
e.toggleChange(t.name);
});
});
},
onDestroy: function() {
cc.director.GlobalEvent.off("ZhongZiData");
cc.director.GlobalEvent.off("GuoShiData");
cc.director.GlobalEvent.off("ShangChengData");
},
start: function() {},
onUpdateZhongZiData: function() {
var e = this;
this.content.children.forEach(function(e) {
e.destroy();
});
var t = "zhongzi";
GameData.ZhongZiData.forEach(function(n) {
var i = cc.instantiate(e.item);
i.parent = e.content;
var a = n.id + "";
cc.loader.loadRes("NongChang/" + dataFunc.queryValue(t, "picture", a), function(e, t) {
if (e) console.error(e); else {
var n = new cc.SpriteFrame(t);
i.getChildByName("Bg").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = n;
}
});
i.getChildByName("Bg").getChildByName("Count").getComponent(cc.Label).string = n.count;
i.getChildByName("Name").getComponent(cc.Label).string = dataFunc.queryValue(t, "name", a) + "种子";
i.getChildByName("Reward").getComponent(cc.Label).string = "收获" + dataFunc.queryValue(t, "reward", a) + "个" + dataFunc.queryValue(t, "name", a);
i.getChildByName("Price").active = !0;
i.getChildByName("Price").getComponent(cc.Label).string = "价格" + dataFunc.queryValue(t, "price", a);
});
this.node.getChildByName("Sale").active = !1;
},
onUpdateGuoShiData: function() {
var e = this;
this.content.children.forEach(function(e) {
e.destroy();
});
GameData.GuoShiData.forEach(function(t) {
var n = cc.instantiate(e.item);
n.parent = e.content;
var i = t.id + "";
cc.loader.loadRes("NongChang/" + dataFunc.queryValue("zhongzi", "picture", i), function(e, t) {
if (e) console.error(e); else {
var i = new cc.SpriteFrame(t);
n.getChildByName("Bg").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = i;
}
});
n.getChildByName("Bg").getChildByName("Count").getComponent(cc.Label).string = t.count;
n.getChildByName("Name").getComponent(cc.Label).string = dataFunc.queryValue("zhongzi", "name", i);
n.getChildByName("Reward").getComponent(cc.Label).string = "收获" + dataFunc.queryValue("zhongzi", "reward", i) + "个" + dataFunc.queryValue("zhongzi", "name", i);
});
this.node.getChildByName("Sale").active = !0;
cc.director.GlobalEvent.emit("TotalReward", {});
},
onUpdateShangChengData: function() {
var e = this;
this.content.children.forEach(function(e) {
e.destroy();
});
var t = "zhongzi";
GameData.ShangChengData.forEach(function(n) {
var i = cc.instantiate(e.item);
i.parent = e.content;
var a = n.id + "";
cc.loader.loadRes("NongChang/" + dataFunc.queryValue(t, "picture", a), function(n, o) {
if (n) console.error(n); else {
var r = new cc.SpriteFrame(o);
i.getChildByName("Bg").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = r;
i.getChildByName("Buy").off(cc.Node.EventType.TOUCH_END);
i.getChildByName("Buy").on(cc.Node.EventType.TOUCH_END, function() {
e.SubPanel[0].active = !0;
e.currentCount = 1;
cc.director.GlobalEvent.on("ShangChengCount", function() {
e.SubPanel[0].getChildByName("Count").getComponent(cc.EditBox).string = e.currentCount;
}, e);
e.maxCount = 999;
cc.director.GlobalEvent.emit("ShangChengCount", {});
e.SubPanel[0].getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = r;
e.SubPanel[0].getChildByName("Title").getComponent(cc.Label).string = dataFunc.queryValue(t, "name", a);
e.SubPanel[0].getChildByName("Price").getComponent(cc.Label).string = "每个果实价值：" + dataFunc.queryValue(t, "reward", a);
e.SubPanel[0].getChildByName("Reward").getComponent(cc.Label).string = "每个果实价值：" + dataFunc.queryValue(t, "reward", a);
e.SubPanel[0].getChildByName("Time").getComponent(cc.Label).string = "成熟时间：" + dataFunc.getMyDate(dataFunc.queryValue(t, "time", a));
e.SubPanel[0].getChildByName("Period").getComponent(cc.Label).string = dataFunc.queryValue(t, "quarter", a) + "季," + dataFunc.queryValue(t, "output", a) + "/季";
e.SubPanel[0].getChildByName("MaiRu").off(cc.Node.EventType.TOUCH_END);
e.SubPanel[0].getChildByName("MaiRu").on(cc.Node.EventType.TOUCH_END, function() {
Global.ProtocolMgr.buyZhongZi(a, e.currentCount);
});
});
}
});
i.getChildByName("Bg").getChildByName("Count").getComponent(cc.Label).string = n.count;
i.getChildByName("Name").getComponent(cc.Label).string = dataFunc.queryValue(t, "name", a) + "种子";
i.getChildByName("Reward").getComponent(cc.Label).string = "收获" + dataFunc.queryValue(t, "reward", a) + "个" + dataFunc.queryValue(t, "name", a);
i.getChildByName("Buy").active = !0;
i.getChildByName("Buy").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = dataFunc.queryValue(t, "price", a);
});
this.node.getChildByName("Sale").active = !1;
},
addCount: function() {
if (this.currentCount < this.maxCount) {
this.currentCount++;
cc.director.GlobalEvent.emit("ShangChengCount", {});
cc.director.GlobalEvent.emit("GuoShiCount", {});
} else Global.PageMgr.showTipPage("已达到最大值");
},
minusCount: function() {
if (this.currentCount > 1) {
this.currentCount--;
cc.director.GlobalEvent.emit("ShangChengCount", {});
cc.director.GlobalEvent.emit("GuoShiCount", {});
} else Global.PageMgr.showTipPage("已达到最小值");
},
changeCount: function(e) {
this.currentCount = e;
this.currentCount >= this.maxCount && (this.currentCount = this.maxCount);
this.currentCount <= 1 && (this.currentCount = 1);
cc.director.GlobalEvent.emit("ShangChengCount", {});
cc.director.GlobalEvent.emit("GuoShiCount", {});
},
onEnable: function() {
Global.ProtocolMgr.queryZhongZi();
},
onDisable: function() {
this.ToggleContainer[0].getComponent(cc.Toggle).isChecked = !0;
this.ToggleContainer[0].getChildByName("Text").color = new cc.color(255, 255, 255);
},
closePage: function() {
Global.PageMgr.onClosePage(1);
},
openSubPanel: function(e, t) {
this.SubPanel[t].active = !0;
},
closeSubPanel: function(e, t) {
this.SubPanel[t].active = !1;
cc.director.GlobalEvent.off("ShangChengCount");
},
toggleChange: function(e) {
this.ToggleContainer.forEach(function(t) {
t.getComponent(cc.Toggle).isChecked = !1;
t.getChildByName("Text").color = new cc.color(255, 255, 255);
if (t.name == e) {
t.getComponent(cc.Toggle).isChecked = !0;
t.getChildByName("Text").color = new cc.color(138, 55, 249);
}
});
switch (e) {
case "ZhongZi":
Global.ProtocolMgr.queryZhongZi();
break;

case "GuoShi":
Global.ProtocolMgr.queryGuoShi();
console.log("打开果实");
break;

case "ShangCheng":
Global.ProtocolMgr.queryShangCheng();
console.log("打开商店");
}
},
update: function(e) {}
});
cc._RF.pop();
}, {} ],
NongChang: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3031dvXoiJPCpmW3C2+1ZWo", "NongChang");
cc.Class({
extends: cc.Component,
properties: {
NongChang: [ cc.Node ],
TuDi: [ cc.Node ],
NongChangDesc: cc.Node,
NongChangCount: 6
},
onLoad: function() {
cc.director.GlobalEvent.on("NongChangUserData", this.onNongChangUserData, this);
cc.director.GlobalEvent.on("FriendNongChangUserData", this.onFriendNongChangUserData, this);
dataFunc.loadConfigs(!1, function() {});
},
start: function() {},
onDestroy: function() {
cc.director.GlobalEvent.off("NongChangUserData");
cc.director.GlobalEvent.off("FriendNongChangUserData");
},
onNongChangUserData: function() {
for (var e = this, t = GameData.NongChangUserData, n = function(n) {
if (void 0 != t[n] && null != t[n]) {
var i = t[n].id + "";
e.NongChang[n].getComponent(cc.Sprite).enabled = !0;
cc.loader.loadRes("NongChang/" + dataFunc.queryValue("zhongzi", "name", i) + t[n].period, function(i, a) {
if (i) console.error(i); else {
var o = new cc.SpriteFrame(a);
e.NongChang[n].getComponent(cc.Sprite).spriteFrame = o;
if (3 == t[n].period) {
try {
e.NongChang[n].getChildByName("Tip").destroy();
} catch (e) {}
var r = cc.instantiate(Global.ResourceMgr.tip);
r.parent = e.NongChang[n];
r.getComponent("Tip").setItem("收获");
r.x = 0;
r.y = 33;
}
}
});
e.NongChang[n].off(cc.Node.EventType.TOUCH_END);
e.NongChang[n].on(cc.Node.EventType.TOUCH_END, function() {
if (t[n]) {
var i = t[n].id + "";
e.clearPage();
e.NongChangDesc.active = !0;
e.NongChangDesc.x = e.NongChang[n].x;
e.NongChangDesc.y = e.NongChang[n].y;
e.NongChangDesc.getChildByName("name").getComponent(cc.Label).string = dataFunc.queryValue("zhongzi", "name", i);
var a = t[n].time, o = dataFunc.queryValue("zhongzi", "time", i);
e.NongChangDesc.getChildByName("period").getComponent(cc.Label).string = dataFunc.getMyDate(a);
e.NongChangDesc.getChildByName("process").getComponent(cc.Sprite).fillRange = (o - a) / o;
3 != t[n].period || Global.ProtocolMgr.shouHuoNongZuoWu(n, function(t) {
if (t) {
e.NongChang[n].getChildByName("Tip").destroy();
cc.loader.loadRes("NongChang/" + dataFunc.queryValue("zhongzi", "name", i) + "4", function(t, i) {
if (t) console.error(t); else {
var a = new cc.SpriteFrame(i);
e.NongChang[n].getComponent(cc.Sprite).spriteFrame = a;
}
});
e.shouhuoAnim(e.NongChang[n], function() {
e.NongChang[n].y -= 50;
e.NongChang[n].getComponent(cc.Sprite).spriteFrame = null;
cc.director.GlobalEvent.emit("NongChangUserData", {});
});
} else Global.PageMgr.showTipPage("收获失败");
});
}
});
} else {
try {
e.NongChang[n].getChildByName("Tip").destroy();
} catch (e) {
console.log("空土地");
}
e.NongChang[n].off(cc.Node.EventType.TOUCH_END);
e.NongChang[n].on(cc.Node.EventType.TOUCH_END, function() {
console.log(GameData.ZhongZhiReady.state);
if (GameData.ZhongZhiReady.state) Global.ProtocolMgr.zhongZhi(GameData.ZhongZhiReady.id, n); else {
e.clearPage();
GameData.ZhongZhiReady.pos = n;
Global.PageMgr.onOpenPage(2);
}
});
}
}, i = 0; i < t.length; i++) n(i);
},
onFriendNongChangUserData: function() {
for (var e = this, t = GameData.FriendNongChangUserData, n = function(n) {
if (void 0 != t[n] && null != t[n]) {
var i = t[n].id + "";
cc.loader.loadRes("NongChang/" + dataFunc.queryValue("zhongzi", "name", i) + t[n].period, function(i, a) {
if (i) console.error(i); else {
var o = new cc.SpriteFrame(a);
e.NongChang[n].getComponent(cc.Sprite).spriteFrame = o;
if (3 == t[n].period) {
try {
e.NongChang[n].getChildByName("Tip").destroy();
} catch (e) {}
var r = cc.instantiate(Global.ResourceMgr.tip);
r.parent = e.NongChang[n];
r.getComponent("Tip").setItem("偷取");
r.x = 0;
r.y = 33;
}
}
});
e.NongChang[n].off(cc.Node.EventType.TOUCH_END);
e.NongChang[n].on(cc.Node.EventType.TOUCH_END, function() {
var i = t[n].id + "";
e.clearPage();
e.NongChangDesc.active = !0;
e.NongChangDesc.x = e.NongChang[n].x;
e.NongChangDesc.y = e.NongChang[n].y;
e.NongChangDesc.getChildByName("name").getComponent(cc.Label).string = dataFunc.queryValue("zhongzi", "name", i);
var a = t[n].time, o = dataFunc.queryValue("zhongzi", "time", i);
e.NongChangDesc.getChildByName("period").getComponent(cc.Label).string = dataFunc.getMyDate(a);
e.NongChangDesc.getChildByName("process").getComponent(cc.Sprite).fillRange = (o - a) / o;
3 != t[n].period || Global.ProtocolMgr.shouHuoNongZuoWu(n, function(t) {
if (t) {
cc.director.GlobalEvent.emit("FriendNongChangUserData", {});
Global.PageMgr.showTipPage(dataFunc.queryValue("zhongzi", "name", i) + "+1");
e.NongChangDesc.active = !1;
e.NongChang[n].getChildByName("Tip").destroy();
} else Global.PageMgr.showTipPage("收获失败");
});
});
} else {
e.NongChang[n].getComponent(cc.Sprite).spriteFrame = null;
try {
e.NongChang[n].getChildByName("Tip").destroy();
} catch (e) {
console.log("空土地");
}
}
}, i = 0; i < t.length; i++) n(i);
},
shouhuoAnim: function(e, t) {
var n = cc.sequence(cc.moveBy(1, cc.v2(0, 50)), cc.callFunc(t));
e.runAction(n);
this.NongChangDesc.active = !1;
},
clearPage: function() {
this.NongChangDesc.active = !1;
Global.PageMgr.closeAllPages();
}
});
cc._RF.pop();
}, {} ],
PageMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9574fjLAz5Ex4lao+90mXLi", "PageMgr");
cc.Class({
extends: cc.Component,
properties: {
state: 0,
pages: [ cc.Node ],
TipsPage: cc.Prefab,
LoadingPage: cc.Prefab
},
onLoad: function() {
Global.pages || (Global.pages = []);
this.pages.forEach(function(e) {
Global.pages.push(e.name);
});
},
start: function() {
cc.game.addPersistRootNode(this.node);
this.lateStart();
},
lateStart: function() {
this.width = cc.view.getFrameSize().width;
window.width = this.width;
this.height = cc.view.getFrameSize().height;
window.height = this.height;
this.adoptCanvas();
},
adoptCanvas: function() {
var e = cc.director.getScene().getChildByName("Canvas").getComponent(cc.Canvas), t = e.designResolution.height / e.designResolution.width;
if (this.height / this.width > t) {
e.fitHeight = !1;
e.fitWidth = !0;
} else {
e.fitHeight = !0;
e.fitWidth = !1;
}
},
closePage: function(e, t) {
this.onClosePage(parseInt(t));
},
openPage: function(e, t) {
this.onOpenPage(parseInt(t));
},
onOpenPage: function(e, t) {
cc.find("Canvas/" + Global.pages[e]).active = !0;
var n = cc.scaleTo(.2, 1, 1);
t && 1 == t && (n = cc.moveTo(.2, cc.v2(0, 0)));
cc.find("Canvas/" + Global.pages[e]).runAction(n);
},
onClosePage: function(e, t) {
if (!isNaN(e)) {
var n = function() {
cc.find("Canvas/" + Global.pages[e]).active = !1;
}, i = cc.sequence(cc.scaleTo(.2, 1, 0), cc.callFunc(n, this));
t && 1 == t && (i = cc.moveTo(.2, cc.v2(1060, 0), cc.callFunc(n, this)));
cc.find("Canvas/" + Global.pages[e]).runAction(i);
}
},
closeAllPages: function() {
Global.pages.forEach(function(e) {
cc.find("Canvas/" + e).active = !1;
});
},
showTips: function(e, t) {
this.showTipPage(t);
},
showTipPage: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .1;
null == t && (t = .1);
this.Tips = cc.instantiate(this.TipsPage);
this.Tips.parent = cc.find("Canvas");
this.Tips.active = !0;
var n = cc.sequence(cc.moveBy(1, cc.v2(0, 30)), cc.fadeOut(t), cc.callFunc(this.closePage, this));
this.Tips.runAction(n);
this.Tips.getComponent("TipsPage").setText(e);
},
showTipPage2: function(e) {
this.Tips = cc.instantiate(this.TipsPage);
this.Tips.angle = -90;
this.Tips.parent = cc.find("Canvas");
this.Tips.active = !0;
var t = cc.sequence(cc.moveBy(1, cc.v2(30, 0)), cc.fadeOut(.1), cc.callFunc(this.closePage, this));
this.Tips.runAction(t);
this.Tips.getComponent("TipsPage").setText(e);
},
showLoadingPage: function(e) {
this.load = cc.instantiate(this.LoadingPage);
this.load.parent = cc.find("Canvas");
this.load.getChildByName("Text").getComponent(cc.Label).string = e;
this.load.getChildByName("WidthContainer").getComponent(cc.Label).string = e;
this.load.active = !0;
},
showLoadingPage2: function(e) {
this.load = cc.instantiate(this.LoadingPage);
this.load.angle = -90;
this.load.parent = cc.find("Canvas");
this.load.getChildByName("Text").getComponent(cc.Label).string = e;
this.load.getChildByName("WidthContainer").getComponent(cc.Label).string = e;
this.load.active = !0;
},
closeLoadingPage: function() {
this.load.active = !1;
},
backEcc: function() {
cc.director.loadScene("ECC", function() {
Global.ResourceMgr.playBgAudio();
console.log("切换场景");
});
}
});
cc._RF.pop();
}, {} ],
PlayerCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4f2dbIeuuJDrb/066peEzF9", "PlayerCtrl");
var i = e("./common/UtilsOther");
cc.Class({
extends: cc.Component,
properties: {
uidLabel: cc.Label,
uid: {
default: 0,
notify: function() {
this.uidLabel.string = "uid:" + this.uid;
}
},
avatar: cc.Sprite,
nickNameLabel: cc.Label,
nickName: {
default: "Mark",
notify: function() {
this.nickNameLabel.string = this.nickName;
}
},
coinsLabel: cc.Label,
coins: {
default: 999999,
type: cc.Integer,
min: 0,
notify: function() {
this.coinsLabel.string = this.coins;
}
},
cardPanelLeft: cc.Node,
cardPanelRight: cc.Node,
cardPanelNode: cc.Node,
menuNode: cc.Node,
startNode: cc.Node,
readyNode: cc.Node,
readyStateNode: cc.Node,
kickNode: cc.Node,
quitNode: cc.Node,
bankerSp: cc.Node,
menuLabel: [ cc.Label ],
bet1: {
default: 0,
notify: function() {
this.menuLabel[0].string = this.bet1;
}
},
bet2: {
default: 0,
notify: function() {
this.menuLabel[1].string = this.bet2;
}
},
bet3: {
default: 0,
notify: function() {
this.menuLabel[2].string = this.bet3;
}
},
bet4: {
default: 0,
notify: function() {
this.menuLabel[3].string = this.bet4;
}
},
isBanker: {
default: !1,
notify: function() {
this.bankerSp.active = this.isBanker;
this.betLabel.node.active = !this.isBanker;
}
},
showMenu: {
default: !1,
notify: function() {
this.menuNode.active = this.showMenu;
}
},
showStart: {
default: !0,
notify: function() {
this.startNode.active = this.showStart;
}
},
showReady: {
default: !1,
notify: function() {
this.readyNode.active = this.showReady;
}
},
showReadyState: {
default: !1,
notify: function() {
this.readyStateNode.active = this.showReadyState;
}
},
showKick: {
default: !1,
notify: function() {
this.kickNode.active = this.showKick;
}
},
showQuit: {
default: !0,
notify: function() {
this.quitNode.active = this.showQuit;
}
},
cowLabel: cc.Label,
rewardLabel: cc.Label,
betLabel: cc.Label,
curBets: 0,
hands: [],
typeReturn: null
},
onLoad: function() {
this.clearHands();
},
start: function() {},
initPlayer: function(e, t, n) {
var a = this;
this.nickName = e;
this.coins = n;
t ? cc.loader.load({
url: t,
type: "jpg"
}, function(e, t) {
e ? console.log(e.message || e) : this.avatar.spriteFrame = new cc.SpriteFrame(t);
}.bind(this)) : cc.loader.loadRes("userIcons/user_icon_woman" + i.randomInteger(0, 3), cc.SpriteFrame, function(e, t) {
e || (a.avatar.spriteFrame = t);
});
},
initPlayerWithData: function(e) {
var t = this;
console.warn(e);
this.nickName = e.nickname;
this.coins = e.coins;
this.uid = e.uid;
this.isBanker = e.isBanker;
this.showReadyState = e.isready;
e.avatar ? cc.loader.load({
url: e.avatar,
type: "jpg"
}, function(e, t) {
e ? console.log(e.message || e) : this.avatar.spriteFrame = new cc.SpriteFrame(t);
}.bind(this)) : cc.loader.loadRes("userIcons/user_icon_woman" + i.randomInteger(0, 3), cc.SpriteFrame, function(e, n) {
e || (t.avatar.spriteFrame = n);
});
},
onBtnDown: function(e, t) {
var n = 0;
switch (t = parseInt(t)) {
case 1:
n = this.bet1;
break;

case 2:
n = this.bet2;
break;

case 3:
n = this.bet3;
break;

case 4:
n = this.bet4;
break;

default:
n = this.bet1;
}
this.menuNode.active = !1;
this.payBet(n);
},
onBtnStart: function() {
cc.log("start.");
GlobalNiuNiu.netProxy.startGame();
},
onBtnReady: function() {
cc.log("ready.");
GlobalNiuNiu.netProxy.ready();
},
onBtnQuit: function() {
cc.log("quitRoom.");
GlobalNiuNiu.netProxy.quitRoom();
setTimeout(function() {
cc.audioEngine.pauseAll();
GlobalNiuNiu.loadScene("Menu");
}, 500);
},
onBtnKick: function() {
cc.log("kick.");
this.isBanker && GlobalNiuNiu.netProxy.kick();
},
clearHands: function() {
this.cardPanelLeft.removeAllChildren();
this.cardPanelLeft.width = 0;
this.cardPanelRight.removeAllChildren();
this.cardPanelRight.width = 0;
this.hands = [];
this.showMenu = !1;
this.showStart = !1;
this.cowLabel.node.active = !1;
this.rewardLabel.node.active = !1;
this.typeReturn = null;
this.curBets = 0;
this.betLabel.string = "下注:0";
},
payBet: function(e, t) {
var n = this;
this.scheduleOnce(function() {
if (e < 0) {
var t = 0;
if (n.hands.length > 3) for (var a = 0; a < 3; a++) {
var o = n.hands[a];
t += o.point <= 10 ? o.point : 10;
}
cc.log("sum: " + t + ",sum%10:" + t % 10);
e = t > 0 && t % 10 == 0 ? [ 50, 100 ][i.randomInteger(0, 1)] : [ 10, 20, 50, 100 ][i.randomInteger(0, 3)];
}
n.curBets = e;
n.betLabel.string = "下注:" + e;
GlobalNiuNiu.config.ONLINE_MODE && GlobalNiuNiu.netProxy.payBet(e);
}, void 0 != t ? t : 0);
},
showBet: function(e) {
this.curBets = e;
this.betLabel.string = "下注:" + e;
},
openHands: function(e) {
var t = this;
this.scheduleOnce(function() {
t.typeReturn = getHandsType(t.hands);
t.cowLabel.node.active = !0;
t.cowLabel.string = [ "没牛", "牛1", "牛2", "牛3", "牛4", "牛5", "牛6", "牛7", "牛8", "牛9", "牛牛", "银牛", "炸弹", "五花牛", "五小牛" ][t.typeReturn.handsType];
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr["effNiu_" + t.typeReturn.handsType]);
t.cardPanelLeft.removeAllChildren(!0);
var e = !0, n = !1, i = void 0;
try {
for (var a, o = t.typeReturn.nCards[Symbol.iterator](); !(e = (a = o.next()).done); e = !0) {
var r = a.value;
(h = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab)).getComponent("CardCtrl").initCard(r.point, r.suit, !0);
h.x = h.y = 0;
t.cardPanelLeft.addChild(h);
}
} catch (e) {
n = !0;
i = e;
} finally {
try {
!e && o.return && o.return();
} finally {
if (n) throw i;
}
}
t.cardPanelRight.removeAllChildren(!0);
var c = !0, s = !1, l = void 0;
try {
for (var u, d = t.typeReturn.pCards[Symbol.iterator](); !(c = (u = d.next()).done); c = !0) {
var h, g = u.value;
(h = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab)).getComponent("CardCtrl").initCard(g.point, g.suit, !0);
h.x = h.y = 0;
t.cardPanelRight.addChild(h);
}
} catch (e) {
s = !0;
l = e;
} finally {
try {
!c && d.return && d.return();
} finally {
if (s) throw l;
}
}
}, void 0 != e ? e : 0);
},
addReward: function(e, t) {
this.coins = e;
this.rewardLabel.string = (parseFloat(t) > 0 ? "+" : "") + t;
this.getComponent(cc.Animation).play("showReward");
}
});
cc._RF.pop();
}, {
"./common/UtilsOther": "UtilsOther"
} ],
ProgressBarExt: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ef4e9V6Kw5GYbrXbeB7Sxtv", "ProgressBarExt");
var i = cc.Enum({
NULL: 0,
INCREASE: 1,
DECREASE: 2
}), a = cc.Class({
extends: cc.ProgressBar,
properties: {
_processType: i.NULL,
_targetProgress: 0,
_progressDiff: 0,
targetProgress: {
tooltip: "目标进度值",
min: 0,
max: 1,
get: function() {
return this._targetProgress;
},
set: function(e) {
this._targetProgress = e;
this._progressDiff = this._targetProgress - this.progress;
this._progressDiff > 0 ? this._processType = i.INCREASE : this._progressDiff < 0 ? this._processType = i.DECREASE : this._processType = i.NULL;
}
},
_onProgressComplete: null,
_changeTime: 0,
changeTime: {
tooltip: "过度动画执行的时间(单位秒)",
range: [ 0, Number.MAX_VALUE ],
get: function() {
return this._changeTime;
},
set: function(e) {
this._changeTime = e;
}
}
},
start: function() {},
update: function(e) {
if (this._processType != i.NULL) {
var t = this._progressDiff;
if (this._changeTime > 0) {
t = this._progressDiff / this._changeTime;
t *= e;
}
if (this._processType == i.INCREASE) {
if (this._targetProgress > this.progress) this.progress += t; else {
this.progress = this._targetProgress;
this.runProgressComplete();
this._processType = i.NULL;
}
this._updateBarStatus();
} else if (this._processType == i.DECREASE) {
if (this._targetProgress < this.progress) this.progress += t; else {
this.progress = this._targetProgress;
this.runProgressComplete();
this._processType = i.NULL;
}
this._updateBarStatus();
}
}
},
setTargetProgress: function(e, t, n) {
this.targetProgress = e;
this._onProgressComplete = t;
if (n) {
this._processType = i.NULL;
this.progress = this._targetProgress;
this.runProgressComplete();
this._updateBarStatus();
}
},
runProgressComplete: function() {
if (this._onProgressComplete) {
this._onProgressComplete();
this._onProgressComplete = null;
}
}
});
t.exports = a;
cc._RF.pop();
}, {} ],
ProtocolMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "40a53HMNQtDB7M915rZOmTz", "ProtocolMgr");
var i = e("../Util/appScript");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.reqData = [];
cc.game.addPersistRootNode(this.node);
},
queryZhujici: function(e) {
i.Post("member/getMnemonic", this.reqData, e);
},
register: function(e, t) {
i.Post("member/register", e, t);
},
login: function(e, t) {
i.Post("member/login", e, t);
},
queryMillOutput: function(e) {
i.Post("machine/canAccept", this.reqData, e);
},
queryJiaoYiList: function(e) {
i.Post("trade/hall/list", {
limit: 999,
page: 1
}, e);
},
queryXHPList: function(e) {
i.Post("store/consumableList", {
limit: 999,
page: 1
}, e);
},
queryKnapsackNFTList: function(e) {
i.Post("knapsack/petAnimalList", {
limit: 999,
page: 1
}, e);
},
queryKnapsackXHPList: function(e) {
i.Post("knapsack/consumableList", {
limit: 999,
page: 1
}, e);
},
queryUseConsumable: function(e, t) {
i.Post("knapsack/useConsumable", e, t);
},
queryNFTList: function(e) {
i.Post("store/petAnimalList", {
limit: 999,
page: 1
}, e);
},
buyXHP: function(e, t) {
i.Post("member/mnemonicLogin", e, t);
},
buyNFT: function(e, t) {
i.Post("member/mnemonicLogin", e, t);
},
queryGameList: function(e, t, n) {
i.Post("game/hall/list", {
game_type: t,
limit: 120,
page: e
}, n);
},
queryGameRoomList: function(e, t) {
i.Post("game/sports_fields/list", {
limit: 12,
page: 1
}, t);
},
queryLieFallowList: function(e, t) {
i.Post("game/arder_fields/list", {
limit: 12,
page: 1
}, t);
},
startCompetitiveGame: function(e, t) {
i.Post("game/startSportsGame", e, t);
},
startLeisureGame: function(e, t) {
i.Post("game/startArderGame", e, t);
},
queryKnapsackpetAnimalList: function(e, t, n) {
i.Post("knapsack/petAnimalList", {
limit: e,
page: t
}, n);
},
querygetAccountDetail: function(e, t, n, a) {
i.Post("finance/getAccountDetail", {
accountType: e,
limit: t,
page: n
}, a);
},
queryForgetPassword: function(e, t) {
i.Post("member/forgetPassword", e, t);
},
queryGetAuthCode: function(e, t) {
i.Post("member/getAuthCode", e, t);
},
querySubmitLogout: function(e, t) {
i.Post("member/submitLogout", e, t);
},
queryTransfer: function(e, t) {
i.Post("finance/transfer", e, t);
},
queryBuyPetAnimal: function(e, t) {
i.Post("store/buyPetAnimal", e, t);
},
queryBuyConsumable: function(e, t) {
i.Post("store/buyConsumable", e, t);
},
queryGetSignUPInfo: function(e) {
i.Post("sign_up/getSignUpInfo", {}, e);
},
querygetCommonInfo: function(e) {
i.Post("content/getCommonInfo", {}, e);
},
queryDivisionList: function(e) {
i.Post("sign_up/division_list", {}, e);
},
queryGameTeamList: function(e) {
i.Post("sign_up/game_team_list", {}, e);
},
queryGetGameSignRank: function(e) {
i.Post("sign_up/getGameSignRank", {}, e);
},
queryGetGameSignList: function(e) {
i.Post("sign_up/sign_up_game_list", {}, e);
},
queryStationRecordList: function(e, t, n) {
i.Post("game/stationRecord/list", {
limit: e,
page: t
}, n);
},
queryLuckDrawList: function(e, t, n) {
i.Post("lottery/luckDrawList", {
limit: e,
page: t
}, n);
},
submitBaoMing: function(e, t) {
console.log(e);
i.Post("sign_up/sub", e, t);
},
queryEmail: function(e) {
i.Post("member/get_email_message_list", {}, e);
},
readEmail: function(e, t) {
var n = {
id: e
};
i.Post("member/read_email_message", n, t);
},
queryGonggao: function(e) {
i.Post("content/getMessageLatest", {}, e);
},
queryUserData: function() {
Global.PageMgr.showLoadingPage("加载中");
i.Post("member/getMemberInfo", {}, function(e) {
Global.PageMgr.closeLoadingPage();
if (200 == e.code) {
var t = e.data;
cc.director.GlobalEvent.emit("UpdateUserData", t);
window.DEFAULT_availableUsdt = t.availableUsdt;
window.DEFAULT_userID = t.username;
} else Global.PageMgr.showTipPage(e.message);
});
},
queryRankInfo: function(e) {
e({
code: 200,
data: {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 4
}
});
},
queryRankList: function(e) {
e({
code: 200,
data: [ {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 1
}, {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 2
}, {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 3
}, {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 4
}, {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 5
}, {
name: "玩家昵称",
level: 100,
canchu: 1e5,
life: 100,
linli: 100,
zhanli: 100,
num: 6
} ]
});
},
addEgold: function() {
var e = this;
i.Post("machine/quickReceive", this.reqData, function(t) {
console.log(t);
200 == t.code && e.queryUserData();
});
},
queryEcc: function(e) {
i.Post("member/numberOfCheckInRewards", [], e);
},
addEcc: function() {
var e = this;
i.Post("member/getRewards", [], function(t) {
200 == t.code && e.queryUserData();
});
},
queryKuangJi: function() {
Global.PageMgr.showLoadingPage("加载中");
i.Post("machine/queryMineMachineMarket", [], function(e) {
Global.PageMgr.closeLoadingPage();
if (200 == e.code) {
GameData.KuangJiData = e.data;
cc.director.GlobalEvent.emit("KuangJiData", {});
}
});
},
YuYueKuangJi: function(e, t) {
Global.PageMgr.showLoadingPage("加载中");
var n = {
id: e
};
i.Post("machine/reservationMineMachine", n, t);
},
ZuYongKuangJi: function(e, t) {
Global.PageMgr.showLoadingPage("加载中");
var n = {
id: e
};
i.Post("machine/rentMineMachine", n, t);
},
queryNongChangUserData: function() {
GameData.NongChangUserData = [ null, {
id: 101001,
time: 6e6,
period: 3
}, {
id: 101002,
time: 6e6,
period: 3
}, {
id: 101003,
time: 6e6,
period: 3
}, null, null ];
cc.director.GlobalEvent.emit("NongChangUserData", {});
},
queryFriendNongChang: function() {
Global.PageMgr.showLoadingPage("正在跳转");
this.scheduleOnce(function() {
Global.PageMgr.closeLoadingPage();
Global.PageMgr.closeAllPages();
GameData.FriendNongChangUserData = [ null, {
id: 101003,
time: 6e6,
period: 1
}, {
id: 101002,
time: 6e6,
period: 2
}, {
id: 101001,
time: 6e6,
period: 3
}, null, null ];
cc.director.GlobalEvent.emit("FriendNongChangUserData", {});
cc.find("Canvas/Main/FanHui").active = !0;
}, 1);
},
shouHuoNongZuoWu: function(e, t) {
GameData.NongChangUserData[e] = null;
t(!0);
},
chanChuNongZuoWu: function(e) {
e(!0);
},
queryZhongZi: function() {
GameData.ZhongZiData = [ {
id: 101001,
count: 2
}, {
id: 101002,
count: 1
}, {
id: 101003,
count: 0
} ];
cc.director.GlobalEvent.emit("ZhongZiData", {});
},
queryGuoShi: function() {
GameData.GuoShiData = [ {
id: 101001,
count: 10
}, {
id: 101002,
count: 20
}, {
id: 101003,
count: 4
} ];
cc.director.GlobalEvent.emit("GuoShiData", {});
},
queryShangCheng: function() {
GameData.ShangChengData = [ {
id: 101001,
count: 2
}, {
id: 101002,
count: 1
}, {
id: 101003,
count: 5
} ];
cc.director.GlobalEvent.emit("ShangChengData", {});
},
zhongZhi: function(e, t) {
GameData.NongChangUserData[t] = {
id: e,
time: 6166e3,
period: 1
};
GameData.ZhongZhiReady.state = !1;
GameData.ZhongZhiReady.id = null;
for (var n = 0; n < GameData.ZhongZiData.length; n++) if (GameData.ZhongZiData[n].id == e) {
GameData.ZhongZiData[n].count--;
GameData.ZhongZiData[n].count <= 0 && GameData.ZhongZiData.splice(n, 1);
cc.director.GlobalEvent.emit("ZhongZiData", {});
}
var i = GameData.NongChangUserData;
cc.director.GlobalEvent.emit("NongChangUserData", {});
for (var a = 0; a < 6; a++) if (void 0 == i[a] || null == i[a]) {
GameData.ZhongZhiReady.pos = a;
return;
}
Global.PageMgr.closeAllPages();
},
buyZhongZi: function(e, t) {
console.log("购买种子id：", e, "购买数量：", t);
},
saleGuoShi: function(e) {
GameData.GuoShiData = [];
e();
},
queryFriend: function() {
GameData.FriendData = [ {
url: "http://upyun.diandianhui.xyz/head_image/1572070309952_0.png",
name: "某个玩家1",
state: 1
}, {
url: "http://upyun.diandianhui.xyz/head_image/1572070309952_0.png",
name: "某个玩家2",
state: 0
}, {
url: "http://upyun.diandianhui.xyz/head_image/1572070309952_0.png",
name: "某个玩家3",
state: 0
} ];
cc.director.GlobalEvent.emit("FriendData");
},
Racing: function() {
cc.director.GlobalEvent.emit("NextTurn", {});
var e = 20, t = setInterval(function() {
e--;
GameData.RacingTimer = e;
if (e <= 0) {
cc.director.GlobalEvent.emit("RacingStart", {});
clearInterval(t);
} else cc.director.GlobalEvent.emit("NextTurnTimer", {});
}, 1e3);
},
QiangHongBao: function(e) {
Global.PageMgr.showLoadingPage2("加载中");
i.Post("redPacket/tagRead", {}, e);
},
queryHongBaoList: function() {
i.Post("readPark/queryMainReadParkList.do", {}, function(e) {
if (200 == e.code) {
GameData.HongBaoList = e.data;
cc.director.GlobalEvent.emit("HongBaoListData", {});
} else Global.PageMgr.showTipPage2(e.message);
});
},
faHongBaoConfig: function() {
i.Post("redPacket/redPackConfig", {}, function(e) {
console.log(e);
if (200 == e.code) {
GameData.FaHongBaoConfig = e.data;
cc.director.GlobalEvent.emit("FaHongBaoConfig", {});
} else Global.PageMgr.showTipPage2(e.message);
});
},
faHongBao: function(e, t, n, a) {
Global.PageMgr.showLoadingPage2("正在发送");
var o = {
amount: t,
bombDigital: e,
number: n
};
i.Post("redPacket/sendRedPack", o, a);
},
slotResult: function(e, t) {
var n = {
amount: e
};
i.Post("game/fruitMachine", n, t);
},
slotRecord: function(e) {
i.Post("game/fruitMachineRecord", {}, e);
},
slotUserData: function() {
i.Post("financial/getUserAccount", {}, function(e) {
if (200 == e.code) {
GameData.SlotUserData = e.data;
cc.director.GlobalEvent.emit("slotUserData", {});
} else Global.PageMgr.showTipPage(e.message);
});
}
});
cc._RF.pop();
}, {
"../Util/appScript": "appScript"
} ],
Racing: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dea14HChhlFw6pbmc5zuEVb", "Racing");
cc.Class({
extends: cc.Component,
properties: {
carCount: 8,
linesCount: 47,
lineArr: {
type: cc.Node,
default: []
},
line: {
type: cc.Prefab,
default: null
},
Content: cc.Node,
car: {
type: cc.Prefab,
default: null
},
SubPanel: {
type: cc.Node,
default: []
},
Ranking: {
type: cc.Node,
default: []
}
},
onLoad: function() {
var e = this;
cc.director.GlobalEvent.on("UpdateRanking", this.onUpdateRanking, this);
cc.director.GlobalEvent.on("NextTurn", this.onUpdateNextTurn, this);
cc.director.GlobalEvent.on("NextTurnTimer", this.onUpdateNextTurnTimer, this);
cc.director.GlobalEvent.on("RacingStart", this.onRacingStart, this);
Global.ProtocolMgr.Racing();
this.rank = [];
this.timerSpeedUp = [];
this.lineArr.forEach(function(t) {
for (var n = 0; n < e.linesCount; n++) {
cc.instantiate(e.line).parent = t;
}
});
},
start: function() {},
onUpdateNextTurn: function() {
var e = this;
this.Content.parent.x = 0;
this.currentIndex = 0;
this.currentMoney = 0;
this.SubPanel[0].getChildByName("Num").children.forEach(function(e) {
e.getComponent(cc.Toggle).isChecked = !1;
});
this.SubPanel[0].getChildByName("Money").children.forEach(function(e) {
e.getComponent(cc.Toggle).isChecked = !1;
});
this.node.getChildByName("Tip").getComponent(cc.Label).string = "请选择要投注的车号";
this.racing = [];
for (var t = function(t) {
var n = cc.instantiate(e.car);
n.parent = e.Content;
n.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.CarTexture[t]);
n.on(cc.Node.EventType.TOUCH_END, function() {
e.SpeedUpById(t);
}, e);
e.racing.push(n);
}, n = 0; n < this.carCount; n++) t(n);
},
onUpdateNextTurnTimer: function() {
GameData.RacingGameState = 0;
this.node.getChildByName("Timer").active = !0;
this.node.getChildByName("Timer").getChildByName("Text").getComponent(cc.Label).string = GameData.RacingTimer;
},
onRacingStart: function() {
var e = this;
GameData.RacingGameState = 1;
this.node.getChildByName("Timer").active = !1;
this.racing.forEach(function(t, n) {
var i = t.getComponent(cc.Animation), a = i.getAnimationState("racing");
a.speed = 1 * Math.random() + 1;
var o = setInterval(function() {
a.speed = t.RacingSpeedUp ? 2 : .8 * Math.random() + 1;
}, 1e3);
i.on("finished", function() {
clearInterval(o);
e.rank.push(n);
if (e.rank.length >= e.carCount) {
GameData.RacingGameState = 2;
cc.director.GlobalEvent.emit("UpdateRanking", {});
setTimeout(function() {
e.clear();
Global.ProtocolMgr.Racing();
}, 2e3);
e.rank.forEach(function(t, n) {
t + 1 == e.currentIndex && Global.PageMgr.showTipPage("您投注的车获得了第" + (n + 1) + "名");
});
}
}, e);
i.playAdditive();
});
},
ClosePage: function() {
Global.PageMgr.onClosePage(4);
},
onEnable: function() {},
clear: function() {
this.rank = [];
this.Content.children.forEach(function(e) {
e.destroy();
});
},
OpenSubPanel: function(e, t) {
1 != GameData.RacingGameState ? this.SubPanel[t].active = !0 : Global.PageMgr.showTipPage("游戏已开始");
},
CloseSubPanel: function(e, t) {
this.SubPanel[t].active = !1;
},
TouZhu: function() {
var e = this;
this.SubPanel[0].getChildByName("Num").children.forEach(function(t) {
t.getComponent(cc.Toggle).isChecked && (e.currentIndex = parseInt(t.name));
});
this.SubPanel[0].getChildByName("Money").children.forEach(function(t) {
t.getComponent(cc.Toggle).isChecked && (e.currentMoney = parseInt(t.name));
});
var t = this.currentMoney, n = this.currentIndex;
if (n && 0 != n) if (t && 0 != t) {
this.node.getChildByName("Tip").getComponent(cc.Label).string = "即将开始";
Global.PageMgr.showTipPage("成功投注" + n + "号车" + t + "ECC");
this.SubPanel[0].active = !1;
} else Global.PageMgr.showTipPage("请选择投注金额"); else Global.PageMgr.showTipPage("请选择投注车号");
},
onUpdateRanking: function() {
var e = this;
this.SubPanel[1].active = !0;
this.Ranking.forEach(function(t, n) {
t.getChildByName("Item").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(Global.ResourceMgr.CarTexture[e.rank[n]]);
});
},
SpeedUpById: function(e) {
var t = this;
if (1 == GameData.RacingGameState) {
var n = this.racing[e].getComponent(cc.Animation);
this.racing[e].getChildByName("fire1").active = !1;
this.racing[e].getChildByName("fire2").active = !0;
this.racing[e].getChildByName("speedUp1").active = !1;
this.racing[e].getChildByName("speedUp2").active = !0;
var i = n.getAnimationState("racing");
i.speed = 2;
this.racing[e].RacingSpeedUp = !0;
try {
clearTimeout(this.timerSpeedUp[e]);
} catch (e) {
console.error(e);
}
this.timerSpeedUp[e] = setTimeout(function() {
i.speed = .8 * Math.random() + 1;
t.racing[e].getChildByName("fire1").active = !0;
t.racing[e].getChildByName("fire2").active = !1;
t.racing[e].getChildByName("speedUp1").active = !0;
t.racing[e].getChildByName("speedUp2").active = !1;
t.racing[e].RacingSpeedUp = !1;
}, 2e3);
} else Global.PageMgr.showTipPage("游戏未开始");
},
SpeedUp: function() {
var e = this;
if (1 == GameData.RacingGameState) if (0 != this.currentIndex) {
var t = this.racing[this.currentIndex - 1].getComponent(cc.Animation);
this.racing[this.currentIndex - 1].getChildByName("fire1").active = !1;
this.racing[this.currentIndex - 1].getChildByName("fire2").active = !0;
this.racing[this.currentIndex - 1].getChildByName("speedUp1").active = !1;
this.racing[this.currentIndex - 1].getChildByName("speedUp2").active = !0;
var n = t.getAnimationState("racing");
n.speed = 2;
this.racing[this.currentIndex - 1].RacingSpeedUp = !0;
setTimeout(function() {
n.speed = .8 * Math.random() + 1;
e.racing[e.currentIndex - 1].getChildByName("fire1").active = !0;
e.racing[e.currentIndex - 1].getChildByName("fire2").active = !1;
e.racing[e.currentIndex - 1].getChildByName("speedUp1").active = !0;
e.racing[e.currentIndex - 1].getChildByName("speedUp2").active = !1;
e.racing[e.currentIndex - 1].RacingSpeedUp = !1;
}, 2e3);
} else Global.PageMgr.showTipPage("您没有投注车号"); else Global.PageMgr.showTipPage("游戏未开始");
},
update: function(e) {
if (0 != this.currentIndex && 1 == GameData.RacingGameState) {
this.Content.parent.x = -(this.racing[this.currentIndex - 1].x - 400);
this.node.getChildByName("ScrollView").getComponent(cc.ScrollView).horizontal = !1;
} else this.node.getChildByName("ScrollView").getComponent(cc.ScrollView).horizontal = !0;
}
});
cc._RF.pop();
}, {} ],
RankPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "751d31ArTdOQrOYcFAJb8ZA", "RankPanel");
cc.Class({
extends: cc.Component,
properties: {
rank_item: cc.Prefab,
container: cc.Node,
icon_1: cc.Node,
icon_2: cc.Node,
icon_3: cc.Node,
icon_head: cc.Sprite,
label_name: cc.Label,
label_level: cc.Label,
label_canchu: cc.Label,
label_life: cc.Label,
label_linli: cc.Label,
label_zhanli: cc.Label,
label_num: cc.Label
},
start: function() {
this.setData();
},
setData: function() {
var e = this;
Global.ProtocolMgr.queryRankList(function(t) {
if (200 == t.code) {
var n = t.data;
console.log(n);
e.container.removeAllChildren();
for (var i = 0; i < n.length; i++) {
var a = cc.instantiate(e.rank_item);
a.getComponent("rank_item").setData(n[i]);
e.container.addChild(a);
}
} else Global.PageMgr.showTipPage(t.message);
});
Global.ProtocolMgr.queryRankInfo(function(t) {
if (200 == t.code) {
var n = t.data;
console.log(n);
try {
cc.loader.load({
url: n.icon,
type: "png"
}, function(t, n) {
e.icon_head.spriteFrame = new cc.SpriteFrame(n);
});
} catch (e) {
console.warn(e);
}
e.label_name.string = n.name;
e.label_level.string = n.level;
e.label_canchu.string = n.canchu;
e.label_life.string = n.life;
e.label_linli.string = n.linli;
e.label_zhanli.string = n.zhanli;
e.icon_1.active = !1;
e.icon_2.active = !1;
e.icon_3.active = !1;
e.label_num.node.active = !1;
switch (n.num) {
case 1:
e.icon_1.active = !0;
break;

case 2:
e.icon_2.active = !0;
break;

case 3:
e.icon_3.active = !0;
break;

default:
e.label_num.node.active = !0;
e.label_num.string = n.num;
}
} else Global.PageMgr.showTipPage(t.message);
});
}
});
cc._RF.pop();
}, {} ],
RecreationalCenter: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f6ef7mY9ltATI/uQubNYsc7", "RecreationalCenter");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
goHongBao: function() {
Global.gameName = "HongBao";
Global.ResourceMgr.playTransitionIn();
cc.director.loadScene("HongBao", function() {});
},
goSlot: function() {
Global.PageMgr.showTipPage("该功能正在开发中");
},
closePage: function() {
Global.PageMgr.onClosePage(6);
}
});
cc._RF.pop();
}, {} ],
ResourceMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "80f7385+KFGWq/ygOfe4ZHP", "ResourceMgr");
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
start: function() {
cc.game.addPersistRootNode(this.node);
},
playLoginAudio: function() {
cc.audioEngine.playMusic(this.loginAudioClip, !0, .2 * (GameData.audio + 0));
},
playBgAudio: function() {
cc.audioEngine.playMusic(this.bgAudioClip, !0, .2 * (GameData.audio + 0));
},
playHongBaoAudio: function() {
cc.audioEngine.pauseAll();
cc.audioEngine.play(this.hongBaoAudioClip, !0, .2 * (GameData.audio + 0));
},
playClickAudio: function() {
cc.audioEngine.play(this.clickClip, !1, 10 * (GameData.audio + 0));
},
playTransitionIn: function() {
cc.instantiate(this.Transition).parent = cc.find("Canvas");
}
});
cc._RF.pop();
}, {} ],
RoomCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0f7f9G2EW9BspV1mWJvrDGx", "RoomCtrl");
var i = e("./common/UtilsOther"), a = e("./views/ToastCtrl"), o = e("./views/DialogCtrl"), r = e("./common/DataMgr").getInstance().playerObj;
cc.Class({
extends: cc.Component,
properties: {
seats: [ cc.Node ],
cardHeapSeat: cc.Node,
multLabel: cc.Label,
mult: {
default: 1,
type: cc.Integer,
min: 1,
max: 50,
notify: function() {
this.multLabel.string = this.mult + "倍场";
}
},
betTimeLabel: cc.Label
},
onLoad: function() {
this.selfNodeCtrl = this.getPlayerNode(2).getComponent("PlayerCtrl");
this.startBets = !1;
this.bankerSeat = -1;
this.cardsArr = [];
this.nextBankerSeat = -1;
this.mult = GlobalNiuNiu.config.ROOM_MULT;
this.betTimeLabel.node.parent.active = !1;
},
start: function() {
this.schedule(this.myUpdate, .1);
this.initGame();
this.startGame();
GlobalNiuNiu.audioMgr.playMusic(GlobalNiuNiu.audioMgr.gameMusic);
},
initGame: function() {
for (var e = [ "玛利亚", "波多", "吉野君", "椎名空", "筱田步美", "佐佐木明希", "高桥圣子", "三上悠亚", "水野朝阳" ], t = 0; t < 5; t++) if (2 != t) {
var n = i.randomInteger(0, e.length - 1), a = e[n];
e.splice(n, 1);
this.getPlayerNode(t).getComponent("PlayerCtrl").initPlayer(a, null, 1e5);
}
this.selfNodeCtrl.initPlayerWithData(r);
this.bankerSeat = this.nextBankerSeat = i.randomInteger(0, 4);
this.cardsArr = create1pairPoker(!0);
},
getDealSeatOrder: function() {
for (var e = [], t = this.bankerSeat; t <= 4; ) e.push(t++);
t = 0;
for (;t < this.bankerSeat; ) e.push(t++);
return e;
},
cleanGame: function() {
for (var e = 0; e < 5; e++) {
this.getPlayerNode(e).getComponent("PlayerCtrl").clearHands();
}
},
getPlayerNode: function(e) {
cc.assert(e >= 0 && e <= 4, "wrong seatIndex!");
return this.seats[e].getChildByName("PlayerNode");
},
startGame: function() {
var e = this;
if (GlobalNiuNiu.dataMgr.playerObj.coins < 100 * this.mult * 4) o.show("金币不足" + 50 * this.mult * 4 + "，请充值.", null, "确定", null, function() {
GlobalNiuNiu.loadScene("Lobby");
}); else {
this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl").isBanker = !0;
this.scheduleOnce(function() {
GlobalNiuNiu.config.GAME_MODE < 5 ? e.startDeal(GlobalNiuNiu.config.GAME_MODE, function() {
e.startBetDown();
}) : e.startBetDown();
}, 1);
}
},
startBetDown: function() {
var e = this;
a.showText("请开始下注.", 1, function() {
e.startBets = !0;
e.betsTime = GlobalNiuNiu.config.BETS_WAITING;
e.robotDown();
});
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effMdls);
this.selfNodeCtrl.showMenu = !this.selfNodeCtrl.isBanker;
},
robotDown: function() {
for (var e = this.getDealSeatOrder(), t = 0; t < e.length; t++) {
var n = e[t], i = this.getPlayerNode(n).getComponent("PlayerCtrl");
if (2 !== n && !i.isBanker) {
i.coins < 100 * this.mult * 4 && (i.coins = 1e5);
i.payBet(-1, Math.random() + .5);
}
}
},
startDeal: function(e, t) {
cc.log("开始发牌." + e + "张.");
var n = 0;
if (e > 0) {
var i = function(e, t) {
for (var i = a.getPlayerNode(e).getComponent("PlayerCtrl"), c = function(c) {
var s = t[c];
i.hands.push(s);
var l = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab);
l.getComponent("CardCtrl").initCard(s.point, s.suit, !1);
l.scale = .5;
l.zIndex = o;
var u = r.convertToNodeSpaceAR(r.convertToWorldSpaceAR(a.cardHeapSeat.getPosition())), d = r.convertToNodeSpaceAR(i.cardPanelLeft.convertToWorldSpaceAR(cc.v2(0, 0)));
r.addChild(l);
l.setPosition(u);
l.runAction(cc.sequence(cc.delayTime(n), cc.moveTo(.1, d), cc.callFunc(function() {
l.removeFromParent(!0);
l.x = l.y = 0;
l.scale = 1;
l.getComponent("CardCtrl").showFace = 2 === e;
i.cardPanelLeft.addChild(l);
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effFapai);
})));
n += .1;
o--;
}, s = 0; s < t.length; s++) c(s);
}, a = this, o = GlobalNiuNiu.config.LOCAL_ZINDEX_MAX, r = a.cardHeapSeat.parent, c = this.getDealSeatOrder();
if (this.cardsArr.length < 5 * e) {
cc.log("牌不够，洗牌.");
this.cardsArr = create1pairPoker(!0);
}
var s = !0, l = !1, u = void 0;
try {
for (var d, h = c[Symbol.iterator](); !(s = (d = h.next()).done); s = !0) {
var g = d.value, f = this.cardsArr.slice(0, e);
sortBig2Samll(f);
this.cardsArr = this.cardsArr.slice(e);
i(g, f);
}
} catch (e) {
l = !0;
u = e;
} finally {
try {
!s && h.return && h.return();
} finally {
if (l) throw u;
}
}
}
this.scheduleOnce(t, n + .5);
},
openHands: function() {
var e = this;
cc.log("开始开牌");
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effKaipai);
a.showText("开牌!", 1, function() {
for (var t = e.getDealSeatOrder(), n = 0; n < t.length; n++) {
var i = t[n];
e.getPlayerNode(i).getComponent("PlayerCtrl").openHands(.6 * n);
}
e.scheduleOnce(e.countReward, .6 * t.length);
});
},
countMult: function(e) {
if (this.mult <= 1) return 1;
var t = 1;
t = e.handsType === HandsType.TYPE_NONE ? 1 : this.mult + (e.handsType - HandsType.TYPE_NIUNIU);
return t = Math.max(t, 1);
},
countReward: function() {
var e = this;
cc.log("结算");
var t = this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl"), n = t.typeReturn, i = 0, a = this.getDealSeatOrder();
a.splice(0, 1);
var r = !0, c = !1, s = void 0;
try {
for (var l, u = a[Symbol.iterator](); !(r = (l = u.next()).done); r = !0) {
var d = l.value, h = this.getPlayerNode(d).getComponent("PlayerCtrl"), g = h.typeReturn;
g.handsType === HandsType.TYPE_NIUNIU && (this.nextBankerSeat = d);
if (compareHandsReturn(n, g)) {
var f = this.countMult(n);
i += h.curBets * f;
h.addReward(-h.curBets * f);
} else {
var p = this.countMult(g);
i -= h.curBets * p;
h.addReward(h.curBets * p);
}
}
} catch (e) {
c = !0;
s = e;
} finally {
try {
!r && u.return && u.return();
} finally {
if (c) throw s;
}
}
t.addReward(i);
GlobalNiuNiu.dataMgr.playerObj.coins = this.selfNodeCtrl.coins;
GlobalNiuNiu.dataMgr.saveDataToLocal();
this.scheduleOnce(function() {
o.show("继续玩？", "取消", "确定", function() {
GlobalNiuNiu.loadScene("Lobby");
}, function() {
e.cleanGame();
e.bankerSeat = e.nextBankerSeat;
e.startGame();
});
}, 1.5);
},
myUpdate: function(e) {
var t = this;
if (this.startBets) {
this.betTimeLabel.string = Math.ceil(this.betsTime);
this.betsTime -= e;
if (this.betsTime > 0) {
this.betTimeLabel.node.parent.active = !0;
var n = !0, i = !0, a = !1, o = void 0;
try {
for (var r, c = this.seats[Symbol.iterator](); !(i = (r = c.next()).done); i = !0) {
var s = r.value.getChildByName("PlayerNode").getComponent("PlayerCtrl");
s.curBets <= 0 && !s.isBanker && (n = !1);
}
} catch (e) {
a = !0;
o = e;
} finally {
try {
!i && c.return && c.return();
} finally {
if (a) throw o;
}
}
n && (this.startBets = !1);
} else {
var l = this.getDealSeatOrder(), u = !0, d = !1, h = void 0;
try {
for (var g, f = l[Symbol.iterator](); !(u = (g = f.next()).done); u = !0) {
var p = g.value, m = this.getPlayerNode(p).getComponent("PlayerCtrl");
if (m.curBets <= 0) {
m.onBtnDown(null, 1);
this.startBets = !1;
cc.log("超时自动下注.");
}
}
} catch (e) {
d = !0;
h = e;
} finally {
try {
!u && f.return && f.return();
} finally {
if (d) throw h;
}
}
}
if (!this.startBets) {
this.betTimeLabel.node.parent.active = !1;
var b = GlobalNiuNiu.config.GAME_MODE < 5 ? 5 - GlobalNiuNiu.config.GAME_MODE : GlobalNiuNiu.config.GAME_MODE;
this.startDeal(b, function() {
t.openHands();
});
}
}
}
});
cc._RF.pop();
}, {
"./common/DataMgr": "DataMgr",
"./common/UtilsOther": "UtilsOther",
"./views/DialogCtrl": "DialogCtrl",
"./views/ToastCtrl": "ToastCtrl"
} ],
RoomNetCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ab4600db81D8pNDFnW8SeXG", "RoomNetCtrl");
e("./common/UtilsOther");
var i = e("./views/ToastCtrl"), a = e("./views/DialogCtrl"), o = e("./common/DataMgr").getInstance().playerObj, r = e("./RoomCtrl");
cc.Class({
extends: r,
properties: {
ridLabel: cc.Label,
webview: cc.Node
},
onLoad: function() {
this.selfNodeCtrl = this.getPlayerNode(2).getComponent("PlayerCtrl");
this.startBets = !1;
this.bankerSeat = -1;
this.cardsArr = [];
this.nextBankerSeat = -1;
this.mult = GlobalNiuNiu.config.ROOM_MULT;
this.betTimeLabel.node.parent.active = !1;
this.listenEvent();
this.seatOrder = 0;
this.inRoomUserMap = new Map();
},
start: function() {
this.schedule(this.myUpdate, 1);
this.initGame();
this.betsTime = 0;
this.nowTime = 0;
GlobalNiuNiu.audioMgr.playMusic(GlobalNiuNiu.audioMgr.gameMusic);
},
listenEvent: function() {
GlobalNiuNiu.netProxy.registerPush("config", this.onConfigResponse, this);
GlobalNiuNiu.netProxy.registerPush("startGame", this.onStartGameResponse, this);
GlobalNiuNiu.netProxy.registerPush("gameReady", this.onReady, this);
GlobalNiuNiu.netProxy.registerPush("otherReady", this.onOtherReady, this);
GlobalNiuNiu.netProxy.registerPush("countReward", this.onCountRewardResponse, this);
GlobalNiuNiu.netProxy.registerPush("pEnterRoom", this.onOtherUserEnterRoom, this);
GlobalNiuNiu.netProxy.registerPush("pExitRoom", this.onOtherUserExitRoom, this);
GlobalNiuNiu.netProxy.registerPush("changeBanker", this.onChangeBanker, this);
GlobalNiuNiu.netProxy.registerPush("pDeal", this.onPushDeal, this);
GlobalNiuNiu.netProxy.registerPush("pBet", this.onPushUserBet, this);
GlobalNiuNiu.netProxy.registerPush("pStartBet", this.onPushStartBet, this);
GlobalNiuNiu.netProxy.registerPush("pShowCards", this.onPushShowCards, this);
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_OPEN_ROOM, this.onOpenRoom.bind(this));
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_ENTER_ROOM, this.onEnterRoom.bind(this));
},
onConfigResponse: function(e) {
try {
var t = e.config.betConfig;
this.selfNodeCtrl.bet1 = t[0];
this.selfNodeCtrl.bet2 = t[1];
this.selfNodeCtrl.bet3 = t[2];
this.selfNodeCtrl.bet4 = t[3];
} catch (e) {}
},
onStartGameResponse: function(e) {
try {
if (0 != e.err) {
i.showText(e.msg, 2);
return;
}
this.selfNodeCtrl.showStart = !1;
} catch (e) {}
},
onReady: function() {
try {
this.selfNodeCtrl.showReady = !1;
this.selfNodeCtrl.showReadyState = !0;
this.selfNodeCtrl.showQuit = !1;
} catch (e) {}
},
onOtherReady: function(e) {
try {
for (var t = 0; t < 5; t++) {
var n = this.getPlayerNode(t).getComponent("PlayerCtrl");
e.user.uid == n.uid && (n.showReadyState = !0);
}
e.user.uid == this.uid && (this.showReadyState = !0);
} catch (e) {}
},
onCountRewardResponse: function(e) {
var t = this;
try {
console.log(e.countReward);
var n = e.countReward;
this.getDealSeatOrder().splice(0, 1);
for (var i = function(e) {
var i = t.getPlayerNode(e).getComponent("PlayerCtrl");
n.forEach(function(e) {
e.uid == i.uid && i.addReward(e.coins, e.reward);
});
}, a = 0; a < 5; a++) i(a);
GlobalNiuNiu.dataMgr.playerObj.coins = this.selfNodeCtrl.coins;
GlobalNiuNiu.dataMgr.saveDataToLocal();
} catch (e) {}
},
onOpenRoom: function(e) {
try {
console.log(e);
var t = e, n = t.user;
this.ridLabel.string = "房间号:" + t.rid;
this.seats[2].active = !0;
this.selfNodeCtrl.initPlayerWithData(n);
this.bankerSeat = 2;
this.selfNodeCtrl.showStart = !0;
this.seatOrder = n.seatOrder;
this.inRoomUserMap.set(n.uid, 2);
GlobalNiuNiu.netProxy.config();
cc.log("开房成功.");
} catch (e) {}
},
onEnterRoom: function(e) {
try {
var t = e;
this.ridLabel.string = "rid:" + t.rid;
this.seatOrder = this.__getSelfSeatOrder(t.users);
for (var n = 0; n < t.users.length; n++) {
var i = t.users[n], a = this.__getUserShowSeat(i.seatOrder);
this.seats[a].active = !0;
this.getPlayerNode(a).getComponent("PlayerCtrl").initPlayerWithData(i);
this.bankerSeat = i.isBanker ? a : this.bankerSeat;
this.inRoomUserMap.set(t.users[n].uid, a);
}
GlobalNiuNiu.netProxy.config();
this.selfNodeCtrl.showReady = !0;
} catch (e) {}
},
__getSelfSeatOrder: function(e) {
for (var t = 0; t < e.length; t++) if (e[t].uid == o.uid) return e[t].seatOrder;
return -1;
},
__getUserShowSeat: function(e) {
var t = e + (2 - this.seatOrder);
return t = (t = t >= 0 ? t : t + 5) < 5 ? t : t - 5;
},
onOtherUserEnterRoom: function(e) {
try {
var t = e.user, n = this.__getUserShowSeat(t.seatOrder), i = this.getPlayerNode(n).getComponent("PlayerCtrl");
this.seats[n].active = !0;
i.initPlayerWithData(t);
this.inRoomUserMap.set(t.uid, n);
} catch (e) {}
},
onOtherUserExitRoom: function(e) {
try {
var t = e.user, n = this.inRoomUserMap.get(t.uid);
this.seats[n].active = !1;
this.inRoomUserMap.delete(t.uid);
} catch (e) {}
},
onChangeBanker: function(e) {
try {
var t = e.uid, n = this.inRoomUserMap.get(t);
this.getPlayerNode(n).getComponent("PlayerCtrl").isBanker = !0;
if (t == o.uid) {
this.selfNodeCtrl.showStart = !0;
this.selfNodeCtrl.showReady = !1;
this.selfNodeCtrl.showReadyState = !1;
this.selfNodeCtrl.showQuit = !0;
}
} catch (e) {}
},
onPushDeal: function(e) {
try {
var t = e.cards;
cc.log("cards:" + JSON.stringify(t));
this.selfNodeCtrl.showQuit = !1;
for (var n = 0; n < 5; n++) {
this.getPlayerNode(n).getComponent("PlayerCtrl").showReadyState = !1;
}
this._serverCards = t;
this.startDeal(t.length, null);
} catch (e) {}
},
onPushUserBet: function(e) {
try {
var t = Number(e.bet), n = e.uid;
this.getPlayerNode(this.inRoomUserMap.get(n)).getComponent("PlayerCtrl").showBet(t);
} catch (e) {}
},
onPushStartBet: function(e) {
try {
this.startBets = !0;
var t = e.expired / 1e3;
this.betsTime = t;
this.selfNodeCtrl.isBanker || (this.selfNodeCtrl.showMenu = !0);
} catch (e) {}
},
onPushShowCards: function(e) {
try {
this.startBets = !1;
var t = e.users, n = !0, i = !1, a = void 0;
try {
for (var r, c = t[Symbol.iterator](); !(n = (r = c.next()).done); n = !0) {
var s = r.value;
if (s.uid != o.uid) {
this.getPlayerNode(this.inRoomUserMap.get(s.uid)).getComponent("PlayerCtrl").hands = s.cards;
}
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!n && c.return && c.return();
} finally {
if (i) throw a;
}
}
this.openHands();
} catch (e) {}
},
initGame: function() {
var e = !0, t = !1, n = void 0;
try {
for (var i, a = this.seats[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
i.value.active = !1;
}
} catch (e) {
t = !0;
n = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw n;
}
}
},
getDealSeatOrder: function() {
for (var e = [], t = this.bankerSeat; t <= 4; ) {
this.seats[t].active && e.push(t);
t++;
}
t = 0;
for (;t < this.bankerSeat; ) {
this.seats[t].active && e.push(t);
t++;
}
return e;
},
cleanGame: function() {
for (var e = 0; e < 5; e++) {
this.getPlayerNode(e).getComponent("PlayerCtrl").clearHands();
}
},
getPlayerNode: function(e) {
console.log(e);
cc.assert(e >= 0 && e <= 4, "wrong seatIndex!");
return this.seats[e].getChildByName("PlayerNode");
},
startGame: function() {
var e = this;
if (GlobalNiuNiu.dataMgr.playerObj.coins < 100 * this.mult * 4) a.show("金币不足" + 50 * this.mult * 4 + "，请充值.", null, "确定", null, function() {
GlobalNiuNiu.loadScene("Lobby");
}); else {
this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl").isBanker = !0;
this.scheduleOnce(function() {
GlobalNiuNiu.config.GAME_MODE < 5 && e.startDeal(GlobalNiuNiu.config.GAME_MODE, function() {});
}, 1);
}
},
startBetDown: function() {
var e = this;
i.showText("请开始下注.", 1, function() {
e.startBets = !0;
e.betsTime = GlobalNiuNiu.config.BETS_WAITING;
e.robotDown();
});
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effMdls);
this.selfNodeCtrl.showMenu = !this.selfNodeCtrl.isBanker;
},
robotDown: function() {
for (var e = this.getDealSeatOrder(), t = 0; t < e.length; t++) {
var n = e[t], i = this.getPlayerNode(n).getComponent("PlayerCtrl");
if (2 !== n && !i.isBanker) {
i.coins < 100 * this.mult * 4 && (i.coins = 1e5);
i.payBet(-1, Math.random() + .5);
}
}
},
startDeal: function(e, t) {
cc.log("开始发牌." + e + "张.");
var n = 0;
if (e > 0) {
var i = function(e, t) {
var i = a.getPlayerNode(e).getComponent("PlayerCtrl");
2 == e && (t = a._serverCards);
for (var c = function(c) {
var s = t[c];
i.hands.push(s);
var l = cc.instantiate(GlobalNiuNiu.assetMgr.cardPrefab);
l.getComponent("CardCtrl").initCard(s.point, s.suit, !1);
l.scale = .5;
l.zIndex = o;
var u = r.convertToNodeSpaceAR(r.convertToWorldSpaceAR(a.cardHeapSeat.getPosition())), d = r.convertToNodeSpaceAR(i.cardPanelLeft.convertToWorldSpaceAR(cc.v2(0, 0)));
r.addChild(l);
l.setPosition(u);
l.runAction(cc.sequence(cc.delayTime(n), cc.moveTo(.1, d), cc.callFunc(function() {
l.removeFromParent(!0);
l.x = l.y = 0;
l.scale = 1;
l.getComponent("CardCtrl").showFace = 2 === e;
i.cardPanelLeft.addChild(l);
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effFapai);
})));
n += .1;
o--;
}, s = 0; s < t.length; s++) c(s);
}, a = this, o = GlobalNiuNiu.config.LOCAL_ZINDEX_MAX, r = a.cardHeapSeat.parent, c = this.getDealSeatOrder();
if (this.cardsArr.length < 5 * e) {
cc.log("牌不够，洗牌.");
this.cardsArr = create1pairPoker(!0);
}
var s = !0, l = !1, u = void 0;
try {
for (var d, h = c[Symbol.iterator](); !(s = (d = h.next()).done); s = !0) {
var g = d.value, f = this.cardsArr.slice(0, e);
sortBig2Samll(f);
this.cardsArr = this.cardsArr.slice(e);
i(g, f);
}
} catch (e) {
l = !0;
u = e;
} finally {
try {
!s && h.return && h.return();
} finally {
if (l) throw u;
}
}
}
t && this.scheduleOnce(t, n + .5);
},
openHands: function() {
var e = this;
cc.log("开始开牌");
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effKaipai);
i.showText("开牌!", 1, function() {
for (var t = e.getDealSeatOrder(), n = 0; n < t.length; n++) {
var i = t[n];
e.getPlayerNode(i).getComponent("PlayerCtrl").openHands(.6 * n);
}
e.scheduleOnce(e.countReward, .6 * t.length);
});
},
countMult: function(e) {
if (this.mult <= 1) return 1;
var t = 1;
t = e.handsType === HandsType.TYPE_NONE ? 1 : this.mult + (e.handsType - HandsType.TYPE_NIUNIU);
t = Math.max(t, 1);
e.handsType === HandsType.TYPE_NONE && (t = 2);
return t;
},
countReward: function() {
var e = this;
cc.log("结算");
this.getPlayerNode(this.bankerSeat).getComponent("PlayerCtrl").typeReturn;
this.scheduleOnce(function() {
if (GlobalNiuNiu.config.ONLINE_MODE) {
var t = e.selfNodeCtrl.isBanker;
e.cleanGame();
e.selfNodeCtrl.isBanker = t;
e.selfNodeCtrl.isBanker ? e.selfNodeCtrl.showStart = !0 : e.selfNodeCtrl.showReady = !0;
e.selfNodeCtrl.showQuit = !0;
} else a.show("继续玩？", "取消", "确定", function() {
GlobalNiuNiu.loadScene("Lobby");
}, function() {
e.cleanGame();
e.bankerSeat = e.nextBankerSeat;
e.startGame();
});
}, 1.5);
},
openWebView: function() {
this.webview.active = !0;
},
closeWebView: function() {
this.webview.active = !1;
},
myUpdate: function(e) {
if (this.startBets) {
this.betTimeLabel.string = Math.ceil(this.betsTime);
this.betsTime--;
if (Math.ceil(this.betsTime) > 0) this.betTimeLabel.node.parent.active = !0; else {
this.startBets = !1;
this.betTimeLabel.node.parent.active = !1;
this.selfNodeCtrl.showMenu = !1;
}
} else this.betTimeLabel.node.parent.active = !1;
},
onDestroy: function() {}
});
cc._RF.pop();
}, {
"./RoomCtrl": "RoomCtrl",
"./common/DataMgr": "DataMgr",
"./common/UtilsOther": "UtilsOther",
"./views/DialogCtrl": "DialogCtrl",
"./views/ToastCtrl": "ToastCtrl"
} ],
SalePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7d51eSfYKhFmaNN9/ogQ4L1", "SalePanel");
cc.Class({
extends: cc.Component,
properties: {
item: cc.Prefab,
content: cc.Node
},
start: function() {},
onEnable: function() {
var e = this;
this.content.children.forEach(function(e) {
e.destroy();
});
var t = 0;
GameData.GuoShiData.forEach(function(n) {
var i = cc.instantiate(e.item);
i.parent = e.content;
var a = n.id + "";
i.getChildByName("Count").getComponent(cc.Label).string = n.count;
var o = parseInt(dataFunc.queryValue("zhongzi", "price", a)) * n.count;
t += o;
i.getChildByName("Price").getComponent(cc.Label).string = "可售" + o + "ECC";
});
this.node.getChildByName("TotalPrice").getComponent(cc.Label).string = "当前可售出" + t + "ECC";
},
saleing: function() {
var e = this;
Global.ProtocolMgr.saleGuoShi(function() {
e.node.active = !1;
cc.find("Canvas/GainGold").getComponent("GainGold").onPlayCoinAni(function() {
console.log("获得金币");
});
console.log("卖出果实");
Global.PageMgr.closeAllPages();
Global.PageMgr.showTipPage("成功售出果实");
});
}
});
cc._RF.pop();
}, {} ],
ScrollViewFixed: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6b10btYYwJF2J+YhWOd1Cea", "ScrollViewFixed");
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
_registerEvent: function() {},
_moveContent: function(e, t) {
var n = this._flattenVectorByDirection(e);
cc.director.getContentScaleFactor();
1;
var i = cc.pAdd(this.getContentPosition(), n), a = this.getMaxScrollOffset();
i.x = i.x >= -a.x / 2 - 1 * this.maxBounceDistance.x ? i.x : -a.x / 2 - 1 * this.maxBounceDistance.x;
i.x = i.x <= a.x / 2 + 1 * this.maxBounceDistance.x ? i.x : a.x / 2 + 1 * this.maxBounceDistance.x;
i.y = i.y >= -a.y / 2 - 1 * this.maxBounceDistance.x ? i.y : -a.y / 2 - 1 * this.maxBounceDistance.x;
i.y = i.y <= a.y / 2 + 1 * this.maxBounceDistance.x ? i.y : a.y / 2 + 1 * this.maxBounceDistance.x;
this.setContentPosition(i);
var o = this._getHowMuchOutOfBoundary();
this._updateScrollBar(o);
this.elastic && t && this._startBounceBackIfNeeded();
},
_handleMoveLogic: function(e) {
var t = e.getDelta();
this._processDeltaMove(cc.pMult(t, this.rate));
}
});
cc._RF.pop();
}, {} ],
ServerTimeMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "faaafAya9dBLqL7S4LFSEWp", "ServerTimeMgr");
var i = cc.Class({
properties: {
delayForOfflineReward: 0,
_timeStampOffset: Number.MAX_VALUE,
timeStampOffset: {
get: function() {
return this._timeStampOffset;
},
set: function(e) {
this._timeStampOffset = e;
cc.log("this._timeStampOffset = " + this._timeStampOffset);
if (this.isDeviceTimeValid() || GlobalNiuNiu.config.DEBUG_MODE) {
GlobalNiuNiu.gameMgr.checkForSubsReward();
GlobalNiuNiu.gameMgr.selOfflineRewardForAdVideo(!1, this.delayForOfflineReward);
GlobalNiuNiu.viewMgr.showDailyRewardView();
}
}
}
},
ctor: function() {},
statics: {
instance: null,
getInstance: function() {
null == i.instance && (i.instance = new i());
return i.instance;
}
},
loadServerTime: function() {
if (cc.sys.platform != cc.sys.ANDROID) {
var t = cc.loader.getXMLHttpRequest();
this.onStreamXHREvents(t, "GET");
t.open("GET", "https://sec.tclclouds.com/game180412/stamp/q", !0);
t.timeout = 1e4;
t.send();
} else {
e("UtilsCross").loadServerTime();
}
},
onStreamXHREvents: function(e, t, n) {
var i = this;
[ "loadstart", "abort", "error", "load", "loadend", "timeout" ].forEach(function(t) {
e["on" + t] = function() {
if ("timeout" === t) {
cc.log("(timeout)");
i.timeStampOffset = Number.MAX_VALUE;
}
};
});
e.onreadystatechange = function() {
if (4 === e.readyState && e.status >= 200 && e.status < 300) try {
var t = JSON.parse(e.responseText).Stamp, n = new Date().getTime() / 1e3;
i.timeStampOffset = Math.abs(n - t);
cc.log("load time Succ nowTimeStamp= " + n);
} catch (e) {
cc.log("load time Failed  ");
cc.error("on loadServerTime: " + e.message);
i.timeStampOffset = Number.MAX_VALUE;
} else cc.log("load time xhr.readyState = " + e.readyState + " xhr.status = " + e.status);
};
},
isDeviceTimeValid: function() {
return !GlobalNiuNiu.dataMgr.playerObj.isControlTime || this.timeStampOffset < 600;
},
setServerTimeStamp: function(e) {
var t = new Date().getTime() / 1e3;
this.timeStampOffset = Math.abs(t - e);
}
});
window.ServerTimeMgr = i;
t.exports = i;
cc._RF.pop();
}, {
UtilsCross: "UtilsCross"
} ],
SettingViewCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "21debW89uRLQpizyKWiieua", "SettingViewCtrl");
var i = e("./../common/DataMgr"), a = e("./../common/ViewBase"), o = (e("./../views/DialogCtrl"), 
e("./../common/FacebookMgr")), r = (e("./../net/HttpProxy"), e("./../common/SwitchControl")), c = e("./../common/UtilsCross");
cc.Class({
extends: a,
properties: {
btnFb: cc.Button,
labelName: cc.Label,
icon: cc.Node,
switchMusic: r,
switchEff: r
},
onLoad: function() {
var e = i.getInstance().settingObj;
this.switchMusic.isOn = e.musicOn;
this.switchEff.isOn = e.effectOn;
if (o.getInstance().isLogin() && i.getInstance().playerObj.fbid > 0 && this.btnFb) {
this.btnFb.interactable = !1;
this.btnFb.node.getChildByName("giftAniNode").active = !1;
}
var t = i.getInstance().playerObj.fbicon;
cc.log("已保存fbicon: " + t);
"" !== t && this.icon.getComponent("IconNodeCtrl").loadTexture(t);
var n = i.getInstance().playerObj.fbname;
cc.log("已保存fbname: " + n);
"" !== n && (this.labelName.string = n);
},
onEnable: function() {
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
},
onDisable: function() {
GlobalNiuNiu.eventMgr.off(GlobalNiuNiu.config.EVENT_BIND_FB_SUC, this.onBindFbSuc, this);
},
start: function() {
var e = this;
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_UPDATE_FB_ICON, function() {
var t = i.getInstance().playerObj.fbicon;
"" !== t && e.icon.getComponent("IconNodeCtrl").loadTexture(t);
}, this);
GlobalNiuNiu.eventMgr.on(GlobalNiuNiu.config.EVENT_UPDATE_FB_NAME, function() {
var t = i.getInstance().playerObj.fbname;
"" !== t && (e.labelName.string = t);
}, this);
},
onBindFbSuc: function() {
this.btnFb.interactable = !1;
this.btnFb.node.getChildByName("giftAniNode").active = !1;
},
onBtnMusic: function(e) {
var t = i.getInstance().settingObj, n = t.musicOn;
n = !n;
t.musicOn = n;
n ? GlobalNiuNiu.audioMgr.playLastMusic() : GlobalNiuNiu.audioMgr.stopMusic();
this.switchMusic.isOn = n;
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
},
onBtnEff: function(e) {
var t = i.getInstance().settingObj, n = t.effectOn;
n = !n;
t.effectOn = n;
n || GlobalNiuNiu.audioMgr.stopAllEffects();
this.switchEff.isOn = n;
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
},
onBtnFb: function() {
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
GlobalNiuNiu.gameMgr.loginFb();
},
onBtnTerms: function() {
cc.sys.openURL("https://www.baidu.com");
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
},
onBtnRateUs: function() {
cc.log("rate us...");
cc.sys.openURL("https://play.google.com/store/apps/details?id=com.hawk.bouncestarblast");
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
},
onBtnShare: function() {
cc.log("share...");
var e = Math.floor(i.getInstance().playerObj.bestScore), t = cc.js.formatStr("It's funny,my best score is %d,try to challenge me!   %s", e, "https://play.google.com/store/apps/details?id=com.hawk.bouncestarblast");
c.share("Share", t);
},
onBtnRestore: function() {
cc.log("restore...");
IapTools.restorePurchase(function() {
cc.log("js restore suc.");
}, function(e) {
cc.log("js restore failed.");
});
},
onBtnPrivacy: function() {
cc.sys.openURL("http://tcl-icloudcdn.tclclouds.com/cloudSecurityBackend/game/201805/Privacy-Policy.html");
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClick);
}
});
cc._RF.pop();
}, {
"./../common/DataMgr": "DataMgr",
"./../common/FacebookMgr": "FacebookMgr",
"./../common/SwitchControl": "SwitchControl",
"./../common/UtilsCross": "UtilsCross",
"./../common/ViewBase": "ViewBase",
"./../net/HttpProxy": "HttpProxy",
"./../views/DialogCtrl": "DialogCtrl"
} ],
ShaderHelper: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "49d0auleM9GkaUgf+inMFoR", "ShaderHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, o = i.property, r = i.executeInEditMode, c = function() {
function e() {
this.key = "";
this.value = 0;
}
__decorate([ o({
readonly: !0
}) ], e.prototype, "key", void 0);
__decorate([ o(cc.Float) ], e.prototype, "value", void 0);
return e = __decorate([ a("ShaderProperty") ], e);
}();
n.ShaderProperty = c;
var s = cc.Enum({}), l = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._program = 0;
t._props = [];
t.material = null;
return t;
}
n = t;
Object.defineProperty(t.prototype, "program", {
get: function() {
return this._program;
},
set: function(e) {
if (this._program !== e) {
this._program = e;
this.applyEffect();
}
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "props", {
get: function() {
return this._props;
},
set: function(e) {
this._props = e;
this.applyEffect();
},
enumerable: !0,
configurable: !0
});
t.prototype.start = function() {
0;
};
t.prototype.applyEffect = function(e) {
var t = this.node.getComponent(cc.Sprite);
if (t) {
var i = n.effectAssets[e], a = new cc.Material();
!!i.shaders.find(function(e) {
return e.defines.find(function(e) {
return "USE_TEXTURE" === e.name;
});
}) && a.define("USE_TEXTURE", !0);
a.effectAsset = i;
a.name = i.name;
t.setMaterial(0, a);
this.material = t.getMaterial(0);
this.setProperty(i);
this.node.emit("effect-changed", this, this.material);
}
};
t.prototype.setProperty = function(e) {
var t = this;
this._props.length && this._props.forEach(function(e) {
return e.key && t.material.setProperty(e.key, e.value || 0);
});
cc.Class.Attr.setClassAttr(n, "props", "visible", !!this._props.length);
};
t.prototype.next = function() {
this.program = (this.program + 1) % n.effectAssets.length;
};
t.prototype.prev = function() {
0 !== this.program ? this.program = (this.program - 1) % n.effectAssets.length : this.program = n.effectAssets.length - 1;
};
var n;
t.effectAssets = null;
__decorate([ o ], t.prototype, "_program", void 0);
__decorate([ o({
type: s
}) ], t.prototype, "program", null);
__decorate([ o({
type: [ c ]
}) ], t.prototype, "_props", void 0);
__decorate([ o({
type: [ c ]
}) ], t.prototype, "props", null);
return t = n = __decorate([ a, r ], t);
}(cc.Component);
n.default = l;
cc.game.on(cc.game.EVENT_ENGINE_INITED, function() {
cc.dynamicAtlasManager.enabled = !1;
cc.loader.loadResDir("effect", cc.EffectAsset, function(e, t) {
l.effectAssets = t;
var n = l.effectAssets.map(function(e, t) {
return {
name: e._name,
value: t
};
});
cc.Class.Attr.setClassAttr(l, "program", "enumList", n);
});
});
cc._RF.pop();
}, {} ],
ShaderMouse: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0ed2cS4TFpGyo6y5mPlpF50", "ShaderMouse");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, o = i.executeInEditMode, r = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
var e = this;
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on("effect-changed", function(t, n) {
if (n.effect._properties.iResolution) {
var i = e.node.getBoundingBox().size;
n.effect.setProperty("iResolution", cc.v2(i.width, i.height));
e._material = n;
} else e._material = null;
}, this);
};
t.prototype.onDestroy = function() {
this.node.targetOff(this);
};
t.prototype._onTouchMove = function(e) {
this._material && this._material.effect.setProperty("mouse", e.getLocation());
};
return t = __decorate([ a, o ], t);
}(cc.Component);
n.default = r;
cc._RF.pop();
}, {} ],
ShaderNameLabel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4cd0ffQe75Ddod5dqnEgLHx", "ShaderNameLabel");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./ShaderHelper"), a = cc._decorator, o = a.ccclass, r = a.property, c = a.executeInEditMode, s = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.shaderHelper = null;
return t;
}
t.prototype.start = function() {
var e = this;
this.shaderHelper && setTimeout(function() {
var t = i.default.effectAssets[e.shaderHelper.program];
e.getComponent(cc.Label).string = t.name;
}, 1e3);
};
__decorate([ r(i.default) ], t.prototype, "shaderHelper", void 0);
return t = __decorate([ o, c ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {
"./ShaderHelper": "ShaderHelper"
} ],
ShaderTime: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5866cn/yXtO664c25gnwSdk", "ShaderTime");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, o = i.property, r = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._max = 65535;
t._start = 0;
return t;
}
Object.defineProperty(t.prototype, "max", {
get: function() {
return this._max;
},
set: function(e) {
this._max = e;
},
enumerable: !0,
configurable: !0
});
t.prototype.update = function(e) {
this._material = this.node.getComponent(cc.Sprite).sharedMaterials[0];
this.node.active && this._material && this._material.effect._properties.time && this._setShaderTime(e);
};
t.prototype._setShaderTime = function(e) {
var t = this._start;
t > this.max && (t = 0);
t += .02;
this._material.effect.setProperty("time", t);
this._start = t;
};
__decorate([ o ], t.prototype, "_max", void 0);
__decorate([ o ], t.prototype, "max", null);
return t = __decorate([ a ], t);
}(cc.Component);
n.default = r;
cc._RF.pop();
}, {} ],
ShejiaoPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "000d7uVI4JGWLDdcS0wtQ9E", "ShejiaoPanel");
cc.Class({
extends: cc.Component,
properties: {
icon_logo: [ cc.Sprite ],
label_description: [ cc.Label ]
},
onLoad: function() {
this.pageData = [ [ {
logo: "微信",
description: "微信",
bundleId: "1,com.tencent.mm,https://weixin.qq.com/"
}, {
logo: "fb",
description: "FB",
bundleId: "1,com.xxx.xxx,https://m.facebook.com/"
}, {
logo: "抖音",
description: "抖音",
bundleId: "1,com.ss.android.ugc.aweme,https://www.douyin.com/recommend"
}, {
logo: "SOUL",
description: "Soul",
bundleId: "1,cn.soulapp.android,https://www.soulapp.cn/"
} ], [ {
logo: "陌陌",
description: "陌陌",
bundleId: "1,com.immomo.momo,http://www.immomo.com/"
}, {
logo: "",
description: "尽请期待"
}, {
logo: "",
description: "尽请期待"
}, {
logo: "",
description: "尽请期待"
} ], [ {
logo: "",
description: "尽请期待"
}, {
logo: "",
description: "尽请期待"
}, {
logo: "",
description: "尽请期待"
}, {
logo: "",
description: "尽请期待"
} ] ];
this.curPageData = [];
this.setPageData({
target: {
name: 0
}
});
},
start: function() {},
setPageData: function(e) {
for (var t = this, n = this.curPageData = this.pageData[parseInt(e.target.name)], i = function(e) {
"" != n[e].logo ? cc.loader.loadRes("imgs/" + n[e].logo, cc.SpriteFrame, function(n, i) {
n || (t.icon_logo[e].spriteFrame = i);
}) : t.icon_logo[e].spriteFrame = null;
t.label_description[e].string = n[e].description;
"尽请期待" == n[e].description ? t.label_description[e].node.opacity = 178 : t.label_description[e].node.opacity = 255;
}, a = 0; a < n.length; a++) i(a);
},
jumpTo: function(e, t) {
if (this.curPageData[parseInt(t)] && this.curPageData[parseInt(t)].bundleId) {
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.curPageData[parseInt(t)].bundleId) || Global.PageMgr.showTipPage("跳转失败");
}
}
});
cc._RF.pop();
}, {} ],
ShengJia: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "727a9pGNCVOuYdeKRTWdjrx", "ShengJia");
cc.Class({
extends: cc.Component,
properties: {
item: cc.Prefab
},
onLoad: function() {
cc.director.on("UpdateUserData", this.UpdateUserData, this);
this.UpdateUserData();
var e = this.node.getChildByName("dian1").getComponent(cc.Animation), t = this.node.getChildByName("dian2").getComponent(cc.Animation);
e.play();
t.play();
setInterval(function() {
e.play();
t.play();
}, 5e3);
var n = cc.instantiate(this.item);
n.parent = this.node;
var i = cc.repeatForever(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(1, cc.v2(0, -20))));
setTimeout(function() {
n.runAction(i);
}, 1e3 * Math.random());
n.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
var t = e.getLocation();
n.position = n.parent.convertToNodeSpaceAR(t);
});
var a = cc.repeatForever(cc.sequence(cc.moveBy(2, cc.v2(0, 20)), cc.moveBy(2, cc.v2(0, -20))));
this.node.getChildByName("圆顶").runAction(a);
},
goSheQu: function() {
cc.director.loadScene("ECC", function() {});
},
UpdateUserData: function() {
this.node.getChildByName("ZuanShi").getChildByName("Text").getComponent(cc.Label).string = "钻石：0.00";
this.node.getChildByName("DongLi").getChildByName("Text").getComponent(cc.Label).string = "动力：30";
},
start: function() {}
});
cc._RF.pop();
}, {} ],
ShopPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6b7c9lAj/xI34/ek7+ovVo/", "ShopPanel");
var i = e("../../Util/appScript");
cc.Class({
extends: cc.Component,
properties: {
NFT_item: cc.Prefab,
XHP_item: cc.Prefab,
container: cc.Node,
label_Usdt: cc.Label,
btn_item: [ cc.Sprite ]
},
onEnable: function() {
var e = this;
this.getShopList(null, 0);
i.Post("member/getMemberInfo", {}, function(t) {
200 == t.code && t.data && (e.label_Usdt.string = t.data.totalUsdt);
});
},
getShopList: function(e, t) {
var n = this;
this.btn_item.forEach(function(e) {
e.spriteFrame = null;
});
cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function(e, i) {
e || (n.btn_item[parseInt(t)].spriteFrame = i);
});
this.container.removeAllChildren();
switch (parseInt(t)) {
case 0:
Global.PageMgr.onClosePage(6);
Global.ProtocolMgr.queryNFTList(function(e) {
console.log(e);
if (200 == e.code) for (var t = e.data, i = 0; i < t.length; i++) {
var a = cc.instantiate(n.NFT_item);
a.getComponent("NFT_item").setData(t[i]);
n.container.addChild(a);
} else Global.PageMgr.showTipPage(e.message);
});
break;

case 1:
Global.PageMgr.onClosePage(6);
Global.ProtocolMgr.queryXHPList(function(e) {
console.log(e);
if (200 == e.code) for (var t = e.data, i = 0; i < t.length; i++) {
var a = cc.instantiate(n.XHP_item);
a.getComponent("XHP_item").setData(t[i]);
n.container.addChild(a);
} else Global.PageMgr.showTipPage(e.message);
});
break;

case 2:
Global.PageMgr.onOpenPage(6);
}
},
onDisable: function() {
cc.find("Canvas/" + Global.pages[6]).active = !1;
}
});
cc._RF.pop();
}, {
"../../Util/appScript": "appScript"
} ],
ShopUserDataPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee544AD7o5MYbfEDunnwC2/", "ShopUserDataPanel");
cc.Class({
extends: cc.Component,
properties: {
label_lifeValue: cc.Label,
label_coinValue: cc.Label,
label_diamondValue: cc.Label
},
onLoad: function() {
cc.director.GlobalEvent.on("UpdateUserData", this.UpdateUserData, this);
},
start: function() {},
UpdateUserData: function(e) {
this.label_coinValue.string = e.totalUsdt;
this.label_diamondValue.string = e.totalCoinOne;
console.log("-------------UpdateUserData2-------------------");
},
onDestroy: function() {
cc.director.GlobalEvent.off("UpdateUserData");
}
});
cc._RF.pop();
}, {} ],
SliderExt: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b020a6TORdAnp2rUnHIvkEE", "SliderExt");
var i = cc.Enum({
Horizontal: 0,
Vertical: 1
});
cc.Class({
extends: cc.Slider,
properties: {
barSprite: {
default: null,
type: cc.Sprite,
notify: function() {
0;
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function(e) {
this._updateDisabledState();
}
},
interactable: {
default: !0,
tooltip: !1,
notify: function(e) {
this._updateDisabledState();
}
}
},
_handleSliderLogic: function(e) {
if (this.interactable) {
this._updateProgress(e);
this._emitSlideEvent();
}
},
_updateDisabledState: function() {
if (this.handle) {
this.handle.enableAutoGrayEffect = this.enableAutoGrayEffect;
this.handle.interactable = this.interactable;
}
this.barSprite && this.barSprite._sgNode.setState(0);
this.enableAutoGrayEffect && this.barSprite && !this.interactable && this.barSprite._sgNode.setState(1);
},
_updateHandlePosition: function() {
if (this.handle) {
var e = void 0;
e = this.direction === i.Horizontal ? cc.p(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0) : cc.p(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
var t = this.node.convertToWorldSpaceAR(e);
this.handle.node.position = this.handle.node.parent.convertToNodeSpaceAR(t);
this._updateBarSprite();
}
},
_updateProgress: function(e) {
if (this.handle) {
var t = null, n = 0, a = this.node.convertTouchToNodeSpaceAR(e);
if (this.direction === i.Horizontal) {
t = this.node.width / 2 - this.handle.node.width * this.handle.node.anchorX;
n = cc.clamp01((a.x + t) / (2 * t), 0, 1);
} else if (this.direction === i.Vertical) {
t = this.node.height / 2 - this.handle.node.height * this.handle.node.anchorY;
n = cc.clamp01((a.y + t) / (2 * t), 0, 1);
}
this.progress = n;
this._updateBarSprite();
}
},
_updateBarSprite: function() {
if (this.barSprite) {
var e = this.node.width * this.progress;
this.barSprite.node.width = e;
this.barSprite.node.x = this.barSprite.node.anchorX * this.barSprite.node.width - this.node.width * this.node.anchorX;
}
}
});
cc._RF.pop();
}, {} ],
SlotPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "41e97OrWRZCPJ87P+r9Al+y", "SlotPanel");
cc.Class({
extends: cc.Component,
properties: {
list: {
type: cc.Node,
default: []
},
Content: {
type: cc.Node,
default: null
},
item: {
type: cc.Prefab,
default: null
},
slot: {
type: cc.Prefab,
default: null
}
},
onLoad: function() {
var e = this;
if (void 0 == Global.ResourceMgr) {
Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr");
Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr");
Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr");
}
this.list.forEach(function(t) {
for (var n = 0; n < 72; n++) {
var i = cc.instantiate(e.slot);
i.parent = t;
var a = dataFunc.randomNum(0, 9), o = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[a]);
i.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = o;
}
});
this.winners = [];
this.clickState = 1;
this.currentWager = 0;
cc.director.GlobalEvent.on("updateWager", this.updateWager, this);
cc.director.GlobalEvent.on("slotUserData", this.updateUserData, this);
Global.ProtocolMgr.slotUserData();
this.height = 0;
this.timer = 0;
},
updateWager: function() {
this.node.getChildByName("JiaZhu").getChildByName("BeiShu").getComponent(cc.Label).string = this.currentWager;
},
addWager: function() {
if (this.clickState) {
this.currentWager += 5;
cc.director.GlobalEvent.emit("updateWager", {});
}
},
minusWager: function() {
if (this.currentWager >= 5 && this.clickState) {
this.currentWager -= 5;
cc.director.GlobalEvent.emit("updateWager", {});
}
},
updateUserData: function() {
this.node.getChildByName("User").getChildByName("value").getComponent(cc.Label).string = GameData.SlotUserData.dssc;
},
startSlot: function() {
var e = this;
if (this.clickState) {
this.data = 0;
Global.ProtocolMgr.slotResult(this.currentWager, function(t) {
if (200 == t.code) {
e.data = t.data.rewardLevel;
GameData.SlotUserData.dssc = t.data.amount;
e.message = t.data.message;
e.clickState = 0;
e.result = dataFunc.randomNum(0, 8);
e.num = dataFunc.randomNum(1, 3);
for (;;) {
e.result2 = dataFunc.randomNum(0, 8);
if (e.result2 != e.result) break;
}
e.numList = [];
for (;e.numList.length < 3; ) {
var n = dataFunc.randomNum(0, 9);
-1 == e.numList.indexOf(n) && e.numList.push(n);
}
e.startAnim(e.list[0], 0);
cc.audioEngine.play(Global.ResourceMgr.slotClip[0], !1, 1);
setTimeout(function() {
e.startAnim(e.list[1], 1);
}, 200);
setTimeout(function() {
e.startAnim(e.list[2], 2);
}, 400);
} else Global.PageMgr.showTipPage(t.message);
});
} else Global.PageMgr.showTipPage("游戏已开始");
},
start: function() {
GameData.audio = 1;
},
startAnim: function(e, t) {
var n = this;
e.y = 0;
var i = e.children, a = void 0;
if (3 == this.data) a = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[9]); else if (2 == this.data) {
console.log("二等奖");
a = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result]);
} else if (1 == this.data) {
console.log("三等奖", Global.ResourceMgr.SlotTexture[this.result]);
a = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result]);
e.parent.name == "item" + this.num && (a = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.result2]));
} else a = new cc.SpriteFrame(Global.ResourceMgr.SlotTexture[this.numList[t]]);
i[i.length - 2].getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = a;
var o = cc.sequence(cc.moveBy(5, cc.v2(0, 540 - e.height)).easing(cc.easeQuadraticActionInOut()), cc.callFunc(function() {
if (2 === t) {
cc.audioEngine.pauseAll();
0 !== n.data ? cc.audioEngine.play(Global.ResourceMgr.slotClip[1], !1, 1) : cc.audioEngine.play(Global.ResourceMgr.slotClip[2], !1, 1);
n.clickState = 1;
n.updateUserData();
Global.PageMgr.showTipPage(n.message);
}
}));
e.y = -270;
e.runAction(o);
},
closeGames: function() {
this.node.destroy();
},
onDestroy: function() {
cc.director.GlobalEvent.off("updateWager");
cc.director.GlobalEvent.off("slotUserData");
cc.director.loadScene("Dssc", function() {
Global.ResourceMgr.playBgAudio();
console.log("切换场景");
});
},
update: function(e) {
var t = this;
if (this.Content.height >= 275) {
this.Content.y - 150 >= this.Content.height && (this.Content.y = 150);
this.Content.y += 50 * e;
}
this.timer += e;
if (this.timer > 1) {
this.timer = 0;
Global.ProtocolMgr.slotRecord(function(e) {
if (200 == e.code) {
t.height = 0;
for (var n = e.data, i = n.length - 1; i > t.winners.length - 1; i--) {
var a = cc.instantiate(t.item);
a.parent = t.Content;
a.getChildByName("time").getComponent(cc.Label).string = n[i].time.substring(5, 16);
a.getChildByName("gain").getComponent(cc.Label).string = n[i].reward;
a.getChildByName("phone").getComponent(cc.Label).string = n[i].nickname;
}
t.winners = n;
}
});
}
}
});
cc._RF.pop();
}, {} ],
SocketMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3774dhqdoBGVZfubycSRX9U", "SocketMgr");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.handle = [];
cc.game.addPersistRootNode(this.node);
Global.SocketMgr = this.node.getComponent("SocketMgr");
},
openSocket: function() {
this.ws = new WebSocket(Config.socketUrl + "/websocket/Bearer " + this.GetQueryVariable("token"));
this.ws.onopen = function() {
console.log("已连接");
};
this.ws.onmessage = function(e) {
var t = JSON.parse(e.data);
console.log(t);
switch (t.event) {
case "USER_REFRESH":
GameData.HongBaoUserData = t.data;
cc.director.GlobalEvent.emit("HongBaoUserData", {});
break;

case "START":
GameData.CurHongBao = t.data;
cc.director.GlobalEvent.emit("CurHongBaoData", {});
break;

case "TIME_REFRESH":
GameData.CountDown = t.data.time;
cc.director.GlobalEvent.emit("CountDown", {});
GameData.KaiJiangList = t.data.data;
cc.director.GlobalEvent.emit("KaiJiangList", {});
break;

case "SETTLEMENT_START":
GameData.ReadParkSinl = 0;
break;

case "SETTLEMENT_END":
GameData.KaiJiangList = t.data.members;
GameData.HongBaoJieGuo = t.data.bankerProFit;
cc.director.GlobalEvent.emit("KaiJiangList", {});
cc.director.GlobalEvent.emit("KaiJiang", {});
break;

case "RED_REFRESH":
GameData.HongBaoList = t.data;
cc.director.GlobalEvent.emit("HongBaoListData", {});
break;

case "ABOUT_TO_BEGIN_MAINTENANCE":
console.log(t);
Global.PageMgr.showTipPage("服务器即将开始维护");
break;

default:
return;
}
};
this.ws.onclose = function() {
console.log("连接已关闭...");
};
},
closeSocket: function(e) {
this.ws.close();
e();
},
start: function() {},
GetQueryVariable: function(e) {
for (var t = window.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
var i = t[n].split("=");
if (i[0] == e) return i[1];
}
return !1;
}
});
cc._RF.pop();
}, {} ],
SpriteFrameSet: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
var i = cc.Class({
name: "SpriteFrameSet",
properties: {
language: "",
spriteFrame: cc.SpriteFrame
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
SpriteRemote: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f93b9VEGo1NFKnj3jl8TuM8", "SpriteRemote");
cc.Class({
extends: cc.Sprite,
properties: {
imgAddr: "",
spSize: cc.Size
},
onLoad: function() {
this._newSpFrame = null;
this.imgAddr && this.imgAddr.length > 0 && this.setSPLink(this.imgAddr);
},
setSPLink: function(e) {
if (e && e.length > 0) {
this.imgAddr = e;
cc.loader.load(this.imgAddr, function(e) {
cc.log("~~~~~SpriteRemote progress:" + e);
}, function(e, t) {
if (e) cc.log("~~~~~SprieRemote error:" + e); else {
this._newSpFrame = new cc.SpriteFrame(t);
if (this.node) {
var n = this.node.width, i = this.node.height;
this.getComponent(cc.Sprite).spriteFrame = this._newSpFrame;
this.node.width = this.spSize.width ? this.spSize.width : n;
this.node.height = this.spSize.height ? this.spSize.height : i;
}
}
}.bind(this));
}
}
});
cc._RF.pop();
}, {} ],
SwitchControl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3d915DioGxOC6wlj6B9/lLu", "SwitchControl");
cc.Class({
extends: cc.Component,
properties: {
isOn: {
default: !0,
notify: function() {
this._updateState();
}
},
interactable: !0,
bgOnSp: cc.Sprite,
bgOffSp: cc.Sprite,
barSp: cc.Sprite,
switchEvents: {
default: [],
type: cc.Component.EventHandler
}
},
_updateState: function() {
this.isOn ? this.barSp.node.x = this.bgOffSp.node.x + 10 : this.barSp.node.x = this.bgOnSp.node.x - 10;
},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
},
onClick: function(e) {
if (this.interactable) {
this.isOn = !this.isOn;
this.switchEvents && cc.Component.EventHandler.emitEvents(this.switchEvents, this);
}
},
start: function() {}
});
cc._RF.pop();
}, {} ],
TiXianPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3360b4iNflPDrxHJSEE+41e", "TiXianPanel");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {}
});
cc._RF.pop();
}, {} ],
TipsPage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6d876ZRWYpHtqDXn7aDfItO", "TipsPage");
cc.Class({
extends: cc.Component,
properties: {
text: cc.Node,
text2: cc.Node
},
showPage: function(e, t) {
this.node.active = !0;
var n = cc.sequence(cc.moveBy(1, cc.v2(0, 30)), cc.fadeOut(.1), cc.callFunc(this.closePage, this));
this.node.runAction(n);
this.text.getComponent(cc.Label).string = t;
this.text2.getComponent(cc.Label).string = t;
},
setText: function(e) {
this.text.getComponent(cc.Label).string = e;
this.text2.getComponent(cc.Label).string = e;
},
onEnable: function() {},
closePage: function() {
this.node.y = 0;
this.node.active = !1;
this.node.destroy();
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Tip: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d6853XDnZZA1Iq7Sh+4EBEX", "Tip");
cc.Class({
extends: cc.Component,
properties: {
text: cc.Node
},
onLoad: function() {
var e = cc.repeatForever(cc.sequence(cc.moveBy(.5, cc.v2(0, -30)), cc.moveBy(.5, cc.v2(0, 30))));
this.node.runAction(e);
setInterval(function() {}, 1e3);
this.tag = [];
this.tag["获得E金币"] = "getEGold";
this.tag["去社区"] = "backToMain";
},
start: function() {},
setItem: function(e) {
this.item = this.tag[e];
this.text.getComponent(cc.Label).string = e;
},
update: function(e) {
1 == cc.sys.localStorage.getItem(this.item) && this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
ToastCtrl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6f834FCZQNNhrho1fz+oZW6", "ToastCtrl");
var i = e("./../common/ViewBase"), a = e("./../common/ViewMgr");
cc.Class({
extends: i,
properties: {
content: cc.Label,
bg: cc.Node
},
initView: function(e, t, n) {
this.content.string = e;
this._cb = n;
this._t = t;
},
_rmSelf: function() {
this._cb && this._cb();
this.node.removeFromParent(!0);
this.node.destroy();
},
start: function() {
this._t = this._t ? this._t : 1;
this.scheduleOnce(this._rmSelf, this._t);
}
}).showText = function(e, t, n) {
t = t || 1;
var i = cc.instantiate(GlobalNiuNiu.assetMgr.toastPrefab);
i.getComponent("ToastCtrl").initView(e, t, n);
a.getInstance().pushViewImmediate(i);
};
cc._RF.pop();
}, {
"./../common/ViewBase": "ViewBase",
"./../common/ViewMgr": "ViewMgr"
} ],
Toast: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9ba090Sh+1Hd6rgupzF25yx", "Toast");
var i = {
LENGTH_LONG: 3.5,
LENGTH_SHORT: 2,
CENTER: 0,
TOP: 1,
TOP_LEFT: 2,
LEFT: 3,
BOTTOM_LEFT: 4,
BOTTOM: 5,
BOTTOM_RIGHT: 6,
RIGHT: 7,
TOP_RIGHT: 8
}, a = cc.Class({
ctor: function() {
this._text = "";
this._duration = 0;
this._gravity = i.CENTER;
},
show: function(e, t, n) {
this._text = e;
this._duration = t;
this._gravity = n;
var a = this;
if (void 0 != i.bgSpriteFrame) {
var o = cc.director.getScene().getComponentInChildren(cc.Canvas), r = o.node.width, c = o.node.height;
void 0 === this._duration && (this._duration = i.LENGTH_SHORT);
var s = new cc.Node();
s.opacity = 240;
s.color = cc.Color.BLACK;
var l = s.addComponent(cc.Sprite);
l.type = cc.Sprite.Type.SLICED;
var u = s.addComponent(cc.Layout);
u.resizeMode = cc.Layout.ResizeMode.CONTAINER;
var d = new cc.Node(), h = d.addComponent(cc.Label);
h.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
h.verticalAlign = cc.Label.VerticalAlign.CENTER;
h.fontSize = 30;
h.string = this._text;
var g = h.fontSize / 8;
u.paddingLeft = g;
u.paddingRight = g;
u.paddingTop = 2;
u.paddingBottom = 2;
if (this._text.length * h.fontSize > r / 3 * 2) {
d.width = r / 3 * 2;
h.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
}
s.addChild(d);
i.bgSpriteFrame && (l.spriteFrame = i.bgSpriteFrame);
if (this._gravity == i.CENTER) {
d.y = 0;
d.x = 0;
} else if (this._gravity == i.TOP) d.y = d.y + c / 5 * 2; else if (this._gravity == i.TOP_LEFT) {
d.y = d.y + c / 5 * 2;
d.x = d.x + r / 5;
} else if (this._gravity == i.LEFT) d.x = d.x + r / 5; else if (this._gravity == i.BOTTOM_LEFT) {
d.y = d.y - c / 5 * 2;
d.x = d.x + r / 5;
} else if (this._gravity == i.BOTTOM) d.y = d.y - c / 5 * 2; else if (this._gravity == i.BOTTOM_RIGHT) {
d.y = d.y - c / 5 * 2;
d.x = d.x - r / 5;
} else if (this._gravity == i.RIGHT) d.x = d.x - r / 5; else if (this._gravity == i.TOP_RIGHT) {
d.y = d.y + c / 5 * 2;
d.x = d.x - r / 5;
} else d.y = d.y - c / 5 * 2;
o.node.addChild(s);
var f = cc.callFunc(function(e) {
s.destroy();
}, a), p = cc.sequence(cc.delayTime(this._duration), cc.fadeOut(.3), f);
s.runAction(p);
} else cc.loader.loadRes("singleColor", cc.SpriteFrame, function(o, r) {
if (o) cc.error(o); else {
i.bgSpriteFrame = r;
i.bgSpriteFrame.insetTop = 3;
i.bgSpriteFrame.insetBottom = 3;
i.bgSpriteFrame.insetLeft = 4;
i.bgSpriteFrame.insetRight = 4;
a.show(e, t, n);
}
});
}
});
i.showText = function(e, t, n) {
new a().show(e, t, n);
};
t.exports = i;
cc._RF.pop();
}, {} ],
TradingFloor: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1e6fczSv6dAZY+R5OKvfH5B", "TradingFloor");
cc.Class({
extends: cc.Component,
properties: {
SubPanel: {
type: cc.Node,
default: []
},
JiaoYiItem: {
type: cc.Prefab,
default: null
},
JiaoYiConTent: {
type: cc.Node,
default: null
},
SubPage: {
type: cc.Node,
default: []
}
},
onLoad: function() {},
UpdateJiaoYiData: function() {
[].forEach(function(e) {
var t = cc.instantiatethis(JiaoYiItem);
t.getChildByName("Number").getComponent(cc.Label).string = 1;
t.getChildByName("Price").getComponent(cc.Label).string = 1;
t.getChildByName("Button").getChildByName("button").on(cc.Node.EventType.TOUCH_END, function() {});
});
},
Toggle: function(e) {
e.node.parent.children.forEach(function(e) {
e.getChildByName("Text").color = new cc.color(255, 255, 255);
});
e.node.getChildByName("Text").color = new cc.color(138, 55, 249);
this.SubPanel.forEach(function(e) {
e.active = !1;
});
this.SubPanel[parseInt(e.node.name)].active = !0;
},
closePage: function() {
Global.PageMgr.onClosePage(8, 1);
},
showSubPage: function() {
var e = cc.moveTo(.2, cc.v2(0, 0));
this.SubPage[0].active = !0;
this.SubPage[0].runAction(e);
},
closeSubPage: function() {
var e = cc.moveTo(.2, cc.v2(1060, 0), cc.callFunc(function() {
this.SubPage[0].active = !1;
}, this));
this.SubPage[0].runAction(e);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
TreasureBox: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0b9c7AIRBtASbRJbSeNesU2", "TreasureBox");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {}
});
cc._RF.pop();
}, {} ],
TurntableMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1d8b1mXi9VEd6NGyE5BVmaP", "TurntableMgr");
cc.Class({
extends: cc.Component,
properties: {
boolRandom: {
default: !1,
displayName: "随机位置",
tooltip: "确定结果区域后,是否在该区域内随机落下"
},
intTotalPrize: {
default: 6,
type: cc.Integer,
displayName: "奖品/区域总数",
tooltip: "游戏总奖品数"
},
intResultId: {
default: 1,
type: cc.Integer,
displayName: "奖品/目标Id",
tooltip: "中奖奖品"
},
floatAccelerated: {
default: 720,
type: cc.Float,
displayName: "加速度",
tooltip: "加速度值,每秒速度增加几度,°/s²"
},
floatDeceleration: {
default: -270,
type: cc.Float,
displayName: "减速度",
tooltip: "加速度值,每秒速度减少几度,°/s²"
},
floatMaxRangeSpeed: {
default: 1080,
type: cc.Float,
displayName: "最大速度",
tooltip: "每秒速度减少几度,°/s"
}
},
initProperties: function() {
this._range = 360;
this._currentRotationSpeed = 0;
this._targetRotation = 0;
this._turntableBg = this.node.getChildByName("TurntableBg");
this.intResultId <= 0 || this.intTotalPrize < this.intResultId || this.intTotalPrize;
this.intResultId = this.intTotalPrize + 1 - this.intResultId;
this._interval = .02;
},
onLoad: function() {
this.initProperties();
},
onRandomPlace: function() {
cc.log("随机该区域内位置");
return (Math.random() - .5) * this._range / (this.intTotalPrize + 2);
},
onStart: function() {
Global.PageMgr.showTipPage("每周六由官方统一抽奖", 2);
},
onStop: function() {
void 0 == this._currentState || 0 == this._currentState ? cc.log("转盘已经停止...") : this.unschedule(this.updateRotation);
},
onVirtualCompute: function() {
for (var e = 0, t = this.floatMaxRangeSpeed; t > 0; ) {
e += t * this._interval;
t += this._interval * this.floatDeceleration;
}
return e;
},
onGetValue: function(e) {
var t = e - this.onVirtualCompute();
if (t > 0) for (;t >= 360; ) t -= this._range; else for (;t < 0; ) t += this._range;
return t;
},
detectionAngle: function() {
var e = this._range / this.intTotalPrize * this.intResultId;
this.boolRandom && (e += this.onRandomPlace());
var t = this.onGetValue(e);
this._turntableBg.rotation = t;
this._currentState = 2;
},
updateRotation: function() {
switch (this._currentState) {
case 0:
break;

case 1:
if (this._currentRotationSpeed >= this.floatMaxRangeSpeed) {
this._currentRotationSpeed = this.floatMaxRangeSpeed;
this.detectionAngle();
} else this._currentRotationSpeed += this.floatAccelerated * this._interval;
break;

case 2:
if (this._currentRotationSpeed <= 0) {
this._currentRotationSpeed = 0;
this._currentState = 0;
} else this._currentRotationSpeed += this.floatDeceleration * this._interval;
break;

default:
this._currentRotationSpeed = 0;
this._currentState = 0;
}
cc.log("当前旋转速度 : ", this._currentRotationSpeed);
var e = this._currentRotationSpeed * this._interval;
cc.log("当前转盘转动速度" + e + "°/" + this._interval + "s");
this._turntableBg.rotation += e;
},
onDestroy: function() {
this.node.onDestroy();
}
});
cc._RF.pop();
}, {} ],
UiUpdater: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6bea9e70DdDKYGKRZQO+Ors", "UiUpdater");
var i = e("./DataMgr");
cc.Class({
ctor: function() {},
updateUserCoins: function(e) {
void 0 !== e && null !== e || (e = i.getInstance().playerObj.coins);
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_USER_COINS_CHANGED, e);
},
updateTips: function() {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_TIPS_UPDATE);
}
});
cc._RF.pop();
}, {
"./DataMgr": "DataMgr"
} ],
UtilsCross: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "75324xmCH9J7qPe4IwqrYIj", "UtilsCross");
var i = i || {};
i.pushLocalNotification = function(e, t, n, i, a) {
if (cc.sys.isNative) {
void 0 === i && (i = !1);
var o = "";
cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD ? o = jsb.reflection.callStaticMethod("HKLocalNotification", "pushLocalNoti:message:withSecond:repeats:key:", e, t, n, i, a) : cc.sys.platform == cc.sys.ANDROID && (o = jsb.reflection.callStaticMethod("com/hawk/utils/UtilNotification", "s_postNotification", "(Ljava/lang/String;Ljava/lang/String;IZLjava/lang/String;)V", e, t, n, i, a));
return o;
}
cc.log("only native can use iap.");
};
i.getAppVersion = function() {
var e = "V";
return e += cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD ? jsb.reflection.callStaticMethod("UtilsNative", "getAppVersion") : cc.sys.platform == cc.sys.ANDROID ? jsb.reflection.callStaticMethod("com/hawk/utils/ConfigManager", "getPackageVersionStatic", "()Ljava/lang/String;") : "1.0.0";
};
i.loadServerTime = function() {
cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD || cc.sys.platform == cc.sys.ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loadServerTime", "()V");
};
i.getUID = function() {
var e = "";
e = cc.sys.platform === cc.sys.ANDROID ? jsb.reflection.callStaticMethod("com/hawk/utils/ConfigManager", "getDeviceIDStatic", "()Ljava/lang/String;") : new Date().toUTCString();
cc.log("uid: " + e);
return e;
};
i.rmAndroidSplash = function() {
var e = "";
cc.sys.platform === cc.sys.ANDROID && (e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "rmSplashView", "()V"));
return e;
};
i.share = function(e, t) {
var n = "";
cc.sys.platform === cc.sys.ANDROID && (n = jsb.reflection.callStaticMethod("com/hawk/utils/ConfigManager", "share", "(Ljava/lang/String;Ljava/lang/String;)V", e, t));
return n;
};
i.trackEvent = function(e, t) {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/ConfigManager", "trackEvent", "(Ljava/lang/String;Ljava/lang/String;)V", e, t) : cc.log("only native can trackEvent.");
};
i.trackEvent_FB = function(e, t) {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/ConfigManager", "trackEvent_FB", "(Ljava/lang/String;Ljava/lang/String;)V", e, t) : cc.log("only native can trackEvent_FB.");
};
i.loadAdRewardVideo = function() {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdRewardVideoMgr", "loadAdStatic", "()V") : cc.log("only native can loadAdRewardVideo.");
};
i.isAdRewardVideoLoaded = function() {
if (!cc.sys.isNative) {
cc.log("only native can isAdRewardVideoLoaded.");
return !1;
}
return cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdRewardVideoMgr", "isAdLoadedStatic", "()Z");
};
i.showAdRewardVideo = function() {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdRewardVideoMgr", "showStatic", "()V") : cc.log("only native can showAdRewardVideo.");
};
i.loadAdInterstitial = function() {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdInterstitialMgr", "loadAdStatic", "()V") : cc.log("only native can loadAdInterstitial.");
};
i.isAdInterstitialLoaded = function() {
if (!cc.sys.isNative) {
cc.log("only native can isAdInterstitialLoaded.");
return !1;
}
return cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdInterstitialMgr", "isAdLoadedStatic", "()Z");
};
i.showAdInterstitial = function() {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdInterstitialMgr", "showStatic", "()V") : cc.log("only native can showAdInterstitial.");
};
i.showAdBanner = function() {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdBannerMgr", "showStatic", "()V") : cc.log("only native can showAdBanner.");
};
i.hideAdBanner = function() {
cc.sys.isNative ? cc.sys.platform === cc.sys.ANDROID && jsb.reflection.callStaticMethod("com/hawk/utils/AdBannerMgr", "hideStatic", "()V") : cc.log("only native can hideAdBanner.");
};
i.closeAdRewardVideo = function(e) {
cc.log("关闭激励视频广告");
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_CLOSE_AD_REWARD_VIDEO, e);
};
i.adRewardVideoLoaded = function() {
GlobalNiuNiu.eventMgr.emit(GlobalNiuNiu.config.EVENT_AD_REWARD_VIDEO_LOADED);
};
t.exports = i;
cc._RF.pop();
}, {} ],
UtilsOther: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7809f7t8zJNAIaSlG+sRWg8", "UtilsOther");
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("./../encrypt/Md5"), o = e("./CSVParser"), r = r || {};
r.arrayRmObj = function(e, t) {
var n = e.indexOf(t);
e.splice(n, 1);
};
r.arrayPopByIdx = function(e, t) {
var n = e[t];
e.splice(t, 1);
return n;
};
r.valueInArray = function(e, t) {
for (var n = e.length, i = 0; i < n; i++) if (e[i] == t) return !0;
return !1;
};
r.arrayRandomValue = function(e) {
var t = e.length;
return t <= 0 ? null : e[r.randomInteger(0, t - 1)];
};
r.shuffle = function(e) {
var t = void 0, n = void 0, i = void 0;
for (t = e.length - 1; t > 0; t--) {
n = Math.floor(Math.random() * (t + 1));
i = e[t];
e[t] = e[n];
e[n] = i;
}
return e;
};
r.clearArrayValue = function(e, t, n) {
for (var i = 0; i < t; i++) e[i] = n;
};
r.createObjectWithArray = function(e, t) {
var n = {};
for (var i in e) n[e[i]] = t;
return n;
};
r.arrayToDict = function(e, t) {
var n = {}, i = null;
for (var a in e) n[(i = e[a])[t]] = i;
return n;
};
r.dictToArray = function(e) {
var t = [];
for (var n in e) e.hasOwnProperty(n) && e[n] && t.push(e[n]);
return t;
};
r.objectToArrayExcludeNumber = function(e, t, n) {
var i = void 0;
i = isArray(t) ? t : [];
var a = void 0;
if (isNumber(n)) {
var o = n.toString();
for (a in e) e.hasOwnProperty(a) && e[a] && o != a && i.push(e[a]);
} else for (a in e) e.hasOwnProperty(a) && e[a] && i.push(e[a]);
return i;
};
r.splitWithValueType = function(e, t, n) {
void 0 === n && (n = ",");
var i = e.split(n);
i.forEach(function(e, n, i) {
try {
i[n] = t(e);
} catch (e) {
i[n] = null;
}
});
return i;
};
r.time = function() {
return parseInt(Date.now() / 1e3);
};
r.time2second = function(e, t, n, i, a, o) {
var r = new Date(e, t - 1, n, i, a, o).getTime();
return parseInt(r / 1e3);
};
r.getTimeAfterDays = function(e, t) {
cc.assert(e, "getTimeForDayAfterDays:time is null!");
var n = null;
n = cc.isNumber(e) ? new Date(1e3 * e) : new Date(e);
return new Date(n.getTime() + 24 * t * 60 * 60 * 1e3);
};
r.getDaysDiff = function(e, t) {
cc.assert(e && t, "getDaysDiff: date must be not null!");
var n;
e = r.isNumber(e) ? new Date(1e3 * e) : new Date(e);
t = r.isNumber(t) ? new Date(1e3 * t) : new Date(t);
var i = new Date(e.getFullYear(), e.getMonth(), e.getDate()), a = new Date(t.getFullYear(), t.getMonth(), t.getDate());
n = parseInt(Math.abs(a - i) / 1e3 / 60 / 60 / 24);
return n *= a >= i ? 1 : -1;
};
r.getTimeForDay = function(e) {
return (e = e ? cc.isNumber(e) ? new Date(1e3 * e) : new Date(e) : new Date()).getFullYear() + "-" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-" + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate());
};
r.formatTime = function(e) {
var t = void 0;
if (e >= 0) {
var n = Math.floor(e / 3600), i = Math.floor(e / 60) % 60, a = e % 60, o = parseInt(n / 24);
if (1 == o) return o + " day";
if (o > 1) return o + " days";
t = o > 0 ? o + "day " + ("00" + (n -= 24 * o)).slice(-2) + ":" : n > 0 ? ("00" + n).slice(-2) + ":" : "";
i < 10 && (t += "0");
t += i + ":";
a < 10 && (t += "0");
t += parseInt(a);
}
return t;
};
r.getThousandSeparatorString = function(e) {
return e.toString().split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
};
r.getKMBString = function(e) {
return this.isNumber(e) ? e / 1e9 >= 1 ? this.getThousandSeparatorString(e / 1e9) + "B" : e / 1e6 >= 1 ? this.getThousandSeparatorString(e / 1e6) + "M" : e / 1e4 >= 1 ? this.getThousandSeparatorString(e / 1e3) + "K" : this.getThousandSeparatorString(e) : e;
};
r.getLastCutOffDay = function(e, t) {
var n = t - e;
return n < 0 ? -1 : n = parseInt(n / 86400);
};
r._dumpObject = function(e, t, n, i, a, o) {
if (!(r.D(o) && n > o)) {
var c = void 0, s = void 0, l = void 0, u = void 0, d = void 0;
switch (Object.prototype.toString.call(t).slice(8, -1)) {
case "Number":
case "String":
c = '"' + t.toString() + '"';
e && (c = e + c);
m(c, n, i);
break;

case "Undefined":
c = "UNDEFINED!";
e && (c = e + c);
m(c, n, i);
break;

case "Boolean":
c = t.toString();
e && (c = e + c);
m(c, n, i);
break;

case "Object":
c = "{";
e && (c = e + c);
m(c, n, i);
var h = void 0;
for (h in t) if (t.hasOwnProperty(h)) {
l = '"' + h + '" : ';
s = (e ? e.length : 0) - 2 + i;
_dumpObject(l, t[h], n + 1, s, a, o);
}
u = e ? e.length : 0;
c = "}";
if (u > 0) {
d = "";
var g = void 0;
for (g = 0; g < u; ++g) d += " ";
c = d + c;
}
m(c, n, i);
break;

case "Array":
c = "[";
e && (c = e + c);
m(c, n, i);
var f = void 0;
for (f = 0; f < t.length; ++f) {
l = f + " : ";
s = (e ? e.length : 0) - 2 + i;
_dumpObject(l, t[f], n + 1, s, a, o);
}
u = e ? e.length : 0;
c = "]";
if (u > 0) {
d = "";
var p = void 0;
for (p = 0; p < u; ++p) d += " ";
c = d + c;
}
m(c, n, i);
break;

case "Function":
if (!a) {
c = function(e) {
return e.toString().replace(/function\s?/im, "").split(")")[0] + ")";
}(t);
e && (c = e + c);
m(c, n, i);
}
}
}
function m(e, t, n) {
for (;t > 0; ) {
e = "  " + e;
--t;
}
if (n > 0) {
var i = "", a = void 0;
for (a = 0; a < n; ++a) i += " ";
e = i + e;
}
cc.log(e);
}
};
r.dumpObject = function(e, t, n) {
r._dumpObject(void 0, e, 0, 0, t || !1, n);
};
r.D = function(e) {
return void 0 !== e;
};
r.DNN = function(e) {
return void 0 !== e && null !== e;
};
r.isFunction = function(e) {
return "function" == typeof e;
};
r.isNumber = function(e) {
return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e);
};
r.isString = function(e) {
return "string" == typeof e || "[object String]" === Object.prototype.toString.call(e);
};
r.isArray = function(e) {
return Array.isArray(e) || "object" === ("undefined" == typeof e ? "undefined" : i(e)) && "[object Array]" === Object.prototype.toString.call(e);
};
r.isUndefined = function(e) {
return void 0 === e;
};
r.isObject = function(e) {
return "object" === ("undefined" == typeof e ? "undefined" : i(e)) && "[object Object]" === Object.prototype.toString.call(e);
};
r.isEmpty = function(e) {
return Array.isArray(e) && 0 === e.length || Object.prototype.isPrototypeOf(e) && 0 === Object.keys(e).length;
};
r.isBoolean = function(e) {
return !0 === e || !1 === e || "[object Boolean]" === Object.prototype.toString.call(e);
};
r.clone = function(e, t) {
t || (t = e.constructor ? new e.constructor() : {});
var n = void 0, a = void 0;
for (n in e) e.hasOwnProperty(n) && ("object" === ("undefined" == typeof (a = e[n]) ? "undefined" : i(a)) && a ? t[n] = r.clone(a, null) : t[n] = a);
return t;
};
r.getStringFromFile = function(t) {
return cc.sys.isNative ? jsb.fileUtils.getStringFromFile(t) : function(t) {
if (cc._isNodeJs) {
return e("fs").readFileSync(t).toString();
}
var n = this.getXMLHttpRequest();
n.timeout = 0;
n.open("GET", t, !1);
/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? n.setRequestHeader("Accept-Charset", "utf-8") : n.overrideMimeType && n.overrideMimeType("text/plain; charset=utf-8");
n.send(null);
return 4 === !n.readyState || 200 !== n.status ? null : n.responseText;
}.bind(cc.loader)(t);
};
r.loadRemoteImg = function(e, t) {
if (cc.sys.isBrowser) {
cc.log("Remote img load web");
cc.loader.load(e, function(e) {
cc.log("Remote img load progress:" + e);
}, function(e, n) {
if (e) cc.log("Remote img load error:" + e); else {
cc.log("Remote img load success.");
t(n);
}
});
} else {
cc.log("Remote img load: native");
var n = jsb.fileUtils.getWritablePath() + "img/", o = n + a.md5_hex(e) + ".png";
if (jsb.fileUtils.isFileExist(o)) {
cc.log("Remote is find" + o);
s();
} else {
var r = function(e) {
cc.log("undefined" == typeof e ? "undefined" : i(e));
cc.log(e);
var t = new Uint8Array(e);
cc.log("undefined" == typeof t ? "undefined" : i(t));
cc.log(t.length);
if ("undefined" != typeof e) {
jsb.fileUtils.isDirectoryExist(n) || jsb.fileUtils.createDirectory(n);
cc.log("111111" + o);
if (jsb.fileUtils.writeDataToFile(new Uint8Array(e), o)) {
cc.log("Remote img save succeed.");
cc.log("22222");
s();
} else cc.log("Remote img save failed.");
} else cc.log("Remote img download failed.");
}, c = new XMLHttpRequest();
c.onreadystatechange = function() {
cc.log("xhr.readyState  " + c.readyState);
cc.log("xhr.status  " + c.status);
if (4 === c.readyState) if (200 === c.status) {
c.responseType = "arraybuffer";
r(c.response);
} else r(null);
}.bind(this);
c.open("GET", e, !0);
c.send();
}
}
function s() {
cc.loader.load(o, function(e, n) {
e ? cc.error(e) : t(n);
});
}
};
r.checkTouchIsHit = function(e, t) {
return cc.rectContainsPoint(t.getBoundingBoxToWorld(), e);
};
r.createCliper = function(e) {
var t = new cc.Sprite(e), n = new cc.ClippingNode();
n.attr({
stencil: t,
anchorX: .5,
anchorY: .5,
alphaThreshold: .8
});
return n;
};
r.convertBoundingBoxToWorld = function(e) {
if (!e) return cc.rect();
var t = e.convertToWorldSpace(cc.p()), n = e.convertToWorldSpace(cc.pFromSize(e.getContentSize()));
return cc.rect(t.x, t.y, n.x - t.x, n.y - t.y);
};
r.getPositionByAnchor = function(e, t) {
if (!e) return cc.p();
var n = e.getBoundingBox();
n.x += n.width * t.x;
n.y += n.height * t.y;
return cc.p(n.x, n.y);
};
r.runShakeAction = function(e, t, n) {
e.runAction(cc.repeat(cc.sequence(cc.moveBy(.02, cc.p(0, t)), cc.moveBy(.04, cc.p(0, 2 * -t)), cc.moveBy(.02, cc.p(0, t))), n));
};
r.randomByWeight = function(e, t) {
if (!r.isArray(e) || !r.isString(t)) return null;
var n = 0;
n = e.reduce(function(e, n) {
return e += n[t];
}, n);
cc.log("sumWeight:" + n);
var i = 0, a = Math.random() * n, o = null;
for (var c in e) if (a < (i += (o = e[c])[t])) return o;
return o;
};
r.randomInteger = function(e, t) {
return e + Math.round((t - e) * Math.random());
};
r.parse = function(e, t) {
for (var n = new o(e, t), i = []; n.hasNext(); ) {
var a = n.nextRow();
i.push(a);
}
return i;
};
r.parseOneLine = function(e, t) {
for (var n = new o(e, t), i = []; n.hasNext(); ) {
var a = n.nextRow();
i.push(a);
}
return i.length <= 1 ? i[0] : i;
};
r.bindColumns = function(e, t, n) {
t || (t = e.shift());
return e.map(function(e) {
for (var i = {}, a = 0; a < e.length; a++) i[t[a]] = n ? isNaN(e[a]) ? e[a] : Number(e[a]) : e[a];
return i;
});
};
r.bindColumnsSimple = function(e, t) {
t || (t = e.shift());
return e.map(function(e) {
for (var n = {}, i = 0; i < e.length; i++) n[t[i]] = CSV.parseOneSimple(e[i]);
return n;
});
};
t.exports = r;
cc._RF.pop();
}, {
"./../encrypt/Md5": "Md5",
"./CSVParser": "CSVParser",
fs: void 0
} ],
ViewBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "694b6jq9VVLs7ax3wMlHk7q", "ViewBase");
cc.Class({
extends: cc.Component,
properties: {
onShowHandler: {
default: null,
type: cc.Component.EventHandler,
tooltip: "视图显示时的回掉"
},
onHideHandler: {
default: null,
type: cc.Component.EventHandler,
tooltip: "视图消失时的回掉"
},
aniClipShow: {
default: null,
type: cc.AnimationClip,
tooltip: "出现动画"
},
aniClipHide: {
default: null,
type: cc.AnimationClip,
tooltip: "消失动画"
},
mask: {
default: null,
type: cc.Node,
tooltip: "半透明遮罩"
},
immediatelyHandle: {
default: !1,
visible: !1
},
_owner: null
},
showWithAni: function() {
if (this.aniClipShow || this.aniClipHide) {
var e = this.node.getComponent(cc.Animation);
e || (e = this.node.addComponent(cc.Animation));
this.aniClipHide && e.addClip(this.aniClipHide, "aniHide");
if (this.aniClipShow) {
e.addClip(this.aniClipShow, "aniShow");
e.play("aniShow").once("finished", function() {
!this.immediatelyHandle && this.onShowHandler && this.onShowHandler.emit();
}.bind(this));
this.immediatelyHandle && this.onShowHandler && this.onShowHandler.emit();
} else this.onShowHandler && this.onShowHandler.emit();
}
},
destroyWithAni: function() {
var e = this.node.getComponent(cc.Animation);
if (this.aniClipHide) {
e.play("aniHide").once("finished", function() {
!this.immediatelyHandle && this.onHideHandler && this.onHideHandler.emit();
this.node.destroy();
}.bind(this));
this.immediatelyHandle && this.onHideHandler && this.onHideHandler.emit();
} else {
this.onHideHandler && this.onHideHandler.emit();
this.node.destroy();
}
},
onDestroy: function() {
this._owner && this._owner.onViewDestroy();
},
onBtnClose: function() {
this.destroyWithAni();
GlobalNiuNiu.audioMgr.playEffect(GlobalNiuNiu.audioMgr.effBtnClose);
}
});
cc._RF.pop();
}, {} ],
ViewMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "981f3vJkZhPjbyqp7Nh8M6i", "ViewMgr");
var i = e("./GCONFIG"), a = cc.Class({
ctor: function() {
this._views = [];
this.rootNode = null;
this._isShowing = !1;
this.loading = null;
GlobalNiuNiu.eventMgr.on(i.EVENT_CHANGE_SCENE, function() {
this.beforeChangeScene();
}, this);
},
statics: {
_instance: null,
getInstance: function() {
a._instance || (a._instance = new a());
return a._instance;
}
},
beforeChangeScene: function() {
cc.log("---before change scene.");
this.removeAllView();
},
pushView: function(e, t, n) {
this._pushViewAndInit(e, t, n);
e.getComponent("ViewBase")._owner = this;
this._views.push(e);
this._sortView();
this._showNextView();
},
_pushViewAndInit: function(e, t, n) {
var a = e.getComponent("ViewBase");
cc.assert(a, "view must has component ViewBase or inherit ViewBase.");
if (!this.rootNode) {
var o = cc.Canvas.instance.node;
this.rootNode = new cc.Node();
this.rootNode.width = o.width;
this.rootNode.height = o.height;
this.rootNode.zIndex = i.LOCAL_ZINDEX_MAX;
o.addChild(this.rootNode);
}
t && a.mask && (a.mask.active = !1);
a.immediatelyHandle = void 0 !== n && n;
},
pushViewImmediate: function(e, t, n) {
this._pushViewAndInit(e, t, n);
e.getComponent("ViewBase").showWithAni();
this.rootNode.addChild(e);
},
onViewDestroy: function() {
this._isShowing = !1;
this._showNextView();
},
_sortView: function() {},
_showNextView: function() {
if (!(this._isShowing || this._views.length < 0)) {
var e = this._views.shift();
if (e) {
e.getComponent("ViewBase").showWithAni();
this.rootNode.addChild(e);
this._isShowing = !0;
} else this._isShowing = !1;
}
},
removeAllView: function() {
for (var e = 0; e < this._views.length; e++) {
this._views[e].destroy();
}
if (this.loading) {
this.loading.parent = null;
this.loading.destroy();
this.loading = null;
}
if (this.rootNode) {
this.rootNode.parent = null;
this.rootNode.destroy();
this.rootNode = null;
}
this._views = [];
this._isShowing = !1;
}
});
t.exports = a;
cc._RF.pop();
}, {
"./GCONFIG": "GCONFIG"
} ],
XHP_item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "79b2c5S0rtF/b9iqAvobfnB", "XHP_item");
cc.Class({
extends: cc.Component,
properties: {
icon_pic: cc.Sprite,
label_name: cc.Label,
label_prop: cc.Label,
label_fee: cc.Label,
btn_use: cc.Sprite,
propId: 1
},
start: function() {},
setData: function(e, t) {
var n = this;
try {
cc.loader.load({
url: e.icon,
type: "png"
}, function(e, t) {
n.icon_pic.spriteFrame = new cc.SpriteFrame(t);
});
} catch (e) {
console.warn(e);
}
this.label_name.string = e.name;
if (null == t) {
this.propId = e.id;
this.label_prop.string = cc.js.formatStr("+%s", e.elevatedValue);
this.label_fee.string = cc.js.formatStr("%s", parseFloat(e.price).toFixed(4));
} else {
this.propId = e.mc_id;
this.label_prop.string = cc.js.formatStr("%s", e.quantity);
}
},
buy: function() {
Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
Global.PageMgr.pages[15].getComponent("BuyPanel").type = 0;
Global.PageMgr.onOpenPage(15);
},
usePprops: function() {
Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
Global.PageMgr.pages[15].getComponent("BuyPanel").type = 1;
Global.PageMgr.onOpenPage(15);
}
});
cc._RF.pop();
}, {} ],
ZhongZiPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ce62dfrEllIFYyh0SKwwyFs", "ZhongZiPanel");
cc.Class({
extends: cc.Component,
properties: {
item: cc.Prefab,
content: cc.Node
},
onLoad: function() {
cc.director.GlobalEvent.on("ZhongZiData", this.onUpdateZhongZiData, this);
},
onDestroy: function() {
cc.director.GlobalEvent.off("ZhongZiData");
},
onUpdateZhongZiData: function() {
var e = this;
this.content.children.forEach(function(e) {
e.destroy();
});
var t = "zhongzi";
GameData.ZhongZiData.forEach(function(n) {
var i = cc.instantiate(e.item);
i.parent = e.content;
var a = n.id + "";
i.getChildByName("Bg").getChildByName("Count").getComponent(cc.Label).string = n.count;
i.getChildByName("Name").getComponent(cc.Label).string = dataFunc.queryValue(t, "name", a) + "种子";
i.getChildByName("Reward").getComponent(cc.Label).string = "收获" + dataFunc.queryValue(t, "reward", a) + "个" + dataFunc.queryValue(t, "name", a);
i.getChildByName("Price").getComponent(cc.Label).string = "价格" + dataFunc.queryValue(t, "price", a);
cc.loader.loadRes("NongChang/" + dataFunc.queryValue(t, "picture", a), function(e, t) {
if (e) console.error(e); else {
var o = new cc.SpriteFrame(t);
i.getChildByName("Bg").getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = o;
if (n.count > 0) {
i.getChildByName("Bg").getChildByName("Count").active = !0;
i.getChildByName("Price").active = !1;
i.getChildByName("Buy").active = !1;
i.off(cc.Node.EventType.TOUCH_END);
i.on(cc.Node.EventType.TOUCH_END, function() {
Global.ProtocolMgr.zhongZhi(a, GameData.ZhongZhiReady.pos);
});
} else {
i.getChildByName("Bg").getChildByName("Count").active = !1;
i.getChildByName("Price").active = !0;
i.getChildByName("Buy").active = !0;
i.getChildByName("Buy").on(cc.Node.EventType.TOUCH_END, function() {
Global.PageMgr.closeAllPages();
Global.PageMgr.onOpenPage(1);
Global.PageMgr.pages[1].getComponent("NongChangPanel").toggleChange("ShangCheng");
});
}
}
});
});
},
start: function() {},
onEnable: function() {
Global.ProtocolMgr.queryZhongZi();
}
});
cc._RF.pop();
}, {} ],
ZhuJinPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b1ff0HmzmpMeqLbv6a8xwh/", "ZhuJinPanel");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
closeUi: function() {
Global.PageMgr.onClosePage(2);
}
});
cc._RF.pop();
}, {} ],
ZiChuangPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5de97ZVe4tMUoexaJAjK1kz", "ZiChuangPanel");
cc.Class({
extends: cc.Component,
properties: {
label_email: cc.Label
},
start: function() {},
closeUi: function() {
this.node.active = !1;
},
copy: function() {
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyEmail", "(Ljava/lang/String;)Z", this.label_email.string) && Global.PageMgr.showTipPage("复制成功");
}
});
cc._RF.pop();
}, {} ],
appScript: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "68775/0DWtJ1YJFtFTKIb7T", "appScript");
var i = {
version: "1.0.0",
Get: function(e, t, n) {
var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
if ("" != t) {
e += "?";
for (var a in t) e += a + "=" + t[a] + "&";
}
var o = new XMLHttpRequest();
o.onreadystatechange = function() {
if (4 == o.readyState) if (o.status >= 200 && o.status <= 400) {
var e = o.responseText;
if (e) {
var t = JSON.parse(e);
console.log(t);
n(t);
} else {
console.log("返回数据不存在");
n(!1);
}
} else {
console.log("请求失败");
n(!1);
}
};
"" != i ? o.open("GET", i + e, !0) : o.open("GET", Config.baseUrl + e, !0);
o.setRequestHeader("Content-Type", "application/json");
o.setRequestHeader("token", "magic" + GameData.token);
o.setRequestHeader("language", GameData.curLanguage);
o.send();
},
Post: function(e, t, n) {
var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", a = new XMLHttpRequest();
a.onreadystatechange = function() {
console.log(a);
if (4 == a.readyState) {
console.log("---------1-----------------url:" + Config.baseUrl + e);
if (a.status >= 200 && a.status <= 400) {
var t = a.responseText;
if (t) {
var i = JSON.parse(t);
console.log(i);
if (401 == i.code) {
cc.sys.localStorage.removeItem("com.game.vdn.token");
Global.PageMgr.closeAllPages();
Global.PageMgr.onOpenPage(0);
return;
}
n(i);
} else {
console.log("返回数据不存在");
n(!1);
}
} else {
console.log("请求失败");
n(!1);
}
}
};
"" != i ? a.open("POST", i + e, !0) : a.open("POST", Config.baseUrl + e, !0);
a.setRequestHeader("Content-Type", "application/json");
a.setRequestHeader("token", GameData.token);
a.setRequestHeader("language", GameData.curLanguage);
console.log("-------|" + GameData.token);
a.send(JSON.stringify(t));
},
GetQueryVariable: function(e) {
for (var t = window.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
var i = t[n].split("=");
if (i[0] == e) return i[1];
}
return !1;
}
};
t.exports = i;
cc._RF.pop();
}, {} ],
carder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f2b73KEahtEPqUTXAvLqtnu", "carder");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function() {
var e = {}, t = function(e) {
return 1 === e.length;
}, n = function(e) {
return 2 == e.length && void 0 != e[0].card_data.value && e[0].card_data.value == e[1].card_data.value;
}, i = function(e) {
return 3 == e.length && void 0 != e[0].card_data.value && void 0 != e[1].card_data.value && e[0].card_data.value == e[1].card_data.value && e[0].card_data.value == e[2].card_data.value && e[1].card_data.value == e[2].card_data.value;
}, o = function(e) {
return 4 == e.length && void 0 != e[1].card_data.value && void 0 != e[2].card_data.value && (e[0].card_data.value == e[1].card_data.value && e[1].card_data.value == e[2].card_data.value || e[1].card_data.value == e[2].card_data.value && e[2].card_data.value == e[3].card_data.value);
}, r = function(e) {
if (5 != e.length) return !1;
if (e[0].card_data.value == e[1].card_data.value && e[1].card_data.value == e[2].card_data.value) {
if (e[3].card_data.value == e[4].card_data.value) return !0;
} else if (e[2].card_data.value == e[3].card_data.value && e[3].card_data.value == e[4].card_data.value && e[0].card_data.value == e[1].card_data.value) return !0;
return !1;
}, c = function(e) {
if (4 != e.length) return !1;
for (var t = {}, n = 0; n < e.length; n++) t.hasOwnProperty(e[n].card_data.value) ? t[e[n].card_data.value]++ : t[e[n].card_data.value] = 1;
return 1 == Object.keys(t).length;
}, s = function(e) {
return 2 == e.length && void 0 != e[0].card_data.king && void 0 != e[1].card_data.king;
}, l = function(e) {
if (6 != e.length) return !1;
for (var t = {}, n = 0; n < e.length; n++) t.hasOwnProperty(e[n].card_data.value) ? t[e[n].card_data.value]++ : t[e[n].card_data.value] = 1;
var i = Object.keys(t);
console.log("IsPlan keys" + i);
if (2 == i.length) {
for (key in t) if (3 != t[key]) return !1;
var a = Number(i[0]), o = Number(i[1]);
return 1 == Math.abs(a - o);
}
return !1;
}, u = function(e) {
if (8 != e.length) return !1;
for (var t = {}, n = 0; n < e.length; n++) t.hasOwnProperty(e[n].card_data.value) ? t[e[n].card_data.value]++ : t[e[n].card_data.value] = 1;
var i = Object.keys(t);
console.log("IsPlan keys" + i);
if (4 != i.length) return !1;
var a = [], o = 0;
for (var n in t) 3 == t[n] ? a.push(n) : 1 == t[n] && o++;
if (2 != a.length || 2 != o) return !1;
var r = Number(a[0]), c = Number(a[1]);
return 1 == Math.abs(r - c);
}, d = function(e) {
if (10 != e.length) return !1;
for (var t = {}, n = 0; n < e.length; n++) t.hasOwnProperty(e[n].card_data.value) ? t[e[n].card_data.value]++ : t[e[n].card_data.value] = 1;
if (4 != Object.keys(t).length) return !1;
var i = [], a = 0;
for (var n in t) 3 == t[n] ? i.push(n) : 2 == t[n] && a++;
if (2 != i.length || 2 != a) return !1;
var o = Number(i[0]), r = Number(i[1]);
return 1 == Math.abs(o - r);
}, h = function(e) {
if (e.length < 5 || e.length > 12) return !1;
for (var t = e, n = 0; n < t.length; n++) if (13 == t[n].card_data.value || 14 == t[n].card_data.value || 15 == t[n].card_data.value) return !1;
t.sort(function(e, t) {
return Number(e.card_data.value) - Number(t.card_data.value);
});
for (n = 0; n < t.length && n + 1 != t.length; n++) {
var i = Number(t[n].card_data.value), a = Number(t[n + 1].card_data.value);
if (1 != Math.abs(i - a)) return !1;
}
return !0;
}, g = function(e) {
if (e.length < 6 || e.length > 24) return !1;
for (var t = 0; t < e.length; t++) if (14 == e[t].card_data.value || 15 == e[t].card_data.value || 13 == e[t].card_data.value) return !1;
var n = {};
for (t = 0; t < e.length; t++) n.hasOwnProperty(e[t].card_data.value) ? n[e[t].card_data.value]++ : n[e[t].card_data.value] = 1;
for (var i in n) if (2 != n[i]) return !1;
var a = Object.keys(n);
if (a.length < 3) return !1;
a.sort(function(e, t) {
return Number(e) - Number(t);
});
for (t = 0; t < a.length && t + 1 != a.length; t++) {
var o = Number(a[t]), r = Number(a[t + 1]);
if (1 != Math.abs(o - r)) return !1;
}
return !0;
}, f = {
one: {
name: "One",
value: 1
},
double: {
name: "Double",
value: 1
},
three: {
name: "Three",
value: 1
},
boom: {
name: "Boom",
value: 2
},
threeWithOne: {
name: "ThreeWithOne",
value: 1
},
threeWithTwo: {
name: "ThreeWithTwo",
value: 1
},
plane: {
name: "Plane",
value: 1
},
planeWithOne: {
name: "PlaneWithOne",
value: 1
},
planeWithTwo: {
name: "PlaneWithTwo",
value: 1
},
scroll: {
name: "Scroll",
value: 1
},
doubleScroll: {
name: "DoubleScroll",
value: 1
},
kingboom: {
name: "kingboom",
value: 3
}
}, p = function(e, t) {
console.log("compareOne");
return !((void 0 == e[0].card_data.value ? e[0].card_data.king : e[0].card_data.value) >= (void 0 == t[0].card_data.value ? t[0].card_data.king : t[0].card_data.value));
}, m = function(e, t) {
console.log("compareDouble");
return p(e, t);
}, b = function(e, t) {
console.log("compareThree");
return p(e, t);
}, _ = function(e, t) {
console.log("compareBoom");
var n = !1;
4 == e.length && 4 == t.length && (n = p(e, t));
return n;
}, y = function(e, t) {
return 2 == t.length;
}, v = function(e, t) {
for (var n = [], i = [], a = {}, o = 0; o < e.length; o++) a.hasOwnProperty(e.card_data.value) ? n.push(e) : a[e.card_data.value] = 1;
for (o = 0; o < t.length; o++) a.hasOwnProperty(t.card_data.value) ? i.push(t) : a[t.card_data.value] = 1;
return p(e, t);
}, C = function(e, t) {
for (var n = {}, i = {}, a = 0; a < e.length; a++) n.hasOwnProperty(e[a].card_data.value) ? n[e[a].card_data.value].push(e[a]) : n[e[a].card_data.value] = [ e[a] ];
for (a = 0; a < t.length; a++) i.hasOwnProperty(t[a].card_data.value) ? i[t[a].card_data.value].push(t[a]) : i[t[a].card_data.value] = [ t[a] ];
var o = [];
for (var a in n) 3 === n[a].length && (o = n[a]);
var r = [];
for (var a in i) 3 === i[a].length && (r = i[a]);
return p(o, r);
}, N = function(e, t) {
for (var n = {}, i = 0; i < e.length; i++) n.hasOwnProperty(e[i].card_data.value) ? n[e[i].card_data.value].push(e[i]) : n[e[i].card_data.value] = [ e[i] ];
var a = [], o = 16;
for (var i in n) if (Number(i) < o) {
o = Number(i);
a = n[i];
}
var r = {};
for (i = 0; i < t.length; i++) r.hasOwnProperty(t[i].card_data.value) ? r[t[i].card_data.value].push(t[i]) : r[t[i].card_data.value] = [ t[i] ];
o = 16;
var c = [];
for (var i in r) if (Number(i) < o) {
o = Number(i);
c = r[i];
}
return b(a, c);
}, P = function(e, t) {
for (var n = {}, i = [], a = 0; a < e.length; a++) n.hasOwnProperty(e[a].card_data.value) ? i.push(e[a]) : n[e[a].card_data.value] = [ e[a] ];
var o = {}, r = [];
for (a = 0; a < t.length; a++) o.hasOwnProperty(t[a].card_data.value) ? r.push(t[a]) : o[t[a].card_data.value] = [ t[a] ];
return N(i, r);
}, S = function(e, t) {
for (var n = {}, i = 0; i < e.length; i++) n.hasOwnProperty(e[i].card_data.value) ? n[e[i].card_data.value].push(e[i]) : n[e[i].card_data.value] = [ e[i] ];
var a = {};
for (i = 0; i < t.length; i++) a.hasOwnProperty(t[i].card_data.value) ? a[t[i].card_data.value].push(t[i]) : a[t[i].card_data.value] = [ t[i] ];
var o = [];
for (var i in n) if (3 === n[i].length) for (var r = 0; r < n[i].length; r++) o.push(n[i][r]);
console.log("list a = " + JSON.stringify(o));
var c = [];
for (var i in a) if (3 === a[i].length) for (r = 0; r < a[i].length; r++) c.push(a[i][r]);
return N(o, c);
}, w = function(e, t) {
console.log("compareScroll");
if (e.length != t.length) return !1;
for (var n = 100, i = 0; i < e.length; i++) e[i].card_data.value < n && (n = e[i].card_data.value);
for (var a = 100, o = 0; o < t.length; o++) t[o].card_data.value < a && (a = t[o].card_data.value);
console.log("min a = " + n);
console.log("min b = " + a);
return n <= a;
}, D = function(e, t) {
for (var n = {}, i = [], o = 0; o < e.length; o++) if (n.hasOwnProperty(e[o].card_data.value)) ; else {
n[e[o].card_data.value] = !0;
i.push(a[o]);
}
var r = {}, c = [];
for (o = 0; o < t.length; o++) if (r.hasOwnProperty(t[o].card_data.value)) ; else {
r[t[o].card_data.value] = !0;
c.push(t[o]);
}
console.log("list a = " + JSON.stringify(i));
console.log("list b = " + JSON.stringify(c));
return w(i, c);
}, E = function(e, t, n) {
var i = !1;
switch (n.name) {
case f.one.name:
i = p(e, t);
break;

case f.double.name:
i = m(e, t);
break;

case f.three.name:
i = b(e, t);
break;

case f.boom.name:
i = _(e, t);
break;

case f.kingboom.name:
i = y(0, t);
break;

case f.planeWithOne.name:
i = v(e, t);
break;

case f.planeWithTwo.name:
i = C(e, t);
break;

case f.plane.name:
i = N(e, t);
break;

case f.planeWithOne.name:
i = P(e, t);
break;

case f.planeWithTwo.name:
i = S(e, t);
break;

case f.scroll.name:
i = w(e, t);
break;

case f.doubleScroll.name:
i = D(e, t);
break;

default:
console.log("no found card value!");
i = !1;
}
return i;
};
(e = {
card_list: []
}).findWithCard = function(e, t) {
R(e);
};
e.compareWithCard = function(e, t) {
console.log("last_cards" + JSON.stringify(e));
console.log("current_cards" + JSON.stringify(t));
var n = R(e), i = R(t);
if (e.value < t.value) {
console.log("compareWithCard less");
return !0;
}
return e.value == t.value && (n.name != i.name ? "牌型不同" : E(e, t, n));
};
e.IsCanPushs = function(e) {
if (t(e)) {
console.log("isOneCard sucess");
return f.one;
}
if (n(e)) {
console.log("IsDoubleCard sucess");
return f.double;
}
if (i(e)) {
console.log("Isthree sucess");
return f.three;
}
if (o(e)) {
console.log("IsThreeAndOne sucess");
return f.threeWithOne;
}
if (r(e)) {
console.log("IsThreeAndTwo sucess");
return f.threeWithTwo;
}
if (c(e)) {
console.log("IsBoom sucess");
return f.boom;
}
if (s(e)) {
console.log("IsKingBoom sucess");
return f.kingboom;
}
if (l(e)) {
console.log("IsPlan sucess");
return f.plane;
}
if (u(e)) {
console.log("IsPlanWithSing sucess");
return f.planeWithOne;
}
if (d(e)) {
console.log("IsPlanWithDouble sucess");
return f.planeWithTwo;
}
if (h(e)) {
console.log("IsShunzi sucess");
return f.scroll;
}
if (g(e)) {
console.log("IsLianDui sucess");
return f.DoubleScroll;
}
};
var R = e.IsCanPushs;
return e;
};
t.exports = n.default;
cc._RF.pop();
}, {} ],
card: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2afe8rz92BOl7CbQfKSCoLh", "card");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
cards_sprite_atlas: cc.SpriteAtlas
},
onLoad: function() {
this.flag = !1;
this.offset_y = 20;
this.node.on("reset_card_flag", function(e) {
if (1 == flag) {
flag = !1;
this.node.y -= this.offset_y;
}
}.bind(this));
},
runToCenter: function() {},
start: function() {},
init_data: function(e) {},
setTouchEvent: function() {
this.accountid, i.default.playerData.accountID;
},
showCards: function(e, t) {
this.card_id = e.index;
this.card_data = e;
t && (this.accountid = t);
var n = "";
n = e.shape ? "card_" + (13 * {
1: 3,
2: 2,
3: 1,
4: 0
}[e.shape] + {
12: 1,
13: 2,
1: 3,
2: 4,
3: 5,
4: 6,
5: 7,
6: 8,
7: 9,
8: 10,
9: 11,
10: 12,
11: 13
}[e.value]) : "card_" + {
14: 54,
15: 53
}[e.king];
this.node.getComponent(cc.Sprite).spriteFrame = this.cards_sprite_atlas.getSpriteFrame(n);
this.setTouchEvent();
}
});
cc._RF.pop();
}, {
"../../mygolbal.js": "mygolbal"
} ],
creatRoom: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e85c8xPVuxKX5zdxLJ1e12h", "creatRoom");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
label: [ cc.Label ]
},
start: function() {
var e = this;
i.default.socket.requestConfig(function(t, n) {
if (0 != t) {
console.log("create_room err:" + t);
var i = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
i.string = n;
setTimeout(function() {
i.string = "";
}, 2e3);
} else {
console.log("create_room" + JSON.stringify(n));
e.label[0].string = n[1].bottom;
e.label[1].string = n[2].bottom;
e.label[2].string = n[3].bottom;
e.label[3].string = n[4].bottom;
}
});
},
_createroom: function(e) {
if (e < 0 || e > 4) console.log("create room rate error" + e); else {
var t = 0;
1 == e ? t = 10 : 2 == e ? t = 20 : 3 == e ? t = 30 : 4 == e && (t = 40);
var n = {
global: t,
rate: e
};
i.default.socket.request_creatroom(n, function(e, t) {
if (0 != e) {
console.log("create_room err:" + e);
var n = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
n.string = t;
setTimeout(function() {
n.string = "";
}, 2e3);
} else {
console.log("create_room" + JSON.stringify(t));
i.default.playerData.bottom = t.bottom;
i.default.playerData.rate = t.rate;
cc.director.loadScene("gameScene");
}
});
}
},
onButtonClick: function(e, t) {
switch (t) {
case "create_room_1":
this._createroom(1);
break;

case "create_room_2":
this._createroom(2);
break;

case "create_room_3":
this._createroom(3);
break;

case "create_room_4":
this._createroom(4);
break;

case "create_room_close":
this.node.destroy();
}
this.node.destroy();
}
});
cc._RF.pop();
}, {
"../../mygolbal.js": "mygolbal"
} ],
emailItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4b8e3e7jdNAXa9VAgL7cowk", "emailItem");
cc.Class({
extends: cc.Component,
properties: {
icon_email: cc.Sprite,
label_title: cc.Label,
label_time: cc.Label
},
start: function() {},
setData: function(e) {
var t = this, n = "";
0 == e.state ? n = "信封未读" : 1 == e.state && (n = "信封已读");
try {
cc.loader.loadRes("imgs/" + n, cc.SpriteFrame, function(e, n) {
e || (t.icon_email.spriteFrame = n);
});
} catch (e) {
console.warn(e);
}
this.label_title.string = e.title;
this.label_time.string = e.time;
}
});
cc._RF.pop();
}, {} ],
en: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e674fM3nWVFk47vOa4wIbG1", "en");
window.i18n || (window.i18n = {});
window.i18n.languages || (window.i18n.languages = {});
window.i18n.languages.en = {
label: {
hello: "Hello!",
bye: "Goodbye!",
email: "Email",
voice: "Voice",
Emine: "Emine:",
Egold: "Egold:",
Etoken: "Etoken:",
velodrome: "Velodrome",
dock: "Dock",
manor: "Manor",
OrePool: "OrePool",
LeasingMarket: "Leasing Market",
TradingFloor: "Trading Floor",
DigitalFinance: "Digital Finance",
Farm: "Farm",
ShoppingCenter: "Shopping Center",
RecreationalCenter: "Recreational Center",
CommunityCenter: "Community Center",
sendRedPack: "SendRedPack",
redPackList: "RedPackList"
}
};
cc._RF.pop();
}, {} ],
event_lister: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d485eyCsiBLBqweDM7SjVQh", "event_lister");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(e) {
var t = {};
e.on = function(e, n) {
t.hasOwnProperty(e) ? t[e].push(n) : t[e] = [ n ];
};
e.fire = function(e) {
if (t.hasOwnProperty(e)) for (var n = t[e], i = 0; i < n.length; ++i) {
var a = n[i], o = [];
for (i = 1; i < arguments.length; ++i) o.push(arguments[i]);
console.log("handle.call(this,args) type:" + e);
a.apply(this, o);
}
};
e.removeLister = function(e) {
t[e] = [];
};
e.removeAllLister = function() {
t = {};
};
return e;
};
t.exports = n.default;
cc._RF.pop();
}, {} ],
failPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3ceb2bCT9RESKaeocIPai32", "failPanel");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
userList: [ cc.Node ],
audio: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
i.default.playerData.accountID == i.default.playerData.housemanageid && (this.node.getChildByName("准备").active = !1);
cc.audioEngine.play(this.audio);
},
initData: function(e) {
var t = this;
console.warn(e);
e.forEach(function(e, n) {
i.default.allPlayerData.forEach(function(a) {
if (a.accountid == e.account) {
a.accountid == i.default.playerData.accountID && (t.userList[n].getChildByName("me").active = !0);
t.userList[n].getChildByName("nickName").getComponent(cc.Label).string = a.nick_name;
t.userList[n].getChildByName("beishu").getComponent(cc.Label).string = i.default.playerData.rate;
t.userList[n].getChildByName("score").getComponent(cc.Label).string = e.amount;
t.userList[n].getChildByName("DSSC").getComponent(cc.Label).string = e.change;
if (a.accountid == i.default.playerData.master_accountid) {
t.userList[n].getChildByName("地主标志").active = !0;
t.userList[n].getChildByName("beishu").getComponent(cc.Label).string = 2 * i.default.playerData.rate;
}
cc.loader.load({
url: a.avatarUrl,
type: "jpg"
}, function(e, t) {
e ? console.log(e.message || e) : this.userList[n].getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
}.bind(t));
}
});
});
},
start: function() {},
close: function() {
this.node.destroy();
},
quitRoom: function() {
i.default.socket.request_quit_room({}, function(e, t) {
if (0 != e) console.log("requestStart err" + e); else {
console.log("requestStart data" + JSON.stringify(t));
cc.director.loadScene("hallScene");
}
}.bind(this));
},
ready: function() {
i.default.socket.requestReady();
this.node.parent.getChildByName("gamebeforeUI").emit("ready");
this.node.destroy();
}
});
cc._RF.pop();
}, {
"../mygolbal.js": "mygolbal"
} ],
gameScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cf22aez0/xDaaC1kRqxn/pw", "gameScene");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
di_label: cc.Label,
beishu_label: cc.Label,
roomid_label: cc.Label,
player_node_prefabs: cc.Prefab,
players_seat_pos: cc.Node,
webview: cc.Node,
bgAudio: {
default: null,
type: cc.AudioClip
}
},
gameEnd: function() {},
onLoad: function() {
this.playerNodeList = [];
this.di_label.string = "底:" + i.default.playerData.bottom;
this.beishu_label.string = "倍数:" + i.default.playerData.rate;
this.roomstate = RoomState.ROOM_INVALID;
this.node.on("pushcard_other_event", function() {
console.log("gamescene pushcard_other_event");
for (var e = 0; e < this.playerNodeList.length; e++) {
var t = this.playerNodeList[e];
t && t.emit("push_card_event");
}
}.bind(this));
i.default.socket.onRoomChangeState(function(e) {
console.log("onRoomChangeState:" + e);
this.roomstate = e;
i.default.roomState = e;
var t = this.node.getChildByName("container").getChildByName("gameingUI"), n = this.node.getChildByName("container").getChildByName("gamebeforeUI");
if (null != t) {
if (7 == this.roomstate) {
console.log("正在结算");
t.emit("game_settle_event", event);
}
if (1 == this.roomstate) {
n.active = !0;
i.default.playerData.rate = 1;
this.beishu_label.string = "倍数:1";
t.emit("room_waitready");
n.emit("room_waitready");
this.emitEventToPlayer("room_waitready");
}
} else console.log("get childer name gameingUI");
}.bind(this));
i.default.socket.onQuitPlayer(function(e) {
console.log("onQuitPlayer:" + e);
this.removePlayerNode(e);
}.bind(this));
this.node.on("canrob_event", function(e) {
console.log("gamescene canrob_event:" + e);
for (var t = 0; t < this.playerNodeList.length; t++) {
var n = this.playerNodeList[t];
n && n.emit("playernode_canrob_event", e);
}
}.bind(this));
this.node.on("choose_card_event", function(e) {
console.log("--------choose_card_event-----------");
var t = this.node.getChildByName("container").getChildByName("gameingUI");
null != t ? t.emit("choose_card_event", e) : console.log("get childer name gameingUI");
}.bind(this));
this.node.on("unchoose_card_event", function(e) {
console.log("--------unchoose_card_event-----------");
var t = this.node.getChildByName("container").getChildByName("gameingUI");
null != t ? t.emit("unchoose_card_event", e) : console.log("get childer name gameingUI");
}.bind(this));
i.default.socket.request_enter_room({}, function(e, t) {
console.log("enter_room_resp" + JSON.stringify(t));
if (0 != e) console.log("enter_room_resp err:" + e); else {
var n = t.seatindex;
this.playerdata_list_pos = [];
this.setPlayerSeatPos(n);
var a = t.playerdata, o = t.roomid;
this.roomid_label.string = "房间号:" + o;
i.default.playerData.housemanageid = t.housemanageid;
for (var r = 0; r < a.length; r++) this.addPlayerNode(a[r]);
if (isopen_sound) {
cc.audioEngine.stopAll();
cc.audioEngine.play(this.bgAudio, !0);
}
}
this.node.getChildByName("container").getChildByName("gamebeforeUI").emit("init");
}.bind(this));
i.default.socket.onPlayerJoinRoom(function(e) {
console.log("onPlayerJoinRoom:" + JSON.stringify(e));
this.addPlayerNode(e);
}.bind(this));
i.default.socket.onPlayerReady(function(e) {
console.log("-------onPlayerReady:" + e);
for (var t = 0; t < this.playerNodeList.length; t++) {
var n = this.playerNodeList[t];
n && n.emit("player_ready_notify", e);
}
}.bind(this));
i.default.socket.onGameStart(function() {
for (var e = 0; e < this.playerNodeList.length; e++) {
var t = this.playerNodeList[e];
t && t.emit("gamestart_event");
}
var n = this.node.getChildByName("container").getChildByName("gamebeforeUI");
n && (n.active = !1);
}.bind(this));
i.default.socket.onRobState(function(e) {
console.log("-----onRobState" + JSON.stringify(e));
for (var t = 0; t < this.playerNodeList.length; t++) {
var n = this.playerNodeList[t];
n && n.emit("playernode_rob_state_event", e);
}
}.bind(this));
i.default.socket.onChangeMaster(function(e) {
console.log("onChangeMaster" + e);
i.default.playerData.master_accountid = e;
for (var t = 0; t < this.playerNodeList.length; t++) {
var n = this.playerNodeList[t];
n && n.emit("playernode_changemaster_event", e);
}
}.bind(this));
i.default.socket.onShowBottomCard(function(e) {
console.log("onShowBottomCard---------" + e);
var t = this.node.getChildByName("container").getChildByName("gameingUI");
null != t ? t.emit("show_bottom_card_event", e) : console.log("get childer name gameingUI");
}.bind(this));
i.default.socket.onBeiShuUpdate(function(e) {
console.log("onBeiShuUpdate----------" + e);
console.log(i.default.playerData.rate);
this.beishu_label.string = "倍数:" + e;
i.default.playerData.rate = e;
}.bind(this));
},
setPlayerSeatPos: function(e) {
if (e < 1 || e > 3) console.log("seat_index error" + e); else {
console.log("setPlayerSeatPos seat_index:" + e);
switch (e) {
case 1:
this.playerdata_list_pos[1] = 0;
this.playerdata_list_pos[2] = 1;
this.playerdata_list_pos[3] = 2;
break;

case 2:
this.playerdata_list_pos[2] = 0;
this.playerdata_list_pos[3] = 1;
this.playerdata_list_pos[1] = 2;
break;

case 3:
this.playerdata_list_pos[3] = 0;
this.playerdata_list_pos[1] = 1;
this.playerdata_list_pos[2] = 2;
}
}
},
removePlayerNode: function(e) {
var t = this;
this.playerNodeList.forEach(function(n, i) {
if (n.accountid == e.accountid) {
n.destroy();
t.playerNodeList.splice(i, 1);
console.log(n, i);
}
});
console.log(this.playerNodeList);
},
addPlayerNode: function(e) {
var t = cc.instantiate(this.player_node_prefabs);
t.parent = this.node.getChildByName("container");
t.accountid = e.accountid;
this.playerNodeList.push(t);
var n = this.playerdata_list_pos[e.seatindex];
console.log("index " + e.seatindex + " " + n);
t.position = this.players_seat_pos.children[n].position;
t.getComponent("player_node").init_data(e, n);
i.default.allPlayerData.push(e);
console.log(this.node.getChildByName("container").children);
},
emitEventToPlayer: function(e, t) {
for (var n = 0; n < this.playerNodeList.length; n++) {
var i = this.playerNodeList[n];
i && i.emit(e, t);
}
},
start: function() {},
getUserOutCardPosByAccount: function(e) {
console.log("getUserOutCardPosByAccount accountid:" + e);
for (var t = 0; t < this.playerNodeList.length; t++) {
var n = this.playerNodeList[t];
if (n) {
var i = n.getComponent("player_node");
if (i.accountid === e) {
var a = this.players_seat_pos.children[i.seat_index], o = "cardsoutzone" + i.seat_index;
return a.getChildByName(o);
}
}
}
return null;
},
openWebView: function() {
this.webview.active = !0;
},
closeWebView: function() {
this.webview.active = !1;
},
quitRoom: function() {
i.default.socket.request_quit_room({}, function(e, t) {
if (0 != e) {
console.log("requestStart err" + e);
this.tipsLabel.string = t;
setTimeout(function() {
this.tipsLabel.string = "";
}.bind(this), 2e3);
} else {
console.log("requestStart data" + JSON.stringify(t));
cc.director.loadScene("hallScene");
}
}.bind(this));
},
onDestroy: function() {
i.default.socket.clearEvent();
}
});
cc._RF.pop();
}, {
"../mygolbal.js": "mygolbal"
} ],
game_item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4b395QZ31hLDp/XC3YhgTR3", "game_item");
cc.Class({
extends: cc.Component,
properties: {
icon_pic: cc.Sprite,
label_name: cc.Label
},
start: function() {},
setData: function(e, t) {
var n = this;
try {
cc.loader.load({
url: e.game_logo,
type: "png"
}, function(e, t) {
n.icon_pic.spriteFrame = new cc.SpriteFrame(t);
});
} catch (e) {
console.warn(e);
}
this.label_name.string = e.game_name;
this.bundleId = e.bundleId;
this.callback = t;
this.datas = e;
},
jumpTo: function() {
this.callback(this.bundleId, this.datas);
}
});
cc._RF.pop();
}, {} ],
gamebeforeUI: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "34b69bK3SJBFbE0zzOU1X9M", "gamebeforeUI");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
btn_ready: cc.Node,
btn_gamestart: cc.Node,
tipsLabel: cc.Label,
btn_quit: cc.Node
},
onLoad: function() {
this.btn_gamestart.active = !1;
this.btn_ready.active = !1;
this.node.on("init", function() {
console.log("game beforeui init");
console.log("myglobal.playerData.housemanageid" + i.default.playerData.housemanageid);
console.log("myglobal.playerData.accountID" + i.default.playerData.accountID);
if (i.default.playerData.housemanageid == i.default.playerData.accountID) {
this.btn_gamestart.active = !0;
this.btn_ready.active = !1;
} else {
this.btn_gamestart.active = !1;
this.btn_ready.active = !0;
}
}.bind(this));
this.node.on("room_waitready", function() {
if (i.default.playerData.housemanageid == i.default.playerData.accountID) {
this.btn_gamestart.active = !0;
this.btn_ready.active = !1;
this.btn_quit.active = !0;
} else {
this.btn_gamestart.active = !1;
this.btn_ready.active = !0;
this.btn_quit.active = !0;
}
}.bind(this));
this.node.on("ready", function() {
this.btn_ready.active = !1;
this.btn_quit.active = !1;
}.bind(this));
i.default.socket.onChangeHouseManage(function(e) {
console.log("gamebrforeUI onChangeHouseManage revice" + JSON.stringify(e));
i.default.playerData.housemanageid = e;
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("onChangeHouseManage");
if (i.default.playerData.housemanageid == i.default.playerData.accountID) {
this.btn_gamestart.active = !0;
this.btn_ready.active = !1;
this.btn_quit.active = !0;
} else this.btn_gamestart.active = !1;
}.bind(this));
},
start: function() {},
onButtonClick: function(e, t) {
switch (t) {
case "btn_ready":
console.log("btn_ready");
i.default.socket.requestReady();
this.btn_ready.active = !1;
this.btn_quit.active = !1;
break;

case "btn_start":
console.log("btn_start");
i.default.socket.requestStart(function(e, t) {
if (0 != e) {
console.log("requestStart err" + e);
this.tipsLabel.string = t;
setTimeout(function() {
this.tipsLabel.string = "";
}.bind(this), 2e3);
} else console.log("requestStart data" + JSON.stringify(t));
}.bind(this));
}
}
});
cc._RF.pop();
}, {
"../mygolbal.js": "mygolbal"
} ],
gameingUI: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fc5fbLb+LFG+rCIt1gYkSVX", "gameingUI");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
gameingUI: cc.Node,
card_prefab: cc.Prefab,
failPanel: cc.Prefab,
winPanel: cc.Prefab,
robUI: cc.Node,
bottom_card_pos_node: cc.Node,
playingUI_node: cc.Node,
tipsLabel: cc.Label,
startAudio: {
default: null,
type: cc.AudioClip
},
buyaoAudio: {
default: null,
type: cc.AudioClip
},
wangzhaAudio: {
default: null,
type: cc.AudioClip
},
daniAudio: {
default: null,
type: cc.AudioClip
},
qiangdizhuAudio: {
default: null,
type: cc.AudioClip
},
lianduiAudio: {
default: null,
type: cc.AudioClip
},
shunziAudio: {
default: null,
type: cc.AudioClip
},
zhadan: {
default: null,
type: cc.AudioClip
},
feiji: {
default: null,
type: cc.AudioClip
},
sandaiyi: {
default: null,
type: cc.AudioClip
},
sandaiyidui: {
default: null,
type: cc.AudioClip
},
baojin1: {
default: null,
type: cc.AudioClip
},
baojin2: {
default: null,
type: cc.AudioClip
},
baojin: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
this.cards_nods = [];
this.card_width = 0;
this.rob_player_accountid = 0;
this.fapai_end = !1;
this.bottom_card = [];
this.bottom_card_data = [];
this.choose_card_data = [];
this.outcar_zone = [];
this.push_card_tmp = [];
this.node.on(cc.Node.EventType.TOUCH_START, this.startCallback, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.endCallback, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveCallback, this);
i.default.socket.disconnect(function(e) {
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("disconnect", e);
}.bind(this));
i.default.socket.onPushCards(function(e) {
console.log("onPushCards" + JSON.stringify(e));
this.card_data = e;
this.cur_index_card = e.length - 1;
this.pushCard(e);
isopen_sound && console.log("start fapai_audioID" + this.fapai_audioID);
this.scheduleOnce(this._runactive_pushcard.bind(this), .3);
this.node.parent.parent.emit("pushcard_other_event");
}.bind(this));
i.default.socket.onCanRobState(function(e) {
console.log("onCanRobState" + JSON.stringify(e));
this.rob_player_accountid = e;
e == i.default.playerData.accountID && 1 == this.fapai_end && (this.robUI.active = !0);
}.bind(this));
i.default.socket.oninterval(function(e) {
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("interval", e);
if (e.accountid == i.default.playerData.accountID) if (6 == i.default.roomState) {
this.playingUI_node.active = !0;
this.playingUI_node.getChildByName("clock").getChildByName("playing_clocl_label").getComponent(cc.Label).string = e.time;
} else {
this.robUI.active = !0;
this.robUI.getChildByName("clock").getChildByName("clock_ Label").getComponent(cc.Label).string = e.time;
}
}.bind(this));
i.default.socket.onendInterval(function(e) {
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("endInterval", e);
if (e.accountid == i.default.playerData.accountID) {
this.robUI.active = !1;
this.playingUI_node.active = !1;
}
}.bind(this));
i.default.socket.onCanChuCard(function(e) {
console.log("onCanChuState" + JSON.stringify(e));
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("onCanChuCard", e);
if (e.accountid == i.default.playerData.accountID) {
this.clearOutZone(i.default.playerData.accountID);
this.playingUI_node.active = !0;
1 == e.status ? this.playingUI_node.getChildByName("btn_buchu_node").active = !1 : this.playingUI_node.getChildByName("btn_buchu_node").active = !0;
}
}.bind(this));
i.default.socket.onOtherPlayerChuCard(function(e) {
console.log("onOtherPlayerChuCard" + JSON.stringify(e));
var t = e.accountid, n = this.node.parent.parent.getComponent("gameScene"), a = n.getUserOutCardPosByAccount(t);
if (null != a) if (null != e.cards) {
n.emitEventToPlayer("onOtherPlayerChuCard", e);
for (var o = [], r = 0; r < e.cards.length; r++) {
var c = cc.instantiate(this.card_prefab);
c.getComponent("card").showCards(e.cards[r].card_data, i.default.playerData.accountID);
o.push(c);
}
this.appendOtherCardsToOutZone(a, o, 0);
this.playPushCardSound(e.cardType.name);
if (e.accountid == i.default.playerData.accountID) {
this.destoryCard(e.accountid, e.cards);
this.choose_card_data = [];
}
} else {
n.emitEventToPlayer("onBuChu", e);
a.removeAllChildren(!0);
cc.audioEngine.play(this.buyaoAudio);
}
}.bind(this));
i.default.socket.onGameResult(function(e) {
var t = this;
console.log("onGameResult" + JSON.stringify(e));
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("onGameResult", e);
e.forEach(function(n) {
console.log(n);
if (n.account == i.default.playerData.accountID) {
console.log(n.change);
if (n.change < 0) {
var a = cc.instantiate(t.failPanel);
a.getComponent("failPanel").initData(e);
a.parent = t.node.parent;
} else {
var o = cc.instantiate(t.winPanel);
o.getComponent("winPanel").initData(e);
o.parent = t.node.parent;
}
}
});
}.bind(this));
this.node.on("room_waitready", function() {
this.robUI.active = !1;
this.fapai_end = !1;
this.playingUI_node.active = !1;
this.push_card_tmp = [];
this.choose_card_data = [];
this.destoryAllCard();
this.bottom_card.forEach(function(e) {
e.removeFromParent(!0);
});
this.bottom_card_data = [];
this.bottom_card = [];
}.bind(this));
this.node.on("show_bottom_card_event", function(e) {
console.log("----show_bottom_card_event", +e);
this.bottom_card_data = e;
for (var t = 0; t < e.length; t++) {
var n = this.bottom_card[t], a = e[t], o = {
obj: n,
data: a
};
console.log("bottom show_data:" + JSON.stringify(a));
var r = cc.callFunc(function(e, t) {
var n = t.obj, i = t.data;
n.getComponent("card").showCards(i);
}, this, o);
n.runAction(cc.sequence(cc.rotateBy(0, 0, 180), cc.rotateBy(.2, 0, -90), r, cc.rotateBy(.2, 0, -90), cc.scaleBy(1, 1.2)));
cc.audioEngine.play(this.startAudio);
}
i.default.playerData.accountID == i.default.playerData.master_accountid && this.scheduleOnce(this.pushThreeCard.bind(this), .2);
this.node.parent.parent.getComponent("gameScene").emitEventToPlayer("show_bottom_card_event");
}.bind(this));
this.node.on("choose_card_event", function(e) {
console.log("choose_card_event:" + JSON.stringify(e));
var t = e;
this.choose_card_data.push(t);
}.bind(this));
this.node.on("unchoose_card_event", function(e) {
console.log("unchoose_card_event:" + e);
for (var t = e, n = 0; n < this.choose_card_data.length; n++) this.choose_card_data[n].cardid == t && this.choose_card_data.splice(n, 1);
}.bind(this));
this.node.on("game_settle_event", function(e) {
console.log("game_settle_event:" + e);
this.tipsLabel.string = "正在结算!";
setTimeout(function() {
this.tipsLabel.string = "";
}.bind(this), 2e3);
}.bind(this));
},
_getCardForTouch: function(e) {
for (var t = this.cards_nods.length - 1; t >= 0; t--) {
var n = this.cards_nods[t];
if (n.getBoundingBox().contains(e)) {
console.log("in");
n.isChiose = !0;
n.opacity = 185;
return;
}
}
},
_checkSelectCardReserve: function(e, t) {
var n = e.x - 5 < t.x ? e : t;
console.log(e.x, t.x);
if (n === t) for (var i in this.cards_nods) {
var a = this.cards_nods[i];
if (n.x - a.x > -25) {
a.opacity = 255;
console.warn(!1);
a.isChiose = !1;
}
} else for (var o = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y) > 5 ? Math.abs(e.y - t.y) : 5, c = cc.rect(n.x, n.y, o, r), s = 0; s < this.cards_nods.length; s++) if (!this.cards_nods[s].getBoundingBox().intersects(c)) {
this.cards_nods[s].isChiose = !1;
console.warn(!0);
this.cards_nods[s].opacity = 255;
}
},
startCallback: function(e) {
if (this.node.parent.parent.getComponent("gameScene").roomstate == RoomState.ROOM_PLAYING) {
console.log("start");
var t = e.getTouches()[0].getLocation();
this.touchStart = this.node.parent.convertToNodeSpaceAR(t);
this._getCardForTouch(this.touchStart);
}
},
moveCallback: function(e) {
if (this.node.parent.parent.getComponent("gameScene").roomstate == RoomState.ROOM_PLAYING) {
console.log("move");
var t = e.getTouches()[0].getLocation();
this.touchMove = this.node.parent.convertToNodeSpaceAR(t);
this._getCardForTouch(this.touchMove);
this._checkSelectCardReserve(this.touchStart, this.touchMove);
}
},
endCallback: function(e) {
if (this.node.parent.parent.getComponent("gameScene").roomstate == RoomState.ROOM_PLAYING) {
console.log("end");
for (var t = 0; t < this.cards_nods.length; t++) {
var n = this.cards_nods[t], i = {
cardid: n.card_id,
card_data: n.card_data
};
if (n.isChiose) {
n.isChiose = !1;
n.opacity = 255;
if (1 === n.status) {
n.status = 2;
n.y -= 20;
this.node.emit("unchoose_card_event", n.card_id);
} else {
n.status = 1;
n.y += 20;
this.node.emit("choose_card_event", i);
}
}
}
}
},
start: function() {},
_runactive_pushcard: function() {
if (this.cur_index_card < 0) {
console.log("pushcard end");
this.fapai_end = !0;
cc.audioEngine.stop(this.fapai_audioID);
} else {
(t = this.cards_nods[this.cards_nods.length - this.cur_index_card - 1]).active = !0;
this.push_card_tmp.push(t);
this.fapai_audioID = cc.audioEngine.play(cc.url.raw("resources/sound/fapai1.mp3"));
for (var e = 0; e < this.push_card_tmp.length - 1; e++) {
var t, n = (t = this.push_card_tmp[e]).x - .4 * this.card_width, i = cc.moveTo(.05, cc.v2(n, -250));
t.runAction(i);
}
this.cur_index_card--;
this.scheduleOnce(this._runactive_pushcard.bind(this), .15);
}
},
sortCard: function() {
this.cards_nods.sort(function(e, t) {
var n = e.getComponent("card").card_data, i = t.getComponent("card").card_data;
return n.hasOwnProperty("value") && i.hasOwnProperty("value") ? i.value - n.value : n.hasOwnProperty("king") && !i.hasOwnProperty("king") ? -1 : !n.hasOwnProperty("king") && i.hasOwnProperty("king") ? 1 : n.hasOwnProperty("king") && i.hasOwnProperty("king") ? i.king - n.king : void 0;
});
setTimeout(function() {
var e = this.cards_nods[0].x;
console.log("sort x:" + e);
e > 0 && (e = -400);
for (var t = 0; t < this.cards_nods.length; t++) {
var n = this.cards_nods[t];
n.zIndex = t;
n.x = e + .4 * n.width * t;
}
}.bind(this), 1e3);
},
pushCard: function(e) {
e && e.sort(function(e, t) {
return e.hasOwnProperty("value") && t.hasOwnProperty("value") ? t.value - e.value : e.hasOwnProperty("king") && !t.hasOwnProperty("king") ? -1 : !e.hasOwnProperty("king") && t.hasOwnProperty("king") ? 1 : e.hasOwnProperty("king") && t.hasOwnProperty("king") ? t.king - e.king : void 0;
});
this.cards_nods = [];
for (var t = 0; t < 17; t++) {
var n = cc.instantiate(this.card_prefab);
n.scale = .8;
n.parent = this.node.parent;
n.x = .4 * n.width * -.5 * -16 + .4 * n.width * 0;
n.y = -250;
n.active = !1;
n.getComponent("card").showCards(e[t], i.default.playerData.accountID);
n.card_id = e[t].index;
n.card_data = e[t];
n.status = 2;
this.cards_nods.push(n);
this.card_width = n.width;
}
this.bottom_card = [];
for (t = 0; t < 3; t++) {
var a = cc.instantiate(this.card_prefab);
a.scale = .4;
a.position = this.bottom_card_pos_node.position;
0 == t ? a.x = a.x - .4 * a.width : 2 == t && (a.x = a.x + .4 * a.width);
a.parent = this.node.parent;
this.bottom_card.push(a);
}
},
schedulePushThreeCard: function() {
for (var e = 0; e < this.cards_nods.length; e++) {
var t = this.cards_nods[e];
-230 == t.y && (t.y = -250);
}
},
pushThreeCard: function() {
for (var e = this.cards_nods[this.cards_nods.length - 1].x, t = 0; t < this.bottom_card_data.length; t++) {
var n = cc.instantiate(this.card_prefab);
n.scale = .8;
n.parent = this.node.parent;
n.x = e + (t + 1) * this.card_width * .4;
n.y = -230;
n.getComponent("card").showCards(this.bottom_card_data[t], i.default.playerData.accountID);
n.active = !0;
n.card_id = this.bottom_card_data[t].index;
n.card_data = this.bottom_card_data[t];
n.status = 2;
this.cards_nods.push(n);
}
this.sortCard();
this.scheduleOnce(this.schedulePushThreeCard.bind(this), 2);
},
destoryAllCard: function() {
this.cards_nods.forEach(function(e) {
e.removeFromParent(!0);
});
},
destoryCard: function(e, t) {
if (0 != t.length) {
for (var n = [], i = 0; i < t.length; i++) for (var a = 0; a < this.cards_nods.length; a++) {
var o = this.cards_nods[a].getComponent("card").card_id;
if (o == t[i].cardid) {
console.log("destroy card id:" + o);
this.cards_nods[a].removeFromParent(!0);
n.push(this.cards_nods[a]);
this.cards_nods.splice(a, 1);
}
}
if (1 == this.cards_nods.length) {
cc.audioEngine.play(this.baojin);
cc.audioEngine.play(this.baojin1);
}
if (2 == this.cards_nods.length) {
cc.audioEngine.play(this.baojin);
cc.audioEngine.play(this.baojin2);
}
this.appendCardsToOutZone(e, n);
this.updateCards();
this.cards_nods.forEach(function(e) {
e.y = -250;
e.isChiose = !1;
e.status = 2;
});
}
},
clearOutZone: function(e) {
for (var t = this.node.parent.parent.getComponent("gameScene").getUserOutCardPosByAccount(e), n = t.children, i = 0; i < n.length; i++) {
n[i].destroy();
}
t.removeAllChildren(!0);
},
pushCardSort: function(e) {
1 != e.length && e.sort(function(e, t) {
var n = e.getComponent("card").card_data, i = t.getComponent("card").card_data;
return n.hasOwnProperty("value") && i.hasOwnProperty("value") ? i.value - n.value : n.hasOwnProperty("king") && !i.hasOwnProperty("king") ? -1 : !n.hasOwnProperty("king") && i.hasOwnProperty("king") ? 1 : n.hasOwnProperty("king") && i.hasOwnProperty("king") ? i.king - n.king : void 0;
});
},
appendOtherCardsToOutZone: function(e, t, n) {
e.removeAllChildren(!0);
for (var i = 0; i < t.length; i++) {
var a = t[i];
e.addChild(a, 100 + i);
}
var o = t.length / 2;
for (i = 0; i < t.length; i++) {
var r = e.getChildren()[i], c = 30 * (i - o), s = r.y + n;
r.setScale(.5, .5);
r.setPosition(c, s);
}
},
appendCardsToOutZone: function(e, t) {
if (0 != t.length) {
this.pushCardSort(t);
var n = this.node.parent.parent.getComponent("gameScene").getUserOutCardPosByAccount(e);
this.appendOtherCardsToOutZone(n, t, 360);
}
},
updateCards: function() {
for (var e = this.cards_nods.length / 2, t = 0; t < this.cards_nods.length; t++) {
var n = this.cards_nods[t], i = (t - e) * (.4 * this.card_width);
n.setPosition(i, -250);
}
},
playPushCardSound: function(e) {
console.log("playPushCardSound:" + e);
if ("" != e) switch (e) {
case CardsValue.one.name:
break;

case CardsValue.double.name:
cc.audioEngine.play(cc.url.raw("resources/sound/duizi.mp3"));
break;

case CardsValue.kingboom.name:
console.log("王炸");
cc.audioEngine.play(this.wangzhaAudio);
break;

case CardsValue.doubleScroll.name:
cc.audioEngine.play(this.lianduiAudio);
break;

case CardsValue.scroll.name:
cc.audioEngine.play(this.shunziAudio);
break;

case CardsValue.boom.name:
cc.audioEngine.play(this.zhadan);
break;

case CardsValue.threeWithOne.name:
cc.audioEngine.play(this.sandaiyi);
break;

case CardsValue.threeWithTwo.name:
cc.audioEngine.play(this.sandaiyidui);
break;

case CardsValue.plane.name:
case CardsValue.planeWithOne.name:
case CardsValue.planeWithTwo.name:
cc.audioEngine.play(this.feiji);
}
},
onButtonClick: function(e, t) {
switch (t) {
case "btn_qiandz":
console.log("btn_qiandz");
i.default.socket.requestRobState(qian_state.qian);
this.robUI.active = !1;
cc.audioEngine.play(cc.url.raw("resources/sound/woman_jiao_di_zhu.ogg"));
break;

case "btn_buqiandz":
console.log("btn_buqiandz");
i.default.socket.requestRobState(qian_state.buqiang);
this.robUI.active = !1;
cc.audioEngine.play(cc.url.raw("resources/sound/woman_bu_jiao.ogg"));
break;

case "nopushcard":
i.default.socket.request_buchu_card([], null);
this.playingUI_node.active = !1;
break;

case "pushcard":
if (0 == this.choose_card_data.length) {
this.tipsLabel.string = "请选择牌!";
setTimeout(function() {
this.tipsLabel.string = "";
}.bind(this), 2e3);
}
i.default.socket.request_chu_card(this.choose_card_data, function(e, t) {
if (e) {
console.log("request_chu_card:" + e);
console.log("request_chu_card" + JSON.stringify(t));
if ("" == this.tipsLabel.string) {
this.tipsLabel.string = t;
setTimeout(function() {
this.tipsLabel.string = "";
}.bind(this), 2e3);
}
for (var n = 0; n < this.cards_nods.length; n++) {
this.cards_nods[n].emit("reset_card_flag");
}
this.choose_card_data = [];
} else {
console.log("resp_chu_card data:" + JSON.stringify(t));
this.playingUI_node.active = !1;
}
}.bind(this));
}
}
});
cc._RF.pop();
}, {
"../mygolbal.js": "mygolbal"
} ],
hallScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9eee7bdCqVB/LXv3XqKAza9", "hallScene");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("./../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
nickname_label: cc.Label,
headimage: cc.Sprite,
gobal_count: cc.Label,
creatroom_prefabs: cc.Prefab,
joinroom_prefabs: cc.Prefab,
TipsLabel: cc.Label
},
onLoad: function() {
this.nickname_label.string = i.default.playerData.nickName;
this.gobal_count.string = i.default.playerData.gobal_count;
cc.loader.load({
url: i.default.playerData.avatarUrl,
type: "jpg"
}, function(e, t) {
e ? console.log(e.message || e) : this.headimage.spriteFrame = new cc.SpriteFrame(t);
}.bind(this));
},
start: function() {},
quitGame: function() {
cc.director.loadScene("Dssc", function() {
cc.audioEngine.pauseAll();
console.log("切换场景");
});
},
onButtonClick: function(e, t) {
switch (t) {
case "create_room":
var n = cc.instantiate(this.creatroom_prefabs);
n.parent = this.node.getChildByName("container");
n.zIndex = 100;
break;

case "join_room":
var i = cc.instantiate(this.joinroom_prefabs);
i.parent = this.node.getChildByName("container");
i.zIndex = 100;
break;

case "quick":
this.TipsLabel.string = "敬请期待";
setTimeout(function() {
this.TipsLabel.string = "";
}.bind(this), 2e3);
}
}
});
cc._RF.pop();
}, {
"./../mygolbal.js": "mygolbal"
} ],
jiaoyi_item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "58cfcghr3hCOJvxQTng2PSu", "jiaoyi_item");
cc.Class({
extends: cc.Component,
properties: {
icon_logo: cc.Sprite,
label_num: cc.Label,
label_name: cc.Label,
label_count: cc.Label,
label_rmb: cc.Label,
label_dollor: cc.Label,
label_bank: cc.Label,
progress: cc.ProgressBar
},
start: function() {},
setData: function(e, t) {
var n = this;
try {
cc.loader.load({
url: t.icon,
type: "png"
}, function(e, t) {
n.UserData[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
});
} catch (e) {
console.warn(e);
}
this.label_num.string = e + 1 + ".";
this.label_name.string = t.name;
this.label_count.string = t.tradeQuantity;
this.label_rmb.string = t.rmbAmount;
this.label_dollor.string = t.usdtAmount;
}
});
cc._RF.pop();
}, {} ],
joinRoomNiuNiu: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d4ff7poW5ZCAYNWhB0b+2Oq", "joinRoomNiuNiu");
cc.Class({
extends: cc.Component,
properties: {
joinids: {
type: cc.Label,
default: []
}
},
onLoad: function() {
this.joinid = "";
this.cur_input_count = -1;
},
start: function() {},
onButtonClick: function(e, t) {
if (1 === t.length) {
if (this.joinid.length >= 5) return;
this.joinid += t;
this.cur_input_count += 1;
this.joinids[this.cur_input_count].string = t;
console.log("customData:" + t);
}
switch (t) {
case "back":
if (this.cur_input_count < 0) return;
this.joinids[this.cur_input_count].string = "";
this.cur_input_count -= 1;
this.joinid = this.joinid.substring(0, this.joinid.length - 1);
break;

case "clear":
for (var n = 0; n < 5; ++n) this.joinids[n].string = "";
this.joinid = "";
this.cur_input_count = -1;
break;

case "close":
this.node.destroy();
break;

case "join":
GlobalNiuNiu.netProxy.enterRoom(parseInt(this.joinid), function(e) {
GlobalNiuNiu.gameMgr.onEnterRoom(e);
});
}
},
close: function() {
this.node.active = !1;
}
});
cc._RF.pop();
}, {} ],
joinRoom: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9b543i+qr1Px4nfSdBwSJcb", "joinRoom");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
joinids: {
type: cc.Label,
default: []
}
},
onLoad: function() {
this.joinid = "";
this.cur_input_count = -1;
},
start: function() {},
onButtonClick: function(e, t) {
if (1 === t.length) {
this.joinid += t;
this.cur_input_count += 1;
this.joinids[this.cur_input_count].string = t;
if (this.joinid.length >= 6) {
var n = {
roomid: this.joinid
};
i.default.socket.request_jion(n, function(e, t) {
if (e) {
console.log("err" + e);
var n = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
n.string = t;
setTimeout(function() {
n.string = "";
}, 2e3);
} else {
console.log("join room sucess" + JSON.stringify(t));
i.default.playerData.bottom = t.bottom;
i.default.playerData.rate = t.rate;
cc.director.loadScene("gameScene");
}
});
return;
}
console.log("customData:" + t);
}
switch (t) {
case "back":
if (this.cur_input_count < 0) return;
this.joinids[this.cur_input_count].string = "";
this.cur_input_count -= 1;
this.joinid = this.joinid.substring(0, this.joinid.length - 1);
break;

case "clear":
for (var a = 0; a < 6; ++a) this.joinids[a].string = "";
this.joinid = "";
this.cur_input_count = -1;
break;

case "close":
this.node.destroy();
}
}
});
cc._RF.pop();
}, {
"../../mygolbal.js": "mygolbal"
} ],
loginScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b05a68gSOpBWr8ddvT03Jpj", "loginScene");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
wait_node: cc.Node,
tipsLabel: cc.Label,
loginBg: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
var e = this;
cc.audioEngine.play(this.loginBg, !0);
cc.director.GlobalEvent.on("connected", function() {
i.default.socket.login({
token: e.GetQueryVariable("token")
}, function(e, t) {
if (0 == e) {
console.log("login sucess" + JSON.stringify(t));
console.log(t);
i.default.playerData.gobal_count = t.goldCount;
i.default.playerData.accountID = t.accountID;
i.default.playerData.avatarUrl = t.avatarUrl;
i.default.playerData.nickName = t.nickName;
cc.director.loadScene("hallScene");
} else {
console.log("err:" + e);
this.tipsLabel.string = t;
setTimeout(function() {
this.tipsLabel.string = "";
}.bind(this), 2e3);
}
}.bind(e));
}, this);
i.default.socket.initSocket();
},
start: function() {},
onButtonCilck: function(e, t) {
switch (t) {
case "wx_login":
console.log("wx_login request");
}
},
GetQueryVariable: function(e) {
for (var t = window.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
var i = t[n].split("=");
if (i[0] == e) return i[1];
}
return !1;
}
});
cc._RF.pop();
}, {
"../mygolbal.js": "mygolbal"
} ],
mygolbal: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d9667atqdBHIb60A67blB9L", "mygolbal");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = r(e("./data/socket_ctr.js")), a = r(e("./data/player.js")), o = r(e("./util/event_lister.js"));
function r(e) {
return e && e.__esModule ? e : {
default: e
};
}
var c = {} || c;
c.socket = (0, i.default)();
c.playerData = (0, a.default)();
c.eventlister = (0, o.default)({});
c.roomState = 0;
c.allPlayerData = [];
n.default = c;
t.exports = n.default;
cc._RF.pop();
}, {
"./data/player.js": "player",
"./data/socket_ctr.js": "socket_ctr",
"./util/event_lister.js": "event_lister"
} ],
"one-side-platform": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f8e61M/TG5ANLU1Ddp1eJnx", "one-side-platform");
var i = cc.Enum({
UP_TO_DOWN: 1,
DOWN_TO_UP: 2,
LEFT_TO_RIGHT: 3,
RIGHT_TO_LEFT: 4
});
cc.Class({
extends: cc.Component,
properties: {
penetrateSide: {
tooltip: "穿透方向",
type: i,
default: i.DOWN_TO_UP
}
},
onLoad: function() {
this.pointVelPlatform = cc.v2();
this.pointVelOther = cc.v2();
this.relativeVel = cc.v2();
this.relativePoint = cc.v2();
},
onBeginContact: function(e, t, n) {
this._pointsCache;
for (var a = n.body, o = t.body, r = e.getWorldManifold().points, c = this.pointVelPlatform, s = this.pointVelOther, l = this.relativeVel, u = this.relativePoint, d = 0; d < r.length; d++) {
o.getLinearVelocityFromWorldPoint(r[d], c);
a.getLinearVelocityFromWorldPoint(r[d], s);
o.getLocalVector(s.subSelf(c), l);
if (this.penetrateSide === i.DOWN_TO_UP) {
if (l.y < -32) return;
if (l.y < 32) {
o.getLocalPoint(r[d], u);
var h = t.getAABB().height / 2;
if (u.y > h - 3.2) return;
}
} else if (this.penetrateSide === i.UP_TO_DOWN) {
if (l.y > 32) return;
if (l.y < -32) {
o.getLocalPoint(r[d], u);
var g = t.getAABB().height / 2;
if (u.y < g - 3.2) return;
}
} else if (this.penetrateSide === i.LEFT_TO_RIGHT) {
if (l.x < -32) return;
if (l.x < 32) {
cc.log("===-=-=-=");
o.getLocalPoint(r[d], u);
var f = t.getAABB().width / 2;
if (u.x > f - 3.2) return;
}
} else if (this.penetrateSide === i.RIGHT_TO_LEFT) {
if (l.x > 32) return;
if (l.x < -32) {
o.getLocalPoint(r[d], u);
var p = t.getAABB().width / 2;
if (u.x < p - 3.2) return;
}
}
}
e.disabled = !0;
}
});
cc._RF.pop();
}, {} ],
password: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "03c17Zpu2RFKas0ZRGNC/GO", "password");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
joinids: {
type: cc.Label,
default: []
},
joinid: null
},
onLoad: function() {
this.joinid = "";
this.cur_input_count = -1;
},
start: function() {},
filter: function() {
cc.log("点击过滤");
},
onButtonClick: function(e, t) {
if (1 === t.length) {
this.joinid += t;
this.cur_input_count += 1;
this.joinids[this.cur_input_count].string = t;
if (this.joinid.length >= 6) {
var n = {
roomid: this.joinid
};
i.default.socket.request_jion(n, function(e, t) {
if (e) {
console.log("err" + e);
var n = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
n.string = t;
setTimeout(function() {
n.string = "";
}, 2e3);
} else {
console.log("join room sucess" + JSON.stringify(t));
i.default.playerData.bottom = t.bottom;
i.default.playerData.rate = t.rate;
cc.director.loadScene("gameScene");
}
});
return;
}
console.log("customData:" + t);
}
switch (t) {
case "back":
if (this.cur_input_count < 0) return;
this.joinids[this.cur_input_count].string = "";
this.cur_input_count -= 1;
this.joinid = this.joinid.substring(0, this.joinid.length - 1);
break;

case "confirm":
n = {
roomid: this.joinid
};
i.default.socket.request_jion(n, function(e, t) {
if (e) {
console.log("err" + e);
var n = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
n.string = t;
setTimeout(function() {
n.string = "";
}, 2e3);
} else {
console.log("join room sucess" + JSON.stringify(t));
i.default.playerData.bottom = t.bottom;
i.default.playerData.rate = t.rate;
cc.director.loadScene("gameScene");
}
});
break;

case "close":
this.node.destroy();
}
}
});
cc._RF.pop();
}, {
"../../mygolbal.js": "mygolbal"
} ],
player_node: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "aa64aMZgnFIfLx2Lmi+lbwV", "player_node");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
account_label: cc.Label,
nickname_label: cc.Label,
room_touxiang: cc.Sprite,
globalcount_label: cc.Label,
headimage: cc.Sprite,
readyimage: cc.Node,
offlineimage: cc.Node,
card_node: cc.Node,
card_count: cc.Node,
card_prefab: cc.Prefab,
clockimage: cc.Node,
qiangdidzhu_node: cc.Node,
time_label: cc.Label,
robimage_sp: cc.SpriteFrame,
robnoimage_sp: cc.SpriteFrame,
robIconSp: cc.Sprite,
robIcon_Sp: cc.Node,
robnoIcon_Sp: cc.Node,
bu_chu: cc.Node,
masterIcon: cc.Node,
baojin1: {
default: null,
type: cc.AudioClip
},
baojin2: {
default: null,
type: cc.AudioClip
},
baojin: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
var e = this;
this.readyimage.active = !1;
this.offlineimage.active = !1;
this.node.on("gamestart_event", function(e) {
this.readyimage.active = !1;
}.bind(this));
this.node.on("push_card_event", function(e) {
console.log("on push_card_event");
this.accountid != i.default.playerData.accountID && this.pushCard();
}.bind(this));
this.node.on("playernode_rob_state_event", function(e) {
var t = e;
t.accountid == this.accountid && (this.qiangdidzhu_node.active = !1);
if (this.accountid == t.accountid) if (t.state == qian_state.qian) {
console.log("this.robIcon_Sp.active = true");
this.robIcon_Sp.active = !0;
} else t.state == qian_state.buqiang ? this.robnoIcon_Sp.active = !0 : console.log("get rob value :" + t.state);
}.bind(this));
this.node.on("playernode_changemaster_event", function(e) {
var t = e;
this.robIcon_Sp.active = !1;
this.robnoIcon_Sp.active = !1;
t == this.accountid && (this.masterIcon.active = !0);
}.bind(this));
this.node.on("onOtherPlayerChuCard", function(t) {
if (e.accountid == t.accountid) {
e.bu_chu.active = !1;
t.accountid != i.default.playerData.accountID && e.destoryCard(t);
}
}, this);
this.node.on("onBuChu", function(t) {
e.accountid == t.accountid && (e.bu_chu.active = !0);
});
this.node.on("room_waitready", function() {
try {
e.destoryAllCard();
e.masterIcon.active = !1;
e.robnoIcon_Sp.active = !1;
e.bu_chu.active = !1;
e.clearCard();
} catch (e) {
console.warn(e);
}
});
this.node.on("onCanChuCard", function(t) {
t.accountid == e.accountid && (e.bu_chu.active = !1);
});
this.node.on("interval", function(t) {
if (t.accountid == e.accountid && e.accountid != i.default.playerData.accountID) {
e.qiangdidzhu_node.active = !0;
e.time_label.string = t.time;
}
});
this.node.on("endInterval", function(t) {
t.accountid == e.accountid && e.accountid != i.default.playerData.accountID && (e.qiangdidzhu_node.active = !1);
});
this.node.on("onGameResult", function(t) {
t.forEach(function(t) {
t.account == e.accountid && (e.globalcount_label.string = t.amount);
});
});
this.node.on("onChangeHouseManage", function() {
console.log(e.accountid);
e.accountid == i.default.playerData.master_accountid && (e.readyimage.active = !1);
});
this.node.on("show_bottom_card_event", function() {
if (e.accountid == i.default.playerData.master_accountid) for (var t = 17; t < 20; t++) {
var n = cc.instantiate(e.card_prefab);
n.scale = .6;
n.parent = e.card_node;
var a = n.height;
n.y = 8 * a * .4 * .3 - .4 * a * .3 * t;
n.x = 0;
e.cardlist_node.push(n);
}
});
this.node.on("disconnect", function(t) {
t.accountid == e.accountid && (e.offlineimage.active = !0);
});
},
start: function() {},
init_data: function(e, t) {
console.log("init_data:" + JSON.stringify(e));
this.accountid = e.accountid;
this.account_label.string = e.accountid;
this.nickname_label.string = e.nick_name;
this.globalcount_label.string = e.goldcount;
this.cardlist_node = [];
this.seat_index = t;
1 == e.isready && (this.readyimage.active = !0);
e.avatarUrl;
cc.loader.load({
url: e.avatarUrl,
type: "jpg"
}, function(e, t) {
e ? console.log(e.message || e) : this.headimage.spriteFrame = new cc.SpriteFrame(t);
}.bind(this));
this.node.on("player_ready_notify", function(e) {
console.log("player_ready_notify event", e);
var t = e;
console.log("------player_ready_notify detail:" + t);
t == this.accountid && (this.readyimage.active = !0);
}.bind(this));
this.node.on("playernode_canrob_event", function(e) {
var t = e;
console.log("------playernode_canrob_event detail:" + t);
t == this.accountid && (this.qiangdidzhu_node.active = !0);
}.bind(this));
if (1 == t) {
this.card_node.x = -this.card_node.x - 30;
this.readyimage.x = -this.readyimage.x - 30;
this.robIcon_Sp.x = -this.robIcon_Sp.x - 30;
this.robnoIcon_Sp.x = -this.robnoIcon_Sp.x - 30;
this.bu_chu.x = -this.bu_chu.x - 30;
}
if (this.accountid == i.default.playerData.accountID) {
this.readyimage.x = 505;
this.robIcon_Sp.x = 505;
this.robnoIcon_Sp.x = 505;
this.bu_chu.x = 505;
this.readyimage.y = 158;
this.robIcon_Sp.y = 158;
this.robnoIcon_Sp.y = 158;
this.bu_chu.y = 208;
}
},
pushCard: function() {
this.card_node.active = !0;
for (var e = 0; e < 17; e++) {
var t = cc.instantiate(this.card_prefab);
t.scale = .6;
t.parent = this.card_node;
var n = t.height;
t.y = 8 * n * .4 * .3 - .4 * n * .3 * e;
t.x = 0;
this.cardlist_node.push(t);
}
this.card_count.y = 152.64 - 19.08 * 20;
this.card_count.getComponent(cc.Label).string = "剩17张";
},
clearCard: function() {
for (var e = this.node.parent.parent.getComponent("gameScene").getUserOutCardPosByAccount(this.accountid), t = e.children, n = 0; n < t.length; n++) {
t[n].destroy();
}
e.removeAllChildren(!0);
},
destoryCard: function(e) {
for (var t = 0, n = 0; n < e.cards.length; n++) if (0 == t) {
t = 1;
var i = parseInt(this.cardlist_node.length - 1);
this.cardlist_node[i].removeFromParent(!0);
this.cardlist_node.splice(i, 1);
this.card_count.y += 19.08;
} else {
t = 0;
this.cardlist_node[0].removeFromParent(!0);
this.cardlist_node.splice(0, 1);
}
this.card_count.getComponent(cc.Label).string = "剩" + this.cardlist_node.length + "张";
if (1 == this.cardlist_node.length) {
cc.audioEngine.play(this.baojin1);
cc.audioEngine.play(this.baojin);
}
if (2 == this.cardlist_node.length) {
cc.audioEngine.play(this.baojin2);
cc.audioEngine.play(this.baojin);
}
},
destoryAllCard: function() {
console.warn(this.cardlist_node);
for (var e = 0; e < this.cardlist_node.length; e++) this.cardlist_node[e].removeFromParent(!0);
this.cardlist_node = [];
this.card_count.active = !1;
},
onDestroy: function() {
console.warn(123);
}
});
cc._RF.pop();
}, {
"../../mygolbal.js": "mygolbal"
} ],
player: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ec2a0fYPv1ASr8YTOKp3Np/", "player");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function(e) {
for (var t = "", n = 0; n < e; n++) t += Math.floor(10 * Math.random());
return t;
};
n.default = function() {
var e = {};
e.uniqueID = 1 + i(6);
e.accountID = "2" + i(6);
e.nickName = "tiny" + i(3);
var t = "avatar_" + (Math.floor(3 * Math.random()) + 1);
e.avatarUrl = t;
e.gobal_count = 0;
e.master_accountid = 0;
return e;
};
t.exports = n.default;
cc._RF.pop();
}, {} ],
"polyglot.min": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
(function(e, a) {
"function" == typeof define && define.amd ? define([], function() {
return a(e);
}) : "object" == ("undefined" == typeof n ? "undefined" : i(n)) ? t.exports = a(e) : e.Polyglot = a(e);
})(void 0, function(e) {
function t(e) {
e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
this.allowMissing = !!e.allowMissing, this.warn = e.warn || l;
}
function n(e) {
var t, n, i, a = {};
for (t in e) if (e.hasOwnProperty(t)) {
n = e[t];
for (i in n) a[n[i]] = t;
}
return a;
}
function a(e) {
return e.replace(/^\s+|\s+$/g, "");
}
function o(e, t, n) {
var i, o;
return null != n && e ? i = a((o = e.split(d))[c(t, n)] || o[0]) : i = e, i;
}
function r(e) {
var t = n(g);
return t[e] || t.en;
}
function c(e, t) {
return h[r(e)](t);
}
function s(e, t) {
for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
return e;
}
function l(t) {
e.console && e.console.warn && e.console.warn("WARNING: " + t);
}
function u(e) {
var t = {};
for (var n in e) t[n] = e[n];
return t;
}
t.VERSION = "0.4.3", t.prototype.locale = function(e) {
return e && (this.currentLocale = e), this.currentLocale;
}, t.prototype.extend = function(e, t) {
var n;
for (var a in e) e.hasOwnProperty(a) && (n = e[a], t && (a = t + "." + a), "object" == ("undefined" == typeof n ? "undefined" : i(n)) ? this.extend(n, a) : this.phrases[a] = n);
}, t.prototype.clear = function() {
this.phrases = {};
}, t.prototype.replace = function(e) {
this.clear(), this.extend(e);
}, t.prototype.t = function(e, t) {
var n, i;
return "number" == typeof (t = null == t ? {} : t) && (t = {
smart_count: t
}), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
i = e), "string" == typeof n && (t = u(t), i = s(i = o(n, this.currentLocale, t.smart_count), t)), 
i;
}, t.prototype.has = function(e) {
return e in this.phrases;
};
var d = "||||", h = {
chinese: function(e) {
return 0;
},
german: function(e) {
return 1 !== e ? 1 : 0;
},
french: function(e) {
return e > 1 ? 1 : 0;
},
russian: function(e) {
return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
},
czech: function(e) {
return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
},
polish: function(e) {
return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
},
icelandic: function(e) {
return e % 10 != 1 || e % 100 == 11 ? 1 : 0;
}
}, g = {
chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
french: [ "fr", "tl", "pt-br" ],
russian: [ "hr", "ru" ],
czech: [ "cs" ],
polish: [ "pl" ],
icelandic: [ "is" ]
};
return t;
});
cc._RF.pop();
}, {} ],
quick_join: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d73e8Dcv/hJKpMYRR62Le99", "quick_join");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
label: [ cc.Label ]
},
start: function() {
var e = this;
i.default.socket.requestConfig(function(t, n) {
if (0 != t) {
console.log("requestConfig err:" + t);
var i = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
i.string = n;
setTimeout(function() {
i.string = "";
}, 2e3);
} else {
console.log("requestConfig" + JSON.stringify(n));
e.label[0].string = n[1].bottom;
e.label[1].string = n[2].bottom;
e.label[2].string = n[3].bottom;
e.label[3].string = n[4].bottom;
}
});
i.default.socket.onMatchresult(function(e) {
console.log("onMatchresult" + JSON.stringify(e));
cc.find("ROOT_UI").emit("hideLoading");
i.default.playerData.bottom = e.bottom;
i.default.playerData.rate = e.rate;
var t = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
t.string = "正在加入房间。。。";
cc.director.loadScene("gameScene", function() {
t.string = "";
});
});
},
_quick_join: function(e) {
var t = this;
if (e < 0 || e > 4) console.log("create room rate error" + e); else {
1 == e ? 10 : 2 == e ? 20 : 3 == e ? 30 : 4 == e && 40;
var n = {
roomLevel: e
};
i.default.socket.request_quickjoin(n, function(e, n) {
var i = cc.find("ROOT_UI");
if (0 != e) {
console.log("quickjoin err:" + e);
i.emit("hideLoading");
var a = cc.find("ROOT_UI/container/TipsLabel").getComponent(cc.Label);
a.string = n;
setTimeout(function() {
a.string = "";
}, 2e3);
t.node.destroy();
} else {
console.log("quickjoin" + JSON.stringify(n));
i.emit("showLoading");
t.node.destroy();
}
});
}
},
onButtonClick: function(e, t) {
switch (t) {
case "_quick_join_1":
this._quick_join(1);
break;

case "_quick_join_2":
this._quick_join(2);
break;

case "_quick_join_3":
this._quick_join(3);
break;

case "_quick_join_4":
this._quick_join(4);
break;

case "_quick_join_close":
this.node.destroy();
}
}
});
cc._RF.pop();
}, {
"../../mygolbal.js": "mygolbal"
} ],
rank_item: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "14b43iMplRMfqTo8IKLwLlb", "rank_item");
cc.Class({
extends: cc.Component,
properties: {
icon_1: cc.Node,
icon_2: cc.Node,
icon_3: cc.Node,
icon_head: cc.Sprite,
label_name: cc.Label,
label_level: cc.Label,
label_canchu: cc.Label,
label_life: cc.Label,
label_linli: cc.Label,
label_zhanli: cc.Label,
label_num: cc.Label
},
start: function() {},
setData: function(e) {
var t = this;
try {
cc.loader.load({
url: e.icon,
type: "png"
}, function(e, n) {
t.icon_head.spriteFrame = new cc.SpriteFrame(n);
});
} catch (e) {
console.warn(e);
}
this.label_name.string = e.name;
this.label_level.string = e.level;
this.label_canchu.string = e.canchu;
this.label_life.string = e.life;
this.label_linli.string = e.linli;
this.label_zhanli.string = e.zhanli;
this.icon_1.active = !1;
this.icon_2.active = !1;
this.icon_3.active = !1;
this.label_num.node.active = !1;
switch (e.num) {
case 1:
this.icon_1.active = !0;
break;

case 2:
this.icon_2.active = !0;
break;

case 3:
this.icon_3.active = !0;
break;

default:
this.label_num.node.active = !0;
this.label_num.string = e.num;
}
}
});
cc._RF.pop();
}, {} ],
socket_ctr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9ce03TvsElJsaLzLDlseCff", "socket_ctr");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../util/event_lister.js"));
n.default = function() {
var e = {}, t = {}, n = 0, a = null, o = (0, i.default)({}), r = function(e, t, n) {
a.emit("notify", {
cmd: e,
data: t,
callindex: n
});
}, c = function(e, i, a) {
console.log("send cmd:" + e + "  " + JSON.stringify(i));
t[++n] = a;
r(e, i, n);
};
e.initSocket = function() {
(a = window.io.connect(defines.serverUrl, {
reconnection: !1,
"force new connection": !0,
transports: [ "websocket", "polling" ]
})).on("connection", function() {
console.log("connect server success!!");
cc.director.GlobalEvent.emit("connected");
});
a.on("notify", function(e) {
"interval" != e.type && console.log("on notify cmd:" + JSON.stringify(e));
if (t.hasOwnProperty(e.callBackIndex)) {
var n = t[e.callBackIndex];
n && n(e.result, e.data);
} else {
var i = e.type;
o.fire(i, e.data);
}
});
};
e.request_wxLogin = function(e, t) {
c("wxlogin", e, t);
};
e.login = function(e, t) {
c("login", e, t);
};
e.request_creatroom = function(e, t) {
c("createroom_req", e, t);
};
e.request_jion = function(e, t) {
c("joinroom_req", e, t);
};
e.request_enter_room = function(e, t) {
c("enterroom_req", e, t);
};
e.request_buchu_card = function(e, t) {
c("chu_bu_card_req", e, t);
};
e.request_chu_card = function(e, t) {
c("chu_card_req", e, t);
};
e.request_quit_room = function(e, t) {
c("quitroom_req", e, t);
};
e.onPlayerJoinRoom = function(e) {
o.on("player_joinroom_notify", e);
};
e.onPlayerReady = function(e) {
o.on("player_ready_notify", e);
};
e.onGameStart = function(e) {
e && o.on("gameStart_notify", e);
};
e.onChangeHouseManage = function(e) {
e && o.on("changehousemanage_notify", e);
};
e.requestReady = function(e) {
r("player_ready_notify", {}, e);
};
e.requestStart = function(e) {
c("player_start_notify", {}, e);
};
e.requestConfig = function(e) {
c("config_req", {}, e);
};
e.requestRobState = function(e) {
r("player_rob_notify", e, null);
};
e.onPushCards = function(e) {
e && o.on("pushcard_notify", e);
};
e.onCanRobState = function(e) {
e && o.on("canrob_notify", e);
};
e.onRobState = function(e) {
e && o.on("canrob_state_notify", e);
};
e.onChangeMaster = function(e) {
e && o.on("change_master_notify", e);
};
e.onShowBottomCard = function(e) {
e && o.on("change_showcard_notify", e);
};
e.onBeiShuUpdate = function(e) {
e && o.on("curr_multiple_refresh_notify", e);
};
e.onCanChuCard = function(e) {
e && o.on("can_chu_card_notify", e);
};
e.onRoomChangeState = function(e) {
e && o.on("room_state_notify", e);
};
e.onQuitPlayer = function(e) {
e && o.on("quit_player", e);
};
e.onGameResult = function(e) {
e && o.on("curr_settlement_result", e);
};
e.onOtherPlayerChuCard = function(e) {
e && o.on("curr_chucard_notify", e);
};
e.oninterval = function(e) {
e && o.on("interval", e);
};
e.onendInterval = function(e) {
e && o.on("endInterval", e);
};
e.disconnect = function(e) {
e && o.on("disconnect", e);
};
e.clearEvent = function() {
o.removeAllLister();
};
return e;
};
t.exports = n.default;
cc._RF.pop();
}, {
"../util/event_lister.js": "event_lister"
} ],
waitnode: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "17318Pv1MxELb6d+o/SHo0s", "waitnode");
cc.Class({
extends: cc.Component,
properties: {
loadimage_target: cc.Node,
_isShow: !1,
lblContent: cc.Label
},
start: function() {
this.node.active = this._isShow;
},
update: function(e) {
this.loadimage_target.rotation = this.loadimage_target.rotation - 45 * e;
},
show: function(e) {
this._isShow = !0;
this.node && (this.node.active = this._isShow);
if (this.lblContent) {
null == e && (e = "");
this.lblContent.string = e;
}
},
hide: function() {
this._isShow = !1;
this.node && (this.node.active = this._isShow);
}
});
cc._RF.pop();
}, {} ],
winPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0da927jCLNH6oNi6WjavJgE", "winPanel");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("../mygolbal.js"));
cc.Class({
extends: cc.Component,
properties: {
userList: [ cc.Node ],
audio: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
i.default.playerData.accountID == i.default.playerData.housemanageid && (this.node.getChildByName("准备").active = !1);
cc.audioEngine.play(this.audio);
},
initData: function(e) {
var t = this;
console.warn(e);
e.forEach(function(e, n) {
i.default.allPlayerData.forEach(function(a) {
if (a.accountid == e.account) {
a.accountid == i.default.playerData.accountID && (t.userList[n].getChildByName("me").active = !0);
t.userList[n].getChildByName("nickName").getComponent(cc.Label).string = a.nick_name;
t.userList[n].getChildByName("beishu").getComponent(cc.Label).string = i.default.playerData.rate;
t.userList[n].getChildByName("score").getComponent(cc.Label).string = e.amount;
t.userList[n].getChildByName("DSSC").getComponent(cc.Label).string = e.change;
if (a.accountid == i.default.playerData.master_accountid) {
t.userList[n].getChildByName("地主标志").active = !0;
t.userList[n].getChildByName("beishu").getComponent(cc.Label).string = 2 * i.default.playerData.rate;
}
cc.loader.load({
url: a.avatarUrl,
type: "jpg"
}, function(e, t) {
e ? console.log(e.message || e) : this.userList[n].getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
}.bind(t));
}
});
});
},
start: function() {},
close: function() {
this.node.destroy();
},
quitRoom: function() {
i.default.socket.request_quit_room({}, function(e, t) {
if (0 != e) console.log("requestStart err" + e); else {
console.log("requestStart data" + JSON.stringify(t));
this.node.destroy();
cc.director.loadScene("hallScene");
}
}.bind(this));
},
ready: function() {
i.default.socket.requestReady();
this.node.parent.getChildByName("gamebeforeUI").emit("ready");
this.node.destroy();
}
});
cc._RF.pop();
}, {
"../mygolbal.js": "mygolbal"
} ],
zh: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d16a9bbk5hEfLNbvOYwR0an", "zh");
window.i18n || (window.i18n = {});
window.i18n.languages || (window.i18n.languages = {});
window.i18n.languages.zh = {
label: {
hello: "你好！",
bye: "再见！",
email: "邮件",
voice: "音效",
Emine: "E矿场:",
Egold: "E金币:",
Etoken: "E令牌:",
velodrome: "赛车场",
dock: "码头",
manor: "庄园",
OrePool: "矿池",
LeasingMarket: "租赁市场",
TradingFloor: "交易大厅",
DigitalFinance: "数字金融",
Farm: "农场",
ShoppingCenter: "购物中心",
RecreationalCenter: "娱乐中心",
CommunityCenter: "社群中心",
sendRedPack: "发红包",
redPackList: "红包列表"
}
};
cc._RF.pop();
}, {} ]
}, {}, [ "CardCtrl", "DragSelect", "GameMgr", "LoadingCtrl", "LobbyCardCtrl", "LobbyCtrl", "MenuCtrl", "PlayerCtrl", "RoomCtrl", "RoomNetCtrl", "AssetMgr", "AudioMgr", "AutoScaleFixedWidth", "BtnCtrl", "ButtonSafe", "CSVParser", "CoinsMgr", "DataMgr", "DataObject", "Facebook", "FacebookMgr", "GCONFIG", "GlobalNiuNiu", "GraySprite", "IAP", "IAPMgr", "IapTools", "ImageLoader", "LabelInteger", "LabelOwnNumCtrl", "ListView", "ProgressBarExt", "ScrollViewFixed", "ServerTimeMgr", "SliderExt", "SpriteRemote", "SwitchControl", "Toast", "UiUpdater", "UtilsCross", "UtilsOther", "ViewBase", "ViewMgr", "one-side-platform", "AchievementData", "DailyRewardData", "EnemyBaseData", "EnemyGroupData", "GameCfg", "GunData", "Algo", "Encrypt", "Md5", "joinRoomNiuNiu", "GameHttp", "HttpProxy", "GameNetwork", "GameProtocols", "GameWebSocket", "NetProxy", "AlertBindFBCtrl", "DialogCtrl", "ModeSelViewCtrl", "SettingViewCtrl", "ToastCtrl", "ComboBox", "Item", "Config", "Dssc", "GameData", "Global", "GlobalEvent", "HotUpdate", "Main", "PageMgr", "ProtocolMgr", "ResourceMgr", "SocketMgr", "Tip", "ArderPanel", "Arder_Item", "BaoMingPanel", "BaoMing_Item", "ChongWuPanel", "ChongWuUserDataPanel", "CustomerServicePanel", "EmailDetailPanel", "EmailPanel", "emailItem", "Friend", "GamePanel", "Game_Item2", "Game_Item3", "game_item", "GivingCrystalPanel", "GongGaoPanel", "FaHongBao", "HongBao", "HongBaoList", "HongBaoList1", "IncomeDetailsPanel", "IncomeDetails_Item", "JiaoYiPanel", "jiaoyi_item", "KnapsackPanel", "KuangJiShiChang", "DoorBg", "DoorBottom", "DoorTop", "Email", "Fan", "Gold", "KuangChi", "MineDoor", "TreasureBox", "LoginPanel", "LuckyDrawItem", "LuckyDrawPanel", "TurntableMgr", "MainPage", "Manor", "NFTPanel", "NongChang", "NongChangPanel", "SalePanel", "ZhongZiPanel", "Racing", "RankPanel", "rank_item", "RecreationalCenter", "ShejiaoPanel", "ShengJia", "NFT_item", "ShopPanel", "ShopUserDataPanel", "XHP_item", "SlotPanel", "TipsPage", "MaiRu", "MairChu", "TradingFloor", "ZhuJinPanel", "ZiChuangPanel", "BuyPanel", "ChongZhiPanel", "TiXianPanel", "DataFunc", "appScript", "ClickEvent", "GainGold", "ShaderHelper", "ShaderMouse", "ShaderNameLabel", "ShaderTime", "carder", "player", "socket_ctr", "failPanel", "gameScene", "gamebeforeUI", "gameingUI", "card", "player_node", "winPanel", "hallScene", "creatRoom", "joinRoom", "password", "quick_join", "loginScene", "mygolbal", "event_lister", "waitnode", "en", "zh", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min" ]);