import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './aboutstyle';

const pocketLogo = require('../../../assets/Pocket_Album-Logo-Bgr.png');
const ods4 = require('../../../assets/ods/ods 4.jpg');
const ods9 = require('../../../assets/ods/ods9.jpg');
const ods10 = require('../../../assets/ods/ods10.jpg');
const kaiquePhoto = require('../../../assets/dev/Kaique.jpeg');
const miguelPhoto = require('../../../assets/dev/Miguel.jpg');

const odsItems = [
  {
    title: 'ODS 4 - Educacao de Qualidade',
    image: ods4,
    text: 'O Pocket Album usa colecionaveis e minigames para tornar o aprendizado mais visual, leve e acessivel.',
  },
  {
    title: 'ODS 9 - Inovacao e Tecnologia',
    image: ods9,
    text: 'O projeto explora mobile, autenticacao e experiencia interativa para criar uma plataforma digital brasileira.',
  },
  {
    title: 'ODS 10 - Reducacao das Desigualdades',
    image: ods10,
    text: 'A proposta valoriza acesso, diversidade e uma experiencia simples para diferentes perfis de usuarios.',
  },
];

const developers = [
  {
    name: 'Kaique Caitano',
    role: 'Full-Stack Developer',
    image: kaiquePhoto,
  },
  {
    name: 'Miguel Gomes',
    role: 'Full-Stack Developer',
    image: miguelPhoto,
  },
];

export default function About({ onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <Text style={styles.headerTitle}>Sobre o App</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoPanel}>
          <Image source={pocketLogo} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.introText}>
          O Pocket Album e um album digital inspirado no universo da Copa do Mundo. A proposta mistura colecionaveis, desafios e informacao para criar uma experiencia mobile divertida, organizada e facil de explorar.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ODS do Projeto</Text>

          {odsItems.map((item) => (
            <View key={item.title} style={styles.odsItem}>
              <Image source={item.image} style={styles.odsImage} resizeMode="cover" />
              <View style={styles.odsInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conheca os Desenvolvedores</Text>

          {developers.map((developer) => (
            <View key={developer.name} style={styles.devItem}>
              <Image source={developer.image} style={styles.devImage} resizeMode="cover" />
              <View style={styles.devInfo}>
                <Text style={styles.itemTitle}>{developer.name}</Text>
                <Text style={styles.itemText}>{developer.role}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.version}>v0.1</Text>
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
