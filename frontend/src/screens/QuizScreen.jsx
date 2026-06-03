import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import styles from './style/quizStyle';
// --- IMPORTS ---
import BottomMenu from '../components/common/BottomNav/index'; 
import { supabase } from '../services/supabase'; 

const QUESTIONS = [
  { id: 1, text: "Em que ano o Brasil ganhou o Penta?", options: ["1994", "1998", "2002", "2006"], correctIndex: 2 },
  { id: 2, text: "Quem é o maior artilheiro da história das Copas?", options: ["Pelé", "Klose", "Ronaldo", "Messi"], correctIndex: 1 },
  { id: 3, text: "Qual país sediou a Copa do Mundo de 2010?", options: ["Brasil", "Alemanha", "África do Sul", "Rússia"], correctIndex: 2 },
  { id: 4, text: "Qual seleção venceu a primeira Copa do Mundo em 1930?", options: ["Uruguai", "Brasil", "Argentina", "Itália"], correctIndex: 0 },
  { id: 5, text: "Quem fez o famoso gol da 'Mão de Deus'?", options: ["Pelé", "Maradona", "Zidane", "Messi"], correctIndex: 1 },
  { id: 6, text: "Qual país tem mais títulos de Copa do Mundo?", options: ["Alemanha", "Itália", "Argentina", "Brasil"], correctIndex: 3 },
  { id: 7, text: "Quem foi o capitão que levantou a taça do tri do Brasil em 1970?", options: ["Pelé", "Zico", "Carlos Alberto", "Romário"], correctIndex: 2 },
  { id: 8, text: "Em qual Copa aconteceu o trágico 7x1?", options: ["2010", "2014", "2018", "2022"], correctIndex: 1 },
  { id: 9, text: "Qual jogador foi expulso na final de 2006 após uma cabeçada?", options: ["Henry", "Ribéry", "Zidane", "Platini"], correctIndex: 2 },
  { id: 10, text: "Quem venceu a Copa do Mundo de 2022?", options: ["França", "Croácia", "Argentina", "Brasil"], correctIndex: 2 },
];

const TIME_PER_QUESTION = 10000;

export default function QuizScreen({ onNavigate, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 

  const timerAnim = useRef(new Animated.Value(100)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isFinished) startTimer();
  }, [currentQ, isFinished]);

  const startTimer = () => {
    timerAnim.setValue(100);
    Animated.timing(timerAnim, {
      toValue: 0,
      duration: TIME_PER_QUESTION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isAnswering) handleAnswer(-1); 
    });
  };

  const handleAnswer = (index) => {
    if (isAnswering) return; 
    setIsAnswering(true);
    timerAnim.stopAnimation(); 
    setSelectedOption(index);

    const isCorrect = index === QUESTIONS[currentQ].correctIndex;
    let newScore = score; 

    if (isCorrect) {
      newScore = score + 2;
      setScore(newScore);
      setTimeout(() => nextQuestion(newScore), 1000);
    } else {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
      ]).start(() => {
        setTimeout(() => nextQuestion(newScore), 1000);
      });
    }
  };

  // --- LÓGICA DE SALVAMENTO NO BANCO ---
  const saveScoreToDatabase = async (pointsEarned) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Pega os pontos atuais na tabela profiles
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('score')
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;

      // 2. Soma com o que ganhou agora
      const newTotal = (profile.score || 0) + pointsEarned;

      // 3. Atualiza o banco
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ score: newTotal })
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      console.log("Pontos atualizados com sucesso para:", newTotal);
    } catch (error) {
      console.error("Erro ao salvar pontos no banco:", error);
    }
  };

  const nextQuestion = async (currentScore) => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswering(false);
    } else {
      setIsSaving(true);
      const finalPoints = currentScore + 30; // Pontos dos acertos + Bônus
      
      await saveScoreToDatabase(finalPoints);
      
      setIsSaving(false);
      setIsFinished(true);
      
      if(onComplete) onComplete(finalPoints);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswering(false);
    setIsFinished(false);
  };

  // --- TELA DE RESULTADO FINAL ---
  if (isFinished) {
    const finalScore = score + 30; 
    const acertos = score / 2; 

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.finishTitle}>FIM DE JOGO!</Text>
          
          <View style={styles.scoreBoard}>
            <Text style={styles.scoreRow}>Acertos ({acertos}/10): <Text style={styles.highlight}>+{score} pts</Text></Text>
            <Text style={styles.scoreRow}>Bônus de Conclusão: <Text style={styles.highlight}>+30 pts</Text></Text>
            <View style={styles.divider} />
            <Text style={styles.totalScore}>TOTAL: {finalScore} PONTOS</Text>
            <Text style={styles.savedText}>✓ Salvo no seu Perfil</Text>
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>🔁 JOGAR NOVAMENTE</Text>
          </TouchableOpacity>
        </View>

        <BottomMenu onNavigate={onNavigate} />
      </View>
    );
  }

  // --- LOADING DO SALVAMENTO ---
  if (isSaving) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
           <ActivityIndicator size="large" color="#FFDF00" />
           <Text style={{color: '#FFDF00', textAlign: 'center', marginTop: 20, fontFamily: 'Anybody_800ExtraBold'}}>SALVANDO PONTOS...</Text>
        </View>
      </View>
    );
  }

  // --- TELA DO QUIZ EM ANDAMENTO ---
  const timerWidth = timerAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  const timerColor = timerAnim.interpolate({ inputRange: [0, 50, 100], outputRange: ['#ff4444', '#FFDF00', '#00FFFF'] });
  const question = QUESTIONS[currentQ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.scoreText}>🏆 {score} PTS</Text>
          <Text style={styles.questionCounter}>{currentQ + 1} / {QUESTIONS.length}</Text>
        </View>

        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerBar, { width: timerWidth, backgroundColor: timerColor }]} />
        </View>

        <Animated.View style={[styles.questionCard, { transform: [{ translateX: shakeAnim }] }]}>
          <Text style={styles.questionText}>{question.text}</Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              let btnStyle = styles.optionButton;
              let textStyle = styles.optionText;

              if (isAnswering) {
                if (index === question.correctIndex) {
                  btnStyle = [styles.optionButton, styles.optionCorrect]; 
                  textStyle = [styles.optionText, styles.textCorrect];
                } else if (index === selectedOption) {
                  btnStyle = [styles.optionButton, styles.optionWrong]; 
                  textStyle = [styles.optionText, styles.textWrong];
                }
              }

              return (
                <TouchableOpacity key={index} style={btnStyle} onPress={() => handleAnswer(index)} activeOpacity={0.7}>
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>

      <BottomMenu onNavigate={onNavigate} />
    </View>
  );
}

