import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { Canvas, RoundedRect, LinearGradient, SweepGradient, Shadow, vec, Group, Circle, Path } from '@shopify/react-native-skia';
import ConfettiExplosion from './ConfettiExplosion';
import SkiaFlipCard from './SkiaFlipCard';

const { height } = Dimensions.get('window');

export default function PremiumPack({ onNavigate }) {
  const [isOpened, setIsOpened] = useState(false);
  
  // Motores de Animação
  const progress = useRef(new Animated.Value(0)).current;
  const packScale = useRef(new Animated.Value(1)).current;
  const packOpacity = useRef(new Animated.Value(1)).current;
  const entryY = useRef(new Animated.Value(height)).current; // Nasce fora da tela (embaixo)

  // Entrada do pacote ao carregar a tela
  useEffect(() => {
    Animated.spring(entryY, { toValue: 0, tension: 40, friction: 6, useNativeDriver: true }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(packScale, { toValue: 0.95, useNativeDriver: true }).start();
    Animated.timing(progress, {
      toValue: 100, duration: 1500, useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) triggerExplosion();
    });
  };

  const handlePressOut = () => {
    if (!isOpened) {
      Animated.spring(packScale, { toValue: 1, useNativeDriver: true }).start();
      Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  };

  const triggerExplosion = () => {
    // Efeito de Saída: O pacote implode e some
    Animated.parallel([
      Animated.timing(packScale, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(packOpacity, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start(() => {
      setIsOpened(true); // Só mostra as cartas depois que o pacote sumir
    });
  };

  const shake = progress.interpolate({
    inputRange: [0, 20, 40, 60, 80, 90, 100],
    outputRange: [0, -3, 3, -6, 6, -12, 0]
  });

  const barWidth = progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });

  const canvasW = 280, canvasH = 350, packW = 160, packH = 240;
  const cx = canvasW / 2, cy = canvasH / 2, px = cx - packW / 2, py = cy - packH / 2;

  return (
    <View style={styles.container}>
      {!isOpened ? (
        <Animated.View style={[styles.centerWrapper, { transform: [{ translateY: entryY }] }]}>
          <Text style={styles.instruction}>SEGURE E SACUDA PARA ABRIR</Text>
          
          <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={{ transform: [{ translateX: shake }, { scale: packScale }], opacity: packOpacity }}>
              <Canvas style={{ width: canvasW, height: canvasH, pointerEvents: 'none' }}>
                <Circle cx={cx} cy={cy} r={100} color="#8A2BE2"><Shadow dx={0} dy={0} blur={40} color="#FF007F" /></Circle>
                <RoundedRect x={px} y={py} width={packW} height={packH} r={15} color="#111111">
                  <Shadow dx={0} dy={15} blur={25} color="#000000" />
                  <Shadow dx={0} dy={0} blur={5} color="#FFDF00" />
                </RoundedRect>
                <Group blendMode="screen">
                  <RoundedRect x={px} y={py} width={packW} height={packH} r={15} opacity={0.8}>
                    <SweepGradient c={vec(cx, cy)} colors={['#FFDF00', '#FF007F', '#00FFFF', '#8A2BE2', '#FFDF00']} />
                  </RoundedRect>
                </Group>
                <RoundedRect x={px} y={py} width={packW} height={packH} r={15}>
                  <LinearGradient start={vec(px, py)} end={vec(px, py + packH)} colors={['transparent', 'rgba(0,0,0,0.9)']} />
                </RoundedRect>
                <Path path={`M ${cx} ${cy - 40} L ${cx + 30} ${cy} L ${cx} ${cy + 40} L ${cx - 30} ${cy} Z`} color="#1a1a1a">
                  <Shadow dx={0} dy={0} blur={15} color="#00FFFF" />
                </Path>
                <Path path={`M ${cx} ${cy - 25} L ${cx + 15} ${cy} L ${cx} ${cy + 25} L ${cx - 15} ${cy} Z`} color="#FFFFFF" />
              </Canvas>
              <View style={styles.packOverlay}><Text style={styles.packText}>LENDÁRIO</Text></View>
            </Animated.View>
          </Pressable>

          <Animated.View style={[styles.progressContainer, { opacity: packOpacity }]}>
            <Animated.View style={[styles.progressBar, { width: barWidth }]} />
          </Animated.View>
        </Animated.View>
      ) : (
        <View style={styles.cardsContainer}>
          <ConfettiExplosion />
          <Text style={styles.successText}>Pacote Aberto!</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            <SkiaFlipCard themeColor="#FF007F" />
            <SkiaFlipCard themeColor="#00FFFF" />
            <SkiaFlipCard themeColor="#FFDF00" />
          </View>
          {/* O BOTÃO DE NAVEGAÇÃO ENTRA AQUI */}
          <TouchableOpacity 
            style={{ marginTop: 40, backgroundColor: '#00FFFF', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25, shadowColor: '#00FFFF', shadowOpacity: 0.8, shadowRadius: 10 }}
            onPress={onNavigate}
          >
             <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Ir para o Álbum ➡️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  centerWrapper: { alignItems: 'center' },
  instruction: { color: '#aaa', fontSize: 14, marginBottom: 10, fontWeight: 'bold', letterSpacing: 2 },
  packOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 40, justifyContent: 'flex-end', alignItems: 'center' },
  packText: { color: '#fff', fontWeight: '900', fontSize: 24, letterSpacing: 4, textShadowColor: '#000', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 },
  progressContainer: { width: 220, height: 6, backgroundColor: '#222', borderRadius: 3, marginTop: -20, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#00FFFF', shadowColor: '#00FFFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10 },
  cardsContainer: { alignItems: 'center', zIndex: 3 },
  successText: { color: '#00FFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textShadowColor: '#00FFFF', textShadowRadius: 10 }
});