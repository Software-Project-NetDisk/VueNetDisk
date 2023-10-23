import { defineStore } from "pinia"
import { getInfo } from '~/api/user'

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