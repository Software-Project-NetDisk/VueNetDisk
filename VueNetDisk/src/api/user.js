import axios from "~/axios"

// 获取普通用户信息
export function getInfo() {
    return axios.post("/user/getInfo")
}
// 获取管理员用户信息
export function getRootInfo() {
    return axios.post("/user/getRootInfo")
}
// 获取普通用户列表
export function getUserList(currentPage, query) {
    return axios.post("/user/getUserList", {
        currentPage,
        query
    })
}
// 更新普通用户信息
export function updateUser(user_id, space, isVIP) {
    return axios.post("/user/updateUser", {
        user_id,
        space,
        isVIP
    })
}
// 删除普通用户信息
export function deleteUser(user_id) {
    return axios.post("/user/deleteUser", {
        user_id,
    })
}