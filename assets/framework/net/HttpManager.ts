import Singleton from "../Singleton";

export default class HttpManager extends Singleton<HttpManager> {

    get(url, path, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 10000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.open("GET", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = xhr.responseText;
                    if (callback !== null) {
                        callback(null, ret);
                    }
                    return;
                } catch (e) {
                    callback(e, null);
                }
            } else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };

        xhr.send();
        return xhr;
    }

    post(url, path, params, body, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 10000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.open("POST", requestURL);

        // if (body) {
        //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //     // xhr.setRequestHeader("Content-Length", body.length);
        //     xhr.send(body);
        // }
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = xhr.responseText;
                    if (callback !== null) {
                        callback(null, ret);
                    }
                    return;
                } catch (e) {
                    callback(e, null);
                }
            }
            else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        return xhr;
    }

    download(url, path, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.responseType = "arraybuffer";
        xhr.open("GET", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var buffer = xhr.response;
                var dataview = new DataView(buffer);
                var ints = new Uint8Array(buffer.byteLength);
                for (var i = 0; i < ints.length; i++) {
                    ints[i] = dataview.getUint8(i);
                }
                callback(null, ints);
            }
            else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        xhr.send();
        return xhr;
    }
}