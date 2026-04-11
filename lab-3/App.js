import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { GameProvider, GameContext } from './context/GameContext'; 
import GameScreen from './screens/GameScreen';
import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function MainApp() {
  const { settings } = useContext(GameContext);
  const isDark = settings.darkTheme;
  const headerBgColor = isDark ? '#1e272e' : '#4a90e2';
  const mainBgColor = isDark ? '#2f3640' : '#fff';
  const textColor = isDark ? '#f5f6fa' : '#333';

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={headerBgColor} />
      <View style={[styles.topAppHeader, { backgroundColor: headerBgColor }]}>
        <Text style={styles.appTitleText}>AbobClicker</Text>
      </View>

      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: headerBgColor, elevation: 0, shadowOpacity: 0 },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#4a90e2',
          drawerStyle: { backgroundColor: mainBgColor },
          drawerLabelStyle: { color: textColor },
        }}
      >
        <Drawer.Screen name="Game" component={GameScreen} options={{ title: '🎮 Гра' }} />
        <Drawer.Screen name="Tasks" component={TasksScreen} options={{ title: '📜 Завдання' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: '⚙️ Налаштування' }} />
      </Drawer.Navigator>
      <View style={[styles.footer, { backgroundColor: mainBgColor, borderTopColor: isDark ? '#444' : '#ddd' }]}>
        <Text style={[styles.footerText, {color: textColor}]}>Ільїн Ілля ІПЗ 22-2</Text>
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  topAppHeader: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  appTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left'
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    elevation: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  }
});