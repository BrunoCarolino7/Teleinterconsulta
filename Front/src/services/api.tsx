import axios from "axios";

const token = localStorage.getItem("Token");


export const api = axios.create({
    baseURL: 'https://localhost:7092',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

api.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default api;