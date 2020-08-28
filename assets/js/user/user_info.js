$(function () { 
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) { 
      if (value.length > 6) {
        return "昵称长度必须1-6个字符之间！"
       }
    }
  })

  initUserInfo();

  $("#chongzhi").on("click", function (e) { 
    e.preventDefault();
    initUserInfo();
  })

  $(".layui-form").on("submit", function (e) { 
    e.preventDefault();
    var formData = $("#formData").serialize();
    // console.log(formData)

    $(document).ajaxStart(function () {
      console.log("请求开始了");
    });
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/my/userinfo",
      headers: {
        Authorization:localStorage.getItem("token")
      },
      data: formData,
      success: function (response) { 
        if (response.status !== 0) {
          return layer.msg("更新用户信息失败")
        }
        layer.msg("更新用户信息成功！")
        window.parent.getUserInfo();
      }

      })
  })
  

  $(document).ajaxStop(function () { 
    console.log("请求结束了");
  })
  function initUserInfo() { 
    $.ajax({
      method: "get",
      url: "http://ajax.frontend.itheima.net/my/userinfo",
      headers: {
        Authorization:localStorage.getItem("token")||""
      },
      success: function (response) { 
        // console.log(response)
        if (response.status !== 0) {
          return layer.msg("获取失败")
        }
        console.log(response);
        form.val("formUserInfo",response.data)
      }
    })
  }
})
