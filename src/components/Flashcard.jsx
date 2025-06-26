

function Flashcard({ question, answer, isFlipped, onFlip }) {
  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={onFlip}>
        <div className="card-content">
          {isFlipped ? (
            // render the answer
            <div className="answer">
              <h3>Answer:</h3>
              <p>{answer}</p>
            </div>
          ) : (
            // else, render the questions
            <div className="question">
              <h3>Guess:</h3>
              <p>{question}</p>
            </div>
          )}
        </div>
      </div>
      <p className="instruction">{isFlipped ? "Click card to see question again" : "Click card to reveal answer"}</p>
    </div>
  )
}

export default Flashcard

