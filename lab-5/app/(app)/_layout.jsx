import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  // Якщо користувач не залогінився, відправляємо його на логін
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Якщо залогінився — показуємо внутрішні сторінки (Каталог тощо)
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}