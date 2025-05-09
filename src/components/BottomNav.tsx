
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { History, User } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="grid grid-cols-5 gap-1">
        <button className="flex flex-col items-center p-2 text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21l-8.5-8.5a4.8 4.8 0 010-6.8 4.8 4.8 0 016.8 0L12 7.4l1.7-1.7a4.8 4.8 0 016.8 0 4.8 4.8 0 010 6.8L12 21z" />
          </svg>
          <span className="text-xs">Promotion</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12L12 7l-8 5m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
            <path d="M12 22V7" />
            <path d="M12 7L4 3h16l-8 4z" />
          </svg>
          <span className="text-xs">Activity</span>
        </button>
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center ${location.pathname === '/' ? 'bg-red-500 text-white' : 'text-gray-400'} rounded-full h-16 w-16 -mt-5 mx-auto`}
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </button>
        <Link to="/withdraw-history" className="flex flex-col items-center p-2 text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <span className="text-xs">Wallet</span>
        </Link>
        <Link to="/account" className="flex flex-col items-center p-2 text-gray-400">
          <User className="w-6 h-6" />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
