const scalar = 180 / Math.PI

export function toDegrees(value: number): number {
  return value * scalar
}
