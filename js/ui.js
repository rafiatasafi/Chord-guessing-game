/**
 * GameUI - Handles all DOM updates and user interface
 */
class GameUI {
    constructor() {
        this.elements = {
            startScreen: document.getElementById('startScreen'),
            gameScreen: document.getElementById('gameScreen'),
            playBtn: document.getElementById('playBtn'),
            resetBtn: document.getElementById('resetBtn'),
            backBtn: document.getElementById('backBtn'),
            chordGrid: document.getElementById('chordGrid'),
            characterImg: document.getElementById('characterImg'),
            characterMessage: document.getElementById('characterMessage'),
            correct: document.getElementById('correct'),
            total: document.getElementById('total'),
            accuracy: document.getElementById('accuracy'),
            triesLeft: document.getElementById('triesLeft'),
            feedbackContainer: document.getElementById('feedbackContainer'),
            gameOverContainer: document.getElementById('gameOverContainer'),
            difficultyBadge: document.getElementById('difficultyBadge')
        };

        this.validateElements();
    }

    /**
     * Validate that all required elements exist
     */
    validateElements() {
        const requiredElements = Object.keys(this.elements);
        const missingElements = [];

        requiredElements.forEach(key => {
            if (!this.elements[key]) {
                missingElements.push(key);
            }
        });

        if (missingElements.length > 0) {
            console.error('Missing DOM elements:', missingElements);
        }
    }

