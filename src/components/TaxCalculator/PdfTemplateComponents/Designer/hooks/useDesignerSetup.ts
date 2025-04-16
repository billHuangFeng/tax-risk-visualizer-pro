
import { useRef, useState, useEffect } from 'react';

export const useDesignerSetup = (initialReport?: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This is a placeholder function since PDF functionality was removed
    console.log("Designer setup was called but PDF functionality has been removed");
    // No need to actually initialize the PDF designer
    
    return () => {
      // Cleanup function
    };
  }, [initialReport]);

  return {
    containerRef,
    error
  };
};
