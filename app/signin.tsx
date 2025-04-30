import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';
import { login } from '@/services/userApi';

const loginData = {
    email: '',
    password: '',
}

const SignInScreen = () => {

    const { colorScheme } = useColorScheme();

    const [formData, setFormData] = useState(loginData);

    const handleInputChange = (name: any, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        if (!formData.email) {
            isValid = false;
        }
        if (!formData.password) {
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await login(formData);
                if (response.success) {
                    setFormData(loginData)
                    Alert.alert('Success', 'User login successfully');
                } else {
                    Alert.alert('Failed', 'User login failed successfully');
                }
            } catch (err: any) {
                Alert.alert(err.message);
            }
        } else {
            Alert.alert('Failed', 'Form Validation Failed.');
        }
    };

    return (
        <View className="flex-1 items-center justify-center px-4 bg-white dark:bg-[#1a1a1a]">
            <View className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md p-6">
                <Image
                    source={images.logo}
                    className="mx-auto mb-6"
                    style={styles.mainImage}
                />
                <Text className="text-center text-2xl font-semibold text-black dark:text-white mb-6 font-viga">
                    Welcome Back
                </Text>

                <TextInput
                    placeholder="Email address"
                    placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#999'}
                    keyboardType="email-address"
                    className="w-full px-4 py-3 mb-4 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 font-viga"
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#999'}
                    secureTextEntry
                    className="w-full px-4 py-3 mb-4 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 font-viga"
                    onChangeText={(text) => handleInputChange('password', text)}
                />

                <TouchableOpacity className="bg-red-500 py-3 rounded-full mt-2" onPress={handleSubmit} >
                    <Text className="text-white text-center font-semibold text-base font-viga">Sign In</Text>
                </TouchableOpacity>

                <View className="mt-6 space-y-2">
                    <Text className="text-center text-sm text-red-500 font-viga cursor-pointer">
                        <Link href="/signup">Forgot password?</Link>
                    </Text>
                    <Text className="text-center text-sm font-viga text-black dark:text-white">
                        New here? <Link href="/signup" className='text-red-500 cursor-pointer'> Create an account</Link>
                    </Text>
                </View>
            </View>
        </View>
    );

};

export default SignInScreen;

const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100
    }
});