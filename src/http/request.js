import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { baseURL} from '../config/http.config'
import { getToken } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
    baseURL: baseURL,
    // withCredentials: true, 
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)


service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.code !== 200) {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                ElMessageBox.confirm('您已经注销，您可以取消停留在本页，或再次登录，确认注销', {
                    confirmButtonText: '登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // store.dispatch('user/resetToken').then(() => {
                    //     location.reload()
                    // })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error)
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
