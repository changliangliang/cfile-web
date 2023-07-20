
import { request } from "./request"

export function fileList(size: number, page: number) {
    return request.request({
        url: "/file/list",
        method: "GET",
        params: {
            size: size,
            page: page
        }
    }).then(data => {
        return data.data
    })
}


// 获取文件信息
export function getFile(id: number) {
    return request.request({
        url: `/file/${id}`,
        method: "GET",
    }).then(data => {
        return data.data
    })
}

// 点赞文件
export function likeFile(id: number) {
    return request.request({
        url: `/file/like/${id}`,
        method: "GET",
    }).then(data => {
        return data.data
    })
}

// 取消点赞文件
export function unLikeFile(id: number) {
    return request.request({
        url: `/file/unlike/${id}`,
        method: "GET",
    }).then(data => {
        return data.data
    })
}

// 是否点赞文件
export function isLikeFile(id: number) {
    return request.request({
        url: `/file/islike/${id}`,
        method: "GET",
    }).then(data => {
        return data.data
    })
}



// 文件上传
export function fileUpload(filename: string,
    description: string, file: FormData) {
    return request.request({
        url: "/file/upload",
        method: "POST",
        params: {
            filename: filename,
            description: description
        },
        data: file,
    }).then(data => {
        return data.data
    })
}