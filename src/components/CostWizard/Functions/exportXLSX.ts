import { utils, writeFile, WorkBook, WorkSheet } from 'xlsx';
import roundDecimals from '../../ResultStatistics/roundDecimals';

interface Props {
  baseCosts: number;
  baseTime: number;
  baseVMSize: any;
  baseMinAutoscaler: number;
  nodeCosts: number;
  vmQuantity: number;
  nodeTime: number;
  storageCosts: number;
  storageQuantity: number;
  storageTime: number;
  totalCosts: number;
}

export default function exportXLSX(props: Props) {
  console.log('xlsx');
  const {
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
  } = props;

  const dataArray: any[] = [
    ['Base Configuration'],
    ['Virtual Machine Size', baseVMSize],
    ['Autoscaler Min', baseMinAutoscaler],
    ['Time Consumption', baseTime],
    [''],
    ['Node'],
    ['Virtual Machines', vmQuantity],
    ['Time Consumption', nodeTime],
    [''],
    ['Storage'],
    ['Additional Storage', storageQuantity],
    ['Time Consumption', storageTime],
    [''],
    ['Base Configuration costs', roundDecimals(baseCosts, true) + '€'],
    ['Node costs', roundDecimals(nodeCosts, true) + '€'],
    ['Storage costs', roundDecimals(storageCosts, true) + '€'],
    ['Total costs', roundDecimals(totalCosts, true) + '€'],
  ];

  const worksheet: WorkSheet = utils.aoa_to_sheet(dataArray);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  const columnWidths = [{ wch: 22 }, { wch: 17 }];
  worksheet['!cols'] = columnWidths;

  writeFile(workbook, 'Kyma-Price-Calculations.xlsx');
}
