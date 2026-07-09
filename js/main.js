/**
 * Main Application Entry Point
 * Orchestrates AudioSynthesizer, HintSystem, ChordGame, and GameUI
 */

// ============================================================
// CHORD DATA
// ============================================================

const MAJOR_CHORDS = {
    'C': { root: 130.81, notes: [130.81, 164.81, 196.00], type: 'major' },
    'C#': { root: 138.59, notes: [138.59, 174.61, 207.65], type: 'major' },
    'D': { root: 146.83, notes: [146.83, 185.00, 220.00], type: 'major' },
    'Eb': { root: 155.56, notes: [155.56, 196.00, 233.08], type: 'major' },
    'E': { root: 164.81, notes: [164.81, 207.65, 246.94], type: 'major' },
    'F': { root: 174.61, notes: [174.61, 220.00, 261.63], type: 'major' },
    'F#': { root: 185.00, notes: [185.00, 233.08, 277.18], type: 'major' },
    'G': { root: 196.00, notes: [196.00, 246.94, 293.66], type: 'major' },
    'Ab': { root: 207.65, notes: [207.65, 261.63, 311.13], type: 'major' },
    'A': { root: 220.00, notes: [220.00, 277.18, 329.63], type: 'major' },
    'Bb': { root: 233.08, notes: [233.08, 293.66, 349.23], type: 'major' },
    'B': { root: 246.94, notes: [246.94, 311.13, 369.99], type: 'major' }
};

const MINOR_CHORDS = {
    'Cm': { root: 130.81, notes: [130.81, 155.56, 196.00], type: 'minor' },
    'C#m': { root: 138.59, notes: [138.59, 164.81, 207.65], type: 'minor' },
    'Dm': { root: 146.83, notes: [146.83, 174.61, 220.00], type: 'minor' },
    'Ebm': { root: 155.56, notes: [155.56, 185.00, 233.08], type: 'minor' },
    'Em': { root: 164.81, notes: [164.81, 196.00, 246.94], type: 'minor' },
    'Fm': { root: 174.61, notes: [174.61, 207.65, 261.63], type: 'minor' },
    'F#m': { root: 185.00, notes: [185.00, 220.00, 277.18], type: 'minor' },
    'Gm': { root: 196.00, notes: [196.00, 233.08, 293.66], type: 'minor' },
    'Abm': { root: 207.65, notes: [207.65, 246.94, 311.13], type: 'minor' },
    'Am': { root: 220.00, notes: [220.00, 261.63, 329.63], type: 'minor' },
    'Bbm': { root: 233.08, notes: [233.08, 277.18, 349.23], type: 'minor' },
    'Bm': { root: 246.94, notes: [246.94, 293.66, 369.99], type: 'minor' }
};

// ============================================================
// GLOBAL INSTANCES
// ============================================================

let audioSynthesizer;
let hintSystem;
let gameUI;
let chordGame;
let currentChords = {};

// ============================================================
// INITIALIZATION
// ============================================================

/**
 * Initialize all modules when page loads
 */
function initializeApp() {
    try {
        console.log('Initializing Chord Quest application...');

        // Create instances
        audioSynthesizer = new AudioSynthesizer();
        hintSystem = new HintSystem();
        gameUI = new GameUI();

        // Create game instance
        chordGame = new ChordGame(currentChords, audioSynthesizer, hintSystem);

        // Set up callbacks
        setupGameCallbacks();

        // Set up event listeners
        setupEventListeners();

        console.log('✅ Application initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        if (gameUI) {
            gameUI.showError('Failed to initialize application. Please refresh the page.');
        }
    }
}

/**
 * Set up game state callbacks
 */
function setupGameCallbacks() {
    chordGame.onScoreUpdate = (scoreData) => {
        gameUI.updateScore(scoreData);
    };

    chordGame.onFeedback = (isCorrect, message) => {
        const gameState = chordGame.getState();
        gameUI.showFeedback(
            isCorrect,
            message,
            gameState.isGameOver ? null : () => nextRound()
        );
    };

    chordGame.onCharacterUpdate = (expression, message) => {
        gameUI.updateCharacter(expression, message);
    };

    chordGame.onGameOver = (gameOverData) => {
        gameUI.showGameOver(
            gameOverData,
            () => resetGame(),
            () => backToMenu()
        );
    };
}

/**
 * Set up DOM event listeners
 */
