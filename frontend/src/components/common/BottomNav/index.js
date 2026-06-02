import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { FaBookOpen, FaFutbol, FaHome, FaInfoCircle } from 'react-icons/fa';
import styles from './styles';

const fifaBadge = require('../../../../assets/wc26-logo-bgr.png');

const items = [
  { key: 'home', label: 'Início', Icon: FaHome },
  { key: 'album', label: 'Album', Icon: FaBookOpen },
  { key: 'games', label: 'Jogos', Icon: FaFutbol },
  { key: 'info', label: 'Info', Icon: FaInfoCircle },
];

function MenuIcon({ Icon }) {
  if (Platform.OS !== 'web') {
    return <Text style={styles.nativeIcon}>o</Text>;
  }

  return <Icon color="#CDDAD5" size={22} />;
}

export default function BottomMenu({ onNavigate }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.centerBadge}
        onPress={() => {
          if (onNavigate) {
            onNavigate('world-cup-26');
          }
        }}
      >
        <View style={styles.centerCutout}>
          <View style={styles.centerStripe} />
          <Image source={fifaBadge} style={styles.centerImage} resizeMode="contain" />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.75}
            onPress={() => {
              if (item.key === 'home' && onNavigate) {
                onNavigate('home');
              }

              if (item.key === 'info' && onNavigate) {
                onNavigate('about');
              }

              if (item.key === 'games' && onNavigate) {
                onNavigate('guess-player');
              }
            }}
            style={[styles.item, index === 1 && styles.leftOfBadge, index === 2 && styles.rightOfBadge]}
          >
            <MenuIcon Icon={item.Icon} />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
