// Frontend Entry Point
// App principal do React Native

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
// TODO: Importar screens de ./src/screens

// Navigation
// TODO: Configurar navegação do app

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* TODO: Implementar estrutura de navegação */}
    </NavigationContainer>
  );
}
