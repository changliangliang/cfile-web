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

                    <br />
                    <br />
                    <a-input v-model:value="email" placeholder="邮箱" />
                </div>

                <br />

                <a-button type="primary" style="width: 100%;" @click="registerHandler">注册</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { register } from '@/request/register'
import { useRouter } from 'vue-router'


const router = useRouter()

const userName = ref<string>('');
const passWord = ref<string>('');
const email = ref<string>('');

function registerHandler() {
    register(userName.value, passWord.value, email.value).then(
        data => {
            if (data.code == 200) {
                router.push({
                    path: '/login',
                })
            }
        }
    )
}


</script>