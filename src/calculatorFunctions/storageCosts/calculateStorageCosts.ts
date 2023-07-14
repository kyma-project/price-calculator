import config from '../../config.json';

interface Props {
  GBQuantity: number;
  timeConsumption: number;
}

export default function calculateStorageCosts(props: Props): number {
  const { GBQuantity, timeConsumption } = props;
  const PPU: number = config.Storage.PricePerUnit;
  const PPUdivider: number = config.Storage.PricePerUnitDivider;
  const PPUdivider2: number = config.Storage.PricePerUnitDivider2;

  return (PPU / PPUdivider / PPUdivider2) * timeConsumption * GBQuantity;
}
