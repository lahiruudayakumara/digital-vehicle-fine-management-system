import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FineHistoryScreen: React.FC = () => {
    return (
      <SafeAreaView>
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Fine History</Text>
            </View>
    </SafeAreaView>
  );
};

export default FineHistoryScreen;
