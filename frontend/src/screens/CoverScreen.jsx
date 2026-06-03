import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style/coverStyle';

export default function CoverScreen({ onNavigate }) {
  return (
    <ImageBackground 
      source={require('../../assets/cover-bg.jpeg')} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Camada escura opcional no rodapé para o botão não sumir caso o fundo seja claro ali */}
      <View style={styles.gradientOverlay}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={onNavigate}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>CRIAR CONTA / ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

