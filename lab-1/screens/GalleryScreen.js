import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

const images = [
  {
    id: '1',
    url: 'https://static.dw.com/image/55613955_804.jpg',
    title: 'Гірський пейзаж',
    author: 'Невідомий'
  },
  {
    id: '2',
    url: 'https://konkurent.ua/media/cache/0c/56/0c56279e1ced884d92ab1001a2fd943e.webp',
    title: 'Собака',
    author: 'Газета Конкурент'
  },
  {
    id: '3',
    url: 'https://picsum.photos/id/106/400/300',
    title: 'Квіти',
    author: 'Олена Коваленко'
  },
  {
    id: '4',
    url: 'https://i.redd.it/a2tx9ww9woeg1.jpeg',
    title: 'Робочий стіл',
    author: 'Невідомий'
  },
  {
    id: '5',
    url: 'https://zhzh.com.ua/storage/22147/conversions/photo_2023-03-15_14-51-53-big.jpg',
    title: 'Місто',
    author: 'Журнал Житомира'
  },
  {
    id: '6',
    url: 'https://birdinflight.com/wp-content/uploads/2017/09/Bez-nazvaniya-4-1.png',
    title: 'Музика',
    author: 'Невідомий'
  },
  {
    id: '7',
    url: 'https://www.8bitdo.com/images/2024/ultimate-2c-wireless/switch1-l.jpg',
    title: '8BitDo Ultimate 2C',
    author: '8BitDo'
  },
  {
    id: '8',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0lBvrgtwgZw3IgStPXTl2-sGdrQCH0bN7Ng&s',
    title: 'Захід сонця',
    author: 'Макс'
  }
];

export default function GalleryScreen() {
  const handleImagePress = (image) => {
    Alert.alert(
      image.title,
      `Автор: ${image.author}\nID: ${image.id}`,
      [{ text: 'Закрити', style: 'cancel' }]
    );
  };

  const ImageCard = ({ image }) => (
    <TouchableOpacity 
      style={styles.imagePlaceholder} 
      onPress={() => handleImagePress(image)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: image.url }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay}>
        <Text style={styles.imageTitle}>{image.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Фотогалерея</Text>
      <Text style={styles.subtitle}>Натисніть на фото для деталей</Text>
      
      <View style={styles.gallery}>
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  imagePlaceholder: {
    width: '48%',
    height: 180,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});