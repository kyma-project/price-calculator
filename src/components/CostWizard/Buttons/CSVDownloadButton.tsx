import React from 'react';
import { Button, Icon } from '@ui5/webcomponents-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import { additionalCostsState } from '../../../state/costs/additionalCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import { MachineSetup, machineSetupState } from '../../../state/nodes/machineSetupState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportCSV from '../Functions/exportCSV';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { RedisSize, redisState } from '../../../state/additionalConfig/redisState';
import { useCostCalculator } from '../../../context/CostCalculatorContext';

export default function CSVDownloadButton() {
  const [machineSetup] = useRecoilState<MachineSetup[]>(machineSetupState);
  const storageQuantity: number = useRecoilValue<number>(GBQuantityState);
  const premiumStorageQuantity: number = useRecoilValue<number>(premiumGBQuantityState);
  const storageTime: number = useRecoilValue<number>(
    timeConsumptionStorageState,
  );
  const redisSize = useRecoilValue<RedisSize>(redisState);
    const { baseConfigCosts, storageCosts, additionalCosts, totalCosts } =
    useCostCalculator();

  return (
    <Button
      className="DownloadButton"
      design="Emphasized"
      onClick={() =>
        exportCSV({
          baseCosts: baseConfigCosts,
          machineSetup,
          storageCosts,
          storageQuantity,
          storageTime,
          additionalCosts,
          totalCosts:totalCosts.CU,
          premiumStorageQuantity,
          redisSize
        })
      }
    >
      CSV File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
