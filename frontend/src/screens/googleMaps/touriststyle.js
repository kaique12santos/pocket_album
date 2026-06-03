import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Fundo escuro como na foto
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#252525',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD60A', // Amarelo do App
    marginLeft: 20,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#A7E5B2',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  spotCard: {
    width: (width / 2) - 30, // Dois cards por linha
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  spotImage: {
    width: '100%',
    height: 120,
  },
  cardInfo: {
    padding: 10,
  },
  spotCountry: {
    fontSize: 10,
    color: '#A7E5B2',
    fontWeight: 'bold',
  },
  spotName: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotCity: {
    fontSize: 12,
    color: '#CCC',
    marginLeft: 5,
  }
});