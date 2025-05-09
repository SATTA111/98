
import React, { useEffect, useState } from 'react';

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
      <div className="flex items-center">
        <button className="p-2 text-red-500 relative">
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
