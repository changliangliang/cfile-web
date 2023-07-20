import { request } from "./request"

export function login(username: string, password: string) {
    return request.request({
        url: "/login",
        method: "POST",
        params: {
            username: username,
            password: password,
        }
    }).then(resp => {
        return resp.data
    })
}