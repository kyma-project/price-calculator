import { utils, writeFile, WorkBook, WorkSheet } from 'xlsx';
import roundDecimals from '../../ResultStatistics/roundDecimals';
import { MachineSetup } from '../../../state/nodes/machineSetupState';
import { RedisSize } from '../../../state/additionalConfig/redisState';
import calculateNodeConfigCosts from '../../../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts';

interface Props {
  baseCosts: number;
  machineSetup: MachineSetup[];
  storageCosts: number;
  storageQuantity: number;
  premiumStorageQuantity: number;
  redisSize: RedisSize;
  timeConsumption: number;
  additionalCosts: number;
  totalCosts: number;
  exportFormat: ExportFormat;
}

interface MachineSetupWithCost {
  machineSetup: MachineSetup;
  cost: number;
}
export enum ExportFormat{
  CSV,
  XLSX
}


export default function exportToFile(props: Props) {
  const {
    baseCosts,
    machineSetup,
    storageCosts,
    storageQuantity,
    timeConsumption,
    premiumStorageQuantity,
    redisSize,
    additionalCosts,
    totalCosts,
    exportFormat
  } = props;

  const machineSetupWithCost: MachineSetupWithCost[] = machineSetup.reduce(
    (acc, machine) => {
      const machineWithCost = {
        machineSetup: machine,
        cost: calculateNodeConfigCosts({
          timeConsumption: machine.timeConsuption,
          computeUnits: machine.VMSize.computeUnits,
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
    ['Time Consumption', timeConsumption],
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

  if (exportFormat === ExportFormat.XLSX){
    exportToXLSX(dataArray);
  }
  else{
    exportToCSV(dataArray);
  }
}

function exportToXLSX(dataArray: (string | number)[][]) {
  const worksheet: WorkSheet = utils.aoa_to_sheet(dataArray);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  const columnWidths = [{ wch: 22 }, { wch: 17 }];
  worksheet['!cols'] = columnWidths;

  writeFile(workbook, 'Kyma-Price-Calculations.xlsx');
}

function exportToCSV(dataArray: (string | number)[][]){
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
