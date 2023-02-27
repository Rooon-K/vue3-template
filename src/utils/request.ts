import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ElLoadingService, ElMessage } from 'element-plus'

// 定义请求响应参数，不含data
interface Result {
  code: number;
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T;
}
const config = {
  timeout: 10 * 1000 as number, // 请求超时时间
  withCredentials: true  // 跨域时候允许携带凭证
}
let loading: null | ReturnType<typeof ElLoadingService> = null;
class RequestHttp {

  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {

    this.service = axios.create(config);

    // request拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers) return config;
        config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
        config.headers["Content-Type"] = "application/json;charset=utf-8";
        loading = ElLoadingService({
          lock: true,
          text: "加载中",
          background: "rgba(0, 0, 0, 0.7)",
        });
        return config
      },
      (error: AxiosError) => {
        console.error(error)
        Promise.reject(error)
      }
    )

    // response 拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data
        loading?.close();
        return res
      },
      (error: AxiosError) => {
        console.error('err' + error)
        loading?.close();
        ElMessage({
          message: `网络超时，没有请求到数据`,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(error)
      }
    )
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }

}

export default new RequestHttp(config);