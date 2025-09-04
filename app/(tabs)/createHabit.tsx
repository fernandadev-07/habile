import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, TextInput, Button } from 'react-native';
import { api, Habit } from '../../services/api';

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  // Campos do formulário
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

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
        setHabits([created, ...habits]); // adiciona no topo
        setNewTitle('');
        setNewDescription('');
        setNewFrequency('');
        setNewDate(new Date().toISOString().split('T')[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Carregando hábitos…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Formulário */}
      
      <View 
        style={{ 
          marginBottom: 24, 
          alignItems: 'center',
          backgroundColor: '#DEDEDE', 
          padding: 20,                
          borderRadius: 12,        
          
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Criar novo hábito</Text>

        <TextInput
          placeholder="Título"
          value={newTitle}
          onChangeText={setNewTitle}
          style={{
            width: '100%',
            borderWidth: 2,
            borderColor: '#8B3FFD',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 8,
          }}
        />

        <TextInput
          placeholder="Data"
          value={newDate}
          onChangeText={setNewDate}
          style={{
            width: '100%',
            borderWidth: 2,
            borderColor: '#8B3FFD',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 8,
          }}
        />

        <TextInput
          placeholder="Descrição"
          value={newDescription}
          onChangeText={setNewDescription}
          style={{
            width: '100%',
            borderWidth: 2,
            borderColor: '#8B3FFD',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 8,
          }}
        />

        <TextInput
          placeholder="Frequência"
          value={newFrequency}
          onChangeText={setNewFrequency}
          style={{
            width: '100%',
            borderWidth: 2,
            borderColor: '#8B3FFD',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 12,
          }}
        />

        <Button   
          title="Adicionar" 
          onPress={handleAddHabit} 
          color={'#8B3FFD'}
          
          />
      </View>

      {/* Lista de hábitos */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Testando hábitos</Text>
      <FlatList
        data={habits}
        keyExtractor={(h) => String(h.id)}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text>ID: {item.id}</Text>
            <Text>Título: {item.title}</Text>
            {item.createdAt && <Text>Criado em: {new Date(item.createdAt).toLocaleString()}</Text>}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum hábito encontrado.</Text>
        }
      />
    </ScrollView>
  );
}
