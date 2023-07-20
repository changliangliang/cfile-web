import { defineStore } from 'pinia'
import { ref } from "vue"

const useState = defineStore('state', () => {

    // 判断是否预览
    const isLogin = ref<boolean>(false)

    return {
        isLogin
    }
})


export { useState }