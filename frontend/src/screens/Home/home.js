import { useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Criamos pequenos "envelopes" para não termos de alterar o resto do código do Miguel!
const FaBookOpen = (props) => <FontAwesome5 name="book-open" {...props} />;
const FaFlag = (props) => <FontAwesome5 name="flag" {...props} />;
const FaInfoCircle = (props) => <FontAwesome5 name="info-circle" {...props} />;
const FaQuestionCircle = (props) => <FontAwesome5 name="question-circle" {...props} />;
const FaSearch = (props) => <FontAwesome5 name="search" {...props} />;
const FaTrophy = (props) => <FontAwesome5 name="trophy" {...props} />;
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
    target: 'world-cup-26',
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
    target: 'quiz', // <-- ADICIONADO AQUI
  },
  {
    key: 'guess',
    Icon: FaSearch,
    title: 'Quem e o\nJogador?',
    variant: 'dark',
    target: 'who-is-that-player', // <-- DIRECIONANDO PARA A NOSSA TELA SKIA
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

          {/* <-- ADICIONADO O ONPRESS NO BOTÃO DO ÁLBUM --> */}
          <Pressable style={styles.albumCard} onPress={() => onNavigate && onNavigate('album')}>
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