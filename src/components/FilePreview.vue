<template>
    <div>

        <vue-office-docx :src="docx" style="height: 80vh;" />


    </div>
</template>
<script lang="ts" setup>
import { useEventBus } from "@/store/eventBus"
import { ref } from "vue"
import VuePdfEmbed from 'vue-pdf-embed'
import pdfFile from "@/assets/pdf.pdf"

import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

import docxFile from "@/assets/docx.docx?url"
import excelFile from "@/assets/xlsx.xlsx?url"


const props = defineProps({
    file: {
        type: Object,
        default: () => {
            return { "id": -1, name: '' }
        }
    }
})




const evnetBus = useEventBus()

const pdf = ref(pdfFile)
const docx = ref(docxFile)
const excel = ref(excelFile)


const handleOk = (e: MouseEvent) => {
    console.log(e);
    evnetBus.colsePreview()
};


</script>

<style  >
.ant-modal-content {
    display: flex;
    flex-direction: column;
}
</style>