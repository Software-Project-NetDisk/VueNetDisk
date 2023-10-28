import axios from "~/axios"

export function getFileList(user_id, file_pid) {
    return axios.post("/file/fileList", {
        user_id,
        file_pid,
    })
}