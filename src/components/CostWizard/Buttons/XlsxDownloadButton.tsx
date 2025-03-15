import React from 'react';
import { Button, Icon } from '@ui5/webcomponents-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import './DownloadButton.css';
import '@ui5/webcomponents-icons/dist/download.js';
import exportXLSX from '../Functions/exportXLSX';
import { additionalCostsState } from '../../../state/costs/additionalCostsState';
import { MachineSetup, machineSetupState } from '../../../state/nodes/machineSetupState';
import { RedisSize, redisState } from '../../../state/additionalConfig/redisState';

export default function XlsxDownloadButton() {
  const baseCosts: number = useRecoilValue<number>(baseConfigCostsState);
  const storageCosts: number = useRecoilValue<number>(storageCostsState);
  const storageQuantity: number = useRecoilValue<number>(GBQuantityState);
  const premiumStorageQuantity: number = useRecoilValue<number>(premiumGBQuantityState);
  const additionalCosts: number = useRecoilValue<number>(additionalCostsState);
  const storageTime: number = useRecoilValue<number>(
    timeConsumptionStorageState,
  );
  const totalCosts = useRecoilValue<number>(totalCostsState);
  const [machineSetup] = useRecoilState<MachineSetup[]>(machineSetupState);
  const redisSize = useRecoilValue<RedisSize>(redisState);

  return (
    <Button
      design="Emphasized"
      onClick={() =>
        exportXLSX({
          baseCosts,
          machineSetup,
          storageCosts,
          storageQuantity,
          storageTime,
          additionalCosts,
          totalCosts,
          premiumStorageQuantity,
          redisSize
        })
      }
    >
      XLSX File
      <Icon id="download-icon" design="Contrast" name="download" />
    </Button>
  );
}
