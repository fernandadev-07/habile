// app/(tabs)/habits.tsx
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function HabitsScreen() {
  const [habits, setHabits] = useState([
    { id: "1", title: "Tarefa 1", completed: true },
    { id: "2", title: "Tarefa 2", completed: false },
  ]);

  function toggleHabit(id: string) {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  }

  function addHabit() {
    const newHabit = {
      id: String(habits.length + 1),
      title: `Tarefa ${habits.length + 1}`,
      completed: false,
    };
    setHabits([...habits, newHabit]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={item => item.id}
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
      />
      <TouchableOpacity style={styles.addButton} onPress={addHabit}>
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
