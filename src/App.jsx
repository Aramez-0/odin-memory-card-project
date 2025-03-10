import { useState, useEffect } from 'react'
import './App.css'
import Card from './card/card';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0)
  const [clickedPokemon, setClickedPokemon] = useState([])

  useEffect(() => {
    if (score > bestScore) setBestScore(score);
  }, [score])

  function DisplayCards() {
    const cardCount = 6;
    const cardsArray = Array(cardCount).fill(null);

    return (
      <>
        {cardsArray.map((_, index) => (
          <Card 
            key={index} 
            click={setScore} 
            clickedPokemon={clickedPokemon} 
            array={setClickedPokemon} 
          />
        ))}
      </>
    );
  }

  return (
    <div id='container'>
      <header>
        <h1>Memory Card Game</h1>
      </header>
      <main>
        <DisplayCards />
      </main>
      <footer>
        <div>
          <div>Score: {score}</div>
          <div>Best score: {bestScore}</div>
        </div>
        </footer>
    </div>
  )
}

export default App

// bestScore doesn't work
// probably cause by the batch update react does
// or i'm stupid