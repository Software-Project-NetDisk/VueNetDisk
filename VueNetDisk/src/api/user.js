import axios from "~/axios"

export function getInfo() {
    return axios.post("/user/getInfo")
}