import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Dimensions } from 'react-native';
import SkiaFlipCard from './SkiaFlipCard';

const { height } = Dimensions.get('window');

// 1. O ERRO ESTAVA AQUI: Faltava receber cardWidth e cardHeight nas props!
export default function DraggableCard({ themeColor = '#FFDF00', stickerData, cardWidth = 100, cardHeight = 140 }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [isGlued, setIsGlued] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !isGlued, 
      
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
        Animated.spring(scale, { toValue: 1.1, useNativeDriver: false }).start();
      },
      
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } // Mantém false para evitar o aviso no Web
      ),
      
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        
        if (gesture.moveY < height / 2) {
          setIsGlued(true);
          Animated.spring(scale, { toValue: 1, friction: 3, tension: 100, useNativeDriver: false }).start();
        } else {
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
      {...(isGlued ? {} : panResponder.panHandlers)}
    >
      {/* 2. AVISO CORRIGIDO: pointerEvents agora é passado dentro do style na Web */}
      <View style={{ pointerEvents: isGlued ? 'auto' : 'none' }}>
        <SkiaFlipCard 
          themeColor={themeColor} 
          stickerData={stickerData} 
          width={cardWidth}   
          height={cardHeight} 
        />
      </View>
    </Animated.View>
  );
}