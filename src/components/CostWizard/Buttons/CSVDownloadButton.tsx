import { Button, Icon } from '@ui5/webcomponents-react';
import { useAtomValue } from 'jotai';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from '../../../state/nodes/machineSetupState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportToFile, { ExportFormat } from '../Functions/exportToFile';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { snapshotGBQuantityState } from '../../../state/storage/snapshotGBQuantityState';
import { redisState } from '../../../state/additionalConfig/redisState';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';
import {
  nodeConfigCostsAtom,
  storageCostsAtom,
  additionalCostsAtom,
  totalCostsAtom,
} from '../../../state/costState';

export default function CSVDownloadButton() {
  const baseMachineSetup = useAtomValue(baseMachineSetupState);
  const additionalMachineSetup = useAtomValue(additionalMachineSetupState);
  const storageQuantity = useAtomValue(GBQuantityState);
  const premiumStorageQuantity = useAtomValue(premiumGBQuantityState);
  const snapshotStorageQuantity = useAtomValue(snapshotGBQuantityState);
  const redisSize = useAtomValue(redisState);
  const conversionRate = useAtomValue(applyConversionRateState);
  const nodeConfigCosts = useAtomValue(nodeConfigCostsAtom);
  const storageCosts = useAtomValue(storageCostsAtom);
  const additionalCosts = useAtomValue(additionalCostsAtom);
  const totalCosts = useAtomValue(totalCostsAtom);

  return (
    <Button
      className="DownloadButton"
      design="Emphasized"
      onClick={() =>
        exportToFile({
          machineSetup: [baseMachineSetup, ...additionalMachineSetup],
          nodeConfigCosts,
          storageCosts,
          storageQuantity,
          premiumStorageQuantity,
          snapshotStorageQuantity,
          additionalCosts,
          conversionRate,
          totalCosts,
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
