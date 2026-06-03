import {StyleSheet} from 'react-native';
export default StyleSheet.create({ 
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Empurra o conteúdo para o fundo da tela
  },
  gradientOverlay: {
    paddingBottom: 60, // Espaço do fundo da tela
    paddingHorizontal: 20,
    alignItems: 'center',
    // Um leve sombreado preto atrás do botão para dar contraste com a torcida
    backgroundColor: 'rgba(0,0,0,0.3)', 
    paddingTop: 40,
  },
  startButton: {
    backgroundColor: '#FFDF00', // O amarelo/dourado da nossa paleta
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FFDF00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // Sombra para Android
  },
  startButtonText: {
    color: '#0a0a0a', // Texto quase preto para contraste máximo com o botão dourado
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  }
});