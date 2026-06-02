import { useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import {
  FaBookOpen,
  FaFlag,
  FaInfoCircle,
  FaQuestionCircle,
  FaSearch,
  FaTrophy,
} from 'react-icons/fa';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './styles';

const albumBackground = require('../../../assets/wc26-logo-bgr.png');
const pocketLogo = require('../../../assets/Pocket_Album-Logo-Bgr.png');

const cards = [
  {
    key: 'world-cup',
    Icon: FaTrophy,
    title: 'Copa 2026',
    variant: 'dark',
  },
  {
    key: 'brasil',
    Icon: FaFlag,
    eyebrow: 'selecao',
    title: 'Brasil Penta',
    variant: 'green',
    target: 'brasil',
  },
  {
    key: 'quiz',
    Icon: FaQuestionCircle,
    title: 'Quiz de\nCraque',
    variant: 'dark',
  },
  {
    key: 'guess',
    Icon: FaSearch,
    title: 'Quem e o\nJogador?',
    variant: 'dark',
    target: 'guess-player',
  },
];

function CardIcon({ Icon, color = '#FFD60A', fallback = 'o', size = 22 }) {
  if (Platform.OS !== 'web') {
    return <Text style={[styles.cardIcon, { color }]}>{fallback}</Text>;
  }

  return <Icon color={color} size={size} />;
}

export default function Home({ onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const goToAbout = () => {
    if (onNavigate) onNavigate('about');
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityLabel="Abrir menu"
          onPress={() => setMenuOpen(true)}
          style={styles.menuButton}
        >
          <View style={styles.menuButtonLine} />
          <View style={styles.menuButtonLine} />
          <View style={styles.menuButtonLine} />
        </Pressable>

        <Image source={pocketLogo} style={styles.brandLogo} resizeMode="contain" />
        <Text style={styles.brandTitle}>Pocket Album</Text>
      </View>

      <View style={styles.screenShell}>
        <View style={styles.leftRail} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {cards.map((card) => (
              <Pressable
                key={card.key}
                onPress={() => {
                  if (card.target && onNavigate) onNavigate(card.target);
                }}
                style={[
                  styles.card,
                  card.variant === 'green' && styles.cardHighlight,
                ]}
              >
                <View style={styles.cardIconBox}>
                  <CardIcon Icon={card.Icon} />
                </View>

                <View>
                  {card.eyebrow && <Text style={styles.cardEyebrow}>{card.eyebrow}</Text>}
                  <Text style={styles.cardTitle}>{card.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.albumCard}>
            <ImageBackground
              source={albumBackground}
              style={styles.albumBackground}
              imageStyle={styles.albumImage}
            >
              <View style={styles.albumIconBox}>
                <CardIcon Icon={FaBookOpen} color="#0B3B1D" fallback="A" size={24} />
              </View>

              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>Meu Album</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
                </View>
              </View>

              <Text style={styles.albumArrow}>{'>'}</Text>
            </ImageBackground>
          </Pressable>

          <View style={styles.bottomGrid}>
            <Pressable style={styles.card} onPress={goToAbout}>
              <View style={styles.cardIconBox}>
                <CardIcon Icon={FaInfoCircle} />
              </View>

              <Text style={styles.cardTitle}>Sobre o App</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={styles.rightRail}>
          {[0, 1, 2, 3, 4, 5].map((dot) => (
            <View key={dot} style={styles.railDot} />
          ))}
        </View>
      </View>

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
