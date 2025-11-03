import { twMerge } from 'tailwind-merge'

/** Merge tailwind classes */
export const cn = (...inputs: (string | boolean | null | undefined | false)[]) =>
  twMerge(inputs.filter(Boolean) as string[])
