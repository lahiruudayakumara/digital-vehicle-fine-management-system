import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PatrolAreaScreen: React.FC = () => {
  const patrolAreas: string[] = ['Gampaha', 'Kadawatha', 'Ganemulla', 'Ragama'];

    return (
      <SafeAreaView>
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">My Assigned Patrol Areas</Text>
      {patrolAreas.map((area) => (
        <View key={area} className="bg-red-500 px-4 py-2 rounded mt-2">
          <Text className="text-white">{area}</Text>
        </View>
      ))}
            </View>
    </SafeAreaView>
  );
};

export default PatrolAreaScreen;
