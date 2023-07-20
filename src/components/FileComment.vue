<template>
    <a-list v-if="comments.length" :data-source="comments" :header="`${total}` + `条评论`" item-layout="horizontal">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-row>
                    <a-comment :author="item.author" :content="item.comment" :datetime="item.created" />
                </a-row>

            </a-list-item>
        </template>
    </a-list>

    <a-row justify="center">
        <a-col>
            <a-pagination v-model:current="current" :total="total" show-less-items @change="onChange"
                defaultPageSize="10" />
        </a-col>
    </a-row>



    <a-comment>
        <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
            <a-form-item>
                <a-textarea v-model:value="value" :rows="4" />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                    添加评论
                </a-button>
            </a-form-item>
        </template>
    </a-comment>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { addComment, listComment } from '@/request/commentApi'
import { number } from 'vue-types';



dayjs.extend(relativeTime);


const props = defineProps({
    fid: Number
})






type Comment = Record<string, string>;

const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const value = ref<string>('');

// 翻页
const current = ref(1)
const total = ref(0)

function getPage(page: number) {
    console.log(props.fid)
    listComment(10, page, props.fid).then((resp) => {
        let data = resp.data
        current.value = data.current
        total.value = data.total
        comments.value = [...data.commentlist]
    })
}


watch(props, () => {
    getPage(1)
})



const handleSubmit = () => {

    if (!value.value) {
        return;
    }

    submitting.value = true;

    addComment(props.fid, value.value).then((resp) => {
        let comment = resp.data

        if (comments.value.length == 10) {
            current.value++;
            getPage(current.value)
        } else {
            comments.value = [
                {
                    author: comment.author,
                    comment: comment.comment,
                    fid: comment.fid,
                    uid: comment.uid,
                    cid: comment.cid,
                    created: comment.created
                },
                ...comments.value,
            ];
        }
        submitting.value = false;
        total.value++
        value.value = '';
    })
};


let onChange = (page: number, pageSize: number) => {
    getPage(page)
    current.value = page;
}




</script>