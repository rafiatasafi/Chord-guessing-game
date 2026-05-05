# 🎸 Chord Quest - Retro Ear Training Adventure

An interactive, retro-styled web application that helps musicians develop their ear training skills through chord recognition. Built with vanilla JavaScript, Web Audio API, and featuring an adorable chibi character guide!

## 🎵 Live Demo

[Play the game here](https://rafiatasafi.github.io/Chord-guessing-game/)

## ✨ Features

### 🎮 Game Modes
- **Easy Mode**: Practice identifying 12 major chords (C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B)
- **Hard Mode**: Challenge yourself with 24 chords - all major chords PLUS their minor counterparts!

### 🎨 Retro Design
- Beautiful retro aesthetic with soft pastel colors inspired by 70s/80s music culture
- Smooth animations and playful UI elements
- Custom Google Fonts (Fredoka & Righteous) for that vintage vibe
- Floating music notes background decoration
- 3D button effects with press animations

### 🎭 Character Guide
- Cute chibi character with headphones provides emotional feedback
- **Happy Expression** 😊 - When you get it right!
- **Thinking Expression** 🤔 - When you're off track
- **Lightbulb Expression** 💡 - When you're close or making progress

### 🧠 Smart Hint System (Music Theory)
Get intelligent feedback based on your guess:
- **Half-step away**: "You were only one semitone off!"
- **Perfect 5th relationship**: "You heard the dominant!"
- **Perfect 4th relationship**: "You heard the subdominant!"
- **Same root, different quality**: Helps distinguish major vs minor
- **Distance-based hints**: Learn interval relationships

### 📊 Progress Tracking
- Real-time score display (correct/total)
- Accuracy percentage calculation
- Tries remaining counter
- Performance-based feedback at game end

### 🎵 Audio Technology
- Real-time chord synthesis using Web Audio API
- Guitar-like tones with ADSR envelope (Attack, Decay, Sustain, Release)
- Sawtooth waveforms for realistic sound
- No external audio files needed!

### 🎯 Game Flow
1. **Start Screen**: Choose your difficulty level
2. **Play**: Listen to randomly selected chords
3. **Guess**: Select from chord buttons
4. **Learn**: Get instant feedback with music theory hints
5. **Complete**: 20-round sessions with final score

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Advanced styling, gradients, animations, responsive design
- **JavaScript (ES6)** - Game logic, state management, event handling
- **Web Audio API** - Real-time audio synthesis with oscillators and gain nodes
- **Google Fonts** - Fredoka & Righteous for retro typography

## 🎮 How to Play

### Getting Started
1. Visit the game URL
2. Choose your difficulty:
   - **🎵 Easy Mode**: 12 major chords only
   - **🎸 Hard Mode**: 24 chords (major + minor)

### During Gameplay
1. Click **"🎵 Play Chord"** to hear a random chord
2. Listen carefully - you can replay as many times as needed
3. Click the chord button you think matches
4. Get instant feedback:
   - ✅ Correct: Character celebrates!
   - ❌ Incorrect: Get helpful hints based on music theory
5. Click **"Next Chord →"** to continue
6. Complete all 20 rounds

### Controls
- **🎵 Play Chord**: Play/replay the current chord
- **🔄 Reset Score**: Start over with the same difficulty
- **← Back to Menu**: Return to difficulty selection (loses progress)

## 🚀 Installation & Setup

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/rafiatasafi/Chord-guessing-game.git
```

2. Navigate to the project folder:
```bash
cd Chord-guessing-game
```

3. Open `index.html` in your browser:
```bash
# On Mac
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

**No build process, dependencies, or server required!** Pure vanilla JavaScript.

## 📁 Project Structure

```
Chord-guessing-game/
├── index.html              # Main game file
├── images/
│   ├── happy.png          # Character - correct answer
│   ├── lightbulb.png      # Character - hint/close
│   └── thinking.png       # Character - try again
└── README.md              # You are here!
```

## 🎵 Music Theory Behind the Hints

The game uses real music theory to provide educational feedback:

### Semitone Distances
- **1 semitone**: Adjacent notes (C to C#, E to F)
- **2 semitones**: Whole step (C to D)
- **5 semitones**: Perfect 4th (subdominant)
- **7 semitones**: Perfect 5th (dominant)

### Chord Relationships
```
C major (C, E, G) vs C minor (C, Eb, G)
- Same root, different 3rd (major vs minor)
- Different emotional quality (happy vs sad)

C major (C, E, G) vs G major (G, B, D)
- Perfect 5th relationship (dominant)
- Shares one note (G)
- Common in chord progressions
```

### Major vs Minor Chords
- **Major**: Root + Major 3rd (4 semitones) + Perfect 5th (7 semitones)
- **Minor**: Root + Minor 3rd (3 semitones) + Perfect 5th (7 semitones)
- Difference: Just one semitone in the middle note!

## 🎨 Design Philosophy

### Retro Aesthetic
- Soft pastel color palette (lavender, rose, cream, mint)
- Rounded shapes and playful typography
- Vintage-inspired gradients and shadows
- Music culture references (headphones, floating notes)

### User Experience
- **Forgiving**: Replay chords unlimited times
- **Educational**: Learn from mistakes with smart hints
- **Rewarding**: Character celebrates your success
- **Progressive**: Start easy, level up when ready

## 📈 Game Statistics & Scoring

### Scoring System
- Track correct answers out of 20 total attempts
- Real-time accuracy percentage
- Tries remaining counter
- No penalties for replaying chords

### Performance Ratings
- **90%+**: 🌟 Outstanding!
- **70-89%**: 🎵 Great job!
- **50-69%**: 👍 Good effort!
- **Below 50%**: 🎸 Keep practicing!

## 🎯 Learning Outcomes

By playing this game, you'll develop:

1. **Interval Recognition**: Identify distances between notes
2. **Chord Quality**: Distinguish major from minor
3. **Root Note Identification**: Hear the bass/fundamental
4. **Harmonic Relationships**: Understand how chords relate
5. **Musical Memory**: Train your ear progressively

## 🔮 Future Enhancements

Planned features for future versions:

- [ ] Sound effects for feedback (ding/buzz)
- [ ] Chord progression mode (multiple chords in sequence)
- [ ] Additional chord types (7ths, diminished, augmented)
- [ ] Customizable round count (10, 20, 30, etc.)
- [ ] Dark mode toggle
- [ ] Leaderboard with localStorage
- [ ] Progress tracking across sessions
- [ ] Tutorial/onboarding for new players
- [ ] Different instrument sounds (piano, synth, etc.)
- [ ] Accessibility improvements (keyboard controls, screen reader support)

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎓 What I Learned

Building this project taught me:

- **Web Audio API**: Real-time sound synthesis with oscillators, gain nodes, and ADSR envelopes
- **Game State Management**: Tracking multiple variables and game flow
- **Music Theory**: Intervals, chord construction, harmonic relationships
- **CSS Animations**: Keyframes, transitions, transforms for smooth UX
- **Responsive Design**: Mobile-first approach with media queries
- **Event-Driven Programming**: Handling user interactions and audio events
- **UI/UX Design**: Creating engaging, educational interfaces
- **Project Structure**: Organizing code for maintainability
- **Git Workflow**: Version control and deployment with GitHub Pages

## 📝 Technical Implementation Notes

### Audio Synthesis
```javascript
// Each chord = 3 simultaneous oscillators
// Example: C major = C (130.81 Hz) + E (164.81 Hz) + G (196.00 Hz)
// ADSR envelope creates realistic guitar-like sound
```

### Difficulty System
```javascript
// Easy Mode: 12 major chords
// Hard Mode: 12 major + 12 minor = 24 total chords
// Same hint system applies to both modes
```

### State Management
```javascript
// Core game state:
- currentDifficulty (easy/hard)
- currentChord (which chord is playing)
- correctCount (score)
- attemptCount (tries used)
- hasGuessed (prevent double-clicking)
```

## 📱 Browser Compatibility

Works on all modern browsers that support:
- Web Audio API
- ES6 JavaScript
- CSS3 Flexbox & Grid

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rafia Tasafi**

- GitHub: [@rafiatasafi](https://github.com/rafiatasafi)
- Project Link: [https://github.com/rafiatasafi/Chord-guessing-game](https://github.com/rafiatasafi/Chord-guessing-game)

## 🙏 Acknowledgments

- Character illustrations created with AI generation tools
- Inspired by traditional ear training exercises for musicians
- Built as a learning project to practice JavaScript and Web Audio API
- Color palette inspired by retro music aesthetics
- Thanks to the web development community for excellent documentation

## 🎵 Fun Facts

- The Web Audio API can synthesize sounds in real-time without any audio files!
- Major chords sound "happy" because of the major 3rd interval (4 semitones)
- Minor chords sound "sad" because of the minor 3rd interval (3 semitones)
- Professional musicians can identify chords instantly - this game helps you train that skill!
- The ADSR envelope mimics how real guitar strings vibrate and decay

---

**Made with 🎵 and ☕ by Rafia Tasafi**

⭐ Star this repo if you found it helpful!

🎸 Happy ear training!
