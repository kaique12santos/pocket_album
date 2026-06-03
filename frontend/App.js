import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { supabase } from './src/services/supabase';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { Asset } from 'expo-asset';

// --- FONTES DO MIGUEL ---
import { useFonts } from 'expo-font';
import { Anybody_800ExtraBold, Anybody_900Black } from '@expo-google-fonts/anybody';
import { ArchivoNarrow_400Regular, ArchivoNarrow_600SemiBold, ArchivoNarrow_700Bold } from '@expo-google-fonts/archivo-narrow';

// --- AS NOSSAS TELAS (Fluxo de Entrada e Skia) ---
import CoverScreen from './src/screens/CoverScreen';
import AuthScreen from './src/screens/AuthScreen';
import PremiumPack from './src/components/Album/PremiumPack';
import AlbumScreen from './src/screens/AlbumScreen';
import QuizScreen from './src/screens/QuizScreen';
import GamesScreen from './src/screens/GamesScreen';
import PasteScreen from './src/screens/PasteScreen'; 
import TouristSpots from './src/screens/googleMaps/TouristspotsScreen';


// --- AS TELAS DO MIGUEL (Telas Internas) ---
import Home from './src/screens/Home/home';
import About from './src/screens/about/about';
import Brasil from './src/screens/Brasil/brasil';
import WorldCup26 from './src/screens/WorldCup26';
import Player from './src/screens/GuessPlayer/player'; 


export default function App() {
  // --- ZONA DE DECLARAÇÃO DE HOOKS ---
 
  
  const [skiaReady, setSkiaReady] = useState(Platform.OS !== 'web');
  const [currentScreen, setCurrentScreen] = useState('cover'); 
  const [isInitializing, setIsInitializing] = useState(true);
  const [navData, setNavData] = useState(null);
  // Hook do Skia
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        const wasmModule = require('canvaskit-wasm/bin/full/canvaskit.wasm');
        const wasmUri = Asset.fromModule(wasmModule).uri;
        LoadSkiaWeb({ locateFile: () => wasmUri })
          .then(() => setSkiaReady(true))
          .catch(err => console.error("Erro interno do Skia:", err));
      } catch (error) {
        console.error("Erro ao localizar o arquivo WASM:", error);
      }
    }
  }, []);

  // Hook das Fontes (Precisava subir para cá!)
  const [fontsLoaded] = useFonts({
    Anybody_800ExtraBold,
    Anybody_900Black,
    ArchivoNarrow_400Regular,
    ArchivoNarrow_600SemiBold,
    ArchivoNarrow_700Bold,
  });

   const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('cover');
    }
    setIsInitializing(false);
  };


  // Hook da Sessão
  useEffect(() => {
    checkUserSession();
  }, []);

  // --- ZONA DE SAÍDA (LOADING) ---
  // Agora sim, após declarar todos os Hooks, podemos retornar as telas de loading.
  
  if (!skiaReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#181818', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFD60A" />
      </View>
    );
  }

  if (!fontsLoaded || isInitializing) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#FFDF00" />
      </View>
    );
  }

  // --- FUNÇÕES E LÓGICA DE NAVEGAÇÃO ---
 
  const handleNavigate = (screen, data = null) => {
    setNavData(data);
    setCurrentScreen(screen);
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentScreen('cover');
  };

  // --- ROTEAMENTO FINAL ---
  if (currentScreen === 'cover') return <CoverScreen onNavigate={() => handleNavigate('auth')} />;
  if (currentScreen === 'auth') return <AuthScreen onLoginSuccess={() => handleNavigate('home')} />;
  if (currentScreen === 'home') return <Home onNavigate={handleNavigate} onSignOut={handleSignOut} />;
  
  if (currentScreen === 'pack') {
  return skiaReady ? (
    <PremiumPack onNavigate={handleNavigate} /> // <-- Deixe o handleNavigate limpo aqui!
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FFDF00" />
    </View>
  );
}
  if (currentScreen === 'album') return <AlbumScreen onNavigate={() => handleNavigate('home')} />;
  if (currentScreen === 'quiz') return <QuizScreen onNavigate={() => handleNavigate('home')} />;
  if (currentScreen === 'who-is-that-player') return <Player onNavigate={() => handleNavigate('home')} />;
  if (currentScreen === 'games') return <GamesScreen onNavigate={handleNavigate} />;
  if (currentScreen === 'colagem') return <PasteScreen stickers={navData} onNavigate={handleNavigate} />;
  if (currentScreen === 'world-cup-26') return <WorldCup26 onNavigate={handleNavigate} onSignOut={handleSignOut} />;
  if (currentScreen === 'brasil') return <Brasil onNavigate={handleNavigate} onSignOut={handleSignOut} />;
  if (currentScreen === 'about') return <About onNavigate={handleNavigate} onSignOut={handleSignOut} />;
  if (currentScreen === 'tourist-spots') return <TouristSpots onNavigate={handleNavigate} onSignOut={handleSignOut} />;
  return <Home onNavigate={handleNavigate} onSignOut={handleSignOut} />;
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
});