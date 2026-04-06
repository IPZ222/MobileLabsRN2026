import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';

const newsData = [
  {
    id: '1',
    title: 'Новий кампус університету',
    description: 'Відкрито новий сучасний кампус з коворкінгом та бібліотекою.',
    date: '15 березня 2026',
    imageUrl: 'https://picsum.photos/id/104/400/200',
    category: 'Освіта'
  },
  {
    id: '2',
    title: 'Стипендіальна програма 2026',
    description: 'Стартував прийом заявок на академічну стипендію для відмінників.',
    date: '10 березня 2026',
    imageUrl: 'https://picsum.photos/id/20/400/200',
    category: 'Стипендії'
  },
  {
    id: '3',
    title: 'Хакатон зі штучного інтелекту',
    description: 'Запрошуємо студентів взяти участь у щорічному хакатоні. Призи та стажування!',
    date: '5 березня 2026',
    imageUrl: 'https://picsum.photos/id/26/400/200',
    category: 'Події'
  },
  {
    id: '4',
    title: 'Міжнародна конференція',
    description: 'Студенти можуть подати свої роботи на міжнародну конференцію.',
    date: '1 березня 2026',
    imageUrl: 'https://picsum.photos/id/42/400/200',
    category: 'Наука'
  },
  {
    id: '5',
    title: 'Спортивні змагання',
    description: 'Відкрита реєстрація на чемпіонат університету з футболу та волейболу.',
    date: '25 лютого 2026',
    imageUrl: 'https://picsum.photos/id/96/400/200',
    category: 'Спорт'
  }
];

const HomeScreen = () => {
  const handleNewsPress = (news) => {
    Alert.alert(
      news.title,
      `${news.description}\n\nДата: ${news.date}\nКатегорія: ${news.category}`,
      [{ text: 'Закрити', style: 'cancel' }]
    );
  };

  const NewsCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item)} activeOpacity={0.7}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.cardImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.cardContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Hello */}
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeTitle}>Новини та події</Text>
        <Text style={styles.welcomeSubtitle}>Будь в курсі останніх новин університету</Text>
      </View>

      {/* Novostee */}
      {newsData.map(item => (
        <NewsCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeHeader: {
    backgroundColor: '#4a90e2',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    padding: 15,
  },
  categoryBadge: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  }
});

export default HomeScreen;