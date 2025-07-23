import Axios from 'axios';
export const baseURL = "http://192.168.100.240:3000";
const api = Axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials:true
});

api.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;