$(function () { 
    var layer = layui.layer;
    
    
    update();
  
    var index = null;
    $("#btnAddCate").on("click", function () { 
        index=layer.open({
            type: 1,
            area:["500px","250px"],
            title: '添加文章分类'
            , content: $("#dialog-add").html()
          }); 
    })

    $("body").on("submit", "#formData", function (e) { 
        
        e.preventDefault();
        
        var formData = $("#formData").serialize();
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/my/article/addcates",
            headers: {
                Authorization: localStorage.getItem("token"),
                
            },
            data: formData,
                success: function (response) {
                    console.log(response)
                    if (response.status !== 0) {
                        return layer.msg("添加失败")
                    }
                    layer.msg("添加成功")
                    // console.log("成功")
                    layer.close(index)
                    update();
                 }
        })
        
    })
    var editIndex = null;
    
    $("tbody").on("click", "#bianji", function () { 
        editIndex=layer.open({
            type: 1,
            area:["500px","250px"],
            title: '编辑文章分类'
            , content:$("#bianji-add").html()
        }); 
        $.ajax({
            type: "get",
            url: "http://ajax.frontend.itheima.net/my/article/cates/" + $(this).attr("data-id"),
            headers: {
                Authorization:localStorage.getItem("token")
            },
            success: function (response) {
                // console.log(response)
                $("#name").val(response.data.name);
                $("#alias").val(response.data.alias);
                $("#yinchang").val(response.data.Id)
                
                
             }
        })
       
        
    })

    $("body").on("submit", "#bianjiData", function (e) { 
        e.preventDefault();
        var formData = $("#bianjiData").serialize();
        console.log(formData);
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/my/article/updatecate",
            headers: {
                Authorization:localStorage.getItem("token")
            },
            data: formData,
            success: function (response) { 
                if (response.status !== 0) {
                    return layer.msg("更新失败")
                }
                layer.msg(response.message)

                layer.close(editIndex)

                update();
            }
            })
    })

    $("body").on("click", "#shanchu", function () { 
        var id = $(this).attr("data-id");
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
           
            $.ajax({
                type:"get",
                url: "http://ajax.frontend.itheima.net/my/article/deletecate/" + id,
                headers: {
                    Authorization:localStorage.getItem("token")
                },
                success: function (response) { 
                    if (response.status !== 0) {
                        return layer.msg("删除失败")
                    }
                    layer.msg(response.message)
                    layer.close(index);
                    update();
                }
                
            })
            
          });
        
    })
    function update() {
        $.ajax({
            type: "get",
            url: "http://ajax.frontend.itheima.net/my/article/cates",
            headers: {
                Authorization: localStorage.getItem("token")
            },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg("获得信息错误~")
                }
            
                var html = template("moban", { data: res.data });
                // console.log(html);
                $("tbody").html(html)
                // console.log(res.data)

            
            }

        })
    }
        
})
