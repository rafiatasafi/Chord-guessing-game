/**
 * HintSystem - Music theory-based feedback
 * Analyzes musical relationships and provides educational hints
 */
class HintSystem {
    constructor() {
        // Semitone positions on chromatic scale
        this.semitoneMap = {
            'C': 0, 'C#': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5,
            'F#': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11
        };
    }

    /**
     * Calculate semitone distance between two chords
     * Accounts for circular nature of chromatic scale
     * @param {string} chord1 - First chord (e.g., 'C', 'Am')
     * @param {string} chord2 - Second chord
     * @returns {number} Shortest distance in semitones (0-6)
     */
    getSemitoneDistance(chord1, chord2) {
        try {
            if (!chord1 || !chord2) {
                throw new Error('Both chords required for distance calculation');
            }

            // Extract root note (remove 'm' for minor)
            const root1 = chord1.replace('m', '');
            const root2 = chord2.replace('m', '');

            // Validate roots
            if (!this.semitoneMap.hasOwnProperty(root1)) {
                throw new Error(`Unknown chord root: ${root1}`);
            }
            if (!this.semitoneMap.hasOwnProperty(root2)) {
                throw new Error(`Unknown chord root: ${root2}`);
            }

            const pos1 = this.semitoneMap[root1];
            const pos2 = this.semitoneMap[root2];

            // Calculate shortest distance (accounts for wraparound)
            const distance = Math.abs(pos1 - pos2);
            return Math.min(distance, 12 - distance);
        } catch (error) {
            console.error('Error calculating semitone distance:', error);
            return -1;
        }
    }

    /**
     * Count how many notes two chords share
     * @param {Array<number>} notes1 - Frequencies in chord 1
     * @param {Array<number>} notes2 - Frequencies in chord 2
     * @returns {number} Number of shared notes (0-3)
     */
    countSharedNotes(notes1, notes2) {
        try {
            if (!Array.isArray(notes1) || !Array.isArray(notes2)) {
                throw new Error('Both arguments must be arrays');
            }

            let sharedCount = 0;

            // Compare each frequency with tolerance for floating point
            notes1.forEach(freq1 => {
                notes2.forEach(freq2 => {
                    // Within 1 Hz is considered the same note
                    if (Math.abs(freq1 - freq2) < 1) {
                        sharedCount++;
                    }
                });
            });

            return sharedCount;
        } catch (error) {
            console.error('Error counting shared notes:', error);
            return 0;
        }
    }

    /**
     * Generate intelligent hint based on guess vs correct answer
     * Uses music theory to explain WHY the guess was off
     * @param {string} guessedChord - Chord user guessed
     * @param {string} correctChord - Actual chord
     * @param {Object} chordData - Chord frequency data
     * @returns {Object} { hint: string, expression: string }
     */
    generateHint(guessedChord, correctChord, chordData) {
        try {
            // Validate inputs
            if (!guessedChord || !correctChord) {
                throw new Error('Both chords required for hint generation');
            }

            if (!chordData || !chordData[guessedChord] || !chordData[correctChord]) {
                throw new Error('Chord data missing for hint calculation');
            }

            const distance = this.getSemitoneDistance(guessedChord, correctChord);
            const guessNotes = chordData[guessedChord].notes;
            const correctNotes = chordData[correctChord].notes;
            const sharedNotes = this.countSharedNotes(guessNotes, correctNotes);

            // Priority-based hint decision tree
            return this.selectHint(guessedChord, correctChord, distance, sharedNotes);
        } catch (error) {
            console.error('Error generating hint:', error);
            return {
                hint: '🤔 Try listening again for the root note.',
                expression: 'thinking'
            };
        }
    }

    /**
     * Select hint based on analysis
     * @private
     */
    selectHint(guessed, correct, distance, sharedNotes) {
        const guessRoot = guessed.replace('m', '');
        const correctRoot = correct.replace('m', '');
        const guessIsMinor = guessed.includes('m');
        const correctIsMinor = correct.includes('m');

        // Same root, different quality (major vs minor)
        if (guessRoot === correctRoot) {
            return {
                hint: `💡 Same root note! But you guessed ${guessIsMinor ? 'minor' : 'major'} instead of ${correctIsMinor ? 'minor' : 'major'}.`,
                expression: 'lightbulb'
            };
        }

        // Very close (1 semitone)
        if (distance === 1) {
            return {
                hint: `💡 So close! You were only one half-step away! ${guessed} is just 1 semitone from ${correct}.`,
                expression: 'lightbulb'
            };
        }

        // Close (2 semitones)
        if (distance === 2) {
            return {
                hint: `💡 You're close! You were 2 semitones (a whole step) away from ${correct}.`,
                expression: 'lightbulb'
            };
        }

        // Perfect 5th (dominant)
        if (distance === 7) {
            return {
                hint: `🎵 Interesting! You heard the dominant (perfect 5th) of ${correct}. ${guessed} and ${correct} are closely related!`,
                expression: 'lightbulb'
            };
        }

        // Perfect 4th (subdominant)
        if (distance === 5) {
            return {
                hint: `🎵 Good ear! You heard the subdominant (perfect 4th) of ${correct}. ${guessed} and ${correct} share a harmonic relationship!`,
                expression: 'lightbulb'
            };
        }

        // Shared notes
        if (sharedNotes > 0) {
            return {
                hint: `✨ You got ${sharedNotes} out of 3 notes correct! The chords share some notes but listen for the root note.`,
                expression: 'lightbulb'
            };
        }

        // Far off
        return {
            hint: `🤔 Not quite... The correct answer was ${correct}. Try listening for the root note (bass note) of the chord.`,
            expression: 'thinking'
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HintSystem;
}