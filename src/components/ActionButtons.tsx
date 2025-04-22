
import React from 'react';
import { withdraw, deposit } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div className="flex gap-4 p-4">
      <button className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <withdraw className="h-5 w-5" />
        Withdraw
      </button>
      <button className="flex-1 bg-gradient-to-r from-red-400 to-red-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <deposit className="h-5 w-5" />
        Deposit
      </button>
    </div>
  );
};

export default ActionButtons;
