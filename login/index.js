const app = Vue.createApp({
    data() {
        return {
            msg: "login"
        }
    },
    methods: {
        comeback () {
            window.history.go(-1)
        }
    },
})

app.mount('#app')