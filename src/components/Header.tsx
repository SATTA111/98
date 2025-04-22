
import React from 'react';
import { RefreshCw } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <img src="/lovable-uploads/d2c2c007-1fd1-4062-bb9e-f34612b6efdd.png" alt="91 Club" className="h-8" />
      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
        <span className="text-yellow-500">₹</span>
        <span className="font-medium">0.51</span>
        <RefreshCw className="h-4 w-4 text-gray-400 cursor-pointer hover:rotate-180 transition-transform duration-500" />
      </div>
    </div>
  );
};

export default Header;
