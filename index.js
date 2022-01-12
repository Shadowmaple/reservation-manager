const app = Vue.createApp({
    data() {
        return {
            msg: "Hello, world!h",
            token: "",
        }
    },
    methods: {
        jumpToLogin () {
            window.location.href='/login/index.html';
        },
        checkLogin(e) {
            console.log('event: ', e)
            if (this.token == "") {
                window.location.href = '/login/index.html?a=123'
            } else {
                window.location.href = '/home/index.html'
            }
        }
    },
})

app.mount('#app')