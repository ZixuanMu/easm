import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;  // 响应的 HTTP 状态码
  msg: string;     // 响应的消息提示
  error_code: number;    // 自定义的业务状态码
  data: T;         // 响应的数据部分，类型为泛型 T
}

// 如果环境变量中定义了 API 基础 URL，则将其设置为 Axios 的默认基础 URL
if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 每个请求都携带 token（例如 JWT）
    // 这里的 Authorization 是自定义的请求头，根据实际情况进行修改
    const token = getToken();  // 从 auth 工具中获取当前的 token
    if (token) {
      if (!config.headers) {
        config.headers = {};  // 如果 headers 不存在，则初始化它
      }
      config.headers.Authorization = `Bearer ${token}`;  // 将 token 添加到请求头中
    }
    return config;  // 返回配置对象
  },
  (error) => {
    // 请求错误时执行的回调函数
    return Promise.reject(error);  // 返回一个被拒绝的 Promise，以捕获错误
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;  // 获取响应的 data 部分，即服务器返回的业务数据
    // 如果自定义的业务状态码不是 20000，则判定为错误
    if (res.error_code !== 100000) {
      // 显示错误消息
      Message.error({
        content: res.msg || 'Error',  // 显示返回的错误信息或默认的 'Error'
        duration: 5 * 1000,  // 错误消息显示 5 秒钟
      });

      // 处理特定的业务错误代码
      // 50008: 非法 token; 50012: 其他客户端登录; 50014: token 过期
      if (
        [50008, 50012, 50014].includes(res.error_code) &&
        response.config.url !== '/api/user/info'  // 排除对 /api/user/info 的请求
      ) {
        // 显示一个模态框提示用户重新登录
        Modal.error({
          title: 'Confirm logout',  // 模态框的标题
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',  // 提示内容
          okText: 'Re-Login',  // 确认按钮的文本
          async onOk() {
            const userStore = useUserStore();  // 获取用户存储
            await userStore.logout();  // 执行登出操作
            window.location.reload();  // 刷新页面以重新加载应用
          },
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));  // 返回被拒绝的 Promise，以捕获业务错误
    }
    return res;  // 返回响应的数据部分
  },
  (error) => {
    // 响应错误时执行的回调函数
    Message.error({
      content: error.msg || 'Request Error',  // 显示返回的错误信息或默认的 'Request Error'
      duration: 5 * 1000,  // 错误消息显示 5 秒钟
    });
    return Promise.reject(error);  // 返回被拒绝的 Promise，以捕获错误
  }
);
