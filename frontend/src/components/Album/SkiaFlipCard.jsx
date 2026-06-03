import React, { useRef, useState } from 'react';
import { View, Pressable, Animated, Text, Image, ImageBackground } from 'react-native';
import styles from './skiaFlipStyle';

export default function SkiaFlipCard({ stickerData, width = 100, height = 140 }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    Animated.spring(flipAnim, { toValue: isFlipped ? 0 : 180, friction: 8, tension: 10, useNativeDriver: true }).start();
    setIsFlipped(!isFlipped);
  };

  const coverRotateY = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const contentRotateY = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  const coverOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [1, 0] });
  const contentOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });

  const BASE_URL = 'https://yybmqwzposqlwuomnzgc.supabase.co/storage/v1/object/public/pocket-album-images/';

  return (
    <Pressable onPress={flipCard}>
      {/* O tamanho agora vem da propriedade, permitindo que a PasteScreen diminua o card */}
      <View style={{ width, height, margin: 5 }}> 

        {/* FACE 1 (COSTAS) */}
        <Animated.View style={[styles.cardBase, { transform: [{ rotateY: coverRotateY }], opacity: coverOpacity }]}>
           <ImageBackground 
             source={require('../../../assets/cover-bg.jpeg')} 
             style={styles.cardFill}
             imageStyle={{ borderRadius: 10 }}
           >
             <Text style={styles.backText}>?</Text>
           </ImageBackground>
        </Animated.View>

        {/* FACE 2 (FRENTE) */}
        <Animated.View style={[styles.cardBase, styles.cardAbsolute, { transform: [{ rotateY: contentRotateY }], opacity: contentOpacity }]}>
           <View style={styles.cardFill}>
              {stickerData?.image_url ? (
                <Image 
                  source={{ uri: `${BASE_URL}${stickerData.image_url}` }} 
                  style={{ width: width - 20, height: height - 40 }} // A imagem interna também se adapta!
                  resizeMode="contain" 
                />
              ) : (
                <View style={{ width: width - 20, height: height - 40, backgroundColor: '#333', borderRadius: 5 }} />
              )}
              
              <Text style={styles.cardText} numberOfLines={2} adjustsFontSizeToFit>
                {stickerData?.name ? stickerData.name.toUpperCase() : 'MISTÉRIO'}
              </Text>
           </View>
        </Animated.View>

      </View>
    </Pressable>
  );
}

