import { useState, useEffect } from 'react';
import { zodiacSigns } from './data/zodiacSigns';
import { shuffleArray } from './utils/shuffle';
import { Scoreboard } from './components/Scoreboard';
import { GameBoard } from './components/GameBoard';
import type { Card, ScoreState } from './types';
import { Sparkles } from 'lucide-react';

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [score, setScore] = useState<ScoreState>({
    currentScore: 0,
    bestScore: 0,
  });

  useEffect(() => {
    const fetchZodiacImages = async () => {
      try {
        const cardsData = await Promise.all(
          zodiacSigns.map(async (sign) => {
            const response = await fetch(
              `https://source.unsplash.com/featured/400x300?${sign.query}`
            );
            return {
              id: crypto.randomUUID(),
              name: sign.name,
              imageUrl: response.url,
              selected: false,
            };
          })
        );
        setCards(shuffleArray(cardsData));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchZodiacImages();
  }, []);

  const handleCardSelect = (id: string) => {
    const selectedCard = cards.find(card => card.id === id);
    if (!selectedCard) return;

    if (selectedCard.selected) {
      // Reset game if card was already selected
      setScore(prev => ({
        currentScore: 0,
        bestScore: prev.bestScore,
      }));
      setCards(prevCards =>
        shuffleArray(prevCards.map(card => ({ ...card, selected: false })))
      );
    } else {
      // Update score and continue game
      const newScore = score.currentScore + 1;
      setScore(prev => ({
        currentScore: newScore,
        bestScore: Math.max(prev.bestScore, newScore),
      }));
      setCards(prevCards =>
        shuffleArray(
          prevCards.map(card =>
            card.id === id ? { ...card, selected: true } : card
          )
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            Zodiac Memory Game
            <Sparkles className="w-8 h-8" />
          </h1>
          <p className="text-purple-200 text-lg mb-6">
            Test your memory! Click on each zodiac sign only once.
          </p>
          <Scoreboard currentScore={score.currentScore} bestScore={score.bestScore} />
        </div>
        <GameBoard cards={cards} onCardSelect={handleCardSelect} />
      </div>
    </div>
  );
}

export default App;