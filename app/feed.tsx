import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';

const FeedScreen = () => {

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { width } = useWindowDimensions();
    const updateImage = width >= 768 ? '500px' : '300px';

    const events = [
        {
            week: '📅 Week 1',
            title: 'Sunrise Yoga',
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
            meta: 'Mon 7:30 AM · Prospect Park',
            badges: ['bookable'],
            description: 'Start the week refreshed with morning yoga in nature with live music.',
            friends: [
                'https://randomuser.me/api/portraits/women/30.jpg',
                'https://randomuser.me/api/portraits/men/21.jpg'
            ],
            count: '2 friends going • 30 total'
        },
        {
            week: '📅 Week 2',
            title: 'Tuesday Tech Meetup',
            image: 'https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80',
            meta: 'Tue 6:30 PM · Hudson Yards',
            badges: ['external'],
            description: 'Meet developers, designers, and startup founders for a night of ideas and innovation.',
            friends: [
                'https://randomuser.me/api/portraits/women/22.jpg',
                'https://randomuser.me/api/portraits/men/25.jpg'
            ],
            count: '2 friends going • 40 total'
        },
        {
            week: '📅 Week 3',
            title: 'Paint & Sip Night',
            image: 'https://images.unsplash.com/photo-1498550744921-75f79806b8a7?auto=format&fit=crop&w=800&q=80',
            meta: 'Mon 7:00 PM · Williamsburg Studio',
            badges: ['bookable'],
            description: 'Unleash your inner artist with a glass of wine and guidance from a local painter.',
            friends: [
                'https://randomuser.me/api/portraits/women/23.jpg'
            ],
            count: '1 friend going • 16 total'
        },
        {
            week: '📅 Week 4',
            title: 'Botanical Garden Walk',
            image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
            meta: 'Mon 10:00 AM · Bronx Botanical Garden',
            badges: ['bookable'],
            description: 'Explore exotic plants and flower paths in a guided morning nature walk.',
            friends: [
                'https://randomuser.me/api/portraits/men/22.jpg'
            ],
            count: '1 friend going • 17 total'
        },
        {
            week: '📅 Week 5',
            title: 'Trivia Tuesday',
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
            meta: 'Tue 7:00 PM · Midtown Pub',
            badges: ['external'],
            description: 'Team up and test your knowledge. Drinks, prizes, and hilarious competition.',
            friends: [
                'https://randomuser.me/api/portraits/women/36.jpg'
            ],
            count: '1 friend going • 25 total'
        }
    ];

    const Badge = ({ type }: any) => {
        const bgColor = type === 'bookable' ? 'bg-green-400' : 'bg-yellow-400';
        const textColor = type === 'bookable' ? 'text-white' : 'text-black';
        const label = type === 'bookable' ? 'Book on Iwin' : 'External Event';

        return (
            <View className={`${bgColor} ${textColor} px-3 py-1 rounded-full mr-2`}>
                <Text className="text-xs font-viga">{label}</Text>
            </View>
        );
    };

    return (
        <View className={`flex-1 ${isDark ? 'bg-[#121212]' : 'bg-[#ffffff]'}`}>
            <View className={`flex-row justify-between items-center p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <Image
                    source={images.logo}
                    style={styles.mainImage}
                />
                <Text className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} font-viga`}>Hi, Alex!</Text>
            </View>

            <ScrollView className="flex-1">
                <View className='w-full max-w-[1200px] mx-auto'>
                    <Text className={`text-2xl text-center my-6 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                        Your Month, Curated
                    </Text>

                    {events.map((event, index) => (
                        <View key={index} className="mb-8 px-4">
                            <Text className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                {event.week}
                            </Text>

                            <View className={`rounded-xl overflow-hidden mb-6 ${isDark ? 'bg-[#1f1f1f]' : 'bg-[#f9fafb]'}`}>
                                <Image
                                    source={{ uri: event.image }}
                                    className={`w-full h-[${updateImage}]`}
                                    resizeMode="cover"
                                />

                                <View className="p-4">
                                    <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                        {event.title}
                                    </Text>

                                    <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1 font-viga`}>
                                        {event.meta}
                                    </Text>

                                    <View className="flex-row mt-2">
                                        {event.badges.map((badge, i) => (
                                            <Badge key={i} type={badge} />
                                        ))}
                                    </View>

                                    <Text className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                        {event.description}
                                    </Text>

                                    <View className="flex-row items-center mt-3">
                                        <View className="flex-row -space-x-2 mr-2">
                                            {event.friends.map((friend, i) => (
                                                <Image
                                                    key={i}
                                                    source={{ uri: friend }}
                                                    className="w-8 h-8 rounded-full border-2 border-white"
                                                />
                                            ))}
                                        </View>
                                        <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                                            <Text className="font-semibold">{event.count.split('•')[0]}</Text> • <Text className="font-semibold">{event.count.split('•')[1]}</Text>
                                        </Text>
                                    </View>

                                    <View className="flex-row flex-wrap gap-2 mt-4">
                                        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-full">
                                            <Text className="text-white font-viga">✔ I'm Going</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="bg-red-400 px-4 py-2 rounded-full">
                                            <Text className="text-white font-viga">❤️ Like</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="bg-blue-400 px-4 py-2 rounded-full">
                                            <Text className="text-white font-viga">🔗 Share</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="bg-purple-400 px-4 py-2 rounded-full">
                                            <Text className="text-white font-viga">📩 Invite</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FeedScreen;

const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100
    }
});