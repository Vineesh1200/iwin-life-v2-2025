import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { getData } from '@/services/localStorage';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    getData('token').then((token: string) => {
      if (token) {
        router.push('/home');
      } else {
        router.push('/signin');
      }
    })
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
