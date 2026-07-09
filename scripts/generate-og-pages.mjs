// Generates a static, pre-rendered HTML file per livery under dist/livery/<id>/index.html
// with Open Graph / Twitter meta tags baked in. Link-preview crawlers (Discord, Slack,
// iMessage, etc.) don't execute JS, so the SPA's single index.html can't give them
// per-livery title/description/image — this script produces one that can, while real
// visitors still get the normal React app (it's the same built bundle, just with a
// different <head>).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const distDir = path.join(root, 'dist')

const SITE_URL = 'https://jumpywhale.com'

const envText = readFileSync(path.join(root, '.env'), 'utf8')
const endpointMatch = envText.match(/VITE_IMAGEKIT_API_ENDPOINT\s*=\s*"?([^"\n]+)"?/)
if (!endpointMatch) throw new Error('VITE_IMAGEKIT_API_ENDPOINT not found in .env')
const IMAGEKIT_BASE = endpointMatch[1].replace(/\/$/, '')

function ikUrl(imgPath, width, quality) {
  return `${IMAGEKIT_BASE}/${imgPath.replace(/^\//, '')}?tr=w-${width},q-${quality},f-auto`
}

const LiveryTag = {
  SRT: 'Soar-N Racing Team',
  IR: 'iRacing',
  IRG: 'iRacing',
  LMU: 'Le Mans Ultimate',
  MHR: 'Madhaus Racing',
  JWD: 'Jumpy Whale Design',
  ACC: 'Assetto Corsa Competizione',
  OBDA: 'OBDA',
  NT: 'No Team',
}

function parseLiveryCsv(csv) {
  const lines = csv.trim().split('\n')
  const headers = lines[0].split(',').map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row = Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim() ?? '']))
    return {
      id: Number(row.id),
      name: row.name,
      team: LiveryTag[row.team] ?? row.team,
      game: LiveryTag[row.game] ?? row.game,
      isItasha: row.isItasha === 'TRUE',
      photoName: row.photoName,
      photoCount: Number(row.photoCount),
      thumbnailImg: Number(row.thumbnailImg),
    }
  })
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const csv = readFileSync(path.join(root, 'public', 'livery_list.csv'), 'utf8')
const liveries = parseLiveryCsv(csv)
const template = readFileSync(path.join(distDir, 'index.html'), 'utf8')

for (const livery of liveries) {
  const title = `${livery.name} — Jumpy Whale Design`
  const description = `${livery.team} livery for ${livery.game}${
    livery.isItasha ? ' • Itasha' : ''
  } — view photos on Jumpy Whale Design.`
  const image = ikUrl(`liveries/${livery.photoName}_${livery.thumbnailImg}.jpg`, 1200, 80)
  const url = `${SITE_URL}/livery/${livery.id}`

  const metaTags = `<title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />`

  const html = template.replace(/<title>.*?<\/title>/s, metaTags)

  const outDir = path.join(distDir, 'livery', String(livery.id))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, 'index.html'), html)
}

console.log(`generate-og-pages: wrote ${liveries.length} pre-rendered livery pages`)
