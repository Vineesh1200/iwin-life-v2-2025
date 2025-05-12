import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('Data stored');
    } catch (e) {
        console.error('Error storing data:', e);
    }
};

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Error retrieving data:', e);
    }
};

export {
    storeData, getData
}