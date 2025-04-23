import React, { useState, useEffect } from 'react';
import { Copy, ChevronRight, History, Wallet, Gift, Languages, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const uid = Math.random().toString(36).substring(2, 10).toUpperCase();
  const lastLogin = new Date().toLocaleString();
  const [balance, setBalance] = useState(0.51);

  useEffect(() => {
    const storedBalance = localStorage.getItem('walletBalance');
    setBalance(storedBalance ? parseFloat(storedBalance) : 0);
    const fn = () => {
      const latestBalance = localStorage.getItem('walletBalance');
      setBalance(latestBalance ? parseFloat(latestBalance) : 0);
    };
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, []);

  const copyUID = () => {
    navigator.clipboard.writeText(uid);
    toast.success("UID copied to clipboard");
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-red-400 to-red-500 p-6 text-white rounded-b-[2rem]">
        <div className="flex flex-col items-center pt-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-3 overflow-hidden">
            <img
              src="/lovable-uploads/42dbdaac-2f43-4be7-8960-25e847403cce.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mb-2">MEMBERNNGWRTRH</h2>
          <div className="flex items-center gap-2">
            <span>UID: {uid}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
              onClick={copyUID}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm mt-1">Last login: {lastLogin}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl p-4 mb-4">
          <h3 className="text-lg mb-2">Total balance</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold">₹{balance.toFixed(2)}</span>
            <Button variant="ghost" size="icon" className="ml-2">
              <svg className="h-4 w-4 rotate-90" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/>
              </svg>
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-red-500" />
              </div>
              <span className="text-xs">ARWallet</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-2 h-auto py-2"
              onClick={() => navigate('/deposit')}
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xs">Deposit</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24">
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xs">Withdraw</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                V
              </div>
              <span className="text-xs">VIP</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button variant="outline" className="h-auto p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <History className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-left">
              <div className="font-medium">Game History</div>
              <div className="text-sm text-gray-500">My game history</div>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <History className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="text-left">
              <div className="font-medium">Transaction</div>
              <div className="text-sm text-gray-500">My transaction history</div>
            </div>
          </Button>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-between h-auto py-4"
            onClick={() => navigate("/gift")}
          >
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Gift className="h-5 w-5 text-red-500" />
              </div>
              <span>Gifts</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          <Button variant="outline" className="w-full justify-between h-auto py-4">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-red-500" />
              </div>
              <span>Game statistics</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          <Button variant="outline" className="w-full justify-between h-auto py-4">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Languages className="h-5 w-5 text-red-500" />
              </div>
              <span>Language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">English</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AccountPage;
