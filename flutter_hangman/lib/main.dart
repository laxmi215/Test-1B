import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(const HangmanApp());
}

class HangmanApp extends StatelessWidget {
  const HangmanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hangman Game',
      theme: ThemeData(primarySwatch: Colors.blue, fontFamily: 'Roboto'),
      home: const HangmanGame(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HangmanGame extends StatefulWidget {
  const HangmanGame({super.key});

  @override
  State<HangmanGame> createState() => _HangmanGameState();
}

class _HangmanGameState extends State<HangmanGame>
    with TickerProviderStateMixin {
  // Game state
  String currentWord = '';
  String currentHint = '';
  List<String> guessedLetters = [];
  int wrongGuesses = 0;
  bool gameWon = false;
  bool gameLost = false;
  bool hintRevealed = false;

  // Statistics
  int gamesPlayed = 0;
  int gamesWon = 0;
  int gamesLost = 0;

  // Animation controllers
  late AnimationController _bounceController;
  late AnimationController _shakeController;
  late Animation<double> _bounceAnimation;
  late Animation<double> _shakeAnimation;

  // Word database with hints
  final Map<String, String> wordDatabase = {
    'COMPUTER': 'Electronic device for processing data',
    'PROGRAMMING': 'Writing instructions for computers',
    'ALGORITHM': 'Step-by-step problem-solving procedure',
    'FLUTTER': 'Google\'s UI toolkit for mobile apps',
    'DART': 'Programming language used with Flutter',
    'WIDGET': 'Basic building block of Flutter UI',
    'JAVASCRIPT': 'Popular web programming language',
    'PYTHON': 'High-level programming language',
    'DATABASE': 'Organized collection of data',
    'INTERNET': 'Global network of computers',
    'SOFTWARE': 'Computer programs and applications',
    'HARDWARE': 'Physical components of a computer',
    'KEYBOARD': 'Input device with keys',
    'MONITOR': 'Display screen for computers',
    'MOBILE': 'Portable electronic device',
    'ANDROID': 'Google\'s mobile operating system',
    'DEVELOPER': 'Person who creates software',
    'FRAMEWORK': 'Software development platform',
    'FUNCTION': 'Block of reusable code',
    'VARIABLE': 'Storage location with a name',
  };

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _selectNewWord();
  }

  void _setupAnimations() {
    _bounceController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _shakeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );

    _bounceAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(parent: _bounceController, curve: Curves.elasticOut),
    );

