import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#181818',
  },

  topBar: {
    width: '100%',
    maxWidth: 390,
    height: 92,
    alignSelf: 'center',
    backgroundColor: '#2D3133',
    borderBottomWidth: 2,
    borderBottomColor: '#006B35',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },

  menuButton: {
    width: 42,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  menuButtonLine: {
    width: 34,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#A7E5B2',
  },

  brandLogo: {
    width: 38,
    height: 38,
  },

  brandTitle: {
    flex: 1,
    color: '#FFD60A',
    fontSize: 25,
    lineHeight: 29,
    fontFamily: 'Anybody_900Black',
  },

  screenShell: {
    flex: 1,
    maxWidth: 390,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#111512',
    flexDirection: 'row',
  },

  leftRail: {
    width: 24,
    borderRightWidth: 2,
    borderRightColor: '#53605C',
    backgroundColor: '#191D1F',
  },

  rightRail: {
    width: 18,
    borderLeftWidth: 2,
    borderLeftColor: '#53605C',
    backgroundColor: '#191D1F',
    alignItems: 'center',
    paddingTop: 20,
    gap: 45,
  },

  railDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7D8582',
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 28,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  card: {
    width: '47.9%',
    minHeight: 134,
    backgroundColor: '#25292B',
    borderRadius: 8,
    padding: 13,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#303638',
    borderBottomColor: '#68766C',
    borderBottomWidth: 2,
  },

  cardHighlight: {
    backgroundColor: '#00642F',
    borderColor: '#087A3B',
    borderBottomColor: '#CDEED3',
  },

  cardIconBox: {
    width: 46,
    height: 46,
    borderRadius: 6,
    backgroundColor: '#073D1E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardIcon: {
    color: '#FFD60A',
    fontSize: 22,
    fontFamily: 'Anybody_900Black',
  },

  cardEyebrow: {
    color: '#9CE8B0',
    fontSize: 10,
    fontFamily: 'ArchivoNarrow_700Bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },

  cardTitle: {
    color: '#F7F3D8',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Anybody_800ExtraBold',
  },

  albumCard: {
    height: 100,
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#31593A',
    borderBottomColor: '#CDEED3',
    borderBottomWidth: 2,
    backgroundColor: '#12351F',
  },

  albumBackground: {
    flex: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  albumImage: {
    opacity: 0.22,
    resizeMode: 'cover',
  },

  albumIconBox: {
    width: 46,
    height: 52,
    borderRadius: 7,
    backgroundColor: '#C7EFD1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  albumInfo: {
    flex: 1,
  },

  albumTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 31,
    fontFamily: 'Anybody_900Black',
  },

  progressBar: {
    width: 92,
    height: 5,
    marginTop: 7,
    backgroundColor: '#24472F',
    overflow: 'hidden',
  },

  progressFill: {
    width: '48%',
    height: '100%',
    backgroundColor: '#A7E5B2',
  },

  albumArrow: {
    color: '#FFD60A',
    fontSize: 22,
    fontFamily: 'Anybody_900Black',
    marginLeft: 8,
  },

  bottomGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
});
