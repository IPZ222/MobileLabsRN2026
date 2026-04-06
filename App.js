import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>AbobApp</Text>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#4a90e2', height: 3 },
            tabBarActiveTintColor: '#4a90e2',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { backgroundColor: '#fff', elevation: 4, shadowOpacity: 0.1 }
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Головна' }}
          />
          <Tab.Screen 
            name="Gallery" 
            component={GalleryScreen} 
            options={{ title: 'Галерея' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Профіль' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ільїн Ілля ІПЗ 22-2</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    paddingTop: 50,
    padding:20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingVertical: 15,
    backgroundColor: '#4a90e2',
    color: '#fff',
    elevation: 4,
    shadowOpacity: 0.1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
    marginHorizontal: 15,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  }
});