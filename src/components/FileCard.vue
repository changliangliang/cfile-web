<template>
    <a-card hoverable style="width: auto" @click="onClick">
        <template #cover>
            <img alt="example" style="padding: 20px;" :src="fileIcon" />
        </template>

        <a-popover :title="file.name">
            <template #content>
                <p>{{ file.description }}</p>
            </template>

            <a-card-meta :title="file.name">
                <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                </template>
            </a-card-meta>

        </a-popover>


    </a-card>
</template>
<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { toRefs, ref, defineProps, onMounted } from 'vue'
import pdfIcon from '@/assets/pdf.svg'
import wordIcon from '@/assets/word.svg'
import excelIcon from '@/assets/Excel.svg'
import imageIcon from '@/assets/相册.svg'
import weizhiIcon from '@/assets/未知文件.svg'

const props = defineProps({
    file: Object
})


const { file } = toRefs(props)
const router = useRouter()
const fileIcon = ref("")

switch (file.value.type) {
    case 'pdf':

        fileIcon.value = pdfIcon
        break
    case 'doc':
        fileIcon.value = wordIcon
        break
    case 'docx':
        fileIcon.value = wordIcon
        break
    case 'xls':
        fileIcon.value = wordIcon
        break

    case 'xls':
        fileIcon.value = wordIcon
        break
    default:
        fileIcon.value = weizhiIcon
}

// 跳转
function onClick() {
    router.push({
        path: `/filedetail/${file.value.id}`
    })
}

</script>