import { useState, useEffect } from 'react';
import { Image, Platform, Pressable, ScrollView, Text, View, ActivityIndicator, Linking, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';

import { touristImages } from './touristImages';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './touriststyle'; // Vamos criar esse arquivo de estilo abaixo

const FaBars = (props) => <FontAwesome5 name="bars" {...props} />;
const FaMapMarkerAlt = (props) => <FontAwesome5 name="map-marker-alt" {...props} />;

export default function TouristSpots({ onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados do Supabase
  useEffect(() => {
    async function fetchSpots() {
      try {
        const { data, error } = await supabase
          .from('tourist_spots')
          .select('*');
        
        if (error) throw error;
        setSpots(data);
      } catch (error) {
        console.error('Erro ao buscar pontos turísticos:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSpots();
  }, []);

const handleSpotNavigation = async (spotName) => {
  try {
    const query = encodeURIComponent(spotName);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erro', 'Não foi possível abrir o Google Maps.');
    }
  } catch (error) {
    console.error('Erro ao abrir o mapa:', error);
    Alert.alert('Erro', 'Não foi possível abrir o Google Maps.');
  }
};

const getOptimizedImage = (url) => {
  if (!url) return null;
  // Adiciona parâmetros de redimensionamento (400px de largura, qualidade 75)
  return `${url}?w=500&q=75&auto=format&fit=crop`;
};

  return (
    <View style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => setMenuOpen(true)} style={styles.menuButton}>
          <FaBars color="#A7E5B2" size={30} />
        </Pressable>
        <Text style={styles.headerTitle}>Explorar Mundo</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Pontos Turísticos</Text>
        <Text style={styles.sectionSubtitle}>Conheça os lugares mais icônicos</Text>

        {loading ? (
          <ActivityIndicator color="#FFD60A" size="large" style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.grid}>
            {spots.map((spot) => (
              <Pressable 
                key={spot.id} 
                style={styles.spotCard}
                // Usando a nova função de roteamento
                onPress={() => handleSpotNavigation(spot.name)}
              >
                <Image 
                  source={{ uri: getOptimizedImage(touristImages[spot.id]) || 'https://via.placeholder.com/400'}} 
                  style={styles.spotImage} 
                  resizeMode="cover" 
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.spotCountry}>{spot.country.toUpperCase()}</Text>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  
                  <View style={styles.locationRow}>
                    <FaMapMarkerAlt size={12} color="#FFD60A" />
                    <Text style={styles.spotCity}>{spot.city}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomMenu onNavigate={onNavigate} />

      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={onNavigate}
        onSignOut={onSignOut}
      />
      
    </View>
  );
}