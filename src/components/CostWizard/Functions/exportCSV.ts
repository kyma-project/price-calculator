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
  costNode: number[];
}

interface MachineSetupWithCost{
  machineSetup: MachineSetup
  cost: number;
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
    costNode
  } = props;

  let visibleMachineSetup: MachineSetupWithCost[] = machineSetup.reduce((acc, machine, index) => {
    if (machine.visible) {
      const machineWithCost = {
        machineSetup: machine,
        cost: costNode.at(index) ?? 0
      };
      acc.push(machineWithCost);
    }
    return acc;
    }, [] as MachineSetupWithCost[]);

  const dataArray = [
    ['Base Configuration'],
    ['Virtual Machine Size', ...visibleMachineSetup.map(prop => prop.machineSetup.VMSize.value)],
    ['Virtual Machine Type', ...visibleMachineSetup.map(prop => prop.machineSetup.machineType.value)],
    ['Autoscaler Min', ...visibleMachineSetup.map(prop => prop.machineSetup.minAutoscaler.toString())],
    ['Time Consumption', ...visibleMachineSetup.map(prop => prop.machineSetup.timeConsuption.toString())],
    ['Worker Node Pool Cost', ...visibleMachineSetup.map(prop => prop.cost.toString() + ' CU')],
    [''],
    ['Storage'],
    ['Standard Storage', storageQuantity],
    ['NFS Storage', premiumStorageQuantity],
    ['Time Consumption', storageTime],
    [''],
    ['Redis'],
    ['Redis Size', redisSize.tsize],
    ['Redis Cost', redisSize.value  + ' CU'],
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
