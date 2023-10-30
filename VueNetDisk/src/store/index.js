import { defineStore } from "pinia"
import { getInfo } from '~/api/user'
import { getFileList } from "../api/file"

// 持久化储存共享用户信息
export const useUserStore = defineStore('user', {
    persist: true,
    state: () => {
        return {
            userInfo: null,
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
        }
    },

})

// 储存当前所在页文件列表信息
export const useFileListStore = defineStore('fileList', {
    state: () => {
        return {
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