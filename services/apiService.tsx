import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api.iwin.life/',
    headers: {
        Accept: 'application/json',
    },
});

API.interceptors.request.use(
    async (config: any) => {
        const token = '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },//Error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const apiRequest = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any) => {
    try {
        const response = await API({
            method,
            url,
            data,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'API request failed');
    }
};

export default API;