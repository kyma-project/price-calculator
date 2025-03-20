import { utils, writeFile, WorkBook, WorkSheet } from 'xlsx';
import roundDecimals from '../../ResultStatistics/roundDecimals';
import { MachineSetup } from '../../../state/nodes/machineSetupState';
import { RedisSize } from '../../../state/additionalConfig/redisState';

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

export default function exportXLSX(props: Props) {
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

  let visibleMachineSetup: MachineSetupWithCost[] = machineSetup.reduce(
    (acc, machine, index) => {
      //if (machine.visible) {
      const machineWithCost = {
        machineSetup: machine,
        cost: 0, //costNode.at(index) ?? 0,
      };
      acc.push(machineWithCost);
      //}
      return acc;
    },
    [] as MachineSetupWithCost[],
  );

  const dataArray = [
    ['Base Configuration'],
    [
      'Virtual Machine Size',
      ...visibleMachineSetup.map((prop) => prop.machineSetup.VMSize.value),
    ],
    [
      'Virtual Machine Type',
      ...visibleMachineSetup.map((prop) => prop.machineSetup.machineType.value),
    ],
    [
      'Autoscaler Min',
      ...visibleMachineSetup.map((prop) =>
        prop.machineSetup.minAutoscaler.toString(),
      ),
    ],
    [
      'Time Consumption',
      ...visibleMachineSetup.map((prop) =>
        prop.machineSetup.timeConsuption.toString(),
      ),
    ],
    [
      'Worker Node Pool Cost',
      ...visibleMachineSetup.map((prop) => prop.cost.toString() + ' CU'),
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
  const worksheet: WorkSheet = utils.aoa_to_sheet(dataArray);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  const columnWidths = [{ wch: 22 }, { wch: 17 }];
  worksheet['!cols'] = columnWidths;

  writeFile(workbook, 'Kyma-Price-Calculations.xlsx');
}
