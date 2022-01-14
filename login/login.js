function requestLogin(window)
{
    var name=document.getElementById("name").value
    var pwd=document.getElementById("pwd").value
    var apiHost = "http://127.0.0.1:8080"
    var apiPath = "/course/list"

    alert("登陆成功")
    window.location.href="../home/index.html"
}