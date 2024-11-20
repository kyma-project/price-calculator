import { utils, writeFile, WorkBook, WorkSheet } from 'xlsx';
import roundDecimals from '../../ResultStatistics/roundDecimals';

interface Props {
  baseCosts: number;
  baseTime: number;
  baseVMSize: any;
  baseMinAutoscaler: number;
  storageCosts: number;
  storageQuantity: number;
  storageTime: number;
  additionalCosts: number;
  totalCosts: number;
}

export default function exportCSV(props: Props) {
  const {
    baseCosts,
    baseTime,
    baseVMSize,
    baseMinAutoscaler,
    storageCosts,
    storageQuantity,
    storageTime,
    additionalCosts,
    totalCosts,
  } = props;

    const dataArray = [
      ['Base Configuration'],
      ['Virtual Machine Size', baseVMSize],
      ['Autoscaler Min', baseMinAutoscaler],
      ['Time Consumption', baseTime],
      [''],
      ['Storage'],
      ['Additional Storage', storageQuantity],
      ['Time Consumption', storageTime],
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
