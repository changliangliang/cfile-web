<template>
    <div class="components-page-header-demo-content">
        <a-page-header :title="file.name" class="site-page-header" sub-title=""
            :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }">

            <template #extra>
                <!-- <a-button key="3" @click="showModal">预览</a-button> -->
                <a :href="fileUrl">
                    <a-button key="2">下载</a-button>
                </a>


                <a-button v-if="isLike" danger key="1" type="primary" @click="onLike">{{ likeText }}</a-button>

                <a-button v-else key="4" type="primary" @click="onLike">{{ likeText }}</a-button>
            </template>
            <a-row class="content" justify="space-between" align="middle">
                <a-col :span="18">
                    <a-descriptions size="small" :column="2">
                        <a-descriptions-item label="创建时间">{{ file.created }}</a-descriptions-item>
                        <a-descriptions-item label="更新时间">{{ file.updated }}</a-descriptions-item>
                        <a-descriptions-item label="浏览量"> {{ file.viewCount }}</a-descriptions-item>
                        <a-descriptions-item label="下载量">{{ file.downloadCount }}</a-descriptions-item>
                        <a-descriptions-item label="点赞量">{{ file.likeCount }}</a-descriptions-item>
                    </a-descriptions>

                    <p>
                        {{ file.description }}
                    </p>
                </a-col>

                <a-col>
                    <img :src="fileIcon" alt="content" style="width: 100%" />
                </a-col>

            </a-row>

            <a-row>
                <a-col :span="24">
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1" tab="评论">
                            <FileComment :fid="file.id"></FileComment>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="预览" force-render>



                            <!-- //TODO 如何修改pdf在线预览 -->
                            <div v-if="fileType == 'pdf'" id="pdfjs">
                                <iframe style="width:100%; height: 80vh;"
                                    :src="'https://mozilla.github.io/pdf.js/web/viewer.html?file=' + `${fileUrl}`">
                                </iframe>
                            </div>

                            <vue-office-docx v-else-if="fileType == 'doc' || fileType == 'docx'" :src="fileUrl"
                                style="width:100%; height: 80vh;" />

                            <img v-else-if="fileType == 'jpg'" :src="fileUrl" style="width:100%;" />
                            <a-result v-else status="warning" :title="`赞不支持` + `${file.type}` + `文件预览`">
                            </a-result>
                            <!-- <vue-office-pdf :src=" fileUrl" style="height: 80vh;" /> -->
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-page-header>
    </div>
</template>
<script lang="ts" setup>
import { useEventBus } from "@/store/eventBus"
import { toRefs, ref, watch } from 'vue'
import FileComment from './FileComment.vue';
import { likeFile, isLikeFile, unLikeFile } from "@/request/fileApi"


// doc 预览
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'

import VueOfficePdf from '@vue-office/pdf'

import pdfViewer from "@/lib/pdfjs-3.7.107-dist/web/viewer.html?url"


import docxFile from "@/assets/docx.docx?url"
import excelFile from "@/assets/xlsx.xlsx?url"


import pdfIcon from '@/assets/pdf.svg'
import wordIcon from '@/assets/word.svg'
import excelIcon from '@/assets/Excel.svg'
import imageIcon from '@/assets/相册.svg'
import weizhiIcon from '@/assets/未知文件.svg'

const pdfV = ref(pdfViewer)
const pdfF = ref("http://localhost:5173/src/assets/test_file.pdf")


//TODO： 文件预览
const fileIcon = ref("")
const fileUrl = ref("")
const fileType = ref("")
const docx = ref(docxFile)

const activeKey = ref("1")

const props = defineProps({
    file: {
        type: Object,
        default: () => {
            return { "id": -1, name: '' }
        }
    },
    token: Number
})


const evnetBus = useEventBus()
function showModal() {
    evnetBus.showPreview()
    console.log(evnetBus.preview)
}

// 点赞
const likeText = ref("点赞")
const isLike = ref(false)
const { file } = toRefs(props)

watch(file, () => {
    isLikeFile(file.value.id).then((resp) => {
        console.log(resp.data)
        if (resp.data) {
            likeText.value = "取消"
            isLike.value = true
        }
    })

    fileType.value = file.value.type

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

    fileUrl.value = `http://localhost:12345/file/download/${file.value.id}?token=${props.token}`
})

// 点赞函数
function onLike() {
    if (isLike.value) {
        unLikeFile(props.file.id).then(() => {
            likeText.value = "点赞"
            isLike.value = false
        })
    } else {
        likeFile(props.file.id).then(() => {
            likeText.value = "取消"
            isLike.value = true
        })
    }

}

</script>
<style scoped></style>
