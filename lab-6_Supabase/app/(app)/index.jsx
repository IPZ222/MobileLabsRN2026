import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Alert, ScrollView, ActivityIndicator, RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [user])
  );

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)     
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (err) {
      Alert.alert('Помилка', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  const handleSignOut = () => {
    Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Вийти',
        style: 'destructive',
        onPress: async () => {
          try { await signOut(); } catch (e) { Alert.alert('Помилка', e.message); }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  const initials = profile?.name
    ? profile.name[0].toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.greeting}>
          {profile?.name ? `Привіт, ${profile.name}!` : 'Вітаємо!'}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Мій профіль</Text>
        {profile ? (
          <>
            <InfoRow label="Ім'я"  value={profile.name ?? '—'} />
            <InfoRow label="Вік"   value={profile.age ? `${profile.age} р.` : '—'} />
            <InfoRow label="Місто" value={profile.city ?? '—'} />
          </>
        ) : (
          <Text style={styles.empty}>
            Профіль ще не заповнений.{'\n'}Натисніть «Редагувати» щоб додати дані.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => router.push('/(app)/edit-profile')}
      >
        <Text style={styles.btnPrimaryText}>✏️  Редагувати профіль</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOutline} onPress={handleSignOut}>
        <Text style={styles.btnOutlineText}>Вийти з акаунту</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FF' },
  content: { padding: 24, paddingTop: 64, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8FF' },
  header: { alignItems: 'center', marginBottom: 32 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: '#6366F1', justifyContent: 'center',
    alignItems: 'center', marginBottom: 14,
    shadowColor: '#6366F1', shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#1E1B4B' },
  email: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20,
    marginBottom: 20, shadowColor: '#000',
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 3,
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1E1B4B', marginBottom: 16 },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  infoLabel: { color: '#9CA3AF', fontSize: 15 },
  infoValue: { color: '#1E1B4B', fontSize: 15, fontWeight: '500' },
  empty: { color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center', lineHeight: 22, paddingVertical: 8 },
  btnPrimary: {
    backgroundColor: '#6366F1', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnOutline: {
    borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12,
    padding: 16, alignItems: 'center',
  },
  btnOutlineText: { color: '#6B7280', fontSize: 16 },
});
