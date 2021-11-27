import axios from 'axios'
import { IAxiosConfig } from '../type/types'
import { AxiosResponse } from "axios"
import { ElLoading, ElMessage } from 'element-plus'
import store from './../store/index'

//loading对象
let loading: any;
//当前正在请求的数量
let needLoadingRequestCount: number = 0;
//显示loading
const ShowLoading = () => {
    loading = ElLoading.service({
        lock: false,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
        target: "body"
    })
}

//关闭loading
const hideLoading = () => {
    //避免多个请求情况
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0)
    if (needLoadingRequestCount === 0) {
        loading.close()
    }
}

// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:3008';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://localhost:3008';
}
//post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//路由请求拦截
axios.interceptors.request.use((config: IAxiosConfig) => {
    config.headers!['Content-Type'] = 'application/json;charset=UTF-8'
    //请求携带token
    const token: string = 'Bearer ' + store.state.token
    token && (config.headers!.Authorization = token)
    //判断当前请求是否设置了不显示Loading
    if (config.showLoading !== false) {
        ShowLoading()
    }
    return config
}, error => {
    hideLoading();
    error.data = {
        message: '服务器异常'
    }
    return Promise.reject(error)
})

//路由响应拦截
axios.interceptors.response.use((response: AxiosResponse) => {
    const config:IAxiosConfig = response.config
    if (config.showLoading !== false) {
        hideLoading();
    }
    const status = response.status;
    const decide = status < 200 || status > 300;
    if (decide) {
        const message = showStatus(status)
        if (typeof response.data === 'string') {
            response.data = { message }
        } else {
            response.data.message = message
        }
        ElMessage.error(message)
        return Promise.reject(response.data)
    } else if (response.data.code !== 200 && !decide) {
        ElMessage.error(response.data.msg)
        return Promise.reject(response.data)
    } else {
        if (config.showLoading !== false) {
            ElMessage.success(response.data.msg)
        }
        return response
    }
}, (error: any) => {
    hideLoading()
    if (axios.isCancel(error)) {
        ElMessage.warning('请勿重复请求')
    } else {
        const message = '请求超时或服务器异常'
        ElMessage.error(message)
    }
})

const showStatus = (code: number) => {
    let message = ""
    switch (code) {
        case 400:
            message = '请求错误';
            break;
        case 401:
            message = '未授权，请重新登录';
            break;
        case 403:
            message = '请求出错';
            break;
        case 404:
            message = '网络请求不存在'
            break;
        case 408:
            message = '请求超时';
            break;
        case 500:
            message = '服务器错误'
            break;
        case 501:
            message = '服务未实现';
            break;
        case 502:
            message = '网络错误';
            break;
        case 503:
            message = '服务不可用';
            break;
        case 505:
            message = 'HTTP版本不受支持';
            break;
        default:
            message = `连接出错(${code})`
    }
    return message
}

export default axios