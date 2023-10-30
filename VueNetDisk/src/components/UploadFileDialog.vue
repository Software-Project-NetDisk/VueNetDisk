<template>
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
import { ref } from 'vue';
const uploadFileVisible = ref(false)
</script>

<style></style>