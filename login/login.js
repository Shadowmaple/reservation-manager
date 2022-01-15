function requestLogin(window) {
    var name = document.getElementById("name").value
    var pwd = document.getElementById("pwd").value
    if (name == "") {
        alert("用户名不能为空！")
        return
    }
    if (pwd == "") {
        alert("密码不能为空！")
        return
    }
    // var apiHost = "http://127.0.0.1:8080"

    alert("登录成功！")
    window.location.href = "../home/index.html"
}