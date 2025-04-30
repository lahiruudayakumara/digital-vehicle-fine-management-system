import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { AppDispatch } from "@/stores/store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "@/stores/slices/auth/auth-actions";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

// Using react-native-vector-icons

const ProfileScreen: React.FC = () => {
  const patrolAreas = ["Gampaha", "Kadawatha", "Ganemulla", "Ragama"];
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Officer Details</Text>

      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Duvindu Nimsara</Text>
          <Text style={styles.role}>Traffic officer</Text>
        </View>

        {/* Custom Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="white" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Info Fields */}
        <View style={styles.infoContainer}>
          <View style={styles.inputGroup}>
            <Icon name="badge-account-outline" size={20} color="gray" style={styles.icon} />
            <TextInput value="21589641" editable={false} style={styles.inputField} />
            <Icon name="lock-outline" size={20} color="gray" />
          </View>

          <View style={styles.inputGroup}>
            <Icon name="phone-outline" size={20} color="gray" style={styles.icon} />
            <TextInput value="+93123135" editable={false} style={styles.inputField} />
            <Icon name="lock-outline" size={20} color="gray" />
          </View>

          <View style={styles.inputGroup}>
            <Icon name="map-marker-outline" size={20} color="gray" style={styles.icon} />
            <TextInput value="Gampaha" editable={false} style={styles.inputField} />
            <Icon name="lock-outline" size={20} color="gray" />
          </View>
        </View>

        {/* Patrol Areas Section */}
        <View style={styles.patrolAreaContainer}>
          <Text style={styles.patrolTitle}>Assigned Patrol Areas</Text>
          {patrolAreas.map((area, index) => (
            <Text key={index} style={styles.patrolArea}>{area}</Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16, justifyContent: "center" },
  heading: { fontSize: 24, fontWeight: "bold", color: "black", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "white", padding: 16, borderRadius: 12, shadowOpacity: 0.1, alignItems: "center" },
  profileHeader: { alignItems: "center", marginBottom: 16 },
  profileImage: { width: 150, height: 150, borderRadius: 100 },
  name: { fontSize: 20, fontWeight: "bold", color: "black", marginTop: 8 },
  role: { fontSize: 14, color: "gray", marginBottom: 8 },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  logoutIcon: {
    marginRight: 2,
  },
  infoContainer: { width: "100%", marginTop: 12 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputField: { flex: 1, fontSize: 16, color: "black" },
  icon: { marginRight: 10 },
  patrolAreaContainer: { width: "100%", marginTop: 20 },
  patrolTitle: { fontSize: 18, fontWeight: "bold", color: "black", marginBottom: 10 },
  patrolArea: { fontSize: 16, color: "gray", marginBottom: 5 },
});

export default ProfileScreen;