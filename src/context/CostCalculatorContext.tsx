import React, { createContext, useContext, useEffect, useState } from 'react';
import calculateTotalCosts, {
  TotalCosts,
} from '../calculatorFunctions/totalCosts/calculateTotalCosts';
import calculateStorageCosts, {
  StorageCostProps,
} from '../calculatorFunctions/storageCosts/calculateStorageCosts';
import calculateBaseConfigCosts, {
  BaseConfigProps,
} from '../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import config from '../config.json';
import { useRecoilValue } from 'recoil';
import { applyConversionRateState } from '../state/additionalConfig/applyConversionRateState';

interface CostContextType {
  baseConfigCosts: number;
  storageCosts: number;
  additionalCosts: number;
  conversionRatio: number;
  totalCosts: TotalCosts;
  updateBaseConfigCosts: (props: BaseConfigProps) => void;
  updateStorageCosts: (props: StorageCostProps) => void;
  setAdditionalCosts: (value: number) => void;
}

const defaultContext: CostContextType = {
  baseConfigCosts: 0,
  storageCosts: 0,
  additionalCosts: 0,
  conversionRatio: config.ConversionRateCUCC,
  totalCosts: { CU: 0, CC: 0 },
  updateBaseConfigCosts: () => {},
  updateStorageCosts: () => {},
  setAdditionalCosts: () => {},
};

const CostContext = createContext<CostContextType>(defaultContext);
export const useCostCalculator = () => useContext(CostContext);

export const CostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [baseConfigCosts, setBaseConfigCosts] = useState<number>(0);
  const [storageCosts, setStorageCosts] = useState<number>(0);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const conversionRatio = useRecoilValue<number>(applyConversionRateState);
  const [totalCosts, setTotalCosts] = useState<TotalCosts>({ CU: 0, CC: 0 });

  const updateBaseConfigCosts = (props: BaseConfigProps) => {
    const baseConfigCosts = calculateBaseConfigCosts(props);
    setBaseConfigCosts(baseConfigCosts);
  };

  const updateStorageCosts = (props: StorageCostProps) => {
    const storageCosts = calculateStorageCosts(props);
    setStorageCosts(storageCosts);
  };

  useEffect(() => {
    const totalCosts = calculateTotalCosts({
      baseConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio,
    });
    setTotalCosts(totalCosts);
  }, [baseConfigCosts, storageCosts, additionalCosts, conversionRatio]);

  return (
    <CostContext.Provider
      value={{
        baseConfigCosts,
        storageCosts,
        additionalCosts,
        conversionRatio,
        totalCosts,
        updateBaseConfigCosts,
        updateStorageCosts,
        setAdditionalCosts,
      }}
    >
      {children}
    </CostContext.Provider>
  );
};
