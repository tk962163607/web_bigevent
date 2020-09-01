$(function () { 
    var layer = layui.layer;
    var form = layui.form;
    initEditor();
    $.ajax({
        type: "get",
        url: "http://ajax.frontend.itheima.net/my/article/cates",
        headers: {
            Authorization:localStorage.getItem("token")
        },
        success: function (res) { 
            console.log(res)
            var html = template("moban", res);
            $("#select").html(html);
            form.render();

        }
    })

    var $image = $("#image");
    var options = {
        aspectRatio: 400 / 200,
        preview:".img-preview"
    }

    $image.cropper(options)


    $("#btnChooseImage").on("click", function () { 
        $("#coverFile").click();
    })
    $("#coverFile").on("change", function (e) { 
        var files = e.target.files;
        if (files.length === 0) {
            return 
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image.cropper("destroy")
            .attr("src", newImgURL)
        .cropper(options)

    })


        var art_state="已发布"
    $("#btnSave2").on("click", function () { 
        art_state="草稿"
    })

    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
       

        formData.append("state",art_state)
        $image
            .cropper("getCroppedCanvas", {
                width: 400,
                height:280
            })
            .toBlob(function (blob) {
                formData.append("cover_img", blob)
                publishArticle(formData)
        })
    })
    


    function publishArticle(formData) {
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/my/article/add",
            data: formData,
            headers: {
                Authorization:localStorage.getItem("token")
            },
            contentType: false,
            processData:false,
            success: function (res) {
                console.log(res)
                if (res.status != 0) {
                  return  layer.msg("发布文章失败")
                }

                layer.msg("发布成功")

                location.href = "/大事件项目/article/art_list.html";
             }
        })
    }
})