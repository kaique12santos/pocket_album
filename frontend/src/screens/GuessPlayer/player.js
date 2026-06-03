import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './playerstyle';

// --- IMPORT DO SUPABASE ---
import { supabase } from '../../services/supabase'; 

// URL Base do Supabase para manter o código limpo e fácil de alterar no futuro
const BASE_IMG_URL = 'https://yybmqwzposqlwuomnzgc.supabase.co/storage/v1/object/public/pocket-album-images/players/';

const players = [
  {
    name: 'Neymar',
    image: { uri: `${BASE_IMG_URL}neymar.png` },
    shadow: { uri: `${BASE_IMG_URL}neymar-shadow.png` },
  },
  {
    name: 'Zidane',
    image: { uri: `${BASE_IMG_URL}zidane.png` },
    shadow: { uri: `${BASE_IMG_URL}zidane-shadow.png` },
  },
  {
    name: 'Ronaldinho',
    image: { uri: `${BASE_IMG_URL}ronaldinho.png` },
    shadow: { uri: `${BASE_IMG_URL}ronaldinho-shadow.png` },
  },
  {
    name: 'Kaka',
    image: { uri: `${BASE_IMG_URL}kaka.png` },
    shadow: { uri: `${BASE_IMG_URL}kaka-shadow.png` },
  },
  {
    name: 'Garrincha',
    image: { uri: `${BASE_IMG_URL}garrincha.png` },
    shadow: { uri: `${BASE_IMG_URL}garrincha-shadow.png` },
  },
  {
    name: 'Maldini',
    image: { uri: `${BASE_IMG_URL}maldini.png` },
    shadow: { uri: `${BASE_IMG_URL}maldini-shadow.png` },
  },
  {
    name: 'Messi',
    image: { uri: `${BASE_IMG_URL}messi.png` },
    shadow: { uri: `${BASE_IMG_URL}messi-shadow.png` },
  },
  {
    name: 'Maradona',
    image: { uri: `${BASE_IMG_URL}maradona.png` },
    shadow: { uri: `${BASE_IMG_URL}maradona-shadow.png` },
  },
  {
    name: 'Pele',
    image: { uri: `${BASE_IMG_URL}pele.png` },
    shadow: { uri: `${BASE_IMG_URL}pele-shadow.png` },
  },
  {
    name: 'Ronaldo',
    image: { uri: `${BASE_IMG_URL}ronaldo.png` },
    shadow: { uri: `${BASE_IMG_URL}ronaldo-shadow.png` },
  },
];

const questions = players.map((player, index) => {
  const wrongOptions = players
    .filter((candidate) => candidate.name !== player.name)
    .slice(index % 3, index % 3 + 3)
    .map((candidate) => candidate.name);

  return {
    ...player,
    options: [player.name, ...wrongOptions].sort(),
  };
});

function ProgressDots({ results, currentIndex, started }) {
  return (
    <View style={styles.progress}>
      {questions.map((question, index) => {
        const result = results[index];
        const isCurrent = started && index === currentIndex && !result;

        return (
          <View
            key={question.name}
            style={[
              styles.progressDot,
              isCurrent && styles.progressDotCurrent,
              result === 'correct' && styles.progressDotCorrect,
              result === 'wrong' && styles.progressDotWrong,
            ]}
          />
        );
      })}
    </View>
  );
}

function MenuButton({ onPress }) {
  return (
    <Pressable style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuButtonLine} />
      <View style={styles.menuButtonLine} />
      <View style={styles.menuButtonLine} />
    </Pressable>
  );
}

function getResultMessage(score) {
  if (score === 10) return 'Perfeito. Voce conhece a historia do futebol como poucos.';
  if (score >= 7) return 'Mandou muito bem. Nivel colecionador lendario.';
  if (score >= 4) return 'Boa campanha. Da para buscar mais figurinhas e tentar de novo.';
  return 'Comeco dificil, mas toda lenda precisa de revanche.';
}

