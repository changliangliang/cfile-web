import axios from 'axios'
import { message } from 'ant-design-vue';


const request = axios.create({
    baseURL: 'http://localhost:12345/',

})




request.interceptors.request.use(function (config) {
    // 添加
    config.headers.set("token", localStorage.getItem("token"))
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// NOTE: 全局异常处理
request.interceptors.response.use(function (response) {
    const data = response.data
    if (data.code == 200) {
        return response;
    }
    message.error(data.message)
    return Promise.reject(response)
}, function (error) {
    return Promise.reject(error);
})


export {
    request
}