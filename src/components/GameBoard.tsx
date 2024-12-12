import { Card } from './Card';
import type { Card as CardType } from '../types';

interface GameBoardProps {
  cards: CardType[];
  onCardSelect: (id: string) => void;
}

export function GameBoard({ cards, onCardSelect }: GameBoardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} onSelect={onCardSelect} />
      ))}
    </div>
  );
}