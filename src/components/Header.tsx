
import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const Header = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBal = () => {
      const rawBalance = localStorage.getItem("walletBalance");
      setBalance(rawBalance ? parseFloat(rawBalance) : 0);
    };
    getBal();
    const handler = () => getBal();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <img src="/lovable-uploads/3ca1aaf6-f21e-4877-8bf1-49aca0d40e7d.png" alt="91 Club" className="h-8" />
      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
        <span className="text-yellow-500">₹</span>
        <span className="font-medium">{balance.toFixed(2)}</span>
        <RefreshCw className="h-4 w-4 text-gray-400 cursor-pointer hover:rotate-180 transition-transform duration-500" />
      </div>
    </div>
  );
};

export default Header;

