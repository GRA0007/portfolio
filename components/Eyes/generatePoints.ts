import PoissonDiskSampling from 'poisson-disk-sampling'

export const generatePoints = (height: number, width: number, size: number) => {
  const sample = new PoissonDiskSampling({
    shape: [Math.min(height, 2000), Math.min(width, 2000)],
    minDistance: size,
    maxDistance: size + (size * .5),
    tries: 20,
  })

  // Area to avoid in the centre
  const avoid = {
    y: sample.shape[0] / 2,
    x: sample.shape[1] / 2,
    r: size * 1.5, // radius
  }

  const points = sample.fill()

  return points
    // Remove points from the avoidance area
    .filter(([y, x]) => Math.pow(avoid.y - y, 2) + Math.pow(avoid.x - x, 2) > Math.pow(avoid.r, 2))
    // Convert to percentages
    .map(([y, x]) => [(y / sample.shape[0]) * 100, (x / sample.shape[1]) * 100] as [number, number])
}
