import axios from 'axios'
import QS from 'qs';
import { ElMessageBox, ElMessage } from 'element-plus'
import NetworkConfig from '../config/http.config'
import { getToken } from '@/utils/auth'
import { useStore } from '@/store'

const service = axios.create(NetworkConfig)

service.interceptors.request.use(
    config => {
        if (useStore().getters.token) {
            config.headers['Authorization'] = getToken()
        }
        if (config.method === "POST"){
            config.data = QS.stringify(config.data)
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

            if (res.code === 23001) {
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
