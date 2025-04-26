
import { Image, StyleSheet, Text, Pressable, useWindowDimensions, View, useColorScheme } from 'react-native';
import React, { useState, Fragment } from 'react';
import { images } from '@/constants/images';
import EventModal from '@/components/eventModal';

interface EventsCardProps {
    event: any;
}

const EventsCard: React.FC<EventsCardProps> = ({ event }) => {

    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const dynamicStyles = {
        mainImage: {
            width: width > 768 ? 130 : 110,
            height: width > 768 ? 100 : 80,
        },
        titleText: {
            fontSize: width > 768 ? 25 : 21,
        },
        dateText: {
            fontSize: width > 768 ? 20 : 18,
        },
        descriptionText: {
            fontSize: width > 768 ? 18 : 16,
        },
    }

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);


    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };


    const openModal = (event: any) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setModalVisible(false);
    };

    return (
        <Fragment>
            <Pressable className="mb-4 border-2 border-white rounded-lg p-2.5 cursor-pointer shadow-cardBoxShadow" onPress={() => openModal(event)}>
                <View className="flex-row items-center gap-3">

                    <Image
                        source={event.imageURL ? { uri: event.imageURL } : images.notFound}
                        style={dynamicStyles.mainImage}
                        defaultSource={images.notFound}
                        className="rounded-md"
                    />

                    <View className="flex-1">
                        <Text className={`font-viga ${isDarkMode ? 'text-white' : 'text-black'}`} style={dynamicStyles.titleText} numberOfLines={1} ellipsizeMode="tail">
                            {event.name}
                        </Text>
                        <View className='flex-row items-center'>
                            <Image defaultSource={images.calendarIcon} style={styles.calendarIcon}></Image>
                            <Text className="text-grayCustom font-viga" style={dynamicStyles.dateText} numberOfLines={1} ellipsizeMode="tail">
                                {(event.startTime || event.date) && formatDate(event.startTime ?? event.date)} - {(event.endTime || event.date) && formatDate(event.endTime ?? event.date)}
                            </Text>
                        </View>
                        <Text className="text-grayLightCustom font-viga" style={dynamicStyles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
                            {event.details}
                        </Text>
                    </View>

                </View>
            </Pressable>

            <EventModal isVisible={isModalVisible} onClose={closeModal} event={selectedEvent} />
        </Fragment>
    );
};

export default EventsCard;

const styles = StyleSheet.create({
    calendarIcon: {
        width: 20,
        height: 20
    }
});