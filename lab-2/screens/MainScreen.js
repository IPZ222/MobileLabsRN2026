// screens/MainScreen.js
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import NewsCard from '../components/NewsCard';
import { generateNews } from '../data/newsData';

const PAGE_SIZE = 10;

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(() => generateNews(1, PAGE_SIZE));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const flatListRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNews(1, PAGE_SIZE));
      setPage(1);
      setHasMore(true);
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newNews = generateNews(nextPage, PAGE_SIZE);
      
      if (newNews.length === 0) {
        setHasMore(false);
      } else {
        setNews(prev => [...prev, ...newNews]);
        setPage(nextPage);
      }
      setLoadingMore(false);
    }, 1000);
  }, [loadingMore, hasMore, page]);

  const ListFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.footerText}>Завантаження...</Text>
      </View>
    );
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleNewsPress = (item) => {
    navigation.navigate('Details', { news: item });
  };

  return (
    <FlatList
      ref={flatListRef}
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NewsCard item={item} onPress={() => handleNewsPress(item)} />
      )}
      ListFooterComponent={ListFooter}
      ItemSeparatorComponent={ItemSeparator}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 10,
    color: '#666',
  },
});