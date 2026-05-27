// Tela provisoria para testar com o Zustand,
// depois pode ser substituida por uma tela mais elaborada
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Puxando do Zustand
  const { signIn, signUp, loading, error } = useAuthStore();

  const handleAuth = async () => {
    if (isLogin) {
      await signIn(email, password);
    } else {
      // Exige o username apenas no cadastro
      if (!username) return alert('Preencha um nome de usuário!');
      await signUp(email, password, username);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Entrar' : 'Criar Conta'}</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleAuth} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre aqui'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 400, padding: 20, backgroundColor: '#2a2a2a', borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  button: { backgroundColor: '#00C851', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  toggleButton: { alignItems: 'center', padding: 10 },
  toggleText: { color: '#aaa', fontSize: 14 },
  errorText: { color: '#ff4444', marginBottom: 15, textAlign: 'center' }
});