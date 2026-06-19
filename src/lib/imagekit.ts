const BASE = import.meta.env.VITE_IMAGEKIT_API_ENDPOINT as string

/** Build a full ImageKit URL from a path relative to the endpoint root. */
export function ikUrl(path: string): string {
  return `${BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
