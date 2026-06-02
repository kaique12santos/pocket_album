import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Dimensions } from 'react-native';
import SkiaFlipCard from './SkiaFlipCard';

const { height } = Dimensions.get('window');

export default function DraggableCard({ themeColor = '#FFDF00' }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [isGlued, setIsGlued] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !isGlued, // Só arrasta se não colou
      
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
        Animated.spring(scale, { toValue: 1.1, useNativeDriver: false }).start();
      },
      
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        
        // ZONA DE COLAGEM (Metade superior da tela)
        if (gesture.moveY < height / 2) {
          setIsGlued(true);
          
          Animated.sequence([
            Animated.timing(scale, { toValue: 1.3, duration: 80, useNativeDriver: false }),
            Animated.spring(scale, { toValue: 1, friction: 3, tension: 100, useNativeDriver: false })
          ]).start();
          
        } else {
          // Volta para o inventário
          Animated.parallel([
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: false }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: false })
          ]).start();
        }
      }
    })
  ).current;

  return (
    <Animated.View
      style={{ 
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale: scale }], 
        zIndex: isGlued ? 1 : 10 
      }}
      // Se colou, remove os eventos de arrastar para o clique passar livre
      {...(isGlued ? {} : panResponder.panHandlers)}
    >
      {/* Se colou, ativa o pointerEvents para permitir o clique e girar o Card 3D */}
      <View pointerEvents={isGlued ? 'auto' : 'none'}>
        <SkiaFlipCard themeColor={themeColor} />
      </View>
    </Animated.View>
  );
}