import { apiRequest } from './apiService';

export const fetchHomeEvents = async (formData: { pageCount: number, limitCount: number }) => {
    return await apiRequest('POST', 'home/get-home-page', formData);
}

export const alternateLike = async (eventId: string) => {
    return await apiRequest('POST', `events/like/${eventId}`);
}

export const joiningPeople = async (eventId: string) => {
    return await apiRequest('POST', `events/people-who-attending/${eventId}`);
}