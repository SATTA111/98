
import React from 'react';
import Header from '@/components/Header';
import ActionButtons from '@/components/ActionButtons';
import FeatureCards from '@/components/FeatureCards';
import GameCategories from '@/components/GameCategories';
import BottomNav from '@/components/BottomNav';
import PromoCarousel from '@/components/PromoCarousel';
import { toast } from "@/hooks/use-toast";

const Index = () => {
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
      <PromoCarousel />
      <ActionButtons />
      <FeatureCards />
      <div className="bg-white rounded-t-3xl mt-4 shadow-lg">
        <GameCategories />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Lottery</h2>
          <p className="text-gray-500 mb-6">
            The games are independently developed by our team, fun, fair, and safe
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video rounded-xl overflow-hidden cursor-pointer" onClick={handleGameClick}>
              <img 
                src="/lovable-uploads/5afca07a-0c74-4b32-8ae4-2906146503c9.png"
                alt="Win Go"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden cursor-pointer" onClick={handleGameClick}>
              <img 
                src="/lovable-uploads/825f07e4-8b47-423a-b362-853f7498bfc7.png"
                alt="K3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
