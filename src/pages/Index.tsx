
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PromoCarousel from '@/components/PromoCarousel';
import GameCategories from '@/components/GameCategories';
import { toast } from "@/hooks/use-toast";
import NotificationBanner from '@/components/NotificationBanner';

const Index = () => {
  const navigate = useNavigate();
  
  // Handler for game image click
  const handleGameClick = () => {
    toast({
      title: "Minimum Deposit Required",
      description: "Minimum deposit is ₹500 to play this game.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <NotificationBanner />
      <PromoCarousel />
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 text-lg">💰</span>
          <span className="text-gray-700 ml-2">Wallet balance</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">₹0.15</span>
            <button className="p-1">
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                <path d="M12 4V1M12 23v-3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12M1 12h3M23 12h-3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/withdraw')}
              className="flex flex-col items-center justify-center bg-gradient-to-r from-orange-300 to-orange-400 text-white px-8 py-3 rounded-lg font-medium"
            >
              <ArrowUp className="h-5 w-5 mb-1" />
              <span>Withdraw</span>
            </button>
            <button 
              onClick={() => navigate('/deposit')}
              className="flex flex-col items-center justify-center bg-gradient-to-r from-red-400 to-red-500 text-white px-8 py-3 rounded-lg font-medium"
            >
              <ArrowDown className="h-5 w-5 mb-1" />
              <span>Deposit</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative h-20 rounded-xl overflow-hidden">
            <img 
              src="/lovable-uploads/7c030edc-4867-4789-a8e0-deba311ae319.png"
              alt="Wheel of fortune"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center p-4">
              <span className="text-white text-xl font-bold">
                Wheel<br />of fortune
              </span>
            </div>
          </div>
          <div className="relative h-20 rounded-xl overflow-hidden">
            <img 
              src="/lovable-uploads/42dbdaac-2f43-4be7-8960-25e847403cce.png"
              alt="VIP privileges"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center p-4">
              <span className="text-white text-xl font-bold">
                VIP<br />privileges
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-t-3xl shadow-lg">
        <GameCategories />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">
              8
            </div>
            <div>
              <h2 className="text-xl font-bold">Lottery</h2>
              <p className="text-gray-500 text-sm">
                The games are independently developed by our team, fun, fair, and safe
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="aspect-video bg-blue-100 rounded-xl overflow-hidden cursor-pointer relative" onClick={handleGameClick}>
              <img 
                src="/lovable-uploads/5afca07a-0c74-4b32-8ae4-2906146503c9.png"
                alt="Win Go"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">WIN GO</h3>
              </div>
            </div>
            <div className="aspect-video bg-orange-100 rounded-xl overflow-hidden cursor-pointer relative" onClick={handleGameClick}>
              <img 
                src="/lovable-uploads/825f07e4-8b47-423a-b362-853f7498bfc7.png"
                alt="K3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">K3</h3>
              </div>
            </div>
            <div className="aspect-video bg-green-400 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center" onClick={handleGameClick}>
              <h3 className="text-white text-3xl font-bold">5D</h3>
            </div>
            <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center" onClick={handleGameClick}>
              <h3 className="text-white text-3xl font-bold">TRY WINGO</h3>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
