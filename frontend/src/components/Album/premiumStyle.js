import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#181818' },
  packImage: { width: 280, height: 350, justifyContent: 'center', alignItems: 'center' },
  centerWrapper: { alignItems: 'center' },
  instruction: { color: '#7D8582', fontSize: 14, marginBottom: 10, fontFamily: 'Anybody_800ExtraBold', letterSpacing: 2 },
  loadingSpinner: { position: 'absolute', top: '45%', left: '45%', zIndex: 10 },
  packOverlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 },
  packText: { color: '#F7F3D8', fontFamily: 'Anybody_900Black', fontSize: 26, letterSpacing: 4, textShadowColor: '#000', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 },
  progressContainer: { width: 220, height: 6, backgroundColor: '#25292B', borderRadius: 3, marginTop: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#303638' },
  progressBar: { height: '100%', backgroundColor: '#006B35' },
  cardsContainer: { alignItems: 'center', zIndex: 3 },
  cardsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  successText: { color: '#FFD60A', fontSize: 26, fontFamily: 'Anybody_900Black', marginBottom: 30, textShadowColor: '#087A3B', textShadowRadius: 10 },
  navButton: { marginTop: 50, backgroundColor: '#FFD60A', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 8, borderWidth: 1, borderColor: '#000' },
  navButtonText: { color: '#000', fontFamily: 'Anybody_900Black', fontSize: 16 }
});