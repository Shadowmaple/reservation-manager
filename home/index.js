const AccessHeader = 'http://127.0.0.1:8080'
const Token = "123"

// APIs
const ApiHost = 'http://127.0.0.1:8080'
const CourseListPath = '/course/list'
const CourseSearchPath = '/course/search'
const CourseDelPath = '/course/del'
const CoursePutPath = "/course"

const CourseExp = [{
    id: 0,
    name: "操作系统",
    teacher: "赵亮",
    desc: "这是一门神奇的课程",
    startTime: "2022-01-01",
    endTime: "2022-02-20",
    total: 20,
    currentNum: 10,
    image: "http://spoc.ccnu.edu.cn/images/notimg/notimg-1.jpg",
    price: 10,
    status: 0,
}, {
    id: 1,
    name: "操作系统",
    teacher: "赵亮",
    desc: "这是一门神奇的课程",
    startTime: "2022-01-01",
    endTime: "2022-02-20",
    total: 20,
    currentNum: 10,
    image: "http://spoc.ccnu.edu.cn/images/notimg/notimg-1.jpg",
    price: 20,
    status: 1,
}]

const OriginPutForm = {
    id: 0,
    name: "网络",
    teacher: "赵敏",
    desc: "课程简介",
    startTime: "2022-01-01",
    endTime: "2022-12-31",
    total: 20,
    image: "http://spoc.ccnu.edu.cn/images/notimg/notimg-1.jpg",
    price: 20,
    // period: 100,
}

const app = Vue.createApp({
    name: "home",
    data() {
        return {
            token: Token,
            total: 2,
            list: CourseExp,
            showSearch: true,
            key: '', // 搜索关键字
            // 课程修改的表单内容
            showForm: true,
            putForm: OriginPutForm,
            formIdx: 0,
        }
    },
    computed: {},
    created() {
        this.Refresh()
    },
    methods: {
        // 点击搜索课程列表
        clickSearch() {
            let url = ApiHost + CourseSearchPath
            url += "?key=" + this.key
            console.log(url)
            this.key = ""

            fetch(url, {
                    method: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': AccessHeader,
                        'token': this.token,
                    },
                })
                .then(res => res.json())
                .then(res => {
                    console.log('request courseList res: ', res)
                    if (res.code != 0) {
                        console.warn('request courseList error: ', res.code, res.msg)
                        return
                    }
                    let list = new Array
                    for (let i = 0; i < res.data.length; i++) {
                        let item = res.data[i]
                        list.push({
                            id: item.course_id,
                            name: item.course_name,
                            teacher: item.teacher_name,
                            desc: item.course_desc,
                            startTime: item.start_time,
                            endTime: item.end_time,
                            total: item.total,
                            currentNum: item.current_num,
                            image: item.image,
                            price: item.price,
                            status: item.status,
                        })
                    }
                    console.log("list:", list)
                    this.list = list
                })
                .catch(error => {
                    console.error(error)
                })

            console.log('list---', this.list)
        },
        // 添加新课程
        clickAdd() {
            window.location.href = "../addcourse/addcourse.html"
        },
        // 点击修改课程，跳出表单
        clickUpdate(item, idx, e) {
            console.log('update params:', item)
            this.putForm = {
                id: item.id,
                name: item.name,
                teacher: item.teacher,
                desc: item.desc,
                startTime: item.startTime,
                endTime: item.endTime,
                total: item.total,
                image: item.image,
                price: item.price,
            }
            this.formIdx = idx
            this.showForm = true
        },
        // 点击关闭表单
        clickCloseForm() {
            this.showForm = false
            this.putForm = OriginPutForm
        },
        // 点击提交修改表单
        clickUpdateConfirm() {
            var r = confirm("确认修改？");
            if (r == false) {
                console.log('用户已取消修改')
                return
            }

            let url = ApiHost + CoursePutPath
            let form = this.putForm
            let data = {
                'id': form.id,
                'name': form.name,
                'teacher': form.teacher,
                'desc': form.desc,
                'total': form.total,
                'image': form.image,
                'price': form.price,
                'start_time': form.startTime,
                'end_time': form.endTime,
                'period': 100,
            }
            let index = this.formIdx

            // 更新课程请求
            fetch(url, {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': AccessHeader,
                        'token': this.token,
                    },
                    body: JSON.stringify(data),
                })
                .then(res => res.json())
                .then(res => {
                    console.log('request courseUpdate res: ', res)
                    if (res.code != 0) {
                        console.warn('request courseUpdate error: ', res.code, res.msg)
                        alert('程序内部错误！')
                        return
                    }

                    this.showForm = false
                    this.putForm = OriginPutForm
                    alert('修改课程成功')

                    // 更新课程列表
                    this.list[index] = form
                })
                .catch(res => {
                    alert('程序内部错误！')
                })
        },
        // 删除课程
        clickDel(id, index, e) {
            console.log('params:', id, index, e)

            var r = confirm("确认删除？");
            if (r == false) {
                console.log('用户已取消删除')
                return
            }

            let url = ApiHost + CourseDelPath + '?id=' + id

            // 删除课程请求
            fetch(url, {
                    method: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': AccessHeader,
                        'token': this.token,
                    },
                })
                .then(res => res.json())
                .then(res => {
                    console.log('request courseDel res: ', res)
                    if (res.code != 0) {
                        console.warn('request courseDEl error: ', res.code, res.msg)
                        return
                    }
                    alert('删除课程成功！')

                    // 删除该课程
                    this.list.splice(index, 1)
                })

        },
        // 刷新课程列表
        Refresh() {
            this.clickSearch()
        },

    },
})

app.mount('#app')