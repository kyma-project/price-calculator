import React from 'react';
import { Button, Icon } from '@ui5/webcomponents-react';
import { useAtomValue } from 'jotai';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { timeConsumptionState } from '../../../state/additionalConfig/timeConsumptionState';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from '../../../state/nodes/machineSetupState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportCSV, { ExportFormat } from '../Functions/exportToFile';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { redisState } from '../../../state/additionalConfig/redisState';
import { useCostCalculator } from '../../../context/CostCalculatorContext';

export default function CSVDownloadButton() {
  const baseMachineSetup = useAtomValue(baseMachineSetupState);
  const additionalMachineSetup = useAtomValue(additionalMachineSetupState);
  const storageQuantity = useAtomValue(GBQuantityState);
  const premiumStorageQuantity = useAtomValue(premiumGBQuantityState);
  const timeConsumption = useAtomValue(timeConsumptionState);
  const redisSize = useAtomValue(redisState);
  const { nodeConfigCosts, storageCosts, additionalCosts, totalCosts } =
    useCostCalculator();

  return (
    <Button
      className="DownloadButton"
      design="Emphasized"
      onClick={() =>
        exportCSV({
          baseCosts: nodeConfigCosts,
          machineSetup: [baseMachineSetup, ...additionalMachineSetup],
          storageCosts,
          storageQuantity,
          timeConsumption,
          additionalCosts,
          totalCosts: totalCosts.CU,
          premiumStorageQuantity,
          redisSize,
          exportFormat: ExportFormat.CSV,
        })
      }
    >
      CSV File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
