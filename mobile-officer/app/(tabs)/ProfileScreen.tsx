import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
    return (
      <SafeAreaView>
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold">Duvindu Nimsara</Text>
      <Text className="text-gray-500">Traffic Officer</Text>
      <TextInput
        className="border p-2 rounded"
        value="21589641"
        editable={false}
      />
      <TextInput
        className="border p-2 rounded"
        value="+93123135"
        editable={false}
      />
            </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

