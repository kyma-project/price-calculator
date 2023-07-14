import config from '../../config.json';

interface Props {
  vmQuantity: number;
  vmMultiplier: number;
  timeConsumption: number;
}

export default function calculateNodeCosts(props: Props): number {
  const scuv: number = config.VirtualMachines.SerConsUnitsValue;
  const PPU: number = config.Nodes.PricePerUnit;
  const PPUdivider: number = config.Nodes.PricePerUnitDivider;
  const PPUdivider2: number = config.Nodes.PricePerUnitDivider2;
  const { vmQuantity, vmMultiplier, timeConsumption } = props;

  return (
    (PPU / PPUdivider / PPUdivider2) *
    timeConsumption *
    scuv *
    vmQuantity *
    vmMultiplier
  );
}
