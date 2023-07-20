<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">

            <Head></Head>
        </a-layout-header>

        <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
            <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item>List</a-breadcrumb-item>
                <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb> -->
            <router-view></router-view>

        </a-layout-content>


        <a-layout-footer :style="{ textAlign: 'center' }">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>
<script lang="ts" setup>

import Head from "@/components/Head.vue"
import FileCard from "@/components/FileList.vue"
import FileDetail from "@/components/FileDetail.vue";
import FileInfo from "@/components/FileInfo.vue"

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
