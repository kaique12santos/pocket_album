import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabase';
import styles from './style/authStyle';

export default function AuthScreen({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Feedback Visual
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = async () => {
    // 1. Limpa mensagens antigas
    setErrorMessage('');
    setSuccessMessage('');

    // 2. Validações de Front-end (Antes de bater no banco)
    if (!email || !password) {
      return setErrorMessage('Preencha o e-mail e a senha.');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setErrorMessage('Insira um formato de e-mail válido.');
    }

    if (password.length < 6) {
      return setErrorMessage('A senha deve ter no mínimo 6 caracteres.');
    }

    setLoading(true);

    try {
      if (isLogin) {
        // --- FLUXO DE LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        setSuccessMessage('Acesso liberado! Preparando seu pacote...');
        
        // Aguarda 1.5s para o usuário ler a mensagem de sucesso antes de mudar de tela
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
        }, 1500);

      } else {
        // --- FLUXO DE CADASTRO ---
        if (!username) return setErrorMessage('O nome de olheiro é obrigatório.');
        if (password !== confirmPassword) return setErrorMessage('As senhas não coincidem.');

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } }
        });

        if (error) throw error;

        setSuccessMessage('Conta criada com sucesso! Faça o login.');
        
        // Limpa o formulário e muda para a aba de login após 2 segundos
        setTimeout(() => {
          setIsLogin(true);
          setSuccessMessage('');
          setPassword('');
          setConfirmPassword('');
        }, 2000);
      }
    } catch (error) {
      // Traduz os erros comuns do Supabase para português
      let msg = error.message;
      if (msg.includes('Invalid login credentials')) msg = 'E-mail ou senha incorretos.';
      if (msg.includes('User already registered')) msg = 'Este e-mail já está em uso.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/login-bg.png')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            <View style={styles.header}>
              <Text style={styles.title}>POCKET ALBUM</Text>
              <Text style={styles.subtitle}>{isLogin ? "COLECIONE A HISTÓRIA DO FUTEBOL." : "CRIE SEU ÁLBUM AGORA."}</Text>
            </View>

            <View style={styles.formContainer}>
              
              {/* ÁREA DE MENSAGENS (Erro ou Sucesso) */}
              {errorMessage ? (
                <View style={styles.errorBox}><Text style={styles.errorText}>⚠️ {errorMessage}</Text></View>
              ) : null}
              
              {successMessage ? (
                <View style={styles.successBox}><Text style={styles.successText}>✅ {successMessage}</Text></View>
              ) : null}

              {/* CAMPOS DO FORMULÁRIO */}
              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOME DE OLHEIRO (USUÁRIO)</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z"/></svg></Text>
                    <TextInput style={styles.input} placeholder="ex: artilheiro_99" placeholderTextColor="#888" value={username} onChangeText={setUsername} autoCapitalize="none" />
                  </View>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-MAIL DO TÉCNICO</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm85-315q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Z"/></svg></Text>
                  <TextInput style={styles.input} placeholder="tecnico@clube.com" placeholderTextColor="#888" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.label}>CÓDIGO TÁTICO (SENHA)</Text>
                  {isLogin && <TouchableOpacity><Text style={styles.forgotPassword}>Esqueceu a senha?</Text></TouchableOpacity>}
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg></Text>
                  <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry />
                </View>
              </View>

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CONFIRMAR CÓDIGO TÁTICO</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg></Text>
                    <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#888" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.mainButton} onPress={handleAuth} disabled={loading}>
                {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.mainButtonText}>{isLogin ? "ENTRAR EM CAMPO ⚡" : "CRIAR CONTA ⚡"}</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              {isLogin ? (
                <TouchableOpacity onPress={() => { setIsLogin(false); setErrorMessage(''); setSuccessMessage(''); }}>
                  <Text style={styles.switchText}>Novo olheiro? <Text style={styles.switchTextHighlight}>Solicite sua licença</Text></Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => { setIsLogin(true); setErrorMessage(''); setSuccessMessage(''); }}>
                  <Text style={styles.switchText}>Já tem uma conta? <Text style={styles.switchTextHighlight}>⬅ VOLTAR AO LOGIN</Text></Text>
                </TouchableOpacity>
              )}
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

