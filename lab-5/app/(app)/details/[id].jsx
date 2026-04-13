import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DATA = [
  { id: '1', name: 'iPhone 15 Pro', price: '45000 грн', desc: 'Найпотужніший смартфон з титановим корпусом.', img: 'https://cdn.27.ua/original/3b/85/7551877_7.jpeg' },
  { id: '2', name: 'MacBook Air M2', price: '52000 грн', desc: 'Легкий, швидкий та неймовірно тонкий ноутбук.', img: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111867_SP869-2022-macbook-air-m2-colors.png' },
  { id: '3', name: 'AirPods Pro 2', price: '10500 грн', desc: 'Найкраще шумозаглушення у своєму класі.', img: 'https://estore.ua/media/catalog/product/cache/8/image/650x650/9df78eab33525d08d6e5fb8d27136e95/a/p/apple-airpods-pro-2-mqd83_1__1.jpeg' },
  { id: '4', name: 'Apple Watch S9', price: '18000 грн', desc: 'Інтелектуальний помічник на твоєму зап’ясті.', img: 'https://applefun.com.ua/source/apple-watch-series-9-4.jpg?1695204368652' },
];

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = DATA.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      
      <Image source={{ uri: product.img }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.descTitle}>Опис продукту:</Text>
        <Text style={styles.description}>{product.desc}</Text>

        <TouchableOpacity style={styles.buyButton} onPress={() => alert('Додано в кошик!')}>
          <Text style={styles.buyButtonText}>Купити зараз</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Повернутися до списку</Text>
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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#eee',
  },
  content: {
    padding: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: '#777',
    lineHeight: 22,
  },
  buyButton: {
    backgroundColor: '#4a90e2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#888',
    fontSize: 14,
  },
});