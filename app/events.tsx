import { ActivityIndicator, FlatList, Image, StyleSheet, Pressable, useWindowDimensions, View, useColorScheme, Button } from 'react-native';
import React, { useState, useEffect, Fragment } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/searchBar';
import { useFetchEvents } from '@/hooks/useFetchEvents';
import EventModal from '@/components/eventModal';
import BigCalendar from '@/components/bigCalendar';
import EventsCard from '@/components/eventCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';

const Events = () => {

    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const [pageCount, setPageCount] = useState<number>(1);
    const [limitCount] = useState<number>(10);
    const [allEvents, setAllEvents] = useState<any[]>([]);
    const { getEvents, events, loading, error } = useFetchEvents();
    const [stopPagination, setStopPagination] = useState(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [isModalVisible2, setModalVisible2] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const day = (dateString: string) => {
        const date = new Date(dateString);
        return date.getDate().toString().padStart(2, '0');
    };

    const month = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    };

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };

    useEffect(() => {
        getEvents({ pageCount, limitCount });
    }, [pageCount]);

    useEffect(() => {
        if (events.length > 0) {
            setAllEvents(prevEvents => [...prevEvents, ...events]);
        } else {
            setStopPagination(true);
        }
    }, [events]);

    const loadMoreEvents = () => {
        if (!loading) {
            setPageCount(prevPage => prevPage + 1);
        }
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setModalVisible(false);
    };

    const openModal2 = () => {
        setModalVisible2(true);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
    };

    return (
        <Fragment>
            <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <View className={`flex-row items-center gap-2 ${isDarkMode ? 'bg-black' : 'bg-white'} px-3.5 py-3 w-full`}>
                    <Image source={images.logo} style={styles.logo} className={`cursor-pointer`} />
                    <SearchBar />
                    <Pressable onPress={() => openModal2()}>
                        <Icon name="calendar-month" size={24} color={`${isDarkMode ? '#FFF' : '#000'}`} />
                    </Pressable>
                    <Link href='/filter'>
                        <Image source={icons.filter} className={`cursor-pointer ${!isDarkMode && 'invert'} mt-1`} />
                    </Link>
                </View>
                {/* <View className={`flex-row items-center justify-end px-5 w-full mb-3 `}>
                    <Link href='/filter'>
                        <View className={`flex-row items-center gap-2 font-viga px-3 py-2 border-2 border-gray-300 rounded-md cursor-pointer`}>
                            <Icon name="filter-list" size={24} color={`${isDarkMode ? '#FFF' : '#000'}`} />
                            Filter
                        </View>
                    </Link>
                </View> */}
                <FlatList
                    className="px-4 pt-1 pb-4"
                    data={allEvents}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <EventsCard event={item} />
                    )}
                    onEndReached={stopPagination ? undefined : loadMoreEvents}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="white" /> : null}
                />
            </View>

            <EventModal isVisible={isModalVisible} onClose={closeModal} event={selectedEvent} />
            <BigCalendar isVisible={isModalVisible2} onClose={closeModal2} events={events} />
        </Fragment>
    );
};

export default Events;

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
    },
});