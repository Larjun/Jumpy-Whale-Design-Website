import { LazyMotion, domAnimation, m, MotionConfig } from 'framer-motion'
import { Flag, Gauge, Paintbrush } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LOGO_BY_THEME: Record<string, string> = {
  blue: '/logo/jwd_blue.svg',
  pink: '/logo/jwd_pink.svg',
  turquoise: '/logo/jwd_turq.svg',
  white: '/logo/jwd_white.svg',
}

const FEATURES = [
  {
    icon: Paintbrush,
    title: 'Race-ready design',
    description: 'Liveries built to turn heads on track and in the replay.',
  },
  {
    icon: Gauge,
    title: 'Customize your car',
    description: 'Designed to fit your vision.',
  },
  {
    icon: Flag,
    title: 'Multiple Sims',
    description: 'iRacing, ACC, and Le Mans Ultimate',
  },
]

export function ThemeShowcase({ themeName }: { themeName: string }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-background text-foreground">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <span className="text-sm text-muted-foreground capitalize">{themeName} theme</span>
          </header>

          <m.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-24 text-center"
          >
            <img
              src={LOGO_BY_THEME[themeName]}
              alt="Jumpy Whale Design"
              className="mx-auto h-24 w-auto"
            />
            <h1 className="my-10 text-xl font-semibold">Simracing Liveries</h1>
            <Button className="bg-brand text-brand-foreground hover:bg-brand-dark">
              Get in touch
            </Button>
          </m.section>

          <section className="mx-auto grid max-w-4xl gap-6 px-6 py-16 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <Icon className="mb-3 size-6 text-brand" />
                <h3 className="mb-1 font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </section>

          <section className="px-6 py-16">
            <h2 className="mb-6 text-center text-sm font-medium text-muted-foreground">Palette</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Swatch label="brand" className="bg-brand" />
              <Swatch label="light" className="bg-brand-light" />
              <Swatch label="dark" className="bg-brand-dark" />
            </div>
          </section>
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`size-16 rounded-lg border border-border ${className}`} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
