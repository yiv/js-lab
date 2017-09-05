var RC4 = function (data) {
    var RC4 = require("rc4");
    return RC4("0391591aafc5db68b08787645b837b4f",data);
}
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.httpIp = "http://183.61.183.197:17179";
        this.ctl_login = "/account/login";
        this.ctl_getranks = "/friend/getranks";
    },
    //发送经RC4加密后的POST请求
    postRC4: function(ip,path,data,callbackFunc,callbackObj,callbackData){        
        var xhr = new XMLHttpRequest(); 
        var url = ip + path;
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","text/plain;");        
        xhr.responseType = "arraybuffer";

        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                // console.log("Event : " + eventname);
            };
        });

        var dataStr = JSON.stringify(data);
        var encryStr = RC4(dataStr);
        var encryStrCharCodeArr = [];
        for (var i = 0; i < encryStr.length; i++) {
            encryStrCharCodeArr[i] = encryStr.charCodeAt(i);
        }
        var postData = new Uint8Array(encryStrCharCodeArr);  
        xhr.send(postData); 

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var byteArray = new Uint8Array(xhr.response);
                var response = '';
                for (var i = 0; i < byteArray.length; i++) {
                    response += String.fromCharCode(byteArray[i]);
        　　　　}
                callbackFunc(callbackObj,callbackData,JSON.parse(RC4(response)));
            }
        };
    },
    // 存储本地变量数据
    setPlainData: function (uid,key,value) {
        key = uid+key+'';
        cc.sys.localStorage.setItem(key, value);

    },
    // 读取本地变量数据
    getPlainData: function (uid,key) {
        key = uid+key+'';
        return cc.sys.localStorage.getItem(key);
    },
    // 存储本地JSON格式数据
    setJsonData: function (uid,key,value) {
        key = uid+key+'';
        value = JSON.stringify(value);
        cc.sys.localStorage.setItem(key, value);
    },
    // 读取本地JSON格式数据
    getJsonData: function (uid,key) {
        key = uid+key+'';
        return JSON.parse(cc.sys.localStorage.getItem(key));

    },
    // 读取本地JSON格式数据
    delData: function (uid,key) {
        key = uid+key+'';
        cc.sys.localStorage.removeItem(key)
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});



