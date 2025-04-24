
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';
import ProfileHeader from '@/components/account/ProfileHeader';
import BalanceSection from '@/components/account/BalanceSection';
import QuickActions from '@/components/account/QuickActions';
import HistoryActions from '@/components/account/HistoryActions';
import SettingsMenu from '@/components/account/SettingsMenu';

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

  const handleWithdraw = (amount: number) => {
    if (amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    const newBalance = balance - amount;
    localStorage.setItem('walletBalance', newBalance.toString());
    window.dispatchEvent(new Event('storage'));

    const withdrawalRecord = {
      amount: amount.toString(),
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
      status: 'pending',
      upiId: 'default-upi',
      bankName: 'default-bank',
      mobileNumber: 'default-mobile'
    };

    const history = JSON.parse(localStorage.getItem("withdrawHistory") || "[]");
    localStorage.setItem(
      "withdrawHistory", 
      JSON.stringify([withdrawalRecord, ...history])
    );

    toast.success(`Withdrawn ₹${amount}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-red-400 to-red-500 p-6 text-white rounded-b-[2rem]">
        <ProfileHeader uid={uid} lastLogin={lastLogin} />
      </div>

      <div className="p-4">
        <BalanceSection balance={balance} onWithdraw={handleWithdraw} />
        <QuickActions />
        <HistoryActions />
        <SettingsMenu />
      </div>

      <BottomNav />
    </div>
  );
};

export default AccountPage;
