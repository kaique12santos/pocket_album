import {StyleSheet} from 'react-native';
export default StyleSheet.create({ 
  safeArea: { flex: 1, width: '100%', backgroundColor: '#181818' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  loadingText: { color: '#FFD60A', marginTop: 10, fontFamily: 'ArchivoNarrow_700Bold' },

  header: { width: '100%', maxWidth: 390, alignSelf: 'center', backgroundColor: '#2D3133', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111512', borderWidth: 1, borderColor: '#303638', borderRadius: 8, paddingHorizontal: 15, height: 45 },
  searchInput: { flex: 1, color: '#F7F3D8', fontFamily: 'ArchivoNarrow_400Regular', fontSize: 16, outlineStyle: 'none' },
  statsText: { color: '#F7F3D8', fontFamily: 'ArchivoNarrow_400Regular', fontSize: 14, textAlign: 'center', marginTop: 15 },
  statsHighlight: { color: '#00642F', fontFamily: 'Anybody_900Black' },

  pageController: { width: '100%', maxWidth: 390, alignSelf: 'center', backgroundColor: '#00642F', borderBottomWidth: 2, borderBottomColor: '#CDEED3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 12 },
  pageTitle: { color: '#FFD60A', fontFamily: 'Anybody_900Black', fontSize: 18, letterSpacing: 1 },
  arrowBtn: { padding: 5 },

  screenShell: { flex: 1, maxWidth: 390, width: '100%', alignSelf: 'center', backgroundColor: '#111512', flexDirection: 'row' },
  leftRail: { width: 24, borderRightWidth: 2, borderRightColor: '#53605C', backgroundColor: '#191D1F' },
  rightRail: { width: 18, borderLeftWidth: 2, borderLeftColor: '#53605C', backgroundColor: '#191D1F', alignItems: 'center', paddingTop: 20, gap: 45 },
  railDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#7D8582' },
  content: { paddingTop: 20, paddingHorizontal: 15, paddingBottom: 100 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  slotWrapper: { width: '47%', aspectRatio: 0.7, marginBottom: 5 },
  
  lockedSlot: { flex: 1, backgroundColor: '#191D1F', borderWidth: 2, borderColor: '#303638', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  lockedNumber: { color: '#53605C', fontFamily: 'Anybody_800ExtraBold', fontSize: 20 },

  unlockedSlot: { flex: 1, backgroundColor: '#25292B', borderWidth: 1, borderColor: '#087A3B', borderRadius: 8, overflow: 'hidden' },
  stickerImage: { flex: 1, width: '100%' },
  nameTag: { backgroundColor: '#00642F', paddingVertical: 6, alignItems: 'center', borderTopWidth: 2, borderTopColor: '#CDEED3' },
  nameText: { color: '#F7F3D8', fontFamily: 'ArchivoNarrow_700Bold', fontSize: 10, textTransform: 'uppercase' }
});