    _shakeAnimation = Tween<double>(begin: 0.0, end: 10.0).animate(
      CurvedAnimation(parent: _shakeController, curve: Curves.elasticIn),
    );
  }

  void _selectNewWord() {
    final words = wordDatabase.keys.toList();
    final random = Random();
    currentWord = words[random.nextInt(words.length)];
    currentHint = wordDatabase[currentWord]!;
  }

  void _newGame() {
    setState(() {
      _selectNewWord();
      guessedLetters.clear();
      wrongGuesses = 0;
      gameWon = false;
      gameLost = false;
      hintRevealed = false;
    });
  }

  void _guessLetter(String letter) {
    if (guessedLetters.contains(letter) || gameWon || gameLost) return;

    setState(() {
      guessedLetters.add(letter);

      if (currentWord.contains(letter)) {
        // Correct guess - trigger bounce animation
        _bounceController.forward().then((_) => _bounceController.reverse());

        // Check if word is complete
        bool wordComplete = true;
        for (int i = 0; i < currentWord.length; i++) {
          if (!guessedLetters.contains(currentWord[i])) {
            wordComplete = false;
            break;
          }
        }

        if (wordComplete) {
          gameWon = true;
          gamesWon++;
          gamesPlayed++;
        }
      } else {
        // Wrong guess - trigger shake animation
        _shakeController.forward().then((_) => _shakeController.reverse());
        wrongGuesses++;

        if (wrongGuesses >= 6) {
          gameLost = true;
          gamesLost++;
          gamesPlayed++;
        }
      }
    });
  }

  void _revealWord() {
    setState(() {
      for (int i = 0; i < currentWord.length; i++) {
        if (!guessedLetters.contains(currentWord[i])) {
          guessedLetters.add(currentWord[i]);
        }
      }
      gameLost = true;
      gamesLost++;
      gamesPlayed++;
    });
  }

  void _resetStats() {
    setState(() {
      gamesPlayed = 0;
      gamesWon = 0;
      gamesLost = 0;
    });
  }

  Widget _buildWordDisplay() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withValues(alpha: 0.2),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: AnimatedBuilder(
        animation: _bounceAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _bounceAnimation.value,
            child: Wrap(
              alignment: WrapAlignment.center,
              children: currentWord.split('').map((letter) {
                final isRevealed = guessedLetters.contains(letter);
                return Container(
                  width: 50,
                  height: 60,
                  margin: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.blue, width: 2),
                    borderRadius: BorderRadius.circular(8),
                    color: isRevealed ? Colors.blue.shade50 : Colors.white,
                  ),
                  child: Center(
                    child: Text(
                      isRevealed ? letter : '',
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          );
        },
      ),
    );
  }

  Widget _buildVirtualKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        children: [
          const Text(
            'Click a letter to guess:',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.grey,
            ),
          ),
          const SizedBox(height: 15),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.center,
            children: alphabet.split('').map((letter) {
              final isGuessed = guessedLetters.contains(letter);
              final isCorrect = isGuessed && currentWord.contains(letter);
              final isWrong = isGuessed && !currentWord.contains(letter);

              return AnimatedBuilder(
                animation: _shakeAnimation,
                builder: (context, child) {
                  return Transform.translate(
                    offset: isWrong
                        ? Offset(_shakeAnimation.value, 0)
                        : Offset.zero,
                    child: ElevatedButton(
                      onPressed: isGuessed || gameWon || gameLost
                          ? null
                          : () => _guessLetter(letter),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: isCorrect
                            ? Colors.green
                            : isWrong
                            ? Colors.red
                            : Colors.blue,
                        foregroundColor: Colors.white,
                        minimumSize: const Size(40, 40),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: Text(
                        letter,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  );
                },
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildGameStatus() {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Column(
                children: [
                  const Text(
                    'Wrong Guesses',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text(
                    '$wrongGuesses / 6',
                    style: TextStyle(
                      fontSize: 18,
                      color: wrongGuesses >= 4 ? Colors.red : Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              Container(width: 2, height: 40, color: Colors.grey.shade300),
              Column(
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        hintRevealed = !hintRevealed;
                      });
                    },
                    icon: Icon(
                      hintRevealed ? Icons.lightbulb : Icons.lightbulb_outline,
                      color: Colors.orange,
                      size: 30,
                    ),
                  ),
                  const Text(
                    'Hint',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ],
          ),
          if (hintRevealed) ...[
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.orange.shade50,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.orange.shade200),
              ),
              child: Text(
                currentHint,
                style: const TextStyle(
                  fontSize: 14,
                  fontStyle: FontStyle.italic,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildGameResult() {
    if (!gameWon && !gameLost) return const SizedBox.shrink();

    return Container(
      padding: const EdgeInsets.all(20),
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: gameWon ? Colors.green.shade50 : Colors.red.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: gameWon ? Colors.green : Colors.red,
          width: 2,
        ),
      ),
      child: Column(
        children: [
          Icon(
            gameWon ? Icons.celebration : Icons.sentiment_dissatisfied,
            color: gameWon ? Colors.green : Colors.red,
            size: 40,
          ),
          const SizedBox(height: 10),
          Text(
            gameWon ? 'Congratulations! You Won!' : 'Game Over! You Lost!',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: gameWon ? Colors.green : Colors.red,
            ),
          ),
          if (gameLost) ...[
            const SizedBox(height: 5),
            Text(
              'The word was: $currentWord',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildControls() {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      alignment: WrapAlignment.center,
      children: [
        ElevatedButton.icon(
          onPressed: _newGame,
          icon: const Icon(Icons.refresh),
          label: const Text('New Game'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.green,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          ),
        ),
        ElevatedButton.icon(
          onPressed: gameWon || gameLost ? null : _revealWord,
          icon: const Icon(Icons.visibility),
          label: const Text('Reveal Word'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          ),
        ),
        ElevatedButton.icon(
          onPressed: _resetStats,
          icon: const Icon(Icons.bar_chart),
          label: const Text('Reset Stats'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.orange,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          ),
        ),
      ],
    );
  }

  Widget _buildGuessedLetters() {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Guessed Letters:',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.grey,
            ),
          ),
          const SizedBox(height: 10),
          guessedLetters.isEmpty
              ? const Text(
                  'None yet',
                  style: TextStyle(
                    color: Colors.grey,
                    fontStyle: FontStyle.italic,
                  ),
                )
              : Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: guessedLetters.map((letter) {
                    final isCorrect = currentWord.contains(letter);
                    return Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: isCorrect
                            ? Colors.green.shade100
                            : Colors.red.shade100,
                        border: Border.all(
                          color: isCorrect ? Colors.green : Colors.red,
                          width: 1,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        letter,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: isCorrect
                              ? Colors.green.shade700
                              : Colors.red.shade700,
                        ),
                      ),
                    );
                  }).toList(),
                ),
        ],
      ),
    );
  }

  Widget _buildStats() {
    final winRate = gamesPlayed > 0
        ? ((gamesWon / gamesPlayed) * 100).round()
        : 0;

    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Game Statistics',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatItem(
                'Games\nPlayed',
                gamesPlayed.toString(),
                Icons.games,
              ),
              _buildStatItem('Wins', gamesWon.toString(), Icons.star),
              _buildStatItem('Losses', gamesLost.toString(), Icons.close),
              _buildStatItem('Win Rate', '$winRate%', Icons.trending_up),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value, IconData icon) {
    return Column(
      children: [
        Icon(icon, color: Colors.blue, size: 20),
        const SizedBox(height: 5),
        Text(
          value,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.blue,
          ),
        ),
        Text(
          label,
          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Hangman Game',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: Colors.blue,
        centerTitle: true,
        elevation: 0,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.blue.shade50, Colors.white],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Text(
                  'Guess the word one letter at a time!',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: Colors.grey,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                _buildGameStatus(),
                const SizedBox(height: 20),
                _buildWordDisplay(),
                _buildGameResult(),
                const SizedBox(height: 20),
                _buildVirtualKeyboard(),
                const SizedBox(height: 20),
                _buildGuessedLetters(),
                const SizedBox(height: 20),
                _buildControls(),
                const SizedBox(height: 20),
                _buildStats(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _bounceController.dispose();
    _shakeController.dispose();
    super.dispose();
  }
}
