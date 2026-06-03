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
    paddingBottom: 28,
  },

  hero: {
    minHeight: 360,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#31593A',
    borderBottomColor: '#CDEED3',
    borderBottomWidth: 2,
    backgroundColor: '#12351F',
  },

  heroImage: {
    opacity: 0.74,
  },

  heroShade: {
    flex: 1,
    padding: 18,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },

  heroSymbols: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  flag: {
    width: 76,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 10, 0.55)',
  },

  cbfBadge: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: '#FFD60A',
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    lineHeight: 46,
    fontFamily: 'Anybody_900Black',
  },

  heroSubtitle: {
    color: '#FFD60A',
    fontSize: 19,
    lineHeight: 23,
    fontFamily: 'Anybody_800ExtraBold',
    marginTop: 4,
  },

  heroText: {
    color: '#E9F4E9',
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'ArchivoNarrow_600SemiBold',
    marginTop: 10,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },

  statCard: {
    width: '48.4%',
    minHeight: 92,
    backgroundColor: '#25292B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303638',
    padding: 12,
    justifyContent: 'space-between',
  },

  nativeIcon: {
    color: '#FFD60A',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Anybody_900Black',
  },

  statLabel: {
    color: '#F7F3D8',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Anybody_800ExtraBold',
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 29,
    fontFamily: 'Anybody_900Black',
    marginBottom: 10,
  },

  sectionSubtitle: {
    color: '#FFD60A',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Anybody_800ExtraBold',
    marginTop: -4,
    marginBottom: 10,
  },

  titlesBanner: {
    width: '100%',
    height: 210,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#31593A',
    marginBottom: 10,
  },

  cupsList: {
    gap: 8,
  },

  cupItem: {
    minHeight: 56,
    borderRadius: 8,
    backgroundColor: '#12351F',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD60A',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cupYear: {
    color: '#FFD60A',
    fontSize: 23,
    lineHeight: 27,
    fontFamily: 'Anybody_900Black',
  },

  cupHost: {
    color: '#E9F4E9',
    fontSize: 17,
    lineHeight: 21,
    fontFamily: 'ArchivoNarrow_700Bold',
  },

  featureImage: {
    width: '100%',
    height: 340,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31593A',
    backgroundColor: '#12351F',
  },

  zagalloImage: {
    width: '100%',
    height: 430,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31593A',
    backgroundColor: '#12351F',
  },

  sectionText: {
    color: '#C9D9CE',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'ArchivoNarrow_600SemiBold',
    marginTop: 10,
  },
});
