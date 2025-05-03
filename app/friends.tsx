import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, TextInput } from 'react-native';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';

const FriendsSearchScreen = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [searchQuery, setSearchQuery] = React.useState('');

    const friends = [
        {
            id: '1',
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
            mutualFriends: 12,
            interests: ['Yoga', 'Hiking', 'Photography'],
            status: 'Active now'
        },
        {
            id: '2',
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
            mutualFriends: 5,
            interests: ['Tech', 'Startups', 'Basketball'],
            status: 'Active 2h ago'
        },
        {
            id: '3',
            name: 'Emma Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            mutualFriends: 8,
            interests: ['Art', 'Museums', 'Travel'],
            status: 'Active yesterday'
        },
        {
            id: '4',
            name: 'David Kim',
            avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
            mutualFriends: 3,
            interests: ['Music', 'Concerts', 'Guitar'],
            status: 'Active now'
        },
        {
            id: '5',
            name: 'Olivia Smith',
            avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
            mutualFriends: 15,
            interests: ['Painting', 'Wine', 'Cooking'],
            status: 'Active 30m ago'
        },
        {
            id: '6',
            name: 'James Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            mutualFriends: 7,
            interests: ['Nature', 'Gardening', 'Birdwatching'],
            status: 'Active now'
        },
        {
            id: '7',
            name: 'Sophia Garcia',
            avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
            mutualFriends: 9,
            interests: ['Trivia', 'Pub Quizzes', 'Craft Beer'],
            status: 'Active 1h ago'
        }
    ];

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.interests.some(interest =>
            interest.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    return (
        <View className={`flex-1 ${isDark ? 'bg-[#121212]' : 'bg-[#ffffff]'}`}>
            <View className={`flex-row justify-between items-center p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <Image
                    source={images.logo}
                    style={styles.mainImage}
                />
                <Text className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} font-viga`}>Find Friends</Text>
            </View>

            <View className={`w-full max-w-[1200px] mx-auto pt-5 pb-3 px-3`}>
                <View className={`flex-row items-center rounded-md ${isDark ? 'bg-[#2d2d2d]' : 'bg-white'}`}>
                    <TextInput
                        className={`flex-1 px-4 py-3  ${isDark ? 'text-white' : 'text-black'} font-viga`}
                        placeholder="Search friends or interests..."
                        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView className="flex-1 px-3">
                <View className='w-full max-w-[1200px] mx-auto'>
                    <Text className={`text-lg px-4 py-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-viga`}>
                        {filteredFriends.length} {filteredFriends.length === 1 ? 'friend' : 'friends'} found
                    </Text>

                    {filteredFriends.map((friend) => (
                        <View
                            key={friend.id}
                            className={`flex-row items-center p-4 mb-2 ${isDark ? 'bg-[#1f1f1f]' : 'bg-[#f9fafb]'} rounded-md`}
                        >
                            <Image
                                source={{ uri: friend.avatar }}
                                className="w-16 h-16 rounded-full mr-4"
                            />

                            <View className="flex-1">
                                <View className="flex-row justify-between items-center">
                                    <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} font-viga`}>
                                        {friend.name}
                                    </Text>
                                    {/* <Text className={`text-xs ${friend.status.includes('now') ? 'text-green-500' : isDark ? 'text-gray-400' : 'text-gray-500'} font-viga`}>
                                        {friend.status}
                                    </Text> */}
                                </View>

                                <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1 font-viga`}>
                                    {friend.mutualFriends} mutual friends
                                </Text>

                                <View className="flex-row flex-wrap mt-2">
                                    {friend.interests.map((interest, i) => (
                                        <View
                                            key={i}
                                            className={`px-2 py-1 rounded-full mr-2 mb-2 ${isDark ? 'bg-[#2d2d2d]' : 'bg-gray-200'}`}
                                        >
                                            <Text className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'} font-viga`}>
                                                {interest}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity
                                className={`ml-4 px-4 py-2 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
                            >
                                <Text className="text-white font-viga">Add</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FriendsSearchScreen;

const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100
    }
});