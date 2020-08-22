$(function () {

    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage;
    // 为 art-template 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 在个位数的左侧填充 0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: "", //文章分类的 Id
        state: "", //文章的状态， 可选值有： 已发布、 草稿
    }

    initTable()
    initCate()


    //设置列表元素
    function initTable() {
        $.ajax({

            url: '/my/article/list',
            data: q,
            success: function (res) {

                var str = template('tpl-table', res);
                $('tbody').html(str)

                renderPage(res.total)
            }




        })
    }

    //设置分类元素
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                console.log(res);
                var htmlStr = template('tpl-cate', res);
                $('[name="cate_id"]').html(htmlStr);

                form.render()
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        var cate_id = $('[name="cate_id"]').val();
        var state = $('[name="state"]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        });
    }


    // 删除界面
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
                    url: '/my/article/delete/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.massage)
                        }
                        layer.msg('恭喜你删除成功!')
                        if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                        initTable()
                        layer.close(index);
                    }
                })

            });

    })

})