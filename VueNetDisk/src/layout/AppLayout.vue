<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container class="header_main">
                <AppHeader />
                <el-main>
                    <el-scrollbar>
                        <RouterView></RouterView>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
</script>

<style>
.header_main {
    flex-direction: column;
    height: 100vh;
    padding-right: 0;
}
</style>