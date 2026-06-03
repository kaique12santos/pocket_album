import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#181818' },
  albumArea: { 
    height: height / 2, 
    backgroundColor: '#25292B', 
    alignItems: 'center', 
    paddingTop: 60, 
    borderBottomWidth: 4, 
    borderColor: '#006B35' 
  },
  title: { color: '#FFD60A', fontSize: 24, fontFamily: 'Anybody_900Black', marginBottom: 5 },
  subtitle: { color: '#A7E5B2', fontSize: 14, fontFamily: 'Anybody_800ExtraBold', marginBottom: 30 },
  slotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
  
  slot: { 
    width: 100, 
    height: 140, 
    borderWidth: 2, 
    borderColor: '#555', 
    borderStyle: 'dashed', 
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  
  inventoryArea: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexWrap: 'wrap', 
    gap: 10,
    paddingBottom: 90,
  },
  
  navButton: { 
    position: 'absolute', 
    bottom: 40, 
    alignSelf: 'center', 
    backgroundColor: '#FFD60A', 
    paddingHorizontal: 30,
    paddingVertical: 15, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000'
  },
  navButtonText: { fontFamily: 'Anybody_900Black', color: '#000', fontSize: 16 }
});