const Token = ''
const url = "http://127.0.0.1:8080/course"

function clickback() {
  history.back();
}

function sendclick() {
  var course_name = document.getElementById("course_name").value
  var teacher_name = document.getElementById("teacher_name").value
  var restrict_number = document.getElementById("restrict_number").value
  var start_time = document.getElementById("start_time").value
  var end_time = document.getElementById("end_time").value
  var imgurl = document.getElementById("imgurl").value
  var course_point = document.getElementById("course_point").value
  var period = document.getElementById("period").value
  var intro = document.getElementById("intro").value
  var data = {
    "id": 0,
    "name": course_name,
    "teacher": teacher_name,
    "desc": intro,
    "total": restrict_number,
    "image": imgurl,
    "price": course_point,
    "start_time": start_time,
    "end_time": end_time,
    "period": period
  }

  // 向后台发起post请求
  fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1',
      'content-type': 'application/json',
      'token': Token,
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  }).then(Response => {
    alert("发布课程成功");
    window.location.href = "../home/index.html"
  }).catch(error => console.log("request fail:", error))

}