import { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuthStore } from './src/store/useAuthStore';
import AuthScreen from './src/screens/AuthScreen';

export default function App() {
  const { session, loading, initAuthListener, signOut } = useAuthStore();

  useEffect(() => {
    initAuthListener();
  }, []);

  if (loading && !session) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {session ? (
        <View style={styles.dashboard}>
          <Text style={styles.successText}>✅ Autenticado!</Text>
          <Text style={styles.subText}>Bem-vindo, {session.user.email}</Text>
          
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AuthScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', padding: 20 },
  dashboard: { alignItems: 'center' },
  successText: { color: '#00C851', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subText: { color: '#aaa', fontSize: 16, marginBottom: 30 },
  logoutButton: { backgroundColor: '#ff4444', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: 'bold' }
});