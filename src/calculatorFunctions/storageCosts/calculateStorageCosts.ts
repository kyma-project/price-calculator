import config from '../../config.json';

interface Props {
  GBQuantity: number;
  premiumGBQuantity: number;
  timeConsumption: number;
}

export default function calculateStorageCosts(props: Props): number {
  const { GBQuantity, premiumGBQuantity, timeConsumption } = props;
  const PPU: number = config.Storage.PricePerUnit;
  const PPUdivider: number = config.Storage.PricePerUnitDivider;
  const PPUdivider2: number = config.Storage.PricePerUnitDivider2;
  const premiumPPU: number = config.PremiumStorage.PricePerUnit;
  const premiumPPUdivider: number = config.PremiumStorage.PricePerUnitDivider;
  const premiumPPUdivider2: number = config.PremiumStorage.PricePerUnitDivider2;

  return ((PPU / PPUdivider / PPUdivider2) * timeConsumption * GBQuantity) + ((premiumPPU / premiumPPUdivider / premiumPPUdivider2) * timeConsumption * premiumGBQuantity);
}
