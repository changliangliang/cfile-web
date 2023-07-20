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
            <a-pagination v-model:current="current" :total="total" />
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import FileCard from "./FileCard.vue";
import { defineProps } from "vue"
import { number } from 'vue-types';

const props = defineProps({
    files: [],
    total: number,
    current: number

})

const value = ref<string>('');
const onSearch = (searchValue: string) => {
    console.log('use value', searchValue);
    console.log('or use this.value', value.value);
};

</script>