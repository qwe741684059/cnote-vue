import axios from "axios";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
})

service.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default service