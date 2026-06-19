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

const TEAM_GRADIENTS: Record<string, [string, string]> = {
  mhr: ['#3886c2', '#cb568b'],
  srt: ['#AA032E', '#DAAD1F'],
  jwd: ['#007fff', '#ff2680'],
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

  const teamGradient =
    filterType === 'team' && filterValue
      ? TEAM_GRADIENTS[filterValue.toLowerCase()]
      : undefined

  return (
    <div className="min-h-screen bg-background text-foreground">
      {teamGradient ? (
        <div
          className="relative flex min-h-56 items-end pb-8"
          style={{
            background: `linear-gradient(135deg, ${teamGradient[0]}, ${teamGradient[1]})`,
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            paddingLeft: 'calc(50vw - 50%)',
            paddingRight: 'calc(50vw - 50%)',
          }}
        >
          {/* Centered heading */}
          <div className="w-full text-center">
            <h1 className="text-10xl tracking-tight text-white">{title}</h1>
            <p className="mt-1 text-sm text-white/60">{filteredLiveries.length} liveries</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-[90%] pt-12 pb-4">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
          <h1 className="mt-4 text-5xl tracking-widest text-brand-turquoise uppercase">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{filteredLiveries.length} liveries</p>
        </div>
      )}
      <LiveryGrid liveries={filteredLiveries} />
    </div>
  )
}
