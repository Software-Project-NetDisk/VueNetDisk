<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button type="primary">新建文件夹</el-button>
                <el-button type="primary">上传文件</el-button>
            </div>
        </template>
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
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
</template>

<script lang="ts" setup>
import { useUserStore } from '../store';
import { getFileList } from '../api/file';
import { ref, watch } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

const user = useUserStore();
const userInfo = user.userInfo;
// userInfo不为空
const user_id = userInfo && userInfo["user_id"];
const file_pid = ref(0);
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

const tableData = ref<File[]>([])

const handler = async () => {
    getFileList(user_id, file_pid.value).then(res => {
        console.log(res);
        // 获取fileList
        tableData.value = res
    })
}
handler();
// 监听路由参数的变化，一旦变化就刷新文件列表
watch(
    () => route.params,
    (newValue, oldValue) => {
        console.log("newValue" + newValue.file_pid);
        console.log("oldValue" + oldValue.file_pid);
        if (newValue.file_pid) {
            file_pid.value = Number(newValue.file_pid);
        } else {
            file_pid.value = 0;
        }
        handler();
    }
)

const openFile = async (file_id, file_name, is_folder) => {
    // is_folder=1为文件夹，0为文件
    if (is_folder == 1) {
        // 打开文件夹时改变路由参数，从而刷新文件列表
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