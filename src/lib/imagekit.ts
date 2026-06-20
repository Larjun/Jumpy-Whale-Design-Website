const BASE = import.meta.env.VITE_IMAGEKIT_API_ENDPOINT as string

export interface IkTransform {
  /** Target width in px. */
  width?: number
  /** Quality 1-100. */
  quality?: number
  /** Output format; `auto` lets ImageKit negotiate WebP/AVIF per browser. */
  format?: 'auto' | 'webp' | 'avif' | 'jpg'
}

/** Build a full ImageKit URL from a path relative to the endpoint root. */
export function ikUrl(path: string, tr?: IkTransform): string {
  const base = `${BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  if (!tr) return base

  const parts: string[] = []
  if (tr.width) parts.push(`w-${tr.width}`)
  if (tr.quality) parts.push(`q-${tr.quality}`)
  parts.push(`f-${tr.format ?? 'auto'}`)
  return `${base}?tr=${parts.join(',')}`
}

/** Widths for full-bleed hero/carousel images. */
const IK_WIDTHS_HERO = [640, 960, 1280, 1600, 1920] as const
/** Widths for grid thumbnails — cards never exceed ~500px. */
const IK_WIDTHS_THUMB = [400, 640, 960] as const

export function ikSrcSet(path: string, quality = 70, hero = false): string {
  const widths = hero ? IK_WIDTHS_HERO : IK_WIDTHS_THUMB
  return widths.map((w) => `${ikUrl(path, { width: w, quality })} ${w}w`).join(', ')
}
