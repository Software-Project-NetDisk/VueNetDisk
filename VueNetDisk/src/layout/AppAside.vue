<template>
    <el-aside>
        <el-scrollbar>
            <el-menu router>
                <a href="/" class="logo">
                    <img src="../assets/vue.svg" alt="" />
                    Web网盘
                </a>

                <el-menu-item index="/index/fileList">
                    <el-icon>
                        <Folder />
                    </el-icon>
                    <span>文件</span>
                </el-menu-item>

                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <UploadFilled />
                        </el-icon>
                        <span>传输</span>
                    </template>
                    <!-- <el-menu-item index="/index/uploadList">
                        <el-icon>
                            <UploadFilled />
                        </el-icon>
                        <span>上传</span>
                    </el-menu-item> -->

                    <el-menu-item index="/downloadList">
                        <el-icon>
                            <UploadFilled />
                        </el-icon>
                        <span>下载</span>
                    </el-menu-item>

                    <!-- <el-menu-item index="/finishedList">
                        <el-icon>
                            <UploadFilled />
                        </el-icon>
                        <span>已完成</span>
                    </el-menu-item> -->
                </el-sub-menu>


                <el-menu-item index="/recycle">
                    <el-icon>
                        <UploadFilled />
                    </el-icon>
                    <span>回收站</span>
                </el-menu-item>

                <el-menu-item index="/VIP">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>会员</span>
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
        </el-scrollbar>
    </el-aside>
</template>

<script setup>
import { logout } from '../api/account';
import { ElMessage, ElMessageBox } from 'element-plus'
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
            // ElMessage({
            //     type: 'info',
            //     message: 'Delete canceled',
            // })
        })
}
</script>

<style>
.el-aside {
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
</style>