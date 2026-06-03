import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import FlipCard from './FlipCard';
import ConfettiExplosion from './ConfettiExplosion';

export default function PackOpener({ packColor = '#ffbb33' }) {
  const [isOpened, setIsOpened] = useState(false);
  
  // Valores animados
  const progress = useRef(new Animated.Value(0)).current;
  const explosionScale = useRef(new Animated.Value(0)).current;
  const explosionOpacity = useRef(new Animated.Value(1)).current;

  // Lógica de segurar o pacote
  const handlePressIn = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 1500, // 1.5 segundos segurando para abrir
      useNativeDriver: false, // false porque anima "width"
    }).start(({ finished }) => {
      if (finished) triggerExplosion();
    });
  };

  const handlePressOut = () => {
    if (!isOpened) {
      // Se soltar antes do fim, a barra esvazia
      Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  };

  // Efeito da explosão (Confete/Flash)
  const triggerExplosion = () => {
    setIsOpened(true);
    Animated.parallel([
      Animated.timing(explosionScale, { toValue: 5, duration: 500, useNativeDriver: true }),
      Animated.timing(explosionOpacity, { toValue: 0, duration: 500, useNativeDriver: true })
    ]).start();
  };

  // O pulo do gato: O tremor aumenta conforme a barra enche
  const shake = progress.interpolate({
    inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    outputRange: [0, -2, 2, -4, 4, -6, 6, -8, 8, -10, 0] // Vai tremendo cada vez mais largo
  });

  const barWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.container}>
      {/* Círculo de Explosão (Fica escondido até chegar no 100%) */}
      <Animated.View style={[styles.explosion, { transform: [{ scale: explosionScale }], opacity: explosionOpacity }]} />

      {!isOpened ? (
        <>
          <Text style={styles.instruction}>Segure o pacote para abrir</Text>
          <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={[styles.pack, { backgroundColor: packColor, transform: [{ translateX: shake }] }]}>
              <Text style={styles.packText}>PACOTE</Text>
            </Animated.View>
          </Pressable>

          {/* Barra de Progresso */}
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, { width: barWidth }]} />
          </View>
        </>
      ) : (
        // Resultado: As cartas abertas prontas para serem viradas
        <View style={styles.cardsContainer}>
            <ConfettiExplosion />
          <Text style={styles.instruction}>Toque nas cartas para revelar!</Text>
          <View style={styles.row}>
             <FlipCard frontColor="#ff4444" />
             <FlipCard frontColor="#00C851" />
             <FlipCard frontColor="#33b5e5" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  instruction: { color: '#aaa', fontSize: 16, marginBottom: 20, fontWeight: 'bold' },
  pack: { width: 150, height: 220, borderRadius: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, zIndex: 2 },
  packText: { color: '#000', fontWeight: 'bold', fontSize: 20, transform: [{ rotate: '-10deg' }] },
  progressContainer: { width: 200, height: 10, backgroundColor: '#333', borderRadius: 5, marginTop: 30, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#fff' },
  explosion: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', zIndex: 1 },
  cardsContainer: { alignItems: 'center', zIndex: 3 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }
});