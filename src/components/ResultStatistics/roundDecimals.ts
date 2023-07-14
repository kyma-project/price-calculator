export default function roundDecimals(num: number, toFixed: boolean) {
  if (toFixed) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  return Math.round(num * 100) / 100;
}
