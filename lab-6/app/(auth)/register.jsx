import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Помилка", "Заповніть усі поля");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Помилка", "Паролі не збігаються");
      return;
    }

    try {
      await register(email, password);
      // Після успіху RootLayout автоматично перекине в (app)
    } catch (error) {
      Alert.alert("Помилка реєстрації", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      
      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput 
        placeholder="Пароль" 
        secureTextEntry 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword}
      />

      <TextInput 
        placeholder="Підтвердіть пароль" 
        secureTextEntry 
        style={styles.input} 
        value={confirmPassword} 
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Створити акаунт</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.link}>
        <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#2ecc71', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#4a90e2' }
});