$(function () { 
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").on("click", function () { 
    $(".login-box").show();
    $(".reg-box").hide();
  })


  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    //自定义一个叫做pwd 的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd: function (value) { 

      var pwd = $(".reg-box [name=password]").val()
      if (pwd !== value) {
        return "两次密码不一致!"
      }
    }
  })

  $("#form_reg").on("submit", function (e) { 
    e.preventDefault();
    var formData = $("#form_reg").serialize();
    $.post("http://ajax.frontend.itheima.net/api/reguser", formData, function (response) {
      if (!response.status == 0) {
        layer.msg(response.message);
      } else {
        layer.msg("注册成功");
        $("#link_login").click();
      }
     })
  })

  //监听登录表单的提交事件
  $("#form_login").on("submit",function (e) { 
    e.preventDefault();
    var form = $("#form_login").serialize();
    
    $.ajax({
      url: "http://ajax.frontend.itheima.net/api/login",
      type: "post",
      data: form,
      success: function (response) { 
        if (response.status !== 0) {
          return layer.msg("登录失败")
        }
        layer.msg("登录成功！")

        localStorage.setItem("token",response.token)
        location.href="/大事件项目/index.html"
      }
      
    })
  })
})