import { useAtomValue } from 'jotai';
import { Button, Icon } from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { snapshotGBQuantityState } from '../../../state/storage/snapshotGBQuantityState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportToFile, { ExportFormat } from '../Functions/exportToFile';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from '../../../state/nodes/machineSetupState';
import { redisState } from '../../../state/additionalConfig/redisState';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';
import {
  nodeConfigCostsAtom,
  storageCostsAtom,
  additionalCostsAtom,
  totalCostsAtom,
} from '../../../state/costState';

export default function XlsxDownloadButton() {
  const storageQuantity = useAtomValue(GBQuantityState);
  const premiumStorageQuantity = useAtomValue(premiumGBQuantityState);
  const snapshotStorageQuantity = useAtomValue(snapshotGBQuantityState);
  const baseMachineSetup = useAtomValue(baseMachineSetupState);
  const additionalMachineSetup = useAtomValue(additionalMachineSetupState);
  const redisSize = useAtomValue(redisState);
  const conversionRate = useAtomValue(applyConversionRateState);
  const nodeConfigCosts = useAtomValue(nodeConfigCostsAtom);
  const storageCosts = useAtomValue(storageCostsAtom);
  const additionalCosts = useAtomValue(additionalCostsAtom);
  const totalCosts = useAtomValue(totalCostsAtom);

  return (
    <Button
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
          exportFormat: ExportFormat.XLSX,
        })
      }
    >
      XLSX File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
