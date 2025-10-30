# 🎯 Hangman Game

A modern, responsive web-based Hangman game built with HTML, CSS, and JavaScript.

## 🎮 Game Features

### Core Gameplay

- **Word Guessing**: Guess letters one at a time to reveal the hidden word
- **Wrong Guess Tracking**: Shows current wrong guesses count (0-6) with visual progress bar
- **6 Strike Rule**: Game ends after 6 wrong guesses
- **Win/Lose Detection**: Clear indication when you WIN or LOSE the game
- **Letter Reveal**: Correct letters appear in all their positions immediately
- **Duplicate Prevention**: Already guessed letters are tracked and prevented

### User Interface

- **Modern Design**: Visually appealing gradient backgrounds and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, button animations, and visual feedback
- **Progress Indicators**: Visual wrong guess counter with color-coded progress bar
- **Clear Instructions**: User-friendly interface with intuitive gameplay

### Game Management

- **Play Again**: Start a new game with a different word instantly
- **Word Variety**: Large database of 60+ words ensures variety across games
- **No Repeats**: Smart word selection prevents consecutive duplicate words
- **Reveal Option**: Option to reveal the word if you're stuck
- **Game Statistics**: Tracks games played, wins, and win rate with local storage

### Technical Features

- **Input Validation**: Only accepts single letters, prevents invalid input
- **Keyboard Support**: Full keyboard navigation with Enter key support
- **Local Storage**: Persistent game statistics across browser sessions
- **Performance**: Smooth animations and efficient game state management
- **Cross-Browser**: Compatible with all modern web browsers

## 🚀 How to Play

1. **Start the Game**: Open `index.html` in your web browser
2. **Make a Guess**: Type a letter in the input field and click "Guess" (or press Enter)
3. **Track Progress**:
   - Correct letters appear in their word positions
   - Wrong guesses are counted and displayed
   - All guessed letters are shown with color coding
4. **Win Condition**: Reveal all letters before making 6 wrong guesses
5. **Lose Condition**: Make 6 wrong guesses and the game ends
6. **Play Again**: Click "New Game" to start with a different word

## 📁 Files Structure

```
hangman-game/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Game logic and functionality
└── README.md       # This documentation
```

## 🎨 Design Features

- **Gradient Backgrounds**: Modern purple-blue gradient theme
- **Animation Effects**: Smooth transitions and hover effects
- **Color Coding**:
  - Green for correct guesses
  - Red for wrong guesses
  - Blue for game elements
- **Responsive Grid**: Automatic layout adjustment for different screen sizes
- **Typography**: Clean, modern fonts with proper hierarchy

## 🔧 Technical Implementation

### Game Logic

- Object-oriented JavaScript with ES6 classes
- Efficient state management and event handling
- Smart word selection algorithm
- Input validation and error handling

### Responsive Design

- CSS Grid and Flexbox for layout
- Mobile-first responsive design
- Touch-friendly interface elements
- Scalable typography and spacing

### Performance

- Minimal DOM manipulation
- Efficient event listeners
- Optimized animations with CSS transitions
- Local storage for persistent data

## 🎯 Game Requirements Met

✅ **No Hangman Drawing**: Shows wrong guess count (0-6) instead  
✅ **6 Wrong Guesses**: Game ends after 6 incorrect guesses  
✅ **Win/Lose Display**: Clear indication of game outcome  
✅ **Play Again**: New game functionality with different words  
✅ **Different Words**: Large word database with smart selection  
✅ **Guessed Letters Display**: Shows all previously guessed letters  
✅ **Single Wrong Count**: Each wrong letter counts as only 1 wrong guess  
✅ **Correct Letter Positioning**: Shows letters in their exact positions  
✅ **Multiple Letter Instances**: Reveals all instances of correct letters

## 🌟 Bonus Features

- **Game Statistics**: Win rate tracking and game history
- **Visual Feedback**: Color-coded progress indicators
- **Keyboard Navigation**: Full keyboard support
- **Message System**: Temporary feedback messages
- **Reveal Word**: Option to see the answer
- **Local Storage**: Persistent statistics
- **Mobile Optimized**: Perfect mobile experience

## 🔧 Setup and Installation

1. Download all files to a folder
2. Open `index.html` in any modern web browser
3. No additional setup or installation required
4. Works offline - no internet connection needed

## 🎮 Game Controls

- **Text Input**: Type letters to guess
- **Enter Key**: Submit guess
- **Guess Button**: Submit current letter
- **New Game**: Start fresh game
- **Reveal Word**: Show the answer

Enjoy playing Hangman! 🎉
"# Test-1B" 
