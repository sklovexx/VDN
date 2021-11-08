(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NiuNiu/script/common/one-side-platform.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f8e61M/TG5ANLU1Ddp1eJnx', 'one-side-platform', __filename);
// NiuNiu/script/common/one-side-platform.js

"use strict";

// http://www.iforce2d.net/b2dtut/one-way-walls
// 物理系统，单面穿透，其他面碰撞

var PenetrateSide = cc.Enum({
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
            type: PenetrateSide,
            default: PenetrateSide.DOWN_TO_UP
        }
    },

    onLoad: function onLoad() {
        this.pointVelPlatform = cc.v2();
        this.pointVelOther = cc.v2();
        this.relativeVel = cc.v2();
        this.relativePoint = cc.v2();
    },

    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        var cache = this._pointsCache;

        var otherBody = otherCollider.body;
        var platformBody = selfCollider.body;

        var worldManifold = contact.getWorldManifold();
        var points = worldManifold.points;

        var pointVelPlatform = this.pointVelPlatform;
        var pointVelOther = this.pointVelOther;
        var relativeVel = this.relativeVel;
        var relativePoint = this.relativePoint;

        //check if contact points are moving into platform
        for (var i = 0; i < points.length; i++) {
            platformBody.getLinearVelocityFromWorldPoint(points[i], pointVelPlatform);
            otherBody.getLinearVelocityFromWorldPoint(points[i], pointVelOther);
            platformBody.getLocalVector(pointVelOther.subSelf(pointVelPlatform), relativeVel);

            // 原始代码（只有从下往上穿透，即 PenetrateSide.DOWN_TO_UP)
            if (this.penetrateSide === PenetrateSide.DOWN_TO_UP) {
                if (relativeVel.y < -32) //if moving down faster than 32 pixel/s (1m/s), handle as before
                    return; //point is moving into platform, leave contact solid and exit
                else if (relativeVel.y < 32) {
                        //if moving slower than 32 pixel/s (1m/s)
                        //borderline case, moving only slightly out of platform
                        platformBody.getLocalPoint(points[i], relativePoint);
                        var platformFaceY = selfCollider.getAABB().height / 2; //front of platform, should only used on a box collider
                        if (relativePoint.y > platformFaceY - 0.1 * 32) return; //contact point is less than 3.2pixel (10cm) inside front face of platfrom
                    } else {
                            //moving up faster than 1 m/s
                        }
            } else if (this.penetrateSide === PenetrateSide.UP_TO_DOWN) {
                if (relativeVel.y > 32) //if moving up faster than 32 pixel/s (1m/s), handle as before
                    return; //point is moving into platform, leave contact solid and exit
                else if (relativeVel.y < -32) {
                        //if moving slower than 32 pixel/s (1m/s)
                        //borderline case, moving only slightly out of platform
                        platformBody.getLocalPoint(points[i], relativePoint);
                        var _platformFaceY = selfCollider.getAABB().height / 2; //front of platform, should only used on a box collider
                        if (relativePoint.y < _platformFaceY - 0.1 * 32) return; //contact point is less than 3.2pixel (10cm) inside front face of platfrom
                    } else {
                            //moving up faster than 1 m/s
                        }
            } else if (this.penetrateSide === PenetrateSide.LEFT_TO_RIGHT) {
                if (relativeVel.x < -32) //if moving down faster than 32 pixel/s (1m/s), handle as before
                    return; //point is moving into platform, leave contact solid and exit
                else if (relativeVel.x < 32) {
                        //if moving slower than 32 pixel/s (1m/s)
                        cc.log("===-=-=-=");
                        //borderline case, moving only slightly out of platform
                        platformBody.getLocalPoint(points[i], relativePoint);
                        var platformFaceX = selfCollider.getAABB().width / 2; //front of platform, should only used on a box collider
                        if (relativePoint.x > platformFaceX - 0.1 * 32) return; //contact point is less than 3.2pixel (10cm) inside front face of platfrom
                    } else {
                            //moving up faster than 1 m/s
                        }
            } else if (this.penetrateSide === PenetrateSide.RIGHT_TO_LEFT) {
                if (relativeVel.x > 32) //if moving up faster than 32 pixel/s (1m/s), handle as before
                    return; //point is moving into platform, leave contact solid and exit
                else if (relativeVel.x < -32) {
                        //if moving slower than 32 pixel/s (1m/s)
                        //borderline case, moving only slightly out of platform
                        platformBody.getLocalPoint(points[i], relativePoint);
                        var _platformFaceX = selfCollider.getAABB().width / 2; //front of platform, should only used on a box collider
                        if (relativePoint.x < _platformFaceX - 0.1 * 32) return; //contact point is less than 3.2pixel (10cm) inside front face of platfrom
                    } else {
                            //moving up faster than 1 m/s
                        }
            }
        }

        // store disabled state to contact
        contact.disabled = true;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
        //# sourceMappingURL=one-side-platform.js.map
        