<template>
    <a-row>
        <a-col :span="16" :offset="4">
            <FileInfo v-bind:file="file" :token="fileToken"></FileInfo>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">

import FileInfo from '@/components/FileInfo.vue';
import FileComment from '@/components/FileComment.vue';
import FilePreview from '@/components/FilePreview.vue'
import { getFile } from '@/request/fileApi'

import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const file = ref()
const fileToken = ref()
const route = useRoute()




// 挂载前获取信息
onBeforeMount(() => {
    getFile(route.params.id).then(resp => {
        file.value = resp.data.file
        fileToken.value = resp.data.token
    })
})



</script>