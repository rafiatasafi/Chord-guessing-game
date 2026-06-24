/**
 * ChordGame - Core game logic and state management
 */
class ChordGame {
    constructor(chordData, audioSynthesizer, hintSystem) {
        // Game state
        this.chordData = chordData;
        this.audioSynthesizer = audioSynthesizer;
        this.hintSystem = hintSystem;

        // Game variables
        this.difficulty = null;
        this.currentChord = null;
        this.correctCount = 0;
        this.attemptCount = 0;
        this.hasGuessed = false;
        this.MAX_ATTEMPTS = 20;

        // Callbacks for UI updates
        this.onScoreUpdate = null;
        this.onFeedback = null;
        this.onCharacterUpdate = null;
        this.onGameOver = null;
    }

    /**
     * Initialize game with selected difficulty
     * @param {string} difficulty - 'easy' or 'hard'
     * @returns {boolean} True if initialization successful
     */
    startGame(difficulty) {
        try {
            // Validate difficulty
            if (difficulty !== 'easy' && difficulty !== 'hard') {
                throw new Error(`Invalid difficulty: ${difficulty}. Must be 'easy' or 'hard'`);
            }

            this.difficulty = difficulty;
            this.resetGameState();

            console.log(`Game started: ${difficulty} mode`);
            return true;
        } catch (error) {
            console.error('Error starting game:', error);
            return false;
        }
    }

    /**
     * Reset game state but keep difficulty
     */
    resetGameState() {
        this.currentChord = null;
        this.correctCount = 0;
        this.attemptCount = 0;
        this.hasGuessed = false;
    }

    /**
     * Select a random chord from available options
     * @returns {string} Chord name
     */
    selectRandomChord() {
        try {
            const chordNames = Object.keys(this.chordData);

            if (!chordNames || chordNames.length === 0) {
                throw new Error('No chords available');
            }

            const randomIndex = Math.floor(Math.random() * chordNames.length);
            const chord = chordNames[randomIndex];

            if (!chord || typeof chord !== 'string') {
                throw new Error('Invalid chord selected');
            }

            return chord;
        } catch (error) {
            console.error('Error selecting random chord:', error);
            return null;
        }
    }

    /**
     * Start next round
     */
    nextRound() {
        try {
            this.currentChord = this.selectRandomChord();

            if (!this.currentChord) {
                throw new Error('Could not select a chord for next round');
            }

            this.hasGuessed = false;

            // Notify UI
            if (this.onCharacterUpdate) {
                this.onCharacterUpdate('happy', 'Ready to play!');
            }

            console.log(`Next round: ${this.currentChord}`);
        } catch (error) {
            console.error('Error starting next round:', error);
        }
    }

    /**
     * Play the current chord
     */
    playChord() {
        try {
            if (!this.currentChord) {
                throw new Error('No chord loaded');
            }

            const chordData = this.chordData[this.currentChord];

            if (!chordData) {
                throw new Error(`Chord data not found: ${this.currentChord}`);
            }

            this.audioSynthesizer.playChord(this.currentChord, chordData, 2.0);
        } catch (error) {
            console.error('Error playing chord:', error);
            if (this.onFeedback) {
                this.onFeedback(false, '❌ Error playing chord. Please try again.');
            }
        }
    }

    /**
     * Handle user's guess
     * @param {string} guessedChord - Chord user guessed
     * @returns {boolean} True if guess processed successfully
     */
    handleGuess(guessedChord) {
        try {
            // Validate state
            if (!guessedChord || typeof guessedChord !== 'string') {
                console.error('Invalid guess:', guessedChord);
                return false;
            }

            if (this.hasGuessed) {
                console.warn('User already guessed this round');
                return false;
            }

            if (!this.currentChord) {
                console.warn('No chord loaded yet');
                return false;
            }

            if (!this.chordData[guessedChord]) {
                console.error('Unknown chord:', guessedChord);
                return false;
            }

            // Process guess
            this.hasGuessed = true;
            this.attemptCount++;

            const isCorrect = guessedChord === this.currentChord;

            if (isCorrect) {
                this.correctCount++;
                this.procesCorrectGuess();
            } else {
                this.processIncorrectGuess(guessedChord);
            }

            // Update UI
            this.updateScore();

            // Check game over
            if (this.attemptCount >= this.MAX_ATTEMPTS) {
                this.endGame();
                return true;
            }

            return true;
        } catch (error) {
            console.error('Error handling guess:', error);
            return false;
        }
    }

    /**
     * Process correct guess
     * @private
     */
    procesCorrectGuess() {
        if (this.onCharacterUpdate) {
            this.onCharacterUpdate('happy', '🎉 Amazing! You got it right!');
        }

        if (this.onFeedback) {
            this.onFeedback(true, `🎉 Correct! It was ${this.currentChord}`);
        }
    }

    /**
     * Process incorrect guess
     * @private
     */
    processIncorrectGuess(guessedChord) {
        const hintData = this.hintSystem.generateHint(
            guessedChord,
            this.currentChord,
            this.chordData
        );

        if (this.onCharacterUpdate) {
            this.onCharacterUpdate(hintData.expression, hintData.hint);
        }

        if (this.onFeedback) {
            this.onFeedback(false, '❌ Incorrect. ' + hintData.hint);
        }
    }

    /**
     * Update score display
     * @private
     */
    updateScore() {
        if (this.onScoreUpdate) {
            const accuracy = this.attemptCount > 0
                ? Math.round((this.correctCount / this.attemptCount) * 100)
                : 0;

            const triesLeft = this.MAX_ATTEMPTS - this.attemptCount;

            this.onScoreUpdate({
                correct: this.correctCount,
                total: this.MAX_ATTEMPTS,
                accuracy: accuracy,
                triesLeft: triesLeft
            });
        }
    }

    /**
     * End the game
     * @private
     */
    endGame() {
        const finalAccuracy = Math.round((this.correctCount / this.MAX_ATTEMPTS) * 100);

        let message = '';
        if (finalAccuracy >= 90) message = '🌟 Outstanding!';
        else if (finalAccuracy >= 70) message = '🎵 Great job!';
        else if (finalAccuracy >= 50) message = '👍 Good effort!';
        else message = '🎸 Keep practicing!';

        if (this.onGameOver) {
            this.onGameOver({
                message: message,
                score: this.correctCount,
                total: this.MAX_ATTEMPTS,
                accuracy: finalAccuracy
            });
        }
    }

    /**
     * Get current game state
     * @returns {Object} Current state
     */
    getState() {
        return {
            difficulty: this.difficulty,
            currentChord: this.currentChord,
            correctCount: this.correctCount,
            attemptCount: this.attemptCount,
            hasGuessed: this.hasGuessed,
            isGameOver: this.attemptCount >= this.MAX_ATTEMPTS
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChordGame;
}