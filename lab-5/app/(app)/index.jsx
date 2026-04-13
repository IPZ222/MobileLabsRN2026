import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const DATA = [
  { id: '1', name: 'iPhone 15 Pro', price: '45000 грн', desc: 'Найпотужніший смартфон з титановим корпусом.', img: 'https://cdn.27.ua/original/3b/85/7551877_7.jpeg' },
  { id: '2', name: 'MacBook Air M2', price: '52000 грн', desc: 'Легкий, швидкий та неймовірно тонкий ноутбук.', img: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111867_SP869-2022-macbook-air-m2-colors.png' },
  { id: '3', name: 'AirPods Pro 2', price: '10500 грн', desc: 'Найкраще шумозаглушення у своєму класі.', img: 'https://estore.ua/media/catalog/product/cache/8/image/650x650/9df78eab33525d08d6e5fb8d27136e95/a/p/apple-airpods-pro-2-mqd83_1__1.jpeg' },
  { id: '4', name: 'Apple Watch S9', price: '18000 грн', desc: 'Інтелектуальний помічник на твоєму зап’ясті.', img: 'https://applefun.com.ua/source/apple-watch-series-9-4.jpg?1695204368652' },
];

export default function Catalog() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Каталог</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Вийти</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.desc}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  logoutBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  logoutText: {
    color: '#ff4757',
    fontWeight: 'bold',
    fontSize: 11,
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: '100%', 
    height: 250,    
    backgroundColor: '#f0f0f0',
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
    lineHeight: 18,
  },
  price: {
    fontSize: 18,
    color: '#4a90e2',
    fontWeight: 'bold',
    marginTop: 5,
  },
});