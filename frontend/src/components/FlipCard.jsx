import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native';

export default function FlipCard({ frontColor = '#00C851', backColor = '#444' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  // Matemática da virada
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: ['180deg', '270deg', '360deg'],
  });

  const frontOpacity = flipAnimation.interpolate({ inputRange: [89, 90], outputRange: [1, 0] });
  const backOpacity = flipAnimation.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.container}>
        {/* Costas da Carta (Aparece primeiro) */}
        <Animated.View style={[styles.card, { backgroundColor: backColor, transform: [{ rotateY: frontInterpolate }], opacity: frontOpacity }]}>
          <View style={styles.placeholderLogo} />
        </Animated.View>

        {/* Frente da Carta (A figurinha real) */}
        <Animated.View style={[styles.card, styles.cardBack, { backgroundColor: frontColor, transform: [{ rotateY: backInterpolate }], opacity: backOpacity }]}>
          <View style={styles.placeholderImage} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { width: 100, height: 150, margin: 10 },
  card: { width: '100%', height: '100%', borderRadius: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center', backfaceVisibility: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  cardBack: { position: 'absolute', top: 0 },
  placeholderLogo: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)' },
  placeholderImage: { width: '80%', height: '80%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 5 },
});