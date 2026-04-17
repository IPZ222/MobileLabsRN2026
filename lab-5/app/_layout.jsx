import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={styles.topAppHeader}>
          <Text style={styles.appTitleText}>AbobShop</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#333',
              headerTitleStyle: { fontWeight: 'bold' },
              
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ільїн Ілля ІПЗ 22-2</Text>
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topAppHeader: {
    backgroundColor: '#4a90e2',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
    textAlign: 'center',
  }
});