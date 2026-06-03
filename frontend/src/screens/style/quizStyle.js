import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  scoreText: { color: '#FFDF00', fontSize: 18, fontFamily: 'Anybody_900Black' },
  questionCounter: { color: '#888', fontSize: 16, fontFamily: 'Anybody_800ExtraBold' },
  timerContainer: { height: 8, backgroundColor: '#222', borderRadius: 4, overflow: 'hidden', marginBottom: 40 },
  timerBar: { height: '100%', borderRadius: 4, shadowColor: '#00FFFF', shadowOpacity: 0.8, shadowRadius: 10 },
  questionCard: { backgroundColor: '#1a1a1a', padding: 25, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  questionText: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  optionsContainer: { gap: 15 },
  optionButton: { backgroundColor: '#222', padding: 18, borderRadius: 10, borderWidth: 2, borderColor: '#333' },
  optionText: { color: '#ccc', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  optionCorrect: { backgroundColor: 'rgba(0, 200, 81, 0.2)', borderColor: '#00C851' },
  textCorrect: { color: '#00C851' },
  optionWrong: { backgroundColor: 'rgba(255, 68, 68, 0.2)', borderColor: '#ff4444' },
  textWrong: { color: '#ff4444' },

  finishTitle: { color: '#FFDF00', fontSize: 32, fontFamily: 'Anybody_900Black', textAlign: 'center', marginBottom: 40 },
  scoreBoard: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#333', marginBottom: 40 },
  scoreRow: { color: '#fff', fontSize: 18, marginBottom: 10, textAlign: 'center' },
  highlight: { color: '#00C851', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 15 },
  totalScore: { color: '#FFDF00', fontSize: 24, fontFamily: 'Anybody_900Black', textAlign: 'center' },
  savedText: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 10, fontStyle: 'italic' },
  
  restartButton: { backgroundColor: '#FFD60A', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  restartButtonText: { color: '#000', fontSize: 16, fontFamily: 'Anybody_900Black' }
});