var appScript = {
    version: "1.0.0",
    Get: function(url,reqData,callback, fixBaseUrl = ""){
        var self = this;

        if(reqData!=""){
            url += "?";
            for(var item in reqData){
                url += item +"=" +reqData[item] +"&";
            }
        }
        // console.log(self.ip + url)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status <= 400){
                    var response = xhr.responseText;
                    if(response){
                        var responseJson = JSON.parse(response);
                        console.log(responseJson)
                        callback(responseJson);
                    }else{
                        console.log("返回数据不存在")
                        callback(false);
                    }
                }else{
                    console.log("请求失败")
                    callback(false);
                }
            }
        };
        if(fixBaseUrl!=""){
            xhr.open("GET", fixBaseUrl + url, true);
        }else{
            xhr.open("GET", Config.baseUrl + url, true);
        }
        xhr.setRequestHeader("Content-Type" , "application/json");
        xhr.setRequestHeader("token",'magic' + GameData.token);
        xhr.setRequestHeader("language",GameData.curLanguage);
        xhr.send();
    },

    Post: function (url, reqData, callback, fixBaseUrl = "") {
        var self = this;
        //2.发起请求
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            console.log(xhr)
            if (xhr.readyState == 4){
                console.log("---------1-----------------url:"+Config.baseUrl + url);
                if(xhr.status >= 200 && xhr.status <= 400){
                    var response = xhr.responseText;
                    if(response){
                        var responseJson = JSON.parse(response);
                        console.log(responseJson)
                        if(responseJson.code==401){
                            cc.sys.localStorage.removeItem("com.game.vdn.token");
                            Global.PageMgr.closeAllPages();
                            Global.PageMgr.onOpenPage(0);
                            return;
                        }
                        callback(responseJson);
                    }else{
                        console.log("返回数据不存在")
                        callback(false);
                    }
                }else{
                    console.log("请求失败")
                    callback(false);
                }
            }
        };
        if(fixBaseUrl!=""){
            xhr.open("POST", fixBaseUrl + url, true);
        }else{
            xhr.open("POST", Config.baseUrl + url, true);
        }
        xhr.setRequestHeader("Content-Type" , "application/json");
        xhr.setRequestHeader("token",GameData.token);
        xhr.setRequestHeader("language",GameData.curLanguage);
        console.log("-------|"+GameData.token);
        xhr.send(JSON.stringify(reqData));//reqData为字符串形式： "key=value"
    },
    GetQueryVariable:function(variable)
    {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    },

};

module.exports = appScript;