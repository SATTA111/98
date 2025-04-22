
import React from 'react';
import { lobby, mini-game as MiniGame, slots, card, fishing } from 'lucide-react';

const categories = [
  { icon: lobby, label: 'Lobby' },
  { icon: MiniGame, label: 'Mini game' },
  { icon: slots, label: 'Slots' },
  { icon: card, label: 'Card' },
  { icon: fishing, label: 'Fishing' },
];

const GameCategories = () => {
  return (
    <div className="flex justify-between p-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.label}
          className="flex flex-col items-center min-w-[4.5rem] gap-1 hover:text-red-500 transition-colors"
        >
          <category.icon className="h-6 w-6" />
          <span className="text-sm">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GameCategories;
