import React from 'react';
import { useAtomValue } from 'jotai';
import { Button, Icon } from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { timeConsumptionState } from '../../../state/additionalConfig/timeConsumptionState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportXLSX, { ExportFormat } from '../Functions/exportToFile';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from '../../../state/nodes/machineSetupState';
import { redisState } from '../../../state/additionalConfig/redisState';
import { useCostCalculator } from '../../../context/CostCalculatorContext';

export default function XlsxDownloadButton() {
  const storageQuantity = useAtomValue(GBQuantityState);
  const premiumStorageQuantity = useAtomValue(premiumGBQuantityState);
  const timeConsumption = useAtomValue(timeConsumptionState);
  const baseMachineSetup = useAtomValue(baseMachineSetupState);
  const additionalMachineSetup = useAtomValue(additionalMachineSetupState);
  const redisSize = useAtomValue(redisState);
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
          exportFormat: ExportFormat.XLSX,
        })
      }
    >
      XLSX File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
