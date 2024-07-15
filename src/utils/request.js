import axios  from "axios";
import router from "@/router/index.js";
import {message} from "ant-design-vue";

// 初始化
var instance = axios.create({
    baseURL: 'http://localhost:5173/api/',
    timeout: 1000,
});
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log("发起请求", config);
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        console.log("响应请求", response);
        // 在每次响应后，检查是否有新的 token 返回，如果有则更新本地存储的 token
        const newToken = response.headers['new-token'];
        if (newToken) {
            sessionStorage.setItem('token', newToken);
        }
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        if (error.response && error.response.status === 401) {
            // 如果返回401状态码，表示token过期或无效
            message.error('Session expired. Please log in again.');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('mineMenus');
            // 重定向到登录页
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

// 将 token 信息添加到请求头中
export const $setToken = (token) => {
    sessionStorage.setItem('token', token);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

//get方法
export const $get =async (url,params)=>{
    let {data} = await instance.get(url,{
        params
    })
    return data;
}
//post方法
export const $post =async (url,params)=>{
    let {data}= await instance.post(url,params);
    return data;
}
//put方法
export const $put =async (url,params)=>{
    let {data}= await instance.put(url,params);
    return data;
}
//delete方法
export const $delete =async (url,params)=>{
    let {data}= await instance.delete(url,{
        params
    });
    return data;
}