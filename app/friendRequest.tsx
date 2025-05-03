import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';

const FeedScreen = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { width } = useWindowDimensions();

    const friendRequests = [
        {
            id: '1',
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
            mutualFriends: 4,
            bio: 'Loves hiking and photography. We both follow NYC Adventures group.',
            time: '2h ago'
        },
        {
            id: '2',
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
            mutualFriends: 8,
            bio: 'Tech entrepreneur. Went to the same university as you.',
            time: '5h ago'
        },
        {
            id: '3',
            name: 'Emma Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            mutualFriends: 2,
            bio: 'Artist and musician. You both attended the Jazz Festival last month.',
            time: '1d ago'
        },
        {
            id: '4',
            name: 'David Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
            mutualFriends: 5,
            bio: 'Food blogger. You both like Italian cuisine.',
            time: '2d ago'
        },
        {
            id: '5',
            name: 'Olivia Parker',
            avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
            mutualFriends: 3,
            bio: 'Yoga instructor. You have 10 mutual connections.',
            time: '3d ago'
        }
    ];

    return (
        <View className={`flex-1 ${isDark ? 'bg-[#121212]' : 'bg-[#ffffff]'}`}>
            <View className={`flex-row justify-between items-center p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <Image
                    source={images.logo}
                    style={styles.mainImage}
                />
                <Text className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} font-viga`}>Friend Requests</Text>
            </View>

            <ScrollView className="flex-1">
                <View className='w-full max-w-[1200px] mx-auto px-4'>
                    <Text className={`text-xl my-4 ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                        {friendRequests.length} New Requests
                    </Text>

                    {friendRequests.map((request) => (
                        <View
                            key={request.id}
                            className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-[#1f1f1f]' : 'bg-[#f9fafb]'}`}
                        >
                            <View className="flex-row items-start">
                                <Image
                                    source={{ uri: request.avatar }}
                                    className="w-16 h-16 rounded-full mr-4"
                                />
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-start">
                                        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                            {request.name}
                                        </Text>
                                        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>
                                            {request.time}
                                        </Text>
                                    </View>

                                    <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1 font-viga`}>
                                        {request.mutualFriends} mutual friends
                                    </Text>

                                    <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2 font-viga`}>
                                        {request.bio}
                                    </Text>

                                    <View className="flex-row mt-4 space-x-2">
                                        <TouchableOpacity
                                            className={`flex-1 py-2 rounded-lg ${isDark ? 'bg-green-600' : 'bg-green-500'}`}
                                        >
                                            <Text className="text-white text-center font-viga">Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className={`flex-1 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
                                        >
                                            <Text className={`text-center ${isDark ? 'text-white' : 'text-gray-800'} font-viga`}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}

                    <View className={`py-4 ${isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                        <Text className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>
                            View all 12 friend requests
                        </Text>
                    </View>
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