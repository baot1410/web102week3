import { useState } from "react"
import Flashcard from './components/Flashcard'
import './App.css'

function App() {
  const cards = [
    {
      question: "Most goals scored in a single World Cup tournament (13 goals)",
      answer: "Just Fontaine (1958)",
    },
    {
      question: "Team with the most UEFA Champions League titles",
      answer: "Real Madrid (15 titles)",
    },
    {
      question: "Player with the most Ballon d'Or awards",
      answer: "Lionel Messi (8 awards)",
    },
    {
      question: "Country that has won the most FIFA World Cups",
      answer: "Brazil (5 titles)",
    },
    {
      question: "Player with the most international goals of all time",
      answer: "Cristiano Ronaldo (130+ goals)",
    },
    {
      question: "Fastest goal ever scored in World Cup history",
      answer: "Hakan Şükür (10.8 seconds, 2002)",
    },
    {
      question: "Team that went undefeated in the Premier League season",
      answer: "Arsenal (2003-04 'Invincibles')",
    },
    {
      question: "Player with the most Champions League goals",
      answer: "Cristiano Ronaldo (140+ goals)",
    },
    {
      question: "Most expensive football transfer ever",
      answer: "Neymar to PSG (€222 million)",
    },
    {
      question: "Youngest player to score in a World Cup final",
      answer: "Pelé (17 years old, 1958)",
    },
  ]

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [userGuess, setUserGuess] = useState("")
  const [guessResult, setGuessResult] = useState(null) // null, 'correct', or 'incorrect'
  const [hasGuessed, setHasGuessed] = useState(false)

  // Flip the card to show answer
  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  // Check if the user's guess is correct (fuzzy matching)
  const checkGuess = () => {
    if (!userGuess.trim()) return

    const currentAnswer = cards[currentCardIndex].answer.toLowerCase()
    const guess = userGuess.toLowerCase().trim()

    // Simple fuzzy matching - check if key parts of the answer are in the guess
    const isCorrect = currentAnswer.includes(guess) || guess.includes(currentAnswer.split(" ")[0])

    setGuessResult(isCorrect ? "correct" : "incorrect")
    setHasGuessed(true)
  }

  // Navigate to next card
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      resetCardState()
    }
  }

  // Navigate to previous card
  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      resetCardState()
    }
  }

  // Reset card state when navigating
  const resetCardState = () => {
    setIsFlipped(false)
    setUserGuess("")
    setGuessResult(null)
    setHasGuessed(false)
  }

  const currentCard = cards[currentCardIndex]
  const isFirstCard = currentCardIndex === 0
  const isLastCard = currentCardIndex === cards.length - 1

  return (
    <div className="app-container">
      <div className="header">
        <h1>Soccer Stats Flashcards</h1>
        <p>Test your knowledge of soccer history and records</p>
        <p className="card-count"> Card {currentCardIndex + 1} of {cards.length} </p>
      </div>

      <Flashcard question={currentCard.question} answer={currentCard.answer} isFlipped={isFlipped} onFlip={flipCard} />

      {!hasGuessed && !isFlipped && (
        <div className="guess-section">
          <div className="input-group">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess..."
              className="guess-input"
            />
            <button onClick={checkGuess} className="submit-button" disabled={!userGuess.trim()}> Submit Guess </button>
          </div>
        </div>
      )}

      {guessResult && (
        <div className={`feedback ${guessResult}`}>
          {guessResult === "correct" ? (
            <p>🎉 Correct! Great job!</p>
          ) : (
            <p>❌ Not quite right. Click the card to see the answer!</p>
          )}
        </div>
      )}

      <div className="navigation">
        <button onClick={previousCard} className={`nav-button ${isFirstCard ? "disabled" : ""}`} disabled={isFirstCard}> ← Previous </button>

        <button onClick={nextCard} className={`nav-button ${isLastCard ? "disabled" : ""}`} disabled={isLastCard}> Next →</button>
      </div>
    </div>
  )
}

export default App

