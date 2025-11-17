import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GenderPredictionScreen from './screens/GenderPredictionScreen';
import GeneticDiseasesScreen from './screens/GeneticDiseasesScreen';
import DiseaseDetailScreen from './screens/DiseaseDetailScreen';
import TraitsScreen from './screens/TraitsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GenderPrediction" component={GenderPredictionScreen} />
        <Stack.Screen name="GeneticDiseases" component={GeneticDiseasesScreen} />
        <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen} />
        <Stack.Screen name="Traits" component={TraitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
