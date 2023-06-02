// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types
import PoissonDiskSampling from 'poisson-disk-sampling'

export const generatePoints = (height: number, width: number, size: number) => {
  const sample = new PoissonDiskSampling({
    shape: [height, width],
    minDistance: size,
    maxDistance: size + (size * .5),
    tries: 20,
  })

  const points: [number, number][] = sample.fill()

  return points
    .map(([y, x]) => [(y / height) * 100, (x / width) * 100] as [number, number])
    .filter(([y, x]) => !(y > 30 && y < 70 && x > 40 && x < 60))
}
