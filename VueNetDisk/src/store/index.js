import { defineStore } from "pinia"
import { getInfo, getRootInfo, getUserList, updateUser, deleteUser } from '~/api/user'
import { getFileList } from "../api/file"

// 持久化储存共享用户信息
export const useUserStore = defineStore('user', {
    persist: true,
    state: () => {
        return {
            // 只是为了初始化，不然会报错，该值没有任何意义
            userInfo: [[0]],
        }
    },
    actions: {
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    this.userInfo = res
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        getRootInfo() {
            return new Promise((resolve, reject) => {
                getRootInfo().then(res => {
                    this.userInfo = res
                    resolve(res)
                }).catch(err => reject(err))
            })
        }
    },

})

// 储存当前所在页文件列表信息
export const useFileListStore = defineStore('fileList', {
    state: () => {
        return {
            // 只是为了初始化，不然会报错，该值没有任何意义
            fileList: [[0]],
        }
    },
    actions: {
        getFileList(user_id, file_pid) {
            return new Promise((resolve, reject) => {
                getFileList(user_id, file_pid).then(res => {
                    this.fileList = res
                    resolve(res)
                }).catch(err => reject(err))
            })
        }
    }

})

// 储存共享文件夹信息
export const useFilePIDStore = defineStore('filePID', {
    state: () => {
        return {
            file_pid: 0,
        }
    }
})

// 储存当前所在页文件列表信息
export const useUserListStore = defineStore('userPage', {
    state: () => {
        return {
            // 只是为了初始化，不然会报错，该值没有任何意义
            userPage: {
                records: [],
                total: 0,
            },
        }
    },
    actions: {
        getUserList(currentPage, query) {
            return new Promise((resolve, reject) => {
                getUserList(currentPage, query).then(res => {
                    this.userPage = res
                    console.log("用户列表")
                    console.log(res)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        updateUser(user_id, space, isVIP) {
            return new Promise((resolve, reject) => {
                updateUser(user_id, space * 1048576, isVIP).then(res => {
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        deleteUser(user_id, space, isVIP) {
            return new Promise((resolve, reject) => {
                deleteUser(user_id).then(res => {
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
    }

})