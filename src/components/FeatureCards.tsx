
import React from 'react';

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-gradient-to-r from-orange-400 to-red-400 p-4 rounded-xl text-white">
        <h3 className="text-xl font-medium mb-2">Wheel</h3>
        <p className="text-white/80">of fortune</p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white">
        <h3 className="text-xl font-medium mb-2">VIP</h3>
        <p className="text-white/80">privileges</p>
      </div>
    </div>
  );
};

export default FeatureCards;
