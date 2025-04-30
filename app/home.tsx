import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';

const HomeScreen = () => {

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { width } = useWindowDimensions();
    const updateImage = width >= 768 ? '500px' : '300px';

    const events = [
        {
            id: 1,
            title: 'Outdoor Dance Party',
            image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
            meta: 'Friday · 7PM · Central Park',
            description: 'Join the rhythm under the stars with live DJs, an open dance floor, and spontaneous joy. Open to all skill levels!',
            attendees: [
                'https://randomuser.me/api/portraits/women/44.jpg',
                'https://randomuser.me/api/portraits/men/46.jpg',
                'https://randomuser.me/api/portraits/women/32.jpg'
            ],
            count: '+ 48 people going'
        },
        {
            id: 2,
            title: 'Spring Craft Fair',
            image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
            meta: 'Saturday · 2PM · Union Square',
            description: 'Browse handmade goods, meet local artists, and enjoy delicious street food. A perfect weekend family vibe.',
            attendees: [
                'https://randomuser.me/api/portraits/women/29.jpg',
                'https://randomuser.me/api/portraits/men/35.jpg'
            ],
            count: '+ 22 people going'
        },
        {
            id: 3,
            title: 'Hidden Food Tour',
            image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
            meta: 'Sunday · 5PM · Lower East Side',
            description: 'Taste your way through hidden culinary gems on this guided food tour. Includes 5+ tastings and drink pairings.',
            attendees: [
                'https://randomuser.me/api/portraits/men/23.jpg',
                'https://randomuser.me/api/portraits/women/54.jpg',
                'https://randomuser.me/api/portraits/men/16.jpg'
            ],
            count: '+ 34 people going'
        }
    ];

    const quotes = [
        "Went solo. Left with new friends.",
        "This is how I make NYC feel like mine.",
        "I found my weekend crew."
    ];

    return (
        <ScrollView className={`flex-1 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#ffffff]'}`}>
            <View className='w-full max-w-[1200px] mx-auto'>
                <Image
                    source={images.logo}
                    className="mx-auto mt-6"
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

                    {events.map((event) => (
                        <View
                            key={event.id}
                            className={`rounded-xl p-6 mb-8 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#ffffff]'} border ${isDark ? 'border-[#444444]' : 'border-[#dddddd]'} shadow-lg`}
                        >
                            {event.image && (
                                <Image
                                    source={{ uri: event.image }}
                                    className={`w-full h-[${updateImage}] rounded-lg mb-4`}
                                    resizeMode="cover"
                                />
                            )}
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                    {event.title}
                                </Text>
                                <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} font-viga`}>
                                    {event.meta}
                                </Text>
                            </View>
                            <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                {event.description}
                            </Text>
                            <View className="flex-row items-center mb-4">
                                <View className="flex-row -space-x-3">
                                    {event.attendees.map((attendee, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: attendee }}
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                        />
                                    ))}
                                </View>
                                <Text className={`text-sm ml-2 ${isDark ? 'text-gray-300' : 'text-gray-500'} font-viga`}>
                                    {event.count}
                                </Text>
                            </View>
                            <View className="flex-row flex-wrap gap-2">
                                <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-green-800' : 'bg-green-100'}`}>
                                    <Text className={`font-semibold ${isDark ? 'text-green-100' : 'text-green-800'} font-viga`}>✔ I'm Going</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-red-800' : 'bg-red-100'}`}>
                                    <Text className={`${isDark ? 'text-red-100' : 'text-red-800'} font-viga`}>❤️ Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
                                    <Text className={`${isDark ? 'text-blue-100' : 'text-blue-800'} font-viga`}>🔗 Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-purple-800' : 'bg-purple-100'}`}>
                                    <Text className={`${isDark ? 'text-purple-100' : 'text-purple-800'} font-viga`}>📩 Invite</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
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
    }
});