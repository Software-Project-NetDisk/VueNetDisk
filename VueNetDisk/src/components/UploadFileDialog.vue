<template>
    <el-dialog title="上传文件" width="30%">
        <div class="page page-home">
            <div class="btn-group">
                <el-button type="primary" @click="upload">上传</el-button>
            </div>
        </div>
    </el-dialog>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Bus from '~/util/bus.js'

// 用于改变父组件的visible属性，完成点击后关闭对话框的功能
const emit = defineEmits(['update:modelValue'])

const fileList = ref([])

const upload = () => {
    emit('update:modelValue', false) // 修改visible的值为false，从而关闭当前窗口
    // 打开文件选择框
    Bus.emit('openUploader', {
        // 给服务端的额外参数
        params: {
            page: 'home'
        },
        options: {
            target: 'http://localhost:8080/file/uploadFile'
        }
    })
}

onMounted(() => {
    // 文件选择后的回调
    Bus.on('fileAdded', () => {
        console.log('文件已选择')
        // console.log(fileList)
    })

    // 文件上传成功的回调
    Bus.on('fileSuccess', () => {
        console.log('文件上传成功')
    })
})

onBeforeUnmount(() => {
    Bus.off('fileAdded')
    Bus.off('fileSuccess')
})
</script>
  
<style scoped lang="scss">
.page-home {
    height: 100%;
}

.file-box {
    position: relative;
    margin-top: 20px;
    padding: 30px;
    flex: 1;
    background-color: #fff;

    .title {
        padding-left: 10px;
        font-size: 15px;
        border-left: 4px solid #1989fa;
    }

    .empty {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        .upload {
            color: #1989fa;
            cursor: pointer;
        }
    }
}
</style>
  