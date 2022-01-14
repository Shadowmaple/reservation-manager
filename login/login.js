function requestLogin(window)
{
    var name=document.getElementById("name").value
    var pwd=document.getElementById("pwd").value
    var apiHost = "http://127.0.0.1:8080"
    var apiPath = "/course/list"
    window.fetch(apiHost+apiPath,{
        methods: "POST",
        body:{
            username:name,
            password:pwd
        }
    }).then(function(res){//成功请求，跳转
        window.open("../index.html")
    },
    function(error){
        console.log("用户名或密码错误")
    })
}