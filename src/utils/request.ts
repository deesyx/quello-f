import axios, {InternalAxiosRequestConfig, AxiosResponse} from "axios";
import {baseURL} from "@/constant/constant";

// 创建 axios 实例
const service = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {"Content-Type": "application/json;charset=utf-8"},
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const {status} = response;
        const {code} = response.data;
        console.log(response, status, code);
        if (status === 200 && code === 0) {
            return response.data;
        }
        return Promise.reject(response.data);
    }
);

// 导出 axios 实例
export default service;
