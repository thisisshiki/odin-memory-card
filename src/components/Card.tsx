import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onSelect: (id: string) => void;
}

export function Card({ card, onSelect }: CardProps) {
  return (
    <div
      onClick={() => onSelect(card.id)}
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="rounded-xl overflow-hidden shadow-lg bg-white">
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4 bg-gradient-to-b from-purple-600/90 to-purple-800/90">
          <h3 className="text-lg font-semibold text-white text-center">
            {card.name}
          </h3>
        </div>
      </div>
    </div>
  );
}