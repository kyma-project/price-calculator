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

  const csvData = [
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

  const csvString = csvData.map((row) => row.join(': ')).join('\n');
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
