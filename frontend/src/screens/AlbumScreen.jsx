import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import BottomMenu from '../components/common/BottomNav';
import styles from './style/albumStyle';

export default function AlbumScreen({ onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [stickers, setStickers] = useState([]);
  const [ownedIds, setOwnedIds] = useState(new Set());
  const [stats, setStats] = useState({ total: 0, owned: 0 });

  // Estados de navegação e busca
  const [searchQuery, setSearchQuery] = useState('');
  const [teams, setTeams] = useState(['Brasil']); // Lista de times dinâmica
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const BASE_URL = 'https://yybmqwzposqlwuomnzgc.supabase.co/storage/v1/object/public/pocket-album-images/';

  useEffect(() => {
    fetchAlbumData();
  }, []);

  const fetchAlbumData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      // 1. Traz todas as figurinhas
      const { data: allStickers, error: stickersError } = await supabase
        .from('stickers')
        .select('id, name, team, image_url')
        .order('id', { ascending: true });

      if (stickersError) throw stickersError;

      // 2. Extrai os times únicos do banco para criar a paginação automática
      const uniqueTeams = [...new Set(allStickers.map(s => s.team).filter(Boolean))];
      if (uniqueTeams.length > 0) {
        setTeams(uniqueTeams);
      }

      // 3. Verifica posse do usuário
      const { data: myStickers, error: myError } = await supabase
        .from('user_stickers')
        .select('sticker_id')
        .eq('user_id', user.id);

      if (myError) throw myError;

      const ownedSet = new Set(myStickers.map(s => s.sticker_id));
      
      setStickers(allStickers);
      setOwnedIds(ownedSet);
      setStats({
        total: 333,
        owned: ownedSet.size
      });

    } catch (error) {
      console.error("Erro ao carregar o álbum:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funções para avançar e voltar de página (país)
  const nextTeam = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
  };

  const prevTeam = () => {
    setCurrentTeamIndex((prev) => (prev === 0 ? teams.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD60A" />
        <Text style={styles.loadingText}>Sincronizando sua coleção...</Text>
      </View>
    );
  }

  const currentTeam = teams[currentTeamIndex];

  // Filtra as figurinhas da página atual
  const filteredStickers = stickers.filter(s => {
    const matchesTeam = s.team === currentTeam;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  return (
    <View style={styles.safeArea}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar jogador..."
            placeholderTextColor="#7D8582"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome5 name="search" size={16} color="#7D8582" />
        </View>
        <Text style={styles.statsText}>
          Suas figurinhas: <Text style={styles.statsHighlight}>{stats.owned}/{stats.total}</Text>
        </Text>
      </View>

      {/* CONTROLE DE PÁGINA (PAÍS) COM NAVEGAÇÃO FUNCIONAL */}
      <View style={styles.pageController}>
        <Pressable style={styles.arrowBtn} onPress={prevTeam}>
          <FontAwesome5 name="arrow-left" size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.pageTitle}>{currentTeam ? currentTeam.toUpperCase() : 'CARREGANDO'}</Text>
        <Pressable style={styles.arrowBtn} onPress={nextTeam}>
          <FontAwesome5 name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* ÁREA DO ÁLBUM */}
      <View style={styles.screenShell}>
        <View style={styles.leftRail} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {filteredStickers.map((sticker) => {
              const isUnlocked = ownedIds.has(sticker.id);
              const formattedId = String(sticker.id).padStart(3, '0');

              return (
                <View key={sticker.id} style={styles.slotWrapper}>
                  {isUnlocked ? (
                    <View style={styles.unlockedSlot}>
                      <Image source={{ uri:`${BASE_URL}${sticker.image_url}` }} style={styles.stickerImage} resizeMode="cover" />
                      <View style={styles.nameTag}>
                        <Text style={styles.nameText}>{sticker.name}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.lockedSlot}>
                      {/* Aplicação da numeração correta */}
                      <Text style={styles.lockedNumber}>#{formattedId}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.rightRail}>
           {[0, 1, 2, 3, 4, 5, 6].map((dot) => (
             <View key={dot} style={styles.railDot} />
           ))}
        </View>
      </View>

      <BottomMenu onNavigate={onNavigate} />
    </View>
  );
}

