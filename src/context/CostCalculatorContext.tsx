import React, { createContext, useContext, useEffect, useState } from 'react';
import calculateTotalCosts, {
  TotalCosts,
} from '../calculatorFunctions/totalCosts/calculateTotalCosts';
import config from '../config.json';

interface CostContextType {
  nodeConfigCosts: number;
  storageCosts: number;
  additionalCosts: number;
  conversionRatio: number;
  totalCosts: TotalCosts;
  setNodeConfigCosts: React.Dispatch<React.SetStateAction<number>>;
  setStorageCosts: React.Dispatch<React.SetStateAction<number>>;
  setAdditionalCosts: React.Dispatch<React.SetStateAction<number>>;
  setConversionRatio: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContext: CostContextType = {
  nodeConfigCosts: 0,
  storageCosts: 0,
  additionalCosts: 0,
  conversionRatio: config.ConversionRateCUCC,
  totalCosts: { CU: 0, CC: 0 },
  setNodeConfigCosts: () => {},
  setStorageCosts: () => {},
  setAdditionalCosts: () => {},
  setConversionRatio: () => {},
};

const CostContext = createContext<CostContextType>(defaultContext);
export const useCostCalculator = () => useContext(CostContext);

export const CostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nodeConfigCosts, setNodeConfigCosts] = useState<number>(0);
  const [storageCosts, setStorageCosts] = useState<number>(0);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const [conversionRatio, setConversionRatio] = useState<number>(
    config.ConversionRateCUCC,
  );

  const [totalCosts, setTotalCosts] = useState<TotalCosts>({ CU: 0, CC: 0 });

  useEffect(() => {
    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio,
    });
    setTotalCosts(totalCosts);
  }, [nodeConfigCosts, storageCosts, additionalCosts, conversionRatio]);

  return (
    <CostContext.Provider
      value={{
        nodeConfigCosts,
        storageCosts,
        additionalCosts,
        conversionRatio,
        totalCosts,
        setNodeConfigCosts,
        setStorageCosts,
        setAdditionalCosts,
        setConversionRatio,
      }}
    >
      {children}
    </CostContext.Provider>
  );
};
