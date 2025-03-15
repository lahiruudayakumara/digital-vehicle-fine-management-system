import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  return (
      <SafeAreaView>
          <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Explore</Text>
      <Button title="Create Fine" onPress={() => {}} />
      <Button title="Scan QR Code" onPress={() => {}} />
    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
