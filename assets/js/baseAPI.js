// 1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
// 2.测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";
// 3.生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";

// 拦截所有ajax请求：get/post/ajax;
//   处理参数；
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    params.url = baseURL +  params.url;
    // alert(params.url);
    
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
      
    }
    
    params.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token');

            location.href = '/login.html'
        }
    }

});
