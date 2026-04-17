import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Чекаємо, поки Firebase перевірить стан

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Якщо не залогінений і НЕ в папці auth — на логін
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Якщо залогінився і ВСЕ ЩЕ в папці auth — в профіль
      router.replace('/(app)');
    }
  }, [user, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}