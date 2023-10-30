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

<script setup>
const user = useUserStore();
const fileList = useFileListStore();
const filePID = useFilePIDStore();
const userInfo = user.userInfo;

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