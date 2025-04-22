
import React from 'react';
import Header from '@/components/Header';
import ActionButtons from '@/components/ActionButtons';
import FeatureCards from '@/components/FeatureCards';
import GameCategories from '@/components/GameCategories';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
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
            {Array(4).fill(0).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold"
              >
                Game {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
