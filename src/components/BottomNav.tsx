
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'bg-red-500 text-white' : 'text-gray-500'} rounded-full ${location.pathname === '/' ? '' : '-mt-4'}`}
      >
        <span className="text-2xl">🎲</span>
        <span className="text-xs">Games</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <span className="text-2xl">💰</span>
        <span className="text-xs">Wallet</span>
      </button>
      <button 
        onClick={() => navigate('/account')}
        className={`flex flex-col items-center p-2 ${location.pathname === '/account' ? 'text-red-500' : 'text-gray-500'}`}
      >
        <span className="text-2xl">👤</span>
        <span className="text-xs">Account</span>
      </button>
    </div>
  );
};

export default BottomNav;
