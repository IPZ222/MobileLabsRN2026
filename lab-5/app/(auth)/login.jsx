import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Вхід у систему</Text>
        <Link href="/error-test">Перевірити 404</Link>
        <TextInput 
          placeholder="Email" 
          style={styles.input} 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          placeholder="Пароль" 
          secureTextEntry 
          style={styles.input} 
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => login(email, password)}
        >
          <Text style={styles.buttonText}>Увійти</Text>
        </TouchableOpacity>
        
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Немає акаунту? <Text style={{fontWeight: 'bold'}}>Зареєструватися</Text></Text>
          </TouchableOpacity>
        </Link>
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
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    color: '#4a90e2',
    textAlign: 'center',
    fontSize: 14,
  },
});