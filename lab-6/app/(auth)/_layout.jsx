import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTintColor: '#333',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false, // Прибирає лінію під хедером
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Вхід' }} />
      <Stack.Screen name="register" options={{ title: 'Створити акаунт' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Відновлення' }} />
    </Stack>
  );
}