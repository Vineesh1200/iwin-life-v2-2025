import { useState } from 'react';
import { fetchEvents, fetchSingleEvent } from '../services/eventsApi';

export const useFetchEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getEvents = async (formData: { pageCount: number; limitCount: number }) => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchEvents(formData);

            setEvents(data.events);
        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return { getEvents, events, loading, error };
};

export const useFetchSingleEvent = () => {
    const [singleEvent, setSingleEvent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getSingleEvent = async (eventId: string) => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchSingleEvent(eventId);

            setSingleEvent(data.events);
        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return { getSingleEvent, singleEvent, loading, error };
};