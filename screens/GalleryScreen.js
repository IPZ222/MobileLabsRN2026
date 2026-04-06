import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Фотогалерея</Text>
      <View style={styles.gallery}>
        {/*Kartinachky*/}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>📷 Фото 1</Text>
        </View>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>📷 Фото 2</Text>
        </View>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>📷 Фото 3</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: '48%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
});