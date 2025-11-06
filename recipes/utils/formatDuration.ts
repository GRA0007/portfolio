/** Turn minutes into a formatted duration */
export const formatDuration = (minutes: number, format: 'human' | 'ISO' = 'human') => {
  let m = minutes
  const d = Math.floor(m / 1440)
  m %= 1440
  const h = Math.floor(m / 60)
  m %= 60

  if (format === 'ISO') return `P${d > 0 ? `${d}D` : ''}T${h > 0 ? `${h}H` : ''}${m > 0 ? `${m}M` : ''}`
  return [d > 0 && `${d}d`, h > 0 && `${h}h`, m > 0 && `${m}m`].filter(Boolean).join(' ')
}
