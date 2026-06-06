import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

const NUM_CONFETTI = 15; // Ponto de equilíbrio perfeito entre visual e performance web
const COLORS = ['#009B3A', '#FEDF00', '#002776', '#FFFFFF'];

export default function ConfettiExplosion() {
  const particles = useRef(
    Array.from({ length: NUM_CONFETTI }).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = particles.map((particle) =>
      Animated.timing(particle, {
        toValue: 1,
        duration: 2000 + Math.random() * 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // Na web ele avisa que cai pro JS, então otimizamos o objeto
      })
    );
    Animated.parallel(animations).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((particle, index) => {
        const angle = (Math.PI * 2 * index) / NUM_CONFETTI; 
        const explosionForce = 150 + Math.random() * 300; 
        
        const endX = Math.cos(angle) * explosionForce;
        const endY = Math.sin(angle) * explosionForce;

        const translateX = particle.interpolate({
          inputRange: [0, 1],
          outputRange: [0, endX + (Math.random() > 0.5 ? 50 : -50)], 
        });

        const translateY = particle.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [0, endY - 150, endY + 600], 
        });

        const rotateX = particle.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${360 + Math.random() * 1080}deg`], 
        });
        const rotateY = particle.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${360 + Math.random() * 1080}deg`], 
        });
        const rotateZ = particle.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${Math.random() * 360}deg`],
        });

        const opacity = particle.interpolate({
          inputRange: [0, 0.8, 1],
          outputRange: [1, 1, 0], 
        });

        const color = COLORS[index % COLORS.length];
        const shapeVariant = Math.random();
        const width = shapeVariant > 0.6 ? 6 : 12;
        const height = shapeVariant > 0.3 ? 18 : 12;
        const borderRadius = shapeVariant > 0.8 ? 10 : 0; 

        return (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                backgroundColor: color,
                width,
                height,
                borderRadius,
                opacity,
                transform: [
                  { translateX }, 
                  { translateY }, 
                  { rotateX }, 
                  { rotateY }, 
                  { rotateZ }
                ]
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  confetti: { position: 'absolute', top: '50%', left: '50%' },
});