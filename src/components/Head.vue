<template>
    <a-row justify="space-between">

        <a-col>
            <img src="@/assets/logo.png" style="height: 50px;" />
        </a-col>
        <a-col>
            <a-space :size="10">

                <a-popover style="width: auto;" trigger="click">
                    <template #content>
                        <a-row>

                        </a-row>
                    </template>
                    <a-avatar :size="32" :src="profileImg">

                    </a-avatar>
                </a-popover>

                <a-button v-if="currentUser === null" type="primary" @click="login">登陆</a-button>
                <a-button v-if="currentUser === null" type="primary" @click="register">注册</a-button>
                <a-button v-if="currentUser !== null" type="primary" @click="showUpload">上传文件</a-button>
            </a-space>
        </a-col>
    </a-row>


    <div>
        <a-modal v-model:visible="evnetBus.upload" title="文件上传" width="30%" wrap-class-name="modal">

            <a-space size="small" direction="vertical" style="width: 100%;">
                <a-button type="primary" style="width: 20%;">标题</a-button>
                <a-input v-model:value="filename" />
                <a-button type="primary" style="width: 20%;">描述</a-button>
                <a-textarea v-model:value="description" placeholder="Basic usage" :rows="4" />

                <a-row align="top" justify="space-between">
                    <a-col>
                        <a-upload :file-list="fileList" :before-upload="beforeUpload">
                            <a-button>
                                <upload-outlined></upload-outlined>
                                选择文件
                            </a-button>
                        </a-upload>
                    </a-col>

                    <a-col>
                        <a-button type="primary" :disabled="fileList.length === 0" :loading="uploading"
                            @click="handleUpload">
                            {{ uploading ? '上传中' : '开始上传' }}
                        </a-button>

                    </a-col>


                </a-row>
            </a-space>


            <template #footer>
            </template>
        </a-modal>
    </div>
</template>

<script setup lang="ts">

import { useEventBus } from "@/store/eventBus"
import { UploadOutlined } from '@ant-design/icons-vue';
import { ref } from "vue"
import type { UploadProps } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { useState } from "@/store/state";
import { fileUpload } from '@/request/fileApi'
import mitt from "@/util/mitt";

import profileImg from '@/assets/profile.png'

import { useSystemInfo } from "@/store/systemInfo";
import { storeToRefs } from "pinia";

// 文件上传
const filename = ref("")
const description = ref("")
const fileList = ref<UploadProps['fileList']>([]);
const uploading = ref<boolean>(false);

const beforeUpload: UploadProps['beforeUpload'] = file => {
    fileList.value = [file];
    return false;
};

const handleUpload = () => {
    const formData = new FormData();
    fileList.value.forEach((file) => {
        let a = file
        formData.append("file", file as any);
    });
    uploading.value = true;
    fileUpload(filename.value, description.value, formData).then(() => {
        uploading.value = false
        evnetBus.closeUpload()

        // 文件上传事件
        mitt.emit("file:upload")
    })
};

// 显示上传
const evnetBus = useEventBus()
function showUpload() {
    filename.value = ''
    description.value = ''
    fileList.value = []
    evnetBus.showUpload()
}

// 登陆按钮
const router = useRouter()
const webState = useState()
function login() {
    router.push({
        path: "/login"
    })
}

// 注册按钮
function register() {
    router.push({
        path: "/register"
    })
}

const systemInfo = useSystemInfo()
const { currentUser } = storeToRefs(systemInfo)






</script>
