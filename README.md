# 🎸 Chord Guessing Game

An interactive web-based ear training application that helps musicians practice identifying major chords by ear. Built with vanilla JavaScript and Web Audio API.

## 🎵 Live Demo

[Play the game here](https://rafiatasafi.github.io/chord-guessing-game/)

## 📋 Features

- **12 Major Chords**: Practice identifying C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, and B major chords
- **Realistic Sound**: Guitar-like tones generated using Web Audio API with ADSR envelope synthesis
- **Game Mechanics**: 20-round sessions with score tracking and accuracy calculation
- **Real-time Feedback**: Instant visual feedback for correct/incorrect answers
- **Responsive Design**: Works on desktop and mobile devices
- **No Installation Required**: Runs entirely in the browser

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6)** - Game logic and interactivity
- **Web Audio API** - Real-time audio synthesis

## 🎮 How to Play

1. Click the **"🎵 Play Chord"** button to hear a random chord
2. You can replay the chord as many times as needed
3. Select the chord you think you heard from the 12 options
4. Get instant feedback on whether you were correct
5. Click **"Next Chord →"** to continue
6. Complete 20 rounds and see your final score!

## 🚀 Getting Started

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/rafiatasafi/chord-guessing-game.git
```

2. Navigate to the project folder:
```bash
cd chord-guessing-game
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

No build process or dependencies required!

## 📁 Project Structure

```
chord-guessing-game/
├── index.html              # Main game file (production version)
├── study-version.html      # Commented version for learning
└── README.md              # Project documentation
```

## 🎯 Game Mechanics

- **Score Tracking**: Tracks correct answers out of 20 total attempts
- **Accuracy Calculation**: Real-time percentage display
- **Round Limit**: Game ends after 20 attempts
- **Reset Function**: Start over at any time with the reset button

## 🔊 Audio Technology

The game uses the Web Audio API to synthesize chord sounds:

- **Oscillators**: Generate sound waves at specific frequencies
- **ADSR Envelope**: Creates realistic attack, decay, sustain, and release
- **Sawtooth Waveform**: Produces guitar-like timbre
- **Multi-note Synthesis**: Plays 3 notes simultaneously to create chords

## 🎨 Future Improvements

- [ ] Add minor chords and other chord types
- [ ] Implement difficulty levels (beginner/intermediate/advanced)
- [ ] Add note identification mode
- [ ] Include sound effects for feedback
- [ ] Add timer/speed mode
- [ ] Implement dark mode toggle
- [ ] Add chord progression practice mode
- [ ] Include visual chord diagrams

## 📚 What I Learned

This project helped me learn:

- DOM manipulation and event handling in JavaScript
- Web Audio API for real-time sound synthesis
- CSS animations and transitions
- Responsive design with CSS Grid and Flexbox
- Git version control and GitHub Pages deployment
- Clean code practices and project organization

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**

- GitHub: [@rafiatasafi](https://github.com/rafiatasafi)
- LinkedIn: [@rafiatasafi](https://linkedin.com/in/rafiatasafi)

## 🙏 Acknowledgments

- Inspired by ear training exercises for musicians
- Built as a learning project to practice JavaScript and Web Audio API
- Thanks to the web development community for excellent documentation and resources

---

⭐ Star this repo if you found it helpful!
