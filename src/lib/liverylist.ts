import csvText from '../livery_list.csv?raw'

export type LiveryClassDef = {
  id: number
  name: string
  team: string
  game: string
  isItasha: boolean
  photoName: string
  photoCount: number
  link?: string
  thumbnailImg: number
  isFeatured: boolean
}

export const LiveryTag = {
  SRT: 'Soar-N Racing Team',
  IR: 'iRacing',
  IRG: 'iRacing',
  LMU: 'Le Mans Ultimate',
  MHR: 'Madhaus Racing',
  JWD: 'Jumpy Whale Design',
  ACC: 'Assetto Corsa Competizione',
  OBDA: 'OBDA',
  NT: 'No Team',
  Itasha: 'Itasha',
  Meme: 'Meme',
} as const

export type LiveryTag = (typeof LiveryTag)[keyof typeof LiveryTag]

const TEAM_MAP: Record<string, LiveryTag> = {
  SRT: LiveryTag.SRT,
  JWD: LiveryTag.JWD,
  MHR: LiveryTag.MHR,
  OBDA: LiveryTag.OBDA,
  NT: LiveryTag.NT,
}

const GAME_MAP: Record<string, LiveryTag> = {
  IR: LiveryTag.IR,
  IRG: LiveryTag.IR,
  LMU: LiveryTag.LMU,
  ACC: LiveryTag.ACC,
}

function parseLiveryCsv(csv: string): LiveryClassDef[] {
  const lines = csv.trim().split('\n')
  const headers = lines[0].split(',').map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row = Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim() ?? '']))
    return {
      id: Number(row.id),
      name: row.name,
      team: TEAM_MAP[row.team] ?? row.team,
      game: GAME_MAP[row.game] ?? row.game,
      isItasha: row.isItasha === 'TRUE',
      photoName: row.photoName,
      photoCount: Number(row.photoCount),
      ...(row.link ? { link: row.link } : {}),
      thumbnailImg: Number(row.thumbnailImg),
      isFeatured: row.isFeatured === 'TRUE',
    }
  })
}

export const LIVERIES: LiveryClassDef[] = parseLiveryCsv(csvText).sort((a, b) => b.id - a.id)
