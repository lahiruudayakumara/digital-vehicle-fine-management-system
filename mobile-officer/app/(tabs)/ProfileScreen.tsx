import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Using react-native-vector-icons

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri:"./mobile-officer/assets/images/profile.jpg" }} // Replace with actual image URL
            style={styles.profileImage}
          />
          <Text style={styles.name}>Duvindu Nimsara</Text>
          <Text style={styles.role}>Traffic officer</Text>
        </View>

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16, justifyContent: "center" },
  card: { backgroundColor: "white", padding: 16, borderRadius: 12, shadowOpacity: 0.1, alignItems: "center" },
  profileHeader: { alignItems: "center", marginBottom: 16 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 20, fontWeight: "bold", color: "black", marginTop: 8 },
  role: { fontSize: 14, color: "gray", marginBottom: 8 },
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
});

export default ProfileScreen;
