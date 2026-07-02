import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (typeof res === 'object' && res !== null) {
      if (res.code !== undefined && res.code !== 200 && res.code !== 0) {
        return Promise.reject(new Error(res.message || '请求失败'))
      }
      return res
    }
    return response
  },
  error => {
    console.error('HTTP请求错误:', error)
    if (error.response && error.response.data) {
      return Promise.reject(new Error(error.response.data.message || error.response.data.msg || '请求失败'))
    }
    return Promise.reject(new Error(error.message || '请求失败'))
  }
)

export default request