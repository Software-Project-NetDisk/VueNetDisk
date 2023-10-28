import axios from "~/axios"
import router from "~/router/index"
import { removeToken } from '~/util/cookie'

export function login(email, password) {
    return axios.post("/account/login", {
        email,
        password
    })
}

export function register(email, password, user_name) {
    return axios.post("/account/register", {
        email,
        password,
        user_name
    })
}

export function logout() {
    removeToken();
    window.localStorage.clear();
    router.push("/login")
}