    /**
     * Show start screen
     */
    showStartScreen() {
        try {
            if (this.elements.startScreen) {
                this.elements.startScreen.classList.remove('hidden');
            }
            if (this.elements.gameScreen) {
                this.elements.gameScreen.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error showing start screen:', error);
        }
    }

    /**
     * Show game screen
     */
    showGameScreen() {
        try {
            if (this.elements.startScreen) {
                this.elements.startScreen.classList.add('hidden');
            }
            if (this.elements.gameScreen) {
                this.elements.gameScreen.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error showing game screen:', error);
        }
    }

    /**
     * Create chord buttons dynamically
     * @param {Object} chordData - Chord data object
     * @param {Function} onChordClick - Callback when chord clicked
     */
    createChordButtons(chordData, onChordClick) {
        try {
            if (!this.elements.chordGrid) {
                throw new Error('Chord grid element not found');
            }

            if (!chordData || typeof chordData !== 'object') {
                throw new Error('Invalid chord data');
            }

            if (typeof onChordClick !== 'function') {
                throw new Error('onChordClick must be a function');
            }

            this.elements.chordGrid.innerHTML = '';

            Object.keys(chordData).forEach(chordName => {
                const button = document.createElement('button');
                button.className = 'chord-btn';
                button.textContent = chordName;
                button.setAttribute('data-chord', chordName);
                button.setAttribute('aria-label', `Guess chord ${chordName}`);
                button.addEventListener('click', () => onChordClick(chordName, button));

                this.elements.chordGrid.appendChild(button);
            });

            console.log(`Created ${Object.keys(chordData).length} chord buttons`);
        } catch (error) {
            console.error('Error creating chord buttons:', error);
        }
    }

    /**
     * Reset chord button states
     */
    resetChordButtons() {
        try {
            const buttons = this.elements.chordGrid?.querySelectorAll('.chord-btn');
            if (!buttons) return;

            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'incorrect');
            });
        } catch (error) {
            console.error('Error resetting chord buttons:', error);
        }
    }

    /**
     * Disable all chord buttons
     */
    disableChordButtons() {
        try {
            const buttons = this.elements.chordGrid?.querySelectorAll('.chord-btn');
            if (buttons) {
                buttons.forEach(btn => btn.disabled = true);
            }
        } catch (error) {
            console.error('Error disabling chord buttons:', error);
        }
    }

    /**
     * Update score display
     * @param {Object} scoreData - { correct, total, accuracy, triesLeft }
     */
    updateScore(scoreData) {
        try {
            if (!scoreData) return;

            if (this.elements.correct && scoreData.correct !== undefined) {
                this.elements.correct.textContent = scoreData.correct;
            }
            if (this.elements.total && scoreData.total !== undefined) {
                this.elements.total.textContent = scoreData.total;
            }
            if (this.elements.accuracy && scoreData.accuracy !== undefined) {
                this.elements.accuracy.textContent = scoreData.accuracy > 0 
                    ? `Accuracy: ${scoreData.accuracy}%`
                    : '';
            }
            if (this.elements.triesLeft && scoreData.triesLeft !== undefined) {
                this.elements.triesLeft.textContent = `Tries Left: ${scoreData.triesLeft}`;
            }
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }

    /**
     * Update character expression and message
     * @param {string} expression - 'happy', 'thinking', or 'lightbulb'
     * @param {string} message - Message to display
     */
    updateCharacter(expression, message) {
        try {
            if (!['happy', 'thinking', 'lightbulb'].includes(expression)) {
                throw new Error(`Invalid expression: ${expression}`);
            }

            if (this.elements.characterImg) {
                this.elements.characterImg.src = `images/${expression}.png`;
                this.elements.characterImg.alt = `Character ${expression}`;
            }

            if (this.elements.characterMessage) {
                this.elements.characterMessage.textContent = message;
            }

            // Add bounce animation for happy
            if (expression === 'happy' && this.elements.characterImg) {
                this.elements.characterImg.classList.add('bounce-anim');
                setTimeout(() => {
                    this.elements.characterImg.classList.remove('bounce-anim');
                }, 600);
            }
        } catch (error) {
            console.error('Error updating character:', error);
        }
    }

    /**
     * Show feedback message
     * @param {boolean} isCorrect - True if answer was correct
     * @param {string} message - Feedback message
     * @param {Function} onNext - Callback for next button
     */
    showFeedback(isCorrect, message, onNext) {
        try {
            if (!this.elements.feedbackContainer) return;
            if (typeof message !== 'string') return;

            const feedbackClass = isCorrect ? 'correct' : 'incorrect';

            this.elements.feedbackContainer.innerHTML = `
                <div class="feedback ${feedbackClass}">
                    ${message}
                </div>
                <button class="next-btn">Next Chord →</button>
            `;

            const nextBtn = this.elements.feedbackContainer.querySelector('.next-btn');
            if (nextBtn && typeof onNext === 'function') {
                nextBtn.addEventListener('click', onNext);
            }

            this.disableChordButtons();
        } catch (error) {
            console.error('Error showing feedback:', error);
        }
    }

    /**
     * Show game over screen
     * @param {Object} gameOverData - { message, score, total, accuracy }
     * @param {Function} onPlayAgain - Callback for play again
     * @param {Function} onBackToMenu - Callback for back to menu
     */
    showGameOver(gameOverData, onPlayAgain, onBackToMenu) {
        try {
            if (!this.elements.gameOverContainer || !gameOverData) return;

            const html = `
                <h2>${gameOverData.message}</h2>
                <p>Final Score: ${gameOverData.score} / ${gameOverData.total}</p>
                <p>Accuracy: ${gameOverData.accuracy}%</p>
                <button class="next-btn" id="playAgainBtn">Play Again (Same Difficulty)</button>
                <button class="next-btn" id="backToMenuBtn" style="background: linear-gradient(135deg, #8b7c9e 0%, #6d5f7a 100%); box-shadow: 0 5px 0 #5a4d66, 0 9px 18px rgba(139, 124, 158, 0.4); margin-top: 10px;">Back to Menu</button>
            `;

            this.elements.gameOverContainer.innerHTML = html;
            this.elements.gameOverContainer.classList.remove('hidden');

            const playAgainBtn = document.getElementById('playAgainBtn');
            const backToMenuBtn = document.getElementById('backToMenuBtn');

            if (playAgainBtn && typeof onPlayAgain === 'function') {
                playAgainBtn.addEventListener('click', onPlayAgain);
            }
            if (backToMenuBtn && typeof onBackToMenu === 'function') {
                backToMenuBtn.addEventListener('click', onBackToMenu);
            }

            if (this.elements.playBtn) {
                this.elements.playBtn.disabled = true;
            }
            this.disableChordButtons();
        } catch (error) {
            console.error('Error showing game over:', error);
        }
    }

    /**
     * Hide game over screen
     */
    hideGameOver() {
        try {
            if (this.elements.gameOverContainer) {
                this.elements.gameOverContainer.classList.add('hidden');
                this.elements.gameOverContainer.innerHTML = '';
            }
        } catch (error) {
            console.error('Error hiding game over:', error);
        }
    }

    /**
     * Clear feedback
     */
    clearFeedback() {
        try {
            if (this.elements.feedbackContainer) {
                this.elements.feedbackContainer.innerHTML = '';
            }
        } catch (error) {
            console.error('Error clearing feedback:', error);
        }
    }

    /**
     * Set difficulty badge
     * @param {string} difficulty - 'easy' or 'hard'
     */
    setDifficultyBadge(difficulty) {
        try {
            if (!this.elements.difficultyBadge) return;

            const badges = {
                'easy': '🎵 Easy Mode',
                'hard': '🎸 Hard Mode'
            };

            this.elements.difficultyBadge.textContent = badges[difficulty] || difficulty;
        } catch (error) {
            console.error('Error setting difficulty badge:', error);
        }
    }

    /**
     * Enable/disable play button
     * @param {boolean} enabled - True to enable
     */
    setPlayButtonEnabled(enabled) {
        try {
            if (this.elements.playBtn) {
                this.elements.playBtn.disabled = !enabled;
            }
        } catch (error) {
            console.error('Error setting play button state:', error);
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    showError(message) {
        try {
            if (!this.elements.feedbackContainer) return;

            this.elements.feedbackContainer.innerHTML = `
                <div class="feedback incorrect">
                    ❌ ${message}
                </div>
            `;
        } catch (error) {
            console.error('Error showing error message:', error);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameUI;
}