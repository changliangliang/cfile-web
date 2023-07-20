<template>
    <a-row justify="center" style="margin-top: 30px;">
        <a-col>
            <a-avatar :size="128">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
        </a-col>
    </a-row>

    <a-row justify="center" style="margin-top: 30px;">
        <a-col>
            <a-space size="10">
                <a-button>点赞</a-button>
                <a-button>关注</a-button>
                <a-button>修改</a-button>

            </a-space>
        </a-col>
    </a-row>

    <a-row justify="center" style="margin-top: 30px;">
        <a-col span="3">
            这是一个好用的软件
        </a-col>

    </a-row>

    <a-row justify="center">
        <a-col span="16">
            <a-divider style="height: 2px; background-color: #7cb305" />
        </a-col>
    </a-row>
    <a-row justify="center">
        <a-col span="16">
            <a-card :bordered="true">
                <a-row>
                    <a-col>sdafsdfasd</a-col>
                    <a-button>sdafs</a-button>
                    <a-button>sdafs</a-button>
                    <a-button>sdafs</a-button>
                </a-row>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';

const list = [
    {
        title: "title-1"
    },
    {
        title: "title-2"
    },
    {
        title: "title-3"
    },
    {
        title: "title-4"
    },
    {
        title: "title-5"
    },
    {
        title: "title-6"
    },
    {
        title: "title-7"
    },
    {
        title: "title-8"
    },
]
</script>