import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GameContext } from '../context/GameContext';

export default function TasksScreen() {
  const { score, stats, settings } = useContext(GameContext);
  const bgColor = settings.darkTheme ? '#2f3640' : '#fff';
  const textColor = settings.darkTheme ? '#f5f6fa' : '#333';
  const tasks = [
    { id: '1', title: 'Майстер кліку', desc: 'Зробити 10 звичайних кліків', goal: 10, current: stats.clicks, icon: '👆' },
    { id: '2', title: 'Дуплет', desc: 'Зробити подвійний клік 5 разів', goal: 5, current: stats.doubleClicks, icon: '✌️' },
    { id: '3', title: 'Витривалість', desc: 'Утримувати об\'єкт 3 рази', goal: 3, current: stats.longPresses, icon: '⏳' },
    { id: '4', title: 'Розтяжка', desc: 'Змінити розмір через Pinch 5 разів', goal: 5, current: stats.pinches, icon: '🤏' },
    { id: '5', title: 'Свайпер', desc: 'Зробити свайп 3 рази', goal: 3, current: stats.swipes, icon: '↔️' },
    { id: '6', title: 'Мільйонер', desc: 'Набрати загалом 1000 очок', goal: 1000, current: score, icon: '💰' },
  ];

  const renderItem = ({ item }) => {
    const isDone = item.current >= item.goal;
    const progress = Math.min(item.current / item.goal, 1);

    return (
      <View style={[styles.card, {backgroundColor: bgColor}, isDone && styles.cardDone]}>
        <View style={styles.cardHeader}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={[styles.taskTitle, {color: textColor}]}>{item.title}</Text>
            <Text style={[styles.taskDesc, {color: textColor}]}>{item.desc}</Text>
          </View>
          <Text style={styles.statusText}>{isDone ? '✅' : `${item.current}/${item.goal}`}</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }, isDone && styles.progressFillDone]} />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: settings.darkTheme ? '#2f3640' : '#f8f9fa' }]}>
      <Text style={[styles.header, { color: settings.darkTheme ? '#f5f6fa' : '#333' }]}>Твій прогрес 🏆</Text>
      <FlatList data={tasks} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { fontSize: 24, fontWeight: '900', color: '#333', padding: 20, paddingTop: 10 },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardDone: { borderColor: '#4CAF50', borderLeftWidth: 5 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { fontSize: 24, marginRight: 15 },
  textContainer: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  taskDesc: { fontSize: 12, color: '#7f8c8d' },
  statusText: { fontWeight: 'bold', color: '#4a90e2' },
  progressBg: { height: 6, backgroundColor: '#eee', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#4a90e2' },
  progressFillDone: { backgroundColor: '#4CAF50' }
});