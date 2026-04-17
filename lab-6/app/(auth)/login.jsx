import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

const handleLogin = async () => {
  console.log("Якщо не запрацювало то це піздєц."); 
  
  if (!email || !password) {
    Alert.alert("Помилка", "Введіть email та пароль");
    return;
  }

  try {
    console.log("Спроба входу для:", email);
    await login(email, password);
    console.log("Вхід успішний!");
  } catch (error) {
    console.error("Помилка Firebase:", error.code);
    Alert.alert("Помилка", error.message);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Вхід у систему</Text>
        
        <TextInput 
          placeholder="Email" 
          style={styles.input} 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput 
          placeholder="Пароль" 
          secureTextEntry 
          style={styles.input} 
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Увійти</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Немає акаунту? <Text style={styles.bold}>Реєстрація</Text></Text>
            </TouchableOpacity>
          </Link>
          <Link href="/forgot-password" style={styles.forgotBtn}>
            Забули пароль?
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  bold: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  forgotBtn: {
    marginTop: 15,
    color: '#888',
    fontSize: 13,
    textDecorationLine: 'underline',
  }
});