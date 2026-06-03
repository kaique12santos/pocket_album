import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#181818',
  },

  centerContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
    backgroundColor: '#111512',
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gameContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
    backgroundColor: '#111512',
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 118,
    alignItems: 'center',
  },

  menuButton: {
    position: 'absolute',
    top: 18,
    left: 18,
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

  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 27,
    lineHeight: 32,
    fontFamily: 'Anybody_900Black',
    marginTop: 42,
    marginBottom: 14,
  },

  progress: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#A7E5B2',
    backgroundColor: 'transparent',
  },

  progressDotCurrent: {
    borderColor: '#FFD60A',
  },

  progressDotCorrect: {
    borderColor: '#00C851',
    backgroundColor: '#00C851',
  },

  progressDotWrong: {
    borderColor: '#E84A4A',
    backgroundColor: '#E84A4A',
  },

  introText: {
    color: '#C9D9CE',
    textAlign: 'center',
    fontSize: 19,
    lineHeight: 24,
    fontFamily: 'ArchivoNarrow_600SemiBold',
    marginBottom: 28,
  },

  primaryButton: {
    minWidth: 188,
    minHeight: 56,
    borderRadius: 8,
    backgroundColor: '#FFD60A',
    borderBottomWidth: 3,
    borderBottomColor: '#A88F05',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  primaryButtonText: {
    color: '#102015',
    fontSize: 19,
    lineHeight: 22,
    fontFamily: 'Anybody_900Black',
  },

  roundLabel: {
    color: '#FFD60A',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Anybody_800ExtraBold',
    marginBottom: 12,
  },

  playerCard: {
    width: '100%',
    height: 292,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#12351F',
    borderWidth: 1,
    borderColor: '#31593A',
    borderBottomWidth: 2,
    borderBottomColor: '#CDEED3',
    marginBottom: 16,
  },

  playerImage: {
    width: '100%',
    height: '100%',
  },

  optionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  optionButton: {
    width: '48.4%',
    minHeight: 54,
    borderRadius: 8,
    backgroundColor: '#25292B',
    borderWidth: 1,
    borderColor: '#303638',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  optionCorrect: {
    backgroundColor: '#006B35',
    borderColor: '#00C851',
  },

  optionWrong: {
    backgroundColor: '#6E1F1F',
    borderColor: '#E84A4A',
  },

  optionDisabled: {
    opacity: 0.42,
  },

  optionText: {
    color: '#F7F3D8',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 20,
    fontFamily: 'Anybody_800ExtraBold',
  },

  feedbackBox: {
    width: '100%',
    marginTop: 18,
    backgroundColor: '#1F2627',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#31593A',
    padding: 14,
    alignItems: 'center',
  },

  feedbackText: {
    fontSize: 24,
    lineHeight: 29,
    fontFamily: 'Anybody_900Black',
    marginBottom: 12,
  },

  feedbackCorrect: {
    color: '#00C851',
  },

  feedbackWrong: {
    color: '#E84A4A',
  },

  nextButton: {
    minWidth: 152,
    minHeight: 46,
    borderRadius: 8,
    backgroundColor: '#FFD60A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  nextButtonText: {
    color: '#102015',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Anybody_900Black',
  },

  scoreCard: {
    width: 190,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#12351F',
    borderWidth: 1,
    borderColor: '#31593A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  score: {
    color: '#FFD60A',
    fontSize: 52,
    lineHeight: 58,
    fontFamily: 'Anybody_900Black',
  },

  scoreLabel: {
    color: '#C9D9CE',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'ArchivoNarrow_700Bold',
  },

  resultMessage: {
    color: '#F7F3D8',
    textAlign: 'center',
    fontSize: 19,
    lineHeight: 24,
    fontFamily: 'ArchivoNarrow_700Bold',
    marginBottom: 28,
  },
});
