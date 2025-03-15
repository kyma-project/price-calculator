import { RedisSize } from '../../../state/additionalConfig/redisState';
import { MachineSetup } from '../../../state/nodes/machineSetupState';
import roundDecimals from '../../ResultStatistics/roundDecimals';

interface Props {
  baseCosts: number;
  machineSetup: MachineSetup[];
  storageCosts: number;
  storageQuantity: number;
  premiumStorageQuantity: number;
  redisSize: RedisSize;
  storageTime: number;
  additionalCosts: number;
  totalCosts: number;
}

export default function exportCSV(props: Props) {
  const {
    baseCosts,
    machineSetup,
    storageCosts,
    storageQuantity,
    storageTime,
    premiumStorageQuantity,
    redisSize,
    additionalCosts,
    totalCosts,
  } = props;

  const dataArray = [
    ['Base Configuration'],
    ['Virtual Machine Size', ...machineSetup.map(prop => prop.VMSize)],
    ['Virtual Machine Type', ...machineSetup.map(prop => prop.machineType)],
    ['Autoscaler Min', machineSetup.map(prop => prop.minAutoscaler)],
    ['Time Consumption', machineSetup.map(prop => prop.timeConsuption)],
    ['Worker Node Pool Cost', machineSetup.map(prop => prop.costCalulation)],
    [''],
    ['Storage'],
    ['Standard Storage', storageQuantity],
    ['Premium Storage', premiumStorageQuantity],
    ['Time Consumption', storageTime],
    [''],
    ['Redis'],
    ['Redis Size', redisSize.tsize],
    ['Redis Cost', redisSize.value],
    [''],
    ['Base Configuration costs', roundDecimals(baseCosts, true) + ' CU'],
    ['Storage costs', roundDecimals(storageCosts, true) + ' CU'],
    ['Additional costs', roundDecimals(additionalCosts, true) + ' CU'],
    ['Total costs', roundDecimals(totalCosts, true) + ' CU'],
  ];

  const csvString = dataArray.map((row) => row.join(': ')).join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Kyma-Price-Calculations.csv');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
