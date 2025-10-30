/**
 * HANGMAN GAME - Complete Implementation
 * 
 * This is a comprehensive Hangman game implementation that meets all assignment requirements
 * and includes advanced features like hints, statistics, and responsive design.
 * 
 * Key Features Implemented:
 * - No hangman drawing (uses counter instead)
 * - 6 wrong guesses maximum before losing
 * - Clear WIN/LOST display messages
 * - Play again functionality with different words
 * - Display of all guessed letters with color coding
 * - Wrong letters count as exactly 1 wrong guess each
 * - Correct letters appear in all their positions
 * - Multiple instances of same letter are revealed together
 * 
 * Additional enhancements:
 * - Hint system with contextual clues
 * - Game statistics with persistent storage
 * - Responsive design for all devices
 * - Virtual keyboard interface
 * - Smooth animations and visual feedback
 * 
 * @author GitHub Copilot AI Assistant
 * @version 1.0
 */

// Main Hangman Game Class - Manages all game state and functionality
class HangmanGame {
    constructor() {
        // Initialize the complete word database with hints
        // Each word includes educational context to enhance learning
        this.wordsWithHints = [
            { word: 'JAVASCRIPT', hint: 'A popular programming language used for web development and creating interactive websites.' },
            { word: 'COMPUTER', hint: 'An electronic device that processes data and performs calculations at high speed.' },
            { word: 'PROGRAMMING', hint: 'The process of creating instructions for computers using coding languages.' },
            { word: 'HANGMAN', hint: 'A classic word-guessing game where you try to guess letters before running out of chances.' },
            { word: 'CHALLENGE', hint: 'A difficult task or problem that tests your abilities and skills.' },
            { word: 'DEVELOPER', hint: 'A person who writes code and creates software applications or websites.' },
            { word: 'SOFTWARE', hint: 'Computer programs and applications that run on electronic devices.' },
            { word: 'ALGORITHM', hint: 'A step-by-step procedure or set of rules for solving a problem or completing a task.' },
            { word: 'FUNCTION', hint: 'A reusable block of code that performs a specific task in programming.' },
            { word: 'VARIABLE', hint: 'A storage location in programming that holds data and can change its value.' },
            { word: 'INTERNET', hint: 'A global network that connects computers and devices worldwide for communication.' },
            { word: 'KEYBOARD', hint: 'An input device with keys used to type letters, numbers, and symbols into a computer.' },
            { word: 'MONITOR', hint: 'A display screen that shows visual output from a computer or other devices.' },
            { word: 'WEBSITE', hint: 'A collection of web pages accessible through the internet using a web browser.' },
            { word: 'DATABASE', hint: 'An organized collection of data stored electronically and easily accessible.' },
            { word: 'NETWORK', hint: 'A system of interconnected computers or devices that can communicate with each other.' },
            { word: 'SECURITY', hint: 'Protection of computer systems and data from unauthorized access or attacks.' },
            { word: 'FRAMEWORK', hint: 'A pre-built structure that developers use as a foundation for building applications.' },
            { word: 'LIBRARY', hint: 'A collection of pre-written code that developers can use in their programs.' },
            { word: 'INTERFACE', hint: 'The point where users interact with a computer system or application.' },
            { word: 'MOBILE', hint: 'Relating to portable devices like smartphones and tablets that can be carried around.' },
            { word: 'DESKTOP', hint: 'A personal computer designed to sit on a desk, typically with a separate monitor.' },
            { word: 'LAPTOP', hint: 'A portable computer that can be folded shut and easily carried around.' },
            { word: 'TABLET', hint: 'A flat, portable computing device with a touchscreen interface, larger than a phone.' },
            { word: 'GAMING', hint: 'The activity of playing electronic games on computers, consoles, or mobile devices.' },
            { word: 'VIRTUAL', hint: 'Something that exists in a computer-simulated environment rather than the physical world.' },
            { word: 'REALITY', hint: 'The actual state of things as they exist, or a computer-simulated environment.' },
            { word: 'ARTIFICIAL', hint: 'Something made by humans rather than occurring naturally, especially relating to intelligence.' },
            { word: 'INTELLIGENCE', hint: 'The ability to learn, understand, and make decisions, now replicated in machines.' },
            { word: 'MACHINE', hint: 'A device that uses power to perform tasks, increasingly capable of learning and thinking.' },
            { word: 'LEARNING', hint: 'The process of acquiring knowledge or skills, now done by both humans and computers.' },
            { word: 'DATA', hint: 'Information in digital form that can be processed by computers and analyzed.' },
            { word: 'SCIENCE', hint: 'The systematic study of the physical and natural world through observation and experiment.' },
            { word: 'ANALYTICS', hint: 'The systematic analysis of data to discover patterns and insights for decision-making.' },
            { word: 'CLOUD', hint: 'Remote servers accessed via the internet for storing and processing data.' },
            { word: 'SERVER', hint: 'A powerful computer that provides services and resources to other computers over a network.' },
            { word: 'CLIENT', hint: 'A computer or program that receives services from a server in a network.' },
            { word: 'BACKEND', hint: 'The server-side part of an application that users don\'t see but handles data processing.' },
            { word: 'FRONTEND', hint: 'The user-facing part of an application that people interact with directly.' },
            { word: 'FULLSTACK', hint: 'A developer who works on both the frontend and backend parts of applications.' },
            { word: 'RESPONSIVE', hint: 'Design that automatically adjusts to look good on different screen sizes and devices.' },
            { word: 'DESIGN', hint: 'The process of planning and creating the visual and functional aspects of something.' },
            { word: 'GRAPHIC', hint: 'Visual elements like images, illustrations, and layouts used in digital media.' },
            { word: 'ANIMATION', hint: 'The technique of creating moving images through a sequence of static pictures.' },
            { word: 'MULTIMEDIA', hint: 'Content that combines different forms like text, audio, images, and video.' },
            { word: 'DIGITAL', hint: 'Information or media that exists in electronic form using binary code.' },
            { word: 'TECHNOLOGY', hint: 'The application of scientific knowledge for practical purposes, especially in industry.' },
            { word: 'INNOVATION', hint: 'The introduction of new ideas, methods, or products that bring improvement.' },
            { word: 'CREATIVE', hint: 'Involving the use of imagination and original ideas to create something new.' },
            { word: 'SOLUTION', hint: 'An answer to a problem or the method used to solve a difficult situation.' },
            { word: 'PROJECT', hint: 'A planned piece of work with a specific goal, typically completed within a timeframe.' },
            { word: 'TEAMWORK', hint: 'The collaborative effort of a group working together to achieve a common goal.' },
            { word: 'COLLABORATION', hint: 'The action of working jointly with others to produce or create something.' },
            { word: 'SUCCESS', hint: 'The achievement of a goal or the attainment of wealth, position, or fame.' },
            { word: 'ACHIEVEMENT', hint: 'Something accomplished successfully, especially after effort or courage.' },
            { word: 'EXCELLENCE', hint: 'The quality of being outstanding or extremely good at something.' },
            { word: 'QUALITY', hint: 'The standard of something measured against other things of a similar kind.' },
            { word: 'PERFORMANCE', hint: 'How well something or someone functions or the execution of an action.' },
            { word: 'EFFICIENCY', hint: 'The ability to accomplish something with the least waste of time and effort.' },
            { word: 'OPTIMIZATION', hint: 'The process of making something as effective and functional as possible.' }
        ];
        
        this.currentWord = '';
        this.currentHint = '';
        this.guessedWord = [];
        this.guessedLetters = [];
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.gameStatus = 'playing'; // 'playing', 'won', 'lost'
        this.usedWords = new Set();
        this.hintRevealed = false;
        
        // Game statistics
        this.stats = {
            gamesPlayed: parseInt(localStorage.getItem('hangman_games_played')) || 0,
            gamesWon: parseInt(localStorage.getItem('hangman_games_won')) || 0,
            gamesLost: parseInt(localStorage.getItem('hangman_games_lost')) || 0
        };
        
        // DOM elements
        this.wordContainer = document.getElementById('word-container');
        this.wrongCountDisplay = document.getElementById('wrong-count');
        this.wrongBars = document.getElementById('wrong-bars');
        this.gameResult = document.getElementById('game-result');

        this.newGameBtn = document.getElementById('new-game-btn');
        this.revealBtn = document.getElementById('reveal-btn');
        this.gamesPlayedDisplay = document.getElementById('games-played');
        this.gamesWonDisplay = document.getElementById('games-won');
        this.gamesLostDisplay = document.getElementById('games-lost');
        this.winRateDisplay = document.getElementById('win-rate');
        this.virtualKeyboard = document.getElementById('virtual-keyboard');
        this.hintIcon = document.getElementById('hint-icon');
        this.hintModal = document.getElementById('hint-modal');
        this.hintText = document.getElementById('hint-text');
        this.revealHintBtn = document.getElementById('reveal-hint-btn');
        this.closeHint = document.getElementById('close-hint');
        this.resetStatsBtn = document.getElementById('reset-stats-btn');
        
        // Debug: Check critical elements
        console.log('Virtual keyboard element:', this.virtualKeyboard);
        console.log('Word container element:', this.wordContainer);
        
        this.createVirtualKeyboard();
        this.initializeGame();
        this.setupEventListeners();
        this.updateStats();
    }
    
