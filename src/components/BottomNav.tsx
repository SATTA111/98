
import React from 'react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
      <button className="flex flex-col items-center p-2 text-gray-500">
        <span className="text-2xl">🎮</span>
        <span className="text-xs">Promotion</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <span className="text-2xl">🎁</span>
        <span className="text-xs">Activity</span>
      </button>
      <button className="flex flex-col items-center p-2 bg-red-500 text-white rounded-full -mt-4">
        <span className="text-2xl">🎲</span>
        <span className="text-xs">Games</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <span className="text-2xl">💰</span>
        <span className="text-xs">Wallet</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <span className="text-2xl">👤</span>
        <span className="text-xs">Account</span>
      </button>
    </div>
  );
};

export default BottomNav;
