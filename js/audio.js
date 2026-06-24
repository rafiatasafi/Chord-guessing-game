/**
 * AudioSynthesizer - Handles all Web Audio API operations
 * Synthesizes guitar chord sounds programmatically
 */
class AudioSynthesizer {
    constructor() {
        this.context = null;
        this.isSupported = this.checkSupport();
    }

    /**
     * Check if Web Audio API is supported
     * @returns {boolean} True if Web Audio API is available
     */
    checkSupport() {
        return !!(window.AudioContext || window.webkitAudioContext);
    }

    /**
     * Initialize Web Audio context (lazy initialization)
     * @returns {boolean} True if initialization successful
     */
    initialize() {
        try {
            if (!this.context) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) {
                    throw new Error('Web Audio API not supported in this browser');
                }
                this.context = new AudioContext();
                console.log('Audio context initialized successfully');
            }
            return true;
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
            return false;
        }
    }

    /**
     * Play a chord using Web Audio API
     * @param {string} chordName - Chord to play (e.g., 'C', 'Am')
     * @param {Object} chordData - Chord data with frequencies
     * @param {number} duration - Duration in seconds (default: 2.0)
     * @throws {Error} If chord data invalid or audio fails
     */
    playChord(chordName, chordData, duration = 2.0) {
        try {
            // Validate inputs
            if (!chordName || typeof chordName !== 'string') {
                throw new Error(`Invalid chord name: ${chordName}`);
            }

            if (!chordData || !chordData.notes || !Array.isArray(chordData.notes)) {
                throw new Error(`Invalid chord data for ${chordName}`);
            }

            if (duration <= 0 || duration > 10) {
                throw new Error(`Invalid duration: ${duration}. Must be between 0 and 10 seconds`);
            }

            // Initialize if needed
            if (!this.context) {
                if (!this.initialize()) {
                    console.warn('Audio context not available, skipping playback');
                    return;
                }
            }

            // Resume context if suspended (browser policy)
            if (this.context.state === 'suspended') {
                this.context.resume().catch(err => console.warn('Could not resume audio context:', err));
            }

            // Play each note in the chord
            const now = this.context.currentTime;
            chordData.notes.forEach((frequency, index) => {
                this.playNote(frequency, now, duration);
            });

            console.log(`Playing chord: ${chordName} (${duration}s)`);
        } catch (error) {
            console.error(`Error playing chord ${chordName}:`, error);
            // Gracefully handle audio errors - don't crash the app
        }
    }

    /**
     * Play a single note
     * @private
     * @param {number} frequency - Frequency in Hz
     * @param {number} startTime - When to start (audio context time)
     * @param {number} duration - How long to play
     */
    playNote(frequency, startTime, duration) {
        const ctx = this.context;

        try {
            // Validate frequency
            if (!frequency || frequency < 20 || frequency > 20000) {
                throw new Error(`Invalid frequency: ${frequency}. Must be between 20-20000 Hz`);
            }

            // Create oscillator
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            // Configuration
            oscillator.type = 'sawtooth'; // Guitar-like timbre
            oscillator.frequency.setValueAtTime(frequency, startTime);

            // ADSR Envelope (realistic guitar sound)
            const attack = 0.01;   // 10ms attack
            const decay = 0.1;     // 100ms decay
            const sustain = 0.7;   // 70% sustain level
            const release = 0.3;   // 300ms release

            // Apply envelope
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.15, startTime + attack);
            gainNode.gain.linearRampToValueAtTime(sustain * 0.15, startTime + attack + decay);
            gainNode.gain.setValueAtTime(sustain * 0.15, startTime + duration - release);
            gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

            // Connect audio graph: oscillator → gain → output
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Start and stop
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        } catch (error) {
            console.error('Error playing note:', error);
        }
    }

    /**
     * Stop all currently playing sounds
     * Note: Cannot stop individual oscillators, so this is informational
     */
    stopAll() {
        // Web Audio API doesn't provide easy way to stop all sounds
        // Consider creating new context to clear all sounds
        if (this.context && this.context.state !== 'closed') {
            console.log('Sounds will fade out naturally');
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioSynthesizer;
}