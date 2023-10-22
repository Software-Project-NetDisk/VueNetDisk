import axios from "axios";

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000, // 请求超时时间：50s
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
export default service;