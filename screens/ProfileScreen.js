import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = React.useState('Іван Петренко');
  const [group, setGroup] = React.useState('ІП-01');

  const handleSave = () => {
    Alert.alert('Збережено', `Ім'я: ${name}\nГрупа: ${group}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ваше ім'я"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Ваша група"
        value={group}
        onChangeText={setGroup}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Зберегти" onPress={handleSave} color="#4a90e2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  }
});