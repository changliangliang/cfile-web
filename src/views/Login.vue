<template>
    <div style="height: 100vh; background-color: #001529;">

        <a-row style="height: 100vh;" type="flex" justify="center" align="middle">
            <a-col :span="4">
                <div class="components-input-demo-presuffix">
                    <a-input v-model:value="userName" placeholder="用户名">
                    </a-input>
                    <br />
                    <br />
                    <a-input v-model:value="passWord" placeholder="密码" />
                </div>

                <br />

                <a-button type="primary" style="width: 100%;" @click="loginHandler">登录</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { login } from "@/request/login"
import { useRouter } from 'vue-router'
import { currentUser } from '@/request/userApi';

const router = useRouter()

const userName = ref<string>('');
const passWord = ref<string>('');

function loginHandler() {
    login(userName.value, passWord.value).then(
        //登陆
        data => {
            if (data.code == 200) {
                localStorage.setItem("token", data.data)
                router.push({
                    path: '/home',
                })
            }
        }
    )
}


</script>