import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { images } from '@/constants/images';
import { useState } from 'react';
import { createAccount } from '@/services/userApi';

const createAccountData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpScreen = () => {

    const { colorScheme } = useColorScheme();

    const [formData, setFormData] = useState(createAccountData);

    const handleInputChange = (name: any, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        if (!formData.name) {
            isValid = false;
        }
        if (!formData.password) {
            isValid = false;
        }
        if (!formData.password) {
            isValid = false;
        }
        if (!formData.confirmPassword) {
            isValid = false;
        }
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await createAccount(formData);
                if (response.success) {
                    setFormData(createAccountData)
                    Alert.alert('Success', 'Account created successfully');
                } else {
                    Alert.alert('Failed', 'Account creation failed successfully');
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
                <Text className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6 font-viga">
                    Create Your Account
                </Text>

                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    className="w-full px-4 py-3 mb-4 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 font-viga"
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    placeholder="Email address"
                    placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    keyboardType="email-address"
                    className="w-full px-4 py-3 mb-4 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 font-viga"
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    secureTextEntry
                    className="w-full px-4 py-3 mb-4 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 font-viga"
                    onChangeText={(text) => handleInputChange('password', text)}
                />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    secureTextEntry
                    className="w-full px-4 py-3 mb-4 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 font-viga"
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                />

                <TouchableOpacity className="w-full bg-red-500 rounded-full p-3" onPress={handleSubmit}>
                    <Text className="text-center text-white font-semibold text-lg font-viga">
                        Create Account
                    </Text>
                </TouchableOpacity>

                <View className="mt-6">
                    <Text className="text-center text-gray-700 dark:text-gray-300 font-viga">
                        Already have an account?{' '}
                        <Text className="text-red-500 cursor-pointer"><Link href="/signin"> Sign in</Link></Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100
    }
});