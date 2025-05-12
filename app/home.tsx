import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';
import { useFetchHome } from '@/hooks/useFetchHome';
import { alternateLike, joiningPeople } from '@/services/homeApi';
import { EventItem } from '@/interfaces/interfaces';
import { router } from 'expo-router';

const HomeScreen = () => {

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { width } = useWindowDimensions();
    const updateImage = width >= 768 ? 500 : 250;
    const { getHomeEvents, homeEvents, loading, error } = useFetchHome();
    const [allEvents, setAllEvents] = useState<EventItem[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [limitCount] = useState<number>(10);
    const [stopPagination, setStopPagination] = useState(false);
    const [expandedIndexes, setExpandedIndexes] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (index: number) => {
        console.log(expandedIndexes)
        setExpandedIndexes((prev: { [key: number]: boolean }) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const quotes = [
        "Went solo. Left with new friends.",
        "This is how I make NYC feel like mine.",
        "I found my weekend crew."
    ];

    const getmeta = (date: string, time: string) => {

        const today = new Date(date);
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

        const [hourStr, minuteStr] = time.split(':');
        let hours = parseInt(hourStr, 10);
        const minutes = parseInt(minuteStr, 10);

        const isPM = hours >= 12;
        const suffix = isPM ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;

        const formattedTime =
            minutes === 0
                ? `${hours}${suffix}`
                : `${hours}:${String(minutes).padStart(2, '0')}${suffix}`;

        return `${dayName} · ${formattedTime}`;

    }

    const updateLike = (_id: string) => {
        alternateLike(_id).then();
        setAllEvents((prev: EventItem[]) =>
            prev.map((event: EventItem) => ({ ...event, isLiked: !event.isLiked }))
        );
    };

    const updateIsGoing = (_id: string) => {
        joiningPeople(_id).then();
        setAllEvents((prev: EventItem[]) =>
            prev.map((event: EventItem) => ({ ...event, isGoing: !event.isGoing }))
        );
    };

    useEffect(() => {
        getHomeEvents({ pageCount, limitCount });
    }, [pageCount]);

    useEffect(() => {
        if (homeEvents?.length > 0) {
            setAllEvents(prevEvents => [...prevEvents, ...homeEvents]);
        } else {
            setStopPagination(true);
        }
    }, [homeEvents]);

    const loadMoreEvents = () => {
        if (!loading) {
            setPageCount(prevPage => prevPage + 1);
        }
    };

    return (
        <ScrollView className={`flex-1 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#ffffff]'}`}>
            <View className='w-full max-w-[1200px] mx-auto'>
                <Image
                    source={images.logo}
                    className="mx-auto mt-8"
                    style={styles.mainImage}
                />

                <View className="px-4 py-8 items-center">
                    <Text className={`text-3xl font-bold text-center ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                        Don't just scroll life. Live it.
                    </Text>
                    <Text className={`text-lg text-center mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                        Curated experiences, real adventures, and events worth sharing.
                    </Text>
                    <View className="flex-row mt-6">
                        <TouchableOpacity className={`px-6 py-3 rounded-full mr-2 ${isDark ? 'bg-red-600' : 'bg-red-500'}`}>
                            <Text className="text-white font-semibold font-viga">Explore Events</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`px-6 py-3 rounded-full border ${isDark ? 'border-white' : 'border-black'}`}>
                            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-black'} font-viga`}>Join the Movement</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-4 py-6">
                    <Text className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                        This Week's Picks
                    </Text>

                    {allEvents.map((event: EventItem, index: number) => {
                        const isExpanded = expandedIndexes[index];
                        const shouldTruncate = event?.details?.length > 200;
                        const visibleText = isExpanded || !shouldTruncate
                            ? event.details
                            : event.details.substring(0, 200);
                        return (
                            <TouchableOpacity onPress={() => router.push('/detail')}>
                                <View
                                    key={index}
                                    className={`rounded-xl p-5 mb-6 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#ffffff]'} border ${isDark ? 'border-[#444444]' : 'border-[#dddddd]'} shadow-lg`}
                                >
                                    {event.imageURL && (
                                        <Image
                                            source={{ uri: event.imageURL }}
                                            className={`rounded-lg mb-4`}
                                            style={{ height: updateImage, width: '100%' }}
                                        />
                                    )}
                                    <View className="flex-row justify-between items-center mb-3">
                                        <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                            {event.name}
                                        </Text>
                                        <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} font-viga`}>
                                            {getmeta(event.date, event.time)}
                                        </Text>
                                    </View>
                                    <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                        {visibleText}
                                        {shouldTruncate && (
                                            <TouchableOpacity
                                                onPress={() => toggleExpand(index)}
                                                className="text-blue-500 cursor-pointer ml-1"
                                            >
                                                {isExpanded ? ' See less' : '... See more'}
                                            </TouchableOpacity>
                                        )}
                                    </Text>
                                    <View className="flex-row items-center mb-4">
                                        <View className="flex-row -space-x-3">
                                            {event?.firstTwoVisitors?.map((attendee: string, index2: number) => (
                                                <Image
                                                    key={index2}
                                                    source={{ uri: attendee }}
                                                    defaultSource={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"}}
                                                    className="w-8 h-8 rounded-full border-2 border-white"
                                                />
                                            ))}
                                        </View>
                                        <Text className={`text-sm ${event?.firstTwoVisitors?.length > 0 && 'ml-2'} ${isDark ? 'text-gray-300' : 'text-gray-500'} font-viga`}>
                                            {`+ ${event.totalVisitingCount} people going`}
                                        </Text>
                                    </View>
                                    <View className="flex-row flex-wrap gap-2">
                                        <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-green-800' : 'bg-green-100'}`} onPress={() => updateIsGoing(event._id)}>
                                            <Text className={`font-semibold ${isDark ? 'text-green-100' : 'text-green-800'} font-viga`}>{event.isGoing ? "✔ I'm Going" : "✖ Can't Make It"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-red-800' : 'bg-red-100'}`} onPress={() => updateLike(event._id)}>
                                            <Text className={`${isDark ? 'text-red-100' : 'text-red-800'} font-viga`}>❤️ {event.isLiked ? 'Like' : 'Unlike'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
                                            <TouchableOpacity onPress={() => Linking.openURL(event.website)}>
                                                <Text className={`${isDark ? 'text-blue-100' : 'text-blue-800'} font-viga`}>🔗 Share</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-purple-800' : 'bg-purple-100'}`}>
                                            <Text className={`${isDark ? 'text-purple-100' : 'text-purple-800'} font-viga`}>📩 Invite</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <View className="max-w-lg mx-auto px-4 py-8">
                    {quotes.map((quote, index) => (
                        <Text
                            key={index}
                            className={`text-xl text-center mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}
                        >"{quote}"
                        </Text>
                    ))}
                </View>

                <View className="py-8 px-4 items-center">
                    <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>
                        Built with ❤️ by Iwin
                    </Text>
                    <View className="flex-row mt-2">
                        <TouchableOpacity>
                            <Text className={`text-sm mx-2 ${isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className={`text-sm mx-2 ${isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className={`text-sm mx-2 ${isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>Host on Iwin Life</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100
    },
});