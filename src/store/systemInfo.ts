import { defineStore } from 'pinia'
import { ref } from "vue"

const useSystemInfo = defineStore('systemInfo', () => {

    // 判断是否预览
    const currentUser = ref(null)

    return {
        currentUser
    }
})


export { useSystemInfo }