<template>
    <div class="box min-h-screen bg-slate-500">
        <div class="form rounded-2xl flex items-center justify-center  flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="flex items-center justify-center my-5 text-gray-300">
                <span class="h-[1px] w-16 bg-gray-200 mx-2"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200 mx-2"></span>
            </div>
            <el-form @keyup.enter.native="onSubmit" :model="form" class="w-[250px]" :rules="rules" ref="formRef">
                <el-form-item prop="email">
                    <el-input v-model="form.email" placeholder="邮箱">
                        <template #prefix>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" color="#626aef" @click="onSubmit" :loading="loading" round
                    class="w-[250px]">登录</el-button>
                <div class="flex items-center justify-center my-5">
                    <el-link type="primary" @click="this.$router.push('/register')">立即注册</el-link>
                </div>

            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '~/api/account'
import { toast } from "~/util/notification"
import { useRouter } from 'vue-router'
import { setToken } from '~/util/cookie'

const router = useRouter();

// do not use same name with ref
const form = reactive({
    email: '',
    password: '',
})

const rules = {
    email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
    ],

    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
}

const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        } else {
            // console.log("验证通过");
            // 防止重复点击登录按钮
            loading.value = true;
            login(form.email, form.password).then(res => {
                console.log(res);
                // ElNotification({
                //     message: "登录成功",
                //     type: 'success',
                //     duration: 3000
                // })
                //提示登录成功
                toast("登录成功");

                // 储存token
                // const cookie = useCookies();
                // cookie.set("token", res.token)
                setToken(res.token);

                router.push("/index/fileList")
            }).finally(() => {
                loading.value = false;
            })
        }
    })
}
</script>

<style>
.box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.form {
    background-color: white;
    width: 300px;
    height: 500px;
}
</style>