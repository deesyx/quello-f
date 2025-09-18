import type {InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';
// import type { ApiResponse, QuestionDetail, QuestionSearchReq, PageResult  } from '@/types/question';

// 创建 axios 实例（可配置 baseURL 和拦截器）
const http = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'http://180.76.229.88:8080' // 生产环境直接访问
    : '/api', // 开发环境走代理
  // ...其他配置
  timeout: 50000,
  headers: {"Content-Type": "application/json;charset=utf-8"},
});


// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    const {status} = response;
    const {code} = response.data;
    console.log(response, status, code);
    if (status === 200 && code === 0) {
      return response.data;
    }
    return Promise.reject(response.data);
  }, (error: any) => { 
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default http;