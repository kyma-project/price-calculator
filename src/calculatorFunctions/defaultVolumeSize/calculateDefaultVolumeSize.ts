import config from '../../config.json';

// Mirrors the KCR consumption-reporter formula
// (helm/kcr/templates/nodemeterconfig.yaml). Keep parameters in
// config.nodeConfig.volumeFormula in sync with that source.
export default function calculateDefaultVolumeSize(
  vcpus: number,
  memoryGib: number,
): number {
  const { volumeBase, volumeFactor, volumeMin, volumeMax } =
    config.nodeConfig.volumeFormula;

  const normalizedResource = Math.max(vcpus / 2, memoryGib / 8);
  const raw = Math.floor(volumeBase + normalizedResource * volumeFactor);
  return Math.min(volumeMax, Math.max(volumeMin, raw));
}
