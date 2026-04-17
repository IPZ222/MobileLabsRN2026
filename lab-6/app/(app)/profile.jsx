import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../src/config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', age: '', city: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setProfile(docSnap.data());
  };

  const saveProfile = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), profile);
      Alert.alert("Успіх", "Профіль оновлено!");
    } catch (e) {
      Alert.alert("Помилка", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email: {user?.email}</Text>
      <TextInput 
        placeholder="Ваше ім'я" 
        style={styles.input} 
        value={profile.name} 
        onChangeText={(t) => setProfile({...profile, name: t})} 
      />
      <TextInput 
        placeholder="Вік" 
        keyboardType="numeric"
        style={styles.input} 
        value={profile.age} 
        onChangeText={(t) => setProfile({...profile, age: t})} 
      />
      <TextInput 
        placeholder="Місто" 
        style={styles.input} 
        value={profile.city} 
        onChangeText={(t) => setProfile({...profile, city: t})} 
      />
      
      <TouchableOpacity style={styles.btnSave} onPress={saveProfile}>
        <Text style={styles.btnText}>Зберегти дані</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { marginBottom: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
  btnSave: { backgroundColor: '#4a90e2', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});