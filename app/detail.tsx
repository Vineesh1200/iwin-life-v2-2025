import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';

const EventDetailsScreen = () => {

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { width } = useWindowDimensions();
    const updateImage = width >= 768 ? '500px' : '300px';

    const similarEvents = [
        {
            id: 1,
            title: 'Street Photography Walk',
            image: 'https://randomuser.me/api/portraits/men/5.jpg',
            meta: 'Wednesday · 5:00 PM · Chinatown'
        },
        {
            id: 2,
            title: 'Startup Coffee Chat',
            image: 'https://randomuser.me/api/portraits/women/9.jpg',
            meta: 'Tuesday · 8:00 AM · Flatiron Cafe'
        }
    ];

    const friendsGoing = [
        'https://randomuser.me/api/portraits/men/5.jpg',
        'https://randomuser.me/api/portraits/women/9.jpg',
        'https://randomuser.me/api/portraits/men/11.jpg'
    ];

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
                <View className='w-full max-w-[1200px] mx-auto'>

                    <View className="p-4">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' }}
                            className={`w-full h-[${updateImage}] rounded-xl`}
                            resizeMode="cover"
                        />
                    </View>

                    <Text className={`text-3xl font-bold text-center mt-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                        Sunrise Yoga
                    </Text>

                    <View className="flex-row justify-center mt-2">
                        <View className="bg-green-500 px-3 py-1 rounded-full">
                            <Text className="text-white text-sm font-bold font-viga cursor-pointer">Book on Iwin</Text>
                        </View>
                    </View>

                    <View className="items-center mt-4">
                        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                            🗓️ Monday, April 30 · 7:30 AM
                        </Text>
                        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                            📍 Prospect Park, Brooklyn, NY 11215
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
                                General Admission - $20
                            </Text>
                        </View>

                        <View className={`p-4 rounded-xl mb-3 cursor-pointer ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#ffffff]'} border ${isDark ? 'border-[#444444]' : 'border-[#dddddd]'}`}>
                            <Text className={`text-center ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                VIP Early Entry - $40
                            </Text>
                        </View>

                        <TouchableOpacity
                            className={`p-4 rounded-full ${isDark ? 'bg-red-600' : 'bg-red-500'} mt-4`}
                        >
                            <Text className="text-white text-center text-lg font-bold font-viga">Book Now</Text>
                        </TouchableOpacity>
                    </View>

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

                    <View className="mx-4 my-6">
                        <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                            📝 About this event
                        </Text>
                        <Text className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                            Start your week refreshed with morning yoga in Prospect Park, accompanied by soothing acoustic tunes. Bring your own mat, water, and positive vibes. Beginner friendly!
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
                                className={`px-4 py-2 rounded-full ${isDark ? 'bg-green-800' : 'bg-green-100'}`}
                            >
                                <Text className={`font-semibold ${isDark ? 'text-green-100' : 'text-green-800'} font-viga`}>✔ I'm Going</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${isDark ? 'bg-red-800' : 'bg-red-100'}`}
                            >
                                <Text className={`${isDark ? 'text-red-100' : 'text-red-800'} font-viga`}>❤️ Like</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
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

                    <View className="mx-4 my-6">
                        <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                            🔥 You Might Also Like
                        </Text>

                        {similarEvents.map(event => (
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

                </View>
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