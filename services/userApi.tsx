import { apiRequest } from './apiService';

export const login = async (formData: any) => {
    return await apiRequest('POST', 'accounts/sign-in', formData);
}

export const createAccount = async (formData: any) => {
    return await apiRequest('POST', 'accounts/create-account', formData);
}