$(function () { 
  getUserInfo();
  var layer = layui.layer;

  $("#btnLogout").on("click", function () { 
    layer.confirm('确定退出登录吗?', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem("token")
      location.href = "/大事件项目/login.html";
      layer.close(index);
    });
  })
})
function getUserInfo() { 
  $.ajax({
    type:"get",
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    headers: {
      Authorization:localStorage.getItem("token")||""
    },
    success: function (response) { 
      // console.log(response)
      if (response.status !== 0) {
        return layui.layer.msg("获取用户信息失败")
      }
      renderAvatar(response.data);
    },
    // complete: function (response) {
    //   console.log(response)
    //   if (response.responseJSON.status == 1 && response.responseJSON.message == "身份认证失败！") {
    //     localStorage.removeItem("token");
    //     location.href = "/大事件项目/login.html";
    //   }
    // }
    
  })
}
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;" + name)
  
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();

   }
 }