function setupEventListeners() {
    // Start game buttons
    const easyBtn = document.querySelector('.difficulty-btn:nth-child(1)');
    const hardBtn = document.querySelector('.difficulty-btn:nth-child(2)');

    if (easyBtn) {
        easyBtn.addEventListener('click', () => startGame('easy'));
    }
    if (hardBtn) {
        hardBtn.addEventListener('click', () => startGame('hard'));
    }

    // Game buttons
    if (gameUI.elements.playBtn) {
        gameUI.elements.playBtn.addEventListener('click', () => playChord());
    }

    if (gameUI.elements.resetBtn) {
        gameUI.elements.resetBtn.addEventListener('click', () => resetGame());
    }

    if (gameUI.elements.backBtn) {
        gameUI.elements.backBtn.addEventListener('click', () => backToMenu());
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        if (!chordGame || !chordGame.difficulty) {
            return;
        }

        switch(event.key) {
            case ' ':
                event.preventDefault();
                playChord();
                break;
            case 'Enter':
                if (chordGame.hasGuessed && !chordGame.getState().isGameOver) {
                    event.preventDefault();
                    nextRound();
                }
                break;
            case 'Escape':
                backToMenu();
                break;
        }
    });

    console.log('✅ Event listeners set up');
}

// ============================================================
// GAME FLOW FUNCTIONS
// ============================================================

/**
 * Start game with selected difficulty
 * @param {string} difficulty - 'easy' or 'hard'
 */
function startGame(difficulty) {
    try {
        console.log(`Starting game: ${difficulty} mode`);

        // Set up chords based on difficulty
        if (difficulty === 'easy') {
            currentChords = { ...MAJOR_CHORDS };
        } else if (difficulty === 'hard') {
            currentChords = { ...MAJOR_CHORDS, ...MINOR_CHORDS };
        } else {
            throw new Error(`Invalid difficulty: ${difficulty}`);
        }

        // Update game with new chords
        chordGame.chordData = currentChords;

        // Start game
        if (!chordGame.startGame(difficulty)) {
            throw new Error('Failed to start game');
        }

        // Update UI
        gameUI.setDifficultyBadge(difficulty);
        gameUI.createChordButtons(currentChords, (chordName) => {
            const button = document.querySelector(`[data-chord="${chordName}"]`);
            handleGuess(chordName, button);
        });
        gameUI.showGameScreen();
        gameUI.resetChordButtons();
        gameUI.clearFeedback();
        gameUI.hideGameOver();
        chordGame.updateScore();

        // Start first round
        nextRound();
    } catch (error) {
        console.error('Error starting game:', error);
        gameUI.showError('Failed to start game. Please try again.');
    }
}

/**
 * Play current chord
 */
function playChord() {
    try {
        if (!chordGame.currentChord) {
            console.warn('No chord loaded');
            return;
        }
        chordGame.playChord();
    } catch (error) {
        console.error('Error playing chord:', error);
        gameUI.showError('Failed to play chord. Please try again.');
    }
}

/**
 * Handle chord guess
 * @param {string} chordName - Guessed chord
 * @param {HTMLElement} button - Button element
 */
function handleGuess(chordName, button) {
    try {
        if (!chordName || !button) {
            console.error('Invalid guess parameters');
            return;
        }

        if (!chordGame.handleGuess(chordName)) {
            console.warn('Could not process guess');
            return;
        }

        gameUI.markChordResult(chordName, chordGame.currentChord);
    } catch (error) {
        console.error('Error handling guess:', error);
        gameUI.showError('Error processing guess. Please try again.');
    }
}

/**
 * Start next round
 */
function nextRound() {
    try {
        chordGame.nextRound();
        gameUI.resetChordButtons();
        gameUI.clearFeedback();
        gameUI.setPlayButtonEnabled(true);
        chordGame.updateScore();
    } catch (error) {
        console.error('Error starting next round:', error);
    }
}

/**
 * Reset game (keep same difficulty)
 */
function resetGame() {
    try {
        console.log('Resetting game...');
        gameUI.hideGameOver();
        chordGame.resetGameState();
        gameUI.updateScore({
            correct: 0,
            total: chordGame.MAX_ATTEMPTS,
            accuracy: 0,
            triesLeft: chordGame.MAX_ATTEMPTS,
            attempts: 0,
            streak: 0,
            bestScore: chordGame.bestScore,
            bestAccuracy: chordGame.bestAccuracy,
            sessionsPlayed: chordGame.sessionsPlayed,
            round: 1
        });
        gameUI.updateCharacter('happy', 'Ready to play again!');
        gameUI.clearFeedback();
        nextRound();
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}

/**
 * Back to menu
 */
function backToMenu() {
    try {
        console.log('Returning to menu...');
        chordGame.resetGameState();
        gameUI.showStartScreen();
    } catch (error) {
        console.error('Error returning to menu:', error);
    }
}

// ============================================================
// ERROR HANDLING
// ============================================================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// ============================================================
// START APPLICATION
// ============================================================

document.addEventListener('DOMContentLoaded', initializeApp);
