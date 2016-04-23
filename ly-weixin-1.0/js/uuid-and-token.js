
var userId, uuid, pwd,access_token,expire_time,apply_count;
var user_uuid_type = "oa_user_uuid";
var password_type = "pwd_md5";
var password = "56891452";
var scrambler = setScrambler();
var timestamp = getTime(); 
var signature = password + scrambler + timestamp;
function hasUuid(){
    //检查本地磁盘是否有uuid，没有去重新申请，有则直接获取token
    if (localStorage.getItem("uuid") == null) {
        getUuid()
    } else {
        userId = localStorage.getItem("userId");                    
        uuid = localStorage.getItem("uuid");                    
        pwd = localStorage.getItem("pwd");
        if(isOutTime()){geToken()};//若过期，则重新获取 
        access_token = localStorage.getItem("access_token");  
    }
}
function setScrambler(){
    return Math.ceil(Math.random()*10000000)
}
function getTime() {
    d = new Date()
    return d.getTime();
}
//检查是否支持localStorage
function isStorage(){ return  window.localStorage ? true : false;}
//获取当前服务器时间
function getServerTime(){    
    var server_time;
    $.ajaxSettings.async = false;
    $.getJSON(url_hostName+"/api/weixin/chengdu/server_info/time?ver=v1.0.3",function(data){ 
        server_time = eval(data).server_time.cur_timestamp;       
    });
    return server_time;
    $.ajaxSettings.async = true;
}
//检查当前token的时间是否过期
function isOutTime(){    
    if ( getServerTime() > localStorage.getItem("expire_time") ) {             
            removeStorage("access_token","local");
            removeStorage("expire_time","local");
            return true;
         } else {return false;}
}
function saveStorage(key,val,type){
    if (type == "local") {
        localStorage.setItem(key, val)
    } else if (type == "session") {
        sessionStorage.setItem(key, val)
    } else {alert("storage类型错误！")}
}
function removeStorage(key,type){
    if (type == "local") {
        localStorage.removeItem(key)
    } else {
        sessionStorage.removeItem(key)
    } 
}
function getUuid(){
    $.ajax({
            url: url_hostName+"/api/weixin/chengdu/mobile_users/user_new?ver=v1.0.3",
            type: "POST",
            data: {
                nickname       :  "",  
                user_uuid_type :  user_uuid_type,
                user_uuid      :  "",
                password_type  :  password_type,
                password       :  password,
                scrambler      :  scrambler,
                timestamp      :  timestamp,
                signature      :  signature,
            },
            async: false,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
                data = eval(data);                
                if (data.status == 0) {
                    var tt = data.user_info;
                    console.log(tt)
                    userId = tt.id;                    
                    uuid = tt.uuid;                    
                    pwd = tt.pwd;
                    if (isStorage()) {
                        saveStorage('userId',userId,"local");
                        saveStorage('uuid',uuid,"local");
                        saveStorage('pwd',pwd,"local");
                    } else {
                        alert('您现在是临时用户，卸载或升级微信，以及取消关注可能会删除您的历史订单信息，望谨慎。');
                        addCookie('userId',userId,24*360*2);
                        addCookie('uuid',uuid,24*360*2);
                        addCookie('pwd',pwd,24*360*2);
                    }
                    geToken();
                    } 
                else { alert(tt.message) }           
            },
            error: function(){
                alert("获取uuid失败！")
            }
        });
}

function geToken(){
    var status = 1;
    for (var i = 0; i < 10; i++) {
         $.ajax({
            url: url_hostName+"/api/weixin/chengdu/mobile_users/token?ver=v1.0.3",
            type: "POST",
            data: {                 
                user_uuid_type :  user_uuid_type,
                user_uuid      :  uuid,
                password_type  :  password_type,
                password       :  pwd,
                scrambler      :  scrambler,
            },
            async: false,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
                data = eval(data);
                if (data.status == 0) {
                    status = 0;
                    var tt = data.token_info;
                    console.log(tt)
                    access_token = tt.access_token;
                    expire_time = tt.expire_time;
                    apply_count = tt.apply_count;
                    if(isStorage()){
                        saveStorage('access_token',access_token,"local");
                        saveStorage('expire_time',expire_time,"local");
                    } else {                        
                        addCookie('access_token',access_token,24*360*2);
                        addCookie('expire_time',expire_time,24*360*2);
                    };  
                    }
                else { alert(tt.message) }
            },
            error: function(){
                alert("获取token失败！")
            }
        });
         if (status == 0) {break} 
    }
    return status;
}