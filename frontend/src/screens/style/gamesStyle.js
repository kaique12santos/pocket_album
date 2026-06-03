import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#181818' },
  
  header: { backgroundColor: '#2D3133', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#006B35' },
  headerTitle: { color: '#FFD60A', fontSize: 24, fontFamily: 'Anybody_900Black' },
  headerSubtitle: { color: '#A7E5B2', fontSize: 14, fontFamily: 'ArchivoNarrow_400Regular', marginTop: 5 },

  content: { padding: 20, paddingBottom: 100 },

  scoreBoard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00642F', borderRadius: 12, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: '#087A3B' },
  scoreInfo: { marginLeft: 15 },
  scoreLabel: { color: '#CDEED3', fontSize: 12, fontFamily: 'ArchivoNarrow_700Bold', letterSpacing: 1 },
  scoreValue: { color: '#FFD60A', fontSize: 32, fontFamily: 'Anybody_900Black', lineHeight: 35 },
  scorePts: { fontSize: 16, color: '#A7E5B2' },

  sectionTitle: { color: '#7D8582', fontSize: 12, fontFamily: 'ArchivoNarrow_700Bold', letterSpacing: 1, marginBottom: 15 },

  gameCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#25292B', borderRadius: 10, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#303638' },
  gameIconBox: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#111512', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  gameInfo: { flex: 1 },
  gameTitle: { color: '#F7F3D8', fontSize: 16, fontFamily: 'Anybody_800ExtraBold', marginBottom: 3 },
  gameDesc: { color: '#7D8582', fontSize: 12, fontFamily: 'ArchivoNarrow_400Regular' },

  divider: { height: 2, backgroundColor: '#2D3133', marginVertical: 25 },

  packSection: { backgroundColor: '#111512', borderRadius: 12, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#303638', borderStyle: 'dashed' },
  packSectionTitle: { color: '#FFD60A', fontSize: 16, fontFamily: 'Anybody_800ExtraBold', marginBottom: 5 },
  packSectionDesc: { color: '#7D8582', fontSize: 13, fontFamily: 'ArchivoNarrow_400Regular', textAlign: 'center', marginBottom: 20 },
  
  packButton: { flexDirection: 'row', backgroundColor: '#FFD60A', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, alignItems: 'center', width: '100%', justifyContent: 'center' },
  packButtonText: { color: '#000', fontSize: 16, fontFamily: 'Anybody_900Black' },
  
  // Estilos Condicionais para Saldo Insuficiente
  packButtonDisabled: { backgroundColor: '#333', borderColor: '#555', borderWidth: 1 },
  packButtonTextDisabled: { color: '#888' }
});