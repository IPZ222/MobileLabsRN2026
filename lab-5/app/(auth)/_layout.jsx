import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // ЯКЩО АВТОРИЗОВАНИЙ — автоматично перекидаємо в основну частину
  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}