$(function () {
    var layer = layui.layer;
    var indexAdd = null;
    var form = layui.form
    var indexEdit = null;
    initArtCateList()

    //添加文章到页面上
    function initArtCateList() {

        $.ajax({
            url: '/my/article/cates',
            success: function (res) {

                var str = template('tpl_art', res);
                $('tbody').html(str)
            }

        })
    }


    //点击添加按钮 添加新的列表
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tpl-add').html(),
            area: ['500px', '252px']
        });

        //点击提交按钮 把新的列表发送到首页
        $('body').on('submit', '#form-add', function (e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }

                    initArtCateList();
                    layer.msg('恭喜你,文章添加成功!')
                    layer.close(indexAdd)
                }


            })



        })


    })


    // 编辑
    $('tbody').on('click', '.btn-edit', function (e) {
        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tpl-edit').html(),
            area: ['500px', '252px']
        })

        var Id = $(this).attr('data-Id');

        $.ajax({

            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val("form-edit", res.data)
            }
        })

    })
    //修改编辑里面的内容
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                initArtCateList();
                layer.msg('恭喜你,文章更新成功!')
                layer.close(indexEdit)
            }


        })



    })

    //删除编辑里面的内容
    $('tbody').on('click', '.btn-delete', function (e) {


        var Id = $(this).attr('data-Id');
        layer.confirm('你确认要删除吗?', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.massage)
                        }
                        initArtCateList()
                        layer.msg('恭喜你删除成功!')
                        layer.close(index);
                    }
                })

            });

    })

})