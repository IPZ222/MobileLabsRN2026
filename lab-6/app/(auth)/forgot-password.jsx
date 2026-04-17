import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    try {
      await resetPassword(email);
      Alert.alert("Перевірте пошту", "Посилання надіслано!");
    } catch (e) {
      Alert.alert("Помилка", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Введіть ваш Email" value={email} onChangeText={setEmail} style={{ borderBottomWidth: 1, marginBottom: 20 }} />
      <TouchableOpacity onPress={handleReset} style={{ backgroundColor: '#4a90e2', padding: 15 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Скинути пароль</Text>
      </TouchableOpacity>
    </View>
  );
}