import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Мій Профіль',
          headerRight: () => null,
        }} 
      />
    </Stack>
  );
}