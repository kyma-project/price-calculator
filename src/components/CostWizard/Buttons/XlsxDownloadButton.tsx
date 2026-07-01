import { useAtomValue } from 'jotai';
import { Button, Icon } from '@ui5/webcomponents-react';
import { GiBQuantityState } from '../../../state/storage/GiBQuantityState';
import { nfsGiBQuantityState } from '../../../state/storage/nfsGiBQuantityState';
import { snapshotGiBQuantityState } from '../../../state/storage/snapshotGiBQuantityState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportToFile, { ExportFormat } from '../Functions/exportToFile';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from '../../../state/nodes/machineSetupState';
import { redisState } from '../../../state/additionalConfig/redisState';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';
import { timeConsumptionState } from '../../../state/additionalConfig/timeConsumptionState';
import {
  nodeConfigCostsAtom,
  storageCostsAtom,
  additionalCostsAtom,
  totalCostsAtom,
} from '../../../state/costState';

export default function XlsxDownloadButton() {
  const storageQuantity = useAtomValue(GiBQuantityState);
  const nfsStorageQuantity = useAtomValue(nfsGiBQuantityState);
  const snapshotStorageQuantity = useAtomValue(snapshotGiBQuantityState);
  const baseMachineSetup = useAtomValue(baseMachineSetupState);
  const additionalMachineSetup = useAtomValue(additionalMachineSetupState);
  const redisSize = useAtomValue(redisState);
  const conversionRate = useAtomValue(applyConversionRateState);
  const timeConsumption = useAtomValue(timeConsumptionState);
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
          nfsStorageQuantity,
          snapshotStorageQuantity,
          additionalCosts,
          conversionRate,
          totalCosts,
          timeConsumption,
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
