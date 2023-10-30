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
    <div>
        <el-button type="primary" :icon="Plus" class="add" circle @click="addBtnVisible = true" />
        <el-dialog v-model="addBtnVisible" :show-close="false" class="addDialog">
            <div>
                <div @click="createNewFolderVisible = true, addBtnVisible = false">
                    新建文件夹
                </div>
                <div @click="uploadFileVisible = true, addBtnVisible = false">
                    上传文件
                </div>
            </div>
        </el-dialog>
    </div>

    <!--新建文件夹对话框-->
    <el-dialog v-model="createNewFolderVisible" title="新建文件夹" width="30%">
        <el-input v-model="newFolderName" />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="handlerCreateNewFolder">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!--上传文件对话框-->
    <el-dialog v-model="uploadFileVisible" :show-close="false" class="uploadDialog">
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽文件到这里或<em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>
    </el-dialog>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { useUserStore, useFileListStore, useFilePIDStore } from '../store';
import { createNewFolder } from '../api/file';
import { ref, watch } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { toast } from "../util/notification"

// 点击添加按钮弹出对话框
const addBtnVisible = ref(false)
const createNewFolderVisible = ref(false)
const uploadFileVisible = ref(false)
const newFolderName = ref("新建文件夹")

const router = useRouter();
const route = useRoute();

const user = useUserStore();
const fileList = useFileListStore();
const filePID = useFilePIDStore();
const userInfo = user.userInfo;
// userInfo不为空
const user_id = userInfo && userInfo["user_id"];
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

// 创建新文件夹
const handlerCreateNewFolder = async () => {
    createNewFolder(user_id, filePID.file_pid, newFolderName.value).then(res => {
        createNewFolderVisible.value = false;
        toast("创建文件夹成功");
        // 更新文件列表
        fileList.getFileList(user_id, filePID.file_pid);
    })
}

// 上传文件



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

.add {
    min-width: 50px;
    min-height: 50px;
    font-size: 20px;
    bottom: 80px;
    position: fixed;
    right: 80px;
    z-index: 10;
}

.addDialog {
    .el-dialog__header {
        display: none;
    }

    .dj-dialog-content {
        padding: 0px;
        overflow: unset;
    }

    width: auto;
    height: auto;
    position: fixed;
    bottom: 100px;
    right: 80px;

    >div {
        padding: 10px;
    }
}
</style>