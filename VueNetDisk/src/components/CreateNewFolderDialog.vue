<template>
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
</template>

<script setup>
import { ref } from 'vue';
import { createNewFolder } from '../api/file';
import { useUserStore, useFileListStore, useFilePIDStore } from '../store';
import { toast } from "../util/notification";

const user = useUserStore();
const fileList = useFileListStore();
const filePID = useFilePIDStore();
const userInfo = user.userInfo;
const user_id = userInfo["user_id"];

const createNewFolderVisible = ref(false)
const newFolderName = ref("新建文件夹");
// 创建新文件夹
const handlerCreateNewFolder = async () => {
    createNewFolder(user_id, filePID.file_pid, newFolderName.value).then(res => {
        createNewFolderVisible.value = false;
        toast("创建文件夹成功");
        // 更新文件列表
        fileList.getFileList(user_id, filePID.file_pid);
    })
}
</script>

<style></style>