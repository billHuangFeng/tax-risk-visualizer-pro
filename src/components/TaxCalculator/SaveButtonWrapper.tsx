
import React from 'react';
import SaveDataButton from './SaveDataButton';
import { useCalculator } from '@/hooks/useCalculator';

const SaveButtonWrapper: React.FC = () => {
  const calculator = useCalculator();
  
  return (
    <SaveDataButton calculatorData={calculator} />
  );
};

export default SaveButtonWrapper;
