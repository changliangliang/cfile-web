
import { request } from "./request"

export function getUser(id: number) {
    return request.request({
        url: "/user/" + id,
        method: "GET"
    }).then(data => {
        return data.data
    })
}

export function getCurrentUser() {
    return request.request({
        url: "/user/current",
        method: "GET"
    }).then(data => {
        return data.data
    }).catch(() => {
        return null
    })
}