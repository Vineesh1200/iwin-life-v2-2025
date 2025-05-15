import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';
import { useLocalSearchParams } from 'expo-router';
import { useFetchSingleEvent } from '@/hooks/useFetchEvents';
import { alternateLike, joiningPeople } from '@/services/homeApi';
import { EventItem } from '@/interfaces/interfaces';

const EventDetailsScreen = () => {

    const { id } = useLocalSearchParams();
    console.log(typeof id)
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { width } = useWindowDimensions();
    const updateImage = width >= 768 ? 500 : 250;
    const { getSingleEvent, singleEvent, loading, error } = useFetchSingleEvent();
    const [event, setEvent] = useState<EventItem>();

    const friendsGoing = [
        'https://randomuser.me/api/portraits/men/5.jpg',
        'https://randomuser.me/api/portraits/women/9.jpg',
        'https://randomuser.me/api/portraits/men/11.jpg'
    ];

    const getmeta = (date: string, time: string) => {
        if (!date || !time) return '';

        const dateObj = new Date(date);

        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });

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

        return `${formattedDate} · ${formattedTime}`;
    };

    const updateLike = (_id: string) => {
        alternateLike(_id).then();
        setEvent((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                isLiked: !prev.isLiked
            };
        });
    };

    const updateIsGoing = (_id: string) => {
        joiningPeople(_id).then();
        setEvent((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                isGoing: !prev.isGoing
            };
        });
    };

    useEffect(() => {
        if (id) {
            getSingleEvent(id);
        }
    }, [id]);

    useEffect(() => {
        if (singleEvent) {
            setEvent(singleEvent);
        }
    }, [singleEvent]);

    return (
        <View className={`flex-1 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#ffffff]'}`}>
            <View className={`flex-row justify-between items-center p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <Image
                    source={images.logo}
                    style={styles.mainImage}
                />
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                    className="w-10 h-10 rounded-full"
                />
            </View>

            <ScrollView className="flex-1">
                {event && (
                    <View className='w-full max-w-[1200px] mx-auto'>

                        <View className="p-4">
                            {event.imageURL && (
                                <Image
                                    source={{ uri: event.imageURL }}
                                    className={`rounded-lg mb-4`}
                                    style={{ height: updateImage, width: '100%' }}
                                />
                            )}
                        </View>

                        <Text className={`text-3xl font-bold text-center mt-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                            {event.name}
                        </Text>

                        <View className="flex-row justify-center mt-2">
                            <View className="bg-green-500 px-3 py-1 rounded-full">
                                <Text className="text-white text-sm font-bold font-viga cursor-pointer">{event.isBookable ? 'Book on Iwin' : 'Free on Iwin'}</Text>
                            </View>
                        </View>

                        <View className="items-center mt-4">
                            <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                🗓️ {getmeta(event.date, event.time)}
                            </Text>
                            <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                📍 {event.location}
                            </Text>
                        </View>

                        <View className="h-72 mx-4 my-6 rounded-xl overflow-hidden">
                            <iframe src="https://maps.google.com/maps?q=Prospect%20Park%20Brooklyn%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed" className='h-full'></iframe>
                        </View>

                        <View className="mx-4 my-6">
                            <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                🎟️ Tickets
                            </Text>

                            <View className={`p-4 rounded-xl mb-3 cursor-pointer ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#ffffff]'} border ${isDark ? 'border-[#444444]' : 'border-[#dddddd]'}`}>
                                <Text className={`text-center ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                    General Admission - {event.isBookable ? '$20' : 'Free'}
                                </Text>
                            </View>

                            <View className={`p-4 rounded-xl mb-3 cursor-pointer ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#ffffff]'} border ${isDark ? 'border-[#444444]' : 'border-[#dddddd]'}`}>
                                <Text className={`text-center ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                    VIP Early Entry - {event.isBookable ? '$40' : 'Free'}
                                </Text>
                            </View>

                            {event.isBookable && (
                                <TouchableOpacity
                                    className={`p-4 rounded-full ${isDark ? 'bg-red-600' : 'bg-red-500'} mt-4`}
                                >
                                    <Text className="text-white text-center text-lg font-bold font-viga">Book Now</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {event.attendingUserDetails.map((friend, index) => (
                            <View className="flex-row justify-center items-center my-6">
                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                                    className="w-16 h-16 rounded-full"
                                />
                                <View className="ml-4">
                                    <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                        Jessica M.
                                    </Text>
                                    <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                        Certified Yoga Instructor
                                    </Text>
                                </View>
                            </View>
                        ))}

                        <View className="mx-4 my-6">
                            <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                📝 About this event
                            </Text>
                            <Text className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                {event.details}
                            </Text>
                        </View>

                        <View className="mx-4 my-6">
                            <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                🔄 Cancellation Policy
                            </Text>
                            <Text className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                Free cancellation up to 24 hours before the event.
                            </Text>
                        </View>

                        <View className="mx-4 my-6">
                            <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                👯 Friends Going
                            </Text>

                            <View className="flex-row justify-center -space-x-3">
                                {friendsGoing.map((friend, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: friend }}
                                        className="w-12 h-12 rounded-full border-2 border-white"
                                    />
                                ))}
                            </View>

                            <View className="flex-row flex-wrap justify-center gap-2 mt-6">
                                <TouchableOpacity
                                    className={`px-4 py-2 rounded-full ${isDark ? 'bg-green-800' : 'bg-green-100'}`} onPress={() => updateIsGoing(event._id)}
                                >
                                    <Text className={`font-semibold ${isDark ? 'text-green-100' : 'text-green-800'} font-viga`}>{event.isGoing ? "✔ I'm Going" : "✖ Can't Make It"}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className={`px-4 py-2 rounded-full ${isDark ? 'bg-red-800' : 'bg-red-100'}`} onPress={() => updateLike(event._id)}
                                >
                                    <Text className={`${isDark ? 'text-red-100' : 'text-red-800'} font-viga`}>❤️ {event.isLiked ? 'Like' : 'Unlike'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Linking.openURL(event.website)}
                                    className={`px-4 py-2 rounded-full ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}
                                >
                                    <Text className={`${isDark ? 'text-blue-100' : 'text-blue-800'} font-viga`}>🔗 Share</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className={`px-4 py-2 rounded-full ${isDark ? 'bg-purple-800' : 'bg-purple-100'}`}
                                >
                                    <Text className={`${isDark ? 'text-purple-100' : 'text-purple-800'} font-viga`}>📩 Invite</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {event.likedUserDetails?.length > 0 && (
                            <View className="mx-4 my-6">
                                <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                    🔥 You Might Also Like
                                </Text>

                                {event.likedUserDetails.map((event: any) => (
                                    <View
                                        key={event.id}
                                        className={`flex-row items-center cursor-pointer p-4 rounded-xl mb-3 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#ffffff]'} border ${isDark ? 'border-[#444444]' : 'border-[#dddddd]'}`}
                                    >
                                        <Image
                                            source={{ uri: event.image }}
                                            className="w-16 h-16 rounded-lg"
                                            resizeMode="cover"
                                        />
                                        <View className="ml-4">
                                            <Text className={`font-bold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                                {event.title}
                                            </Text>
                                            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                                {event.meta}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100
    }
});