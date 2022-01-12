const app = Vue.createApp({
    data() {
        return {
            msg: "login"
        }
    },
    methods: {
        comeback () {
            window.history.go(-1)
        },
        login () {
            window.location.href = '../home/index.html'
        }
    },
})

app.mount('#app')