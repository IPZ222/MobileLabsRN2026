import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import ContactsScreen from './screens/ContactsScreen';
import DrawerContent from './components/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ title: 'Деталі' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#4a90e2" />
      
      <View style={styles.topAppHeader}>
        <Text style={styles.appTitleText}>AbobApp</Text>
      </View>

      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true, 
          headerStyle: { 
            backgroundColor: '#4a90e2',
            elevation: 0, 
            shadowOpacity: 0 
          },
          headerTintColor: '#fff',
          drawerStyle: { width: 280 },
          drawerActiveTintColor: '#4a90e2',
          drawerInactiveTintColor: '#333',
        }}
      >
        <Drawer.Screen 
          name="News" 
          component={NewsStackNavigator} 
          options={{ title: '📰 Новини' }}
        />
        <Drawer.Screen 
          name="Contacts" 
          component={ContactsScreen} 
          options={{ title: '📞 Контакти' }}
        />
      </Drawer.Navigator>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ільїн Ілля ІПЗ 22-2</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topAppHeader: {
    backgroundColor: '#4a90e2',
    paddingTop: 50, 
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  }
});