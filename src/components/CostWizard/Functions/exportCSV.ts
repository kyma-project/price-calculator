import calculateNodeConfigCosts from '../../../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts';
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

interface MachineSetupWithCost {
  machineSetup: MachineSetup;
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
  } = props;

  const machineSetupWithCost: MachineSetupWithCost[] = machineSetup.reduce(
    (acc, machine) => {
      const machineWithCost = {
        machineSetup: machine,
        cost: calculateNodeConfigCosts({
          timeConsumption: machine.timeConsuption,
          vmMultiplier: machine.VMSize.multiple,
          minAutoscaler: machine.minAutoscaler,
          machineTypeFactor: machine.machineType.multiple,
        }),
      };
      acc.push(machineWithCost);
      return acc;
    },
    [] as MachineSetupWithCost[],
  );

  const dataArray = [
    ['Base Configuration'],
    [
      'Virtual Machine Size',
      ...machineSetupWithCost.map((prop) => prop.machineSetup.VMSize.value),
    ],
    [
      'Virtual Machine Type',
      ...machineSetupWithCost.map(
        (prop) => prop.machineSetup.machineType.value,
      ),
    ],
    [
      'Autoscaler Min',
      ...machineSetupWithCost.map((prop) =>
        prop.machineSetup.minAutoscaler.toString(),
      ),
    ],
    [
      'Time Consumption',
      ...machineSetupWithCost.map((prop) =>
        prop.machineSetup.timeConsuption.toString(),
      ),
    ],
    [
      'Worker Node Pool Cost',
      ...machineSetupWithCost.map((prop) => prop.cost.toString() + ' CU'),
    ],
    [''],
    ['Storage'],
    ['Standard Storage', storageQuantity],
    ['NFS Storage', premiumStorageQuantity],
    ['Time Consumption', storageTime],
    [''],
    ['Redis'],
    ['Redis Size', redisSize.tsize],
    ['Redis Cost', redisSize.value + ' CU'],
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
