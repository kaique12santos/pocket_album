import {StyleSheet} from 'react-native';
export default StyleSheet.create({ 
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' }, 
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  title: { color: '#00C851', fontSize: 32, fontWeight: '900', fontStyle: 'italic', letterSpacing: -1, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  subtitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 5, letterSpacing: 1, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  formContainer: { backgroundColor: '#161618', padding: 25, borderRadius: 12, borderWidth: 1, borderColor: '#333', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 10 },
  
  // Caixas de Mensagem
  errorBox: { backgroundColor: 'rgba(255, 68, 68, 0.1)', borderColor: '#ff4444', borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 20 },
  errorText: { color: '#ff4444', fontWeight: 'bold', fontSize: 13 },
  successBox: { backgroundColor: 'rgba(0, 200, 81, 0.1)', borderColor: '#00C851', borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 20 },
  successText: { color: '#00C851', fontWeight: 'bold', fontSize: 13 },

  inputGroup: { marginBottom: 20 },
  passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#fff', fontSize: 12, fontWeight: '900', marginBottom: 8, letterSpacing: 0.5 },
  forgotPassword: { color: '#aaa', fontSize: 12, fontWeight: 'bold' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, height: 55 },
  icon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, color: '#000', fontSize: 16, fontWeight: '600', height: '100%' },
  mainButton: { backgroundColor: '#FFDF00', borderRadius: 8, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  mainButtonText: { color: '#000', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  footer: { marginTop: 30, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 10, borderRadius: 20, paddingHorizontal: 20 },
  switchText: { color: '#ccc', fontSize: 14, fontWeight: 'bold' },
  switchTextHighlight: { color: '#FFDF00' }
});