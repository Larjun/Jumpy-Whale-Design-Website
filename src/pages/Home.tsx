import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { LazyMotion, domAnimation, m, MotionConfig } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LiveryCarousel } from '@/components/LiveryCarousel'
import { LiveryGrid } from '@/components/LiveryGrid'

export function Home() {
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

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-background text-foreground">
          {/* Jumbotron */}
          <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <m.img
              src="/logo/jwd_turq.svg"
              alt="Jumpy Whale Design"
              className="mb-12 h-auto w-[85vw] max-w-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <m.h1
              className="mx-auto max-w-2xl text-5xl font-black tracking-tight text-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Simracing Liveries
            </m.h1>
            <m.p
              className="mt-6 max-w-md text-base text-muted-foreground"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Custom simracing liveries for iRacing, ACC, Le Mans Ultimate and more.
            </m.p>
            <m.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Button variant="outline" className="px-8 py-5 text-base">
                View all work
              </Button>
            </m.div>

            {/* scroll hint */}
            <m.div
              className="absolute bottom-10 flex flex-col items-center gap-1 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span>Scroll</span>
              <div className="h-6 w-px bg-muted-foreground/40" />
            </m.div>
          </section>

          <LiveryCarousel />
          <LiveryGrid />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