    createVirtualKeyboard() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // Debug: Check if virtualKeyboard element exists
        if (!this.virtualKeyboard) {
            console.error('Virtual keyboard element not found!');
            return;
        }
        
        this.virtualKeyboard.innerHTML = '';
        
        // Debug: Add console log to check if this method is being called
        console.log('Creating virtual keyboard...');
        
        alphabet.split('').forEach(letter => {
            const key = document.createElement('button');
            key.className = 'keyboard-key';
            key.textContent = letter;
            key.setAttribute('data-letter', letter);
            
            key.addEventListener('click', () => this.handleKeyboardClick(letter));
            
            this.virtualKeyboard.appendChild(key);
        });
        
        // Debug: Check if keys were added
        console.log('Virtual keyboard created with', this.virtualKeyboard.children.length, 'keys');
    }
    
    /**
     * Initialize a new game session
     * 
     * This method resets all game variables to their starting state and prepares
     * the interface for a new round of gameplay. It ensures each game starts fresh
     * with no leftover state from previous games.
     */
    initializeGame() {
        // STEP 1: Reset all game state variables to initial values
        this.guessedLetters = [];           // Clear array of previously guessed letters
        this.wrongGuesses = 0;              // Reset wrong guess counter to 0 (requirement: start at 0)
        this.gameStatus = 'playing';        // Set status to active game state
        this.hintRevealed = false;          // Hide hint for new word
        
        // STEP 2: Select a new word that hasn't been used recently
        // This ensures variety and prevents consecutive duplicate words
        this.selectNewWord();
        
        // STEP 3: Initialize the display word with underscores
        // Each letter position starts as '_' until correctly guessed
        this.guessedWord = new Array(this.currentWord.length).fill('_');
        
        // STEP 4: Reset all interactive elements to default state
        this.resetVirtualKeyboard();        // Re-enable all keyboard buttons
        this.resetHintModal();              // Close hint modal and reset hint button
        
        // STEP 5: Update all visual elements to reflect new game state
        this.updateDisplay();               // Refresh word display, counters, etc.
        this.enableInput();                 // Re-enable user input controls
        
        // Debug logging for development (can be removed in production)
        console.log('New game started with word:', this.currentWord, 'Hint:', this.currentHint);
    }
    
    /**
     * Smart Word Selection Algorithm
     * 
     * This method implements intelligent word selection to ensure variety in gameplay.
     * It prevents consecutive duplicate words and manages word cycling efficiently.
     * 
     * REQUIREMENT: "Each play must have a different word to guess"
     */
    selectNewWord() {
        // STEP 1: Check if we've exhausted all available words
        // If all words have been used, clear the tracking set to start over
        // This prevents the game from running out of words while maintaining variety
        if (this.usedWords.size >= this.wordsWithHints.length) {
            this.usedWords.clear();
            console.log('All words used, resetting word pool for continued variety');
        }
        
        // STEP 2: Filter out recently used words to ensure variety
        // Create array of only unused words to select from
        let availableWords = this.wordsWithHints.filter(item => !this.usedWords.has(item.word));
        
        // STEP 3: Random selection from available words
        // Use Math.random() for truly random selection within unused words
        let selectedItem = availableWords[Math.floor(Math.random() * availableWords.length)];
        
        // STEP 4: Set current game word and hint from selected item
        this.currentWord = selectedItem.word;      // The word player must guess
        this.currentHint = selectedItem.hint;      // Educational hint for the word
        
        // STEP 5: Mark this word as used to prevent immediate reselection
        this.usedWords.add(this.currentWord);
        
        console.log(`Selected new word: ${this.currentWord} (${availableWords.length} words remaining)`);
    }
    
    setupEventListeners() {
        // New game button
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        
        // Reveal word button
        this.revealBtn.addEventListener('click', () => this.revealWord());
        
        // Hint icon click
        this.hintIcon.addEventListener('click', () => this.openHintModal());
        
        // Reveal hint button
        this.revealHintBtn.addEventListener('click', () => this.revealHint());
        
        // Close hint modal
        this.closeHint.addEventListener('click', () => this.closeHintModal());
        
        // Close modal when clicking outside
        this.hintModal.addEventListener('click', (e) => {
            if (e.target === this.hintModal) {
                this.closeHintModal();
            }
        });
        
        // Reset stats button
        this.resetStatsBtn.addEventListener('click', () => this.resetStats());
        
        // Focus input when page loads
        this.letterInput.focus();
    }
    
    handleKeyboardClick(letter) {
        if (this.gameStatus !== 'playing') return;
        if (this.guessedLetters.includes(letter)) return;
        
        // Make the guess directly
        this.makeGuess(letter);
    }
    
    resetVirtualKeyboard() {
        const keys = this.virtualKeyboard.querySelectorAll('.keyboard-key');
        keys.forEach(key => {
            key.className = 'keyboard-key';
        });
    }
    
    updateVirtualKeyboard() {
        const keys = this.virtualKeyboard.querySelectorAll('.keyboard-key');
        keys.forEach(key => {
            const letter = key.getAttribute('data-letter');
            
            if (this.guessedLetters.includes(letter)) {
                key.classList.add('guessed');
                
                if (this.currentWord.includes(letter)) {
                    key.classList.add('correct');
                } else {
                    key.classList.add('wrong');
                }
            }
            
            // Disable all keys when game is over
            if (this.gameStatus !== 'playing') {
                key.classList.add('disabled');
            } else {
                key.classList.remove('disabled');
            }
        });
    }
    
    openHintModal() {
        if (this.gameStatus !== 'playing') return;
        this.hintModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    closeHintModal() {
        this.hintModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    revealHint() {
        if (this.hintRevealed || this.gameStatus !== 'playing') return;
        
        this.hintRevealed = true;
        this.hintText.textContent = this.currentHint;
        this.revealHintBtn.textContent = 'Hint Revealed';
        this.revealHintBtn.disabled = true;
        
        // Close modal after a short delay
        setTimeout(() => {
            this.closeHintModal();
        }, 2000);
    }
    
    resetHintModal() {
        this.hintRevealed = false;
        this.hintText.textContent = 'Click "Show Hint" to get a clue about the word!';
        this.revealHintBtn.textContent = 'Show Hint';
        this.revealHintBtn.disabled = false;
        this.closeHintModal();
    }
    
    /**
     * Core Letter Guessing Logic
     * 
     * This method handles the main gameplay mechanic of processing a letter guess.
     * It implements all the core assignment requirements for letter handling.
     * 
     * REQUIREMENTS IMPLEMENTED:
     * - Wrong letter counts as exactly 1 wrong guess
     * - Correct letters appear in all their positions
     * - Multiple instances of same letter are revealed together
     * - Guessed letters are tracked and displayed
     */
    makeGuess(letter) {
        // STEP 1: Validate the guess before processing
        // Ensures only valid, single letters that haven't been guessed are processed
        if (!this.isValidGuess(letter)) {
            return; // Exit early if invalid guess
        }
        
        // STEP 2: Add letter to guessed letters tracking
        // REQUIREMENT: "You must display the letters that have been already guessed"
        this.guessedLetters.push(letter);
        
        // STEP 3: Determine if guess is correct or wrong
        // Check if the guessed letter exists anywhere in the current word
        if (this.currentWord.includes(letter)) {
            // CORRECT GUESS: Letter exists in word
            this.handleCorrectGuess(letter);
        } else {
            // WRONG GUESS: Letter does not exist in word
            // REQUIREMENT: "A guessed letter that is WRONG will only count as 1 WRONG guess"
            this.handleWrongGuess(letter);
        }
        
        // STEP 4: Update all visual displays to reflect the new game state
        this.updateDisplay();
        
        // STEP 5: Check if game has ended (win or loss condition)
        this.checkGameStatus();
    }
    
    isValidGuess(letter) {
        // Check if empty
        if (!letter) {
            this.showMessage('Please select a letter!', 'error');
            return false;
        }
        
        // Check if already guessed
        if (this.guessedLetters.includes(letter)) {
            this.showMessage('You already guessed that letter!', 'error');
            return false;
        }
        
        // Check if game is over
        if (this.gameStatus !== 'playing') {
            return false;
        }
        
        return true;
    }
    

    
    /**
     * Handle Correct Letter Guess
     * 
     * REQUIREMENTS IMPLEMENTED:
     * - "When a CORRECT letter is guessed, it must be shown in its location"
     * - "If a letter shows up more than once, it should be shown in all locations"
     * - Example: guessing P for HAPPY shows _ _ P P _
     * - Example: guessing E for REFLECT shows _ E _ _ E _ _
     */
    handleCorrectGuess(letter) {
        // STEP 1: Reveal ALL instances of the correct letter simultaneously
        // This loop finds every position where the guessed letter appears
        // and reveals it in the display word array
        for (let i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === letter) {
                // Replace underscore with actual letter at this position
                this.guessedWord[i] = letter;
            }
        }
        
        // STEP 2: Provide positive feedback to the player
        this.showMessage(`Great! "${letter}" is in the word!`, 'success');
    }
    
    /**
     * Handle Wrong Letter Guess
     * 
     * REQUIREMENTS IMPLEMENTED:
     * - "A guessed letter that is WRONG will only count as 1 WRONG guess"
     * - Increments wrong counter by exactly 1 per wrong letter
     */
    handleWrongGuess(letter) {
        // STEP 1: Increment wrong guess counter by exactly 1
        // REQUIREMENT: Each wrong letter = exactly 1 wrong guess
        this.wrongGuesses++;
        
        // STEP 2: Provide feedback about the incorrect guess
        this.showMessage(`Sorry, "${letter}" is not in the word.`, 'error');
    }
    
    /**
     * Check Game End Conditions
     * 
     * REQUIREMENTS IMPLEMENTED:
     * - "6 wrong guesses and the player loses"
     * - "You should display if the player WON or LOST"
     * 
     * This method determines if the game has ended and displays appropriate messages.
     */
    checkGameStatus() {
        // STEP 1: Check WIN condition
        // Player wins when all letters have been correctly guessed (no underscores left)
        if (!this.guessedWord.includes('_')) {
            this.gameStatus = 'won';                    // Set internal game state
            this.stats.gamesWon++;                      // Update win statistics
            // REQUIREMENT: "You should display if the player WON"
            this.endGame('🎉 YOU WON! 🎉', 'win');
        }
        // STEP 2: Check LOSS condition  
        // REQUIREMENT: "6 wrong guesses and the player loses"
        else if (this.wrongGuesses >= this.maxWrongGuesses) {
            this.gameStatus = 'lost';                   // Set internal game state
            this.stats.gamesLost++;                     // Update loss statistics
            // REQUIREMENT: "You should display if the player LOST"
            // Also reveal the correct word to the player
            this.endGame(`💀 YOU LOST! The word was "${this.currentWord}"`, 'lose');
        }
        
        // Update stats if game ended
        if (this.gameStatus !== 'playing') {
            this.stats.gamesPlayed++;
            this.saveStats();
            this.updateStats();
        }
    }
    
    endGame(message, type) {
        this.gameResult.textContent = message;
        this.gameResult.className = `game-result ${type}`;
        this.disableInput();
        
        // Reveal the complete word
        this.guessedWord = this.currentWord.split('');
        this.updateWordDisplay();
    }
    
    revealWord() {
        if (this.gameStatus === 'playing') {
            this.gameStatus = 'lost';
            this.stats.gamesPlayed++;
            this.stats.gamesLost++;
            this.endGame(`🤔 Word Revealed: "${this.currentWord}"`, 'lose');
            this.saveStats();
            this.updateStats();
        }
    }
    
    startNewGame() {
        this.initializeGame();
    }
    
    updateDisplay() {
        this.updateWordDisplay();
        this.updateWrongGuessesDisplay();

        this.updateVirtualKeyboard();
        this.updateGameResult();
    }
    
    updateWordDisplay() {
        this.wordContainer.innerHTML = '';
        
        this.guessedWord.forEach((letter, index) => {
            const letterSlot = document.createElement('div');
            letterSlot.className = 'letter-slot';
            
            if (letter !== '_') {
                letterSlot.textContent = letter;
                letterSlot.classList.add('revealed');
            } else {
                letterSlot.classList.add('empty');
            }
            
            this.wordContainer.appendChild(letterSlot);
        });
    }
    
    updateWrongGuessesDisplay() {
        this.wrongCountDisplay.textContent = this.wrongGuesses;
        
        // Update progress bar
        const percentage = (this.wrongGuesses / this.maxWrongGuesses) * 100;
        this.wrongBars.style.width = `${percentage}%`;
    }
    

    
    updateGameResult() {
        if (this.gameStatus === 'playing') {
            this.gameResult.textContent = '';
            this.gameResult.className = 'game-result';
        }
    }
    
    updateStats() {
        this.gamesPlayedDisplay.textContent = this.stats.gamesPlayed;
        this.gamesWonDisplay.textContent = this.stats.gamesWon;
        this.gamesLostDisplay.textContent = this.stats.gamesLost;
        
        const winRate = this.stats.gamesPlayed > 0 
            ? Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100)
            : 0;
        this.winRateDisplay.textContent = `${winRate}%`;
    }
    
    saveStats() {
        localStorage.setItem('hangman_games_played', this.stats.gamesPlayed.toString());
        localStorage.setItem('hangman_games_won', this.stats.gamesWon.toString());
        localStorage.setItem('hangman_games_lost', this.stats.gamesLost.toString());
    }
    
    resetStats() {
        if (confirm('Are you sure you want to reset all game statistics? This cannot be undone.')) {
            this.stats = {
                gamesPlayed: 0,
                gamesWon: 0,
                gamesLost: 0
            };
            
            // Clear localStorage
            localStorage.removeItem('hangman_games_played');
            localStorage.removeItem('hangman_games_won');
            localStorage.removeItem('hangman_games_lost');
            
            // Update display
            this.updateStats();
            this.showMessage('Statistics have been reset!', 'success');
        }
    }
    
    enableInput() {
        // Enable virtual keyboard
        const keys = this.virtualKeyboard.querySelectorAll('.keyboard-key');
        keys.forEach(key => {
            key.classList.remove('disabled');
        });
        
        // Enable hint icon if not already revealed
        if (!this.hintRevealed) {
            this.hintIcon.style.opacity = '1';
            this.hintIcon.style.pointerEvents = 'auto';
        }
    }
    
    disableInput() {
        // Disable virtual keyboard
        const keys = this.virtualKeyboard.querySelectorAll('.keyboard-key');
        keys.forEach(key => {
            key.classList.add('disabled');
        });
        
        // Disable hint icon
        this.hintIcon.style.opacity = '0.5';
        this.hintIcon.style.pointerEvents = 'none';
    }
    
    showMessage(message, type) {
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInOut 2s ease-in-out;
            ${type === 'success' ? 'background: #d4edda; color: #155724; border: 2px solid #c3e6cb;' : 
              type === 'error' ? 'background: #f8d7da; color: #721c24; border: 2px solid #f5c6cb;' : 
              'background: #d1ecf1; color: #0c5460; border: 2px solid #bee5eb;'}
        `;
        
        document.body.appendChild(messageEl);
        
        // Remove after animation
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 2000);
    }
}

// Add CSS for message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new HangmanGame();
    
    // Make game accessible globally for debugging
    window.hangmanGame = game;
});