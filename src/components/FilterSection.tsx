import { Link } from 'react-router-dom'
import accLogo from '@/assets/game/acc_logo.svg'
import iracingLogo from '@/assets/game/iracing_logo.svg'
import lmuLogo from '@/assets/game/lmu_logo.svg'
import mhrLogo from '@/assets/teams/mhr_logo.svg'
import srtLogo from '@/assets/teams/srt_logo.svg'

const GAMES = [
  { label: 'ACC', logo: accLogo, to: '/liveries/game/acc' },
  { label: 'iRacing', logo: iracingLogo, to: '/liveries/game/iracing' },
  { label: 'LMU', logo: lmuLogo, to: '/liveries/game/lmu' },
]

const TEAMS = [
  { label: 'Madhaus Racing', logo: mhrLogo, to: '/liveries/team/mhr' },
  { label: 'Soar-N Racing Team', logo: srtLogo, to: '/liveries/team/srt' },
  { label: 'Jumpy Whale Design', logo: '/logo/jwd_turq.svg', to: '/liveries/team/jwd' },
]

function LogoButton({ label, logo, to }: { label: string; logo: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-3 rounded-xl bg-card p-5 transition-colors hover:bg-card/80"
    >
      <img src={logo} alt={label} className="h-12 w-auto object-contain" />
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </Link>
  )
}

export function FilterSection() {
  return (
    <section className="mx-auto w-[90%] pb-32">
      <div className="mb-10">
        <p className="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Browse by Game
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-3">
          {GAMES.map((g) => (
            <LogoButton key={g.label} {...g} />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <p className="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Browse by Team
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-3">
          {TEAMS.map((t) => (
            <LogoButton key={t.label} {...t} />
          ))}
        </div>
      </div>

      <Link
        to="/liveries"
        className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3 text-sm font-medium transition-colors hover:bg-card"
      >
        View all work →
      </Link>
    </section>
  )
}
