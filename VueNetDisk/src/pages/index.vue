<template>
    <h1>首页</h1>
    <div>
        {{ user.userInfo }}
    </div>
    <el-button @click="remove">删除</el-button>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import { useUserStore } from '../store';

const user = useUserStore();
const cookie = useCookies();
// console.log(cookie);

// function set() {
//     cookie.set("token", "123");
//     console.log("success set");
// }

// function get() {
//     console.log(cookie.get("token"));
// }

function remove() {
    window.localStorage.clear();
}

</script>