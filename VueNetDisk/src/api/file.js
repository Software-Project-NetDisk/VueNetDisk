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

export function mergeFile(user_id, file_pid, file_md5, file_name, file_size) {
    return axios.post("/file/mergeFile", {
        user_id,
        file_pid,
        file_md5,
        file_name,
        file_size
    })
}

export function recycleFile(user_id,file_pid,file_id,recycled){
    return axios.post("/file/recycleFile",{
        user_id,
        file_pid,
        file_id,
        recycled,
    })
}

export function getRecycleList(user_id,file_pid){
    return axios.post("/file/RecycleList",{
        user_id,
        file_pid,
    })
}



export function deleteFile(file_id){
    return axios.post("/file/deleteFile",{
        file_id,
    })
}

