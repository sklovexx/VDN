(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HotUpdate.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6edbCiqItFsKAVcesZSzJZ', 'HotUpdate', __filename);
// Script/HotUpdate.js

'use strict';

// pscp F:\test\hotupdate\ver-1.0.5\hotupdate.zip root@123.207.111.47:/var/www/html/wechatGame/test/

cc.Class({
    extends: cc.Component,

    properties: {
        manifestUrl: {
            type: cc.Asset,
            default: null
        },
        infoLb: cc.Label,
        searchPathsLb: cc.Label,
        _updating: false,
        _canRetry: false,
        _storagePath: ''
    },

    checkCb: function checkCb(event) {
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.infoLb.string = "本地没有发现manifest文件，跳过更新.";
                cc.director.loadScene('ECC');
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.infoLb.string = "更新失败，跳过更新.";
                cc.director.loadScene('ECC');
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.infoLb.string = "已经是最新版本,即将进入游戏.";
                cc.director.loadScene('ECC');
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.infoLb.string = '发现新版本,即将开始更新.';
                this.scheduleOnce(this.hotUpdate, 1);
                break;
            default:
                return;
        }

        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
    },

    updateCb: function updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.infoLb.string = "本地没有发现manifest文件，跳过更新.";
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var msg = event.getMessage();
                if (msg) {
                    this.infoLb.string = '正在更新...';
                    this.searchPathsLb.string = event.getPercentByFile() / 100 + "%";
                    console.log(event.getPercentByFile() / 100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.infoLb.string = "更新失败，跳过更新.";
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.infoLb.string = "已经是最新版本,即将进入游戏.";
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.infoLb.string = "更新已完成，等待重启游戏.";
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.infoLb.string = "更新失败，跳过更新.";
                this._updating = false;
                this._canRetry = true;
                cc.director.loadScene('ECC');
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.infoLb.string = "更新失败，跳过更新.";
                cc.director.loadScene('ECC');
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.infoLb.string = "文件比对错误";
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
            cc.director.loadScene('ECC');
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },

    retry: function retry() {
        if (!this._updating && this._canRetry) {
            this._canRetry = false;

            this.infoLb.string = '更新失败';
            this._am.downloadFailedAssets();
        }
    },

    checkUpdate: function checkUpdate() {
        if (this._updating) {
            this.infoLb.string = '正在检查更新.';
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            var url = this.manifestUrl.nativeUrl;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.infoLb.string = "本地没有发现manifest文件，跳过更新.";
            cc.director.loadScene('ECC');
            return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
        this._updating = true;
    },

    hotUpdate: function hotUpdate() {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this._am.loadLocalManifest(url);
            }

            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            cc.director.loadScene('ECC');
            return;
        }
        // this.searchPathsLb.string = jsb.fileUtils.getSearchPaths()

        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset';
        cc.log('Storage path for remote asset : ' + this._storagePath);
        // cc.log('SearchPaths:' + jsb.fileUtils.getSearchPaths())
        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };

        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);

        var self = this;
        this.infoLb.string = '正在检查更新.';
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                // self.infoLb.string = "Verification passed : " + relativePath;
                return true;
            } else {
                // self.infoLb.string = "Verification passed : " + relativePath + ' (' + expectedMD5 + ')';
                return true;
            }
        });

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            // this.infoLb.string = "Max concurrent tasks count have been limited to 2";
        }

        this.scheduleOnce(this.checkUpdate, 1);
    },

    onDestroy: function onDestroy() {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }
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
        //# sourceMappingURL=HotUpdate.js.map
        