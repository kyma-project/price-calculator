import { utils, writeFile, WorkBook, WorkSheet } from 'xlsx';
import roundDecimals from '../../ResultStatistics/roundDecimals';
import { MachineSetup } from '../../../state/nodes/machineSetupState';
import { RedisSize } from '../../../state/additionalConfig/redisState';
import { TotalCosts } from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import calculateNodeConfigCosts from '../../../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts';
import calculateNodeVolumeCosts from '../../../calculatorFunctions/nodeConfigCosts/calculateNodeVolumeCosts';
import config from '../../../config.json';

interface Props {
  machineSetup: MachineSetup[];
  nodeConfigCosts: number;
  storageCosts: number;
  storageQuantity: number;
  premiumStorageQuantity: number;
  snapshotStorageQuantity: number;
  redisSize: RedisSize;
  additionalCosts: number;
  conversionRate: number;
  totalCosts: TotalCosts;
  exportFormat: ExportFormat;
}

export enum ExportFormat {
  CSV = 'CSV',
  XLSX = 'XLSX',
}

export default function exportToFile(props: Props) {
  const {
    machineSetup,
    nodeConfigCosts,
    storageCosts,
    storageQuantity,
    premiumStorageQuantity,
    snapshotStorageQuantity,
    redisSize,
    additionalCosts,
    conversionRate,
    totalCosts,
    exportFormat,
  } = props;

  const dataArray: (string | number)[][] = [
    ['SAP BTP Kyma Runtime - Cost Estimation'],
    [''],
  ];

  // Node pools — one block per pool
  machineSetup.forEach((machine, index) => {
    const label =
      index === 0 ? 'Base Worker Node Pool' : `Worker Node Pool ${index}`;

    const computeCost = calculateNodeConfigCosts({
      timeConsumption: machine.timeConsumption,
      computeUnits: machine.VMSize.computeUnits,
      minAutoscaler: machine.minAutoscaler,
      machineTypeFactor: machine.machineType.multiple,
    });
    const volumeCost = calculateNodeVolumeCosts({
      nodeVolumeSizeGb: machine.nodeVolumeSizeGb,
      minAutoscaler: machine.minAutoscaler,
      timeConsumption: machine.timeConsumption,
    });
    const poolCost = computeCost + volumeCost;

    dataArray.push(
      [label],
      ['Machine Type', machine.machineType.value],
      ['VM Size', machine.VMSize.value],
      ['Autoscaler Min', machine.minAutoscaler],
      ['Node Volume Size', `${machine.nodeVolumeSizeGb} GB`],
      ['Time Consumption', `${machine.timeConsumption} hrs`],
      ['Pool Cost', `${roundDecimals(poolCost, true)} CU`],
      [''],
    );
  });

  // Storage
  dataArray.push(
    ['Storage'],
    ['Standard Storage', `${storageQuantity} GB`],
    ['NFS Storage', `${premiumStorageQuantity} GB`],
    ['Snapshot Storage', `${snapshotStorageQuantity} GB`],
    [''],
  );

  // Additional configuration
  dataArray.push(
    ['Additional Configuration'],
    ['Redis Tier', redisSize.tier],
    ['Redis Cost', `${roundDecimals(redisSize.value, true)} CU`],
    ['Conversion Rate', conversionRate],
    [''],
  );

  // Summary
  dataArray.push(
    ['Summary'],
    ['Node Configuration', `${roundDecimals(nodeConfigCosts, true)} CU`],
    ['Storage', `${roundDecimals(storageCosts, true)} CU`],
    ['Additional', `${roundDecimals(additionalCosts, true)} CU`],
    ['Total (CU)', `${roundDecimals(totalCosts.CU, true)} CU`],
    [
      `Total (${config.CurrencyCode})`,
      `${roundDecimals(totalCosts.CC, true)} ${config.CurrencyCode}`,
    ],
  );

  if (exportFormat === ExportFormat.XLSX) {
    exportToXLSX(dataArray);
  } else {
    exportToCSV(dataArray);
  }
}

function exportToXLSX(dataArray: (string | number)[][]) {
  const worksheet: WorkSheet = utils.aoa_to_sheet(dataArray);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Cost Estimation');

  worksheet['!cols'] = [{ wch: 26 }, { wch: 24 }];

  writeFile(workbook, 'Kyma-Price-Calculations.xlsx');
}

function csvEscape(value: string | number): string {
  const str = String(value);
  // Always quote strings so Excel never misinterprets separators or hyphens
  return `"${str.replace(/"/g, '""')}"`;
}

function exportToCSV(dataArray: (string | number)[][]) {
  const csvString = dataArray
    .map((row) => row.map(csvEscape).join(','))
    .join('\n');
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
