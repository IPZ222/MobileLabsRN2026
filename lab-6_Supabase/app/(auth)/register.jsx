import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView,
  Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password || !confirm) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Помилка', 'Паролі не збігаються');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль мінімум 6 символів');
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password);
      Alert.alert(
        '✅ Реєстрація успішна',
        'Перевірте пошту та підтвердіть email для входу.',
      );
    } catch (err) {
      Alert.alert('Помилка реєстрації', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <View style={styles.logoBox}>
          <Text style={styles.logo}>👤</Text>
        </View>

        <Text style={styles.title}>Реєстрація</Text>
        <Text style={styles.subtitle}>Створіть новий акаунт</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль (мін. 6 символів)"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Підтвердіть пароль"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Зареєструватись</Text>
          }
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.rowText}>Вже є акаунт? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Увійти</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FF' },
  inner: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoBox: { alignItems: 'center', marginBottom: 24 },
  logo: { fontSize: 64 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1E1B4B', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 32 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    marginBottom: 14, borderWidth: 1, borderColor: '#E5E7EB',
    fontSize: 16, color: '#1E1B4B',
  },
  button: {
    backgroundColor: '#6366F1', borderRadius: 12,
    padding: 16, alignItems: 'center', marginTop: 8, height: 52,
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { color: '#6366F1', fontSize: 14, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  rowText: { color: '#6B7280', fontSize: 14 },
});
