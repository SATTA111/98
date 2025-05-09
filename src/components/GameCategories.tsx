
import React from 'react';

const categories = [
  { icon: '🏠', label: 'Lobby', active: true },
  { icon: '🎮', label: 'Mini game', active: false },
  { icon: '🎰', label: 'Slots', active: false },
  { icon: '🃏', label: 'Card', active: false },
  { icon: '🎣', label: 'Fishing', active: false },
];

const GameCategories = () => {
  return (
    <div className="flex justify-between px-2 py-4 border-b overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.label}
          className={`flex flex-col items-center min-w-[4.5rem] gap-1 px-2 
            ${category.active ? 'text-red-500' : 'text-gray-500'} transition-colors`}
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="text-sm">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GameCategories;
