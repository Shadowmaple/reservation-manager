const app = Vue.createApp({
    data() {
        return {
            msg: "Hello, world!h",
            token: "",
        }
    },
    beforeMount() {
        this.checkLogin()
    },
    methods: {
        jumpToLogin () {
            window.location.href='/login/index.html';
        },
        checkLogin() {
            if (this.token == "") {
                window.location.href = '/login/login.html'
            } else {
                window.location.href = '/home/index.html'
            }
        }
    },
})

app.mount('#app')