<template>
    <el-aside>
        <!-- <el-scrollbar> -->
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
                <el-menu-item index="/downloadList">
                    <el-icon>
                        <UploadFilled />
                    </el-icon>
                    <span>下载</span>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/index/recycle">
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
                <el-menu-item @click="handleChangePassword">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>修改密码</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
        <!-- </el-scrollbar> -->
        <div class="space">
            <span>容量</span>
            <span style="margin-bottom: 10px;" v-html="dynamicText"></span>
            <el-progress type="circle" :percentage="parseFloat(percent)" />
        </div>
    </el-aside>
</template>

<script setup>
import { logout } from '../api/account';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '../store';
import { ref } from 'vue';

const user = useUserStore();
const userInfo = user.userInfo;
const space = userInfo["space"];
const space_used = userInfo["space_used"];
const percent = ref(0)
percent.value = (space_used * 100 / space).toFixed(2);
// const status = ref()
const dynamicText = ref((space_used / 1048576).toFixed(2) + "MB" + "/" + (space / 1048576).toFixed(2) + "MB")

// 监控用户容量信息，一旦发生变化，就更新容量信息
user.$subscribe((mutation, state) => {
    console.log(state)
    percent.value = (state.userInfo.space_used * 100 / state.userInfo.space).toFixed(2);
    // if (percent.value === 100) {
    //     status.value = "full"
    // } else if (percent.value >= 90) {
    //     status.value = "warning"
    // }
    dynamicText.value = (state.userInfo.space_used / 1048576).toFixed(2) + "MB" + "/" + (state.userInfo.space / 1048576).toFixed(2) + "MB"
})

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