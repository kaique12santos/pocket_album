import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PremiumPack from './components/PremiumPack';
import AlbumScreen from './screens/AlbumScreen';
import QuizScreen from './screens/QuizScreen';

export default function SkiaApp() {
  // O estado que controla onde o utilizador está ('pack' ou 'album')
  const [currentScreen, setCurrentScreen] = useState('pack');

  return (
    <View style={styles.container}>
      {currentScreen === 'pack' ? (
        <PremiumPack onNavigate={() => setCurrentScreen('album')} />
      ) : (
        <AlbumScreen onNavigate={() => setCurrentScreen('pack')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' }
});