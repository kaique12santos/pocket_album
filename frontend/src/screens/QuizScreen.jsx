import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';

// Banco de Dados Mockado
const QUESTIONS = [
  { id: 1, text: "Em que ano o Brasil ganhou o Penta?", options: ["1994", "1998", "2002", "2006"], correctIndex: 2 },
  { id: 2, text: "Quem é o maior artilheiro das Copas?", options: ["Pelé", "Klose", "Ronaldo", "Messi"], correctIndex: 1 },
  { id: 3, text: "Qual país sediou a Copa de 2010?", options: ["Brasil", "Alemanha", "África do Sul", "Rússia"], correctIndex: 2 },
];

const TIME_PER_QUESTION = 10000; // 10 segundos

export default function QuizScreen({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false); // Trava cliques múltiplos

  // Motores de Animação
  const timerAnim = useRef(new Animated.Value(100)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Inicia o timer quando a pergunta muda
  useEffect(() => {
    startTimer();
  }, [currentQ]);

  const startTimer = () => {
    timerAnim.setValue(100);
    Animated.timing(timerAnim, {
      toValue: 0,
      duration: TIME_PER_QUESTION,
      easing: Easing.linear,
      useNativeDriver: false, // False porque estamos animando width (%)
    }).start(({ finished }) => {
      // Se o tempo acabar e o usuário não respondeu, conta como erro
      if (finished && !isAnswering) {
        handleAnswer(-1); // -1 significa que o tempo esgotou
      }
    });
  };

  const handleAnswer = (index) => {
    if (isAnswering) return; // Evita duplo clique
    setIsAnswering(true);
    timerAnim.stopAnimation(); // Para o relógio
    setSelectedOption(index);

    const isCorrect = index === QUESTIONS[currentQ].correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
      // Animação de acerto (Pode adicionar um som aqui no futuro)
      setTimeout(nextQuestion, 1000);
    } else {
      // Física de Erro: Tremor (Shake)
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
      ]).start(() => {
        setTimeout(nextQuestion, 1000);
      });
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswering(false);
    } else {
      // Fim do Quiz - Aqui você daria a recompensa (ex: +1 Pacote de Figurinhas)
      if(onComplete) onComplete(score);
    }
  };

  // Interpolações Visuais
  const timerWidth = timerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  
  // A cor da barra muda de Ciano para Vermelho quando o tempo tá acabando
  const timerColor = timerAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#ff4444', '#FFDF00', '#00FFFF']
  });

  const question = QUESTIONS[currentQ];

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho de Status */}
      <View style={styles.header}>
        <Text style={styles.scoreText}>🏆 {score} PTS</Text>
        <Text style={styles.questionCounter}>{currentQ + 1} / {QUESTIONS.length}</Text>
      </View>

      {/* Barra de Tempo Animada */}
      <View style={styles.timerContainer}>
        <Animated.View style={[styles.timerBar, { width: timerWidth, backgroundColor: timerColor }]} />
      </View>

      {/* Card da Pergunta que treme se errar */}
      <Animated.View style={[styles.questionCard, { transform: [{ translateX: shakeAnim }] }]}>
        <Text style={styles.questionText}>{question.text}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            
            // Lógica de Cores Condicionais após clique
            let btnStyle = styles.optionButton;
            let textStyle = styles.optionText;

            if (isAnswering) {
              if (index === question.correctIndex) {
                btnStyle = [styles.optionButton, styles.optionCorrect]; // Verde se é a certa
                textStyle = [styles.optionText, styles.textCorrect];
              } else if (index === selectedOption) {
                btnStyle = [styles.optionButton, styles.optionWrong]; // Vermelho se escolheu a errada
                textStyle = [styles.optionText, styles.textWrong];
              }
            }

            return (
              <TouchableOpacity 
                key={index} 
                style={btnStyle} 
                onPress={() => handleAnswer(index)}
                activeOpacity={0.7}
              >
                <Text style={textStyle}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20, justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  scoreText: { color: '#FFDF00', fontSize: 18, fontWeight: 'bold' },
  questionCounter: { color: '#888', fontSize: 16, fontWeight: 'bold' },
  
  timerContainer: { height: 8, backgroundColor: '#222', borderRadius: 4, overflow: 'hidden', marginBottom: 40 },
  timerBar: { height: '100%', borderRadius: 4, shadowColor: '#00FFFF', shadowOpacity: 0.8, shadowRadius: 10 },
  
  questionCard: { backgroundColor: '#1a1a1a', padding: 25, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  questionText: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  
  optionsContainer: { gap: 15 },
  optionButton: { backgroundColor: '#222', padding: 18, borderRadius: 10, borderWidth: 2, borderColor: '#333' },
  optionText: { color: '#ccc', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  
  // Estados de Resposta
  optionCorrect: { backgroundColor: 'rgba(0, 200, 81, 0.2)', borderColor: '#00C851', shadowColor: '#00C851', shadowOpacity: 0.5, shadowRadius: 5 },
  textCorrect: { color: '#00C851' },
  optionWrong: { backgroundColor: 'rgba(255, 68, 68, 0.2)', borderColor: '#ff4444' },
  textWrong: { color: '#ff4444' }
});