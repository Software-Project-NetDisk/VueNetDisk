import axios from "~/axios"

export function login(email, password) {
    return axios.post("/user/login", {
        email,
        password
    })
}

export function register(email, password, user_name) {
    return axios.post("/user/register", {
        email,
        password,
        user_name
    })
}

export function getInfo() {
    return axios.post("/user/getInfo")
}

