import React from 'react';
import { Button, Icon } from '@ui5/webcomponents-react';
import { useRecoilValue } from 'recoil';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { timeConsumptionState } from '../../../state/additionalConfig/timeConsumptionState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportXLSX, { ExportFormat } from '../Functions/exportToFile';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
  MachineSetup,
} from '../../../state/nodes/machineSetupState';
import {
  RedisSize,
  redisState,
} from '../../../state/additionalConfig/redisState';
import { useCostCalculator } from '../../../context/CostCalculatorContext';

export default function XlsxDownloadButton() {
  const storageQuantity: number = useRecoilValue<number>(GBQuantityState);
  const premiumStorageQuantity: number = useRecoilValue<number>(
    premiumGBQuantityState,
  );
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionState,
  );
  const baseMachineSetup = useRecoilValue<MachineSetup>(baseMachineSetupState);
  const additionalMachineSetup = useRecoilValue<MachineSetup[]>(
    additionalMachineSetupState,
  );
  const redisSize = useRecoilValue<RedisSize>(redisState);
  const { nodeConfigCosts, storageCosts, additionalCosts, totalCosts } =
    useCostCalculator();

  return (
    <Button
      design="Emphasized"
      onClick={() =>
        exportXLSX({
          baseCosts: nodeConfigCosts,
          machineSetup: [baseMachineSetup, ...additionalMachineSetup],
          storageCosts,
          storageQuantity,
          timeConsumption,
          additionalCosts,
          totalCosts: totalCosts.CU,
          premiumStorageQuantity,
          redisSize,
          exportFormat: ExportFormat.XLSX
        })
      }
    >
      XLSX File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
