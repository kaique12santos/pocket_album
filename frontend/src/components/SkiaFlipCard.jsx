import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Animated, Text } from 'react-native';
import { Canvas, RoundedRect, SweepGradient, Shadow, vec, Group, Path, LinearGradient } from '@shopify/react-native-skia';

export default function SkiaFlipCard({ themeColor = '#00FFFF' }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(shimmerAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 0, useNativeDriver: true })
      ])
    ).start();
  }, [shimmerAnim]);

  const flipCard = () => {
    Animated.spring(flipAnim, { toValue: isFlipped ? 0 : 180, friction: 8, tension: 10, useNativeDriver: true }).start();
    setIsFlipped(!isFlipped);
  };

  const coverRotateY = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const contentRotateY = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  const coverOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [1, 0] });
  const contentOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });

  const shimmerTranslateX = shimmerAnim.interpolate({ inputRange: [0, 1], outputRange: [-150, 150] });

  const w = 120, h = 180, cx = w / 2, cy = h / 2;

  return (
    <Pressable onPress={flipCard}>
      <View style={{ width: w, height: h, margin: 10 }}>

        {/* FACE 1 */}
        <Animated.View style={[styles.cardBase, { transform: [{ rotateY: coverRotateY }], opacity: coverOpacity }]}>
           <Canvas style={{ width: w, height: h }}>
             <RoundedRect x={0} y={0} width={w} height={h} r={10} color="#111"><Shadow dx={0} dy={0} blur={5} color={themeColor} /></RoundedRect>
             <Path path={`M ${cx} ${cy-20} L ${cx+15} ${cy} L ${cx} ${cy+20} L ${cx-15} ${cy} Z`} color={themeColor} />
           </Canvas>
        </Animated.View>

        {/* FACE 2 */}
        <Animated.View style={[styles.cardBase, styles.cardAbsolute, { transform: [{ rotateY: contentRotateY }], opacity: contentOpacity, overflow: 'hidden', borderRadius: 10 }]}>
           <Canvas style={{ width: w, height: h }}>
             <RoundedRect x={0} y={0} width={w} height={h} r={10} color="#222"><Shadow dx={0} dy={0} blur={15} color="#FFDF00" /></RoundedRect>
             <Group blendMode="screen">
                <RoundedRect x={5} y={5} width={w-10} height={h-10} r={8} opacity={0.6}>
                  <SweepGradient c={vec(cx, cy)} colors={['#FFDF00', '#FF007F', '#00FFFF', '#FFDF00']} />
                </RoundedRect>
             </Group>
           </Canvas>
           
           <View style={styles.contentOverlay}>
              <View style={styles.imagePlaceholder} />
              <Text style={styles.cardText}>KAIQUE</Text>
           </View>

           {/* SHIMMER */}
           <Animated.View style={[styles.shimmerLayer, { transform: [{ rotate: '45deg' }, { translateX: shimmerTranslateX }] }]}>
             <Canvas style={{ flex: 1 }}>
                <RoundedRect x={0} y={0} width={60} height={300} r={0}>
                  <LinearGradient start={vec(0, 0)} end={vec(60, 0)} colors={['transparent', 'rgba(255, 255, 255, 0.7)', 'transparent']} />
                </RoundedRect>
             </Canvas>
           </Animated.View>
        </Animated.View>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBase: { width: '100%', height: '100%', backfaceVisibility: 'hidden' },
  cardAbsolute: { position: 'absolute', top: 0, left: 0 },
  contentOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 10, alignItems: 'center' },
  imagePlaceholder: { width: '90%', height: '60%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: '#fff' },
  cardText: { color: '#fff', fontWeight: '900', fontSize: 18, marginTop: 15, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 },
  shimmerLayer: { position: 'absolute', top: -50, left: 0, width: 60, height: 300, pointerEvents: 'none' }
});