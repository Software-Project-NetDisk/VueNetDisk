<template>
    <el-aside>
        <!-- <el-scrollbar> -->
        <el-menu router>
            <a href="/" class="logo">
                <img src="../../assets/vue.svg" alt="" />
                Web网盘
            </a>

            <el-menu-item index="/root/UserList">
                <el-icon>
                    <User />
                </el-icon>
                <span>用户管理</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>设置</span>
                </template>

                <el-menu-item @click="handleLogout">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>退出登录</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
        <!-- </el-scrollbar> -->
    </el-aside>
</template>

<script setup>
import { logout } from '~/api/account';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '~/store';
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
.el-aside {
    /* display: flex; */
    background-color: rgb(239, 234, 234);
    height: 100vh;
    width: 180px;
}

.el-menu {
    background-color: rgb(239, 234, 234);
    width: 180px;
    border-right: none
}

.logo {
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;

}

.space {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    /* margin-top: 20px; */
    bottom: 20px;
}
</style>