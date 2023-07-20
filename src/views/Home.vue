<template>
    <a-row style="margin-top: 30px;">
        <a-col :span="12" :offset="6">
            <a-input-search v-model:value="value" placeholder="input search text" enter-button="Search" size="large"
                @search="onSearch" />
        </a-col>
    </a-row>

    <a-row style="margin-top: 30px;">
        <a-col :span="22" :offset="1">
            <a-list :grid="{ gutter: 16, column: 6 }" :data-source="files">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <FileCard :file="item"></FileCard>
                    </a-list-item>
                </template>
            </a-list>
        </a-col>
    </a-row>


    <a-row style="margin-top: 30px;" justify="center">
        <a-col>
            <a-pagination v-model:current="current" :total="total" @change="onChange" defaultPageSize="18" />
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>

import { fileList } from '@/request/fileApi';
import { ref, onMounted } from 'vue'
import FileCard from '@/components/FileCard.vue';
import mitt from '@/util/mitt';

const files = ref()
const current = ref()
const total = ref()


function getFiles(page: number) {
    fileList(18, page).then(resp => {
        files.value = resp.data.filelist
        current.value = resp.data.current
        total.value = resp.data.total
    })
}


onMounted(() => {
    getFiles(1)
})


// 搜索
const value = ref<string>('');
const onSearch = (searchValue: string) => {
    console.log('use value', searchValue);
    console.log('or use this.value', value.value);
};


// 改变页面
let onChange = (page: number, pageSize: number) => {
    getFiles(page)
    current.value = page;
}

// 监听文件上传
mitt.on("file:upload", () => {
    getFiles(current.value)
})




</script>
<style>
#components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>
