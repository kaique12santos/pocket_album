import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  cardBase: { width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: 10 },
  cardAbsolute: { position: 'absolute', top: 0, left: 0 },
  cardFill: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', borderRadius: 10, borderWidth: 1, borderColor: '#333' },
  backText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  cardText: { color: '#fff', fontWeight: '900', fontSize: 10, marginTop: 5, textAlign: 'center', paddingHorizontal: 2 }
});