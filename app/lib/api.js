import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(token+"using api")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;