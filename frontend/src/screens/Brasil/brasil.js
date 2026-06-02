import { useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { FaBars, FaCrown, FaGlobeAmericas, FaStar, FaTrophy } from 'react-icons/fa';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './brasilstyle';

const flagImage = require('../../../assets/Brasil/Brasil.jpeg');
const cbfImage = require('../../../assets/Brasil/cbf.jpeg');
const epicCbfImage = require('../../../assets/Brasil/cbf-épica.png');
const legendsImage = require('../../../assets/Brasil/jogadores-épicos.png');
const zagalloImage = require('../../../assets/Brasil/zagalo.png');

const stats = [
  { label: '5 titulos mundiais', Icon: FaTrophy },
  { label: '22 participacoes', Icon: FaGlobeAmericas },
  { label: 'Presente em todas as Copas', Icon: FaStar },
  { label: 'Maior campea da historia', Icon: FaCrown },
];

const cups = [
  { year: '1958', host: 'Suecia' },
  { year: '1962', host: 'Chile' },
  { year: '1970', host: 'Mexico' },
  { year: '1994', host: 'Estados Unidos' },
  { year: '2002', host: 'Coreia do Sul/Japao' },
];

function Icon({ IconComponent }) {
  if (Platform.OS !== 'web') {
    return <Text style={styles.nativeIcon}>*</Text>;
  }

  return <IconComponent color="#FFD60A" size={22} />;
}

export default function Brasil({ onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.safeArea}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityLabel="Abrir menu"
          onPress={() => setMenuOpen(true)}
          style={styles.menuButton}
        >
          {Platform.OS === 'web' ? (
            <FaBars color="#A7E5B2" size={30} />
          ) : (
            <>
              <View style={styles.menuButtonLine} />
              <View style={styles.menuButtonLine} />
              <View style={styles.menuButtonLine} />
            </>
          )}
        </Pressable>

        <Text style={styles.headerTitle}>Brasil</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={epicCbfImage}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroShade}>
            <View style={styles.heroSymbols}>
              <Image source={flagImage} style={styles.flag} resizeMode="cover" />
              <Image source={cbfImage} style={styles.cbfBadge} resizeMode="cover" />
            </View>

            <Text style={styles.heroTitle}>Brasil</Text>
            <Text style={styles.heroSubtitle}>Unico Pentacampeao Mundial</Text>
            <Text style={styles.heroText}>
              A Selecao Brasileira e a unica presente em todas as Copas do Mundo e a maior campea da historia da competicao.
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Icon IconComponent={stat.Icon} />
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cinco Copas do Mundo</Text>
          <Image source={epicCbfImage} style={styles.titlesBanner} resizeMode="cover" />

          <View style={styles.cupsList}>
            {cups.map((cup) => (
              <View key={cup.year} style={styles.cupItem}>
                <Text style={styles.cupYear}>{cup.year}</Text>
                <Text style={styles.cupHost}>{cup.host}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jogadores Lendarios</Text>
          <Image source={legendsImage} style={styles.featureImage} resizeMode="cover" />
          <Text style={styles.sectionText}>
            Pele, Garrincha, Romario, Ronaldo, Ronaldinho e Neymar ajudaram a construir a historia da Selecao Brasileira.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zagallo</Text>
          <Text style={styles.sectionSubtitle}>O Maior Campeao da Historia das Copas</Text>
          <Image source={zagalloImage} style={styles.zagalloImage} resizeMode="cover" />
          <Text style={styles.sectionText}>
            Zagallo conquistou Copas do Mundo como jogador, treinador e coordenador tecnico, tornando-se uma das figuras mais importantes da historia do futebol mundial.
          </Text>
        </View>
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
