// screens/DetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { news } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: news.title.length > 20 ? news.title.slice(0, 20) + '...' : news.title,
    });
  }, [navigation, news]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.description}\n\nДжерело: Наш додаток`,
        title: news.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: news.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.meta}>
          <Text style={styles.category}>{news.category}</Text>
          <Text style={styles.date}>{news.date}</Text>
        </View>
        
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.description}>{news.description}</Text>
        <Text style={styles.description}>
          {news.description.repeat(3)} {/* Розширений текст */}
        </Text>
        
        <View style={styles.stats}>
          <Text style={styles.views}>👁 Переглядів: {news.views}</Text>
          <Text style={styles.views}>💬 Коментарів: {Math.floor(news.views / 10)}</Text>
        </View>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Поділитися</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  category: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 15,
  },
  views: {
    fontSize: 14,
    color: '#666',
  },
  shareButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});