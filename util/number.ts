// Overload signature: https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
export function roundTo<T extends number | null | undefined>(
  num: T,
  decimals: number,
): T extends number ? number : T;
// Implementation
export function roundTo(
  num: number | null | undefined,
  decimals: number,
) {
  if (num === null || num === undefined) return num;
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}
