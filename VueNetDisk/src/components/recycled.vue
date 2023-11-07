<template>
    <el-card class="box-card">
        <div>回收站</div>
        <el-table ref="multipleTableRef" :data="RecycleList.RecycleList" style="width: 100%"
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
    <!-- <AddBtn></AddBtn> -->


    <!-- 小框框下载和回收站 -->
    <el-dialog v-model="downloadRecycle" width="19%" id="downloadRecycle">
        <el-popover placement="top-start" trigger="hover" content="将其还原">
            <template #reference>
        <el-button  id="text" class="m-2" @click="handerRecycle"> <el-icon><RefreshLeft /></el-icon></el-button>
            </template>
        </el-popover>


        <el-popover placement="top-start" trigger="hover" content="将其永久删除">
            <template #reference>
        <el-button  id="text" class="m-2" @click="deleteAll"> <el-icon><Delete /></el-icon></el-button>
            </template>
        </el-popover>

        <el-button id="closebold" @click="downloadRecycle=false"> <el-icon><CloseBold /></el-icon></el-button>
    </el-dialog>
    
</template>



<script lang="ts" setup>
import { useUserStore, useRecycledListStore, useFilePIDStore} from '../store';
import { ref, watch } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { recycleFile,deleteFile} from '../api/file';
import { toast } from "../util/notification"

const router = useRouter();
const route = useRoute();

const user = useUserStore();
const RecycleList = useRecycledListStore();
const filePID = useFilePIDStore();
const userInfo = user.userInfo;
let downloadRecycle = ref(false)

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
    if(val.length>0){
        downloadRecycle.value=true
    }
}

// 初始化RecycleList
RecycleList.getRecycleList(user_id, filePID.file_pid);

// 订阅filePID，一旦file_pid变化就更新文件列表
filePID.$subscribe((mutation, state) => {
    console.log("订阅");
    console.log(mutation);
    console.log(state.file_pid);
    RecycleList.getRecycleList(user_id, state.file_pid);
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
        router.push({ name: 'RecycleList', params: { file_pid: file_id, file_name: file_name } });
    }
}

const deleteAll=async()=>{
    // console.log(multipleSelection.value[0].user_id)
    let file_id_arr=new Array();
    for(let i=0;i<multipleSelection.value.length;i++){
        file_id_arr.push(multipleSelection.value[i].file_id)
    }
    deleteFile(file_id_arr).then(res=>{
        downloadRecycle.value=false;
        toast("删除成功！")
        RecycleList.getRecycleList(user_id, filePID.file_pid);
    })
}

const handerRecycle=async()=>{
    console.log(multipleSelection.value[0].user_id)
    let file_id_arr=new Array();
    for(let i=0;i<multipleSelection.value.length;i++){
        file_id_arr.push(multipleSelection.value[i].file_id)
    }
    console.log(file_id_arr);
    recycleFile(multipleSelection.value[0].user_id,multipleSelection.value[0].file_pid,file_id_arr,0).then(res=>{
        downloadRecycle.value=false;
        toast("还原成功！")
        RecycleList.getRecycleList(user_id, filePID.file_pid);
    })
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
#downloadRecycle{
    .el-dialog__header {
        display: none;
    }

    .dj-dialog-content {
        padding: 0px;
        overflow: unset;
    }
    border-radius: 10px;
    margin-top: 550px;
    height: 70px;
    padding-bottom: 10px;
}
#text{
    margin-top: -10px;

}
#closebold{
    margin-top: -15px;
    border-radius: 50%;
    border: none;

}

</style>
