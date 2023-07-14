import React from 'react';
import { Button, Icon } from '@ui5/webcomponents-react';
import { useRecoilValue } from 'recoil';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { timeConsumptionNodeState } from '../../../state/node/timeConsumptionState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import { VMQuantityState } from '../../../state/node/VMQuantityState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportXLSX from '../Functions/exportXLSX';

export default function XlsxDownloadButton() {
  const baseCosts: number = useRecoilValue<number>(baseConfigCostsState);
  const baseVMSize = useRecoilValue<VMSize>(VMsizeState).value;
  const baseMinAutoscaler = useRecoilValue<number>(minAutoscalerState);
  const baseTime: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const nodeCosts: number = useRecoilValue<number>(nodeCostsState);
  const vmQuantity: number = useRecoilValue<number>(VMQuantityState);
  const nodeTime: number = useRecoilValue<number>(timeConsumptionNodeState);
  const storageCosts: number = useRecoilValue<number>(storageCostsState);
  const storageQuantity: number = useRecoilValue<number>(GBQuantityState);
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
          baseMinAutoscaler,
          nodeCosts,
          vmQuantity,
          nodeTime,
          storageCosts,
          storageQuantity,
          storageTime,
          totalCosts,
        })
      }
    >
      XLSX File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
