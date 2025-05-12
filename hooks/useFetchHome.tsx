import { fetchHomeEvents } from '@/services/homeApi';
import { useState } from 'react';

export const useFetchHome = () => {
    const [homeEvents, setHomeEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getHomeEvents = async (formData: { pageCount: number; limitCount: number }) => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchHomeEvents(formData);

            setHomeEvents(data.events);
        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return { getHomeEvents, homeEvents, loading, error };
};