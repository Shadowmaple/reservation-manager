const app = Vue.createApp({
    data() {
        return {
            msg: "Hello, world!h",
        }
    },
    methods: {
        jumpToLogin () {
            window.location.href='/login/index.html';
        }
    },
})

app.mount('#app')