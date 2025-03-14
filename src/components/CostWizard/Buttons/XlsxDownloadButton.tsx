import React from 'react';
import { Button, Icon } from '@ui5/webcomponents-react';
import { useRecoilValue } from 'recoil';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportXLSX from '../Functions/exportXLSX';
import { additionalCostsState } from '../../../state/costs/additionalCostsState';

export default function XlsxDownloadButton() {
  const baseCosts: number = useRecoilValue<number>(baseConfigCostsState);
  const baseVMSize = useRecoilValue<VMSize>(VMsizeState).value;
  const baseMinAutoscaler = useRecoilValue<number[]>(minAutoscalerState);
  const baseTime: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const storageCosts: number = useRecoilValue<number>(storageCostsState);
  const storageQuantity: number = useRecoilValue<number>(GBQuantityState);
  const additionalCosts: number = useRecoilValue<number>(additionalCostsState);
  const storageTime: number = useRecoilValue<number>(
    timeConsumptionStorageState,
  );
  const totalCosts = useRecoilValue<number>(totalCostsState);

  return (
    <Button
      design="Emphasized"
      onClick={() =>
        exportXLSX({
          baseCosts,
          baseTime,
          baseVMSize,
          baseMinAutoscaler: baseMinAutoscaler[0],
          storageCosts,
          storageQuantity,
          storageTime,
          additionalCosts,
          totalCosts,
        })
      }
    >
      XLSX File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
