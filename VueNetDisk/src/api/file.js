import axios from "~/axios"

export function getFileList(user_id, file_pid) {
    return axios.post("/file/fileList", {
        user_id,
        file_pid,
    })
}

export function createNewFolder(user_id, file_pid, folder_name) {
    return axios.post("/file/createNewFolder", {
        user_id,
        file_pid,
        folder_name,
    })
}