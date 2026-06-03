import React, { useRef, useState, useEffect } from 'react';
import { View,Dimensions, Text, Pressable, Animated, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { supabase } from '../../services/supabase';
import ConfettiExplosion from './ConfettiExplosion';
import SkiaFlipCard from './SkiaFlipCard';
import styles from './premiumStyle';
const { height } = Dimensions.get('window');

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function PremiumPack({ onNavigate }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [packStickers, setPackStickers] = useState([]);

  // Motores de Animação
  const progress = useRef(new Animated.Value(0)).current;
  const packScale = useRef(new Animated.Value(1)).current;
  const packOpacity = useRef(new Animated.Value(1)).current;
  const entryY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.spring(entryY, { toValue: 0, tension: 40, friction: 6, useNativeDriver: false }).start();
  }, []);

  const handlePressIn = () => {
    if (isFetching) return;
    Animated.spring(packScale, { toValue: 0.95, useNativeDriver: false }).start();
    Animated.timing(progress, { toValue: 100, duration: 1500, useNativeDriver: false }).start(({ finished }) => {
      if (finished) openPackFromDatabase();
    });
  };

  const handlePressOut = () => {
    if (!isOpened && !isFetching) {
      Animated.spring(packScale, { toValue: 1, useNativeDriver: false }).start();
      Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  };

  const triggerExplosion = () => {
    Animated.parallel([
      Animated.timing(packScale, { toValue: 0, duration: 300, useNativeDriver: false }),
      Animated.timing(packOpacity, { toValue: 0, duration: 300, useNativeDriver: false })
    ]).start(() => {
      setIsOpened(true);
      setIsFetching(false);
    });
  };

  const openPackFromDatabase = async () => {
    setIsFetching(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: allIds, error: idError } = await supabase.from('stickers').select('id');
      if (idError) throw idError;

      const shuffledIds = shuffleArray(allIds.map(s => s.id));
      const packIds = shuffledIds.slice(0, 3);

      const { data: stickers, error: fetchError } = await supabase
        .from('stickers')
        .select('*')
        .in('id', packIds);

      if (fetchError) throw fetchError;

      const inserts = stickers.map(sticker => ({
        user_id: user.id,
        sticker_id: sticker.id
      }));

      const { error: insertError } = await supabase.from('user_stickers').insert(inserts);
      
      setPackStickers(stickers);
      triggerExplosion();

    } catch (error) {
      console.error("Erro ao processar pacote:", error);
      setIsFetching(false);
      handlePressOut();
      alert("Houve um erro de conexão. Tente novamente.");
    }
  };

  const shake = progress.interpolate({
    inputRange: [0, 20, 40, 60, 80, 90, 100],
    outputRange: [0, -3, 3, -6, 6, -12, 0]
  });

  const barWidth = progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  const themeColors = ['#FFD60A', '#006B35', '#A7E5B2']; 

  return (
    <View style={styles.container}>
      {!isOpened ? (
        <Animated.View style={[styles.centerWrapper, { transform: [{ translateY: entryY }] }]}>
          
          <Text style={styles.instruction}>
            {isFetching ? "PROCESSANDO..." : "SEGURE PARA ABRIR"}
          </Text>
          
          <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={isFetching}>
            <Animated.View style={{ transform: [{ translateX: shake }, { scale: packScale }], opacity: packOpacity }}>
              
              {/* SUBSTITUIÇÃO DO SKIA: Usando Imagem de Fundo */}
              <ImageBackground 
                source={require('../../../assets/pack-album.png')} // <--- ALTERE O CAMINHO AQUI PARA A SUA IMAGEM
                style={styles.packImage}
                resizeMode="contain"
              >
                
              </ImageBackground>
              
              {isFetching && (
                 <ActivityIndicator size="large" color="#FFD60A" style={styles.loadingSpinner} />
              )}
            </Animated.View>
          </Pressable>

          <Animated.View style={[styles.progressContainer, { opacity: packOpacity }]}>
            <Animated.View style={[styles.progressBar, { width: barWidth }]} />
          </Animated.View>
        </Animated.View>
      ) : (
        <View style={styles.cardsContainer}>
          <ConfettiExplosion />
          <Text style={styles.successText}>Novas Figurinhas!</Text>
          <View style={styles.cardsRow}>
            {packStickers.map((sticker, index) => (
              <SkiaFlipCard 
                key={sticker.id + '-' + index} 
                themeColor={themeColors[index % 3]} 
                stickerData={sticker} 
              />
            ))}
          </View>
          <TouchableOpacity 
            style={styles.navButton}
            // AQUI ESTÁ A MÁGICA: Manda para a tela 'colagem' e passa as figurinhas junto!
            onPress={() => onNavigate && onNavigate('colagem', packStickers)}
          >
             <Text style={styles.navButtonText}>IR PARA A ÁREA DE COLAGEM ➡️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

