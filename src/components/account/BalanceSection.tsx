
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import WithdrawalForm from './WithdrawalForm';

interface BalanceSectionProps {
  balance: number;
  onWithdraw: (amount: number) => void;
}

const BalanceSection = ({ balance, onWithdraw }: BalanceSectionProps) => {
  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <h3 className="text-lg mb-2">Total balance</h3>
      <div className="flex items-center">
        <span className="text-2xl font-bold">₹{balance.toFixed(2)}</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <svg className="h-4 w-4 rotate-90" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/>
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Withdraw</DialogTitle>
            </DialogHeader>
            <WithdrawalForm onWithdraw={onWithdraw} maxAmount={balance} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BalanceSection;
