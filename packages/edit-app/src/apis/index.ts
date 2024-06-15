import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig
} from 'axios'
import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { tansParams } from '@/utils/params'
import httpStatusMessages from './httpStatusMessages'
import { relogin, token } from '@/utils/auth'

const showErrorMessage = import.meta.env.VITE_SHOW_ERROR === 'true'

console.log(showErrorMessage == false)

const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: import.meta.env.VITE_APP_BASE_API
})

// 创建一个 Map 来存储 URL 和对应的 AbortController
const abortControllerMap: Map<string, AbortController> = new Map()

/**
 * 请求拦截器：在请求发送之前创建一个 AbortController 并存储在 Map 中，同时处理 GET 请求参数
 * @param {InternalAxiosRequestConfig} config - 请求配置
 * @returns {InternalAxiosRequestConfig} - 处理后的请求配置
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 创建 AbortController
    const controller = new AbortController()
    const url = config.url || ''
    config.signal = controller.signal // 将 signal 赋值给请求配置
    abortControllerMap.set(url, controller) // 存储 URL 和 AbortController 的映射

    // 数据转换逻辑：处理 GET 请求的参数
    if (config.url && config.method?.toLowerCase() === 'get' && config.params) {
      const queryString = tansParams(config.params)
      config.url = config.url.includes('?')
        ? `${config.url}&${queryString}`
        : `${config.url}?${queryString}`
      config.params = {} // 清空 params 避免重复添加
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器：在请求完成后删除对应的 AbortController 并处理响应和错误
 * @param {AxiosResponse} response - 响应对象
 * @returns {AxiosResponse|Promise<Error>} - 处理后的响应对象或错误
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const url = response.config.url || ''
    abortControllerMap.delete(url) // 请求完成后删除对应的 AbortController

    const code = response.data.code

    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }

    if (code !== 0) {
      if (showErrorMessage) {
        ElMessage.error({ message: response.data.msg || '业务错误', duration: 5 * 1000 })
      }
      return Promise.reject(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  (error: AxiosError) => {
    if (!error.response) {
      if (showErrorMessage) {
        ElMessage.error({ message: '网络错误或后端接口连接异常', duration: 5 * 1000 })
      }
      return Promise.reject(error)
    }

    /** NOTE: 这里只会根据状态码显示基本信息，
     * 详细错误信息不会在界面显示。
     * 请通过开发者工具调试获取，
     * 因为普通用户无需关心网络类错误。
     * 虽然DTO参数验证失败也会返回400之类的错误，
     * 但这些也统统属于BUG了，不是业务上的错误。
     * 也就是计划外的错误。
     * 总结来说计划内的错误是可以给用户展示的，
     * 或者说这些不算是错误。
     * 比如用户名存在这种，是可以预见到的。
     * */
    const { status } = error.response
    const message = httpStatusMessages[status] || `未知错误: ${status}`

    if (status === 401) {
      relogin()
      return Promise.reject(error)
    }
    if (showErrorMessage) {
      ElMessage.error({ message, duration: 5 * 1000 })
    }
    return Promise.reject(error)
  }
)

/**
 * 取消单个请求
 * @param {string|string[]} url - 要取消的请求的 URL 或 URL 数组
 */
export const cancelRequest = (url: string | string[]) => {
  const urlList = Array.isArray(url) ? url : [url]
  for (const _url of urlList) {
    const controller = abortControllerMap.get(_url)
    if (controller) {
      controller.abort() // 中断请求
      abortControllerMap.delete(_url) // 从 Map 中删除
    }
  }
}

/**
 * 取消所有请求
 */
export const cancelAllRequests = () => {
  abortControllerMap.forEach((controller) => {
    controller.abort() // 中断所有请求
  })
  abortControllerMap.clear() // 清空 Map
}

/**
 * 合并配置和 Token
 * @param {AxiosRequestConfig} option - 请求配置
 * @param {boolean} hasToken - 是否包含 Token
 * @returns {AxiosRequestConfig} - 合并后的请求配置
 */
const mixConfig = (option: AxiosRequestConfig, hasToken: boolean): AxiosRequestConfig => {
  const headers: Record<string, any> = {
    'Content-Type': 'application/json;charset=utf-8',
    ...option.headers
  }
  if (hasToken) {
    headers.Authorization = `Bearer ${token.value}`
  }
  return { ...option, headers }
}

/**
 * 通用请求方法
 * @param {string} method - 请求方法
 * @param {AxiosRequestConfig} option - 请求配置
 * @param {boolean} hasToken - 是否包含 Token
 * @returns {Promise<any>} - 请求结果
 */
const request = (method: string, option: AxiosRequestConfig, hasToken: boolean) => {
  return axiosInstance.request({ method, ...mixConfig(option, hasToken) })
}

// 请求方法封装
export default {
  get: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request('get', option, hasToken)
  },
  post: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request('post', option, hasToken)
  },
  delete: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request('delete', option, hasToken)
  },
  put: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request('put', option, hasToken)
  },
  cancelRequest,
  cancelAllRequests
}
