import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import BottomMenu from '../../components/common/BottomNav';
import SideMenu from '../../components/common/SideMenu';
import styles from './playerstyle';

const players = [
  {
    name: 'Neymar',
    image: require('../../../assets/players/neymar.png'),
    shadow: require('../../../assets/players/neymar-shadow.png'),
  },
  {
    name: 'Zidane',
    image: require('../../../assets/players/zidane.png'),
    shadow: require('../../../assets/players/zidane-shadow.png'),
  },
  {
    name: 'Ronaldinho',
    image: require('../../../assets/players/ronaldinho.png'),
    shadow: require('../../../assets/players/ronaldinho-shadow.png'),
  },
  {
    name: 'Kaka',
    image: require('../../../assets/players/kaka.png'),
    shadow: require('../../../assets/players/kaka-shadow.png'),
  },
  {
    name: 'Garrincha',
    image: require('../../../assets/players/garrincha.png'),
    shadow: require('../../../assets/players/garrincha-shadow.png'),
  },
  {
    name: 'Maldini',
    image: require('../../../assets/players/maldini.png'),
    shadow: require('../../../assets/players/maldini-shadow.png'),
  },
  {
    name: 'Messi',
    image: require('../../../assets/players/messi.png'),
    shadow: require('../../../assets/players/messi-shadow.png'),
  },
  {
    name: 'Maradona',
    image: require('../../../assets/players/maradona.png'),
    shadow: require('../../../assets/players/maradona-shadow.png'),
  },
  {
    name: 'Pele',
    image: require('../../../assets/players/pele.png'),
    shadow: require('../../../assets/players/pele-shadow.png'),
  },
  {
    name: 'Ronaldo',
    image: require('../../../assets/players/ronaldo.png'),
    shadow: require('../../../assets/players/ronaldo-shadow.png'),
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

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
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

  if (!hasStarted) {
    return (
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.centerContent}>
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

  if (isFinished) {
    return (
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.centerContent}>
          <MenuButton onPress={() => setMenuOpen(true)} />
          <Text style={styles.title}>RESULTADO FINAL</Text>
          <ProgressDots results={results} currentIndex={currentIndex} started />
          <View style={styles.scoreCard}>
            <Text style={styles.score}>{score}/10</Text>
            <Text style={styles.scoreLabel}>acertos</Text>
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

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.gameContent}>
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
