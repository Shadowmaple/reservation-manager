const AccessHeader = 'http://127.0.0.1:8080'

const ApiHost = 'http://127.0.0.1:8080'
const CourseListPath = '/course/list'
const CourseSearchPath = '/course/search'
const CourseDelPath = '/course/del'



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

const app = Vue.createApp({
    name: "home",
    data() {
        return {
            token: 'oooo',
            total: 2,
            list: CourseExp,
            showSearch: true,
            key: '',
        }
    },
    computed: {},
    methods: {
        clickSearch () {
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
        },
        // 添加新课程
        clickAdd () {
            alert('添加课程成功！')
        },
        // 更新课程
        clickUpdate (e) {
            alert('更新课程成功！')
        },
        // 删除课程
        clickDel (id, index, e) {
            console.log('params:', id, index, e)

            var r = confirm("确认删除？");
            if (r == false) {
                console.log('用户已取消删除')
                return
            }

            let url = ApiHost + CourseDelPath + '?id=' + id

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
        Refresh () {
            this.clickSearch()
        }
    },
})

app.mount('#app')