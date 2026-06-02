import { useRef, useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import {
  FaFutbol,
  FaGlobeAmericas,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaPaw,
  FaShieldAlt,
  FaStar,
} from 'react-icons/fa';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './styles';

const logoImage = require('../../../assets/wc26-logo-bgr.png');
const heroBackgroundImage = require('../../../assets/wc26-background.png');
const hostImage = require('../../../assets/based-countries.png');
const mascotsImage = require('../../../assets/mascosts.png');
const ballImage = require('../../../assets/match-ball.jpg');

const stadiumImages = {
  'AT&T Stadium': require('../../../assets/stadiums/att-stadium.jpg'),
  'MetLife Stadium': require('../../../assets/stadiums/metlife-stadium.png'),
  'Mercedes-Benz Stadium': require('../../../assets/stadiums/Mercedes_Benz_Stadium.jpg'),
  'Arrowhead Stadium': require('../../../assets/stadiums/Arrowhead_Stadium.jpg'),
  'NRG Stadium': require('../../../assets/stadiums/Nrg_stadium.jpg'),
  "Levi's Stadium": require("../../../assets/stadiums/Levi's_Stadium.jpg"),
  'SoFi Stadium': require('../../../assets/stadiums/SoFi_Stadium_2023.jpg'),
  'Lincoln Financial Field': require('../../../assets/stadiums/Lincoln_Financial_Field.jpg'),
  'Lumen Field': require('../../../assets/stadiums/Lumen-field.jpg'),
  'Gillette Stadium': require('../../../assets/stadiums/Gillette_Stadium.jpg'),
  'Hard Rock Stadium': require('../../../assets/stadiums/Hard_Rock_Stadium.jpg'),
  'Estadio Azteca': require('../../../assets/stadiums/Estadio_Azteca.jpg'),
  'Estadio BBVA': require('../../../assets/stadiums/Estadio_BBVA.jpeg'),
  'Estadio Akron': require('../../../assets/stadiums/Estadio_Akron.jpg'),
  'BC Place': require('../../../assets/stadiums/BC_Place.jpg'),
  'BMO Field': require('../../../assets/stadiums/Toronto_BMO_Field.jpg'),
};

const shortcuts = [
  { label: 'Países-Sede', key: 'hosts', Icon: FaMapMarkedAlt },
  { label: 'Estádios', key: 'stadiums', Icon: FaShieldAlt },
  { label: 'Participantes', key: 'participants', Icon: FaGlobeAmericas },
  { label: 'Grupos', key: 'groups', Icon: FaLayerGroup },
  { label: 'Mascotes', key: 'mascots', Icon: FaPaw },
  { label: 'Bola Oficial', key: 'ball', Icon: FaFutbol },
];

const summary = ['3 países-sede', '16 estádios', '48 seleções', '12 grupos'];

const hosts = ['Canadá', 'Estados Unidos', 'México'];

const stadiums = [
  { city: 'Dallas', stadium: 'AT&T Stadium', country: 'Estados Unidos', capacity: '94.000' },
  { city: 'New York/New Jersey', stadium: 'MetLife Stadium', country: 'Estados Unidos', capacity: '82.500' },
  { city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', country: 'Estados Unidos', capacity: '75.000' },
  { city: 'Kansas City', stadium: 'Arrowhead Stadium', country: 'Estados Unidos', capacity: '73.000' },
  { city: 'Houston', stadium: 'NRG Stadium', country: 'Estados Unidos', capacity: '72.000' },
  { city: 'San Francisco Bay Area', stadium: "Levi's Stadium", country: 'Estados Unidos', capacity: '71.000' },
  { city: 'Los Angeles', stadium: 'SoFi Stadium', country: 'Estados Unidos', capacity: '70.000' },
  { city: 'Philadelphia', stadium: 'Lincoln Financial Field', country: 'Estados Unidos', capacity: '69.000' },
  { city: 'Seattle', stadium: 'Lumen Field', country: 'Estados Unidos', capacity: '69.000' },
  { city: 'Boston', stadium: 'Gillette Stadium', country: 'Estados Unidos', capacity: '65.000' },
  { city: 'Miami', stadium: 'Hard Rock Stadium', country: 'Estados Unidos', capacity: '65.000' },
  { city: 'Cidade do México', stadium: 'Estadio Azteca', country: 'México', capacity: '83.000' },
  { city: 'Monterrey', stadium: 'Estadio BBVA', country: 'México', capacity: '53.500' },
  { city: 'Guadalajara', stadium: 'Estadio Akron', country: 'México', capacity: '48.000' },
  { city: 'Vancouver', stadium: 'BC Place', country: 'Canadá', capacity: '54.000' },
  { city: 'Toronto', stadium: 'BMO Field', country: 'Canadá', capacity: '45.000' },
];

const groups = [
  ['Grupo A', ['México', 'África do Sul', 'Coreia do Sul', 'República Tcheca']],
  ['Grupo B', ['Canadá', 'Bósnia e Herzegovina', 'Catar', 'Suíça']],
  ['Grupo C', ['Brasil', 'Marrocos', 'Haiti', 'Escócia']],
  ['Grupo D', ['Estados Unidos', 'Paraguai', 'Austrália', 'Turquia']],
  ['Grupo E', ['Alemanha', 'Curaçao', 'Costa do Marfim', 'Equador']],
  ['Grupo F', ['Holanda', 'Japão', 'Suécia', 'Tunísia']],
  ['Grupo G', ['Bélgica', 'Egito', 'Irã', 'Nova Zelândia']],
  ['Grupo H', ['Espanha', 'Cabo Verde', 'Arábia Saudita', 'Uruguai']],
  ['Grupo I', ['França', 'Senegal', 'Iraque', 'Noruega']],
  ['Grupo J', ['Argentina', 'Argélia', 'Áustria', 'Jordânia']],
  ['Grupo K', ['Portugal', 'RD Congo', 'Uzbequistão', 'Colômbia']],
  ['Grupo L', ['Inglaterra', 'Croácia', 'Gana', 'Panamá']],
];

const participants = [
  ['AFC', ['Austrália', 'Irã', 'Iraque', 'Japão', 'Jordânia', 'Catar', 'Arábia Saudita', 'Coreia do Sul', 'Uzbequistão']],
  ['CAF', ['Argélia', 'Cabo Verde', 'RD Congo', 'Egito', 'Gana', 'Costa do Marfim', 'Marrocos', 'Senegal', 'África do Sul', 'Tunísia']],
  ['CONCACAF', ['Canadá', 'Curaçao', 'Haiti', 'México', 'Panamá', 'Estados Unidos']],
  ['CONMEBOL', ['Argentina', 'Brasil', 'Colômbia', 'Equador', 'Paraguai', 'Uruguai']],
  ['OFC', ['Nova Zelândia']],
  ['UEFA', ['Áustria', 'Bélgica', 'Bósnia e Herzegovina', 'Croácia', 'República Tcheca', 'Inglaterra', 'França', 'Alemanha', 'Holanda', 'Noruega', 'Portugal', 'Escócia', 'Espanha', 'Suécia', 'Suíça', 'Turquia']],
];

function HeaderIcon({ Icon }) {
  if (Platform.OS !== 'web') {
    return <Text style={styles.nativeIcon}>*</Text>;
  }

  return <Icon color="#FFD60A" size={20} />;
}

function BackToTop({ onPress }) {
  return (
    <Pressable style={styles.backTopButton} onPress={onPress}>
      <Text style={styles.backTopText}>Voltar ao topo</Text>
    </Pressable>
  );
}

export default function WorldCup26({ onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const positions = useRef({});

  const scrollToSection = (key) => {
    const y = positions.current[key] || 0;
    scrollRef.current?.scrollTo({ y: Math.max(y - 10, 0), animated: true });
  };

  const savePosition = (key, event) => {
    positions.current[key] = event.nativeEvent.layout.y;
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
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
        <Text style={styles.headerTitle}>Copa 2026</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground source={heroBackgroundImage} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroShade}>
            <Image source={logoImage} style={styles.logo} resizeMode="contain" />
            <Text style={styles.heroTitle}>Copa do Mundo 2026</Text>
            <Text style={styles.heroSubtitle}>Canadá • Estados Unidos • México</Text>
          </View>
        </ImageBackground>

        <View style={styles.shortcutGrid}>
          {shortcuts.map((item) => (
            <Pressable key={item.key} style={styles.shortcutCard} onPress={() => scrollToSection(item.key)}>
              <HeaderIcon Icon={item.Icon} />
              <Text style={styles.shortcutText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.summaryGrid}>
          {summary.map((item) => (
            <View key={item} style={styles.summaryCard}>
              <Text style={styles.summaryText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section} onLayout={(event) => savePosition('hosts', event)}>
          <Text style={styles.sectionTitle}>Países-sede</Text>
          <Image source={hostImage} style={styles.wideImage} resizeMode="cover" />
          <View style={styles.hostGrid}>
            {hosts.map((host) => (
              <View key={host} style={styles.hostCard}>
                <Text style={styles.hostText}>{host}</Text>
              </View>
            ))}
          </View>
          <BackToTop onPress={scrollToTop} />
        </View>

        <View style={styles.section} onLayout={(event) => savePosition('stadiums', event)}>
          <Text style={styles.sectionTitle}>Estádios</Text>
          {stadiums.map((item) => (
            <View key={`${item.city}-${item.stadium}`} style={styles.stadiumCard}>
              <Image source={stadiumImages[item.stadium]} style={styles.stadiumImage} resizeMode="cover" />
              <View style={styles.stadiumInfo}>
                <Text style={styles.cardEyebrow}>{item.country}</Text>
                <Text style={styles.cardTitle}>{item.stadium}</Text>
                <Text style={styles.cardText}>{item.city}</Text>
                <Text style={styles.cardText}>Capacidade: {item.capacity}</Text>
              </View>
            </View>
          ))}
          <BackToTop onPress={scrollToTop} />
        </View>

        <View style={styles.section} onLayout={(event) => savePosition('participants', event)}>
          <Text style={styles.sectionTitle}>Países Participantes</Text>
          {participants.map(([confederation, teams]) => (
            <View key={confederation} style={styles.confederationCard}>
              <Text style={styles.confederationTitle}>{confederation}</Text>
              <Text style={styles.teamList}>{teams.join(' • ')}</Text>
            </View>
          ))}
          <BackToTop onPress={scrollToTop} />
        </View>

        <View style={styles.section} onLayout={(event) => savePosition('groups', event)}>
          <Text style={styles.sectionTitle}>Grupos</Text>
          <View style={styles.groupGrid}>
            {groups.map(([group, teams]) => (
              <View key={group} style={styles.groupCard}>
                <Text style={styles.groupTitle}>{group}</Text>
                {teams.map((team) => (
                  <Text key={team} style={styles.groupTeam}>{team}</Text>
                ))}
              </View>
            ))}
          </View>
          <BackToTop onPress={scrollToTop} />
        </View>

        <View style={styles.section} onLayout={(event) => savePosition('mascots', event)}>
          <Text style={styles.sectionTitle}>Mascotes</Text>
          <Image source={mascotsImage} style={styles.featureImage} resizeMode="cover" />
          <Text style={styles.sectionText}>
            Os mascotes oficiais da Copa do Mundo 2026 são Maple, Zayu e Clutch. Cada um representa um dos países-sede: Canadá, México e Estados Unidos.
          </Text>
          <BackToTop onPress={scrollToTop} />
        </View>

        <View style={styles.section} onLayout={(event) => savePosition('ball', event)}>
          <Text style={styles.sectionTitle}>Bola Oficial</Text>
          <Image source={ballImage} style={styles.ballImage} resizeMode="contain" />
          <Text style={styles.sectionText}>
            A bola oficial da Copa do Mundo 2026 é a Adidas Trionda. Seu design usa vermelho, verde e azul, cores associadas aos três países-sede.
          </Text>
          <BackToTop onPress={scrollToTop} />
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
