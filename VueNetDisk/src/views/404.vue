<template>
    <el-result icon="warning" title="404 Not Found" sub-title="您所访问的页面不存在">
        <template #extra>
            <el-button type="primary" @click="this.$router.push('/')">回到首页</el-button>
        </template>
    </el-result>
</template>

<script setup>
</script>