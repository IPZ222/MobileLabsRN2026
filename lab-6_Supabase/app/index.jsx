import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8FF' }}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (user) return <Redirect href="/(app)" />;
  return <Redirect href="/(auth)/login" />;
}
