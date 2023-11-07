<template>
    <el-table :data="userPage.userPage.records" style="width: 100%">
        <el-table-column prop="user_id" label="用户id" :show-overflow-tooltip="true">
            <template #default="scope"><el-link target="_blank">{{ scope.row.user_id }}</el-link></template>
        </el-table-column>
        <el-table-column prop="user_name" label="用户名" :show-overflow-tooltip="true">
            <template #default="scope">{{ scope.row.user_name }}</template>
        </el-table-column> />
        <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true">
            <template #default="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column prop="space" label="容量" :show-overflow-tooltip="true">
            <template #default="scope">{{ (scope.row.space / 1048576).toFixed(2) + "MB" }}</template>
        </el-table-column>
        <el-table-column prop="isVIP" label="会员" :show-overflow-tooltip="true">
            <template #default="scope">{{ scope.row.is_VIP == '1' ? "是" : "否" }}</template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
                <div style="display: flex; direction: column;">
                    <el-input v-model="search" size="small" placeholder="输入查询条件" />
                    <el-button @click="handleQuery()">查询</el-button>
                </div>
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-footer style="margin-top: 20px;">
        <el-pagination background :hide-on-single-page="isSingle" v-model:current-page="currentPage"
            layout="prev, pager, next" :total="userPage.userPage.total" />
    </el-footer>

    <!-- 用户信息编辑框 -->
    <el-dialog v-model="EditVisible" title="编辑用户信息" width="30%">
        <el-form label-position="right" label-width="100px" style="max-width: 460px">
            <el-form-item label="用户_id">
                <el-input disabled v-model="form.user_id" />
            </el-form-item>
            <el-form-item label="用户名">
                <el-input disabled v-model="form.user_name" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input disabled v-model="form.email" />
            </el-form-item>
            <el-form-item label="容量(单位MB)">
                <el-input-number v-model="form.space" :min="1" />
            </el-form-item>
            <el-form-item label="会员">
                <div class="flex items-center text-sm">
                    <el-radio-group v-model="form.isVIP" class="ml-4">
                        <el-radio label="0" size="small">否</el-radio>
                        <el-radio label="1" size="small">是</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="updateUser()">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 删除提示框 -->
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from 'vue'
import { useUserListStore } from '../store';
import { ElTable } from 'element-plus'
import { toast } from '../util/notification';
import { ElMessageBox } from 'element-plus'
//定义用户类型
interface User {
    deadline: string
    is_VIP: number
    space: number
    space_used: number
    user_id: number
    user_name: string
    email: string
}

const currentPage = ref(1)
const isSingle = ref(true)
const search = ref('')
const EditVisible = ref(false)
// 初始化userList
const userPage = useUserListStore();
userPage.getUserList(currentPage.value, search.value);

// do not use same name with ref
const form = reactive({
    user_id: 0,
    user_name: '',
    email: '',
    space: 0,
    isVIP: '',
})

watch(
    () => currentPage.value,
    (newValue, oldValue) => {
        userPage.getUserList(newValue, search.value);
    }
)
const handleQuery = () => {
    userPage.getUserList(currentPage.value, search.value)
}

const updateUser = () => {
    userPage.updateUser(form.user_id, form.space, Number(form.isVIP))
    toast("修改成功")
    location.reload()
    // userPage.getUserList(currentPage.value, search.value)
    EditVisible.value = false
}

const handleEdit = (user: User) => {
    EditVisible.value = true
    form.user_id = user.user_id;
    form.user_name = user.user_name;
    form.email = user.email;
    form.space = Number((user.space / 1048576).toFixed(2));
    form.isVIP = String(user.is_VIP);

    console.log(user)
}
const handleDelete = (user: User) => {
    ElMessageBox.confirm(
        '确定要删除吗?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            userPage.deleteUser(user.user_id)
            toast("删除成功")
            location.reload()
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
</style>