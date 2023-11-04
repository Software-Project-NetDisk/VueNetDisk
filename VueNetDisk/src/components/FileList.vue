<template>
    <el-card class="box-card">
        <el-table ref="multipleTableRef" :data="fileList.fileList" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="file_name" label="文件名" :show-overflow-tooltip="true">
                <template #default="scope"><el-link target="_blank"
                        @click="openFile(scope.row.file_id, scope.row.file_name, scope.row.is_folder)">{{
                            scope.row.file_name
                        }}</el-link></template>
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" :show-overflow-tooltip="true">
                <template #default="scope">{{ scope.row.update_time }}</template>
            </el-table-column> />
            <el-table-column prop="file_size" label="大小" :show-overflow-tooltip="true">
                <template #default="scope">{{ scope.row.file_size ? scope.row.file_size : "--" }}</template>
            </el-table-column>
        </el-table>
    </el-card>
    <!--悬浮按钮-->
    <AddBtn></AddBtn>
</template>

<script lang="ts" setup>
import AddBtn from './AddBtn.vue'
import { useUserStore, useFileListStore, useFilePIDStore } from '../store';
import { ref, watch } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'


const router = useRouter();
const route = useRoute();

const user = useUserStore();
const fileList = useFileListStore();
const filePID = useFilePIDStore();
const userInfo = user.userInfo;
const user_id = userInfo["user_id"];
//定义文件类型
interface File {
    file_id: number
    file_name: string
    file_type: number
    file_size: number
    update_time: string
    user_id: number
    file_pid: number
    recycled: number
    file_md5: string
    file_path: string
    is_folder: number
}

// 全选与部分选
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<File[]>([])
const handleSelectionChange = (val: File[]) => {
    multipleSelection.value = val
}

// 初始化fileList
fileList.getFileList(user_id, filePID.file_pid);

// 订阅filePID，一旦file_pid变化就更新文件列表
filePID.$subscribe((mutation, state) => {
    console.log("订阅");
    console.log(mutation);
    console.log(state.file_pid);
    fileList.getFileList(user_id, state.file_pid);
})
// 监听路由参数的变化，一旦变化就改变全局file_pid
watch(
    () => route.params,
    (newValue, oldValue) => {
        if (newValue.file_pid) {
            filePID.file_pid = Number(newValue.file_pid);
        } else {
            filePID.file_pid = 0;
        }
    }
)

const openFile = (file_id, file_name, is_folder) => {
    // is_folder=1为文件夹，0为文件
    if (is_folder == 1) {
        // 打开文件夹时改变路由参数，从而改变全局file_pid
        router.push({ name: 'fileList', params: { file_pid: file_id, file_name: file_name } });
    }
}

</script>

<style>
.card-header {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: auto;
}
</style>