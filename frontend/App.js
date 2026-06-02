import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Anybody_800ExtraBold,
  Anybody_900Black,
} from '@expo-google-fonts/anybody';
import {
  ArchivoNarrow_400Regular,
  ArchivoNarrow_600SemiBold,
  ArchivoNarrow_700Bold,
} from '@expo-google-fonts/archivo-narrow';
import { useAuthStore } from './src/store/useAuthStore';
import AuthScreen from './src/screens/AuthScreen';
import Home from './src/screens/Home/home';
import About from './src/screens/about/about';
import Brasil from './src/screens/Brasil/brasil';

export default function App() {
  const { session, loading, initAuthListener, signOut } = useAuthStore();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [fontsLoaded] = useFonts({
    Anybody_800ExtraBold,
    Anybody_900Black,
    ArchivoNarrow_400Regular,
    ArchivoNarrow_600SemiBold,
    ArchivoNarrow_700Bold,
  });

  useEffect(() => {
    initAuthListener();
  }, []);

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  if (!fontsLoaded || (loading && !session)) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (session) {
    if (currentScreen === 'brasil') {
      return <Brasil onNavigate={handleNavigate} onSignOut={signOut} />;
    }

    if (currentScreen === 'about') {
      return <About onNavigate={handleNavigate} onSignOut={signOut} />;
    }

    return <Home session={session} onNavigate={handleNavigate} onSignOut={signOut} />;
  }

  return (
    <View style={styles.centeredContainer}>
      <AuthScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
});
