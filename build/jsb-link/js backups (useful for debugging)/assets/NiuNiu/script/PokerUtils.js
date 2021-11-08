"use strict";

var HandsType = {
TYPE_NONE: 0,
TYPE_NIU_1: 1,
TYPE_NIU_2: 2,
TYPE_NIU_3: 3,
TYPE_NIU_4: 4,
TYPE_NIU_5: 5,
TYPE_NIU_6: 6,
TYPE_NIU_7: 7,
TYPE_NIU_8: 8,
TYPE_NIU_9: 9,
TYPE_NIUNIU: 10,
TYPE_SILVER: 11,
TYPE_BOOM: 12,
TYPE_FLOWER: 13,
TYPE_FIVES: 14
};

function CardObj(n, e) {
this.point = n;
this.suit = e;
}

function TypeReturn(n, e, r, t) {
this.handsType = n;
this.maxCard = e;
this.nCards = r;
this.pCards = t;
}

function create1pairPoker(n) {
for (var e = [], r = 1; r <= 13; r++) for (var t = 1; t <= 4; t++) e.push(new CardObj(r, t));
n && (e = shuffle(e));
return e;
}

function shuffle(n) {
var e, r, t;
for (e = n.length - 1; e > 0; e--) {
r = Math.floor(Math.random() * (e + 1));
t = n[e];
n[e] = n[r];
n[r] = t;
}
return n;
}

function sortBig2Samll(n) {
n.sort(function(n, e) {
return e.point - n.point;
});
return n;
}

function getHandsType(n) {
var e = n.length;
if (!n || 5 !== e) return new TypeReturn(HandsType.TYPE_NONE, n[0], n, []);
sortBig2Samll(n);
var r = 0, t = 0, o = !0, a = !0;
n.forEach(function(n) {
r += n.point <= 10 ? n.point : 10;
t += n.point;
n.point < 11 && (o = !1);
n.point < 10 && (a = !1);
});
if (r <= 10) {
console.log("五小牛");
return new TypeReturn(HandsType.TYPE_FIVES, n[0], n, []);
}
if (o) {
console.log("五花牛");
return new TypeReturn(HandsType.TYPE_FLOWER, n[0], n, []);
}
if (t - n[e - 1].point == 4 * n[0].point) {
console.log("炸弹");
return new TypeReturn(HandsType.TYPE_BOOM, n[0], n, []);
}
if (t - n[0].point == 4 * n[e - 1].point) {
console.log("炸弹");
return new TypeReturn(HandsType.TYPE_BOOM, n[e - 1], n, []);
}
if (a) {
console.log("银牛");
return new TypeReturn(HandsType.TYPE_SILVER, n[0], n, []);
}
for (var p = r % 10, T = 0; T < e - 1; T++) for (var i = T + 1; i < e; i++) if (((n[T].point <= 10 ? n[T].point : 10) + (n[i].point <= 10 ? n[i].point : 10)) % 10 === p) {
for (var s = [], u = [], E = 0; E < e; E++) E != T && E != i ? s.push(n[E]) : u.push(n[E]);
if (0 === p) {
console.log("牛牛");
return new TypeReturn(HandsType.TYPE_NIUNIU, n[0], n, []);
}
console.log("牛", p);
return new TypeReturn(HandsType["TYPE_NIU_" + p], n[0], s, u);
}
console.log("没牛.");
return new TypeReturn(HandsType.TYPE_NONE, n[0], n, []);
}

function compareCards(n, e) {
return compareHandsReturn(getHandsType(n), getHandsType(e));
}

function compareHandsReturn(n, e) {
return n.handsType !== e.handsType ? n.handsType > e.handsType : n.maxCard.point !== e.maxCard.point ? n.maxCard.point > e.maxCard.point : n.maxCard.suit > e.maxCard.suit;
}