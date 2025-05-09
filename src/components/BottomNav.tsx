
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { History } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="grid grid-cols-5 gap-1">
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
        <Link to="/withdraw-history" className="flex flex-col items-center p-2 text-gray-500">
          <History className="w-6 h-6" />
          <span className="text-xs">Transaction</span>
        </Link>
        <Link to="/account" className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl">👤</span>
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
