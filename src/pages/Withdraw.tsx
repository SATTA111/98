
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>('');
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>('bank');
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem('walletBalance');
    return storedBalance ? parseFloat(storedBalance) : 0;
  });
  
  const handleWithdraw = () => {
    const amountNum = parseFloat(amount);
    
    if (!amount || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amountNum > balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    // Process withdrawal
    const newBalance = balance - amountNum;
    localStorage.setItem('walletBalance', newBalance.toString());
    
    const withdrawalRecord = {
      amount: amount,
      timestamp: new Date().toISOString(),
      id: "WD" + Date.now().toString(),
      status: 'completed',
      upiId: 'default-upi',
      bankName: withdrawalMethod === 'bank' ? 'BANK CARD' : 'USDT',
      mobileNumber: '035110****977',
      type: withdrawalMethod === 'bank' ? 'BANK CARD' : 'USDT'
    };

    const history = JSON.parse(localStorage.getItem("withdrawHistory") || "[]");
    localStorage.setItem(
      "withdrawHistory", 
      JSON.stringify([withdrawalRecord, ...history])
    );
    
    toast.success(`Withdrawal of ₹${amount} initiated`);
    navigate('/withdraw-history');
  };

  const handleMaxAmount = () => {
    setAmount(balance.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Withdraw</h1>
          <Button 
            variant="ghost" 
            className="text-primary font-medium"
            onClick={() => navigate('/withdraw-history')}
          >
            Withdrawal history
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Available Balance Section */}
        <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-6 text-white mb-4">
          <div className="text-sm mb-2">Available balance</div>
          <div className="flex items-center">
            <span className="text-3xl font-bold">₹{balance.toFixed(2)}</span>
            <span className="ml-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/>
              </svg>
            </span>
          </div>
          <div className="mt-6 opacity-70">**** ****</div>
        </div>
        
        {/* ARPay Section */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <div className="font-medium">ARPay</div>
              <div className="text-sm text-gray-500">Supports UPI for fast payment, and bonuses for withdrawals</div>
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button 
            className={`p-4 rounded-xl ${withdrawalMethod === 'bank' ? 'bg-red-500 text-white' : 'bg-white'} flex flex-col items-center justify-center`}
            onClick={() => setWithdrawalMethod('bank')}
          >
            <div className={`h-10 w-10 ${withdrawalMethod === 'bank' ? 'bg-red-400' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
              <span className={`${withdrawalMethod === 'bank' ? 'text-white' : 'text-red-500'}`}>💳</span>
            </div>
            <div className="mt-2 font-medium">BANK CARD</div>
          </button>
          
          <button 
            className={`p-4 rounded-xl ${withdrawalMethod === 'usdt' ? 'bg-red-500 text-white' : 'bg-white'} flex flex-col items-center justify-center`}
            onClick={() => setWithdrawalMethod('usdt')}
          >
            <div className={`h-10 w-10 ${withdrawalMethod === 'usdt' ? 'bg-red-400' : 'bg-teal-100'} rounded-lg flex items-center justify-center`}>
              <span className={`${withdrawalMethod === 'usdt' ? 'text-white' : 'text-teal-500'}`}>₮</span>
            </div>
            <div className="mt-2 font-medium">USDT</div>
          </button>
        </div>
        
        {/* Bank Info */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-red-500">🏦</div>
              <div>India Post Bank</div>
            </div>
            <div className="text-gray-500">035110****977 &gt;</div>
          </div>
        </div>
        
        {/* Amount Input */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center border-b pb-4">
            <span className="text-red-500 mr-2">₹</span>
            <Input
              className="border-none text-lg h-12 flex-1"
              placeholder="Please enter the amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-500">Withdrawable balance ₹{balance.toFixed(2)}</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 border-red-500"
              onClick={handleMaxAmount}
            >
              All
            </Button>
          </div>
          
          <div className="mt-2 text-gray-500">Withdrawal amount received</div>
          <div className="text-xl font-medium">₹{amount ? parseFloat(amount).toFixed(2) : "0.00"}</div>
        </div>
        
        {/* Submit Button */}
        <Button 
          className="w-full py-6 bg-gradient-to-r from-red-400 to-red-500 text-white text-lg font-medium rounded-xl"
          onClick={handleWithdraw}
        >
          Withdraw
        </Button>
        
        {/* Withdrawal Info */}
        <div className="mt-6 p-4 bg-white rounded-xl">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-red-500">◆</span>
              <span>Need to bet ₹0.00 to be able to withdraw</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">◆</span>
              <span>Withdraw time 00:05-23:55</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">◆</span>
              <span>Today Remaining Withdrawal Times: 3</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">◆</span>
              <span>Withdrawal amount range ₹110.00-₹200,000.00</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">◆</span>
              <span>Please confirm your beneficial account information before withdrawing. If your information is incorrect, our company will not be liable for the amount of loss</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">◆</span>
              <span>If your beneficial information is incorrect, please contact customer service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
