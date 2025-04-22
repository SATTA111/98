
import React from 'react';
import { Gamepad2 as Lobby, LayoutGrid as MiniGame, Dice1 as Slots, CreditCard as Card, Fish as Fishing } from 'lucide-react';

const categories = [
  { icon: Lobby, label: 'Lobby' },
  { icon: MiniGame, label: 'Mini game' },
  { icon: Slots, label: 'Slots' },
  { icon: Card, label: 'Card' },
  { icon: Fishing, label: 'Fishing' },
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
