
import { request } from "./request"



export function addComment(fid: number | undefined, comment: string) {
    return request.request({
        url: `/comment`,
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        data: {
            file: fid,
            content: comment
        }
    }).then(data => {
        return data.data
    })
}


export function listComment(size: number, page: number, fid: Number) {
    return request.request({
        url: `/comment/list`,
        method: "GET",
        params: {
            size,
            page,
            file: fid
        }
    }).then(data => {
        return data.data
    })
}
