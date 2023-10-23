import axios from "axios";
import { getToken } from "./util/cookie";
import { toast } from "./util/notification";

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000, // 请求超时时间：50s
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // const cookie = useCookies();
    // const token = cookie.get("token");

    //往请求头自动添加token
    const token = getToken()
    if (token) {
        config.headers["token"] = token;
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // ElNotification({
    //     message: error.response.data.message || "请求失败",
    //     type: 'error',
    //     duration: 3000,
    // })
    // 提示失败
    toast(error.response.data.message || "请求失败", "error")
    return Promise.reject(error);
});

export default service;