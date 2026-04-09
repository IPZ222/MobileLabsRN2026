import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const contactsData = [
  {
    title: 'Викладачі',
    data: [
      { id: '1', name: 'Проф. Іваненко П.П.', role: 'Завідувач кафедри', phone: '+380501234567', email: 'ivanenko@ztu.edu.ua' },
      { id: '2', name: 'Доц. Петренко В.В.', role: 'Лектор', phone: '+380501234568', email: 'petrenko@ztu.edu.ua' },
      { id: '3', name: 'Ст. викл. Сидоренко О.О.', role: 'Практик', phone: '+380501234569', email: 'sydorenko@ztu.edu.ua' },
    ],
  },
  {
    title: 'Адміністрація',
    data: [
      { id: '4', name: 'Коваленко Т.М.', role: 'Декан', phone: '+380501234570', email: 'kovalenko@ztu.edu.ua' },
      { id: '5', name: 'Шевченко Л.В.', role: 'Заступник декана', phone: '+380501234571', email: 'shevchenko@ztu.edu.ua' },
    ],
  },
  {
    title: 'Студентське самоврядування',
    data: [
      { id: '6', name: 'Бондар А.С.', role: 'Голова студради', phone: '+380501234572', email: 'bondar@ztu.edu.ua' },
      { id: '7', name: 'Мороз К.Д.', role: 'Заступник голови', phone: '+380501234573', email: 'moroz@ztu.edu.ua' },
    ],
  },
];

const ContactItem = ({ item }) => {
  const handlePress = () => {
    Alert.alert(
      item.name,
      `Посада: ${item.role}\nТелефон: ${item.phone}\nEmail: ${item.email}`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Зателефонувати', onPress: () => console.log('Дзвінок:', item.phone) },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.contactItem} onPress={handlePress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactRole}>{item.role}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

function SectionHeader({ section }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );
}

const ItemSeparator = () => <View style={styles.separator} />;

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <SectionList
        sections={contactsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem item={item} />}
        renderSectionHeader={SectionHeader}
        ItemSeparatorComponent={ItemSeparator}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactRole: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});