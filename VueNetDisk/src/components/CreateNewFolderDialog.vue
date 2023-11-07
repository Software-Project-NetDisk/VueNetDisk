<template>
    <el-dialog v-model="createNewFolderVisible" title="新建文件夹" width="30%">
        <el-icon :size="200" style="margin-left: 70px; color: #8898FB;">
            <FolderOpened />
        </el-icon>
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

// 用于改变父组件的visible属性，完成点击后关闭对话框的功能
const emit = defineEmits(['update:modelValue'])

const user = useUserStore();
const fileList = useFileListStore();
const filePID = useFilePIDStore();
const userInfo = user.userInfo;
const user_id = userInfo["user_id"];

const newFolderName = ref("新建文件夹");
// 创建新文件夹
const handlerCreateNewFolder = async () => {
    createNewFolder(user_id, filePID.file_pid, newFolderName.value).then(res => {
        toast("创建文件夹成功");
        emit('update:modelValue', false) // 修改visible的值为false，从而关闭当前窗口
        // 更新文件列表
        fileList.getFileList(user_id, filePID.file_pid);
    })
}
</script>

<style></style>