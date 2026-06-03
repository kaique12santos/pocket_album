import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { Canvas, Rect, SweepGradient, vec } from '@shopify/react-native-skia';

// Imagem de teste com fundo transparente obrigatório
// (Usando um placeholder clássico só para testar o recorte perfeito da silhueta preta)
const PLAYER_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png'; 

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width * 1.5; // Fundo maior que a tela para o giro não mostrar as bordas

export default function WhoIsThatPlayer({ onComplete }) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Motores de Animação
  const revealAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  // O fundo dramático fica a girar infinitamente
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    // Física do "Pulo" da revelação
    Animated.spring(revealAnim, {
      toValue: 1,
      friction: 4,     // Deixa o pulo mais saltitante
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  // --- MATEMÁTICA DAS ANIMAÇÕES ---
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // A Silhueta começa visível (1) e some (0) no meio do pulo
  const silhouetteOpacity = revealAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0]
  });

  // A Imagem real começa invisível (0) e aparece (1)
  const colorOpacity = revealAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1]
  });

  // O Pulo (Escala de 1 -> incha para 1.4 -> assenta no 1.1)
  const imageScale = revealAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.4, 1.1]
  });

  return (
    <View style={styles.container}>
      
      {/* TEXTO DE TENSÃO NO TOPO */}
      <View style={styles.header}>
        <Text style={styles.mysteryText}>
          {isRevealed ? "É O CATERPIE!" : "QUEM É ESSE JOGADOR?"}
        </Text>
      </View>

      {/* ÁREA DA IMAGEM E FUNDO DRAMÁTICO */}
      <View style={styles.imageStage}>
        
        {/* SKIA MAGIC: Fundo de Raios a girar */}
        <Animated.View style={[styles.backgroundSpinner, { transform: [{ rotate: spin }] }]}>
          <Canvas style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
            <Rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE}>
              <SweepGradient 
                c={vec(CANVAS_SIZE / 2, CANVAS_SIZE / 2)} 
                colors={isRevealed 
                  ? ['#00C851', '#007E33', '#00C851', '#007E33', '#00C851'] // Cores da revelação (Verde)
                  : ['#003366', '#001133', '#003366', '#001133', '#003366'] // Cores do mistério (Azul escuro)
                } 
              />
            </Rect>
          </Canvas>
        </Animated.View>

        {/* CONTAINER DA IMAGEM COM O PULO ELÁSTICO */}
        <Animated.View style={[styles.playerContainer, { transform: [{ scale: imageScale }] }]}>
          
          {/* CAMADA 1: A SILHUETA PRETA (Sobra o recorte perfeito do PNG) */}
          <Animated.Image 
            source={{ uri: PLAYER_IMAGE }} 
            style={[styles.playerImage, styles.silhouette, { opacity: silhouetteOpacity }]} 
            resizeMode="contain"
          />

          {/* CAMADA 2: A IMAGEM COLORIDA (Revelada) */}
          <Animated.Image 
            source={{ uri: PLAYER_IMAGE }} 
            style={[styles.playerImage, styles.coloredImage, { opacity: colorOpacity }]} 
            resizeMode="contain"
          />

        </Animated.View>
      </View>

      {/* ZONA DE INTERAÇÃO */}
      <View style={styles.footer}>
        {!isRevealed ? (
          <TouchableOpacity style={styles.revealButton} onPress={handleReveal}>
            <Text style={styles.revealButtonText}>Revelar ⚡</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.revealButton, { backgroundColor: '#00C851', shadowColor: '#00C851' }]} onPress={onComplete}>
            <Text style={styles.revealButtonText}>Continuar ➡️</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', overflow: 'hidden' },
  header: { position: 'absolute', top: 60, width: '100%', alignItems: 'center', zIndex: 10 },
  mysteryText: { color: '#FFDF00', fontSize: 28, fontWeight: '900', textShadowColor: '#000', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, letterSpacing: 1 },
  
  imageStage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  backgroundSpinner: { position: 'absolute', width: CANVAS_SIZE, height: CANVAS_SIZE, justifyContent: 'center', alignItems: 'center', opacity: 0.6 },
  
  playerContainer: { width: 250, height: 250, justifyContent: 'center', alignItems: 'center' },
  playerImage: { width: '100%', height: '100%', position: 'absolute' },
  
  // O truque da silhueta nativa do React Native (Sem precisar editar a foto)
  silhouette: { tintColor: '#000' }, 
  coloredImage: { }, 

  footer: { position: 'absolute', bottom: 50, width: '100%', alignItems: 'center', zIndex: 10 },
  revealButton: { backgroundColor: '#FFDF00', paddingHorizontal: 40, paddingVertical: 18, borderRadius: 30, shadowColor: '#FFDF00', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 15, elevation: 5 },
  revealButtonText: { color: '#000', fontSize: 20, fontWeight: '900', textTransform: 'uppercase' }
});