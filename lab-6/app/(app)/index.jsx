import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../src/config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: '', age: '', city: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      // Якщо користувач вийшов, не намагаємося лізти в базу
      if (!user?.uid) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.log("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  // ВАЖЛИВО: Якщо користувач став null (під час виходу), 
  // ми просто показуємо завантаження або нічого, поки редирект не спрацює.
  if (!user) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ваш профіль</Text>
      {/* Використовуй ?. на випадок затримок рендеру */}
      <Text style={styles.uidText}>ID: {user?.uid}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        value={profile.name}
        onChangeText={(t) => setProfile({ ...profile, name: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Вік"
        keyboardType="numeric"
        value={profile.age}
        onChangeText={(t) => setProfile({ ...profile, age: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Місто"
        value={profile.city}
        onChangeText={(t) => setProfile({ ...profile, city: t })}
      />

      <TouchableOpacity style={styles.btnSave} onPress={async () => {
          try {
            await setDoc(doc(db, "users", user.uid), profile);
            Alert.alert("Збережено!");
          } catch (e) { Alert.alert("Помилка", e.message); }
      }}>
        <Text style={styles.btnText}>Зберегти дані</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLogout} onPress={logout}>
        <Text style={styles.btnText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  uidText: { fontSize: 10, color: '#aaa', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
  btnSave: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnLogout: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});