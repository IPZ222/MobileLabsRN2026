import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatBytes = (bytes) => {
  if (!bytes) return '0 MB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

export default function App() {
  const rootDir = FileSystem.documentDirectory;
  const [currentPath, setCurrentPath] = useState(rootDir);
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({ total: 0, free: 0, used: 0 });

  const [createModal, setCreateModal] = useState({ visible: false, type: 'file' });
  const [inputName, setInputName] = useState('');
  const [inputContent, setInputContent] = useState('');

  const [editorModal, setEditorModal] = useState({ visible: false, path: '', content: '', originalName: '' });
  const [infoModal, setInfoModal] = useState({ visible: false, data: null });

  useEffect(() => {
    if (currentPath) {
      loadStats();
      loadDirectory(currentPath);
    }
  }, [currentPath]);

  const loadStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const used = total - free;
      setStats({ total, free, used });
    } catch (e) {
      console.log('Помилка завантаження статистики', e);
    }
  };

  const loadDirectory = async (path) => {
    if (!path) return;
    try {
      const items = await FileSystem.readDirectoryAsync(path);
      const detailedItems = await Promise.all(
        items.map(async (item) => {
          const itemPath = path + item;
          const info = await FileSystem.getInfoAsync(itemPath);
          return { name: item, ...info };
        })
      );
      setFiles(detailedItems.sort((a, b) => (a.isDirectory === b.isDirectory ? 0 : a.isDirectory ? -1 : 1)));
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося прочитати директорію");
    }
  };

  const handlePress = async (item) => {
    if (item.isDirectory) {
      setCurrentPath(currentPath + item.name + '/');
    } else if (item.name.endsWith('.txt')) {
      const content = await FileSystem.readAsStringAsync(currentPath + item.name);
      setEditorModal({ visible: true, path: currentPath + item.name, content, originalName: item.name });
    } else {
      Alert.alert("Інфо", "Цей тип файлу не підтримується для читання.");
    }
  };

  const goBack = () => {
    if (!currentPath || currentPath === rootDir) return;
    let newPath = currentPath;
    if (newPath.endsWith('/')) newPath = newPath.slice(0, -1);
    const lastSlashIndex = newPath.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      setCurrentPath(newPath.substring(0, lastSlashIndex + 1));
    } else {
      setCurrentPath(rootDir);
    }
  };

  const getDisplayPath = () => {
    if (!currentPath || !rootDir) return '/';
    return currentPath.replace(rootDir, '/') || '/';
  };

  const createItem = async () => {
    if (!inputName.trim()) {
      Alert.alert("Помилка", "Введіть назву");
      return;
    }
    const path = currentPath + inputName;
    try {
      if (createModal.type === 'folder') {
        await FileSystem.makeDirectoryAsync(path);
      } else {
        const fileName = inputName.endsWith('.txt') ? inputName : inputName + '.txt';
        await FileSystem.writeAsStringAsync(currentPath + fileName, inputContent || '');
      }
      setCreateModal({ visible: false, type: 'file' });
      setInputName('');
      setInputContent('');
      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося створити елемент");
    }
  };

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(editorModal.path, editorModal.content);
      setEditorModal({ visible: false, path: '', content: '', originalName: '' });
      Alert.alert("Успіх", "Файл збережено!");
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося зберегти зміни");
    }
  };

  const confirmDelete = (name) => {
    Alert.alert("Підтвердження", `Ви точно хочете видалити "${name}"?`, [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", style: "destructive", onPress: () => deleteItem(name) }
    ]);
  };

  const deleteItem = async (name) => {
    try {
      await FileSystem.deleteAsync(currentPath + name, { idempotent: true });
      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося видалити елемент");
    }
  };

  const showInfo = async (name) => {
    try {
      const info = await FileSystem.getInfoAsync(currentPath + name);
      const ext = name.includes('.') ? name.split('.').pop() : 'немає';
      const date = new Date(info.modificationTime * 1000).toLocaleString();
      setInfoModal({
        visible: true,
        data: { name, type: info.isDirectory ? 'Папка' : `Файл (.${ext})`, size: formatBytes(info.size), modDate: date }
      });
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося отримати атрибути");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AbobXplorer</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.btnCreate} onPress={() => setCreateModal({ visible: true, type: 'folder' })}>
          <Text style={styles.btnText}>+ Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCreate} onPress={() => setCreateModal({ visible: true, type: 'file' })}>
          <Text style={styles.btnText}>+ Файл .txt</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Пам&apos;ять пристрою:</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Вільна: <Text style={styles.statsValue}>{formatBytes(stats.free)}</Text></Text>
          <Text style={styles.statsLabel}>Зайнята: <Text style={styles.statsValue}>{formatBytes(stats.used)}</Text></Text>
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack} disabled={currentPath === rootDir}>
          <Text style={[styles.backBtnText, { color: currentPath === rootDir ? '#ccc' : '#2196F3' }]}>⬅ Назад</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumb} numberOfLines={1}>{getDisplayPath()}</Text>
      </View>

      <FlatList
        data={files}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <TouchableOpacity style={styles.itemTouch} onPress={() => handlePress(item)}>
              <Text style={styles.itemIcon}>{item.isDirectory ? '📁' : '📄'}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.itemActions}>
              <TouchableOpacity onPress={() => showInfo(item.name)}>
                <Text style={styles.iconBtn}>ℹ️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item.name)}>
                <Text style={styles.iconBtn}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ільїн Ілля ІПЗ 22-2</Text>
      </View>

      <Modal visible={createModal.visible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Створити {createModal.type === 'folder' ? 'папку' : 'файл'}</Text>
            <TextInput style={styles.input} placeholder="Введіть назву..." value={inputName} onChangeText={setInputName} />
            {createModal.type === 'file' && (
              <TextInput style={[styles.input, styles.textArea]} placeholder="Початковий вміст..." value={inputContent} onChangeText={setInputContent} multiline />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btn} onPress={() => setCreateModal({ visible: false, type: 'file' })}><Text>Скасувати</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#e0f7fa' }]} onPress={createItem}><Text>Створити</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={editorModal.visible} animationType="slide">
        <SafeAreaView style={styles.editorContainer}>
          <Text style={styles.editorTitle}>Редагування: {editorModal.originalName}</Text>
          <TextInput style={styles.editorInput} value={editorModal.content} onChangeText={(text) => setEditorModal({ ...editorModal, content: text })} multiline textAlignVertical="top" />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.btn} onPress={() => setEditorModal({ visible: false, path: '', content: '', originalName: '' })}><Text>Закрити</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#dcedc8' }]} onPress={saveFile}><Text>Зберегти</Text></TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={infoModal.visible} animationType="fade" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Властивості</Text>
            {infoModal.data && (
              <View style={styles.infoBlock}>
                <Text><Text style={{fontWeight: 'bold'}}>Назва:</Text> {infoModal.data.name}</Text>
                <Text><Text style={{fontWeight: 'bold'}}>Тип:</Text> {infoModal.data.type}</Text>
                <Text><Text style={{fontWeight: 'bold'}}>Розмір:</Text> {infoModal.data.size}</Text>
                <Text><Text style={{fontWeight: 'bold'}}>Змінено:</Text> {infoModal.data.modDate}</Text>
              </View>
            )}
            <TouchableOpacity style={[styles.btn, { marginTop: 10, alignSelf: 'center', backgroundColor: '#eee' }]} onPress={() => setInfoModal({ visible: false, data: null })}><Text>ОК</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2196F3' },
  
  header: { backgroundColor: '#2196F3', padding: 15},
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginLeft: 7},
  
  statsContainer: { padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  statsTitle: { fontWeight: 'bold', fontSize: 14, color: '#555', marginBottom: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statsLabel: { fontSize: 13, color: '#666' },
  statsValue: { fontWeight: 'bold', color: '#333' },

  navBar: { flexDirection: 'row', padding: 12, alignItems: 'center', backgroundColor: '#fafafa', borderBottomWidth: 1, borderColor: '#ddd' },
  backBtn: { paddingRight: 10 },
  backBtnText: { fontWeight: 'bold', fontSize: 15 },
  breadcrumb: { flex: 1, fontSize: 14, color: '#555', fontStyle: 'italic' },

  actionRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 12 },
  btnCreate: { backgroundColor: '#4caf50', padding: 12, borderRadius: 8, width: '46%', alignItems: 'center', elevation: 2 },
  btnText: { color: '#fff', fontWeight: 'bold' },

  fileItem: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  itemTouch: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  itemIcon: { fontSize: 26, marginRight: 12 },
  itemName: { fontSize: 16, color: '#333' },
  itemActions: { flexDirection: 'row' },
  iconBtn: { fontSize: 22, marginLeft: 18 },

  footer: {
      paddingVertical: 20,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      backgroundColor: '#fff',
    },
    footerText: {
      fontSize: 14,
      color: '#777',
      textAlign: 'center',
    },

  modalBg: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalCard: { backgroundColor: '#fff', margin: 30, padding: 25, borderRadius: 15, elevation: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2196F3' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: '#fafafa' },
  textArea: { height: 100, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btn: { padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center', backgroundColor: '#f0f0f0' },
  editorContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  editorTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#2196F3' },
  editorInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, fontSize: 16, backgroundColor: '#fdfdfd', marginBottom: 15 },
  infoBlock: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }
});