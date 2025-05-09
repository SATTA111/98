
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { User, Wallet } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);

  useEffect(() => {
    // Get deposit history and calculate total
    const depositHistory = JSON.parse(localStorage.getItem('depositHistory') || '[]');
    const depositTotal = depositHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    setTotalDeposit(depositTotal);
    
    // Get withdrawal history and calculate total
    const withdrawHistory = JSON.parse(localStorage.getItem('withdrawHistory') || '[]');
    const withdrawalTotal = withdrawHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    setTotalWithdrawal(withdrawalTotal);
    
    // Listen for changes in localStorage
    const handleStorage = () => {
      const newDepositHistory = JSON.parse(localStorage.getItem('depositHistory') || '[]');
      const newDepositTotal = newDepositHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      setTotalDeposit(newDepositTotal);
      
      const newWithdrawHistory = JSON.parse(localStorage.getItem('withdrawHistory') || '[]');
      const newWithdrawalTotal = newWithdrawHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      setTotalWithdrawal(newWithdrawalTotal);
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
        <Link to="/withdraw-history" className="flex flex-col items-center p-2 text-gray-400 relative">
          <Wallet className="w-6 h-6" />
          <span className="text-xs">Wallet</span>
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs rounded-full p-0.5 flex items-center justify-center" style={{ minWidth: '14px', minHeight: '14px' }}>
            <span className="text-[8px] font-bold">{totalDeposit.toFixed(0)}</span>
          </div>
        </Link>
        <Link to="/account" className="flex flex-col items-center p-2 text-gray-400 relative">
          <User className="w-6 h-6" />
          <span className="text-xs">Account</span>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full p-0.5 flex items-center justify-center" style={{ minWidth: '14px', minHeight: '14px' }}>
            <span className="text-[8px] font-bold">{totalWithdrawal.toFixed(0)}</span>
          </div>
        </Link>
      </div>
      
      {/* Wallet and deposit info */}
      <div className="grid grid-cols-2 gap-2 mt-1 px-4 pb-1 text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500">Total withdrawal</span>
          <span className="text-xs font-bold text-red-500">₹{totalWithdrawal.toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500">Total deposit</span>
          <span className="text-xs font-bold text-red-500">₹{totalDeposit.toFixed(2)}</span>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
