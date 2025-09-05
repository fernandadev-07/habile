import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { api, Habit } from '../../services/api';

type LocalHabit = Habit & { completed: boolean };

export default function HabitsScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState<LocalHabit[]>([]);

  const loadHabits = useCallback(() => {
    api.getHabits()
      .then(data => {
        const normalized = (Array.isArray(data) ? data : []).map(h => ({
          ...h,
          completed: false,
        }));
        setHabits(normalized);
      })
      .catch(e => {
        console.error('Erro ao buscar hábitos:', e);
        setHabits([]);
      });
  }, []);

  // Carrega hábitos sempre que a tela estiver em foco
  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [loadHabits])
  );

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h)
    );
  };

  const goToCreateHabit = () => {
    router.push('/createHabit');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.habit, item.completed && styles.habitCompleted]}
            onPress={() => toggleHabit(item.id)}
          >
            <Text style={styles.habitText}>
              {item.completed ? "☑" : "☐"} {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>Nenhum hábito encontrado.</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={goToCreateHabit}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  habit: {
    padding: 15,
    borderWidth: 2,
    borderColor: "#9333ea",
    borderRadius: 10,
    marginBottom: 10,
  },
  habitCompleted: { backgroundColor: "#ddd6fe" },
  habitText: { fontSize: 16, color: "#4c1d95" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#9333ea",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 32 },
});
