import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import BottomMenu from '../components/common/BottomNav';
import styles from './style/gamesStyle';

export default function GamesScreen({ onNavigate }) {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOpening, setIsOpening] = useState(false); 

  useEffect(() => {
    fetchUserScore();
  }, []);

  const fetchUserScore = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('score')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setScore(data.score || 0);
      }
    } catch (error) {
      console.error("Erro ao buscar pontuação:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE DEDUÇÃO E ABERTURA DO PACOTE ---
  const handleOpenPack = async () => {
    if (isOpening) return; 

    if (score >= 30) {
      setIsOpening(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const novoSaldo = score - 30;

        // 1. Atualiza o banco de dados primeiro
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ score: novoSaldo })
          .eq('id', user.id);

        if (updateError) throw updateError;

        // 2. Atualiza a tela (Front-end)
        setScore(novoSaldo);

        // 3. Navega para a tela do pacote
        onNavigate && onNavigate('pack');

      } catch (error) {
        console.error("Erro ao debitar pontos:", error);
        Alert.alert("Erro", "Houve um problema de conexão ao processar seus pontos. Tente novamente.");
      } finally {
        setIsOpening(false);
      }
    } else {
      const pontosFaltantes = 30 - score;
      Alert.alert(
        "Pontos Insuficientes",
        `Você precisa de 30 pontos para abrir um pacote.\n\nFaltam ${pontosFaltantes} pontos! Jogue os minigames para acumular mais.`
      );
    }
  };

  return (
    <View style={styles.safeArea}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CENTRAL DE JOGOS</Text>
        <Text style={styles.headerSubtitle}>Jogue, pontue e expanda seu álbum.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* PLACAR (SCORE) */}
        <View style={styles.scoreBoard}>
          <FontAwesome5 name="trophy" size={24} color="#FFD60A" />
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreLabel}>PONTUAÇÃO ATUAL</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#FFD60A" />
            ) : (
              <Text style={styles.scoreValue}>{score} <Text style={styles.scorePts}>PTS</Text></Text>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>MINIGAMES DISPONÍVEIS</Text>

        {/* BOTÃO: QUIZ */}
        <Pressable style={styles.gameCard} onPress={() => onNavigate && onNavigate('quiz')}>
          <View style={styles.gameIconBox}>
            <FontAwesome5 name="question-circle" size={24} color="#FFD60A" />
          </View>
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle}>Quiz de Craque</Text>
            <Text style={styles.gameDesc}>Teste seus conhecimentos históricos.</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#53605C" />
        </Pressable>

        {/* BOTÃO: QUEM É O JOGADOR */}
        <Pressable style={styles.gameCard} onPress={() => onNavigate && onNavigate('who-is-that-player')}>
          <View style={styles.gameIconBox}>
            <FontAwesome5 name="search" size={24} color="#FFD60A" />
          </View>
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle}>Quem é o Jogador?</Text>
            <Text style={styles.gameDesc}>Adivinhe pela silhueta do craque.</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#53605C" />
        </Pressable>

        {/* DIVISOR TÁTICO */}
        <View style={styles.divider} />

        {/* ÁREA DA LOJA / PACOTE */}
        <View style={styles.packSection}>
          <Text style={styles.packSectionTitle}>ÁREA DE RECOMPENSAS</Text>
          <Text style={styles.packSectionDesc}>Use seus pontos para conseguir novas figurinhas.</Text>
          
          <Pressable 
            style={[styles.packButton, score < 30 && styles.packButtonDisabled]} 
            onPress={handleOpenPack}
            disabled={isOpening}
          >
            {isOpening ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                <FontAwesome5 
                  name="box-open" 
                  size={20} 
                  color={score >= 30 ? "#000" : "#555"} 
                  style={{ marginRight: 10 }} 
                />
                <Text style={[styles.packButtonText, score < 30 && styles.packButtonTextDisabled]}>
                  ABRIR NOVO PACOTE (30 PTS)
                </Text>
              </>
            )}
          </Pressable>
        </View>

      </ScrollView>

      {/* MENU INFERIOR */}
      <BottomMenu onNavigate={onNavigate} />
    </View>
  );
}

