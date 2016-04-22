var url_hostName = "http://120.24.56.56/lyoa";
// http://ly-git-server:8080  局域网
//http://120.24.56.56:8080/lyoa  阿里云
//http://weixin.loyulcare.cn/weixin

//评价星级
function loopStars(){ 
$(".ly-stars").empty();//清空
//1星
for (var i = 0; i < 1 ; i++) {
        $(".ly-stars-1").append(
            "<i class='ly-star'></i>"
            )
        };                
//2星
for (var i = 0; i < 2 ; i++) {
        $(".ly-stars-2").append(
            "<i class='ly-star'></i>"
            )
        };
//3星
for (var i = 0; i < 3 ; i++) {
        $(".ly-stars-3").append(
            "<i class='ly-star'></i>"
            )
        };
//4星
for (var i = 0; i < 4 ; i++) {
        $(".ly-stars-4").append(
            "<i class='ly-star'></i>"
            )
        };
//5星
for (var i = 0; i < 5 ; i++) {
        $(".ly-stars-5").append(
            "<i class='ly-star'></i>"
            )
        }; 
}

//返回顶部..当滚动条的位置处于距顶部300像素以下时，跳转链接出现，否则消失  
function back2top(){
    $(window).scroll(function(){  
        if ($(window).scrollTop()>300){  
            $("#back-to-top").fadeIn(600);  
        }  
        else  
        {  
            $("#back-to-top").fadeOut(600);  
        }  
    });  

    //当点击跳转链接后，回到页面顶部位置  

    $("#back-to-top").click(function(){  
        $('body').animate({scrollTop:0},600);  
        return false;
    });        
};
//查看更多
function viewMore(){
    $(".viewMore i").show(); 
    $(".viewMore p").html("加载中···");        
    setTimeout(function(){
        contentList()
        if (t_len == 0) {         
            $(".viewMore p").html("没有更多了···");
            $(".viewMore i").hide(); 
        } else {
            $(".viewMore p").html("查看更多");
            $(".viewMore i").hide();
        }
    },200);
};


/* cookie start */
    //add cookie
    function addCookie(objName,objValue,objHours){//添加cookie 
    var str = objName + "=" + escape(objValue);     
    if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失 
    var date = new Date(); 
    var ms = objHours*3600*1000; 
    date.setTime(date.getTime() + ms); 
    str + "; expires=" + date.toGMTString(); 
    } 
    document.cookie = str;   
    } 
    //delete cookie
    function deleteCookie(name){ 
    var date=new Date(); 
    date.setTime(date.getTime()-10); 
    document.cookie=name+"=v; expires="+date.toGMTString(); 
    }
    //get cookie
    function getCookie(name)
    {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
    }
/* cookie end */