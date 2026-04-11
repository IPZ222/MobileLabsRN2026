import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { GameContext } from '../context/GameContext';

export default function SettingsScreen() {
  const { settings, toggleSetting, resetGame, score } = useContext(GameContext);

  const handleReset = () => {
    Alert.alert("Скидання", "Точно хочеш видалити всі очки та прогрес?", [
      { text: "Ні", style: "cancel" },
      { text: "Так", style: "destructive", onPress: resetGame }
    ]);
  };

  const bgColor = settings.darkTheme ? '#2f3640' : '#fff';
  const textColor = settings.darkTheme ? '#f5f6fa' : '#333';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.sectionTitle}>Геймплей</Text>
      
      <View style={styles.row}>
        <Text style={[styles.rowText, { color: textColor }]}>Вібрація при діях</Text>
        <Switch value={settings.vibration} onValueChange={() => toggleSetting('vibration')} trackColor={{ true: '#4a90e2' }} />
      </View>

      <Text style={styles.sectionTitle}>{"\n\n\n"}Інтерфейс</Text>

      <View style={styles.row}>
        <Text style={[styles.rowText, { color: textColor }]}>Темний режим</Text>
        <Switch value={settings.darkTheme} onValueChange={() => toggleSetting('darkTheme')} trackColor={{ true: '#4a90e2' }} />
      </View>

      <TouchableOpacity style={[styles.resetBtn, {backgroundColor: bgColor}]} onPress={handleReset}>
        <Text style={styles.resetBtnText}>Очистити дані гри (Очок: {score})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#4a90e2', textTransform: 'uppercase', marginBottom: 15 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
  rowText: { fontSize: 16, color: '#333' },
  resetBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff6b6b',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  resetBtnText: { color: '#ff6b6b', fontWeight: 'bold' },
  footerInfo: { marginTop: 'auto', alignItems: 'center', paddingBottom: 40 },
  version: { color: '#ccc', fontSize: 12 },
  dev: { color: '#999', fontSize: 12, marginTop: 5 }
});