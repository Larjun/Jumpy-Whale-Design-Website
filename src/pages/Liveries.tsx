import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Lenis from 'lenis'
import { LIVERIES, LiveryTag } from '@/lib/liverylist'
import { LiveryGrid } from '@/components/LiveryGrid'

const GAME_FILTER_MAP: Record<string, LiveryTag> = {
  acc: LiveryTag.ACC,
  iracing: LiveryTag.IR,
  lmu: LiveryTag.LMU,
}

const TEAM_FILTER_MAP: Record<string, LiveryTag> = {
  mhr: LiveryTag.MHR,
  srt: LiveryTag.SRT,
  jwd: LiveryTag.JWD,
}

const GAME_LABELS: Record<string, string> = {
  acc: 'ACC',
  iracing: 'iRacing',
  lmu: 'Le Mans Ultimate',
}

const TEAM_LABELS: Record<string, string> = {
  mhr: 'Madhaus Racing',
  srt: 'Soar-N Racing Team',
  jwd: 'Jumpy Whale Design',
}

export function Liveries() {
  const { filterType, filterValue } = useParams<{ filterType?: string; filterValue?: string }>()

  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [])

  let filteredLiveries = LIVERIES
  let title = 'All Liveries'

  if (filterType === 'game' && filterValue) {
    const tag = GAME_FILTER_MAP[filterValue.toLowerCase()]
    if (tag) {
      filteredLiveries = LIVERIES.filter((l) => l.game === tag)
      title = GAME_LABELS[filterValue.toLowerCase()] ?? filterValue
    }
  } else if (filterType === 'team' && filterValue) {
    const tag = TEAM_FILTER_MAP[filterValue.toLowerCase()]
    if (tag) {
      filteredLiveries = LIVERIES.filter((l) => l.team === tag)
      title = TEAM_LABELS[filterValue.toLowerCase()] ?? filterValue
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-[90%] pt-12 pb-4">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-widest text-brand-turquoise uppercase">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{filteredLiveries.length} liveries</p>
      </div>
      <LiveryGrid liveries={filteredLiveries} />
    </div>
  )
}
