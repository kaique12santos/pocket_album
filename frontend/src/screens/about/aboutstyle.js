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
    gap: 14,
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
    color: '#F7F3D8',
    fontSize: 24,
    lineHeight: 28,
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
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 28,
  },

  logoPanel: {
    width: 118,
    height: 118,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#1F2627',
    borderWidth: 1,
    borderColor: '#31593A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  logo: {
    width: 92,
    height: 92,
  },

  introText: {
    color: '#C9D9CE',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'ArchivoNarrow_600SemiBold',
    marginBottom: 22,
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    color: '#F7F3D8',
    fontSize: 22,
    lineHeight: 26,
    fontFamily: 'Anybody_800ExtraBold',
    marginBottom: 14,
  },

  odsItem: {
    minHeight: 92,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#25292B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303638',
    padding: 10,
    marginBottom: 12,
  },

  odsImage: {
    width: 68,
    height: 68,
    borderRadius: 6,
    backgroundColor: '#12351F',
  },

  odsInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  itemTitle: {
    color: '#F7F3D8',
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Anybody_800ExtraBold',
    marginBottom: 3,
  },

  itemText: {
    color: '#AFC3B4',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'ArchivoNarrow_600SemiBold',
  },

  devItem: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },

  devImage: {
    width: 74,
    height: 74,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#31593A',
    backgroundColor: '#12351F',
  },

  devInfo: {
    flex: 1,
  },

  version: {
    color: '#7D8E82',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'ArchivoNarrow_700Bold',
    marginTop: 10,
  },
});
