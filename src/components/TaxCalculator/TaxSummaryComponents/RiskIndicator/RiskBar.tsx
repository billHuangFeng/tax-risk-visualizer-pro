
import React from 'react';

interface RiskBarProps {
  riskPercentage: number;
}

const RiskBar: React.FC<RiskBarProps> = ({ riskPercentage }) => {
  return (
    <>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{ 
            width: `${riskPercentage}%`,
            backgroundColor: riskPercentage < 30 
              ? '#000000'
              : riskPercentage < 70 
                ? '#F0A500'
                : '#ea384c',
          }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <span>低风险</span>
        <span>中等风险</span>
        <span>高风险</span>
      </div>
    </>
  );
};

export default RiskBar;
