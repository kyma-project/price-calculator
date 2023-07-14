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

export default function exportCSV(props: Props) {
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

    const csvData = [
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

    const csvString = csvData.map(row => row.join(': ')).join('\n');
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
