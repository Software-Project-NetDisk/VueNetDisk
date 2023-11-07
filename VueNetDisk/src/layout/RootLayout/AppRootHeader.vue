<template>
    <el-header>
        <!--面包屑-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>


        <!--下拉菜单-->
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="45" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>{{ userInfo.user_name }}</el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/store';
import { logout } from '~/api/account';
import { ElMessage, ElMessageBox } from 'element-plus'
const user = useUserStore();
const userInfo = user.userInfo;

const handleLogout = async () => {
    await ElMessageBox.confirm(
        '确定要退出吗?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            logout();
            ElMessage({
                type: 'success',
                message: '成功退出',
            })
        })
        .catch(() => {
        })
}

</script>

<style>
.el-header {
    display: flex;
    align-items: center;
    background-color: rgb(239, 234, 234);
    justify-content: space-between;
}
</style>