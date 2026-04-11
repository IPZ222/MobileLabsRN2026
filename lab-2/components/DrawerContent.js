import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Studentick */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Ільїн Ілля</Text>
        <Text style={styles.group}>ІПЗ-22-2</Text>
        <Text style={styles.email}>ipz222_ii@student.ztu.edu.ua</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu */}
      <View style={styles.menuItems}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#4a90e2',
    marginBottom: 10,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  group: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  email: {
    fontSize: 12,
    color: '#d0d0d0',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  menuItems: {
    flex: 1,
  },
});