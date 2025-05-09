
import React from 'react';

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="relative h-24 rounded-xl overflow-hidden flex items-center">
        <img 
          src="/lovable-uploads/7c030edc-4867-4789-a8e0-deba311ae319.png"
          alt="Wheel of fortune"
          className="w-full h-full object-cover absolute"
        />
        <div className="absolute p-4 text-white">
          <span className="text-xl font-bold">
            Wheel<br />of fortune
          </span>
        </div>
      </div>
      <div className="relative h-24 rounded-xl overflow-hidden flex items-center">
        <img 
          src="/lovable-uploads/42dbdaac-2f43-4be7-8960-25e847403cce.png"
          alt="VIP privileges"
          className="w-full h-full object-cover absolute"
        />
        <div className="absolute p-4 text-white">
          <span className="text-xl font-bold">
            VIP<br />privileges
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
