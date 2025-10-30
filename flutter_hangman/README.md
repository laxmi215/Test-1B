# Flutter Hangman Game

A beautiful, feature-rich Hangman game built with Flutter and Dart. This mobile-first version includes all the functionality of the web version with enhanced animations and mobile-optimized UI.

## Features

### 🎮 Core Game Features

- **Word Guessing**: Guess letters one at a time to reveal the hidden word
- **6 Wrong Guesses Limit**: Game ends after 6 incorrect guesses
- **Win/Loss Detection**: Clear feedback when you win or lose
- **Random Word Selection**: Each game features a different word
- **Letter Tracking**: Visual feedback for guessed letters (green=correct, red=wrong)

### 🎨 Enhanced Mobile UI

- **Responsive Design**: Optimized for mobile devices and tablets
- **Smooth Animations**:
  - Bounce animation for correct guesses
  - Shake animation for wrong guesses
- **Material Design**: Modern, clean interface following Material Design principles
- **Gradient Background**: Beautiful blue gradient background
- **Card-based Layout**: Organized sections with card-style containers

### 💡 Smart Features

- **Interactive Hint System**: Toggle hints on/off with lightbulb icon
- **Comprehensive Word Database**: 20 programming and technology-related words with hints
- **Virtual Keyboard**: Touch-friendly on-screen keyboard
- **Game Statistics**: Track games played, wins, losses, and win rate
- **Persistent Stats**: Statistics persist during the session

### 🎯 Game Controls

- **New Game**: Start a fresh game with a new random word
- **Reveal Word**: Give up and reveal the current word
- **Reset Stats**: Clear all game statistics
- **Hint Toggle**: Show/hide helpful hints for the current word

## Getting Started

### Prerequisites

- Flutter SDK installed
- Dart SDK (comes with Flutter)
- An IDE (VS Code, Android Studio, or IntelliJ)
- iOS Simulator, Android Emulator, or physical device

### Installation

1. **Navigate** to the project directory:
   ```bash
   cd flutter_hangman
   ```
2. **Get dependencies**:
   ```bash
   flutter pub get
   ```
3. **Run the app**:
   ```bash
   flutter run
   ```

### Supported Platforms

- ✅ **Android** (phones and tablets)
- ✅ **iOS** (iPhones and iPads)
- ✅ **Web** browsers
- ✅ **Windows** desktop
- ✅ **macOS** desktop
- ✅ **Linux** desktop

## How to Play

1. **Start the Game**: A random word is selected and displayed as blank slots
2. **Make Guesses**: Tap letters on the virtual keyboard to guess
3. **Track Progress**:
   - Correct letters appear in green and fill the word slots
   - Wrong letters appear in red and count toward the 6-guess limit
4. **Use Hints**: Tap the lightbulb icon to reveal helpful hints
5. **Win or Lose**:
   - Win by guessing all letters before reaching 6 wrong guesses
   - Lose when you make 6 wrong guesses
6. **Play Again**: Tap "New Game" to start over with a new word

**Enjoy playing and learning with Flutter Hangman!** 🎮📱
