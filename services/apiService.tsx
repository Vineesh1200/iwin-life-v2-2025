import axios from 'axios';
import { getData } from './localStorage';
import { useEffect, useState } from 'react';

const API = axios.create({
    baseURL: 'http://localhost:3020/',
    headers: {
        Accept: 'application/json',
    },
});

const getToken = async (): Promise<string | null> => {
    const token = await getData('token');
    console.log('Resolved Token:', token);
    return token;
};

API.interceptors.request.use(
    async (config: any) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        if (status === 401) {
            console.warn('Unauthorized - maybe token expired');
        } else if (status === 404) {
            console.warn('Resource not found');
        } else if (status >= 500) {
            console.error('Server error');
        } else {
            console.error('API Error:', message);
        }

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