export default function GuessPlayer({ onNavigate, onSignOut }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // <-- Estado de Loading
  const [menuOpen, setMenuOpen] = useState(false);

  const currentQuestion = questions[currentIndex];
  const hasAnswered = selectedOption !== null;
  const score = useMemo(
    () => results.filter((result) => result === 'correct').length,
    [results]
  );

  const startGame = () => {
    setHasStarted(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setResults([]);
    setIsFinished(false);
  };

  const selectOption = (option) => {
    if (hasAnswered) return;

    const isCorrect = option === currentQuestion.name;
    setSelectedOption(option);
    setResults((previous) => [
      ...previous,
      isCorrect ? 'correct' : 'wrong',
    ]);
  };

  // --- LÓGICA DE SALVAMENTO NO BANCO ---
  const saveScoreToDatabase = async (pointsEarned) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('score')
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const newTotal = (profile.score || 0) + pointsEarned;

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

  const nextQuestion = async () => {
    if (currentIndex + 1 >= questions.length) {
      // FIM DE JOGO - Hora de salvar os pontos
      setIsSaving(true);
      
      const pontosPorAcerto = score * 2;
      const pontosFinais = pontosPorAcerto + 30; // Pontos dos acertos + Bônus fixo
      
      await saveScoreToDatabase(pontosFinais);
      
      setIsSaving(false);
      setIsFinished(true);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setSelectedOption(null);
  };

  const getOptionStyle = (option) => {
    if (!hasAnswered) return styles.optionButton;
    if (option === currentQuestion.name) return [styles.optionButton, styles.optionCorrect];
    if (option === selectedOption) return [styles.optionButton, styles.optionWrong];
    return [styles.optionButton, styles.optionDisabled];
  };

  // --- TELA DE CARREGAMENTO (SALVANDO PONTOS) ---
  if (isSaving) {
    return (
      <View style={styles.safeArea}>
        <View style={[styles.centerContent, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
           <ActivityIndicator size="large" color="#FFDF00" />
           <Text style={{color: '#FFDF00', textAlign: 'center', marginTop: 20, fontWeight: 'bold'}}>SALVANDO PONTOS...</Text>
        </View>
        <BottomMenu onNavigate={onNavigate} />
      </View>
    );
  }

  // --- TELA INICIAL ---
  if (!hasStarted) {
    return (
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.centerContent} showsVerticalScrollIndicator={false}>
          <MenuButton onPress={() => setMenuOpen(true)} />
          <Text style={styles.title}>DESCUBRA O JOGADOR</Text>
          <ProgressDots results={results} currentIndex={currentIndex} started={false} />
          <Text style={styles.introText}>
            Dez craques escondidos. Uma chance por rodada. Mostre que seu album tambem tem memoria de campeao.
          </Text>
          <Pressable style={styles.primaryButton} onPress={startGame}>
            <Text style={styles.primaryButtonText}>INICIAR</Text>
          </Pressable>
        </ScrollView>
        <BottomMenu onNavigate={onNavigate} />
        <SideMenu
          visible={menuOpen}
          onClose={() => setMenuOpen(false)}
          onNavigate={onNavigate}
          onSignOut={onSignOut}
        />
      </View>
    );
  }

  // --- TELA DE RESULTADOS ---
  if (isFinished) {
    const pontosAcertos = score * 2;
    const totalPontos = pontosAcertos + 30;

    return (
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.centerContent} showsVerticalScrollIndicator={false}>
          <MenuButton onPress={() => setMenuOpen(true)} />
          <Text style={styles.title}>RESULTADO FINAL</Text>
          <ProgressDots results={results} currentIndex={currentIndex} started />
          
          <View style={styles.scoreCard}>
            <Text style={styles.score}>{score}/10</Text>
            <Text style={styles.scoreLabel}>acertos</Text>
          </View>

          {/* Adicionando o detalhamento dos pontos que foram salvos */}
          <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: 15, borderRadius: 10, marginTop: 15, marginBottom: 15, width: '100%' }}>
            <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 5 }}>Acertos: +{pontosAcertos} pts</Text>
            <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 5 }}>Bônus de Conclusão: +30 pts</Text>
            <Text style={{ color: '#FFDF00', textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>TOTAL GANHO: {totalPontos} PONTOS</Text>
            <Text style={{ color: '#888', textAlign: 'center', fontSize: 12, marginTop: 10, fontStyle: 'italic' }}>✓ Salvo no seu Perfil</Text>
          </View>

          <Text style={styles.resultMessage}>{getResultMessage(score)}</Text>
          <Pressable style={styles.primaryButton} onPress={startGame}>
            <Text style={styles.primaryButtonText}>JOGAR NOVAMENTE</Text>
          </Pressable>
        </ScrollView>
        <BottomMenu onNavigate={onNavigate} />
        <SideMenu
          visible={menuOpen}
          onClose={() => setMenuOpen(false)}
          onNavigate={onNavigate}
          onSignOut={onSignOut}
        />
      </View>
    );
  }

  // --- TELA DO JOGO EM ANDAMENTO ---
  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.gameContent} showsVerticalScrollIndicator={false}>
        <MenuButton onPress={() => setMenuOpen(true)} />
        <Text style={styles.title}>DESCUBRA O JOGADOR</Text>
        <ProgressDots results={results} currentIndex={currentIndex} started />
        <Text style={styles.roundLabel}>Jogador {currentIndex + 1}/10</Text>

        <View style={styles.playerCard}>
          <Image
            source={hasAnswered ? currentQuestion.image : currentQuestion.shadow}
            style={styles.playerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.optionsGrid}>
          {currentQuestion.options.map((option) => (
            <Pressable
              key={option}
              style={getOptionStyle(option)}
              onPress={() => selectOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>

        {hasAnswered && (
          <View style={styles.feedbackBox}>
            <Text
              style={[
                styles.feedbackText,
                selectedOption === currentQuestion.name ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              {selectedOption === currentQuestion.name ? 'Correto!' : 'Errado!'}
            </Text>
            <Pressable style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 === questions.length ? 'Ver Resultado' : 'Proximo'}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      <BottomMenu onNavigate={onNavigate} />
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={onNavigate}
        onSignOut={onSignOut}
      />
    </View>
  );
}