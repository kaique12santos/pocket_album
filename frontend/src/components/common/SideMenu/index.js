import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import {
  FaBookOpen,
  FaFlag,
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaSignOutAlt,
  FaStar,
} from 'react-icons/fa';
import styles from './styles';

const menuItems = [
  { key: 'home', label: 'Pagina Inicial', Icon: FaHome, target: 'home' },
  { key: 'album', label: 'Meu Album', Icon: FaBookOpen },
  { key: 'brasil', label: 'Brasil Penta', Icon: FaFlag, target: 'brasil' },
  { key: 'quiz', label: 'Quiz Craque', Icon: FaStar },
  { key: 'guess-player', label: 'Quem e esse jogador', Icon: FaQuestionCircle, target: 'guess-player' },
  { key: 'about', label: 'Info sobre o App', Icon: FaInfoCircle, separated: true, target: 'about' },
];

function MenuIcon({ Icon }) {
  if (Platform.OS !== 'web') {
    return <Text style={styles.nativeIcon}>o</Text>;
  }

  return (
    <View style={styles.iconSlot}>
      <Icon color="rgba(213, 255, 224, 0.58)" size={16} />
    </View>
  );
}

export default function SideMenu({ visible, onClose, onNavigate, onSignOut }) {
  const [shouldRender, setShouldRender] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;

  const handleItemPress = (target) => {
    if (target && onNavigate) {
      onNavigate(target);
    }

    onClose();
  };

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !visible) {
        setShouldRender(false);
      }
    });
  }, [progress, visible]);

  if (!shouldRender) return null;

  const menuTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-252, 0],
  });

  const overlayOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} style={styles.root}>
      <Animated.View style={[styles.backdrop, { opacity: overlayOpacity }]}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.menu, { transform: [{ translateX: menuTranslate }] }]}>
        <View style={styles.edgeShadow} />

        <TouchableOpacity activeOpacity={0.75} onPress={onClose} style={styles.closeButton}>
          <View style={[styles.closeLine, styles.closeLineLeft]} />
          <View style={[styles.closeLine, styles.closeLineRight]} />
        </TouchableOpacity>

        <View style={styles.profileBlock}>
          <View style={styles.avatar}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarBody} />
          </View>

          <Text style={styles.username}>STRIKER99</Text>
        </View>

        <View style={styles.links}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.75}
              onPress={() => handleItemPress(item.target)}
              style={[
                styles.link,
                item.separated && styles.separatedLink,
              ]}
            >
              <MenuIcon Icon={item.Icon} />
              <Text style={styles.linkText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.logoutButton} onPress={onSignOut}>
          {Platform.OS === 'web' ? (
            <FaSignOutAlt color="#FFD1C8" size={16} />
          ) : (
            <Text style={styles.logoutNativeIcon}>o</Text>
          )}
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>POCKET ALBUM V2.4.0</Text>
      </Animated.View>
    </View>
  );
}
