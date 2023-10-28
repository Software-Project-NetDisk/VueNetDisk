<template>
    <div class="about">
        <div class="welcome">Welcome to WebNetDisk!</div>
        <el-button type="primary" round size="large" class="startBtn" @click="this.$router.push('/login')">快速开始</el-button>
    </div>
</template>

<style>
.about {
    @apply flex items-center justify-center min-h-screen bg-gray-500 flex-col space-y-8;
}

.about .welcome {
    @apply font-bold text-light-100 text-6xl;
}

.about .startBtn {
    @apply font-bold
}
</style>