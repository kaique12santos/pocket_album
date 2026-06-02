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
    height: 78,
    alignSelf: 'center',
    backgroundColor: '#2D3133',
    borderBottomWidth: 2,
    borderBottomColor: '#006B35',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
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

  headerTitle: {
    color: '#FFD60A',
    fontSize: 26,
    lineHeight: 30,
    fontFamily: 'Anybody_900Black',
  },

  scroll: {
    flex: 1,
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
    backgroundColor: '#111512',
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 118,
  },

  hero: {
    minHeight: 330,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#31593A',
    borderBottomColor: '#CDEED3',
    borderBottomWidth: 2,
    backgroundColor: '#12351F',
  },

  heroImage: {
    opacity: 0.44,
  },

  heroShade: {
    flex: 1,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 31,
    lineHeight: 36,
    textAlign: 'center',
    fontFamily: 'Anybody_900Black',
  },

  heroSubtitle: {
    color: '#FFD60A',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'ArchivoNarrow_700Bold',
    marginTop: 8,
  },

  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },

  shortcutCard: {
    width: '48.4%',
    minHeight: 82,
    borderRadius: 8,
    backgroundColor: '#25292B',
    borderWidth: 1,
    borderColor: '#303638',
    borderBottomWidth: 2,
    borderBottomColor: '#68766C',
    padding: 12,
    justifyContent: 'space-between',
  },

  nativeIcon: {
    color: '#FFD60A',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Anybody_900Black',
  },

  shortcutText: {
    color: '#F7F3D8',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Anybody_800ExtraBold',
  },

  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },

  summaryCard: {
    width: '48.4%',
    minHeight: 58,
    borderRadius: 8,
    backgroundColor: '#12351F',
    borderWidth: 1,
    borderColor: '#31593A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  summaryText: {
    color: '#FFD60A',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Anybody_800ExtraBold',
  },

  section: {
    marginTop: 24,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 29,
    fontFamily: 'Anybody_900Black',
    marginBottom: 10,
  },

  wideImage: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31593A',
    backgroundColor: '#12351F',
  },

  hostGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  hostCard: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: '#006B35',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  hostText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Anybody_800ExtraBold',
  },

  stadiumCard: {
    minHeight: 124,
    flexDirection: 'row',
    gap: 12,
    borderRadius: 8,
    backgroundColor: '#25292B',
    borderWidth: 1,
    borderColor: '#303638',
    padding: 10,
    marginBottom: 10,
  },

  stadiumImage: {
    width: 112,
    height: 104,
    borderRadius: 7,
    backgroundColor: '#12351F',
  },

  stadiumInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  cardEyebrow: {
    color: '#FFD60A',
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'ArchivoNarrow_700Bold',
    textTransform: 'uppercase',
  },

  cardTitle: {
    color: '#F7F3D8',
    fontSize: 17,
    lineHeight: 20,
    fontFamily: 'Anybody_800ExtraBold',
    marginTop: 2,
  },

  cardText: {
    color: '#AFC3B4',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'ArchivoNarrow_600SemiBold',
    marginTop: 2,
  },

  confederationCard: {
    borderRadius: 8,
    backgroundColor: '#25292B',
    borderWidth: 1,
    borderColor: '#303638',
    padding: 12,
    marginBottom: 10,
  },

  confederationTitle: {
    color: '#FFD60A',
    fontSize: 19,
    lineHeight: 23,
    fontFamily: 'Anybody_900Black',
    marginBottom: 5,
  },

  teamList: {
    color: '#C9D9CE',
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'ArchivoNarrow_600SemiBold',
  },

  groupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  groupCard: {
    width: '48.4%',
    minHeight: 150,
    borderRadius: 8,
    backgroundColor: '#12351F',
    borderWidth: 1,
    borderColor: '#31593A',
    padding: 11,
  },

  groupTitle: {
    color: '#FFD60A',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Anybody_900Black',
    marginBottom: 7,
  },

  groupTeam: {
    color: '#E9F4E9',
    fontSize: 15,
    lineHeight: 19,
    fontFamily: 'ArchivoNarrow_700Bold',
  },

  featureImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31593A',
    backgroundColor: '#12351F',
  },

  ballImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31593A',
    backgroundColor: '#F4F4F4',
  },

  sectionText: {
    color: '#C9D9CE',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'ArchivoNarrow_600SemiBold',
    marginTop: 10,
  },

  backTopButton: {
    alignSelf: 'flex-end',
    minHeight: 34,
    borderRadius: 8,
    backgroundColor: '#12351F',
    borderWidth: 1,
    borderColor: '#31593A',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  backTopText: {
    color: '#FFD60A',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'ArchivoNarrow_700Bold',
  },
});
