// import axios, {InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';
// import type { ApiResponse, QuestionDetail, QuestionSearchReq, PageResult  } from '@/types/question';

// 创建 axios 实例（可配置 baseURL 和拦截器）
const service = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'http://180.76.229.88:8080' // 生产环境直接访问
    : '/api', // 开发环境走代理
  // ...其他配置
  timeout: 50000,
  headers: {"Content-Type": "application/json;charset=utf-8"},
});


// // 请求拦截器
// service.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         return config;
//     },
//     (error: any) => {
//         return Promise.reject(error);
//     }
// );

// // 响应拦截器
// service.interceptors.response.use(
//     (response: AxiosResponse) => {
//         const {status} = response;
//         const {code} = response.data;
//         console.log(response, status, code);
//         if (status === 200 && code === 0) {
//             return response.data;
//         }
//         return Promise.reject(response.data);
//     }
// );

// 导出 axios 实例
export default service;