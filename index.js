Vue.createApp({
    data() {
        return {
            msg: "Hello, world!",
        }
    },
    methods: {
        jumpToLogin () {
            this.$router.push('/src')
        }
    },
}).mount('#app')