$(function () { 
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function (date) { 
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var r = dt.getDate();
        var h = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();
        return y + "-" + m + "-" + r + " " + h + ":" + mm + ":" + ss;
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state:""
    }
    initTable();
    initCate();
    function initTable() { 
        $.ajax({
            type: "get",
            url: "http://ajax.frontend.itheima.net/my/article/list",
            headers: {
                Authorization:localStorage.getItem("token")
            },
            data: q,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败")
                }
                
                var html = template("moban", res);
                $("tbody").html(html)
                renderPage(res.total);
             }
        })
    }

    function initCate() {
        $.ajax({
            type: "get",
            url: "http://ajax.frontend.itheima.net/my/article/cates",
            headers: {
                Authorization:localStorage.getItem("token")
            },
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg("获取失败")
                }
                var html = template("tpl", res);
                // console.log(html)
                $("#xuanzhe").html(html)
                form.render()
             }
        })
    }
    

    $("#formData").on("submit", function (e) {
        e.preventDefault();
        var cate_id = $("[name=cate_id]").val();
        var state = $("[name=state]").val();
        q.cate_id = cate_id;
        q.state = state;

        initTable();

    })
    

    //分页
    function renderPage(total) { 

        laypage.render({
            elem: "pageBox",
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ["count", "limit", "prev", "page", "next", "skip"],
            limits:[2,3,5,10],
            jump: function (obj,first) { 
                // console.log(obj.curr)
                q.pagenum = obj.curr
                q.pagesize=obj.limit

                if (!first) {
                    initTable();
                }
               
            }
       })
    }

    $("tbody").on("click", "#shanchu", function () { 
        var len = $("#shanchu").length;
        var id=$(this).attr("data-id")
        layer.confirm('确认删除吗', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: "get",
                url: "http://ajax.frontend.itheima.net/my/article/delete/"+id,
                headers: {
                    Authorization:localStorage.getItem("token")
                },
                success: function (e) {

                    if (len == 1) {
                        q.pagenum === 1 ?1:q.pagenum=q.pagenum-1;
                     }
                    initTable();
                 }

            })

            layer.close(index);
          });
    })
})