import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PatrolAreaScreen: React.FC = () => {
  const patrolAreas = ["Gampaha", "Kadawatha", "Ganemulla", "Ragama"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>My Assigned Patrol Area</Text>

        {/* 2x2 Grid Layout */}
        <View style={styles.gridContainer}>
          {patrolAreas.map((area) => (
            <TouchableOpacity key={area} style={styles.areaButton}>
              <Text style={styles.areaText}>{area}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16, justifyContent: "center" },
  card: { backgroundColor: "white", padding: 20, borderRadius: 12, shadowOpacity: 0.1, borderWidth: 1, borderColor: "#E5E7EB" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  areaButton: {
    width: "48%",
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  areaText: { fontSize: 16, fontWeight: "bold", color: "red" },
});

export default PatrolAreaScreen;
