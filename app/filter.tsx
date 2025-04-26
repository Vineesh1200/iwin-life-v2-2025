import EventsCard from '@/components/eventCard';
import { useFetchEvents } from '@/hooks/useFetchEvents';
import { useNavigation } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View, Text, ScrollView, FlatList, ActivityIndicator, Pressable, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Filter = () => {

    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const navigation = useNavigation();
    const isTablet = width >= 768

    const [pageCount, setPageCount] = useState<number>(1);
    const [limitCount] = useState<number>(10);
    const [allEvents, setAllEvents] = useState<any[]>([]);
    const { getEvents, events, loading, error } = useFetchEvents();
    const [stopPagination, setStopPagination] = useState(false);
    const [categories, setCategories] = useState([{ id: 1, name: 'Theatre & Broadway Shows' }, { id: 2, name: 'Live Concerts' }, { id: 3, name: 'Pop-up Dining Experiences' }, { id: 4, name: 'Fitness Bootcamps' }, { id: 5, name: 'Conferences & Summits' }]);
    const [selectedCategory, setSelectedCategory] = useState<string>();

    useEffect(() => {
        setSelectedCategory('Theatre & Broadway Shows')
    }, [])

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

    return (
        <Fragment>
            <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <View className={`flex-row items-center gap-3 ${isDarkMode ? 'bg-black' : 'bg-white'} px-3.5 py-3 w-full`}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color={`${isDarkMode ? '#FFF' : '#000'}`} />
                    </TouchableOpacity>
                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'} font-viga`}>Filter</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View className={`${isTablet ? 'flex-row' : 'flex-col'} gap-2 w-full h-full`}>
                    <View>
                        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} font-viga px-5 py-3`} style={styles.headerTitle}>Options</Text>
                        {categories.map((item, index) => (
                            <Pressable onPress={() => setSelectedCategory(item.name)} key={index}>
                                <View className={`flex-row flex-wrap justify-left gap-3 px-5 py-3 mt-2 rounded-md border-b-2 border-gray-300`}>
                                    <Icon name="arrow-right" size={24} color={`${(selectedCategory == item.name ? (isDarkMode ? '#FFF' : 'transperant') : (isDarkMode ? 'transperant' : '#FFF'))}`} />
                                    <Text className={`${(isDarkMode ? 'text-white' : 'text-gray-500')} font-viga`}>{item.name}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                    <View className={`${isDarkMode ? 'text-white' : 'text-black'} flex-1 font-viga mb-11`} style={styles.events}>
                        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} font-viga px-5 py-3`} style={styles.headerTitle}>{selectedCategory}</Text>
                        <FlatList
                            className="px-4"
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
                </View>
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20
    },
    filterOptions: {
        width: "100%",
    },
    events: {
        flex: 2
    }
});

export default Filter;