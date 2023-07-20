import { defineStore } from 'pinia'
import { ref } from "vue"

const useEventBus = defineStore('event', () => {

    // 判断是否预览
    const preview = ref<boolean>(false)
    function showPreview() {
        preview.value = true
    }
    function closePreview() {
        preview.value = false
    }

    // 判断是否上传
    const upload = ref<boolean>(false)
    function showUpload() {
        upload.value = true
    }
    function closeUpload() {
        upload.value = false
    }

    return {
        upload,
        preview,
        showPreview,
        closePreview,

        showUpload,
        closeUpload
    }
})


export { useEventBus }