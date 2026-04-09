import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function ProfileScreen() {
  const [mail, setMail] = React.useState('ipz222_ii@student.ztu.edu.ua');
  const [group, setGroup] = React.useState('ІП3-22-2');
  const [password, setPassword] = React.useState('ручками');
  const [name, setName] = React.useState('Ілля');
  const [surname, setSurname] = React.useState('Ільїн');

  const handleSave = () => {
    Alert.alert('Збережено', `Ім'я: ${surname} ${name}\nГрупа: ${group}\nПошта: ${mail}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      <Text>Пошта</Text>
      <TextInput
        style={styles.input}
        placeholder="Електронна пошта"
        value={mail}
        onChangeText={setMail}
      />
      <Text>Пароль</Text>
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text>Пароль (Ручками)</Text>
      <TextInput
        style={styles.input}
        placeholder="Пароль (ручками)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text>Група</Text>
      <TextInput
        style={styles.input}
        placeholder="Група"
        value={group}
        onChangeText={setGroup}
      />
      <Text>Прізвище</Text>
      <TextInput
        style={styles.input}
        placeholder="Прізвище"
        value={surname}
        onChangeText={setSurname}
      />
      <Text>Ім&lsquo;я</Text>
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        value={name}
        onChangeText={setName}
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