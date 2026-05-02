import { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function EditProfileScreen() {
  const { user, reauthenticate, deleteAccount } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setName(data.name ?? '');
        setAge(data.age ? String(data.age) : '');
        setCity(data.city ?? '');
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Помилка', "Ім'я є обов'язковим полем");
      return;
    }
    const ageNum = age ? parseInt(age, 10) : null;
    if (age && (isNaN(ageNum) || ageNum < 1 || ageNum > 120)) {
      Alert.alert('Помилка', 'Введіть коректний вік (1–120)');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        name: name.trim(),
        age: ageNum,
        city: city.trim() || null,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;

      Alert.alert('✅ Збережено', 'Профіль успішно оновлено', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err) {
      Alert.alert('Помилка', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      Alert.alert('Помилка', 'Введіть пароль для підтвердження');
      return;
    }
    setDeleting(true);
    try {
      await reauthenticate(user.email, deletePassword);
      await deleteAccount();
    } catch (err) {
      Alert.alert('Помилка', err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Назад</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Редагування</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Form */}
        <Text style={styles.label}>Ім'я *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ваше ім'я"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Вік</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Ваш вік"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={3}
        />

        <Text style={styles.label}>Місто</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Ваше місто"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity
          style={[styles.btnPrimary, saving && styles.btnDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnPrimaryText}>Зберегти зміни</Text>
          }
        </TouchableOpacity>

        {/* Danger Zone */}
        <View style={styles.divider} />
        <Text style={styles.dangerTitle}>⚠️ Небезпечна зона</Text>

        {!showDeleteConfirm ? (
          <TouchableOpacity
            style={styles.btnDanger}
            onPress={() => setShowDeleteConfirm(true)}
          >
            <Text style={styles.btnDangerText}>🗑️  Видалити акаунт</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deleteBox}>
            <Text style={styles.deleteWarning}>
              Цю дію неможливо скасувати. Введіть пароль для підтвердження:
            </Text>
            <TextInput
              style={[styles.input, { marginBottom: 12 }]}
              value={deletePassword}
              onChangeText={setDeletePassword}
              placeholder="Ваш пароль"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoFocus
            />
            <View style={styles.deleteActions}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => { setShowDeleteConfirm(false); setDeletePassword(''); }}
              >
                <Text style={styles.btnCancelText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnConfirmDelete, deleting && styles.btnDisabled]}
                onPress={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting
                  ? <ActivityIndicator color="#fff" size="small" />
                  : <Text style={styles.btnConfirmDeleteText}>Видалити</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FF' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8FF' },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 32,
  },
  backBtn: { padding: 4 },
  backText: { color: '#6366F1', fontSize: 16, fontWeight: '500' },
  title: { fontSize: 18, fontWeight: '700', color: '#1E1B4B' },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 6, marginTop: 4, fontWeight: '500' },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB',
    fontSize: 16, color: '#1E1B4B',
  },
  btnPrimary: {
    backgroundColor: '#6366F1', borderRadius: 12,
    padding: 16, alignItems: 'center', marginTop: 4,
    height: 52, justifyContent: 'center',
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnDisabled: { opacity: 0.6 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 32 },
  dangerTitle: { fontSize: 15, fontWeight: '700', color: '#EF4444', marginBottom: 14 },
  btnDanger: {
    borderWidth: 1.5, borderColor: '#EF4444', borderRadius: 12,
    padding: 16, alignItems: 'center',
  },
  btnDangerText: { color: '#EF4444', fontSize: 16, fontWeight: '600' },
  deleteBox: {
    backgroundColor: '#FFF5F5', borderRadius: 12,
    padding: 16, borderWidth: 1, borderColor: '#FECACA',
  },
  deleteWarning: { color: '#7F1D1D', fontSize: 14, marginBottom: 14, lineHeight: 20 },
  deleteActions: { flexDirection: 'row', gap: 10 },
  btnCancel: {
    flex: 1, borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 10, padding: 13, alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnCancelText: { color: '#6B7280', fontSize: 15, fontWeight: '500' },
  btnConfirmDelete: {
    flex: 1, backgroundColor: '#EF4444',
    borderRadius: 10, padding: 13, alignItems: 'center',
    height: 46, justifyContent: 'center',
  },
  btnConfirmDeleteText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
