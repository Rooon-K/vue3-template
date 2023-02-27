import axios from 'axios'
import { ElLoadingService, ElMessage } from 'element-plus'
// 创建axios实例
const service = axios.create({
  timeout: 10 * 1000 // 请求超时时间
})
// request拦截器
let loading: null | ReturnType<typeof ElLoadingService> = null;
service.interceptors.request.use(
  (config: any) => {
    if (!config.headers) return config;
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    loading = ElLoadingService({
      lock: true,
      text: "拼命加载中",
      background: "rgba(0, 0, 0, 0.7)",
    });
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // if (res.code !== 20000) {
    //     Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //     })
    loading?.close();
    return res
  },
  error => {
    console.error('err' + error) // for debug
    loading?.close();
    ElMessage({
      message: `网络超时，没有请求到数据`,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
export default service;