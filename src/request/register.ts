import { request } from "./request"

export function register(username: string, password: string, email: string) {
    return request.request({
        url: "user/register",
        method: "POST",
        data: {
            username: username,
            password: password,
            email: email
        }
    }).then(resp => { return resp.data })
}