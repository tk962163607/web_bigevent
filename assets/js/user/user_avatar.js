$(function() {
  var layer = layui.layer

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $("#btnChooseImage").on("click", function () { 
    $("#file").click();
  })

  $("#file").on("change", function (e) { 
    var fileList = e.target.files;
    
    if (fileList.length === 0) {
      alert(12)
      return layer.msg("请选择照片！")
    }
    var file = e.target.files[0];
    var imgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy")
      .attr("src", imgURL)
    .cropper(options)



  })

  $("#btnUpload").on("click", function () { 
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
      .toDataURL('image/png')
    
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/my/update/avatar",
      headers: {
        Authorization:localStorage.getItem("token")
      },
      data: {
        avatar:dataURL
      },
      success: function (response) {
        if (response.status !== 0) {
          return layer.msg("上传失败")
        }
        layer.msg("上传成功")
        window.parent.getUserInfo()
       }
    })
  })
})
