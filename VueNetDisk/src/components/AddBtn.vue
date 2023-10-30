<!--悬浮按钮-->
<template>
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
    <CreateNewFolderDialog v-model="createNewFolderVisible"></CreateNewFolderDialog>

    <!--上传文件对话框-->
    <UploadFileDialog v-model="uploadFileVisible"></UploadFileDialog>
</template>

<script setup>
import CreateNewFolderDialog from './createNewFolderDialog.vue';
import UploadFileDialog from './UploadFileDialog.vue';
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';

const addBtnVisible = ref(false)
const createNewFolderVisible = ref(false)
const uploadFileVisible = ref(false)

</script>

<style>
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