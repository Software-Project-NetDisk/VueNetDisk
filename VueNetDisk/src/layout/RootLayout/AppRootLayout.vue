<template>
    <div class="common-layout">
        <el-container>
            <AppRootAside />
            <el-container class="header_main">
                <AppRootHeader />
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
import AppRootAside from './AppRootAside.vue'
import AppRootHeader from './AppRootHeader.vue'
</script>

<style>
.header_main {
    flex-direction: column;
    height: 100vh;
    padding-right: 0;
}
</style>