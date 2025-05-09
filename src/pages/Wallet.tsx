
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

const Wallet = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0.15);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);

  useEffect(() => {
    // Get wallet balance
    const storedBalance = localStorage.getItem('walletBalance');
    setBalance(storedBalance ? parseFloat(storedBalance) : 0.15);

    // Get deposit history and calculate total
    const depositHistory = JSON.parse(localStorage.getItem('depositHistory') || '[]');
    const depositTotal = depositHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    setTotalDeposit(depositTotal || 6870); // Default to 6870 if no data
    
    // Get withdrawal history and calculate total
    const withdrawHistory = JSON.parse(localStorage.getItem('withdrawHistory') || '[]');
    const withdrawalTotal = withdrawHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    setTotalWithdrawal(withdrawalTotal || 3720); // Default to 3720 if no data
    
    // Listen for changes in localStorage
    const handleStorage = () => {
      const newBalance = localStorage.getItem('walletBalance');
      setBalance(newBalance ? parseFloat(newBalance) : 0.15);
      
      const newDepositHistory = JSON.parse(localStorage.getItem('depositHistory') || '[]');
      const newDepositTotal = newDepositHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      setTotalDeposit(newDepositTotal || 6870);
      
      const newWithdrawHistory = JSON.parse(localStorage.getItem('withdrawHistory') || '[]');
      const newWithdrawalTotal = newWithdrawHistory.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      setTotalWithdrawal(newWithdrawalTotal || 3720);
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Wallet</h1>
          <div className="w-6"></div>
        </div>
        
        {/* Wallet icon and balance */}
        <div className="flex flex-col items-center mt-6 mb-8">
          <svg className="w-12 h-12 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 7h-1V6a3 3 0 00-3-3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3zm-1 9a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          <div className="text-3xl font-bold">₹{balance.toFixed(2)}</div>
          <div className="text-sm mt-1">Total balance</div>
        </div>
        
        {/* Total amounts */}
        <div className="flex justify-between px-8">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalWithdrawal.toFixed(0)}</div>
            <div className="text-sm">Total amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{totalDeposit.toFixed(0)}</div>
            <div className="text-sm">Total deposit amount</div>
          </div>
        </div>
      </div>
      
      {/* Main Content - Wallet Info & Actions */}
      <div className="bg-white rounded-t-3xl -mt-4 p-6">
        {/* Wallet Types */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-8 border-red-500 flex items-center justify-center mb-2">
              <span className="text-xl font-bold">100%</span>
            </div>
            <div className="text-xl font-medium">₹{balance.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Main wallet</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
              <span className="text-xl font-bold">0%</span>
            </div>
            <div className="text-xl font-medium">₹0.00</div>
            <div className="text-sm text-gray-600">3rd party wallet</div>
          </div>
        </div>
        
        {/* Transfer Button */}
        <Button className="w-full py-6 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full mb-8">
          <span className="text-lg">Main wallet transfer</span>
        </Button>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4">
          <Link to="/deposit" className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z" />
                <path d="M3 6l9 4 9-4" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Deposit</span>
          </Link>
          
          <Link to="/withdraw" className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M12 12h6M12 8h4M12 16h2" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Withdraw</span>
          </Link>
          
          <Link to="/deposit-history" className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Deposit history</span>
          </Link>
          
          <Link to="/withdraw-history" className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Withdrawal history</span>
          </Link>
        </div>
        
        {/* Game Wallet Balances */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg p-4 text-center text-white">
            <div className="text-xl font-bold">0.15</div>
            <div className="text-sm">Lottery</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gray-700">0.00</div>
            <div className="text-sm text-gray-600">TB_Chess</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gray-700">0.00</div>
            <div className="text-sm text-gray-600">Wickets9</div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Wallet;
