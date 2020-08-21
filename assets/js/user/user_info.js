$(function () {

    var form = layui.form;
    var layer = layui.layer;
    // 验证表单信息
    form.verify({
        
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6位之间!'
            }
        }
    })

    // 加载渲染效果
    initUserInfo()

    function initUserInfo() {
        $.ajax({
             
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                  return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)

            }


        })
    }


    // 表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })


    //修改表单 
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data :$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                  return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功!')
                window.parent.getUserInof()

            }




        })
    })


})