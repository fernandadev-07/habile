import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, TextStyle, ViewStyle, StyleSheet, ActivityIndicator } from 'react-native';
import { api, Habit } from '../../services/api';
import { useRouter } from 'expo-router';

export default function CreateHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const router = useRouter();

  useEffect(() => {
    api.getHabits()
      .then((data) => setHabits(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleAddHabit = async () => {
    if (!newTitle.trim()) return;

    try {
      const created = await api.createHabit(newTitle.trim());
      if (created) {
        setHabits([created, ...habits]);

        setNewTitle('');
        setNewDescription('');
        setNewFrequency('');
        setNewDate(new Date().toISOString().split('T')[0]);

        router.push('/habits');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B3FFD" />
        <Text>Carregando hábitos…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Criar novo hábito</Text>

          <TextInput
            placeholder="Título"
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Data"
            value={newDate}
            onChangeText={setNewDate}
            style={styles.input}
          />

          <TextInput
            placeholder="Descrição"
            value={newDescription}
            onChangeText={setNewDescription}
            style={styles.input}
          />

          <TextInput
            placeholder="Frequência"
            value={newFrequency}
            onChangeText={setNewFrequency}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddHabit}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

interface Style {
  container: ViewStyle;
  form: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  loadingContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  form: {
    width: '90%',
    backgroundColor: '#DEDEDE',
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#8B3FFD',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16, 
  },
  button: {
    backgroundColor: '#8B3FFD',
    paddingVertical: 14,
    borderRadius: 15, 
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
